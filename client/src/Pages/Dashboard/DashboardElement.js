import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../../CSS/Card.css';

class DashboardElement extends Component {
	render() {
		return (
			<Link
				className="HardwareElement card"
				to={this.props.link}>
				<div
					className="card-img"
					style={{ backgroundImage: `url(${this.props.pic})` }}></div>
				<div className="card-text">
					{this.props.name}
				</div>
			</Link>
		);
	}
}

export default DashboardElement;
