import React, {Component} from "react";
import {Link, Redirect} from 'react-router-dom';
import {postDataToAPI} from "./api/GetDataFromAPI";

class Login extends Component {
    state = {
        isPasswordProper: true,
        name: '',
        password: '',
        redirect: false
    };
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        const {isPasswordProper, name, password} = this.state;
        let passwordValid = password.length>=6 ? true : false;
        this.setState({
            isPasswordProper: passwordValid
        });
        if(isPasswordProper){
            const data = {name: name, password: password};
            postDataToAPI('/login', data).then((resp) => {
                this.setState({ redirect: true});
                this.props.changeLogStatus(true);                
            })
            .catch(error => {
                alert(error);
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
        const {isPasswordProper, name, password} = this.state;
        return (
         <section className='login flex-box'>
                {this.renderRedirect()}
                <div className='loginForm flex-box'>
                    <h1>Log in</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className='labels flex-box'>
                            <div>
                                <label id="name">Name<br/>
                                    <input type="text" name="name" value={name} onChange={this.handleChange}/>
                                </label>
                                <label id="password">Hasło<br/>
                                    <input type="password" name="password" value={password} onChange={this.handleChange}/>
                                </label>
                                <p className={isPasswordProper ? 'hide' : ''}>Podane hasło jest za krótkie!</p>
                            </div>
                        </div>
                        <button><Link to="/register" className='loginLink'>Załóż konto</Link></button>
                        <button>Zaloguj się</button>
                    </form>
                </div>
            </section>
        )
    }
}
export default Login;