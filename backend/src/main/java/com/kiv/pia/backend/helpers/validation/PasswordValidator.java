package com.kiv.pia.backend.helpers.validation;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PasswordValidator {

    private final int NUMBER_LENGTH = 10;
    private final int UPPER_CASE_LENGTH = 26;
    private final int LOWER_CASE_LENGTH = 26;
    private final int SPECIAL_LENGTH = 33;

    private final String NUMBER_REGEX = "[0-9]";
    private final String UPPER_CASE_REGEX = "[A-Z]";
    private final String LOWER_CASE_REGEX = "[a-z]";
    private final String SPECIAL_REGEX = "[^a-zA-Z0-9]";

    public PasswordValidator(){}

    /**
     * Calculate the given password entropy.
     * @param password is the password string.
     * @return calculated entropy
     */
    public long passwordEntropy(String password){
        if(password == null || password.length() == 0){
            return 0;
        }
        return calcEntropy(calcCharsetLengthWith(password), password.length());
    }

    /**
     * Calculate the entropy of a string based on the size of the charset used and
     * the length of the string.
     *
     * Based on:
     * http://resources.infosecinstitute.com/password-security-complexity-vs-length/
     * @param charset
     * @param length
     * @return
     */
    private long calcEntropy(long charset, int length){
        return Math.round(length * Math.log(charset) / Math.log(2));
    }

    private boolean containsRegex(String s, String regex) {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(s);

        return matcher.find();
    }

    /**
     * Calculate the total charset length of a string based on standart charset.
     * @param s string
     * @return total charset length of string
     */
    private long calcCharsetLengthWith(String s){
        long charSetLength = 0;

        if(containsRegex(s, NUMBER_REGEX)){
            charSetLength += NUMBER_LENGTH;
        }
        if(containsRegex(s, LOWER_CASE_REGEX)){
            charSetLength += LOWER_CASE_LENGTH;
        }
        if(containsRegex(s, UPPER_CASE_REGEX)){
            charSetLength += UPPER_CASE_LENGTH;
        }
        if(containsRegex(s, SPECIAL_REGEX)){
            charSetLength += SPECIAL_LENGTH;
        }

        return charSetLength;
    }
}
