import React, { Component } from 'react';
import Modal from 'react-modal';
import './../../CSS/Card.css';

class CurriculumElement extends Component {
	constructor(props) {
		super(props);

		this.state = {
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
			<div className="CurriculumElement card" onClick={() => this.openModal(name, description, link, color)}>
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					contentLabel="Curriculum Modal"
					ariaHideApp={false}
					className="card-modal"
				>
					<div className="modal-header">
						<h2>Curiculum</h2>
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

				<div className="card-img" style={divStyle}></div>
				<div className="card-text">
					{this.props.name}
				</div>
			</div>
		);
	}
}

export default CurriculumElement;
