import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Header from './Pages/Header';
import { Main } from './routes';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './CSS/Page.css';

// Require important packages
require('babel-polyfill');

const App = () => (
	<div>
		<Header />
		<Main />
	</div>
)

render((
	<HashRouter>
		<div>
			<App />
		</div>
	</HashRouter>),
	document.getElementById('root')
);

registerServiceWorker();

