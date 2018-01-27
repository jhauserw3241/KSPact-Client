import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Curriculums from './Curriculums';

export const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Home} />
			<Route exact path='/home' component={Home} />
			<Route exact path='/about' component={About} />
			<Route exact path='/curriculums' component={Curriculums} />
		</Switch>
	</main>
)