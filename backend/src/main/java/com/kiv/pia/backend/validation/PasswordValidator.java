package com.kiv.pia.backend.validation;

import com.kiv.pia.backend.constants.PasswordValidatorConst;
import com.kiv.pia.backend.annotations.PasswordConstraint;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PasswordValidator implements
        ConstraintValidator<PasswordConstraint, String> {

    @Override
    public void initialize(PasswordConstraint password) {
    }

    @Override
    public boolean isValid(String password,
                           ConstraintValidatorContext cxt) {
        return password != null &&
                passwordEntropy(password) >= PasswordValidatorConst.WEAK_LIMIT;
    }

    /**
     * Calculate the given password entropy.
     * @param password is the password string.
     * @return calculated entropy
     */
    private long passwordEntropy(String password){
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

