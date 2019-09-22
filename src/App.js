import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ExperimentPage from './components/ExperimentPage'
import Appbar from './components/Appbar';
import HomePage from './components/HomePage';
import CompletionPage from './components/CompletionPage'
import LoginPage from './components/LoginPage';
import ViewExperiment from './components/ViewExperiment'


class App extends Component {
	render() {
		return (
			<Router>
				<div id="bg">
					<Appbar />
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route path="/experiment" exact component={ExperimentPage} />
						<Route path="/completion" exact component={CompletionPage} />
						<Route path="/login" exact component={LoginPage} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
