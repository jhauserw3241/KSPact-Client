import React, { Component } from 'react';

class About extends Component {
	render() {
		return (
			<div className="About">
				<div className="container">
					<div className="content">
						<h2>Kansas Partnership for Applied Computational Thinking</h2>
						KS-PACT was formed as a partnership between Kansas State Computer Science and Education faculty and K-12
						teachers who had been involved in programs sponsored by these departments like GK-12 INSIGHT and CI-TEAM.
						Additionally, Kansas State University’s ACM-W student club – organized with the goal of increasing diversity
						in computing careers - has joined the team and will be helping answer teachers’ questions about CT and visiting
						K-12 classrooms to help with computing activities and work with students.<br />
						<br />
						KS-PACT will supply curriculum materials and software tools custom-designed for the needs of K-12 teachers to
						its members. These materials will be available on the KS-PACT website, sorted by grade band and searchable by
						subject and specific standards. The KS-PACT website also features a forum where teachers can pose questions
						they have about computing, and receive speedy responses from KSU Faculty and ACM-W students. We also are offering
						sensor and computing equipment collected through past grant programs in a lending library that teachers can reserve
						for a week or two of use in their own classroom.<br />
						<br />
						<h2>Interested?</h2>
						If you would like to become a charter member of KS-PACT,&nbsp;
						<a className="classic-a" href="#/signup">sign up here</a>. There is no cost for becoming
						a member, and a world of potential benefits. <br />
						<br />
						Keep watching this website for updates!
					</div>
				</div>
			</div>
		);
	}
}

export default About;
