import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import fire from './../../fire';
import './../../CSS/Form.css';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            member: {}
        }
    }

    componentDidMount() {
        var user = fire.auth().currentUser;
		if(user) {
            var membersRef = fire.database().ref("members/");
            membersRef.child(user.uid).on("value", (data) =>
                this.setState({
                    member: data.val()
                    }));
        }
    }

	render() {
		var user = fire.auth().currentUser;
		if(user) {
            return (
				<div className="Home">
					<div className="container">
                        <div className="content">
                            <h1 className="form-header">Profile</h1>
                            <form method="POST">
                                <fieldset>
                                    <label htmlFor="firstName">First Name:</label>
                                    <input type="text" id="firstName" value={this.state.member.first_name} disabled />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="lastName">Last Name:</label>
                                    <input type="text" id="lastName" value={this.state.member.last_name} disabled />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="email">Email:</label>
                                    <input type="text" id="email" value={this.state.member.email} disabled />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="school">School:</label>
                                    <input type="text" id="school" value={this.state.member.school} disabled />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="bio">Bio:</label>
                                    <textarea type="text" id="bio" value={this.state.member.bio} disabled></textarea>
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="gradeLevel">Grade Level:</label>
                                    <input type="text" id="gradeLevel" value={this.state.member.grade_level} disabled />
                                </fieldset>
                                <fieldset>
                                    <label htmlFor="title">Title:</label>
                                    <input type="text" id="title" value={this.state.member.title} disabled />
                                </fieldset>
                            </form>
                        </div>
					</div>
				</div>
			);
        } else {
            return (
                <Redirect to='/login' />
            );
        }
	}
}

export default Profile;
