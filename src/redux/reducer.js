import axios from 'axios';

const initialState = {
    user: {},
    isLoggedIn: false
}

//Action. Basically, what we want to do to state. An object returned from action creator function that will tell react what to do with state.
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const GET_USER = 'GET_USER';

//Action creator (will return an object with two properties, a type and a payload. Payload is the res.data from the axios call in the login function ( in Login.js).)
export function loginUser(user){
    return {
        type: LOGIN_USER,
        payload: user
    }
}

//Doesn't need to take any parameters in. Why?
export function logoutUser(){
    return {
        type: LOGOUT_USER,
        payload: initialState
    }
}

//We don't have a .then/.catch because of the middleware (promise??). Adam said something about this that I didn't quite catch.
export function getUser(){
    const user = axios.get('/auth/user')
    return {
        type: GET_USER,
        payload: user
    }
}

//Think of switch case and reducer as fancier way of doing this.setState. Basically doing the same thing.
export default function (state = initialState, action){
    switch(action.type){
        case LOGIN_USER:
            return {...state, user: action.payload, isLoggedIn:true}
        case LOGOUT_USER:
            return {...state, ...action.payload}
        case GET_USER + "_PENDING":
            return state
        case GET_USER + "_FULFILLED":
            return {...state, user: action.payload.data, isLoggedIn: true}
        case GET_USER + "_REJECTED":
            return initialState
        default:
            return initialState
    }

}