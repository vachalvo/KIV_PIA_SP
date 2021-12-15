package com.kiv.pia.backend.controller;

import com.kiv.pia.backend.helpers.constants.ChatMessageConst;
import com.kiv.pia.backend.mapper.ChatMessageMapper;
import com.kiv.pia.backend.model.ChatMessage;
import com.kiv.pia.backend.model.User;
import com.kiv.pia.backend.model.response.ErrorResponse;
import com.kiv.pia.backend.security.services.UserDetailsImpl;
import com.kiv.pia.backend.service.IChatMessageService;
import com.kiv.pia.backend.service.IUserService;
import com.kiv.pia.backend.web_sockets.ChatMessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/messages")
@CrossOrigin("http://localhost:3000")
public class MessageController {


    @Autowired
    private IUserService userService;

    @Autowired
    private IChatMessageService messageService;

    private final ChatMessageMapper messageMapper = new ChatMessageMapper();

    @GetMapping("/get")
    public ResponseEntity<?> getMessages(@RequestParam(value = "firstId", defaultValue = "") UUID firstId,
                                         @RequestParam(value = "secondId", defaultValue = "") UUID secondId) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        if(!userDetails.getId().equals(firstId) && !userDetails.getId().equals(secondId)){
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("Current user cannot perform this task!"));
        }

        User user = userService.findById(firstId);
        User second = userService.findById(secondId);
        if(user == null || second == null){
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("User does not exist!"));
        }

        Page<ChatMessage> chatMessages = messageService.getAllMessagesBetweenUsers(
                firstId,
                secondId,
                PageRequest.of(
                        ChatMessageConst.MESSAGE_PAGE,
                        ChatMessageConst.MESSAGE_COUNT,
                Sort.by(ChatMessageConst.MESSAGE_SORT_BY).descending()));

        List<ChatMessageResponse> responseList = messageMapper.toChatMessageResponseList(chatMessages.getContent());
        return ResponseEntity.ok().body(responseList);
    }
}
