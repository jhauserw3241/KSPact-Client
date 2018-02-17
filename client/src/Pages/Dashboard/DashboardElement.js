import React, { Component } from 'react';
import './../../CSS/Card.css';

class DashboardElement extends Component {
	goToLink(link) {
		window.location=link;
	}

	render() {
		const imageUrl = require(`./../../images/${this.props.pic}`)
		var divStyle = {
			backgroundImage: `url(${imageUrl})`
        }
	
		return (
			<div className="HardwareElement card" onClick={() => this.goToLink(this.props.link)}>
				<div className="card-img" style={divStyle}></div>
				<div className="card-text">
					{this.props.name}
				</div>
			</div>
		);
	}
}

export default DashboardElement;
