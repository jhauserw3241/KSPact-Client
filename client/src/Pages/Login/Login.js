import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import fire from './../../fire';

class Login extends Component {
    constructor(props) {
		super(props);
		this.state = {
            redirect: false,
			email: "",
			password: ""
		};

		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        var self = this;

        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(function(firebaseUser) {
            // Handle user having logged in succesfully
            self.setState({ redirect: true });
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }

	render() {
        if(this.state.redirect) {
            return (
                <Redirect to ="/home" />
            );
        } else  {
            return (
                <div className="Home">
                    <div className="container">
                        <form method="POST" onSubmit={this.handleSubmit}>
                            <fieldset>
                                <label htmlFor="email">Email:</label>
                                <input type="text" id="email" onChange={this.handleEmailChange} />
                            </fieldset>
                            <fieldset>
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" onChange={this.handlePasswordChange} />
                            </fieldset>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            );
        }
	}
}

export default Login;
