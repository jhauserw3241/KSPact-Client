import React, { Component } from 'react';
import LoginRequired from './../Login/LoginRequired';
import HardwareCurriculumsTagInput from './HardwareCurriculumsTagInput';
import HardwareGradesTagInput from './HardwareGradesTagInput';
import EditHardwareModal from './EditHardwareModal';
import fire from './../../fire';
import './../../CSS/Card.css';

// CSS and JS for datetime picker
import "./../../../node_modules/react-datetime/css/react-datetime.css";
import DateTime from "./../../../node_modules/react-datetime/DateTime.js";

class HardwareElement extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: this.props.name,
			description: this.props.description,
			serialNum: this.props.serialNum,
			color: this.props.color,
			request_name: "",
			request_start: "",
			request_end: "",
		};

		this.deleteHardware = this.deleteHardware.bind(this);
		this.requestHardware = this.requestHardware.bind(this);
		this.validStart = this.validStart.bind(this);
		this.validEnd = this.validEnd.bind(this);
	}

	deleteHardware() {
		var updates = {};
        updates['/hardware/' + this.props.id] = null;
        fire.database().ref().update(updates);
	}

	requestHardware() {
		var self = this;

		// Get the member information
		var member_id = fire.auth().currentUser.uid;
		console.log(member_id);
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
				color: "#"+((1<<24)*Math.random()|0).toString(16) // Generate random color
			})
			.then(function() {
				// Clear the data in the hardware request modal
				self.setState({
					request_start: "",
					request_end: "",
				});
			})
			.catch(function(error) {
				this.props.updateFormError(error.code + ": " + error.message);
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
		var divStyle = {
            backgroundColor: this.state.color
		}
	
		return (
			<div className="HardwareElement card">
				<EditHardwareModal
					id={this.props.id}
					name={this.state.name}
					description={this.state.description}
					color={this.state.color}
					serialNum={this.state.serialNum} />

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
		
				<div className="card-img" style={divStyle} data-toggle="modal" data-target={"#editHardwareModal-" + this.props.id}></div>
				<div className="card-text" data-toggle="modal" data-target={"#editHardwareModal-" + this.props.id}>
					{this.props.name}
				</div>
				<div className="card-btns">
					<div className="mod-btns">
						<LoginRequired minRole="member">
							<button
								className="btn btn-success hardware-request-btn"
								data-toggle="modal"
								data-target={"#requestHardwareModal-" + this.props.id}>
								Request
							</button>
						</LoginRequired>
						<LoginRequired minRole="admin">
							<button className="btn btn-danger" onClick={this.deleteHardware}>
								Delete
							</button>
						</LoginRequired>
					</div>
				</div>
			</div>
		);
	}
}

export default HardwareElement;
