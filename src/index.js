//Beginning stages of the website.... the website architecture will almost definetly change and everything lol

import React from "react";
import ReactDom from "react-dom";
import Landing from "./Pages/Landing";
import Signup from "./Components/LargeComp/LSignUpPage";
import HomeScreen from "./Components/LargeComp/LHome";
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom';


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
			<Router path="/home" component = {HomeScreen} />

		</Switch>
	</Router>



	);


ReactDom.render(application,document.getElementById("App"));