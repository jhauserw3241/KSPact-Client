import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import DashboardElement from './DashboardElement';
import fire from './../../fire';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: fire.auth().currentUser,
            member: {},
        }
    }

    componentDidMount() {
        var self = this;

        // Get information about user and update state variable
		if(this.state.user) {
            var membersRef = fire.database().ref("members/");
            membersRef.child(this.state.user.uid).on("value", function(data) {
                self.setState({ member: data.val() ? data.val() : {} });
            });
        }
    }

	render() {
        var user = fire.auth().currentUser;
		if(user) {
            return (
                <div className="Dashboard">			
                    <div className="container">
                        <div className="list-container">
                            <DashboardElement
                                pic={this.state.member.pic}
                                link="/profile"
                                name="Profile" />
                            <DashboardElement
                                pic='https://firebasestorage.googleapis.com/v0/b/ks-pact-website.appspot.com/o/defaults%2Fhardware_requests.png?alt=media&token=133a230b-661b-425e-b116-40e3ae8dabdf'
                                link="/myhardwarerequests"
                                name="My Hardware Requests" />
                        </div>
                    </div>
                    
                    <main>
                        {this.props.children}
                    </main>
                </div>
            );
        } else {
            return (
                <Redirect to='/login' />
            );
        }
	}
}

export default Dashboard;
