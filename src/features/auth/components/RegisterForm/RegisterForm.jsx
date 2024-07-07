import React from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cn from 'classnames';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { registerUser } from "../../authSlice";
import styles from './RegisterForm.module.css';
import {LoaderIcon} from "../icons/LoaderIcon";
import { MESSAGES } from "../../../../constants/messages";
import { LABELS } from "../../../../constants/labels";

const schema = yup.object().shape({
    email: yup.string().required(MESSAGES.EMAIL_REQUIRED).email(MESSAGES.INVALID_EMAIL),
    password: yup.string().required(MESSAGES.PASSWORD_REQUIRED).min(6, MESSAGES.PASSWORD_MIN_LENGTH),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], MESSAGES.PASSWORDS_MUST_MATCH).required(MESSAGES.CONFIRM_PASSWORD_REQUIRED),
});


const RegisterForm = () => {
    const {
        register, 
        handleSubmit, 
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema)
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authStatus = useSelector((state) => state.auth.status);
    const authError = useSelector((state) => state.auth.error);
    const user = useSelector((state) => state.auth.user);

    const onSubmit = (data) => {
       dispatch(registerUser({email: data.email, password: data.password}));
    };


    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'Firebase: Error (auth/email-already-in-use).':
                return MESSAGES.EMAIL_ALREADY_IN_USE;
            case 'Firebase: Error (auth/invalid-email).':
                return MESSAGES.INVALID_EMAIL_FORMAT;
            default:
                return MESSAGES.GENERIC_ERROR;
        }
    };

    React.useEffect(() => {
        if (authStatus === 'succeeded' && user) {
            navigate(`/user/${user.uid}`);
        }
    }, [authStatus, user, navigate]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles['register-form']}>
            <div className="mb-4">
                <FloatingLabel
                    controlId="floatingEmail"
                    label="E-mail"
                    className={styles['register-form-label']}
                >
                    <Form.Control 
                        type="email" 
                        placeholder="E-mail" 
                        {...register('email')} 
                        isInvalid={!!errors.email}
                        className={cn(styles['register-form-control'], {
                            [styles['is-invalid']]: errors.email
                        })}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email && errors.email.message}
                    </Form.Control.Feedback>
                </FloatingLabel>
            </div>
            <div className="mb-4">
                 <FloatingLabel
                    controlId="floatingPassword"
                    label={LABELS.CREATE_PASS}
                    className={styles['register-form-label']}
                >
                    <Form.Control 
                        type="password" 
                        placeholder={LABELS.CREATE_PASS} 
                        {...register('password')} 
                        isInvalid={!!errors.password}
                        className={cn(styles['register-form-control'], {
                            [styles['is-invalid']]: errors.password
                        })}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password && errors.password.message}
                    </Form.Control.Feedback>
                </FloatingLabel>
            </div>
            <div className="mb-4"> 
                <FloatingLabel
                    controlId="confirmPassword"
                    label={LABELS.REPEAT_PASS}
                    className={styles['register-form-label']}
                >
                    <Form.Control 
                        type="password" 
                        placeholder={LABELS.REPEAT_PASS} 
                        {...register('confirmPassword')} 
                        isInvalid={!!errors.confirmPassword}
                        className={cn(styles['register-form-control'], {
                            [styles['is-invalid']]: errors.confirmPassword
                        })}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword && errors.confirmPassword.message}
                    </Form.Control.Feedback>
                </FloatingLabel>
            </div>
            <Button 
                type="submit" 
                size="lg"
                className={styles['register-button']}
                style={{ 
                    backgroundColor: "#00B627",  
                    borderColor: "#00B627" 
                }}
            >
               {authStatus === 'loading' ? (
                     <LoaderIcon className={styles['rotate-icon']} />
                ) : (
                    'Зарегистрироваться'
                )}
            </Button>
            <div className={styles['register-error']}>
                {authError && <span>{getErrorMessage(authError)}</span>}
            </div>
        </form>
    )
}

export default RegisterForm;