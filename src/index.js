//Beginning stages of the website.... the website architecture will almost definetly change and everything lol
import React,{Suspense} from "react";
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

const PersonalProfileScreen=React.lazy(()=>import("./Components/Profile/PersonalProfile/PersonalProfileSet/PersonalProfileContainer"))
const Landing=React.lazy(()=>import("./Components/Landing/index.js"))
const Signup=React.lazy(()=>import("./Components/Signup/LargeSignupComp/LSignUpPage"))
const HomeScreen=React.lazy(()=>import("./Components/Home/HomePageSet/HomePageContainer.js"))
const BlogPostCreation=React.lazy(()=>import("./Components/GeneralComponents/PostComponent/BlogComponent/BlogPostCreation/index.js"))
const SearchPage=React.lazy(()=>import("./Components/SearchPage/index.js"))
const Symposium=React.lazy(()=>import("./Components/Home/HomePageSubset/Symposium/ExtendedSymposium/index.js"))
const SymposiumList=React.lazy(()=>import("./Components/Home/HomePageSubset/Symposium/SymposiumList/FeedContainer.js"))
const UrlEnteredImageDisplay=React.lazy(()=>import("./Components/SearchPage/UrlEnteredDisplay/ImageDisplay.js"));
const UrlEnteredVideoDisplay=React.lazy(()=>import("./Components/SearchPage/UrlEnteredDisplay/VideoDisplay.js"));
const UrlEnteredRegularPostDisplay=React.lazy(()=>import("./Components/SearchPage/UrlEnteredDisplay/RegularPostDisplay.js"));
const UrlEnteredBlogDisplay=React.lazy(()=>import("./Components/SearchPage/UrlEnteredDisplay/BlogDisplay.js"));

const application  = (
		<ErrorBoundary>
			<Provider store={store}>
				<Router forceRefresh={true}>
					<Switch>
						<Suspense fallback={<LoadingScreen/>}>
							<Route exact path="/profile/:id" component={PersonalProfileScreen}/>
							<Route exact path="/" component= {Landing}/>
							<Route exact path="/logout" component= {Landing}/>
							<Route exact path="/signup" component={Signup}/>
							<Route exact path="/home" component= {HomeScreen}/>
							<Route exact path="/createBlog" component={BlogPostCreation}/>
							<Route exact path="/search/:string/:searchType" component={SearchPage}/>
							<Route exact path="/symposium/:symposiumName" component={Symposium}/>
							<Route exact path="/symposiumList" component={SymposiumList}/>
							<Route exact path="/image/:id" component={UrlEnteredImageDisplay}/>
							<Route exact path="/video/:id" component={UrlEnteredVideoDisplay}/>
							<Route exact path="/blog/:id" component={UrlEnteredBlogDisplay}/>
							<Route exact path="/regularPost/:id" component={UrlEnteredRegularPostDisplay}/>

							{/*
								<Route exact path="/investor/:id" component= {InvestorScreen} />
								<Route exact path="/createPost" component={CreatePostScreen}/>	
								<Route exact path="/playList" component={PlayList}/>
								<Route exact path="/companyProfile/:id" component={CompanyProfileScreen} />
								<Route exact path="/arena" component={Arena}/>
								<Route exact path="/map/:id" component= {MapScreen} />
								<Route exact path="/groupVideoCall/:symposiumId/:groupCallId" component={GroupVideoCall}/>	
							*/}

						</Suspense>
					</Switch>
				</Router>
			</Provider>
		</ErrorBoundary>
	);


ReactDom.render(application,document.getElementById("App"));