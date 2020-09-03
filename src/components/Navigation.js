import React, {Component} from "react";
import ReactDOM from "react-dom";
import {
    Link,
} from 'react-router-dom';


class Navigation extends Component {
    render() {
        const notLogged =
            <ul className='linkList flex-box'>
                <li><Link className='link' to="/login">Zaloguj się</Link></li>
                <li><Link className='link register' to="/register">Załóż konto</Link></li>
            </ul>;
        const logged =
            <ul className='linkList flex-box'>
                <li><Link className='link' to="/logout">Wyloguj się</Link></li>
            </ul>;
        
        return (
         <>
            <h1>Welcome to Navigation page</h1>
        </>
        )
    }
}
export default Navigation;