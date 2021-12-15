package com.kiv.pia.backend.service.impl;

import com.kiv.pia.backend.model.ChatMessage;
import com.kiv.pia.backend.repository.ChatMessageRepository;
import com.kiv.pia.backend.service.IChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ChatMessageServiceImpl implements IChatMessageService {

    @Autowired
    private ChatMessageRepository messageRepository;

    @Override
    public ChatMessage save(ChatMessage message) {
        return messageRepository.save(message);
    }

    @Override
    public Page<ChatMessage> getAllMessagesBetweenUsers(UUID firstId, UUID secondId, Pageable paging) {
        return messageRepository.getChatMessageBetweenUsers(firstId, secondId, paging);
    }
}
