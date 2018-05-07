import React, { Component } from 'react';
import { generateColor } from './../Common/Color';
import fire from './../../fire';

// CSS and JS for datetime picker
import "./../../../node_modules/react-datetime/css/react-datetime.css";
import DateTime from "./../../../node_modules/react-datetime/DateTime.js";

class RequestHardwareModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			request_start: "",
			request_end: "",
		};

		this.requestHardware = this.requestHardware.bind(this);
		this.validStart = this.validStart.bind(this);
		this.validEnd = this.validEnd.bind(this);
	}

	requestHardware() {
		var self = this;

		// Get the member information
		var cur_member = fire.auth().currentUser;
		if(!cur_member) {
			return;
		}
		var member_id = cur_member.uid;
		var memberRef = fire.database().ref('members').child(member_id);
		memberRef.on("value", function(data) {
			// Get member name
			var member = data.val();

			// Get id for hardware request
			var hardwareRequestRef = fire.database().ref('hardware_requests').push();
			var request_id = hardwareRequestRef.path["pieces_"][1];

			// Add hardware request object to firebase DB
			hardwareRequestRef.update({
				id: request_id,
				requestor_id: member_id,
				requestor_name: member.first_name + " " + member.last_name,
				requested_hardware_id: self.props.id,
				requested_hardware_name: self.props.name,				
				requested_hardware_serial_number: self.props.serialNum,
				start: self.state.request_start,
				end: self.state.request_end,
				status: "pending",
				color: generateColor(),
			})
			.then(function() {
				// Clear the data in the hardware request modal
				self.setState({
					request_start: "",
					request_end: "",
				});
			})
			.catch(function(error) {
				this.props.handleError(error.code + ": " + error.message);
			});
		});
	}

	validStart( current ) {
		if(this.state.request_end !== "") {
			return current.isBefore( this.state.request_end );
		} else {
			return true;
		}
	}

	validEnd( current ) {
		if(this.state.request_start !== "") {
			return current.isAfter( this.state.request_start );
		} else {
			return true;
		}
	}

	render() {
		return (
			<div
				className="modal fade"
				id={"requestHardwareModal-" + this.props.id}
				tabIndex="-1"
				role="dialog"
				aria-labelledby="HardwareModal"
				aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="requestHardwareModalTitle">Request Hardware</h5>
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
									<label htmlFor="request-start">Start Date:</label>
									<DateTime
										timeFormat={false}
										onChange={event => this.setState({ request_start: event._d })}
										inputProps={{ placeholder: "Click to select a date" }}
										isValidDate={(current) => this.validStart(current)} />
								</div>
								<div className="form-group">
									<label htmlFor="request-end">End Date:</label>
									<DateTime
										timeFormat={false}
										onChange={event => this.setState({ request_end: event._d })}
										inputProps={{ placeholder: "Click to select a date" }}
										isValidDate={(current) => this.validEnd(current)} />
								</div>
							</div>

							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-success"
									onClick={this.requestHardware}
									data-dismiss="modal">
									Send
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

export default RequestHardwareModal;
