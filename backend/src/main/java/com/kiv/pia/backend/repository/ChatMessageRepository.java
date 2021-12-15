package com.kiv.pia.backend.repository;

import com.kiv.pia.backend.model.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ChatMessageRepository extends PagingAndSortingRepository<ChatMessage, UUID> {

    @Query("SELECT m from ChatMessage m" +
            "    WHERE (m.from.id = :firstId AND m.recipient.id = :secondId) OR " +
            "          (m.from.id = :secondId AND m.recipient.id = :firstId)")
    Page<ChatMessage> getChatMessageBetweenUsers(@Param("firstId") UUID firstId, @Param("secondId") UUID secondId, Pageable page);
}
