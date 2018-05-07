import React, { Component } from 'react';
import './../../CSS/PanelGroup.css';

class PanelGroup extends Component {
	constructor(props) {
		super(props);
	
		this.state = {
			open: false,
		};
	}

	render() {
		return (
            <div className="PanelGroup">
                <div className="Panel" style={{ display: this.state.open ? "flex" : "none" }}>
					{this.props.children}
                </div>
				<div className="PanelButtons">
					<button
						className="PanelButton"
						onClick={() => this.setState({ open: !this.state.open })}>
						{this.props.buttonText}
					</button>
				</div>
            </div>
		);
	}
}

export default PanelGroup;
