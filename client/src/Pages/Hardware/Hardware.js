import React, { Component } from 'react';
import HardwareElement from './HardwareElement';
import Modal from 'react-modal';

class Hardware extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hardware: [],
			modalIsOpen: false,
			name: "",
			description: "",
			serialNum: "",
			color: ""
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal(name, description, serialNum, color) {
		this.setState({
			modalIsOpen: true,
			name: name,
			description: description,
			serialNum: serialNum,
			color: color
		});
	}

	closeModal() {
		this.setState({modalIsOpen: false});
	}
	
	componentDidMount() {
		fetch(`/hardware`, {
			headers : { 
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		})
		.then(res => res.json())
		.then(hardware => {
			this.setState({ hardware });
		});
	}
	
	render() {
		return (
			<div className="Hardware">
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					contentLabel="Example Modal"
					ariaHideApp={false}
					className="card-modal"
				>
					<div className="modal-header">
						<h2>Hardware</h2>
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
							<div className="form-text">Serial Number: </div>
							<div className="form-field"><input type="text" value={this.state.serialNum} disabled /></div>
						</div>
						<div className="row">
							<div className="form-text">Color: </div>
							<div className="form-field"><input type="text" value={this.state.color} disabled /></div>
						</div>
					</div>
					<div className="modal-footer">
						<div className="row">
							<input type="submit" onClick={this.closeModal} value="Close" />
						</div>
					</div>
				</Modal>
			
				<div className="container">
					This is the hardware page. Welcome!
					
					<div className="list-container">
						{this.state.hardware.map(hardwareElem =>
							<HardwareElement key={hardwareElem.id} id={hardwareElem.id} name={hardwareElem.name} description={hardwareElem.description} serialNum={hardwareElem.serial_num} color={hardwareElem.color} modalHandler={this.openModal} />
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

export default Hardware;
