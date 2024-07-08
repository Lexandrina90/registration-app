import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import cn from 'classnames';

import { TEXT } from '@/constants/text-constants';
import styles from './UserMenu.module.css';
import { SettingsIcon } from '@/features/auth/components/icons/SettingsIcon';
import { LogOutIcon } from '@/features/auth/components/icons/LogOutIcon';

const UserMenu = ({uid, onLogout}) => {
    return (
        <Navbar expand="lg" className={cn(styles['user-menu'], 'd-flex', 'justify-content-between')}>
            <div className={styles['user-menu-settings']}>
                <SettingsIcon />
                <Nav className="ml-3">
                    <Nav.Link as={Link} to={`/change-data/${uid}`}>{TEXT.USER.DATA_CHANGE}</Nav.Link>
                </Nav>
            </div>
            <Nav>
                <Nav.Link onClick={onLogout} className={styles['user-menu-logout']}>
                    <LogOutIcon />
                </Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default UserMenu;
