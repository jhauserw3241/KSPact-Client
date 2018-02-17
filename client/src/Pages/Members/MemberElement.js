import React, { Component } from 'react';
import './../../CSS/Card.css';
import ProfilePic from './../../images/defaults/profile.png';

class MemberElement extends Component {	
	render() {
		var divStyle = {
            backgroundImage: `url(${ProfilePic})`
        }
		
		var firstName = this.props.firstName;
		var lastName = this.props.lastName;
		var email = this.props.email;
		var school = this.props.school;
		var bio = this.props.bio;
		var picture = this.props.picture;
		var gradeLevel = this.props.gradeLevel;
		var title = this.props.title;
	
		return (
			<div
				className="MemberElement card"
				onClick={() => this.props.modalHandler(firstName, lastName, email, school, bio, picture, gradeLevel, title)}
			>
				<div className="card-img" style={divStyle}></div>
				<div className="card-text">
					{this.props.firstName} {this.props.lastName}
				</div>
			</div>
		);
	}
}

export default MemberElement;
