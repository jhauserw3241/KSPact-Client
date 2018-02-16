import React, { Component } from 'react';
import MemberElement from './MemberElement';
import Modal from 'react-modal';
import fire from './../../fire';

class Members extends Component {
	constructor(props) {
		super(props);
		this.state = {
			members: [],
			modalIsOpen: false,
			firstName: "",
			lastName: "",
			email: "",
			school: "",
			bio: "",
			picture: "",
			gradeLevel: "",
			title: ""
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal(firstName, lastName, email, school, bio, picture, gradeLevel, title) {
		this.setState({
			modalIsOpen: true,
			firstName: firstName,
			lastName: lastName,
			email: email,
			school: school,
			bio: bio !== null ? bio : "",
			picture: picture,
			gradeLevel: gradeLevel,
			title: title
		});
	}

	closeModal() {
		this.setState({modalIsOpen: false});
	}
	
	componentDidMount() {
		var membersRef = fire.database().ref("members/");

		membersRef.orderByChild("name").on("value", (data) =>
			this.setState({members: data.val()}));
	}
	
	render() {
		return (
			<div className="Members">
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					contentLabel="Example Modal"
					ariaHideApp={false}
					className="card-modal"
				>
					<div className="modal-header">
						<h2>Member</h2>
						<button className="close-btn" onClick={this.closeModal}>
							<span aria-hidden="true">X</span>
						</button>
					</div>
					<div className="modal-body">
						<div className="row">
							<div className="form-text">Name: </div>
							<div className="form-field"><input type="text" value={`${this.state.firstName} ${this.state.lastName}`} disabled /></div>
						</div>
						<div className="row">
							<div className="form-text">Email: </div>
							<div className="form-field"><input type="text" value={this.state.email} disabled /></div>
						</div>
						<div className="row">
							<div className="form-text">School: </div>
							<div className="form-field"><input type="text" value={this.state.school} disabled /></div>
						</div>
						<div className="row">
							<div className="form-text">Bio: </div>
							<div className="form-field"><input type="text" value={this.state.bio} disabled /></div>
						</div>
						<div className="row">
							<div className="form-text">Grade Level: </div>
							<div className="form-field"><input type="text" value={this.state.gradeLevel} disabled /></div>
						</div>
						<div className="row">
							<div className="form-text">Title: </div>
							<div className="form-field"><input type="text" value={this.state.title} disabled /></div>
						</div>
					</div>
					<div className="modal-footer">
						<div className="row">
							<input type="submit" onClick={this.closeModal} value="Close" />
						</div>
					</div>
				</Modal>
			
				<div className="container">
					<div className="list-container">
						{this.state.members.map(member =>
							<MemberElement
								key={member.id}
								id={member.id}
								firstName={member.first_name}
								lastName={member.last_name}
								email={member.email}
								school={member.school}
								bio={member.bio}
								picture={member.picture}
								gradeLevel={member.grade_level}
								title={member.title}
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

export default Members;
