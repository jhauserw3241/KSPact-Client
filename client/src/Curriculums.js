import React, { Component } from 'react';
import CurriculumElement from './CurriculumElement';
import './Page.css';

class Curriculums extends Component {
	constructor(props) {
		super(props);
		this.state = {
			curriculums: []
		};
	}
	
	componentDidMount() {
		console.log('test')
		
		fetch(`/curriculums`, {
			headers : { 
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
		.then(res => res.json())
		.then(curriculums => {
			console.log(curriculums);
			this.setState({ curriculums });
		});
		
		console.log('test end')
	}
	
	render() {
		return (
			<div className="Curriculums">
				<div className="container">
					This is the curriculums page. Welcome!
					
					<div className="list-container">
						{this.state.curriculums.map(curriculum =>
							<CurriculumElement key={curriculum.id} id={curriculum.id} name={curriculum.name} description={curriculum.description} link={curriculum.link} color={curriculum.color} />
						)}
					</div>
					
					Test
				</div>
				
				<main>
					{this.props.children}
				</main>
			</div>
		);
	}
}

export default Curriculums;
