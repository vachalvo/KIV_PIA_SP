package com.kiv.pia.backend.mapper;

import com.kiv.pia.backend.model.ChatMessage;
import com.kiv.pia.backend.web_sockets.model.ChatMessageResponse;

import java.util.ArrayList;
import java.util.List;

public class ChatMessageMapper {

    public ChatMessageMapper(){}

    private ChatMessageResponse toChatMessageResponse(ChatMessage chatMessage){
        return new ChatMessageResponse(chatMessage.getFrom().getId().toString(),
                chatMessage.getText(),
                chatMessage.getRecipient().getId().toString(),
                chatMessage.getTime());
    }

    public List<ChatMessageResponse> toChatMessageResponseList(List<ChatMessage> chatMessages){
        List<ChatMessageResponse> responses = new ArrayList<>();

        for(ChatMessage chatMessage : chatMessages){
            responses.add(this.toChatMessageResponse(chatMessage));
        }

        return responses;
    }
}
