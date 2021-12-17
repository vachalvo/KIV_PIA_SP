package com.kiv.pia.backend.annotations;

import com.kiv.pia.backend.validation.PasswordValidator;
import org.springframework.messaging.handler.annotation.Payload;

import javax.validation.Constraint;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = PasswordValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface PasswordConstraint {
    String message() default "Password is too weak.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
