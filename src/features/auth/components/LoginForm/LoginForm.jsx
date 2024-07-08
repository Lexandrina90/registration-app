import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cn from 'classnames';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { loginUser, resetAuthStatus } from "@/features/auth/authSlice";
import authStyles from '@/features/auth/pages/AuthPages.module.css';
import {LoaderIcon} from "@/features/auth/components/icons/LoaderIcon";
import { LABELS } from "@/constants/labels";
import { MESSAGES } from "@/constants/messages";
import { TEXT } from "@/constants/text-constants";

const schema = yup.object().shape({
    email: yup.string().required(MESSAGES.EMAIL_REQUIRED).email(MESSAGES.INVALID_EMAIL),
    password: yup.string().required(MESSAGES.PASSWORD_REQUIRED).min(6, MESSAGES.PASSWORD_MIN_LENGTH),
});

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authStatus = useSelector((state) => state.auth.status);
    const authError = useSelector((state) => state.auth.error);
    const user = useSelector((state) => state.auth.user);

    const onSubmit = (data) => {
        dispatch(loginUser({ email: data.email, password: data.password }));
    };

    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'Firebase: Error (auth/missing-password).':
                return MESSAGES.PASSWORD_MISSING;
            case 'Firebase: Error (auth/invalid-credential).':
                return MESSAGES.INVALID_CREDENTIAL;
            default:
                return MESSAGES.GENERIC_ERROR;
        }
    };

    React.useEffect(() => {
        if (authStatus === 'succeeded' && user) {
            navigate(`/user/${user.uid}`);
            dispatch(resetAuthStatus()); 
        }
    }, [authStatus, user, navigate]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={authStyles['form']}>
            <div className="mb-4">
                <FloatingLabel
                    controlId="floatingEmail"
                    label="E-mail"
                    className={authStyles['form-label']}
                >
                    <Form.Control 
                        type="email" 
                        placeholder="E-mail" 
                        {...register('email')} 
                        isInvalid={!!errors.email}
                        className={cn(authStyles['form-control'], {
                            [authStyles['is-invalid']]: errors.email
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
                    label={LABELS.PASS}
                    className={authStyles['form-label']}
                >
                    <Form.Control 
                        type="password" 
                        placeholder={LABELS.PASS} 
                        {...register('password')} 
                        isInvalid={!!errors.password}
                        className={cn(authStyles['form-control'], {
                            [authStyles['is-invalid']]: errors.password
                        })}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password && errors.password.message}
                    </Form.Control.Feedback>
                </FloatingLabel>
            </div>
            <Button 
                type="submit" 
                size="lg"
                className={authStyles['form-button']}
                style={{ 
                    backgroundColor: "#00B627",  
                    borderColor: "#00B627" 
                }}
            >
               {authStatus === 'loading' ? (
                     <LoaderIcon className={authStyles['rotate-icon']} />
                ) : (
                    TEXT.REGISTER.LOGIN_LINK
                )}
            </Button>
            <div className={authStyles['form-error']}>
                {authError && <span>{getErrorMessage(authError)}</span>}
            </div>
            
        </form>
    )
}

export default LoginForm;