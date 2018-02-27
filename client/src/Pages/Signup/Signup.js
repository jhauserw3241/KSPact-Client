import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import fire from './../../fire';
import './../../CSS/Form.css';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirmPassword: "",
            school: "",
            bio: "",
            grade_level: "",
            title: "",
            formError: "",
            redirect: false
        }

        this.signUp = this.signUp.bind(this);

        //console.log("Start the signup class");
    }

    signUp(event) {
        event.preventDefault();

        var self = this;

        // Check passwords are the same
        if(this.state.password !== this.state.confirmPassword) {
            //console.log("Passwords were the same");
            this.setState({formError: "Passwords don't match"});
        }

        // Add user if no problems
        if(this.state.formError === "") {
            fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(function(data) {
                // Get info for current user
                var user = fire.auth().currentUser;

                // Add user information to firebase DB
                fire.database().ref('/members/' + user.uid)
                .set({
                    first_name: self.state.first_name,
                    last_name: self.state.last_name,
                    email: self.state.email,
                    school: self.state.school,
                    bio: self.state.bio,
                    grade_level: self.state.grade_level,
                    title: self.state.title,
                    priv: "pending member",
                    id: user.uid
                }).catch(function(error) {
                    self.setState({ formError: error.code + ": " + error.message });
                });

                // This is commented out for debug purposes
                // This will be officially added later on in the project
                /* user.sendEmailVerification().then(function() {
                    // Email sent.
                }).catch(function(error) {
                    // An error happened.
                });*/
            }).catch(function(error) {
                self.setState({ formError: error.code + ": " + error.message });
            });
        }
    }

	render() {
        if(this.state.redirect) {
            return (
                <Redirect to="/home" />
            );
        } else {
            return (
                <div className="Signup">
                    <div className="container">
                        <div className="content">
                            { (this.state.formError !== "") ?
                                <div class="alert alert-danger">
                                    <strong>Error:</strong> {this.state.formError}
                                </div> : null }
                            <h1 className="form-header">Sign Up</h1>
                            <form method="POST" onSubmit={this.signUp}>
                                <fieldset>
                                    <label htmlFor="firstName">First Name:</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={this.state.first_name}
                                        onChange={(event) => this.setState({first_name: event.target.value})}
                                        required />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="lastName">Last Name:</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={this.state.last_name}
                                        onChange={(event) => this.setState({last_name: event.target.value})}
                                        required />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={this.state.email}
                                        onChange={(event) => this.setState({email: event.target.value})}
                                        required />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={(event) => this.setState({password: event.target.value})}
                                        required />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="confirmPassword">Confirm Password:</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={this.state.confirmPassword}
                                        onChange={(event) => this.setState({confirmPassword: event.target.value})}
                                        required />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="school">School:</label>
                                    <input
                                        type="text"
                                        name="school"
                                        value={this.state.school}
                                        onChange={(event) => this.setState({school: event.target.value})}
                                        required />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="bio">Bio:</label>
                                    <textarea
                                        type="text"
                                        name="bio"
                                        value={this.state.bio}
                                        onChange={(event) => this.setState({bio: event.target.value})}></textarea>
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="gradeLevel">Grade Level:</label>
                                    <input
                                        type="text"
                                        name="gradeLevel"
                                        value={this.state.grade_level}
                                        onChange={(event) => this.setState({grade_level: event.target.value})}
                                        required />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="title">Title:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={this.state.title}
                                        onChange={(event) => this.setState({title: event.target.value})} />
                                </fieldset>
                                <input type="submit" value="Submit" />
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
	}
}

export default Signup;
