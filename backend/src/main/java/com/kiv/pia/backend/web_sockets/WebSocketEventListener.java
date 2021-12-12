package com.kiv.pia.backend.web_sockets;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHttpHeaders;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
public class WebSocketEventListener {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @EventListener(SessionSubscribeEvent.class)
    public void onWebSocketSessionsConnected(SessionSubscribeEvent event) {
        Message<byte[]> eventMessage = event.getMessage();
        String token = getAuthorizationToken(eventMessage);
        System.out.println(token);
        // Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        // do whatever you need with user, throw exception if user should not be connected
        // ... TODO
    }

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {

        StompHeaderAccessor stompAccessor = StompHeaderAccessor.wrap(event.getMessage());
        @SuppressWarnings("rawtypes")
        GenericMessage connectHeader = (GenericMessage) stompAccessor
                .getHeader(SimpMessageHeaderAccessor.CONNECT_MESSAGE_HEADER);
        // to the server
        @SuppressWarnings("unchecked")
        Map<String, List<String>> nativeHeaders = (Map<String, List<String>>) connectHeader.getHeaders()
                .get(SimpMessageHeaderAccessor.NATIVE_HEADERS);

        String login = nativeHeaders.get("username").get(0);
        String sessionId = stompAccessor.getSessionId();

        logger.info("Chat connection by user <{}> with sessionId <{}>", login, sessionId);

    }

    private String getAuthorizationToken(Message<byte[]> message) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);

        List<String> authorization = Optional.of(headerAccessor)
                .map($ -> $.getNativeHeader(WebSocketHttpHeaders.AUTHORIZATION))
                .orElse(Collections.emptyList());
        // if header does not exists returns null instead empty list :/

        return authorization.stream()
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Missing access token in Stomp message headers"));
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        // TODO
        /*StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        String username = (String) headerAccessor.getSessionAttributes().get("username");
        String privateUsername = (String) headerAccessor.getSessionAttributes().get("private-username");
        if(username != null) {
            logger.info("User Disconnected : " + username);

            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setStatus(MessageType.LEAVE);
            chatMessage.setSenderName(username);
            chatMessage.setSenderId(username);


            messagingTemplate.convertAndSend("/topic/pubic", chatMessage);
        }

        if(privateUsername != null) {
            logger.info("User Disconnected : " + privateUsername);

            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setType(MessageType.LEAVE);
            chatMessage.setSender(privateUsername);

            messagingTemplate.convertAndSend("/queue/reply", chatMessage);
        }*/
    }
}