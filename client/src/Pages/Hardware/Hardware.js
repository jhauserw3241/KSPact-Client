import React, { Component } from 'react';
import HardwareElement from './HardwareElement';
import fire from './../../fire';

class Hardware extends Component {
	constructor(props) {
		super(props);

		this.state = {
			origHardware: [],
			updatedHardware: [],
			name: "",
			description: "",
			serialNum: "",
			formError: ""
		};

		this.addHardware = this.addHardware.bind(this);
		this.updateFormError = this.updateFormError.bind(this);
		this.filterList = this.filterList.bind(this);
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
			color: "#"+((1<<24)*Math.random()|0).toString(16) // Generate random color
		}).catch(function(error) {
			self.setState({ formError: error.code + ": " + error.message });
		});

		// Clear the data in the add modal
		this.setState({
			name: "",
			description: "",
			serialNum: ""
		});
	}

	filterList(event) {
		var updatedList = this.state.origHardware;
		updatedList = updatedList.filter(item =>
			item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1);
		this.setState({updatedHardware: updatedList});
	}
	
	componentDidMount() {
		var hardwareRef = fire.database().ref("hardware/");
		hardwareRef.orderByChild("name").on("value", (data) =>
			this.setState({
				origHardware: data.val() ? Object.values(data.val()) : [],
				updatedHardware: data.val() ? Object.values(data.val()) : [],
			}));
	}

	updateFormError(err) {
		this.setState({ formError: err });
	}
	
	render() {
		return (
			<div className="Hardware">
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

				<div className="container">
					{ (this.state.formError !== "") ?
						<div className="alert alert-danger">
							<strong>Error:</strong> {this.state.formError}
						</div> : null }

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
								data-target="#addHardwareModal">
								Add
							</button>
						</div>
					</div>
					<div className="list-container">
						{this.state.updatedHardware.map(hardwareElem =>
							<HardwareElement
								key={hardwareElem.id}
								id={hardwareElem.id}
								name={hardwareElem.name}
								description={hardwareElem.description}
								serialNum={hardwareElem.serialNum}
								color={hardwareElem.color}
								updateFormError={this.updateFormError} />
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

export default Hardware;
