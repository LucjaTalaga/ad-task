import React, {Component} from "react";
import {Link, Redirect} from 'react-router-dom';
import {postDataToAPI} from "./api/GetDataFromAPI";


class Register extends Component {
    state = {
        isNameProper: true,
        isPasswordProper: true,
        isPasswordRepeatProper: true,
        name: '',
        password: '',
        passwordRepeat: '',
        redirect: false
    };
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        const {isNameProper, isPasswordProper, isPasswordRepeatProper, name, password, passwordRepeat} = this.state;
        let nameVaild = name.length >= 1 ? true : false;
        let passwordValid = password.length >= 6 ? true : false;
        let passwordsMatch = password.localeCompare(passwordRepeat) === 0 ? true : false;
        this.setState({
            isNameProper: nameVaild,
            isPasswordProper: passwordValid,
            isPasswordRepeatProper: passwordsMatch
        });
        if(isNameProper && isPasswordProper && isPasswordRepeatProper){
            const data = {name: name, password: password};
            postDataToAPI('/register', data).then((resp) => {
                this.setState({ redirect: true});
                this.props.changeLogStatus(true);                
            })
            .catch(error => {
                alert("Username already taken");
            });
        }
    };

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
      }

    componentDidMount(){
          if (this.props.isLogged){
            this.setState({ redirect: true});    
          }
      }


    render() {
        const {isNameProper, isPasswordProper, isPasswordRepeatProper, name, password, passwordRepeat} = this.state;
        return (
            <section className='register flex-box'>
                {this.renderRedirect()}
                <div className='registerForm flex-box'>
                    <h1>Register</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className='labels flex-box'>
                            <div>
                                <label id="name">Name<br/>
                                    <input type="text" name="name" value={name} onChange={this.handleChange}/>
                                </label>
                                <p className={isNameProper ? 'hide' : ''}>Please type the proper name!</p>
                                <label id="password">Password<br/>
                                    <input type="password" name="password" value={password} onChange={this.handleChange}/>
                                </label>
                                <p className={isPasswordProper ? 'hide' : ''}>Password is too short</p>
                                <label id="passwordRepeat">Repeat password<br/>
                                    <input type="password" name="passwordRepeat" value={passwordRepeat} onChange={this.handleChange}/>
                                </label>
                                <p className={isPasswordRepeatProper ? 'hide' : ''}>Passwords doesn't match</p>
                            </div>
                        </div>
                        <button><Link to="/login" className='registerLink'>Log in</Link></button>
                        <button>Register</button>
                    </form>
                </div>
            </section>
        )
    }
}
export default Register;