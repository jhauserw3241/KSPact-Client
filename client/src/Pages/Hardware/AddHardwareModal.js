import React, { Component } from 'react';
import HardwareElement from './HardwareElement';
import { generateColor } from './../Common/Color';
import HardwareGradesTagInput from './HardwareGradesTagInput';
import { formatTagsForDB } from './../Common/TagsFunctions';
import fire from './../../fire';
import LoginRequired from '../Login/LoginRequired';

class AddHardwareModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			description: "",
			serialNum: "",
			grade_levels : [],
		};

		this.addHardware = this.addHardware.bind(this);
		this.handleGradeDelete = this.handleGradeDelete.bind(this)
		this.handleGradeAddition = this.handleGradeAddition.bind(this);
		this.handleGradeDrag = this.handleGradeDrag.bind(this);
	}

	addHardware() {
		var self = this;
		var hardwareRef = fire.database().ref('/hardware/');

		// Get id for new curriculum
		var id = hardwareRef.push().path["pieces_"][1];

		// Add software object to firebase DB
		fire.database().ref('/hardware/' + id)
		.set({
			id: id,
			name: self.state.name,
			description: self.state.description,
			serialNum: self.state.serialNum,
			grade_levels: formatTagsForDB(self.state.grade_levels),
			color: generateColor(),
		}).catch(function(error) {
			self.setState({ formError: error.code + ": " + error.message });
		});

		// Clear the data in the add modal
		this.setState({
			name: "",
			description: "",
			serialNum: "",
			grade_levels: [],
		});
	}

	handleGradeDelete(i) {
		var tags = this.state.grade_levels.filter((tag, index) => index !== i);
		this.setState({ grade_levels: tags });
	}

    handleGradeAddition(tag) {
		var tags = [...this.state.grade_levels, ...[tag]];
		this.setState({ grade_levels: tags });
    }

    handleGradeDrag(tag, currPos, newPos) {
        const tags = [...this.state.grade_levels];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);
		
		this.setState({ grade_levels: newTags });
    }
	
	render() {
		return (
			<div
				className="modal fade"
				id="addHardwareModal"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="HardwareModal"
				aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="hardwareModalTitle">Add Hardware</h5>
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
										value={this.state.name} />
								</div>
								<div className="form-group">
									<label htmlFor="description">Description:</label>
									<textarea
										className="form-control"
										rows="5"
										name="description"
										onChange={event => this.setState({description: event.target.value})}
										value={this.state.description}></textarea>
								</div>
								<div className="form-group">
									<label htmlFor="serialNum">Serial Number:</label>
									<input
										type="text"
										name="serialNum"
										className="form-control"
										onChange={event => this.setState({serialNum: event.target.value})}
										value={this.state.serialNum} />
								</div>
								<div className="form-group">
									<label htmlFor="gradeLevels">Grade Levels:</label>
									<HardwareGradesTagInput
										tags={this.state.grade_levels}
										handleDelete={this.handleGradeDelete}
										handleAddition={this.handleGradeAddition}
										handleDrag={this.handleGradeDrag} />
								</div>
							</div>

							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-success"
									onClick={this.addHardware}
									data-dismiss="modal">
									Save
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

export default AddHardwareModal;
