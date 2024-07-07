import React from 'react';
import logo from '../assets/images/logo.svg';

const Logo = ({ className }) => {
    return <img src={logo} alt="Logo" className={className} />;
};

export default Logo;
