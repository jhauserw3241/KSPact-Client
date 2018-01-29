import React, { Component } from 'react';
import CurriculumElement from './CurriculumElement';
import Modal from 'react-modal';

class Curriculums extends Component {
	constructor(props) {
		super(props);
		this.state = {
			curriculums: [],
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
		console.log('test')
		
		fetch(`/curriculums`, {
			headers : { 
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
		.then(res => res.json())
		.then(curriculums => {
			console.log(curriculums);
			this.setState({ curriculums });
		});
		
		console.log('test end')
	}
	
	render() {
		return (
			<div className="Curriculums">
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					contentLabel="Example Modal"
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
			
				<div className="container">
					This is the curriculums page. Welcome!
					
					<div className="list-container">
						{this.state.curriculums.map(curriculum =>
							<CurriculumElement key={curriculum.id} id={curriculum.id} name={curriculum.name} description={curriculum.description} link={curriculum.link} color={curriculum.color} modalHandler={this.openModal} />
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

export default Curriculums;
