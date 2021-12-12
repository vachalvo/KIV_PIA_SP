package com.kiv.pia.backend.web_sockets;

/**
 * This interface used as an Observer for  ActiveUserManager class
 */
public interface ActiveUserChangeListener {
    void notifyActiveUserChange();
}