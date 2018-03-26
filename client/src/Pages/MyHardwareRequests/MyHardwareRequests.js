import React, { Component } from 'react';
import HardwareRequestElement from './HardwareRequestElement';
import fire from './../../fire';

class MyHardwareRequests extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hardware_requests: [],
			formError: ""
        };

		this.updateFormError = this.updateFormError.bind(this);
	}
	
	componentDidMount() {
        var member_id = fire.auth().currentUser.uid;

		var hardwareRef = fire.database().ref("hardware_requests");
		hardwareRef.orderByChild("requestor_id").equalTo(member_id).on("value", (data) =>
			this.setState({hardware_requests: data.val() ? Object.values(data.val()) : []}));
	}

	updateFormError(err) {
		this.setState({ formError: err });
	}
	
	render() {
		return (
			<div className="MyHardwareRequests">
				<div className="container">
					{ (this.state.formError !== "") ?
						<div className="alert alert-danger">
							<strong>Error:</strong> {this.state.formError}
						</div> : null }

					<div className="list-container">
						{this.state.hardware_requests.map(requestElem =>
							<HardwareRequestElement
								key={requestElem.id}
								id={requestElem.id}
								requested_hardware_name={requestElem.requested_hardware_name}
								requested_hardware_serial_number={requestElem.requested_hardware_serial_number}
								request_start={requestElem.start}
                                request_end={requestElem.end}
                                request_status={requestElem.status}
								color={requestElem.color}
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

export default MyHardwareRequests;