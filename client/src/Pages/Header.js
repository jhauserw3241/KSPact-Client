import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './../images/header/light-green-kspact.png';
import './../CSS/Header.css';

class Header extends Component {
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
							<NavLink to="/about" className="nav-link">About</NavLink>
							<NavLink to="/members" className="nav-link">Members</NavLink>
							<NavLink to="/software" className="nav-link">Software</NavLink>
							<NavLink to="/curriculums" className="nav-link">Curriculums</NavLink>
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