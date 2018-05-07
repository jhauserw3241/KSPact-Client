import React, { Component } from 'react';
import LoginRequired from './../Login/LoginRequired';
import HardwareCurriculumsTagInput from './HardwareCurriculumsTagInput';
import HardwareGradesTagInput from './HardwareGradesTagInput';
import EditHardwareModal from './EditHardwareModal';
import RequestHardwareModal from './RequestHardwareModal';
import fire from './../../fire';
import './../../CSS/Card.css';

class HardwareElement extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: this.props.name,
			description: this.props.description,
			serialNum: this.props.serialNum,
			color: this.props.color,
			formError: "",
		};

		this.deleteHardware = this.deleteHardware.bind(this);
	}

	deleteHardware() {
		var updates = {};
        updates['/hardware/' + this.props.id] = null;
        fire.database().ref().update(updates);
	}

	render() {
		return (
			<div className="HardwareElement card">
				<EditHardwareModal
					id={this.props.id}
					name={this.state.name}
					description={this.state.description}
					color={this.state.color}
					serialNum={this.state.serialNum} />

				<RequestHardwareModal
					id={this.props.id}
					name={this.state.name}
					description={this.state.description}
					serialNum={this.state.serialNum}
					handleError={(error) => this.setState({ formError: error })} />
		
				<div
					className="card-img"
					style={{ backgroundColor: this.state.color }}
					data-toggle="modal"
					data-target={"#editHardwareModal-" + this.props.id}></div>
				<div
					className="card-text"
					data-toggle="modal"
					data-target={"#editHardwareModal-" + this.props.id}>
					{this.props.name}
				</div>
				<div className="card-btns">
					<div className="mod-btns">
						<LoginRequired minRole="member">
							<button
								className="btn btn-success hardware-request-btn"
								data-toggle="modal"
								data-target={"#requestHardwareModal-" + this.props.id}>
								Request
							</button>
						</LoginRequired>
						<LoginRequired minRole="admin">
							<button className="btn btn-danger" onClick={this.deleteHardware}>
								Delete
							</button>
						</LoginRequired>
					</div>
				</div>
			</div>
		);
	}
}

export default HardwareElement;
