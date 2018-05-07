import React, { Component } from 'react';
import CurriculumElement from './CurriculumElement';
import LoginRequired from '../Login/LoginRequired';
import CurriculumFilter from './CurriculumFilter';
import AddCurriculumModal from './AddCurriculumModal';
import fire from './../../fire';

class Curriculums extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			origCurriculums: [],
			updatedCurriculums: [],
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

		var curriculumRef = fire.database().ref("curriculums");

		curriculumRef.on("value", function(data) {
			// Get list of curriculums
			var curriculums = data.val() ? Object.values(data.val()) : [];

			// Sort the curriculums
			var sortedCurriculums = curriculums.sort((a, b) => {
				var first_name = a.name.toUpperCase();
				var second_name = b.name.toUpperCase();

				return (first_name < second_name) ? -1 : (first_name > second_name) ? 1 : 0;
			});

			self.setState({
				origCurriculums: sortedCurriculums,
				updatedCurriculums: sortedCurriculums,
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
			<div className="Curriculums">
				<AddCurriculumModal />

				<CurriculumFilter
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
									data-target="#addCurriculumModal">
									Add
								</button>
							</LoginRequired>
						</div>
					</div>
					<div className="list-container">
						{this.filterList(this.state.origCurriculums).map(curriculum =>
							<CurriculumElement
								key={curriculum.id}
								id={curriculum.id}
								name={curriculum.name}
								description={curriculum.description}
								link={curriculum.link}
								grade_levels={curriculum.grade_levels ?
									Object.values(curriculum.grade_levels) : []}
								color={curriculum.color} />
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default Curriculums;
