import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Trails from '@orcatech/react-neuropsych-trails';
import ExperimentPage from './components/ExperimentPage'
import Appbar from './components/Appbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
	render() {
		return (
			<Router>
				<div id="bg">
					<Appbar />
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route path="/experiment" exact component={ExperimentPage} />
						<Route path="/login" exact component={LoginPage} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
