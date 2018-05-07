import React, { Component } from 'react';

class GradeFilter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			grade_levels: [
				['Kindergarden', '1st', '2nd', '3rd'],
				['4th', '5th', '6th', '7th'],
				['8th', '9th', '10th', '11th', '12th']
			],
		};
	}

	render() {
		return (
			<div className="GradeFilter">
				Grade Levels
				<div className="control-group">
					{this.state.grade_levels.map(row =>
						<div className="controls span2">
							{row.map(grade =>
								<div className="form-check">
									<input
										className="form-check-input"
										type="checkbox"
										value=""
										checked={this.props.getFilterGradeChecked(grade)}
										id={grade}
										onChange={(event) => this.props.updateFilterGrades(grade, event.target.checked)} />
									<label
										className="form-check-label"
										for={grade}>
										{grade}
									</label>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default GradeFilter;
