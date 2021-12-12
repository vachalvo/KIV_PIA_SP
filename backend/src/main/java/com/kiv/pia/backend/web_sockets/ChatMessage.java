package com.kiv.pia.backend.web_sockets;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {

    private String from;
    private String text;
    private String recipient;
    private String time;

    public ChatMessage(String from, String text, String recipient) {
        this.from = from;
        this.text = text;
        this.recipient = recipient;
        this.time = LocalDateTime.now().toString();
    }
}