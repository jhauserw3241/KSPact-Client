import React, { Component } from 'react';
import HardwareRequestInfoModal from './HardwareRequestInfoModal';
import fire from './../../fire';
import './../../CSS/Card.css';

class HardwareRequestElement extends Component {
	constructor(props) {
		super(props);

		this.cancelRequest = this.cancelRequest.bind(this);
	}

	cancelRequest() {
		// Update the status of the request
		var hardwareRequestRef = fire.database().ref('hardware_requests').child(this.props.id);
		hardwareRequestRef.update({
			status: "cancelled"
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
					requested_hardware_name={this.props.requested_hardware_name}
					requested_hardware_serial_number={this.props.requested_hardware_serial_number}
					request_start={this.props.request_start}
					request_end={this.props.request_end}
					request_status={this.props.request_status}
					cancelRequest={this.cancelRequest} />
		
				<div
					className="card-img"
					style={{ backgroundColor: this.props.color }}
					data-toggle="modal"
					data-target={"#requestDetailsModal-" + this.props.id}></div>
				<div
					className="card-text"
					data-toggle="modal"
					data-target={"#requestDetailsModal-" + this.props.id}>
					{this.props.name}
				</div>
				<div className="card-btns">
					{((this.props.request_status !== "cancelled") && (this.props.request_status !== "declined")) ?
						<button
							type="button"
							className="btn btn-danger card-cancel-btn"
							onClick={this.cancelRequest}
							data-dismiss="modal">
							Cancel Request
						</button> : null}
				</div>
			</div>
		);
	}
}

export default HardwareRequestElement;
