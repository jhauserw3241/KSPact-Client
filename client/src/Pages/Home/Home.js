import React, { Component } from 'react';
import fire from './../../fire';

class Home extends Component {
	render() {
		/*fire.auth().onAuthStateChanged(
            function(user) {
                console.log("Authentication changed");
                if (user) {
                    // User is signed in.
                    alert("Email: " +  user.email);
                    user.getIdToken().then(function(accessToken) {
						alert("User is signed in");
                    });
                } else {
					alert("User is signed out");
				}
            },
            function(error) {
                console.log(error);
            }
        );*/

		var user = fire.auth().currentUser;
		if(user) {
			// User is signed in
			return (
				<div className="Home">
					<div className="container">
						<div className="content">
							This is the home page. Welcome!<br/>
							<br/>
							Secrets!!!!!!!!!!!!!!!!!
						</div>
					</div>
				</div>
			);
		} else {
			// User is signed out
			return (
				<div className="Home">
					<div className="container">
						<div className="content">
							This is the home page. Welcome!
						</div>
					</div>
				</div>
			);
		}
	}
}

export default Home;
