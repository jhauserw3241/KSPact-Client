import React, { Component } from 'react';
import LoginRequired from './../Login/LoginRequired';
import SoftwareCurriculumsTagInput from './SoftwareCurriculumsTagInput';
import SoftwareGradesTagInput from './SoftwareGradesTagInput';
import fire from './../../fire';

class EditSoftwareModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: this.props.name,
			name_updated: false,
			description: this.props.description,
			description_updated: false,
			link: this.props.link,
			link_updated: false,
			color: this.props.color,
			color_updated: false,
			allowEdits: false,
		};

		this.editSoftware = this.editSoftware.bind(this);
		this.saveSoftware = this.saveSoftware.bind(this);
		this.resetEdit = this.resetEdit.bind(this);
		this.getFieldValue = this.getFieldValue.bind(this);
	}

	editSoftware() {
		this.setState({ allowEdits: true });
	}

	saveSoftware() {
		// Update profile information
        var updates = {};
        updates['/software/' + this.props.id + "/id"] = this.props.id;
        updates['/software/' + this.props.id + "/name"] = this.getFieldValue("name");
        updates['/software/' + this.props.id + "/description"] = this.getFieldValue("description");
        updates['/software/' + this.props.id + "/link"] = this.getFieldValue("link");
        updates['/software/' + this.props.id + "/color"] = this.getFieldValue("color");
        fire.database().ref().update(updates);

		this.setState({ allowEdits: false });
	}

	resetEdit() {
		this.setState({ allowEdits: false });
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
				id={"softwareModal-" + this.props.id}
				tabIndex="-1"
				role="dialog"
				data-backdrop="static"
				data-keyboard={false}
				aria-labelledby="SoftwareModal"
				aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="softwareModalTitle">Edit Software</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								onClick={this.props.resetEdit}
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
									<label htmlFor="link">Link:</label>
									<input
										type="text"
										name="link"
										className="form-control"
										onChange={event => this.setState({link: event.target.value})}
										value={this.getFieldValue("link")}
										disabled={this.state.allowEdits ? false : true} />
								</div>
								<div className="form-group">
									<label htmlFor="curriculums">Associated Curriculums:</label>
									<SoftwareCurriculumsTagInput
										software_id={ this.props.id }
										readOnly={ this.state.allowEdits ? false : true } />
								</div>
								<div className="form-group">
									<label htmlFor="gradeLevels">Grade Levels:</label>
									<SoftwareGradesTagInput
										software_id={ this.props.id }
										readOnly={ this.state.allowEdits ? false : true } />
								</div>
							</div>

							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-primary"
									onClick={this.props.goToLink}>
									Go To Link
								</button>
								<LoginRequired minRole="admin">
									{(this.state.allowEdits) ?
										<button
											type="button"
											className="btn btn-success"
											onClick={this.saveSoftware}>
											Save
										</button> :
										<button
											type="button"
											className="btn btn-warning"
											onClick={this.editSoftware}>
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

export default EditSoftwareModal;
