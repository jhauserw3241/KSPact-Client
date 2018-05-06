import React, { Component } from 'react';

class MemberRequestInfoModal extends Component {
	render() {
		return (
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
									onClick={this.props.approveRequest}
									data-dismiss="modal">
									Approve
								</button>
								<button
									type="button"
									className="btn btn-danger"
									onClick={this.props.declineRequest}
									data-dismiss="modal">
									Decline
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default MemberRequestInfoModal;
