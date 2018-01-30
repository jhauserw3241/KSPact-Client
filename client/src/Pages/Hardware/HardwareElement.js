import React, { Component } from 'react';
import './../../CSS/Card.css';

class HardwareElement extends Component {
	render() {
		var divStyle = {
            backgroundColor: this.props.color
        }
		
		var name = this.props.name;
		var description = this.props.description;
		var serialNum = this.props.serialNum;
		var color = this.props.color;
	
		return (
			<div className="HardwareElement card" onClick={() => this.props.modalHandler(name, description, serialNum, color)}>
				<div className="card-img" style={divStyle}></div>
				<div className="card-text">
					{this.props.name}
				</div>
			</div>
		);
	}
}

export default HardwareElement;
