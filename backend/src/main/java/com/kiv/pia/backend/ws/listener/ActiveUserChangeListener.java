package com.kiv.pia.backend.ws.listener;

/**
 * This interface used as an Observer for  ActiveUserManager class
 */
public interface ActiveUserChangeListener {
    void notifyActiveUserChange(String connectedUserId, boolean connect);
}