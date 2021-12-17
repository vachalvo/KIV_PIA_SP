package com.kiv.pia.backend.constants;

public class UserConst {
    private UserConst() { }  // Prevents instantiation

    public static final String FIRST_NAME_IS_BLANK = "First name is a required field!";
    public static final String LAST_NAME_IS_BLANK  = "Last name is a required field!";
    public static final String EMAIL_IS_BLANK = "First name is a required field!";
    public static final String PASSWORD_IS_BLANK  = "Password is a required field!";
    public static final String RE_ENTER_PASSWORD_IS_BLANK = "Re-enter password is a required field!";

    public static final int FIRST_NAME_MAX_LENGTH = 50;
    public static final int LAST_NAME_MAX_LENGTH = 50;
    public static final int EMAIL_MAX_LENGTH = 100;
    public static final int PASSWORD_MAX_LENGTH = 100;
    public static final int RE_ENTER_PASSWORD_MAX_LENGTH = 100;

    public static final String FIRST_NAME_SIZE = "First name must have lenght between 3 - " + FIRST_NAME_MAX_LENGTH + "";
    public static final String LAST_NAME_SIZE  = "Last name must have lenght between 3 - " + LAST_NAME_MAX_LENGTH + "";
    public static final String EMAIL_SIZE = "Email must have lenght between 5 - " + EMAIL_MAX_LENGTH + "";
    public static final String PASSWORD_SIZE  = "Password must have lenght between 5 - " + PASSWORD_MAX_LENGTH + "";
    public static final String RE_ENTER_PASSWORD_SIZE = "Re-enter password must have lenght between 5 - " + RE_ENTER_PASSWORD_MAX_LENGTH + "";

    public static final String FIRST_NAME_PATTERN = "First name contains not supported characters! (only a-Z is allowed)";
    public static final String LAST_NAME_PATTERN  = "Last name contains not supported characters! (only a-Z is allowed)";
    public static final String EMAIL_PATTERN = "Email format is not valid!";
    public static final String PASSWORD_PATTERN  = "Password has wrong format! (must have small and large letters, one number and size at between 5 - 30.";
    public static final String RE_ENTER_PASSWORD_PATTERN  = "Re-enter assword has wrong format! (must have small and large letters, one number and size at between 5 - 30.";

    public static final String RE_ENTER_PASSWORD_NOT_SAME = "Password and re-enter password are not same!";
}
