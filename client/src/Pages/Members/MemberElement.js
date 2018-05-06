import React, { Component } from 'react';
import MemberInfoModal from './MemberInfoModal';
import fire from './../../fire';
import './../../CSS/Card.css';
import LoginRequired from '../Login/LoginRequired';

class MemberElement extends Component {	
	constructor(props) {
		super(props);

		this.state = {
			priv: this.props.priv,
		};

		this.updatePrivs = this.updatePrivs.bind(this);
	}

	updatePrivs() {
		// Update profile information
        var updates = {};
        updates['/member_priv/' + this.props.id] = this.state.priv;
        fire.database().ref().update(updates);
	}

	render() {
		return (
			<div className="MemberElement card">
				<MemberInfoModal
					id={this.props.id}
					firstName={this.props.firstName}
					lastName={this.props.lastName}
					email={this.props.email}
					school={this.props.school}
					bio={this.props.bio}
					gradeLevel={this.props.gradeLevel}
					title={this.props.title}
					facebookId={this.props.facebookId}
					twitterId={this.props.twitterId} />

				<div
					className="modal fade"
					id={"memberPrivModal-" + this.props.id}
					tabIndex="-1"
					role="dialog"
					aria-labelledby="MemberPrivModal"
					aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="memberPrivModalTitle">Member Privileges</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<form>
								<div className="modal-body">
									<div className="form-group">
										<label htmlFor="privLevel">Privilege Level:</label>
										<select
											name="privLevel"
											className="form-control"
											value={this.state.priv}
											onChange={(event) => this.setState({priv: event.target.value})}>
											<option value="owner">Owner</option>
											<option value="admin">Admin</option>
											<option value="member">Member</option>
										</select>
									</div>
								</div>

								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-primary"
										onClick={this.updatePrivs}
										data-dismiss="modal">
										Save
									</button>
									<button
										type="button"
										className="btn btn-danger"
										data-dismiss="modal">
										Cancel
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>

				<div
					className="card-img"
					style={{
						backgroundImage: `url(${this.props.pic ?
							this.props.pic : 'gs://ks-pact-website.appspot.com/defaults/profile.png'})`
					}}
					data-toggle="modal"
					data-target={"#memberModal-" + this.props.id}></div>
				<div
					className="card-text"
					data-toggle="modal"
					data-target={"#memberModal-" + this.props.id}>
					{this.props.firstName} {this.props.lastName}
				</div>
				<div className="card-btns">
					<LoginRequired minRole="owner">
						<button
							className="btn btn-primary"
							data-toggle="modal"
							data-target={"#memberPrivModal-" + this.props.id}>
							Privs
						</button>
					</LoginRequired>
				</div>
			</div>
		);
	}
}

export default MemberElement;
