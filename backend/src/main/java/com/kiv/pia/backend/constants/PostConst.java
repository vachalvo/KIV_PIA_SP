package com.kiv.pia.backend.constants;

public class PostConst {
    private PostConst() { }  // Prevents instantiation

    public static final int HEADER_MAX_SIZE = 100;
    public static final int CONTENT_MAX_SIZE = 1000;

    public static final String HEADER_IS_BLANK = "Header is a required field!";
    public static final String CONTENT_IS_BLANK  = "Content is a required field!";

    public static final String HEADER_SIZE = "Header must have lenght between 3 - " + PostConst.HEADER_MAX_SIZE + "!";
    public static final String CONTENT_SIZE = "Content must have lenght between 3 - " + PostConst.CONTENT_MAX_SIZE + "!";

}