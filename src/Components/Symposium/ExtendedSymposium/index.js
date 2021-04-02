import React,{Component} from "react";
import styled from "styled-components";
import Chat from "./Modals/ChatRoom.js";
import { connect } from "react-redux";
import ActivePeopleModal from "./Modals/ActivePeopleModal";
import {getIndustryInformation} from "../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import PostCreation from "../../GeneralComponents/PostComponent/LargePostComponent/LargePostComponent.js";

import {connectToRoom} from "../../../Actions/Requests/SocketIORequests";
import io from 'socket.io-client';

import PopularVideosModal from "./Modals/PopularVideosModal.js";
import {HeaderContainer} from "./Header/HeaderContainer.js";
import Confetti from 'react-confetti';

import ChatPageContainer from "../../GeneralComponents/ChatComponent/ChatContainerSet/ChatContainer.js";
import {GeneralNavBar} from "../../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import ExploreIcon from '@material-ui/icons/Explore';
//import GroupSharingVideoCall from "./Modals/VideoCall/index.js";
import SymposiumOnboarding from "../../OnBoarding/SymposiumPageOnboarding.js";
import GuestOnboarding from "../../OnBoarding/GuestOnboarding.js"
import LoadingScreen from "../../../LoadingAnimation.js";
import MobilePostOptionsPortal from "./Modals/MobileUI/PostOptionsPortal.js";
import PERSONAL_INDUSTRIES from "../../../Constants/personalIndustryConstants.js";
import {
		addSymposium,
		removeSymposium
} from "../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {
		setPersonalProfileAccessToken,
		setPersonalProfileRefreshToken
} from "../../../Actions/Redux/Actions/PersonalProfile.js"; 
import {refreshTokenApiCallHandle} from "../../../Actions/Tasks/index.js";
import HightLightedQuestions from "./Modals/HighLightedQuestions.js";
import {
	SymposiumContainer,
	PopularVideos,
	PostsChatInformation,
	BackgroundModalContainer,
	ActivePeopleContainer,
	ExploreIconContainer,
	PageIndicator,
	SymposiumFeatureContainer,
	ArrowDownContainer,
	PostContainerTEst,
	SymposiumChatContainer
} from "./indexCSS.js";
import Posts from "./Posts/index.js";
import SearchOptions from "./Posts/PostFilterOptions/index.js";
import {
		InitialSymposiumFeaturesDisplay,
		symposiumFeaturesAndChat,
		symposiumFeatures
	} from "./SymposiumFeatures/InitialSymposiumFeaturesDisplay.js";
import {SymposiumProvider} from "./SymposiumContext.js";

/*
	const HightLightedQuestionsContainerModal=styled.div`
		position:fixed;
		background-color:white;
		border-radius:5px;
		top:20%;
		left:30%;
		width:30%;
		height:30%;
		padding:20px;
		overflow-y:scroll;
		z-index:40;
		box-shadow: 1px 5px 5px 1px #d5d5d5;

		@media screen and (max-width:740px){
			width:90% !important;
			left:5% !important;
		}
	`;
*/



//REFACTOR LATER ON

const socket = io('http://localhost:4000');
class Symposium extends Component{

	constructor(props){
		super(props);

		this.state={ 
			headerAnimation:false,
			popularVideos:[],
			activePeople:[],
			selectedSymposiumTitle:"",
			symposiumCounter:-1,
			symposiums:[],
			backgroundColor:"",
			untogglePostOptions:false,
			displayPopularVideos:false,
			displayModalPeopleActive:false,
			displayModalSubSymposiums:false,
			displayPostCreation:false,
			handleScroll:true,
			displayChatRoom:false,
			chatRoom:[],
			postCount:0,
			posts:[],
			popularQuestions:[],
			displayInitialChatRoom:true,
			isProfileFollowingSymposium:false,
			displayConfetti:false,
			chatPageIndicator:"",
			displayChatPage:false,
			displayGroupSharingVideoCallPortal:false,
			displayOnboarding:false,
			featureQuestions:[],
			isLoading:true,
			displayDesktopUI:false,
			displayMobileSymposiumOptions:false,
			displayIpadUI:false,
			displayPhoneUI:false,
			isLoadingReloadedPosts:false,
			endOfPostsDBIndicator:false,
			postOption:"Image",
			displayGuestOnboarding:false,
			displaySpecficSymposiumFeature:false,
			displayHightletedSimplifiedQuestionsModal:false
		}
	}

	triggerUIChange=()=>{
		if(window.innerWidth<600){
			this.setState({
				displayDesktopUI:false,
				displayIpadUI:false,
				displayPhoneUI:true
			})
		}
		else if(window.innerWidth<1370){
			//alert('Unfortunately this isnt supported on ipad at the moment.Switch to desktop or phone to continue :)');
			this.setState({
				displayDesktopUI:false,
				displayIpadUI:true,
				displayPhoneUI:false
			})
		}else{
			this.setState({
				displayDesktopUI:true,
				displayIpadUI:false,
				displayPhoneUI:false
			})
		}
	}

	componentDidUpdate(){
		window.addEventListener('resize',this.triggerUIChange);
	}

	 async componentDidMount(){
		window.addEventListener('resize',this.triggerUIChange)
  		const postContainerElement=document.getElementById("postChatInformation");

		const profileId=this.props.location.state==null?this.props.profileId:this.props.location.state.profileId;
  		var {confirmation,data}=await getIndustryInformation(
  										this.props.match.params.symposiumName,
  									   	this.state.postCount,
  									   	profileId
									);
  		
  		if(confirmation=="Success"){
  			const {
  				posts,
	  			popularPosts,
	  			activeUsers,
	  			popularQuestions,
	  			isProfileFollowedSymposium,
	  			isOnboardingCompleted,
	  			featureQuestions,
	  			_id
  			}=data;

  			//var newHomePagePosts=this.addSuggestedSymposiums(posts);
  			
	  			
	  		this.setState(prevState=>({
		  		...prevState,
		  		selectedSymposiumTitle:this.props.match.params.symposiumName,
		  		symposiums:this.props.location.state==null?[]:this.props.location.state.symposiums,
		  		symposiumCounter:-1,
		  		backgroundColor:this.props.location.state==null?this.symposiumBackgroundColor(this.props.match.params.symposiumName):
		  		this.props.location.state.selectedSymposium.backgroundColor,
		  		postType:"Image",
		  		posts,
		  		popularVideos:popularPosts,
		  		activePeople:activeUsers,
		  		popularQuestions:popularQuestions,
		  		isProfileFollowingSymposium:isProfileFollowedSymposium,
		  		profileId,
		  		isLoading:false,
		  		displayOnboarding:isOnboardingCompleted,
		  		symposiumFeatureQuestions:featureQuestions,
		  		symposiumId:_id,
		  		isGuestProfile:(this.props.personalInformation.id=="0" || this.props.personalInformation.isGuestProfile==true)==true?
								true:false
	  		}));

		  	setTimeout(function(){
				postContainerElement.style.opacity="1";
		  	},500);

		  	connectToRoom(socket,_id);

  		}else{
  			alert('Unfortunately there has been a problem with getting the symposium information. Please try again');
  		}
  		this.triggerUIChange();
	  }


	symposiumBackgroundColor=(symposiumName)=>{
		//var symposiums=props.isPersonalProfile==true?PERSONAL_INDUSTRIES.INDUSTRIES:COMPANY_INDUSTRIES.INDUSTRIES;
		var symposiums=PERSONAL_INDUSTRIES.INDUSTRIES;
		for(var i=0;i<symposiums.length;i++){
			const currentSymposium=symposiums[i].industry;
			if(currentSymposium==symposiumName){
				return symposiums[i].backgroundColor;
			}
		}
	}

	handleScroll=()=>{
	  	if(this.state.isLoading!=true){
		  	if(this.state.handleScroll!=false){
		  		document.getElementById("extendedSymposiumContainer").style.overflow="auto";
			  	document.getElementById("postChatInformation").style.overflow="visible";
			  	document.getElementById("postChatInformation").style.top="-20%";
			  	document.getElementById("postChatInformation").style.filter="blur(0)";
			  	document.getElementById("postChatInformation").style.zIndex=2;
			  	document.getElementById("arrowIndicator").style.opacity="0";

		  	if(this.state.headerAnimation==false){
		  		this.setState(prevState=>({
		  			...prevState,
		  			headerAnimation:true,
		  			handleScroll:false
		  		}))
		  	  }
		  	}
	  	}
	}
	  fadeOutInEffect=()=>{
	  		if(this.state.headerAnimation==false){
	  			document.getElementById("postChatInformation").style.opacity="0";
		  		document.getElementById("headerContents").style.opacity="0";

		  		setTimeout(function(){
		  			document.getElementById("postChatInformation").style.opacity="1";
				  	document.getElementById("headerContents").style.opacity="1";
		  		},1000);
	  		}else{
	  			document.getElementById("postChatInformation").style.opacity="0";
		  		document.getElementById("animatedHeaderAnimatedContainer").style.opacity="0";

		  		setTimeout(function(){
		  			document.getElementById("postChatInformation").style.opacity="1";
				  	document.getElementById("animatedHeaderAnimatedContainer").style.opacity="1";
		  		},1000);
	  		}  

	  		this.setState({
	  			isLoading:true
	  		})	
	  }

	  handleSeeAllPopularVideos=()=>{
	  	return <PopularVideosModal
	  				popularVideos={this.state.popularVideos}
	  				changeState={this}
  					displayPopularVideos={this.state.displayPopularVideos}
	  			/>
	  } 

	  //Method below is not working completely correct but is doing half it correctly moving on 
	   replayVideo=(key)=>{
	   		
	   		const video=document.getElementById("video"+key);
	   		var startTime=0;
	   		
	   		const videoDuration=video.duration;
			var endTime;
			if(videoDuration>10)
				endTime=10;
			else
				endTime=videoDuration;

	   		if(this.state.headerAnimation==false){
		   		const video=document.getElementById("video"+key);
		   		if(video!=null){
		   			video.play();
			   		video.currentTime=startTime;
			   		const videoDuration=endTime-startTime;

			   		setTimeout(()=>{
			   			video.currentTime=startTime;
			   			this.replayVideo(startTime,endTime,key);
			   		},videoDuration*1000);
		   		}
	   		}
	   }

	 timerFunction=(seconds)=>{
			return new Promise(resolve => setTimeout(resolve, seconds));
	}

	popularVideosHandle=(video)=>{
		const {videoUrl,key}=video;
		var lengthOfReplay=0;
		const videoElement=<video id={"video"+key} onLoadStart={()=>this.replayVideo(key)} onEnded={()=>this.replayVideo(key)} position="relative" height="100%" width="100%" autoplay="autoplay" muted>
			 					<source src={videoUrl} type="video/mp4"/>
			 				</video>;
		
		return <li style={{listStyle:"none",display:"inline-block",marginRight:"30px"}}> 
			 			<PopularVideos>
			 				{videoElement}
			 			</PopularVideos>
			 	</li>
	}

	  handleSeeAllPeopleActiveModal=()=>{
	  	return <ActivePeopleModal
  					peopleActive={this.state.activePeople}
  					changeState={this}
  					displayModalPeopleActive={this.state.displayModalPeopleActive}
  				/>
	  }

	  handleHeaderAnimatedContents=()=>{

	  	return (
	  		<React.Fragment>
	  		</React.Fragment>
	  	)
	  }

	  handleSubSymposiumsChoices=(props)=>{
	  }
	  hideChatRoom=()=>{
	  	
	  	this.setState({
	  		displayInitialChatRoom:!this.state.displayInitialChatRoom
	  	})
	  }

	  changeFollowIndicator=(followIndicator)=>{
	  	this.setState({
	  		isProfileFollowingSymposium:followIndicator
	  	})
	  }

	  triggerDisplayPopularVideosModal=()=>{
	  	this.setState({
	  		displayPopularVideos:true
	  	})
	  }

	  triggerSeeAllPeopleActiveModal=()=>{
	  	this.setState({
	  		displayModalPeopleActive:true
	  	})
	  }

	  changeOptionColors=(option)=>{

	  	/*
	  		Could be implementd in  better way
	  	*/
	  	const element=document.getElementById(option);
	  	if(element.style.color=="white"){

	  		element.style.color="black";
	  		element.style.backgroundColor="white";
	  		element.style.borderColor="#5298F8";

	  	}else{
	  		element.style.color="white";
	  		element.style.backgroundColor="#5298F8";
	  	}
	  }


	  closeSymposiumFeatureModal=()=>{
	  	this.setState({
	  		displaySpecficSymposiumFeature:!this.state.displaySpecficSymposiumFeature
	  	})
	  }

	  specificSymposiumFeatures=()=>{
	  	return <InitialSymposiumFeaturesDisplay
	  				selectedSymposiumTitle={this.state.selectedSymposiumTitle}
					symposiumId={this.state.symposiumId}
					chatRoom={this.state.chatRoom}
					profileId={this.state.profileId}
					socket={socket}
					closeSymposiumFeatureModal={this.closeSymposiumFeatureModal}
					headerAnimation={this.state.headerAnimation}
					symposiumFeatureQuestions={this.state.symposiumFeatureQuestions}
					isGuestProfile={this.state.isGuestProfile}
					displaySpecficSymposiumFeature={this.state.displaySpecficSymposiumFeature}
	  			/>
	  }

	displayRecruitConfetti=()=>{
		this.setState({
			displayConfetti:true
		})

		setTimeout(()=>{
			this.setState({
				displayConfetti:false
			})
		},5000);
	}

	displayChatPage=(pageIndicator)=>{
		this.setState(prevState=>({
			...prevState,
			displayChatPage:true,
			chatPageIndicator:pageIndicator
		}))
	}

	hideChatPage=()=>{
		this.setState(prevState=>({
			...prevState,
			displayChatPage:false
		}))
	}

	chatPage=()=>{
		return this.state.displayChatPage==true?
			<ChatPageContainer
				pageIndicator={this.state.chatPageIndicator}
				hideChatContainer={this.hideChatPage}
			/>:<React.Fragment></React.Fragment>
	}

	handleDisplayExplorePage=()=>{
		this.props.history.push({
			pathname:"/home"
		})
	}

	displayVideoCallModal=()=>{
		this.setState({
			displayGroupSharingVideoCallPortal:true
		})
	}

	closeGroupVideoCallPortal=()=>{
		this.setState({
			displayGroupSharingVideoCallPortal:false
		})
	}
/*
	Quick hack fix but not the solution. 
	window.location.reload(false); 
*/
	displaySymposium=(data)=>{
		
		this.props.history.push({
		  pathname:`/symposium/${data.selectedSymposiums.symposium}`,
		  state: {
		  	selectedSymposium:data.selectedSymposiums,
			symposiums:data.symposiums,
			profileId:this.props.location.state==null?this.props.profileId:this.props.location.state.profileId
		  }
		});
		window.location.reload(false);
	}

	closeOnboardingModal=()=>{
		this.setState({
			displayOnboarding:false,
			displayGuestOnboarding:false
		})
	}

	arrowIndicatorButton=()=>{
		return <ArrowDownContainer id="arrowIndicator" onClick={()=>this.handleScroll()}>
					<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-down-circle"
					 width="44" height="44" viewBox="0 0 24 24" stroke-width="2" stroke="#C8B0F4"
					  fill="none" stroke-linecap="round" stroke-linejoin="round">
					  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					  <circle cx="12" cy="12" r="9" />
					  <line x1="8" y1="12" x2="12" y2="16" />
					  <line x1="12" y1="8" x2="12" y2="16" />
					  <line x1="16" y1="12" x2="12" y2="16" />
					</svg>
				</ArrowDownContainer>
	}

	highlightedQuestionsSimplifiedModal=()=>{
		return( <HightLightedQuestions
					questionInformation={this.state.popularQuestions}
					isSimplified={this.state.headerAnimation}
					selectedSymposium={this.state.selectedSymposiumTitle}
					isGuestProfile={this.state.isGuestProfile}
					changeState={this}
					displayHightletedSimplifiedQuestionsModal={this.state.displayHightletedSimplifiedQuestionsModal}
				/>
		)
	}


	closeMobilePostOptions=()=>{
		this.setState({
			displayMobileSymposiumOptions:false
		})
	}

	handleFollowSymposium=async({isAccessTokenUpdated,updatedAccessToken})=>{
		if(this.state.isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free')
		}else{
			if(this.state.isProfileFollowingSymposium==false){
				const {confirmation,data}=await addSymposium(
													this.state.profileId,
													this.state.selectedSymposiumTitle,
													null,
													isAccessTokenUpdated==true?updatedAccessToken:
													this.props.personalInformation.accessToken
												);
				if(confirmation=="Failure"){
					const {statusCode}=data;
					if(statusCode==401){
						await refreshTokenApiCallHandle(
								this.props.personalInformation.refreshToken,
								this.props.personalInformation.id,
								this.handleFollowSymposium,
								this.props,
								{},
								true
							);
					}else{
						alert('Unfortunately there has been an error in retrieving you data. Please try again');
					}
				}
			}else{
				const {confirmation,data}=await removeSymposium({
													profileId:this.state.profileId,
													symposium:this.state.selectedSymposiumTitle,
													accessToken:isAccessTokenUpdated==true?updatedAccessToken:
													this.props.personalInformation.accessToken
												});
				if(confirmation=="Failure"){
					
					const {statusCode}=data;
					if(statusCode==401){
						await refreshTokenApiCallHandle(
								this.props.personalInformation.refreshToken,
								this.props.personalInformation.id,
								this.handleFollowSymposium,
								this.props,
								{},
								true
							);
					}else{
						alert('Unfortunately there has been an error with unfollowing this symposium. Please try again');
					}
				}
			}
			
			this.setState({
				isProfileFollowingSymposium:this.state.isProfileFollowingSymposium==true?false:true
			})
		}
	}


/*
	triggerDisplayMobileSymposiumOptions=()=>{
		return <>
					{this.state.displayMobileSymposiumOptions==true &&(
						<MobilePostOptionsPortal
							closeModal={this.closeMobilePostOptions}
							isSymposiumFollowed={this.state.isProfileFollowingSymposium}
							followUnfollowSymposium={this.handleFollowSymposium}
							popularQuestionObject={{
			  					questionInformation:this.state.popularQuestions,
			  					isSimplified:this.state.headerAnimation,
								selectedSymposium:this.state.selectedSymposiumTitle
			  				}}
			  				activePeople={this.state.activePeople}
			  				roomId={this.state.symposiumId}
							chat={this.state.chatRoom}
							socket={socket}
						  	symposium={this.state.selectedSymposiumTitle}
						  	questions={this.state.symposiumFeatureQuestions}
						  	profileId={this.state.profileId}
						  	displayPopularVideos={this.triggerDisplayPopularVideosModal}
						  	isGuestProfile={this.state.isGuestProfile}
						/>
					)}
				</>
	}

*/


	render(){
		return(
			<SymposiumProvider
				value={{
					handleSeeAllPeopleActiveModal:()=>{
						this.triggerSeeAllPeopleActiveModal()
					},
					displayPopularVideos:()=>{
						this.triggerDisplayPopularVideosModal()
					},
					highLightedQuestionComponent:()=>{
						return this.highlightedQuestionsSimplifiedModal()
					},
					specificSymposiumFeaturesComponent:()=>{
						let specificProps={
							selectedSymposiumTitle:this.state.selectedSymposiumTitle,
							symposiumId:this.state.symposiumId,
							chatRoom:this.state.chatRoom,
							profileId:this.state.profileId,
							socket:socket,
							closeSymposiumFeatureModal:this.closeSymposiumFeatureModal,
							headerAnimation:this.state.headerAnimation,
							symposiumFeatureQuestions:this.state.symposiumFeatureQuestions,
							isGuestProfile:this.state.isGuestProfile,
							displaySpecficSymposiumFeature:this.state.displaySpecficSymposiumFeature
						}
						const {requestedComponent}=symposiumFeatures(specificProps);
						
						
						return <>{requestedComponent}</>
					}
				}}
			>
				<SymposiumContainer id="extendedSymposiumContainer">
					<GeneralNavBar
						displayChatPage={this.displayChatPage}
						page={"Home"}
						routerHistory={this.props.history}
						targetDom={"extendedSymposiumContainer"}
					/>
						{this.state.displayOnboarding==true &&(
							<SymposiumOnboarding
								closeModal={this.closeOnboardingModal}
							/>
						)}

						{this.state.displayGuestOnboarding==true &&(
							<div onMouseEnter={()=>this.setState({handleScroll:false})} onMouseLeave={()=>this.setState({handleScroll:true})}>
								<GuestOnboarding
									targetDom="extendedSymposiumContainer"
									closeModal={this.closeOnboardingModal}
								/>
							</div>
						)}

					<PageIndicator>
						<a style={{textDecoration:"none",color:"black"}} href="javascript:void(0);">
							<ExploreIconContainer onClick={()=>this.handleDisplayExplorePage()}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none"}}>
										<ExploreIcon
											style={{fontSize:50}}
										/>
									</li>

									<li style={{listStyle:"none"}}>
										Explore
									</li>
								</ul>
							</ExploreIconContainer>
						</a>
					</PageIndicator>
				
					{this.state.displayConfetti &&(
						<Confetti
							style={{position:"fixed",width:"100%",height:"100%",zIndex:"20"}}
							 run={true}
						/>
					)}
					{this.arrowIndicatorButton()}
					{this.handleSeeAllPeopleActiveModal()}
					{this.handleSeeAllPopularVideos()}
					{this.specificSymposiumFeatures()}
					{/*
						{this.triggerDisplayMobileSymposiumOptions()}
					*/}

					<HeaderContainer
		  				activePeople={this.state.activePeople}
		  				popularVideos={this.state.popularVideos}
		  				selectedSymposiumTitle={this.state.selectedSymposiumTitle}
		  				symposiums={this.props.location.state==null?[]:this.props.location.state.symposiums}
		  				symposiumCounter={this.state.symposiumCounter}
		  				displayPopularVideos={this.triggerDisplayPopularVideosModal}
		  				handleSeeAllPeopleActiveModal={this.triggerSeeAllPeopleActiveModal}
		  				hideChat={this.hideChatRoom}
		  				isProfileFollowingSymposium={this.state.isProfileFollowingSymposium}
		  				profileId={this.state.profileId}
		  				changeFollowIndicator={this.changeFollowIndicator}
		  				popularQuestionObject={{
		  					questionInformation:this.state.popularQuestions,
		  					isSimplified:this.state.headerAnimation,
							selectedSymposium:this.state.selectedSymposiumTitle
		  				}}
		  				displayDesktopUI={this.state.displayDesktopUI}
		  				roomId={this.state.symposiumId}
						chat={this.state.chatRoom}
						socket={socket}
					  	symposium={this.state.selectedSymposiumTitle}
					  	questions={this.state.symposiumFeatureQuestions}
					  	isIpadView={this.state.displayIpadUI}
					  	isGuestProfile={this.state.isGuestProfile}
					  	headerAnimation={this.state.headerAnimation}
					  	backgroundColor={this.state.backgroundColor}
		  			/>

					<PostsChatInformation  id="postChatInformation" style={{paddingTop:this.state.handleScroll==false?"15%":"1%"}}>
						{this.state.isLoading==false?
							<Posts
								state={{
									posts:this.state.posts,
									isLoadingReloadedPosts:this.state.isLoadingReloadedPosts,
									endOfPostsDBIndicator:this.state.endOfPostsDBIndicator,
									headerAnimation:this.state.headerAnimation,
									postType:this.state.postType,
									handleScroll:this.state.handleScroll,
									postCount:this.state.postCount,
									selectedSymposiumTitle:this.state.selectedSymposiumTitle,
									displayPhoneUI:this.state.displayPhoneUI,
									displayDesktopUI:this.state.displayDesktopUI
								}}
								displaySymposium={this.displaySymposium}
								displayRecruitConfetti={this.displayRecruitConfetti}
								profileId={this.props.profileId}
							/>:<LoadingScreen isScrollEnabled={this.state.headerAnimation} isExtendedSymposium={true}/>
						}
					</PostsChatInformation>
				</SymposiumContainer> 

			</SymposiumProvider>
		)
	}
}


const mapStateToProps=(state)=>{
	return{
		personalInformation:state.personalInformation,
		profileId:state.personalInformation.id,
		isLoggedIn:state.personalInformation.loggedIn
	}
}

const mapDispatchToProps=dispatch=>{
	return{
		setPersonalProfileAccessToken:(accessToken)=>dispatch(setPersonalProfileAccessToken(accessToken)),
		setPersonalProfileRefreshToken:(refreshToken)=>dispatch(setPersonalProfileRefreshToken(refreshToken))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Symposium);



