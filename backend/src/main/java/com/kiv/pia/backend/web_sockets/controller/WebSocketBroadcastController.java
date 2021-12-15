package com.kiv.pia.backend.web_sockets.controller;

import com.kiv.pia.backend.web_sockets.model.ChatMessageResponse;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketBroadcastController {

    @MessageMapping("/broadcast")
    @SendTo("/topic/messages")
    public ChatMessageResponse send(ChatMessageResponse chatMessage) throws Exception {
        return new ChatMessageResponse(chatMessage.getFrom(), chatMessage.getText(), "ALL");
    }
}