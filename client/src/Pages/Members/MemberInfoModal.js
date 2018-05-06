import React, { Component } from 'react';
import fire from './../../fire';
import './../../CSS/Card.css';

class MemberInfoModal extends Component {
	render() {
		return (
			<div
				className="modal fade"
				id={"memberModal-" + this.props.id}
				tabIndex="-1"
				role="dialog"
				data-backdrop="static"
				data-keyboard={false}
				aria-labelledby="MemberModal"
				aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="memberModalTitle">Member Details</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
										defaultValue={this.props.firstName + " " + this.props.lastName}
										disabled={true} />
								</div>
								<div className="form-group">
									<label htmlFor="email">Email:</label>
									<input
										type="text"
										name="email"
										className="form-control"
										defaultValue={this.props.email}
										disabled={true} />
								</div>
								<div className="form-group">
									<label htmlFor="school">School:</label>
									<input
										type="text"
										name="school"
										className="form-control"
										defaultValue={this.props.school}
										disabled={true} />
								</div>
								<div className="form-group">
									<label htmlFor="bio">Bio:</label>
									<textarea
										type="text"
										name="bio"
										className="form-control"
										defaultValue={this.props.bio}
										disabled={true}></textarea>
								</div>
								<div className="form-group">
									<label htmlFor="gradeLevel">Grade Level:</label>
									<input
										type="text"
										name="gradeLevel"
										className="form-control"
										defaultValue={this.props.gradeLevel}
										disabled={true} />
								</div>
								<div className="form-group">
									<label htmlFor="title">Title:</label>
									<input
										type="text"
										name="title"
										className="form-control"
										defaultValue={this.props.title}
										disabled={true} />
								</div>
								<div className="form-group">
									<label htmlFor="facebookId">Facebook ID:</label>
									<input
										type="text"
										name="facebookId"
										className="form-control"
										defaultValue={this.props.facebookId}
										disabled={true} />
								</div>
								<div className="form-group">
									<label htmlFor="twitterId">Twitter ID:</label>
									<input
										type="text"
										name="twitterId"
										className="form-control"
										defaultValue={this.props.twitterId}
										disabled={true} />
								</div>
							</div>

							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-primary"
									data-dismiss="modal">
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default MemberInfoModal;
