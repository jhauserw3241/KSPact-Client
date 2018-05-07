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
		};
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

	render() {
		return (
			<div className="Curriculums">
				<AddCurriculumModal />

				<CurriculumFilter
					list={this.state.origCurriculums}
					handleSuccess={(list) => this.setState({ updatedCurriculums: list })} />

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
						{this.state.updatedCurriculums.map(curriculum =>
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
