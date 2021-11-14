package com.kiv.pia.backend.model.enums;

public enum GenderType {
    MALE("male"),
    FEMALE("female");

    private final String name;

    GenderType(String name){
        this.name = name;
    }

    public String getName(){
        return name;
    }
}
