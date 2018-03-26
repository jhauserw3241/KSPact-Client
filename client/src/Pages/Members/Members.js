import React, { Component } from 'react';
import MemberElement from './MemberElement';
import Modal from 'react-modal';
import fire from './../../fire';

class Members extends Component {
	constructor(props) {
		super(props);
		this.state = {
			members: []
		};
	}
	
	componentDidMount() {
		var membersRef = fire.database().ref("members/");
		membersRef.orderByChild("last_name").on("value", (data) =>
			this.setState({members: data.val() ? Object.values(data.val()): []}));
	}
	
	render() {
		return (
			<div className="Members">
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
								pic={member.pic}
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
