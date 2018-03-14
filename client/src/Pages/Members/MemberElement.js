import React, { Component } from 'react';
import './../../CSS/Card.css';
import ProfilePic from './../../Images/defaults/profile.png';

class MemberElement extends Component {	
	constructor(props) {
		super(props);

		this.state = {
			firstName: this.props.firstName,
			lastName: this.props.lastName,
			email: this.props.email,
			school: this.props.school,
			bio: this.props.bio,
			pic: this.props.pic,
			gradeLevel: this.props.gradeLevel,
			title: this.props.title
		};
	}
	render() {
		var divStyle = {
			backgroundImage: `url(${this.props.pic ? this.props.pic : ProfilePic})`
		}
		
		return (
			<div className="MemberElement card">
				<div
					className="modal fade"
					id={"memberModal-" + this.props.id}
					tabIndex="-1"
					role="dialog"
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
									<fieldset>
										<label htmlFor="name">Name:</label>
										<input
											type="text"
											name="name"
											value={this.state.firstName + " " + this.state.lastName}
											disabled={false} />
									</fieldset>
									<fieldset>
										<label htmlFor="email">Email:</label>
										<input
											type="text"
											name="email"
											value={this.state.email}
											disabled={false} />
									</fieldset>
									<fieldset>
										<label htmlFor="school">School:</label>
										<input
											type="text"
											name="school"
											value={this.state.school}
											disabled={false} />
									</fieldset>
									<fieldset>
										<label htmlFor="bio">Bio:</label>
										<input
											type="text"
											name="bio"
											value={this.state.bio}
											disabled={false} />
									</fieldset>
									<fieldset>
										<label htmlFor="gradeLevel">Grade Level:</label>
										<input
											type="text"
											name="gradeLevel"
											value={this.state.gradeLevel}
											disabled={false} />
									</fieldset>
									<fieldset>
										<label htmlFor="title">Title:</label>
										<input
											type="text"
											name="title"
											value={this.state.title}
											disabled={false} />
									</fieldset>
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

				<div className="card-img" style={divStyle} data-toggle="modal" data-target={"#memberModal-" + this.props.id}></div>
				<div className="card-text" data-toggle="modal" data-target={"#memberModal-" + this.props.id}>
					{this.props.firstName} {this.props.lastName}
				</div>
			</div>
		);
	}
}

export default MemberElement;
