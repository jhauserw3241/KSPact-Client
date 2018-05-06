import React, { Component } from 'react';
import LoginRequired from './../Login/LoginRequired';
import HardwareCurriculumsTagInput from './HardwareCurriculumsTagInput';
import HardwareGradesTagInput from './HardwareGradesTagInput';
import fire from './../../fire';

class EditHardwareModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allowEdits: false,
			name: this.props.name,
			name_updated: false,
			description: this.props.description,
			description_updated: false,
			serialNum: this.props.serialNum,
			serialNum_updated: false,
			color: this.props.color,
			color_updated: false,
		};

		this.editHardware = this.editHardware.bind(this);
		this.saveHardware = this.saveHardware.bind(this);
		this.resetEdit = this.resetEdit.bind(this);
		this.getFieldValue = this.getFieldValue.bind(this);
	}

	editHardware() {
		this.setState({allowEdits: true});
	}

	saveHardware() {
		// Update profile information
        var updates = {};
        updates['/hardware/' + this.props.id + "/id"] = this.props.id;
        updates['/hardware/' + this.props.id + "/name"] = this.getFieldValue("name");
        updates['/hardware/' + this.props.id + "/description"] = this.getFieldValue("description");
        updates['/hardware/' + this.props.id + "/serialNum"] = this.getFieldValue("serialNum");
        updates['/hardware/' + this.props.id + "/color"] = this.getFieldValue("color");
        fire.database().ref().update(updates);

		this.setState({allowEdits: false});
	}

	resetEdit() {
		this.setState({allowEdits: false});
	}

    getFieldValue(fieldName) {
        return ((   (this.state[fieldName] === undefined) || // Check if field value isn't set
                    (this.state[fieldName] === "")) &&
                (this.state[fieldName + "_updated"] === false)) ? // Check if field value hasn't been updated 
                this.props[fieldName] : this.state[fieldName];
    }

	render() {
		return (
			<div
				className="modal fade"
				id={"editHardwareModal-" + this.props.id}
				tabIndex="-1"
				role="dialog"
				data-backdrop="static"
				data-keyboard={false}
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
										value={this.getFieldValue("name")}
										disabled={this.state.allowEdits ? false : true} />
								</div>
								<div className="form-group">
									<label htmlFor="description">Description:</label>
									<textarea
										className="form-control"
										rows="5"
										name="description"
										onChange={event => this.setState({description: event.target.value})}
										value={this.getFieldValue("description")}
										disabled={this.state.allowEdits ? false : true}></textarea>
								</div>
								<div className="form-group">
									<label htmlFor="serialNum">Serial Number:</label>
									<input
										type="text"
										name="serialNum"
										className="form-control"
										onChange={event => this.setState({serialNum: event.target.value})}
										value={this.getFieldValue("serialNum")}
										disabled={this.state.allowEdits ? false : true} />
								</div>
								<div className="form-group">
									<label htmlFor="curriculums">Associated Curriculums:</label>
									<HardwareCurriculumsTagInput
										hardware_id={ this.props.id }
										readOnly={ this.state.allowEdits ? false : true } />
								</div>
								<div className="form-group">
									<label htmlFor="gradeLevels">Grade Levels:</label>
									<HardwareGradesTagInput
										hardware_id={ this.props.id }
										readOnly={ this.state.allowEdits ? false : true } />
								</div>
							</div>

							<div className="modal-footer">
								<LoginRequired minRole="admin">
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
								</LoginRequired>
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
		);
	}
}

export default EditHardwareModal;
