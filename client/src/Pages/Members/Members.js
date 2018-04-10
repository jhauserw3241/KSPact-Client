import React, { Component } from 'react';
import MemberElement from './MemberElement';
import fire from './../../fire';

class Members extends Component {
	constructor(props) {
		super(props);
		this.state = {
			members: [],
		};
	}
	
	componentDidMount() {
		var self = this;

		var membersRef = fire.database().ref("members/");
		membersRef.orderByChild("last_name").on("value", function(data) {
			// Get lit of members
			var members = data.val() ? Object.values(data.val()): [];

			// Sort list of members
			var updatedMembers = members.sort((a, b) => {
				var first_name = (a.first_name + " " + a.last_name).toUpperCase();
				var second_name = (b.first_name + " " + b.last_name).toUpperCase();

				return (first_name < second_name) ? -1 : (first_name > second_name) ? 1 : 0;
			});

			self.setState({
				members: updatedMembers,
			});
		});
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
								facebookId={member.facebook_id}
								twitterId={member.twitter_id}
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
