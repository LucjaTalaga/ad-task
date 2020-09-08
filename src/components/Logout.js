import React, {Component} from "react";
import getDataFromAPI from "./api/GetDataFromAPI";
import {Redirect} from 'react-router-dom';


class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
          redirect: false
    }}

    componentDidMount() {
        if (!this.props.isLogged){
            this.setState({ redirect: true});
        }
        getDataFromAPI('/logout').then(resp => {
            const mssg = resp.mssg;
            if (mssg === 'redirect'){
                this.setState({ redirect: true});
            }
            else if (mssg === 'logged out'){
                this.props.changeLogStatus(false);
            }
            else {
                alert("logout error");
            }
            });;
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
      }
    
    render() {
        return (
         <>
            {this.renderRedirect()}
            <h1 className="header">You have been logged out</h1>
        </>
        )
    }
}
export default Logout;