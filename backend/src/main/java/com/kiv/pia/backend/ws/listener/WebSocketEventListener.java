package com.kiv.pia.backend.ws.listener;

import com.kiv.pia.backend.model.Friendship;
import com.kiv.pia.backend.model.User;
import com.kiv.pia.backend.service.IFriendshipService;
import com.kiv.pia.backend.ws.ActiveUserManager;
import com.kiv.pia.backend.ws.model.ActiveUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHttpHeaders;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

import java.security.Principal;
import java.util.*;

@Component
public class WebSocketEventListener {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @Autowired
    private ActiveUserManager activeUserManager;

    @Autowired
    private IFriendshipService friendshipService;

    @EventListener
    public void handleSubscribeEvent(SessionSubscribeEvent event) {
        UUID id = UUID.fromString(event.getUser().getName());
        sendFriendsToUser(id);
    }

    public void sendFriendsToUser(UUID id) {
        Set<String> activeUsers = activeUserManager.getAll();

        Collection<Friendship> friendships = friendshipService.findAllFriends(id);
        List<ActiveUser> activeFriends = new ArrayList<>();

        for(Friendship f : friendships){
            User user = f.getSourceUser().getId().equals(id)
                    ? f.getEndUser()
                    : f.getSourceUser();
            ActiveUser activeUser = new ActiveUser(
                    user.getId(),
                    user.getEmail(),
                    user.getName(),
                    user.getGender(),
                    true
            );
            boolean isOnline = false;
            for(String s : activeUsers){
                if(s.contains(user.getId().toString())){
                    activeFriends.add(activeUser);
                    isOnline = true;
                    break;
                }
            }
            if(!isOnline){
                activeUser.setIsOnline(false);
                activeFriends.add(activeUser);
            }
        }

        messagingTemplate.convertAndSendToUser(id.toString(), "/queue/users", activeFriends);
    }

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor stompAccessor = StompHeaderAccessor.wrap(event.getMessage());
        @SuppressWarnings("rawtypes")
        GenericMessage connectHeader = (GenericMessage) stompAccessor
                .getHeader(SimpMessageHeaderAccessor.CONNECT_MESSAGE_HEADER);
        // to the server
        @SuppressWarnings("unchecked")
        Map<String, List<String>> nativeHeaders = (Map<String, List<String>>) connectHeader.getHeaders()
                .get(SimpMessageHeaderAccessor.NATIVE_HEADERS);

        String login = nativeHeaders.get("username").get(0);
        String sessionId = stompAccessor.getSessionId();

        logger.info("Chat connection by user <{}> with sessionId <{}>", login, sessionId);

    }

    private String getAuthorizationToken(Message<byte[]> message) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);

        List<String> authorization = Optional.of(headerAccessor)
                .map($ -> $.getNativeHeader(WebSocketHttpHeaders.AUTHORIZATION))
                .orElse(Collections.emptyList());
        // if header does not exists returns null instead empty list :/

        return authorization.stream()
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Missing access token in Stomp message headers"));
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        Principal p =  headerAccessor.getUser();

        if(p != null && p.getName() != null) {
            logger.info("User Disconnected : " + p.getName());
            activeUserManager.remove(p.getName());
        }
    }
}