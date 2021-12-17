package com.kiv.pia.backend.constants;

/**
 * Zde jsou vsechny pouzivane konstaty, ktere se tykaji formularu a hlavne validaci.
 */
public class FormConst {
    private FormConst() { }  // Prevents instantiation

    public static final String EMAIL_REGEX = "^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])";
    public static final String PASSWORD_REGEX = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{5," + UserConst.PASSWORD_MAX_LENGTH + "}$";
    public static final String RE_ENTER_PASSWORD_REGEX = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{5," + UserConst.RE_ENTER_PASSWORD_MAX_LENGTH + "}$";
    public static final String FIRST_NAME_REGEX = "^[a-zA-z]{3," + UserConst.FIRST_NAME_MAX_LENGTH + "}$";
    public static final String LAST_NAME_REGEX = "^[a-zA-z]{3," + UserConst.LAST_NAME_MAX_LENGTH + "}$";

    public static final String FIRST_NAME_IS_BLANK = "First name is a required field!";
    public static final String LAST_NAME_IS_BLANK  = "Last name is a required field!";
    public static final String EMAIL_IS_BLANK = "Email is a required field!";
    public static final String PASSWORD_IS_BLANK  = "Password is a required field!";
    public static final String RE_ENTER_PASSWORD_IS_BLANK = "Re-enter password is a required field!";
    public static final String GENDER_IS_BLANK = "Gender is a required field!";

    public static final String FIRST_NAME_SIZE = "First name must have lenght between 3 - " + UserConst.FIRST_NAME_MAX_LENGTH + "";
    public static final String LAST_NAME_SIZE  = "Last name must have lenght between 3 - " + UserConst.LAST_NAME_MAX_LENGTH + "";
    public static final String EMAIL_SIZE = "Email must have lenght between 5 - " + UserConst.EMAIL_MAX_LENGTH + "";
    public static final String PASSWORD_SIZE  = "Password must have lenght between 5 - " + UserConst.PASSWORD_MAX_LENGTH + "";
    public static final String RE_ENTER_PASSWORD_SIZE = "Re-enter password must have lenght between 5 - " + UserConst.RE_ENTER_PASSWORD_MAX_LENGTH + "";

    public static final String FIRST_NAME_PATTERN = "First name contains unsupported characters! (only a-Z is allowed)";
    public static final String LAST_NAME_PATTERN  = "Last name contains unsupported characters! (only a-Z is allowed)";
    public static final String EMAIL_PATTERN = "Email format is not valid!";
    public static final String PASSWORD_PATTERN  = "Password has wrong format! (must have small and large letters, one number and size at between 5 - " + UserConst.PASSWORD_MAX_LENGTH + "";
    public static final String RE_ENTER_PASSWORD_PATTERN  = "Re-enter password has wrong format! (must have small and large letters, one number and size at between 5 - " + UserConst.RE_ENTER_PASSWORD_MAX_LENGTH + "";

    public static final String GENDER_WRONG_VALUE  = "Gender contains unsupported value!";

    public static final String EMAIL_ALREADY_IN_USE = "Email is already used by another user!";
    public static final String RE_ENTER_PASSWORD_NOT_SAME = "Password and re-enter password are not same!";
}
