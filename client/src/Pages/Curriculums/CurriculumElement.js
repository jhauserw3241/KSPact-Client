import React, { Component } from 'react';
import './../../CSS/Card.css';

class CurriculumElement extends Component {	
	goToLink(link) {
		window.location=link;
	}
	
	render() {
		var divStyle = {
            backgroundColor: this.props.color
        }
		
		var name = this.props.name;
		var description = this.props.description;
		var link = this.props.link;
		var color = this.props.color;
	
		return (
			<div className="CurriculumElement card" onClick={() => this.props.modalHandler(name, description, link, color)}>
				<div className="card-img" style={divStyle}></div>
				<div className="card-text">
					{this.props.name}
				</div>
			</div>
		);
	}
}

export default CurriculumElement;
