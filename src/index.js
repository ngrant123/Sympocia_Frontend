//Beginning stages of the website.... the website architecture will almost definetly change and everything lol
import React from "react";
import ReactDom from "react-dom";
import Landing from "./Components/Landing/index.js";
import Signup from "./Components/Signup/LargeSignupComp/LSignUpPage";
import CompanyProfileScreen from "./Components/Profile/CompanyProfile/CompanyProfileSet/CompanyProfileContainer";
import PersonalProfileScreen from "./Components/Profile/PersonalProfile/PersonalProfileSet/PersonalProfileContainer";
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import InvestorScreen from "./Components/Investor/InvestorSet/InvestorContainer.js";
import BlogPostCreation from "./Components/GeneralComponents/PostComponent/BlogComponent/BlogPostCreation/index.js";
import HomeScreen from "./Components/Home/HomePageSet/HomePageContainer.js";
import MapScreen from "./Components/Map/MapComponentSet/MapContainer.js";
import PlayList from "./Components/PlayList/PlayListSet/PlayListContainer.js";
import SearchPage from "./Components/SearchPage/index.js";
import Arena  from "./Components/Home/HomePageSubset/Arena/index.js";
import Symposium from "./Components/Home/HomePageSubset/Symposium/ExtendedSymposium/index.js";

import ImageDisplay from "./Components/GeneralComponents/PostComponent/ImageComponent/ImageDisplay/ImageContainer.js"
import VideoDisplay from "./Components/GeneralComponents/PostComponent/VideoComponent/VideoDisplay/VideoContainer.js"
import BlogDisplay from "./Components/GeneralComponents/PostComponent/BlogComponent/BlogPostDisplay/BlogPostContainer.js"
import RegularPostDisplay from "./Components/GeneralComponents/PostComponent/RegularPostComponent/RegularPostDisplay/RegularPostContainer.js"
import GroupVideoCall from "./Components/Home/HomePageSubset/Symposium/ExtendedSymposium/Modals/VideoCall/GroupVideoCall.js";
import CreatePostScreen from "./Components/GeneralComponents/PostComponent/LargePostComponent/CreatePostScreen.js";

import allReducers from './Actions/Redux/Reducers';
import { Provider } from 'react-redux';
import { createStore,compose } from 'redux';
import {loadState,saveState} from './reduxState';
import ErrorBoundary from "./ErrorBoundary.js";

//TEST
import Demo from "./Components/Demo/index.js";
import throttle from 'lodash.throttle';
import LoadingScreen from "./LoadingAnimation.js";

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

store.subscribe(throttle(() =>{
  saveState(store.getState());
}, 1000));

const application  = (
		<ErrorBoundary>
			<Provider store={store}>
				<Router>
					<Switch>
			//Use exact path when you have similar paths because the computer actually connects to the first path
						<Route exact path="/profile/:id" component={PersonalProfileScreen}/>
						<Route exact path="/companyProfile/:id" component={CompanyProfileScreen} />
						<Route exact path="/" component= {Landing}/>
						<Route exact path="/playList" component={PlayList}/>
						<Route exact path="/signup" component={Signup}/>
						<Route exact path="/home" component= {HomeScreen}/>
						<Route exact path="/investor/:id" component= {InvestorScreen} />
						<Route exact path="/map/:id" component= {MapScreen} />
						<Route exact path="/blog/:id" component={BlogPostCreation}/>
						//TEST
						<Route exact path="/demo" component={Demo}/>
						<Route exact path="/loading" component={LoadingScreen}/>
						<Route exact path="/search/:string/:searchType" component={SearchPage}/>
						<Route exact path="/arena" component={Arena}/>
						<Route exact path="/symposium/:symposiumName" component={Symposium}/>
						<Route exact path="/groupVideoCall/:symposiumId/:groupCallId" component={GroupVideoCall}/>
						<Route exact path="/createPost" component={CreatePostScreen}/>
						
					</Switch>
				</Router>
			</Provider>
		</ErrorBoundary>
	);


ReactDom.render(application,document.getElementById("App"));