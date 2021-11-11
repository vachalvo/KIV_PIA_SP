package com.kiv.pia.backend.helpers.constants;

public class UserConst {
    private UserConst() { }  // Prevents instantiation

    public static final String FIRST_NAME_NOT_NULL = "First name is a required field!";
    public static final String LAST_NAME_NOT_NULL  = "Last name is a required field!";
    public static final String EMAIL_NOT_NULL = "First name is a required field!";
    public static final String PASSWORD_NOT_NULL  = "Password is a required field!";
    public static final String RE_ENTER_PASSWORD_NOT_NULL = "Re-enter password is a required field!";

    public static final String FIRST_NAME_IS_BLANK = "First name can not be blank!";
    public static final String LAST_NAME_IS_BLANK  = "Last name can not be blank!";
    public static final String EMAIL_IS_BLANK = "First name can not be blank!";
    public static final String PASSWORD_IS_BLANK  = "Password can not be blank!";
    public static final String RE_ENTER_PASSWORD_IS_BLANK = "Re-enter password can not be blank!";

    public static final String FIRST_NAME_SIZE = "First name must have lenght between 3 - 30!";
    public static final String LAST_NAME_SIZE  = "Last name must have lenght between 3 - 30!";
    public static final String EMAIL_SIZE = "Email must have lenght between 5 - 50!";
    public static final String PASSWORD_SIZE  = "Password name must have lenght between 5 - 30!";
    public static final String RE_ENTER_PASSWORD_SIZE = "Re-enter password name must have lenght between 5 - 30!";

    public static final String FIRST_NAME_PATTERN = "First name contains not supported characters! (only a-Z is allowed)";
    public static final String LAST_NAME_PATTERN  = "Last name contains not supported characters! (only a-Z is allowed)";
    public static final String EMAIL_PATTERN = "Email format is not valid!";
    public static final String PASSWORD_PATTERN  = "Password has wrong format! (must have small and large letters, one number and size at between 5 - 30.";
    public static final String RE_ENTER_PASSWORD_PATTERN  = "Re-enter assword has wrong format! (must have small and large letters, one number and size at between 5 - 30.";

    public static final String RE_ENTER_PASSWORD_NOT_SAME = "Password and re-enter password are not same!";
}
