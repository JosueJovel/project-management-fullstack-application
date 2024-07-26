package com.teamblue.Management_App.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;

@AllArgsConstructor
@Getter
@Setter
public class NotFoundException extends RuntimeException{

    @Serial
    private static final long serialVersionUID = 96236809606774716L;
    private String message;
}
