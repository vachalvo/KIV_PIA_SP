package com.kiv.pia.backend.service.impl;

import com.kiv.pia.backend.constants.FormConst;
import com.kiv.pia.backend.constants.UserConst;
import com.kiv.pia.backend.model.enums.GenderType;
import com.kiv.pia.backend.model.response.ErrorResponse;
import com.kiv.pia.backend.service.IFormService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Zde by bylo nejlepsi v ramci DRY metodiky neopakovat vse, co se v kazde metode opakuje.
 * Ovsem je to zde pouzito hlavne proto, kdyby se menila validace, nejakych
 * konkretnich policek, aby zmena byla primo zde v metode a nebylo potreba prochazet,
 * vsechny pouziti metod.
 *
 * Pokud by se jednalo o vetsi system urcite by se v tomto nakonec nedalo vyznat. Jelikoz
 * se jedna o male projekt, je to zde vyreseno takto.
 *
 * Zaroven si myslim ze timto zpusobem je citelnejsi, ktera validace / textace se pouzije pro
 * jake policko.
 */
@Service
public class FormServiceImpl implements IFormService {

    @Override
    public ResponseEntity<?> validateEmail(String email) {
        if(isEmpty(email)){
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse(FormConst.EMAIL_IS_BLANK));
        }
        if(!hasCorrectLength(email, 5, UserConst.EMAIL_MAX_LENGTH)){
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse(FormConst.EMAIL_SIZE));
        }

        if(!hasCorrectFormat(email, FormConst.EMAIL_REGEX)){
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse(FormConst.EMAIL_PATTERN));
        }

        return null;
    }

    @Override
    public ResponseEntity<?> validatePassword(String password) {
        if(isEmpty(password)){
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse(FormConst.PASSWORD_IS_BLANK));
        }

        if(!hasCorrectLength(password, 5, UserConst.PASSWORD_MAX_LENGTH)){
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse(FormConst.PASSWORD_SIZE));
        }

        if(!hasCorrectFormat(password, FormConst.PASSWORD_REGEX)){
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse(FormConst.PASSWORD_PATTERN));
        }

        return null;
    }

    @Override
    public ResponseEntity<?> validateReEnterPassword(String password) {
        if(isEmpty(password)){
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse(FormConst.RE_ENTER_PASSWORD_IS_BLANK));
        }

        if(!hasCorrectLength(password, 5, UserConst.RE_ENTER_PASSWORD_MAX_LENGTH)){
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse(FormConst.RE_ENTER_PASSWORD_SIZE));
        }

        if(!hasCorrectFormat(password, FormConst.RE_ENTER_PASSWORD_REGEX)){
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse(FormConst.RE_ENTER_PASSWORD_PATTERN));
        }

        return null;
    }

    @Override
    public ResponseEntity<?> validatePasswords(String password1, String password2) {
        if(password1.equals(password2)){
            return null;
        }

        return ResponseEntity
                .unprocessableEntity()
                .body(new ErrorResponse(FormConst.RE_ENTER_PASSWORD_NOT_SAME));

    }

    @Override
    public ResponseEntity<?> validateFirstName(String name) {
        if(isEmpty(name)){
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse(FormConst.FIRST_NAME_IS_BLANK));
        }

        if(!hasCorrectLength(name, 3, UserConst.FIRST_NAME_MAX_LENGTH)){
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse(FormConst.FIRST_NAME_SIZE));
        }

        if(!hasCorrectFormat(name, FormConst.FIRST_NAME_REGEX)){
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse(FormConst.FIRST_NAME_PATTERN));
        }

        return null;
    }

    @Override
    public ResponseEntity<?> validateLastName(String name) {
        if(isEmpty(name)){
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse(FormConst.LAST_NAME_IS_BLANK));
        }

        if(!hasCorrectLength(name, 3, UserConst.LAST_NAME_MAX_LENGTH)){
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse(FormConst.LAST_NAME_SIZE));
        }

        if(!hasCorrectFormat(name, FormConst.LAST_NAME_REGEX)){
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse(FormConst.LAST_NAME_PATTERN));
        }

        return null;
    }

    @Override
    public ResponseEntity<?> validateGender(String gender) {
        if(isEmpty(gender)){
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse(FormConst.GENDER_IS_BLANK));
        }

        if(!isGender(gender)){
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse(FormConst.GENDER_WRONG_VALUE));
        }

        return null;
    }

    private boolean isGender(String gender) {
        return gender.equals(GenderType.FEMALE.toString()) || gender.equals(GenderType.MALE.toString());
    }

    private boolean isEmpty(String s) {
        return s == null || s.isBlank();
    }

    private boolean hasCorrectLength(String s, int min, int max) {
        return s.length() >= min && s.length() <= max;
    }

    private boolean hasCorrectFormat(String s, String regexp) {
        Pattern regex = Pattern.compile(regexp);
        Matcher matcher = regex.matcher(s);
        return matcher.matches();
    }
}
