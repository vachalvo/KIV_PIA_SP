package com.kiv.pia.backend.service;

import com.kiv.pia.backend.model.ChatMessage;
import com.kiv.pia.backend.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface IChatMessageService {

    ChatMessage save(ChatMessage t);
    Page<ChatMessage> getAllMessagesBetweenUsers(UUID firstId, UUID secondId, Pageable paging);
}
