import React, { Component } from 'react';
import LoginRequired from './../Login/LoginRequired';
import EditSoftwareModal from './EditSoftwareModal';
import fire from './../../fire';
import './../../CSS/Card.css';

class SoftwareElement extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: this.props.name,
			description: this.props.description,
			link: this.props.link,
			color: this.props.color
		};

		this.goToLink = this.goToLink.bind(this);
		this.deleteSoftware = this.deleteSoftware.bind(this);
	}

	goToLink() {
		window.location=this.state.link;
	}

	deleteSoftware() {
		var updates = {};
        updates['/software/' + this.props.id] = null;
        fire.database().ref().update(updates);
	}
	
	render() {
		return (
			<div className="SoftwareElement card">
				<EditSoftwareModal
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
					data-target={"#softwareModal-" + this.props.id}></div>
				<div
					className="card-text"
					data-toggle="modal"
					data-target={"#softwareModal-" + this.props.id}>
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
