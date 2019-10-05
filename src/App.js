import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ExperimentPage from './components/ExperimentPage';
import Appbar from './components/Appbar';
import HomePage from './components/HomePage';
import CompletionPage from './components/CompletionPage'
import LoginPage from './components/LoginPage';
import UserPage from './components/UserPage';
import ViewExperiment from './components/ViewExperiment';
import CreateExperiment from './components/createNewExp/CreateExperiment';
import SignUpPage from './components/SignUpPage';
import ForgetPassPage from './components/ForgetPassPage';
import ExperimentTest from './components/ExperimentTest';
import ExperimentStat from './components/ExperimentStat';
import CreateExperimentForm from "./components/createNewExp/CreateExperimentForm"
import CreateCompleted from "./components/createNewExp/CreateCompleted"

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
						<Route path="/test" exact component={ExperimentTest} />
						<Route path="/login" exact component={LoginPage} />
						<Route path="/user-page" exact component={UserPage} />
						<Route path="/user-page/view-experiments" exact component={ViewExperiment}/>
						<Route path="/user-page/view-experiments/:id" exact component={ExperimentStat}/>
						<Route path="/user-page/create-experiment" exact component={CreateExperimentForm}/>
						<Route path="/user-page/create-experiment/:id(\d+)" exact component={CreateExperiment}/>
						<Route path="/user-page/create-experiment/completed" exact component={CreateCompleted}/>
						<Route path="/sign-up-page" exact component={SignUpPage}/>
						<Route path="/forget-password" exact component={ForgetPassPage}/>
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
