import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {loginUser} from '../redux/reducer';

//Import from packages, and also any functions you need from the reducer file.
class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            //will use this for conditional rendering, depending on the truthiness or falsiness of this value on state (for the login in page).
            newUser: false
        }
    }

    toggle = () => {
        this.setState({
            newUser: !this.state.newUser
        })
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = () => {
        const {email, password} = this.state;
        axios.post('/auth/login', {email, password}).then(res => {
            //history is from package react-router-dom - allows you to see where you've been.
            //this will only fire is login is successful. Don't use a link here because that's insecure - will push them through even if they don't login or login incorrectly.
            this.props.loginUser(res.data)
            this.props.history.push('/front_page')
        }).catch(err => {
            console.log(err)
            alert("Login Failed")
        })
    }

    register = () => {
        const {email, password, firstName, lastName} = this.state;
        axios.post('/auth/register', {email, password, firstName, lastName}).then(res => {
            this.props.loginUser(res.data);
            this.props.history.push('/front_page');
        }).catch(err => {
            console.log(err)
            alert('Register Failed')
        })
    }
    
    render(){
        const {email, password, firstName, lastName} = this.state;
        return <div className = "login"> 
            <div className="login-container">
                <h1>Welcome!</h1>
                {!this.state.newUser ? 
                //Don't need parentheses for this conditional statement because there's no comparison. It's simpler. Can use them if you want.
                <div>
                    <input onChange={e => this.changeHandler(e)} name="email" type="text" value={email} placeholder="Email"/>
                    <input onChange={e => this.changeHandler(e)} name="password" type="text" value={password} placeholder="Password"/>
                    <div className="btn-container">
                        <button onClick={this.login}>Login</button>
                        <button onClick={this.toggle}>Sign Up</button>
                    </div>
                </div>
                :
                <div>
                    <input onChange={e => this.changeHandler(e)} name="firstName" type="text" value={firstName} placeholder="First Name"/>
                    <input onChange={e => this.changeHandler(e)} name="lastName" type="text" value={lastName} placeholder="Last Name"/>
                    <input onChange={e => this.changeHandler(e)} name="email" type="text" value={email} placeholder="Email"/>
                    <input onChange={e => this.changeHandler(e)} name="password" type="text" value={password} placeholder="Password"/>
                    <div className="btn-container">
                        <button onClick={this.register}>Register</button>
                        <button onClick={this.toggle}>I already have an account</button>
                    </div>
                </div> 

                }

            </div>
        </div>
    
    }
}


const mapStateToProps = state => state;

//You don't have to use mapStateToProps, but if you don't, you need to put 'null' in its place.
export default connect(mapStateToProps, {loginUser})(Login);