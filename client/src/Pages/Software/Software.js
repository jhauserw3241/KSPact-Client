import React, { Component } from 'react';
import SoftwareElement from './SoftwareElement';
import LoginRequired from '../Login/LoginRequired';
import AddSoftwareModal from './AddSoftwareModal';
import SoftwareFilter from './SoftwareFilter';
import fire from './../../fire';

class Software extends Component {
	constructor(props) {
		super(props);

		this.state = {
			origSoftware: [],
			updatedSoftware: [],
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

		this.filterList = this.filterList.bind(this);
		this.updateFilterGrades = this.updateFilterGrades.bind(this);
		this.getFilterGradeChecked = this.getFilterGradeChecked.bind(this);
		this.oneOrMoreMatchingGrades = this.oneOrMoreMatchingGrades.bind(this);
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
			<div className="Software">
				<AddSoftwareModal />

				<SoftwareFilter
					updateFilterText={(text) => this.setState({ filterText: text })}
					updateFilterGrades={this.updateFilterGrades}
					getFilterGradeChecked={this.getFilterGradeChecked} />

				<div className="container">
					<div className="mod-opts">
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
						{this.filterList(this.state.origSoftware).map(softwareElem =>
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
