//Beginning stages of the website.... the website architecture will almost definetly change and everything lol

import React from "react";
import ReactDom from "react-dom";
import Landing from "./Pages/Landing";
import Signup from "./Components/Signup/LargeSignupComp/LSignUpPage";
import CompanyProfileScreen from "./Components/Profile/CompanyProfile/LargeProfileComp/LProfile";
import PersonalProfileScreen from "./Components/Profile/PersonalProfile/LargeProfileComp/ControlledComponents/LProfile";
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import InvestorScreen from "./Components/Investor/LargeInvestorComp/LInvestor.js";
import HomeScreen from "./Components/Home/LargeHomeComp/LargeHomeContainer.js";
import MapScreen from "./Components/Map/LargeMapComp/LargeMapContainer.js";
import allReducers from './Actions/Redux/Reducers';
import { Provider } from 'react-redux';
import { createStore,compose } from 'redux';

//Starting point for the web application
const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

const store=createStore(
	allReducers,
	enhancers
);

const application  = (

	<Provider store={store}>
		<Router>
			<Switch>
	
	//Use exact path when you have similar paths because the computer actually connects to the first path

				<Route exact path="/" component= {Landing}/>
				<Route path="/signup" render= {(props) => (
					<Signup value = {"This is a tester"}/>
					)
				}/>
				<Route path="/home" component= {HomeScreen}/>
				<Route path="/companyProfile" component = {CompanyProfileScreen} />
				<Route path="/profile" component={PersonalProfileScreen}/>
				<Route path="/investor" component= {InvestorScreen} />
				<Route path="/map" component= {MapScreen} />

			</Switch>
		</Router>
	</Provider>


	);


ReactDom.render(application,document.getElementById("App"));