import React, { Component } from 'react';
import CurriculumElement from './CurriculumElement';
import fire from './../../fire';
import LoginRequired from '../Login/LoginRequired';

class Curriculums extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			origCurriculums: [],
			updatedCurriculums: [],
			name: "",
			description: "",
			link: "",
			color: "",
			formError: "",
		};

		this.addCurriculum = this.addCurriculum.bind(this);
		this.filterList = this.filterList.bind(this);
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

	filterList(event) {
		var updatedList = this.state.origCurriculums;
		updatedList = updatedList.filter(item =>
			item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1);
		this.setState({updatedCurriculums: updatedList});
	}

	componentDidMount() {
		var self = this;

		var curriculumRef = fire.database().ref("curriculums/");

		curriculumRef.orderByChild("name").on("value", function(data) {
			// Get list of curriculums
			var curriculums = data.val() ? Object.values(data.val()) : [];

			// Sort the curriculums
			var sortedCurriculums = curriculums.sort((a, b) => {
				var first_name = a.name.toUpperCase();
				var second_name = b.name.toUpperCase();

				return (first_name < second_name) ? -1 : (first_name > second_name) ? 1 : 0;
			});

			self.setState({
				origCurriculums: sortedCurriculums,
				updatedCurriculums: sortedCurriculums,
			});
		});
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
		
				<div className="container">
					<div className="mod-opts">
						<input
							className="form-control"
							placeholder="Search"
							id="search"
							onChange={this.filterList} />
						<div className="mod-btns">
							<LoginRequired minRole="admin">
								<button
									type="button"
									className="btn btn-success"
									data-toggle="modal"
									data-target="#addCurriculumModal">
									Add
								</button>
							</LoginRequired>
						</div>
					</div>
					<div className="list-container">
						{this.state.updatedCurriculums.map(curriculum =>
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
