import React, { Component } from 'react';
import './../../CSS/Card.css';
import ProfilePic from './../../images/defaults/profile.png';

class MemberElement extends Component {	
	render() {
		var divStyle = {
			backgroundImage: `url(${this.props.pic ? this.props.pic : ProfilePic})`
		}
		
		return (
			<div
				className="MemberElement card"
				onClick={() => this.props.modalHandler(
					this.props.firstName,
					this.props.lastName,
					this.props.email,
					this.props.school,
					this.props.bio,
					this.props.pic,
					this.props.gradeLevel,
					this.props.title)}
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
