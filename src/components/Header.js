import React from 'react';
import "./Header.css";

const Header = () => {
    return <header>
        <div className='logo-container'>
            <img alt='logo' src="https://www.clipartmax.com/png/middle/101-1015647_i-made-yall-a-snoo-reddit-logo-png.png" className='logo'/>
        </div>
        <h1>Schmeddit</h1> 
            <nav className='navigation'>
                <ul>
                    <li>Profile</li>
                    <li>Front Page</li>
                    <li>Logout</li>
                </ul>
            </nav>
    </header>
}

export default Header;