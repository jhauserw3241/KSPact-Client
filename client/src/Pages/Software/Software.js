import React, { Component } from 'react';
import SoftwareElement from './SoftwareElement';
import fire from './../../fire';

class Software extends Component {
	constructor(props) {
		super(props);

		this.state = {
			software: [],
			name: "",
			description: "",
			link: "",
			color: "",
			formError: ""
		};

		this.addSoftware = this.addSoftware.bind(this);
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
	
	componentDidMount() {
		var softwareRef = fire.database().ref("software/");

		softwareRef.orderByChild("name").on("value", (data) =>
			this.setState({software: data.val()}));
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
										onClick={this.addSoftware}
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
						data-target="#addSoftwareModal">
						Add
					</button>
					<div className="list-container">
						{Object.values(this.state.software).map(softwareElem =>
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
