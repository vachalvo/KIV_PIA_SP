package com.kiv.pia.backend.annotations;

import com.kiv.pia.backend.validation.NotSameValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = NotSameValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface NotSame {


    String message() default "Fields values don't match!";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };

    String field();

    String fieldMatch();

    @Target({ ElementType.TYPE })
    @Retention(RetentionPolicy.RUNTIME)
    @interface List {
        NotSame[] value();
    }
}