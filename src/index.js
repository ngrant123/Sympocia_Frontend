//Beginning stages of the website.... the website architecture will almost definetly change and everything lol
import React from "react";
import ReactDom from "react-dom";
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import ImageDisplay from "./Components/GeneralComponents/PostComponent/ImageComponent/ImageDisplay/ImageContainer.js"
import VideoDisplay from "./Components/GeneralComponents/PostComponent/VideoComponent/VideoDisplay/VideoContainer.js"
import BlogDisplay from "./Components/GeneralComponents/PostComponent/BlogComponent/BlogPostDisplay/BlogPostContainer.js"
import RegularPostDisplay from "./Components/GeneralComponents/PostComponent/RegularPostComponent/RegularPostDisplay/RegularPostContainer.js"
import allReducers from './Actions/Redux/Reducers';
import { Provider } from 'react-redux';
import { createStore,compose } from 'redux';
import {loadState,saveState} from './reduxState';
import ErrorBoundary from "./ErrorBoundary.js";
//TEST
import Demo from "./Components/Demo/index.js";
import throttle from 'lodash.throttle';
import LoadingScreen from "./LoadingAnimation.js";
import Loadable from "react-loadable";



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

const LoadingScreenProp=(props)=>{
	if(props.pastDelay){
		return <LoadingScreen/>;
	}else{
		return null;
	}
}

const LoadableOptions={
	delay: 1000, 
	loading:LoadingScreenProp
}


const PersonalProfileScreen=Loadable({
	loader:()=>import("./Components/Profile/PersonalProfile/PersonalProfileSet/PersonalProfileContainer"),
	...LoadableOptions
})
const CompanyProfileScreen=Loadable({
	loader:()=>import("./Components/Profile/CompanyProfile/CompanyProfileSet/CompanyProfileContainer"),
	...LoadableOptions
})
const Landing=Loadable({
	loader:()=>import("./Components/Landing/index.js"),
	...LoadableOptions
})
const PlayList=Loadable({
	loader:()=>import("./Components/PlayList/PlayListSet/PlayListContainer.js"),
	...LoadableOptions
})
const Signup=Loadable({
	loader:()=>import("./Components/Signup/LargeSignupComp/LSignUpPage"),
	...LoadableOptions
})
const HomeScreen=Loadable({
	loader:()=>import("./Components/Home/HomePageSet/HomePageContainer.js"),
	...LoadableOptions
})
const InvestorScreen=Loadable({
	loader:()=>import("./Components/Investor/InvestorSet/InvestorContainer.js"),
	...LoadableOptions
})
const MapScreen=Loadable({
	loader:()=>import("./Components/Map/MapComponentSet/MapContainer.js"),
	...LoadableOptions
})
const BlogPostCreation=Loadable({
	loader:()=>import("./Components/GeneralComponents/PostComponent/BlogComponent/BlogPostCreation/index.js"),
	...LoadableOptions
})
const SearchPage=Loadable({
	loader:()=>import("./Components/SearchPage/index.js"),
	...LoadableOptions
})
const Arena=Loadable({
	loader:()=>import("./Components/Home/HomePageSubset/Arena/index.js"),
	...LoadableOptions
})
const Symposium=Loadable({
	loader:()=>import("./Components/Home/HomePageSubset/Symposium/ExtendedSymposium/index.js"),
	...LoadableOptions
})
const GroupVideoCall=Loadable({
	loader:()=>import("./Components/Home/HomePageSubset/Symposium/ExtendedSymposium/Modals/VideoCall/GroupVideoCall.js"),
	...LoadableOptions
})
const CreatePostScreen=Loadable({
	loader:()=>import("./Components/GeneralComponents/PostComponent/LargePostComponent/CreatePostScreen.js"),
	...LoadableOptions
})


const application  = (
		<ErrorBoundary>
			<Provider store={store}>
				<Router>
					<Switch>
						{/*
							<Route exact path="/demo" component={Demo}/>
							<Route exact path="/loading" component={LoadingScreen}/>
						*/}
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