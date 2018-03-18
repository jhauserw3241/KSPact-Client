import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LoginRequired from './Login/LoginRequired';
import logo from './../Images/header/light-green-kspact.png';
import fire from './../fire.js';
import './../CSS/Header.css';

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: fire.auth().currentUser
		};
	}

	componentWillMount() {
		// Handle changes in authentication state
        var self = this;
        fire.auth().onAuthStateChanged(function(user) {
            if (user) {
                self.setState({user: user});
            } else {
                self.setState({user: undefined});
            }
        });
	}

	render() {
		return (
			<div className="Header">
				<nav className="navbar navbar-expand-lg navbar-dark Navbar">
					<div className="Header-logo">
						<img src={logo} className="Logo-img" alt="logo" />
					</div>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse justify-content-end" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item">
								<NavLink to="/home" className="nav-link">Home</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to="/members" className="nav-link">Members</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to="/hardware" className="nav-link">Hardware</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to="/software" className="nav-link">Software</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to="/curriculums" className="nav-link">Curriculums</NavLink>
							</li>
							<li className="nav-item">
								<NavLink to="/about" className="nav-link">About</NavLink>
							</li>
							<LoginRequired>
								<li className="nav-item">
									<NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
								</li>
							</LoginRequired>
							<LoginRequired>
								<li className="nav-item">
									<NavLink to="/signout" className="nav-link">Signout</NavLink>
								</li>
							</LoginRequired>
							<LoginRequired requiredRole="none">
								<li className="nav-item">
									<NavLink to="/login" className="nav-link">Login</NavLink>
								</li>
							</LoginRequired>
							<LoginRequired requiredRole="none">
								<li className="nav-item">
									<NavLink to="/signup" className="nav-link">Signup</NavLink>
								</li>
							</LoginRequired>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

export default Header;