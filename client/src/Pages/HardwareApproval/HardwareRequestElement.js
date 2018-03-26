import React, { Component } from 'react';
import fire from './../../fire';
import './../../CSS/Card.css';

// CSS and JS for datetime picker
import "./../../../node_modules/react-datetime/css/react-datetime.css";
import DateTime from "./../../../node_modules/react-datetime/DateTime.js";

class HardwareRequestElement extends Component {
	constructor(props) {
		super(props);

		this.approveRequest = this.approveRequest.bind(this);
		this.declineRequest = this.declineRequest.bind(this);
	}

	approveRequest() {
		var self = this;

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
		var self = this;

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
		var divStyle = {
            backgroundColor: this.props.color
		}
	
		return (
			<div className="HardwareRequestElement card">
				<div
					className="modal fade"
					id={"requestDetailsModal-" + this.props.id}
					tabIndex="-1"
					role="dialog"
					aria-labelledby="HardwareRequestModal"
					aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="requestDetailsTitle">Hardware Request Information</h5>
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
										<label htmlFor="requestorName">Requestor Name:</label>
										<input
											type="text"
											name="requestorName"
											className="form-control"
											value={this.props.requestor_name}
											disabled={true} />
									</div>
									<div className="form-group">
										<label htmlFor="requestedHardwareName">Requested Hardware Name:</label>
										<input
											type="text"
											name="requestedHardwareName"
											className="form-control"
											value={this.props.requested_hardware_name}
											disabled={true} />
									</div>
									<div className="form-group">
										<label htmlFor="requestedHardwareSerialNum">Requested Hardware Serial Number:</label>
										<input
											type="text"
											name="requestedHardwareSerialNum"
											className="form-control"
											value={this.props.requested_hardware_serial_number}
											disabled={true} />
									</div>
									<div className="form-group">
										<label htmlFor="requestStart">Start:</label>
										<input
											className="form-control"
											name="requestStart"
											value={this.props.request_start}
											disabled={true} />
									</div>
									<div className="form-group">
										<label htmlFor="requestEnd">End:</label>
										<input
											type="text"
											name="requestEnd"
											className="form-control"
											value={this.props.request_end}
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
		
				<div className="card-img" style={divStyle} data-toggle="modal" data-target={"#requestDetailsModal-" + this.props.id}></div>
				<div className="card-text" data-toggle="modal" data-target={"#requestDetailsModal-" + this.props.id}>
					{this.props.name}
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
