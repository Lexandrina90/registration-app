import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import RegisterForm from '../components/RegisterForm/RegisterForm';
import styles from './AuthPages.module.css';
import { resetAuthStatus } from '../authSlice';
import { TEXT } from '../../../constants/text-constants';

const RegisterPage = () => {
    const dispatch = useDispatch();

    const handleResetAuthStatus = () => {
        dispatch(resetAuthStatus());
    };

    return (
        <div data-bs-theme="custom" className={styles['form-wrapper']}>
            <div className={styles['form-container']}>
                <h2>{TEXT.REGISTER.TITLE}</h2>
                <RegisterForm />
            </div>
            <p>
                {TEXT.REGISTER.LOGIN_PROMPT}
                <Button 
                    variant="link" 
                    as={Link} 
                    to="/login"
                    onClick={handleResetAuthStatus}
                >
                    {TEXT.REGISTER.LOGIN_LINK}
                </Button>
            </p>
        </div>
    );
};

export default RegisterPage;

