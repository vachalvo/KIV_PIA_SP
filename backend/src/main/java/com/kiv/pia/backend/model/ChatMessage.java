package com.kiv.pia.backend.model;

import com.kiv.pia.backend.model.enums.MessageType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ChatMessage {
    private MessageType type;
    private String content;
    private String sender;
    private String receiver;
    private LocalDateTime dateTime = LocalDateTime.now();
}
