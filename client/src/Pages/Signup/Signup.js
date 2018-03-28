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
            pic: "",
            formError: "",
            redirect: false
        }

        this.signUp = this.signUp.bind(this);
        this.handlePic = this.handlePic.bind(this);
    }

    signUp(event) {
        event.preventDefault();

        var self = this;

        // Check passwords are the same
        if(this.state.password !== this.state.confirmPassword) {
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
                    pic: self.state.pic,
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

    handlePic(event) {
        event.preventDefault();
        var self = this;

        var file = event.target.files[0];
        var ref = fire.storage().ref('profiles').child(file.name);        
        ref.put(file).then(()=>{
            ref.getDownloadURL().then((url) => {
                self.setState({pic: url});
            }).catch((err) => {
                self.setState({ formError: err.code + ": " + err.message });
            });
        }).catch((error) => {
            self.setState({ formError: error.code + ": " + error.message });
        });
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
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name:</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="form-control"
                                        value={this.state.first_name}
                                        onChange={(event) => this.setState({first_name: event.target.value})}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name:</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="form-control"
                                        value={this.state.last_name}
                                        onChange={(event) => this.setState({last_name: event.target.value})}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="text"
                                        name="email"
                                        className="form-control"
                                        value={this.state.email}
                                        onChange={(event) => this.setState({email: event.target.value})}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={this.state.password}
                                        onChange={(event) => this.setState({password: event.target.value})}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password:</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        value={this.state.confirmPassword}
                                        onChange={(event) => this.setState({confirmPassword: event.target.value})}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="school">School:</label>
                                    <input
                                        type="text"
                                        name="school"
                                        className="form-control"
                                        value={this.state.school}
                                        onChange={(event) => this.setState({school: event.target.value})}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="bio">Bio:</label>
                                    <textarea
                                        type="text"
                                        name="bio"
                                        className="form-control"
                                        value={this.state.bio}
                                        onChange={(event) => this.setState({bio: event.target.value})}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="gradeLevel">Grade Level:</label>
                                    <input
                                        type="text"
                                        name="gradeLevel"
                                        className="form-control"
                                        value={this.state.grade_level}
                                        onChange={(event) => this.setState({grade_level: event.target.value})}
                                        required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="title">Title:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        value={this.state.title}
                                        onChange={(event) => this.setState({title: event.target.value})} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pic">Picture:</label>
                                    <input
                                        type="file"
                                        name="pic"
                                        className="form-control"
                                        onChange={this.handlePic}/>
                                </div>
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
