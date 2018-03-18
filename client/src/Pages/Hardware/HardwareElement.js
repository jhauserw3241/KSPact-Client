import React, { Component } from 'react';
import fire from './../../fire';
import './../../CSS/Card.css';

class HardwareElement extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allowEdits: false,
			name: this.props.name,
			description: this.props.description,
			serialNum: this.props.serialNum,
			color: this.props.color
		};

		this.editHardware = this.editHardware.bind(this);
		this.saveHardware = this.saveHardware.bind(this);
		this.deleteHardware = this.deleteHardware.bind(this);
	}

	editHardware() {
		this.setState({allowEdits: true});
	}

	saveHardware() {
		console.log(this.state.serialNum)

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

	render() {
		var divStyle = {
            backgroundColor: this.state.color
		}
	
		return (
			<div className="HardwareElement card">
				<div
					className="modal fade"
					id={"hardwareModal-" + this.props.id}
					tabIndex="-1"
					role="dialog"
					aria-labelledby="HardwareModal"
					aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="hardwareModalTitle">Edit Hardware</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
										data-dismiss="modal">
										Cancel
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
		
				<div className="card-img" style={divStyle} data-toggle="modal" data-target={"#hardwareModal-" + this.props.id}></div>
				<div className="card-text" data-toggle="modal" data-target={"#hardwareModal-" + this.props.id}>
					{this.props.name}
				</div>
				<div className="card-btns">
					<button className="btn btn-danger card-delete-btn" onClick={this.deleteHardware}>
						Delete
					</button>
				</div>
			</div>
		);
	}
}

export default HardwareElement;
