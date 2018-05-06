import React, { Component } from 'react';
import fire from './../../fire';

class MemberPrivModal extends Component {	
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
		);
	}
}

export default MemberPrivModal;
