import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import cn from 'classnames';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { auth } from "../../../../shared/lib/firebase";

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { updateUserEmail, updateUserPassword, resetAuthStatus, logout } from "../../authSlice";
import authStyles from '../../pages/AuthPages.module.css';
import {LoaderIcon} from "../icons/LoaderIcon";
import { LABELS } from "../../../../constants/labels";
import { MESSAGES } from "../../../../constants/messages";
import { TEXT } from "../../../../constants/text-constants";

const schema = yup.object().shape({
    email: yup.string().required(MESSAGES.EMAIL_REQUIRED).email(MESSAGES.INVALID_EMAIL),
    password: yup.string().required(MESSAGES.PASSWORD_REQUIRED).min(6, MESSAGES.PASSWORD_MIN_LENGTH),
});

const ChangeDataForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const authStatus = useSelector((state) => state.auth.status);
    const authError = useSelector((state) => state.auth.error);

    const onSubmit = async (data) => {
        try {
            if (data.email) {
                await dispatch(updateUserEmail({ newEmail: data.email }));
            }
            if (data.password) {
                await dispatch(updateUserPassword({ newPassword: data.password }));
            } 
        } catch (error) {
            console.error('Failed to update user data:', error.message);
        } 
    };

    React.useEffect(() => {
        if (authStatus === 'succeeded') {
            dispatch(logout());
            dispatch(resetAuthStatus()); 
            navigate(`/login`);
        }
    }, [authStatus, navigate]);

    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'Firebase: Error (auth/missing-password).':
                return MESSAGES.PASSWORD_MISSING;
            case 'Firebase: Error (auth/invalid-credential).':
                return MESSAGES.INVALID_CREDENTIAL;
            case 'Firebase: Please verify the new email before changing email. (auth/operation-not-allowed).':
                return MESSAGES.VERIFY_EMAIL;
            default:
                return MESSAGES.GENERIC_ERROR;
        }
    };

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
                    TEXT.USER.SAVE_DATA
                )}
            </Button>
            <div className={authStyles['form-error']}>
                {authError && <span>{getErrorMessage(authError)}</span>}
            </div>
            
        </form>
    )
}

export default ChangeDataForm;