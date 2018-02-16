import React, { Component } from 'react';
import SoftwareElement from './SoftwareElement';
import Modal from 'react-modal';
import fire from './../../fire';

class Software extends Component {
	constructor(props) {
		super(props);
		this.state = {
			software: [],
			modalIsOpen: false,
			name: "",
			description: "",
			link: "",
			color: ""
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal(name, description, link, color) {
		this.setState({
			modalIsOpen: true,
			name: name,
			description: description,
			link: link,
			color: color
		});
	}

	closeModal() {
		this.setState({modalIsOpen: false});
	}
	
	componentDidMount() {
		var softwareRef = fire.database().ref("software/");

		softwareRef.orderByChild("name").on("value", (data) =>
			this.setState({software: data.val()}));
	}
	
	render() {
		return (
			<div className="Software">
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					contentLabel="Example Modal"
					ariaHideApp={false}
					className="card-modal"
				>
					<div className="modal-header">
						<h2>Software</h2>
						<button className="close-btn" onClick={this.closeModal}>
							<span aria-hidden="true">X</span>
						</button>
					</div>
					<div className="modal-body">
						<div className="row">
							<div className="form-text">Name: </div>
							<div className="form-field"><input type="text" value={this.state.name} disabled /></div>
						</div>
						<div className="row">
							<div className="form-text">Description: </div>
							<div className="form-field"><input type="text" value={this.state.description} disabled /></div>
						</div>
						<div className="row">
							<div className="form-text">Link: </div>
							<div className="form-field"><input type="text" value={this.state.link} disabled /></div>
						</div>
						<div className="row">
							<div className="form-text">Color: </div>
							<div className="form-field"><input type="text" value={this.state.color} disabled /></div>
						</div>
					</div>
					<div className="modal-footer">
						<div className="row">
							<form action={this.state.link}>
								<input type="submit" value="Go to Link" />
							</form>
						</div>
					</div>
				</Modal>
			
				<div className="container">
					<div className="list-container">
						{this.state.software.map(softwareElem =>
							<SoftwareElement
								key={softwareElem.id}
								id={softwareElem.id}
								name={softwareElem.name}
								description={softwareElem.description}
								link={softwareElem.link}
								color={softwareElem.color}
								modalHandler={this.openModal} />
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
