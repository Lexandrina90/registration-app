import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';


import ChangeDataForm from '../components/ChangeDataForm/ChangeDataForm';
import styles from './AuthPages.module.css';
import { TEXT } from '../../../constants/text-constants';
import { auth } from '../../../shared/lib/firebase';
import { logout, resetAuthStatus } from '../authSlice';

const ChangeDataPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            dispatch(logout());
            dispatch(resetAuthStatus()); 
            navigate('/login');
        } catch (error) {
            console.error('Failed to sign out:', error);
        }
    };

    return (
        <div data-bs-theme="custom" className={styles['form-wrapper']}>
        <div className={styles['form-container']}>
            <h2>{TEXT.USER.DATA_CHANGE}</h2>
            <ChangeDataForm />
        </div>
        <p>
            <Button 
                variant="link" 
                as={Link} 
                to="/login"
                onClick={handleLogout}
            >
                {TEXT.USER.LOG_OUT}
            </Button>
        </p>
    </div>
    );
}

export default ChangeDataPage;
