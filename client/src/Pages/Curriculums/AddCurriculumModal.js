import React, { Component } from 'react';
import grade_levels from './../Common/GradeLevels';
import { generateColor } from './../Common/Color';
import fire from './../../fire';
import CurriculumGradesTagInput from './CurriculumGradesTagInput';
import { formatTagsForDB } from '../Common/TagsFunctions';

class AddCurriculumModal extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			name: "",
			description: "",
			link: "",
			grade_levels: [],
			formError: "",
		};

		this.addCurriculum = this.addCurriculum.bind(this);
		this.handleGradeDelete = this.handleGradeDelete.bind(this)
		this.handleGradeAddition = this.handleGradeAddition.bind(this);
		this.handleGradeDrag = this.handleGradeDrag.bind(this);
	}

	addCurriculum() {
		var self = this;
		var curriculumsRef = fire.database().ref('/curriculums/');

		// Get id for new curriculum
		var id = curriculumsRef.push().path["pieces_"][1];

		// Add curriculum object to firebase DB
		fire.database().ref('/curriculums/' + id)
		.set({
			id: id,
			name: self.state.name,
			description: self.state.description,
			link: self.state.link,
			grade_levels: formatTagsForDB(self.state.grade_levels),
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
				id="addCurriculumModal"
				tabIndex="-1"
				role="dialog"
				aria-labelledby="addCurriculumModal"
				aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addCurriculumModalTitle">Add Curriculum</h5>
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
									<label htmlFor="gradeLevels">Grade Levels:</label>
									<CurriculumGradesTagInput
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
									onClick={this.addCurriculum}
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

export default AddCurriculumModal;
