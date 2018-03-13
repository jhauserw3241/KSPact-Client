import React, { Component } from 'react';
import fire from './../../fire';
import './../../CSS/Card.css';

class SoftwareElement extends Component {
	constructor(props) {
		super(props);

		this.state = {
			allowEdits: false,
			name: this.props.name,
			description: this.props.description,
			link: this.props.link,
			color: this.props.color
		};

		this.editSoftware = this.editSoftware.bind(this);
		this.saveSoftware = this.saveSoftware.bind(this);
		this.goToLink = this.goToLink.bind(this);
	}

	editSoftware() {
		console.log("Allow edits");
		this.setState({allowEdits: true});
	}

	saveSoftware() {
		console.log("Save data");
		
		// Update profile information
        var updates = {};
        updates['/software/' + this.props.id] = {
			id: this.props.id,
			name: this.state.name,
			description: this.state.description,
			link: this.state.link,
			color: this.state.color
		};
        fire.database().ref().update(updates);

		this.setState({allowEdits: false});
	}

	goToLink() {
		window.location=this.state.link;
	}
	
	render() {
		var divStyle = {
            backgroundColor: this.state.color
        }
	
		return (
			<div className="SoftwareElement card">
				<div
					className="modal fade"
					id={"softwareModal-" + this.props.id}
					tabIndex="-1"
					role="dialog"
					aria-labelledby="SoftwareModal"
					aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="softwareModalTitle">Modal title</h5>
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
											value={this.state.name}
											disabled={this.state.allowEdits ? false : true} />
									</fieldset>
									<fieldset>
										<label htmlFor="description">Description:</label>
										<input
											type="text"
											name="description"
											onChange={event => this.setState({description: event.target.value})}
											value={this.state.description}
											disabled={this.state.allowEdits ? false : true} />
									</fieldset>
									<fieldset>
										<label htmlFor="link">Link:</label>
										<input
											type="text"
											name="link"
											onChange={event => this.setState({link: event.target.value})}
											value={this.state.link}
											disabled={this.state.allowEdits ? false : true} />
									</fieldset>
								</div>

								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-secondary"
										onClick={this.goToLink}>
										Go To Link
									</button>
									{(this.state.allowEdits) ?
										<button
											type="button"
											className="btn btn-secondary"
											onClick={this.saveSoftware}>
											Save
										</button> :
										<button
											type="button"
											className="btn btn-secondary"
											onClick={this.editSoftware}>
											Edit
										</button>}
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

				<div className="card-img" style={divStyle} data-toggle="modal" data-target={"#softwareModal-" + this.props.id}></div>
				<div className="card-text" data-toggle="modal" data-target={"#softwareModal-" + this.props.id}>
					{this.props.name}
				</div>
			</div>
		);
	}
}

export default SoftwareElement;
