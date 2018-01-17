import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import './Header.css';

class Header extends Component {
	render() {
		return (
		<div className="Header">
			<header className="Header-header">
				<Navbar>
					<Navbar.Header>
						<img src={logo} className="App-logo" alt="logo" />
					</Navbar.Header>
					<div className="nav-body">
						<Nav bsStyle="pills">
							<NavItem href="/home">Home</NavItem>
							<NavItem href="/about">About</NavItem>
						</Nav>
					</div>
				</Navbar>
			</header>
			<main>
				{this.props.children}
			</main>
		</div>
		);
	}
}

export default Header;