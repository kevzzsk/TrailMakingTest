import React, { Component } from 'react';
import './App.css';

import { Route, Switch, withRouter } from "react-router-dom";

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
import PersonalParticulars from "./components/PersonalParticulars"
import DoctorPage from './components/DoctorPage';
import CreateTemplate from './components/CreateTemplate'
import BlogPage from './components/BlogPage'
import SubmissionPage from './components/SubmissionPage'

class App extends Component {
	constructor(props) {
		super(props)
		window.onclick = () => {
			this.setState({
				pathname: window.location.pathname,
			})
		}
		this.state = {
			pathname: window.location.pathname,
			aboutRef: React.createRef(null),
			isAuthenticated: false
		}
	}

	componentDidMount() {
		this.setState({
			isAuthenticated: localStorage.getItem("isAuthenticated") === null ? false : localStorage.getItem("isAuthenticated") === "true"
		})
	}

	login = (acc) => {
		localStorage.setItem("isAuthenticated", "true")
		this.setState({
			isAuthenticated: true
		})
		if (acc.accountType === 1) {
			this.props.history.replace("/doctor-page")
		} else if (acc.accountType === 0) {
			console.log("REPLACE")
			this.props.history.replace(
				"/user-page",
				{
					account: acc
				}
			)
		}
	}

	logout = () => {
		localStorage.setItem("isAuthenticated", "false")
		this.setState({
			isAuthenticated: false
		})
		this.props.history.push("/login")
	}



	render() {
		return (
			<div id="bg">
				<Appbar pathname={this.state.pathname} aboutRef={this.state.aboutRef} isAuthenticated={this.state.isAuthenticated} logout={this.logout} history={this.props.history} ></Appbar>
				<Switch>
					<Route exact path="/" render={(props) => <HomePage {...props} aboutRef={this.state.aboutRef} />} />
					<Route path="/experiment" exact component={ExperimentPage} />
					<Route path="/completion" exact component={CompletionPage} />
					<Route path="/form" exact component={PersonalParticulars} />
					<Route path="/test" exact component={ExperimentTest} />
					<Route path="/submission" exact component={SubmissionPage} />
					<Route path="/login" exact render={props => <LoginPage {...props} login={this.login} />} />
					<Route path="/user-page" exact component={UserPage} />
					<Route path="/user-page/view-experiments" exact component={ViewExperiment} />
					<Route path="/user-page/view-experiments/:id" exact component={ExperimentStat} />
					<Route path="/user-page/create-experiment" exact component={CreateExperimentForm} />
					<Route path="/user-page/create-experiment/:id(\d+)" exact component={CreateExperiment} />
					<Route path="/user-page/create-experiment/completed" exact component={CreateCompleted} />
					<Route path="/sign-up-page" exact component={SignUpPage} />
					<Route path="/forget-password" exact component={ForgetPassPage} />
					<Route path="/doctor-page" exact component={DoctorPage} />
					<Route path="/user-page/create-template" exact component={CreateTemplate}/>
					<Route path="/blog" exact component={BlogPage}/>
				</Switch>
			</div>
		);
	}
}

export default withRouter(App);
