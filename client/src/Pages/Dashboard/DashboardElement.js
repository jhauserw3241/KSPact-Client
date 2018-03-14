import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../../CSS/Card.css';

class DashboardElement extends Component {
	render() {
		const imageUrl = require(`./../../Images/${this.props.pic}`)
		var divStyle = {
			backgroundImage: `url(${imageUrl})`
        }
	
		return (
			<Link className="HardwareElement card" to={this.props.link}>
				<div className="card-img" style={divStyle}></div>
				<div className="card-text">
					{this.props.name}
				</div>
			</Link>
		);
	}
}

export default DashboardElement;
