import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch } from "react-redux";

import LoginForm from '@/features/auth/components/LoginForm/LoginForm';
import styles from './AuthPages.module.css';
import { TEXT } from '@/constants/text-constants';
import { resetAuthStatus } from '@/features/auth/authSlice';

const LoginPage = () => {
    const dispatch = useDispatch();

    const handleResetAuthStatus = () => {
        dispatch(resetAuthStatus());
    };

    return (
        <div data-bs-theme="custom" className={styles['form-wrapper']}>
        <div className={styles['form-container']}>
            <h2>{TEXT.LOGIN.TITLE}</h2>
            <LoginForm />
        </div>
        <p>
            {TEXT.LOGIN.REGISTER_PROMPT}
            <Button 
                variant="link" 
                as={Link} 
                to="/"
                onClick={handleResetAuthStatus}
            >
                {TEXT.LOGIN.REGISTER_LINK}
            </Button>
        </p>
    </div>
    );
}

export default LoginPage;
