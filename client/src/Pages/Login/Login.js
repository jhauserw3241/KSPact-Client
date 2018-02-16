import React, { Component } from 'react';
import fire from './../../fire';

class Login extends Component {
    constructor(props) {
		super(props);
		this.state = {
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

        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
        
        /*fire.auth().onAuthStateChanged(
            function(user) {
                console.log("Authentication changed");
                if (user) {
                    // User is signed in.
                    alert("Email: " +  user.email);
                    user.getIdToken().then(function(accessToken) {
                        alert("User is signed in");
                    });
                } else {
                    alert("User is signed out");
                }
            },
            function(error) {
                console.log(error);
            }
        );*/
    }

	render() {
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

export default Login;
