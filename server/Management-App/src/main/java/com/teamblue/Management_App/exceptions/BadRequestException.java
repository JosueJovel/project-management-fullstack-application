package com.teamblue.Management_App.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;

@AllArgsConstructor
@Getter
@Setter
public class BadRequestException extends RuntimeException{

    @Serial
    private static final long serialVersionUID = 3245571154243300505L;
    private String message;

}
