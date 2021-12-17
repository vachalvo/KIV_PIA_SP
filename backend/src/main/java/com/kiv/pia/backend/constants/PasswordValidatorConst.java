package com.kiv.pia.backend.constants;

public class PasswordValidatorConst {
    PasswordValidatorConst() {
    }

    public static final int NUMBER_LENGTH = 10;
    public static final int UPPER_CASE_LENGTH = 26;
    public static final int LOWER_CASE_LENGTH = 26;
    public static final int SPECIAL_LENGTH = 33;

    public static final String NUMBER_REGEX = "[0-9]";
    public static final String UPPER_CASE_REGEX = "[A-Z]";
    public static final String LOWER_CASE_REGEX = "[a-z]";
    public static final String SPECIAL_REGEX = "[^a-zA-Z0-9]";

    public static final int WEAK_LIMIT = 25;
}
