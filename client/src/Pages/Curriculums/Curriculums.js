import React, { Component } from 'react';
import CurriculumElement from './CurriculumElement';
import fire from './../../fire';
import LoginRequired from '../Login/LoginRequired';
import AddCurriculumModal from './AddCurriculumModal';

class Curriculums extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			origCurriculums: [],
			updatedCurriculums: [],
			formError: "",
		};

		this.filterList = this.filterList.bind(this);
	}

	filterList(event) {
		var updatedList = this.state.origCurriculums;
		updatedList = updatedList.filter(item =>
			item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1);
		this.setState({updatedCurriculums: updatedList});
	}

	componentDidMount() {
		var self = this;

		var curriculumRef = fire.database().ref("curriculums/");

		curriculumRef.orderByChild("name").on("value", function(data) {
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

	render() {
		return (
			<div className="Curriculums">
				<AddCurriculumModal />

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
									data-target="#addCurriculumModal">
									Add
								</button>
							</LoginRequired>
						</div>
					</div>
					<div className="list-container">
						{this.state.updatedCurriculums.map(curriculum =>
							<CurriculumElement
								key={curriculum.id}
								id={curriculum.id}
								name={curriculum.name}
								description={curriculum.description}
								link={curriculum.link}
								grade_levels={curriculum.grade_levels ? Object.values(curriculum.grade_levels) : []}
								color={curriculum.color} />
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default Curriculums;
