import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import RegisterPage from '../../features/auth/pages/RegisterPage';
import LoginPage from '../../features/auth/pages/LoginPage';
import UserPage from '../../features/auth/pages/UserPage';
import ChangeDataPage from '../../features/auth/pages/ChangeDataPage';

const AuthRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RegisterPage />}/>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/user/:id" element={<UserPage />} />
                <Route path="/change-data/:id" element={<ChangeDataPage />} />
            </Routes>
        </Router>
    )
}

export default AuthRoutes;