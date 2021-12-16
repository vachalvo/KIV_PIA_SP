package com.kiv.pia.backend.web_sockets.controller;

import com.kiv.pia.backend.web_sockets.ActiveUserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Set;

@RestController
@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/wsconnection")
public class WebSocketConnectionRestController {

    @Autowired
    private ActiveUserManager activeSessionManager;

    @PostMapping("/connect")
    public String userConnect(HttpServletRequest request,
                              @RequestParam(value = "userName", defaultValue = "") String userName) {
        String remoteAddr = "";
        if (request != null) {
            remoteAddr = request.getHeader("Remote_Addr");
            if (StringUtils.isEmpty(remoteAddr)) {
                remoteAddr = request.getHeader("X-FORWARDED-FOR");
                if (remoteAddr == null || "".equals(remoteAddr)) {
                    remoteAddr = request.getRemoteAddr();
                }
            }
        }

        activeSessionManager.add(userName, remoteAddr);
        return remoteAddr;
    }

    @PostMapping("/disconnect")
    public String userDisconnect(@RequestBody String userName) {
        activeSessionManager.remove(userName);
        return "disconnected";
    }

    @GetMapping("/get-active/{userName}")
    public Set<String> getActiveUsersExceptCurrentUser(@PathVariable String userName) {
        return activeSessionManager.getActiveUsersExceptCurrentUser(userName);
    }
}
