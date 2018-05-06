import React, { Component } from 'react';
import fire from './../../fire';
import './../../CSS/Card.css';
import LoginRequired from './../Login/LoginRequired';
import CurriculumGradesTagInput from './CurriculumGradesTagInput';
import EditCurriculumModal from './EditCurriculumModal';

class CurriculumElement extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allowEdits: false,
			name: this.props.name,
			description: this.props.description,
			link: this.props.link,
			grade_levels: this.props.grade_levels,
			color: this.props.color
		};

		this.goToLink = this.goToLink.bind(this);
		this.deleteCurriculum = this.deleteCurriculum.bind(this);
	}
	
	goToLink() {
		window.location=this.state.link;
	}

	deleteCurriculum() {
		var updates = {};
        updates['/curriculums/' + this.props.id] = null;
        fire.database().ref().update(updates);
	}

	render() {
		return (
			<div className="CurriculumElement card">
				<EditCurriculumModal
					id={this.props.id}
					name={this.state.name}
					description={this.state.description}
					link={this.state.link}
					color={this.state.color}
					goToLink={this.goToLink} />

				<div
					className="card-img"
					style={{ backgroundColor: this.state.color }}
					data-toggle="modal"
					data-target={"#curriculumModal-" + this.props.id}></div>
				<div
					className="card-text"
					data-toggle="modal"
					data-target={"#curriculumModal-" + this.props.id}>
					{this.props.name}
				</div>
				<div className="card-btns">
					<LoginRequired minRole="admin">
						<button className="btn btn-danger card-delete-btn" onClick={this.deleteCurriculum}>
							Delete
						</button>
					</LoginRequired>
				</div>
			</div>
		);
	}
}

export default CurriculumElement;
