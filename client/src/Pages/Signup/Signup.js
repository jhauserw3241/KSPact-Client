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
            school: "",
            bio: "",
            grade_level: "",
            title: ""
        }

        this.signUp = this.signUp.bind(this);
    }

    signUp(event) {
        // Get a key for a new member
        var newKey = fire.database().ref().child('members').push().key;

        // Collect the information for a new member
        var newMember = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            school: this.state.school,
            bio: this.state.bio,
            grade_level: this.state.grade_level,
            title: this.state.title,
            priv: "pending member",
            id: newKey
        };

        // Update profile information
        var updates = {};
        updates['/members/' + newKey] = newMember;
        fire.database().ref().update(updates);
    }

	render() {
		return (
            <div className="Signup">
                <div className="container">
                    <div className="content">
                        <h1 className="form-header">Profile</h1>
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

export default Signup;
