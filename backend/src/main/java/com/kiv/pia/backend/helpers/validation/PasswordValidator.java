package com.kiv.pia.backend.helpers.validation;

import com.kiv.pia.backend.helpers.constants.PasswordValidatorConst;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PasswordValidator {
    public PasswordValidator(){}

    public String getStrengthOfPassword(long score) {
        if(score == 0){
            return PasswordValidatorConst.TOO_SHORT;
        }
        else if(score < 25){
            return PasswordValidatorConst.WEAK;
        }
        else if(score < 50){
            return PasswordValidatorConst.FAIR;
        }
        else if(score < 75){
            return PasswordValidatorConst.GOOD;
        }
        else {
            return PasswordValidatorConst.STRONG;
        }
    }

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

        if(containsRegex(s, PasswordValidatorConst.NUMBER_REGEX)){
            charSetLength += PasswordValidatorConst.NUMBER_LENGTH;
        }
        if(containsRegex(s, PasswordValidatorConst.LOWER_CASE_REGEX)){
            charSetLength += PasswordValidatorConst.LOWER_CASE_LENGTH;
        }
        if(containsRegex(s, PasswordValidatorConst.UPPER_CASE_REGEX)){
            charSetLength += PasswordValidatorConst.UPPER_CASE_LENGTH;
        }
        if(containsRegex(s, PasswordValidatorConst.SPECIAL_REGEX)){
            charSetLength += PasswordValidatorConst.SPECIAL_LENGTH;
        }

        return charSetLength;
    }
}
