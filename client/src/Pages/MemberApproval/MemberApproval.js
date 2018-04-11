import React, { Component } from 'react';
import MemberRequestElement from './MemberRequestElement';
import fire from './../../fire';

class MemberApproval extends Component {
	constructor(props) {
		super(props);

		this.state = {
            member_ids: [],
            members: [],
			formError: ""
        };

		this.inStrList = this.inStrList.bind(this);
		this.updateFormError = this.updateFormError.bind(this);
	}

	inStrList(entry, list) {
		console.log(entry);
		console.log(list);
		for(var index in list) {
			var item = list[index];
			if(entry === item) {
				return true;
			}
		}
		return false;
	}
	
	componentDidMount() {
        var self = this;

		var memberPrivRef = fire.database().ref("member_priv");
        memberPrivRef.on("value", function(data) {
			var memberPriv = data.val() ? data.val() : {};
			var member_ids = [];

			for(var member_id in memberPriv) {
				if(memberPriv[member_id] === "pending member") {
					member_ids.push(member_id);
				}
			}

			// Get information about current pending member
			fire.database().ref("members").on("value", function(data) {
				var members = data.val() ? Object.values(data.val()) : [];

				var filteredMembers = members.filter((member) =>
					self.inStrList(member.id, member_ids));

				self.setState({ members: filteredMembers });
			});
        });
	}

	updateFormError(err) {
		this.setState({ formError: err });
	}
	
	render() {
		return (
			<div className="MemberApproval">
				<div className="container">
					{ (this.state.formError !== "") ?
						<div className="alert alert-danger">
							<strong>Error:</strong> {this.state.formError}
						</div> : null }

					<div className="list-container">
						{this.state.members.map(member =>
							<MemberRequestElement
								key={member.id}
                                id={member.id}
                                first_name={member.first_name}
                                last_name={member.last_name}
                                email={member.email}
                                school={member.school}
                                bio={member.bio}
                                grade_levels={member.grade_levels}
                                title={member.title}
                                pic={member.pic}
								updateFormError={this.updateFormError} />
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

export default MemberApproval;