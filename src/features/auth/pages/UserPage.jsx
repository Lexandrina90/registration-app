import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import UserMenu from '../components/UserMenu/UserMenu';
import { auth } from '../../../shared/lib/firebase';
import styles from './AuthPages.module.css';
import {logout} from '../authSlice';

const UserPage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.error('Failed to sign out:', error);
        }
    };

    return (
        <div className={styles['user-page']}>
             <UserMenu 
                uid={id} 
                onLogout={handleLogout}
            />
            <div className={styles['user-page-header']}>
                <h1>User Page</h1>
            </div>
        </div>
    );
}

export default UserPage;
