import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import DashboardElement from './DashboardElement';
import fire from './../../fire';

class Dashboard extends Component {	
	render() {
        var user = fire.auth().currentUser;
		if(user) {
            return (
                <div className="Dashboard">			
                    <div className="container">
                        <div className="list-container">
                            <DashboardElement
                                pic="defaults/profile.png"
                                link="/profile"
                                name="Profile" />
                            <DashboardElement
                                pic="defaults/hardware_requests.png"
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
