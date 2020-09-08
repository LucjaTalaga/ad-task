import React, {Component} from "react";
import {
    Link,
} from 'react-router-dom';


class Navigation extends Component {

    render() {
        const notLogged =
            <ul className='linkList flex-box'>
                <li><Link className='link' to="/login">Log in</Link></li>
                <li><Link className='link' to="/register">Register</Link></li>
            </ul>;
        const logged =
            <ul className='linkList flex-box'>
                <li><Link className='link' to="/logout">Log out</Link></li>
            </ul>;
        
        return (
         <section className="navigation">
            <h1 className='header'>CRUD App</h1>
            {this.props.isLogged ? logged : notLogged}
        </section>
        )
    }
}
export default Navigation;