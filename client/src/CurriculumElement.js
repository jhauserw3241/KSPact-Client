import React, { Component } from 'react';
import './Page.css';

class CurriculumElement extends Component {
	componentDidMount() {
		console.log('elem')
	}
	
	render() {
		return (
			<div className="CurriculumElement">
				{this.props.id} <br />
				{this.props.name} <br />
				{this.props.description} <br />
				{this.props.link} <br />
				{this.props.color}
			</div>
		);
	}
}

export default CurriculumElement;
