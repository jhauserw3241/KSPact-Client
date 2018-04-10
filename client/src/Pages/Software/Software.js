import React, { Component } from 'react';
import SoftwareElement from './SoftwareElement';
import fire from './../../fire';

class Software extends Component {
	constructor(props) {
		super(props);

		this.state = {
			origSoftware: [],
			updatedSoftware: [],
			name: "",
			description: "",
			link: "",
			color: "",
			formError: ""
		};

		this.addSoftware = this.addSoftware.bind(this);
		this.filterList = this.filterList.bind(this);
	}

	addSoftware() {
		var self = this;
		var softwareRef = fire.database().ref('/software/');

		// Get id for new curriculum
		var id = softwareRef.push().path["pieces_"][1];

		// Add software object to firebase DB
		fire.database().ref('/software/' + id)
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
		var updatedList = this.state.origSoftware;
		updatedList = updatedList.filter(item =>
			item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1);
		this.setState({updatedSoftware: updatedList});
	}
	
	componentDidMount() {
		var self = this;
		var softwareRef = fire.database().ref("software/");

		softwareRef.orderByChild("name").on("value", function(data) {
			// Get list of software resources
			var software = data.val() ? Object.values(data.val()) : [];

			// Sort the software resources
			var sortedSoftware = software.sort((a, b) => {
				var first_name = a.name.toUpperCase();
				var second_name = b.name.toUpperCase();

				return (first_name < second_name) ? -1 : (first_name > second_name) ? 1 : 0;
			});

			self.setState({
				origSoftware: sortedSoftware,
				updatedSoftware: sortedSoftware,
			});
		});
	}
	
	render() {
		return (
			<div className="Software">
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

				<div className="container">
					<div className="mod-opts">
						<input
							className="form-control"
							placeholder="Search"
							id="search"
							onChange={this.filterList} />
						<div className="mod-btns">
							<button
								type="button"
								className="btn btn-success"
								data-toggle="modal"
								data-target="#addSoftwareModal">
								Add
							</button>
						</div>
					</div>
					<div className="list-container">
						{this.state.updatedSoftware.map(softwareElem =>
							<SoftwareElement
								key={softwareElem.id}
								id={softwareElem.id}
								name={softwareElem.name}
								description={softwareElem.description}
								link={softwareElem.link}
								color={softwareElem.color} />
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

export default Software;
