import React, { Component } from 'react';
import SoftwareElement from './SoftwareElement';
import fire from './../../fire';

class Software extends Component {
	constructor(props) {
		super(props);

		this.state = {
			software: []
		};
	}
	
	componentDidMount() {
		var softwareRef = fire.database().ref("software/");

		softwareRef.orderByChild("name").on("value", (data) =>
			this.setState({software: data.val()}));
	}
	
	render() {
		return (
			<div className="Software">
				<div className="container">
					<div className="list-container">
						{this.state.software.map(softwareElem =>
							<SoftwareElement
								key={softwareElem.id}
								id={softwareElem.id}
								name={softwareElem.name}
								description={softwareElem.description}
								link={softwareElem.link}
								color={softwareElem.color} />
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

export default Software;
