import React, { Component } from 'react';
import './Page.css';
import './Card.css';

class CurriculumElement extends Component {
	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
		console.log('elem')
	}
	
	goToLink(link) {
		console.log(link);
		window.location=link;
		/*window.location="http://www.google.com";*/
	}
	
	render() {
		var divStyle = {
            backgroundColor: this.props.color
        }
		
		var link = this.props.link;
		console.log(link);
		
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
