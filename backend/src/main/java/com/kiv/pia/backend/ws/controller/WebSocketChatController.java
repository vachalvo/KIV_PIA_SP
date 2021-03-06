package com.kiv.pia.backend.ws.controller;

import com.kiv.pia.backend.model.ChatMessage;
import com.kiv.pia.backend.model.Friendship;
import com.kiv.pia.backend.model.User;
import com.kiv.pia.backend.service.IChatMessageService;
import com.kiv.pia.backend.service.IFriendshipService;
import com.kiv.pia.backend.service.IUserService;
import com.kiv.pia.backend.ws.listener.ActiveUserChangeListener;
import com.kiv.pia.backend.ws.ActiveUserManager;
import com.kiv.pia.backend.ws.model.ChatMessageResponse;
import com.kiv.pia.backend.ws.model.UserConnect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.UUID;

@RestController
@CrossOrigin(value = "http://localhost:3000")
public class WebSocketChatController implements ActiveUserChangeListener {

    private final static Logger LOGGER = LoggerFactory.getLogger(WebSocketChatController.class);

    @Autowired
    private SimpMessagingTemplate webSocket;

    @Autowired
    private ActiveUserManager activeUserManager;

    @Autowired
    private IChatMessageService messageService;

    @Autowired
    private IUserService userService;

    @Autowired
    private IFriendshipService friendshipService;

    @PostConstruct
    private void init() {
        activeUserManager.registerListener(this);
    }

    @PreDestroy
    private void destroy() {
        activeUserManager.removeListener(this);
    }

    @MessageMapping("/chat")
    public void send(SimpMessageHeaderAccessor sha, @Payload ChatMessageResponse chatMessage) {
        String sender = sha.getUser().getName();

        User from = userService.findById(UUID.fromString(chatMessage.getFrom()));
        User recipient = userService.findById(UUID.fromString(chatMessage.getRecipient()));

        Collection<Friendship> friendships = friendshipService.findAllByBothWays(from.getId(), recipient.getId());
        if(friendships.isEmpty()){
            return;
        }

        if(from != null && recipient != null ){
            // save message to DB
            LOGGER.info("Message between " + from.getId().toString() + " - " + recipient.getId() + " was transfered.");

            ChatMessage newMessage = new ChatMessage(from, recipient, chatMessage.getText(), LocalDateTime.now());
            messageService.save(newMessage);
        }

        ChatMessageResponse message = new ChatMessageResponse(chatMessage.getFrom(), chatMessage.getText(), chatMessage.getRecipient());

        if (!sender.equals(chatMessage.getRecipient())) {
            webSocket.convertAndSendToUser(sender, "/queue/messages", message);
        }

        webSocket.convertAndSendToUser(chatMessage.getRecipient(), "/queue/messages", message);
    }

    @Override
    public void notifyActiveUserChange(String connectedUserId, boolean connect) {
        UserConnect userConnect = new UserConnect(connectedUserId, connect);
        webSocket.convertAndSend("/topic/active", userConnect);
    }
}