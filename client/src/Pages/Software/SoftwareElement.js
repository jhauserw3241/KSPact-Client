import React, { Component } from 'react';
import LoginRequired from '../Login/LoginRequired';
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
		this.deleteSoftware = this.deleteSoftware.bind(this);
		this.resetEdit = this.resetEdit.bind(this);
	}

	editSoftware() {
		this.setState({allowEdits: true});
	}

	saveSoftware() {
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

	deleteSoftware() {
		var updates = {};
        updates['/software/' + this.props.id] = null;
        fire.database().ref().update(updates);
	}

	resetEdit() {
		this.setState({allowEdits: false});
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
								<h5 className="modal-title" id="softwareModalTitle">Edit Software</h5>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									onClick={this.resetEdit}
									aria-label="Close">
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
											value={this.state.name}
											disabled={this.state.allowEdits ? false : true} />
									</div>
									<div className="form-group">
										<label htmlFor="description">Description:</label>
										<textarea
											className="form-control"
											rows="5"
											name="description"
											onChange={event => this.setState({description: event.target.value})}
											value={this.state.description}
											disabled={this.state.allowEdits ? false : true}></textarea>
									</div>
									<div className="form-group">
										<label htmlFor="link">Link:</label>
										<input
											type="text"
											name="link"
											className="form-control"
											onChange={event => this.setState({link: event.target.value})}
											value={this.state.link}
											disabled={this.state.allowEdits ? false : true} />
									</div>
								</div>

								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-primary"
										onClick={this.goToLink}>
										Go To Link
									</button>
									{(this.state.allowEdits) ?
										<button
											type="button"
											className="btn btn-success"
											onClick={this.saveSoftware}>
											Save
										</button> :
										<button
											type="button"
											className="btn btn-warning"
											onClick={this.editSoftware}>
											Edit
										</button>}
									<button
										type="button"
										className="btn btn-danger"
										data-dismiss="modal"
										onClick={this.resetEdit}>
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
				<div className="card-btns">
					<LoginRequired minRole="admin">
						<button className="btn btn-danger card-delete-btn" onClick={this.deleteSoftware}>
							Delete
						</button>
					</LoginRequired>
				</div>
			</div>
		);
	}
}

export default SoftwareElement;
