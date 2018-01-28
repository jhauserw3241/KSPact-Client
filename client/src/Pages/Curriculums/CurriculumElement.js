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
		
		var link = this.props.link;
		
		return (
			<div className="CurriculumElement card" onClick={() => this.goToLink(link)}>
				<div className="card-img" style={divStyle}></div>
				<div className="card-text">
					{this.props.name}
				</div>
			</div>
		);
	}
}

export default CurriculumElement;
