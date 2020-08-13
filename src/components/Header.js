import React from 'react';
import "./Header.css";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser, getUser} from '../redux/reducer';
import axios from 'axios';
//Need to use class component because he's going to use a component lifecycle method. 

class Header extends React.Component {
   
    componentDidMount(){
        this.props.getUser()
    }

    logout = () => {
        axios.get('/auth/logout').then(res => {
            this.props.logoutUser();
            this.props.history.push('/');
        }).catch(err => console.log(err))
    }
    
    render(){
       return <header>
        <div className='logo-container'>
            <img alt='logo' src="https://www.clipartmax.com/png/middle/101-1015647_i-made-yall-a-snoo-reddit-logo-png.png" className='logo'/>
        </div>
        {this.props.isLoggedIn 
        ?
        <h1>Welcome, {this.props.user.firstName} {this.props.user.lastName}</h1>
        : <h1>Schmeddit</h1> }
            <nav className='navigation'>
                <ul>
                <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/front_page">Front Page</Link></li>
                    <li><Link to="/">Logout</Link></li>
                </ul>
            </nav>
    </header>
    }
}

const mapStateToProps = state => state;

//Second argument is mapDispatchToProps. Object of methods. 
export default connect(mapStateToProps, {logoutUser, getUser})(Header);