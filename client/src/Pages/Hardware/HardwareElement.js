import React, { Component } from 'react';
import fire from './../../fire';
import './../../CSS/Card.css';

// CSS and JS for datetime picker
import "./../../../node_modules/react-datetime/css/react-datetime.css";
import DateTime from "./../../../node_modules/react-datetime/DateTime.js";

class HardwareElement extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allowEdits: false,
			name: this.props.name,
			description: this.props.description,
			serialNum: this.props.serialNum,
			color: this.props.color,
			start: "",
			end: "",
		};

		this.editHardware = this.editHardware.bind(this);
		this.saveHardware = this.saveHardware.bind(this);
		this.deleteHardware = this.deleteHardware.bind(this);
		this.requestHardware = this.requestHardware.bind(this);
		this.resetEdit = this.resetEdit.bind(this);
		this.validStart = this.validStart.bind(this);
		this.validEnd = this.validEnd.bind(this);
	}

	editHardware() {
		this.setState({allowEdits: true});
	}

	saveHardware() {
		// Update profile information
        var updates = {};
        updates['/hardware/' + this.props.id] = {
			id: this.props.id,
			name: this.state.name,
			description: this.state.description,
			serialNum: this.state.serialNum,
			color: this.state.color
		};
        fire.database().ref().update(updates);

		this.setState({allowEdits: false});
	}

	deleteHardware() {
		var updates = {};
        updates['/hardware/' + this.props.id] = null;
        fire.database().ref().update(updates);
	}

	requestHardware() {
		
	}

	resetEdit() {
		this.setState({allowEdits: false});
	}

	validStart( current ) {
		if(this.state.end != "") {
			return current.isBefore( this.state.end );
		} else {
			return true;
		}
	}

	validEnd( current ) {
		if(this.state.start != "") {
			return current.isAfter( this.state.start );
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
				<div
					className="modal fade"
					id={"editHardwareModal-" + this.props.id}
					tabIndex="-1"
					role="dialog"
					aria-labelledby="HardwareModal"
					aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="editHardwareModalTitle">Edit Hardware</h5>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									onClick={this.resetEdit}
									aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<form>
								<div className="modal-body">
									<div className="form-group">
										<label htmlFor="name">Name:</label>
										<input
											type="text"
											name="name"
											className="form-control"
											onChange={event => this.setState({name: event.target.value})}
											value={this.state.name}
											disabled={this.state.allowEdits ? false : true} />
									</div>
									<div className="form-group">
										<label htmlFor="description">Description:</label>
										<textarea
											className="form-control"
											rows="5"
											name="description"
											onChange={event => this.setState({description: event.target.value})}
											value={this.state.description}
											disabled={this.state.allowEdits ? false : true}></textarea>
									</div>
									<div className="form-group">
										<label htmlFor="serialNum">Serial Number:</label>
										<input
											type="text"
											name="serialNum"
											className="form-control"
											onChange={event => this.setState({serialNum: event.target.value})}
											value={this.state.serialNum}
											disabled={this.state.allowEdits ? false : true} />
									</div>
								</div>

								<div className="modal-footer">
									{(this.state.allowEdits) ?
										<button
											type="button"
											className="btn btn-success"
											onClick={this.saveHardware}>
											Save
										</button> :
										<button
											type="button"
											className="btn btn-warning"
											onClick={this.editHardware}>
											Edit
										</button>}
									<button
										type="button"
										className="btn btn-danger"
										data-dismiss="modal"
										onClick={this.resetEdit}>
										Cancel
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>

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
											onChange={event => this.setState({ start: event._d })}
											inputProps={{ placeholder: "Click to select a date" }}
											isValidDate={(current) => this.validStart(current)} />
									</div>
									<div className="form-group">
										<label htmlFor="request-end">End Date:</label>
										<DateTime
											timeFormat={false}
											onChange={event => this.setState({ end: event._d })}
											inputProps={{ placeholder: "Click to select a date" }}
											isValidDate={(current) => this.validEnd(current)} />
									</div>
								</div>

								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-success"
										onClick={this.requestHardware}>
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
					<button
						className="btn btn-success hardware-request-btn"
						data-toggle="modal"
						data-target={"#requestHardwareModal-" + this.props.id}>
						Request
					</button>
					<button className="btn btn-danger card-delete-btn" onClick={this.deleteHardware}>
						Delete
					</button>
				</div>
			</div>
		);
	}
}

export default HardwareElement;
