package com.kiv.pia.backend.helpers.constants;

public class PostConst {
    private PostConst() { }  // Prevents instantiation

    public static final String HEADER_IS_BLANK = "Header is a required field!";
    public static final String CONTENT_IS_BLANK  = "Content is a required field!";

    public static final String HEADER_SIZE = "Header must have lenght between 3 - 100!";
    public static final String CONTENT_SIZE  = "Content must have lenght at least 3!";
}