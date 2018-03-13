import React, { Component } from 'react';
import Modal from 'react-modal';
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
	}

	editHardware() {
		console.log("Allow edits");
		this.setState({allowEdits: true});
	}

	saveHardware() {
		console.log("Save data");
		
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

	render() {
		var divStyle = {
            backgroundColor: this.state.color
		}
		
		var name = this.props.name;
		var desc = this.props.description;
		var serialNum = this.props.serialNum;
		var color = this.props.color;
	
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
								<h5 className="modal-title" id="hardwareModalTitle">Modal title</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<form>
								<div className="modal-body">
									<fieldset>
										<label htmlFor="name">Name:</label>
										<input
											type="text"
											name="name"
											onChange={event => this.setState({name: event.target.value})}
											value={this.state.name}
											disabled={this.state.allowEdits ? false : true} />
									</fieldset>
									<fieldset>
										<label htmlFor="description">Description:</label>
										<input
											type="text"
											name="description"
											onChange={event => this.setState({description: event.target.value})}
											value={this.state.description}
											disabled={this.state.allowEdits ? false : true} />
									</fieldset>
									<fieldset>
										<label htmlFor="serialNum">Serial Number:</label>
										<input
											type="text"
											name="serialNum"
											onChange={event => this.setState({serialNum: event.target.value})}
											value={this.state.serialNum}
											disabled={this.state.allowEdits ? false : true} />
									</fieldset>
								</div>

								<div className="modal-footer">
									{(this.state.allowEdits) ?
										<button
											type="button"
											className="btn btn-secondary"
											onClick={this.saveHardware}>
											Save
										</button> :
										<button
											type="button"
											className="btn btn-secondary"
											onClick={this.editHardware}>
											Edit
										</button>}
									<button
										type="button"
										className="btn btn-primary"
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
			</div>
		);
	}
}

export default HardwareElement;
