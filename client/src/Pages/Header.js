import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './../images/header/light-green-kspact.png';
import fire from './../fire.js';
import './../CSS/Header.css';

class Header extends Component {
	render() {
		var self = this;

		var user = fire.auth().currentUser;
		if (user) {
			// User is signed in
			return (
				<div className="Header">
					<header>
						<div className="Navbar">
							<div className="Header-logo">
								<img src={logo} className="Logo-img" alt="logo" />
							</div>
							<div className="nav-body">
								<NavLink to="/home" className="nav-link">Home</NavLink>
								<NavLink to="/members" className="nav-link">Members</NavLink>
								<NavLink to="/hardware" className="nav-link">Hardware</NavLink>
								<NavLink to="/software" className="nav-link">Software</NavLink>
								<NavLink to="/curriculums" className="nav-link">Curriculums</NavLink>
								<NavLink to="/about" className="nav-link">About</NavLink>
								<NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
								<NavLink to="/signout" className="nav-link">Signout</NavLink>
							</div>
						</div>
					</header>
					<main>
						{self.props.children}
					</main>
				</div>
			);
		} else {
			// User is signed out
			return (
				<div className="Header">
					<header>
						<div className="Navbar">
							<div className="Header-logo">
								<img src={logo} className="Logo-img" alt="logo" />
							</div>
							<div className="nav-body">
								<NavLink to="/home" className="nav-link">Home</NavLink>
								<NavLink to="/members" className="nav-link">Members</NavLink>
								<NavLink to="/hardware" className="nav-link">Hardware</NavLink>
								<NavLink to="/software" className="nav-link">Software</NavLink>
								<NavLink to="/curriculums" className="nav-link">Curriculums</NavLink>
								<NavLink to="/about" className="nav-link">About</NavLink>
								<NavLink to="/login" className="nav-link">Login</NavLink>
							</div>
						</div>
					</header>
					<main>
						{self.props.children}
					</main>
				</div>
			);
		}
	}
}

export default Header;