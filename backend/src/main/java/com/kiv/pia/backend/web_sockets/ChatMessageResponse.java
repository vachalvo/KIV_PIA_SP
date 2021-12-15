package com.kiv.pia.backend.web_sockets;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageResponse {

    private String from;
    private String text;
    private String recipient;
    private String time;

    public ChatMessageResponse(String from, String text, String recipient) {
        this.from = from;
        this.text = text;
        this.recipient = recipient;
        this.time = LocalDateTime.now().toString();
    }

    public ChatMessageResponse(String from, String text, String recipient, LocalDateTime time) {
        this.from = from;
        this.text = text;
        this.recipient = recipient;
        this.time = time.toString();
    }
}