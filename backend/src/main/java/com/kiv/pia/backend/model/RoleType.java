package com.kiv.pia.backend.model;

public enum RoleType {
    ROLE_USER("role_user"),
    ROLE_ADMIN("role_admin");

    private final String name;

    RoleType(String name){
        this.name = name;
    }

    public String getName(){
        return name;
    }
}
