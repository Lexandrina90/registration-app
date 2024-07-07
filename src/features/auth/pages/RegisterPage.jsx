import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import RegisterForm from '../components/RegisterForm/RegisterForm';
import styles from './AuthPages.module.css';

const RegisterPage = () => {
  return (
    <div data-bs-theme="custom" className={styles['register-form-wrapper']}>
        <div className={styles['register-form-container']}>
            <h2>Регистрация</h2>
            <RegisterForm />
        </div>
        <p>
            Уже зарегистрированы?
            <Button 
                variant="link" 
                as={Link} 
                to="/login"
            >
                Войти
            </Button>
        </p>
    </div>
  );
};

export default RegisterPage;

