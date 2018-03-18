package com.jvegarag.championsmanager.errorhandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.rest.core.RepositoryConstraintViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.TransactionException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.persistence.RollbackException;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * Custom exception manager in charge of transforming the unhandled errors to JSON
 */
@RestControllerAdvice
public class CustomRestExceptionHandler {

    @Autowired
    MessageSource messageSource;

    /**
     *  This exception handler reports the result of constraint violations
     * @param ex
     * @return
     */
    @ExceptionHandler({ ConstraintViolationException.class })
    public ResponseEntity<Object> handleException(ConstraintViolationException ex) {
        List<String> errors = new ArrayList<>();
        for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
            errors.add( MessageFormat.format( "{0}: " + violation.getMessage(), violation.getPropertyPath() ) );
        }
        ApiError apiError = new ApiError(getMessage("validation.error.found"), errors);
        return new ResponseEntity<>(apiError, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ RepositoryConstraintViolationException.class })
    public ResponseEntity<Object> handleException(RepositoryConstraintViolationException ex) {
        List<String> errors = new ArrayList<>();
        for (ObjectError error: ex.getErrors().getAllErrors()) {
            errors.add(this.getMessage(error.getCode(), error.getArguments()));
        }
        ApiError apiError = new ApiError(getMessage("validation.error.found"), errors);
        return new ResponseEntity<>(apiError, new HttpHeaders(), HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler({ RollbackException.class })
    public ResponseEntity<Object> handleException(RollbackException ex) {
        if (ex.getCause() instanceof ConstraintViolationException) {
            return this.handleException((ConstraintViolationException)ex.getCause());
        }
        else {
            return this.handleException(ex.getCause());
        }
    }

    @ExceptionHandler({ TransactionException.class })
    public ResponseEntity<Object> handleException(TransactionException ex) {
        if (ex.getCause() instanceof RollbackException) {
            return this.handleException((RollbackException)ex.getCause());
        }
        else {
            return this.handleException(ex.getCause());
        }
    }

    /**
     * Default exception manager
     * @param ex any other exception that has not been caught by the more specific handlers
     * @return
     */
    @ExceptionHandler({ Throwable.class })
    public ResponseEntity<Object> handleException(Throwable ex) {
        ApiError apiError = new ApiError(getMessage("internal.error.found"), ex.getLocalizedMessage());
        return new ResponseEntity<>(apiError, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * Returns a i18n message from the message source
     * @param code
     * @param args
     * @return
     */
    private String getMessage(String code, Object[] args) {
        return messageSource.getMessage(code, args, LocaleContextHolder.getLocale());
    }

    /**
     * Returns a i18n message from the message source
     * @param code
     * @return
     */
    private String getMessage(String code) {
        return getMessage(code, new Object[]{});
    }
}