import React, { Component } from 'react';
import CurriculumElement from './CurriculumElement';
import fire from './../../fire';

class Curriculums extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			curriculums: [],
			name: "",
			description: "",
			link: "",
			color: "",
			formError: "",
		};

		this.addCurriculum = this.addCurriculum.bind(this);
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
			color: "#"+((1<<24)*Math.random()|0).toString(16) // Generate random color
		}).catch(function(error) {
			self.setState({ formError: error.code + ": " + error.message });
		});

		// Clear the data in the add modal
		this.setState({
			name: "",
			description: "",
			link: ""
		});
	}

	componentDidMount() {
		var curriculumRef = fire.database().ref("curriculums/");

		curriculumRef.orderByChild("name").on("value", (data) =>
			this.setState({curriculums: data.val()}));
	}

	render() {
		return (
			<div className="Curriculums">
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
									<fieldset>
										<label htmlFor="name">Name:</label>
										<input
											type="text"
											name="name"
											onChange={event => this.setState({name: event.target.value})}
											value={this.state.name} />
									</fieldset>
									<fieldset>
										<label htmlFor="description">Description:</label>
										<input
											type="text"
											name="description"
											onChange={event => this.setState({description: event.target.value})}
											value={this.state.description} />
									</fieldset>
									<fieldset>
										<label htmlFor="link">Link:</label>
										<input
											type="text"
											name="link"
											onChange={event => this.setState({link: event.target.value})}
											value={this.state.link} />
									</fieldset>
								</div>
								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-secondary"
										onClick={this.addCurriculum}
										data-dismiss="modal">
										Save
									</button>
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
		
				<div className="container">
					<button
						type="button"
						className="btn btn-success"
						data-toggle="modal"
						data-target="#addCurriculumModal">
						Add
					</button>
					<div className="list-container">
						{Object.values(this.state.curriculums).map(curriculum =>
							<CurriculumElement
								key={curriculum.id}
								id={curriculum.id}
								name={curriculum.name}
								description={curriculum.description}
								link={curriculum.link}
								color={curriculum.color} />
						)}
					</div>
				</div>

				<main>
					{this.props.children}
				</main>
			</div>
		);
	}
}

export default Curriculums;
