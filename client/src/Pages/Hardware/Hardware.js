import React, { Component } from 'react';
import HardwareElement from './HardwareElement';
import HardwareFilter from './HardwareFilter';
import LoginRequired from './../Login/LoginRequired';
import AddHardwareModal from './AddHardwareModal';
import fire from './../../fire';

class Hardware extends Component {
	constructor(props) {
		super(props);

		this.state = {
			origHardware: [],
			updatedHardware: [],
			formError: ""
		};

		this.updateFormError = this.updateFormError.bind(this);
		this.filterList = this.filterList.bind(this);
	}

	filterList(event) {
		var updatedList = this.state.origHardware;
		updatedList = updatedList.filter(item =>
			item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1);
		this.setState({updatedHardware: updatedList});
	}
	
	componentDidMount() {
		var self = this;

		var hardwareRef = fire.database().ref("hardware/");
		hardwareRef.orderByChild("name").on("value", function(data) {
			// Get lit of hardware
			var hardware = data.val() ? Object.values(data.val()): [];

			// Sort list of members
			var sortedHardware = hardware.sort((a, b) => {
				var first_name = a.name.toUpperCase();
				var second_name = b.name.toUpperCase();

				return (first_name < second_name) ? -1 : (first_name > second_name) ? 1 : 0;
			});

			self.setState({
				origHardware: sortedHardware,
				updatedHardware: sortedHardware,
			});
		});
	}

	updateFormError(err) {
		this.setState({ formError: err });
	}
	
	render() {
		return (
			<div className="Hardware">
				<AddHardwareModal />

				<HardwareFilter
					list={this.state.origHardware}
					handleSuccess={(list) => this.setState({ updatedHardware: list })} />

				<div className="container">
					{ (this.state.formError !== "") ?
						<div className="alert alert-danger">
							<strong>Error:</strong> {this.state.formError}
						</div> : null }

					<div className="mod-opts">
						<div className="mod-btns">
							<LoginRequired minRole="admin">
								<button
									type="button"
									className="btn btn-success"
									data-toggle="modal"
									data-target="#addHardwareModal">
									Add
								</button>
							</LoginRequired>
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
