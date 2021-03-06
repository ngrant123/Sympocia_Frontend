//Beginning stages of the website.... the website architecture will almost definetly change and everything lol
import React,{Suspense} from "react";
import ReactDom from "react-dom";
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import allReducers from './Actions/Redux/Reducers';
import { Provider } from 'react-redux';
import { createStore,compose } from 'redux';
import {loadState,saveState} from './reduxState';
import ErrorBoundary from "./ErrorBoundary.js";
import throttle from 'lodash.throttle';
import LoadingScreen from "./LoadingAnimation.js";

import {VerifyBrowserIsChrome} from "./Actions/Tasks/VerifyBrowserIsNotSafari.js";


//Starting point for the web application
const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
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
const ExplorePageScreen=React.lazy(()=>import("./Components/ExplorePage/ExplorePageSet/Container.js"))
const BlogPostCreation=React.lazy(()=>import("./Components/GeneralComponents/PostComponent/BlogComponent/BlogPostCreation/index.js"))
const SearchPage=React.lazy(()=>import("./Components/SearchPage/index.js"))
const Symposium=React.lazy(()=>import("./Components/Symposium/ExtendedSymposium/index.js"))
const SymposiumList=React.lazy(()=>import("./Components/Symposium/SymposiumList/FeedContainer.js"))
const Admin=React.lazy(()=>import("./Components/Admin/index.js"));
const UrlEnteredImageDisplay=React.lazy(()=>import("./Components/SearchPage/UrlEnteredDisplay/ImageDisplay.js"));
const UrlEnteredVideoDisplay=React.lazy(()=>import("./Components/SearchPage/UrlEnteredDisplay/VideoDisplay.js"));
const UrlEnteredRegularPostDisplay=React.lazy(()=>import("./Components/SearchPage/UrlEnteredDisplay/RegularPostDisplay.js"));
const UrlEnteredBlogDisplay=React.lazy(()=>import("./Components/SearchPage/UrlEnteredDisplay/BlogDisplay.js"));
const EmailReset=React.lazy(()=>import('./Components/Signup/Email/EmailSet/index.js'));
const PrivacyPolicy=React.lazy(()=>import('./Components/LegalDocumentConditions/PrivacyPolicy.js'));
const TermsOfConditions=React.lazy(()=>import('./Components/LegalDocumentConditions/TermsAndConditions.js'));
const PageNotFound=React.lazy(()=>import('./Components/ErrorPage/404ErrorPage.js'));
const SympociaCommunity=React.lazy(()=>import('./Components/Landing/Community/index.js'));
const SymposiumFeaturesPage=React.lazy(()=>import('./Components/Symposium/SymposiumFeaturesPage/FeaturesPageSet/index.js'));
const PaymentPage=React.lazy(()=>import('./Components/Payments/PaymentSet/index.js'));
const Ads=React.lazy(()=>import('./Components/AdCreation/AdSet/index.js'));


const ApplicationElementIndicator=VerifyBrowserIsChrome();
const application  = (
		<ErrorBoundary>
			<Provider store={store}>
				<Router forceRefresh={true}>
					<Suspense fallback={<LoadingScreen/>}>
						<Switch>
							<Route exact path="/profile/:id" component={PersonalProfileScreen}/>
							<Route exact path="/" component= {Landing}/>
							<Route exact path="/logout" component= {Landing}/>
							<Route exact path="/signup" component={Signup}/>
							<Route exact path="/home" component= {ExplorePageScreen}/>
							<Route exact path="/createBlog" render={(props) => <BlogPostCreation {...props}/>}/>
							<Route exact path="/search/:string/:searchType" component={SearchPage}/>
							<Route exact path="/symposium/:symposiumName" component={Symposium}/>
							<Route exact path="/symposiumList" component={SymposiumList}/>	
							<Route exact path="/admin" component={Admin}/>
							<Route exact path="/image/:id" component={UrlEnteredImageDisplay}/>
							<Route exact path="/video/:id" component={UrlEnteredVideoDisplay}/>
							<Route exact path="/blog/:id" component={UrlEnteredBlogDisplay}/>
							<Route exact path="/regularPost/:id" component={UrlEnteredRegularPostDisplay}/>
							<Route exact path="/emailreset" component={EmailReset}/>
							<Route exact path="/privacyPolicy" component={PrivacyPolicy}/>
							<Route exact path="/termsOfService" component={TermsOfConditions}/>
							<Route exact path="/sympociaCommunity" component={SympociaCommunity}/>
							<Route exact path="/symposiumFeatures/:symposiumId" component={SymposiumFeaturesPage}/>
							<Route exact path="/payment" component={PaymentPage}/>
							<Route exact path="/ad" component={Ads}/>
							<Route component={PageNotFound}/>

							{/*
								<Route exact path="/investor/:id" component= {InvestorScreen} />
								<Route exact path="/createPost" component={CreatePostScreen}/>	
								<Route exact path="/playList" component={PlayList}/>
								<Route exact path="/companyProfile/:id" component={CompanyProfileScreen} />
								<Route exact path="/arena" component={Arena}/>
								<Route exact path="/map/:id" component= {MapScreen} />
								<Route exact path="/groupVideoCall/:symposiumId/:groupCallId" component={GroupVideoCall}/>	
							*/}

						</Switch>
					</Suspense>
				</Router>
			</Provider>
		</ErrorBoundary>
	);


ReactDom.render(application,document.getElementById("App"));