import React, { Component } from 'react';
import { filterByName, filterByGrade } from './../Common/Filter';

class GradeFilter extends Component {
	/*render() {
		console.log(grade_levels);
		return (
            <div className="GradeFilter">
				{grade_levels.map(grade => 
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value=""
							id={grade} />
						<label
							className="form-check-label"
							for={grade}>
							{grade}
						</label>
					</div>
				)}
            </div>
		);
	}*/

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
										id={grade} />
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

	/*render() {
		return (
			<div className="control-group">
				<p className="pull-left">Payment Types</p>
				<div className="controls span2">
					<label className="checkbox">
						<input type="checkbox" value="option1" id="inlineCheckbox1"> Cash
					</label>
					<label className="checkbox">
						<input type="checkbox" value="option2" id="inlineCheckbox2"> Invoice
					</label>
					<label className="checkbox">
						<input type="checkbox" value="option3" id="inlineCheckbox3"> Discover
					</label>
					<label className="checkbox">
						<input type="checkbox" value="option3" id="inlineCheckbox3"> Financing
					</label>
				</div>
				<div className="controls span2">
					<label className="checkbox">
						<input type="checkbox" value="option1" id="inlineCheckbox1"> Check
					</label>
					<label className="checkbox">
						<input type="checkbox" value="option2" id="inlineCheckbox2"> American Express
					</label>
					<label className="checkbox">
						<input type="checkbox" value="option3" id="inlineCheckbox3"> MasterCard
					</label>
					<label className="checkbox">
						<input type="checkbox" value="option3" id="inlineCheckbox3"> Google Checkout
					</label>
				</div>
				<div className="controls span2">
					<label className="checkbox">
						<input type="checkbox" value="option1" id="inlineCheckbox1"> Traveler's Check
					</label>
					<label className="checkbox">
						<input type="checkbox" value="option2" id="inlineCheckbox2"> Diner's Club
					</label>
					<label className="checkbox">
						<input type="checkbox" value="option3" id="inlineCheckbox3"> Visa
					</label>
					<label className="checkbox">
						<input type="checkbox" value="option3" id="inlineCheckbox3"> Paypal
					</label>
				</div>
			</div>
		);
	}*/

	/*render() {
		return (
			<div className="control-group">
				<p className="pull-left">Payment Types</p>
				<div className="controls span2">
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value=""
							id={grade} />
						<label
							className="form-check-label"
							for={grade}>
							{grade}
						</label>
					</div>
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value=""
							id={grade} />
						<label
							className="form-check-label"
							for={grade}>
							{grade}
						</label>
					</div>
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value=""
							id={grade} />
						<label
							className="form-check-label"
							for={grade}>
							{grade}
						</label>
					</div>
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value=""
							id={grade} />
						<label
							className="form-check-label"
							for={grade}>
							{grade}
						</label>
					</div>
				</div>
				<div className="controls span2">
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value=""
							id={grade} />
						<label
							className="form-check-label"
							for={grade}>
							{grade}
						</label>
					</div>
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value=""
							id={grade} />
						<label
							className="form-check-label"
							for={grade}>
							{grade}
						</label>
					</div>
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value=""
							id={grade} />
						<label
							className="form-check-label"
							for={grade}>
							{grade}
						</label>
					</div>
					<div className="form-check">
						<input
							className="form-check-input"
							type="checkbox"
							value=""
							id={grade} />
						<label
							className="form-check-label"
							for={grade}>
							{grade}
						</label>
					</div>
				</div>
			</div>
		);
	}*/
}

export default GradeFilter;
