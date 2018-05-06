import React, { Component } from 'react';
import LoginRequired from './../Login/LoginRequired';
import CurriculumGradesTagInput from './CurriculumGradesTagInput';
import fire from './../../fire';
import './../../CSS/Card.css';

class EditCurriculumModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allowEdits: false,
			name: this.props.name,
			name_updated: false,
			description: this.props.description,
			description_updated: false,
			link: this.props.link,
			link_updated: false,
			grade_levels: this.props.grade_levels,
			grade_levels_updated: false,
			color: this.props.color,
			color_updated: false,
		};

		this.editCurriculum = this.editCurriculum.bind(this);
		this.saveCurriculum = this.saveCurriculum.bind(this);
		this.resetEdit = this.resetEdit.bind(this);
		this.getFieldValue = this.getFieldValue.bind(this);
	}

	editCurriculum() {
		this.setState({allowEdits: true});
	}

	saveCurriculum() {
        // Update curriculum information
        var updates = {};
        updates['/curriculums/' + this.props.id + "/id"] = this.props.id;
        updates['/curriculums/' + this.props.id + "/name"] = this.getFieldValue("name");
        updates['/curriculums/' + this.props.id + "/description"] = this.getFieldValue("description");
        updates['/curriculums/' + this.props.id + "/link"] = this.getFieldValue("link");
        updates['/curriculums/' + this.props.id + "/color"] = this.getFieldValue("color");
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
				id={"curriculumModal-" + this.props.id}
				tabIndex="-1"
				role="dialog"
				data-backdrop="static"
				data-keyboard={false}
				aria-labelledby="CurriculumModal"
				aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="curriculumModalTitle">Edit Curriculum</h5>
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
										disabled={ this.state.allowEdits ? false : true } />
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
										disabled={ this.state.allowEdits ? false : true } />
								</div>
								<div className="form-group">
									<label htmlFor="gradeLevels">Grade Levels:</label>
									<CurriculumGradesTagInput
										curriculum_id={ this.props.id }
										readOnly={ this.state.allowEdits ? false : true } />
								</div>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-primary"
									onClick={this.props.goToLink}>
									Go to Link
								</button>
								<LoginRequired minRole="admin">
									{(this.state.allowEdits) ?
										<button
											type="button"
											className="btn btn-success"
											onClick={this.saveCurriculum}>
											Save
										</button> :
										<button
											type="button"
											className="btn btn-warning"
											onClick={this.editCurriculum}>
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

export default EditCurriculumModal;
