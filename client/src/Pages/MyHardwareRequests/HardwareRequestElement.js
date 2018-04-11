import React, { Component } from 'react';
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
					data-backdrop="static"
					data-keyboard={false}
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
									<div className="form-group">
										<label htmlFor="requestStatus">Status:</label>
										<input
											type="text"
											name="requestStatus"
											className="form-control"
											value={this.props.request_status}
											disabled={true} />
									</div>
								</div>

								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-danger"
										onClick={this.cancelRequest}
										data-dismiss="modal">
										Cancel Request
									</button>
									<button
										type="button"
										className="btn btn-danger"
										data-dismiss="modal">
										Close
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
