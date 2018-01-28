import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import Header from './Pages/Header';
import { Main } from './routes';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './CSS/Page.css';

const App = () => (
	<div>
		<Header />
		<Main />
	</div>
)

render((
	<BrowserRouter>
		<div>
			<App />
		</div>
	</BrowserRouter>),
	document.getElementById('root')
);

registerServiceWorker();

