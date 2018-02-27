import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Members from './Pages/Members/Members';
import Hardware from './Pages/Hardware/Hardware';
import Software from './Pages/Software/Software';
import Curriculums from './Pages/Curriculums/Curriculums';
import Profile from './Pages/Profile/Profile';
import Dashboard from './Pages/Dashboard/Dashboard';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import Signout from './Pages/Signout/Signout';

export const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Home} />
			<Route exact path='/home' component={Home} />
			<Route exact path='/members' component={Members} />
			<Route exact path='/hardware' component={Hardware} />
			<Route exact path='/software' component={Software} />
			<Route exact path='/curriculums' component={Curriculums} />
			<Route exact path='/about' component={About} />
			<Route exact path='/profile' component={Profile} />
			<Route exact path='/dashboard' component={Dashboard} />
			<Route exact path='/signup' component={Signup} />
			<Route exact path='/login' component={Login} />
			<Route exact path='/signout' component={Signout} />
		</Switch>
	</main>
)