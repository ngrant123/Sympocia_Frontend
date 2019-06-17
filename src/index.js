//Beginning stages of the website.... the website architecture will almost definetly change and everything lol

import React from "react";
import ReactDom from "react-dom";
import Landing from "./Pages/Landing";
import Signup from "./Components/Signup/LargeSignupComp/LSignUpPage";
import HomeScreen from "./Components/LargeComp/LHome";
import ProfileScreen from "./Components/Profile/LargeProfileComp/LProfile";
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import NetworkScreen from "./Components/LargeComp/LNetwork.js";
import InvestorScreen from "./Components/Investor/LargeInvestorComp/LInvestor.js";


//Starting point for the web application
//Will be changed later 


//Instantiate the Routes element here so that whenever it is called in the application
//it would already be "initialized"


const application  = (

	<Router>
		<Switch>


//Use exact path when you have similar paths because the computer actually connects to the first path

			<Route exact path="/" component= {Landing}/>
			<Route path="/signup" render= {(props) => (
				<Signup value = {"This is a tester"}/>
				)
			}/>
			<Route path="/home" component = {HomeScreen} />
			<Route path="/profile" component = {ProfileScreen} />
			<Route path="/network" component = {NetworkScreen} />
			<Route path="/investor" component= {InvestorScreen} />

		</Switch>
	</Router>


	);


ReactDom.render(application,document.getElementById("App"));