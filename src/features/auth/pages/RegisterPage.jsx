import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { TEXT } from '../../../constants/text-constants';

import RegisterForm from '../components/RegisterForm/RegisterForm';
import styles from './AuthPages.module.css';

const RegisterPage = () => {
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
            >
                {TEXT.REGISTER.LOGIN_LINK}
            </Button>
        </p>
    </div>
  );
};

export default RegisterPage;

