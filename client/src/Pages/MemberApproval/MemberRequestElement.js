import React, { Component } from 'react';
import MemberRequestInfoModal from './MemberRequestInfoModal';
import fire from './../../fire';
import './../../CSS/Card.css';

class MemberRequestElement extends Component {
	constructor(props) {
		super(props);

		this.approveRequest = this.approveRequest.bind(this);
		this.declineRequest = this.declineRequest.bind(this);
	}

	approveRequest() {
		// Update the privileges of the member
		var updates = {};
		updates['/member_priv/' + this.props.id] = "member";
	  
		fire.database().ref()
		.update(updates)
		.catch(function(error) {
			this.props.updateFormError(error.code + ": " + error.message);
		});
	}

	declineRequest() {
		// Update the status of the request
		var memberRequestRef = fire.database().ref('hardware_requests').child(this.props.id);
		memberRequestRef.update({
			status: "declined"
		})
		.catch(function(error) {
			this.props.updateFormError(error.code + ": " + error.message);
		});
	}

	render() {
		return (
			<div className="MemberRequestElement card">
				<MemberRequestInfoModal
					id={this.props.id}
					first_name={this.props.first_name}
					last_name={this.props.last_name}
					email={this.props.email}
					school={this.props.school}
					bio={this.props.bio}
					title={this.props.title} />
		
				<div
					className="card-img"
					style={{ backgroundImage: "url(" + this.props.pic + ")" }}
					data-toggle="modal"
					data-target={"#requestDetailsModal-" + this.props.id}></div>
				<div
					className="card-text"
					data-toggle="modal"
					data-target={"#requestDetailsModal-" + this.props.id}>
					{this.props.first_name} {this.props.last_name}
				</div>
				<div className="card-btns">
					<button
						type="button"
						className="btn btn-success"
						onClick={this.approveRequest}>
						Approve
					</button>
					<button
						type="button"
						className="btn btn-danger"
						onClick={this.declineRequest}>
						Decline
					</button>
				</div>
			</div>
		);
	}
}

export default MemberRequestElement;
