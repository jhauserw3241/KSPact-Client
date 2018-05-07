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
			formError: "",
			filterText: "",
			filterGrades: [
				{ name: "Kindergarden", checked: true},
				{ name: "1st", checked: true},
				{ name: "2nd", checked: true},
				{ name: "3rd", checked: true},
				{ name: "4th", checked: true},
				{ name: "5th", checked: true},
				{ name: "6th", checked: true},
				{ name: "7th", checked: true},
				{ name: "8th", checked: true},
				{ name: "9th", checked: true},
				{ name: "10th", checked: true},
				{ name: "11th", checked: true},
				{ name: "12th", checked: true},
			],
		};

		this.updateFormError = this.updateFormError.bind(this);
		this.filterList = this.filterList.bind(this);
		this.updateFilterGrades = this.updateFilterGrades.bind(this);
		this.getFilterGradeChecked = this.getFilterGradeChecked.bind(this);
		this.oneOrMoreMatchingGrades = this.oneOrMoreMatchingGrades.bind(this);
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

	filterList(list) {
		// Update list by filtering out text provided by search bar
		var updatedList = [];
		updatedList = list.filter(item =>
			item.name.toLowerCase().search(this.state.filterText.toLowerCase()) !== -1);

		// Update list with grade filters
		updatedList = updatedList.filter(item => 
			this.oneOrMoreMatchingGrades(item.grade_levels || [], this.state.filterGrades));

		return updatedList;
	}

	oneOrMoreMatchingGrades(subset, list) {
		for(var item_id in list) {
			var item = list[item_id];;
			for(var sitem_id in subset) {
				var sitem = subset[sitem_id];

				if(	(item["name"] === sitem) &&
					(item["checked"] === true)) {
					return true;
				}
			}
		}

		return false;
	}

	getFilterGradeChecked(grade) {
		var grades = this.state.filterGrades;
		for(var grade_id in grades) {
			var grade_item = grades[grade_id];
			if(grade_item["name"] === grade) {
				return grade_item["checked"];
			}
		}

		return false;
	}

	updateFilterGrades(grade, checked) {
		var grades = this.state.filterGrades;
		var grade_index = -1;
		for(var grade_id in grades) {
			var grade_item = grades[grade_id];
			if(grade_item["name"] === grade) {
				grade_index = grade_id;
			}
		}
		grades[grade_index]["checked"] = checked;
		this.setState({ filterGrades: grades });
	}
	
	render() {
		return (
			<div className="Hardware">
				<AddHardwareModal />

				<HardwareFilter
					updateFilterText={(text) => this.setState({ filterText: text })}
					updateFilterGrades={this.updateFilterGrades}
					getFilterGradeChecked={this.getFilterGradeChecked} />

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
						{this.filterList(this.state.origHardware).map(hardwareElem =>
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
