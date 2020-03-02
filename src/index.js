//Beginning stages of the website.... the website architecture will almost definetly change and everything lol

import React from "react";
import ReactDom from "react-dom";
import Landing from "./Pages/Landing";
import Signup from "./Components/Signup/LargeSignupComp/LSignUpPage";
import CompanyProfileScreen from "./Components/Profile/CompanyProfile/CompanyProfileSet/CompanyProfileContainer";
import PersonalProfileScreen from "./Components/Profile/PersonalProfile/PersonalProfileSet/PersonalProfileContainer";
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import InvestorScreen from "./Components/Investor/InvestorSet/InvestorContainer.js";
import HomeScreen from "./Components/Home/HomePageSet/HomePageContainer.js";
import MapScreen from "./Components/Map/MapComponentSet/MapContainer.js";
import PlayList from "./Components/PlayList/PlayListSet/PlayListContainer.js";
import allReducers from './Actions/Redux/Reducers';
import { Provider } from 'react-redux';
import { createStore,compose } from 'redux';
import {loadState,saveState} from './reduxState';

//TEST

import Demo from "./Components/Demo/index.js";



import throttle from 'lodash.throttle';

//Starting point for the web application
const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

//load previous data into store

const previousState=loadState();
const store=createStore(
	allReducers,
	previousState,
	enhancers
);

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

const application  = (

	<Provider store={store}>
		<Router>
			<Switch>
	
	//Use exact path when you have similar paths because the computer actually connects to the first path

				<Route exact path="/" component= {Landing}/>
				<Route path="/playList" component={PlayList}/>
				<Route path="/signup" component={Signup}/>
				<Route path="/home" component= {HomeScreen}/>
				<Route path="/companyProfile" component = {CompanyProfileScreen} />
				<Route path="/profile" component={PersonalProfileScreen}/>
				<Route path="/investor" component= {InvestorScreen} />
				<Route path="/map" component= {MapScreen} />


				//TEST
				<Route path="/demo" component={Demo}/>

			</Switch>
		</Router>
	</Provider>


	);


ReactDom.render(application,document.getElementById("App"));