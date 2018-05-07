import React, { Component } from 'react';
import SoftwareElement from './SoftwareElement';
import { generateColor } from './../Common/Color';
import { formatTagsForDB } from './../Common/TagsFunctions';
import SoftwareGradesTagInput from './SoftwareGradesTagInput';
import SoftwareCurriculumsTagInput from './SoftwareCurriculumsTagInput';
import fire from './../../fire';
import LoginRequired from '../Login/LoginRequired';

class AddSoftwareModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			description: "",
			link: "",
			color: "",
			grade_levels: [],
			curriculums: [],
			formError: "",
		};

		this.addSoftware = this.addSoftware.bind(this);
		this.handleGradeDelete = this.handleGradeDelete.bind(this)
		this.handleGradeAddition = this.handleGradeAddition.bind(this);
		this.handleGradeDrag = this.handleGradeDrag.bind(this);
		this.handleCurriculumDelete = this.handleCurriculumDelete.bind(this)
		this.handleCurriculumAddition = this.handleCurriculumAddition.bind(this);
		this.handleCurriculumDrag = this.handleCurriculumDrag.bind(this);
	}

	addSoftware() {
		var self = this;
		var softwareRef = fire.database().ref('software');

		// Get id for new curriculum
		var id = softwareRef.push().path["pieces_"][1];

		// Add software object to firebase DB
		fire.database().ref('software').child(id)
		.set({
			id: id,
			name: self.state.name,
			description: self.state.description,
			link: self.state.link,
			grade_levels: formatTagsForDB(self.state.grade_levels),
			curriculums: formatTagsForDB(self.state.curriculums),
			color: generateColor(),
		}).catch(function(error) {
			self.setState({ formError: error.code + ": " + error.message });
		});

		// Clear the data in the add modal
		this.setState({
			name: "",
			description: "",
			link: "",
			grade_levels: [],
			curriculums: [],
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

	handleCurriculumDelete(i) {
		var tags = this.state.curriculums.filter((tag, index) => index !== i);
		this.setState({ curriculums: tags });
	}

    handleCurriculumAddition(tag) {
		var tags = [...this.state.curriculums, ...[tag]];
		this.setState({ curriculums: tags });
    }

    handleCurriculumDrag(tag, currPos, newPos) {
        const tags = [...this.state.curriculums];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);
		
		this.setState({ curriculums: newTags });
    }
	
	render() {
		return (
			<div
				className="modal fade"
				id="addSoftwareModal"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="addSoftwareModal"
				aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addSoftwareModalTitle">Add Software</h5>
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
									<label htmlFor="link">Link:</label>
									<input
										type="text"
										name="link"
										className="form-control"
										onChange={event => this.setState({link: event.target.value})}
										value={this.state.link} />
								</div>
								<div className="form-group">
									<label htmlFor="curriculums">Associated Curriculums:</label>
									<SoftwareCurriculumsTagInput
										tags={this.state.curriculums}
										handleDelete={this.handleCurriculumDelete}
										handleAddition={this.handleCurriculumAddition}
										handleDrag={this.handleCurriculumDrag} />
								</div>
								<div className="form-group">
									<label htmlFor="gradeLevels">Grade Levels:</label>
									<SoftwareGradesTagInput
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
									onClick={this.addSoftware}
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

export default AddSoftwareModal;
