import React, { Component } from 'react';
import HardwareRequestInfoModal from './HardwareRequestInfoModal';
import fire from './../../fire';
import './../../CSS/Card.css';

class HardwareRequestElement extends Component {
	constructor(props) {
		super(props);

		this.approveRequest = this.approveRequest.bind(this);
		this.declineRequest = this.declineRequest.bind(this);
	}

	approveRequest() {
		// Update the status of the request
		var hardwareRequestRef = fire.database().ref('hardware_requests').child(this.props.id);
		hardwareRequestRef.update({
			status: "approved"
		})
		.catch(function(error) {
			this.props.updateFormError(error.code + ": " + error.message);
		});
	}

	declineRequest() {
		// Update the status of the request
		var hardwareRequestRef = fire.database().ref('hardware_requests').child(this.props.id);
		hardwareRequestRef.update({
			status: "declined"
		})
		.catch(function(error) {
			this.props.updateFormError(error.code + ": " + error.message);
		});
	}

	render() {	
		return (
			<div className="HardwareRequestElement card">
				<HardwareRequestInfoModal
					id={this.props.id}
					requestor_name={this.props.requestor_name}
					requested_hardware_name={this.props.requested_hardware_name}
					requested_hardware_serial_number={this.props.requested_hardware_serial_number}
					request_start={this.props.request_start}
					request_end={this.props.request_end}
					approveRequest={this.approveRequest}
					declineRequest={this.declineRequest} />
		
				<div
					className="card-img"
					style={{ backgroundColor: this.props.color }}
					data-toggle="modal"
					data-target={"#requestDetailsModal-" + this.props.id}></div>
				<div
					className="card-text"
					data-toggle="modal"
					data-target={"#requestDetailsModal-" + this.props.id}>
					{this.props.requestor_name}
				</div>
				<div className="card-btns">
					<div className="mod-btns">
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
			</div>
		);
	}
}

export default HardwareRequestElement;
