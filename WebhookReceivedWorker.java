package com.auditoria.portalweb.modules.webhooks.internal;

import com.auditoria.portalweb.modules.webhooks.domain.WebhookReceived;
import com.auditoria.portalweb.modules.webhooks.domain.WebhookReceived.ProcessedStatus;
import com.auditoria.portalweb.modules.webhooks.repository.WebhookReceivedRepository;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class WebhookReceivedWorker {

  private static final Logger log = LoggerFactory.getLogger(WebhookReceivedWorker.class);

  private final WebhookReceivedRepository repository;
  private final List<WebhookHandler> handlers;

  public WebhookReceivedWorker(
      WebhookReceivedRepository repository, List<WebhookHandler> handlers) {
    this.repository = repository;
    this.handlers = handlers;
  }

  /**
   * Processa webhooks pendentes. Intervalo configurável: portalweb.webhooks.worker-interval-ms
   * (default 30000ms).
   */
  @Scheduled(fixedDelayString = "${portalweb.webhooks.worker-interval-ms:30000}")
  @Transactional
  public void processPending() {
    List<WebhookReceived> batch =
        repository.findTop100ByProcessedStatusOrderByReceivedAtAsc(ProcessedStatus.PENDING);
    if (batch.isEmpty()) {
      return;
    }

    Map<String, WebhookHandler> handlersMap =
        handlers.stream()
            .collect(Collectors.toMap(h -> h.getSource().toLowerCase(Locale.ROOT), h -> h));

    log.debug("Processando {} webhooks pendentes...", batch.size());

    for (WebhookReceived item : batch) {
      processItem(item, handlersMap);
    }
  }

  private void processItem(WebhookReceived item, Map<String, WebhookHandler> handlersMap) {
    String source = item.getSource().toLowerCase(Locale.ROOT);

    try {
      WebhookHandler handler = handlersMap.get(source);

      if (handler == null) {
        item.setProcessedStatus(ProcessedStatus.DISCARDED);
        item.setErrorMessage("Nenhum handler registrado para source: " + source);
        log.warn("Webhook {} descartado: sem handler para source {}", item.getId(), source);
      } else {
        handler.handle(item);

        // Se o handler não mudou o status explicitamente, assume sucesso
        if (item.getProcessedStatus() == ProcessedStatus.PENDING) {
          item.setProcessedStatus(ProcessedStatus.PROCESSED);
        }
      }

    } catch (Exception e) {
      item.setProcessedStatus(ProcessedStatus.FAILED);
      String message = e.getMessage() == null ? "erro ao processar" : e.getMessage();
      if (message.length() > 500) {
        message = message.substring(0, 500);
      }
      item.setErrorMessage(message);
      log.error("Erro ao processar webhook_received {}: {}", item.getId(), message, e);
    }

    item.setProcessedAt(LocalDateTime.now(ZoneOffset.UTC));
    repository.save(item);
  }
}
