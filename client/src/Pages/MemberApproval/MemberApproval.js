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

		this.updateFormError = this.updateFormError.bind(this);
	}
	
	componentDidMount() {
        var self = this;

		var memberPrivRef = fire.database().ref("member_priv");
        memberPrivRef.orderByValue().equalTo("pending member")
        .on("value", function(data) {
            // Get IDs of pending members
            self.setState({ member_ids: data.val() ? Object.keys(data.val()) : [] });

            // Loop through all pending members
            var membersRef = fire.database().ref("members");
            for(var id in self.state.member_ids) {
                // Get information about current pending member
                var member_id = self.state.member_ids[id];
                membersRef.child(member_id).on("value", function(data) {
                    if(data.val()) {
                        var temp = self.state.members;
                        temp.push(data.val());
                        self.setState({ members: temp });
                    }
                });
            }
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