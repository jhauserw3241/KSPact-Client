import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
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
							{ this.state.user ?
								<NavLink to="/dashboard" className="nav-link">Dashboard</NavLink> : null }
							{ this.state.user ?
								<NavLink to="/signout" className="nav-link">Signout</NavLink> : null }
							{ !this.state.user ?
								<NavLink to="/login" className="nav-link">Login</NavLink> : null }
							{ !this.state.user ?
								<NavLink to="/signup" className="nav-link">Signup</NavLink> : null }
						</div>
					</div>
				</header>
				<main>
					{this.props.children}
				</main>
			</div>
		);
	}
}

export default Header;