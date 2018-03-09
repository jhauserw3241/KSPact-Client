import React, { Component } from 'react';
import CurriculumElement from './CurriculumElement';
import fire from './../../fire';

class Curriculums extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			curriculums: []
		};
	}

	componentDidMount() {
		var curriculumRef = fire.database().ref("curriculums/");

		curriculumRef.orderByChild("name").on("value", (data) =>
			this.setState({curriculums: data.val()}));
	}
	
	render() {
		return (
			<div className="Curriculums">
				
			
				<div className="container">
					<div className="list-container">
						{this.state.curriculums.map(curriculum =>
							<CurriculumElement
								key={curriculum.id}
								id={curriculum.id}
								name={curriculum.name}
								description={curriculum.description}
								link={curriculum.link}
								color={curriculum.color} />
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

export default Curriculums;
