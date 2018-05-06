import React, { Component } from 'react';
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
		var divStyle = {
            backgroundImage: "url(" + this.props.pic + ")"
		}
	
		return (
			<div className="MemberRequestElement card">
				<div
					className="modal fade"
					id={"requestDetailsModal-" + this.props.id}
					tabIndex="-1"
					role="dialog"
					data-backdrop="static"
					data-keyboard={false}
					aria-labelledby="MemberRequestModal"
					aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="requestDetailsTitle">Member Information</h5>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<form>
								<div className="modal-body">
									<div className="form-group">
										<label htmlFor="name">Name:</label>
										<input
											type="text"
											name="name"
											className="form-control"
											value={this.props.first_name + " " + this.props.last_name}
											disabled={true} />
									</div>
									<div className="form-group">
										<label htmlFor="email">Email:</label>
										<input
											type="text"
											name="email"
											className="form-control"
											value={this.props.email}
											disabled={true} />
									</div>
									<div className="form-group">
										<label htmlFor="school">School:</label>
										<input
											type="text"
											name="school"
											className="form-control"
											value={this.props.school}
											disabled={true} />
									</div>
									<div className="form-group">
										<label htmlFor="bio">Bio:</label>
										<textarea
											className="form-control"
											name="bio"
											value={this.props.bio}
											disabled={true}></textarea>
									</div>
									<div className="form-group">
										<label htmlFor="title">Title:</label>
										<input
											type="text"
											name="title"
											className="form-control"
											value={this.props.title}
											disabled={true} />
									</div>
								</div>

								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-success"
										onClick={this.approveRequest}
										data-dismiss="modal">
										Approve
									</button>
									<button
										type="button"
										className="btn btn-danger"
										onClick={this.declineRequest}
										data-dismiss="modal">
										Decline
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
		
				<div className="card-img" style={divStyle} data-toggle="modal" data-target={"#requestDetailsModal-" + this.props.id}></div>
				<div className="card-text" data-toggle="modal" data-target={"#requestDetailsModal-" + this.props.id}>
					{this.props.name}
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
