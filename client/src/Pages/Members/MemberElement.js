import React, { Component } from 'react';
import MemberInfoModal from './MemberInfoModal';
import MemberPrivModal from './MemberPrivModal';
import LoginRequired from '../Login/LoginRequired';
import fire from './../../fire';
import './../../CSS/Card.css';

class MemberElement extends Component {
	render() {
		return (
			<div className="MemberElement card">
				<MemberInfoModal
					id={this.props.id}
					firstName={this.props.firstName}
					lastName={this.props.lastName}
					email={this.props.email}
					school={this.props.school}
					bio={this.props.bio}
					gradeLevel={this.props.gradeLevel}
					title={this.props.title}
					facebookId={this.props.facebookId}
					twitterId={this.props.twitterId} />

				<MemberPrivModal
					id={this.props.id}
					priv={this.props.priv} />

				<div
					className="card-img"
					style={{
						backgroundImage: `url(${this.props.pic ?
							this.props.pic : 'gs://ks-pact-website.appspot.com/defaults/profile.png'})`
					}}
					data-toggle="modal"
					data-target={"#memberModal-" + this.props.id}></div>
				<div
					className="card-text"
					data-toggle="modal"
					data-target={"#memberModal-" + this.props.id}>
					{this.props.firstName} {this.props.lastName}
				</div>
				<div className="card-btns">
					<LoginRequired minRole="owner">
						<button
							className="btn btn-primary"
							data-toggle="modal"
							data-target={"#memberPrivModal-" + this.props.id}>
							Privs
						</button>
					</LoginRequired>
				</div>
			</div>
		);
	}
}

export default MemberElement;
