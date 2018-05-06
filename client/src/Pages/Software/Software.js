import React, { Component } from 'react';
import SoftwareElement from './SoftwareElement';
import AddSoftwareModal from './AddSoftwareModal';
import fire from './../../fire';
import LoginRequired from '../Login/LoginRequired';

class Software extends Component {
	constructor(props) {
		super(props);

		this.state = {
			origSoftware: [],
			updatedSoftware: [],
			formError: ""
		};

		this.filterList = this.filterList.bind(this);
	}

	filterList(event) {
		var updatedList = this.state.origSoftware;
		updatedList = updatedList.filter(item =>
			item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1);
		this.setState({updatedSoftware: updatedList});
	}
	
	componentDidMount() {
		var self = this;
		var softwareRef = fire.database().ref("software");

		softwareRef.on("value", function(data) {
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
				<AddSoftwareModal />

				<div className="container">
					<div className="mod-opts">
						<input
							className="form-control"
							placeholder="Search"
							id="search"
							onChange={this.filterList} />
						<div className="mod-btns">
							<LoginRequired minRole="admin">
								<button
									type="button"
									className="btn btn-success"
									data-toggle="modal"
									data-target="#addSoftwareModal">
									Add
								</button>
							</LoginRequired>
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
