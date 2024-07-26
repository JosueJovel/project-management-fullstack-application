package com.teamblue.Management_App.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serial;

@AllArgsConstructor
@Getter
@Setter
public class NotAuthorizedException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 2138934050579993561L;
    private String message;
}
