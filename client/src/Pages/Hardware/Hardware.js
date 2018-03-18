import React, { Component } from 'react';
import HardwareElement from './HardwareElement';
import fire from './../../fire';

class Hardware extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hardware: [],
			name: "",
			description: "",
			serialNum: "",
			formError: ""
		};

		this.addHardware = this.addHardware.bind(this);
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
	
	componentDidMount() {
		var hardwareRef = fire.database().ref("hardware/");
		hardwareRef.orderByChild("name").on("value", (data) =>
			this.setState({hardware: data.val()}));
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
										<label htmlFor="serialNum">Serial Number:</label>
										<input
											type="text"
											name="serialNum"
											onChange={event => this.setState({serialNum: event.target.value})}
											value={this.state.serialNum} />
									</fieldset>
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
					<button
						type="button"
						className="btn btn-success"
						data-toggle="modal"
						data-target="#addHardwareModal">
						Add
					</button>
					<div className="list-container">
						{Object.values(this.state.hardware).map(hardwareElem =>
							<HardwareElement
								key={hardwareElem.id}
								id={hardwareElem.id}
								name={hardwareElem.name}
								description={hardwareElem.description}
								serialNum={hardwareElem.serialNum}
								color={hardwareElem.color} />
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
