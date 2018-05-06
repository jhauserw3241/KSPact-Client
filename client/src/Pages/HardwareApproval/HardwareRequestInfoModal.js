import React, { Component } from 'react';

class HardwareRequestInfoModal extends Component {
	render() {	
		return (
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
									onClick={this.props.approveRequest}
									data-dismiss="modal">
									Approve
								</button>
								<button
									type="button"
									className="btn btn-danger"
									onClick={this.props.declineRequest}
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
		);
	}
}

export default HardwareRequestInfoModal;
