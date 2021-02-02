import React,{Component} from "react";
import styled, {keyframes} from "styled-components";
import Chat from "./ChatRoom.js";
import { connect } from "react-redux";
import SubSymposiums from "./SubSymposiums";
import ActivePeopleModal from "./ActivePeopleModal";
import {
		getImagesInIndustry,
		getVideoInIndustry,
		getBlogsInIndustry,
		getRegularPostsInIndustry,
		getIndustryInformation
	} from "../../../../../Actions/Requests/HomePageAxiosRequests/HomePageGetRequests.js";

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import PostCreation from "../../../../GeneralComponents/PostComponent/LargePostComponent/LargePostComponent.js";

import {connectToRoom,sendChatRoomMessage} from "../../../../../Actions/Requests/SocketIORequests";
import io from 'socket.io-client';
import {ImagePostsModal} from "../../SearchExplorePage/SearchExploreSubset/ImagePostsModal.js";
import VideoPostModal from "../../SearchExplorePage/SearchExploreSubset/VideoPostsModal.js";
import RegularPostModal from "../../SearchExplorePage/SearchExploreSubset/RegularPostsModal.js";
import BlogPostModal from "../../SearchExplorePage/SearchExploreSubset/BlogPostsModal.js";

import PopularVideosModal from "../PopularVideosModal.js";
import {HeaderContainer,SimpliedHeaderContainer} from "./HeaderContainer.js";
import HightLightedQuestions from "./HighLightedQuestions.js";
import SpecificFeatureSymposium from "./SpecificSympsoiumFeatures/index.js";
import Confetti from 'react-confetti';

import ChatPageContainer from "../../../../GeneralComponents/ChatComponent/ChatContainerSet/ChatContainer.js";
import {GeneralNavBar} from "../../../../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import ExploreIcon from '@material-ui/icons/Explore';
import GroupSharingVideoCall from "./Modals/VideoCall/index.js";
import SymposiumOnboarding from "../../../../OnBoarding/SymposiumPageOnboarding.js";
import GuestOnboarding from "../../../../OnBoarding/GuestOnboarding.js"
import LoadingScreen from "../../../../../LoadingAnimation.js";
import MobilePostOptionsPortal from "./Modals/MobileUI/PostOptionsPortal.js";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import {
		addSymposium,
		removeSymposium
} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {
		setPersonalProfileAccessToken,
		setPersonalProfileRefreshToken
} from "../../../../../Actions/Redux/Actions/PersonalProfile.js"; 
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";
import {
	SymposiumHeaderAnimation,
	SymposiumContainer,
	Container,
	PopularContainer,
	PopularVideos,
	PostsChatInformation,
	BackgroundModalContainer,
	ActivePeopleContainer,
	PostContainer,
	ShadowContainer,
	ExamplePosts,
	PreventScrollScreen,
	ExploreIconContainer,
	PageIndicator,
	SearchContainer,
	SearchTextArea,
	PostOptions,
	VideoCallOption,
	ChatContainer,
	SymposiumFeatureContainer,
	ChatAndIndustryInformationContainer,
	ArrowDownContainer,
	PostContainerTEst,
	SymposiumChatContainer
} from "./indexCSS.js";


const SympociaOptionsContainer=styled.div`
	position:relative;
	display:flex;							
	flex-direction:row;
	z-index:30;

	@media screen and (max-width:1370px){
		top:10%;
		${({isScrollEnabled})=>
			isScrollEnabled?
			`
				top:30%;
			`:
			`
				top:10%;
			`
		}
	} 
`;

const SearchOptionContainer=styled.div`
	display:flex;
	flex-direction:column;
	@media screen and (max-width:1370px){
		flex-direction:row;
	}
`;

const MinifiedSymposiumInformation=styled.div`
	display:flex;
	flex-direction:row;
	margin-left:-30%;

	@media screen and (max-width:1370px){
		${({isScrollEnabled})=>
			isScrollEnabled==true &&(
				`margin-left:-60%;`
			)}
	}
`;

const TEstContainer=styled.div`
	position:absolute;
	width:95%;
	height:97%;
`;



const SymposiumChoicesListCSS={
	display:"inline-block",
	listStyle:"none",
	marginRight:"20px",
	marginBottom:"50px",
	fontSize:"20px",
	padding:"10px",
	paddingRight:"20px"
}

const SymposiumChoicesListCSSLast={
	display:"inline-block",
	listStyle:"none",
	marginRight:"50px",
	marginBottom:"50px",
	fontSize:"20px",
	padding:"10px"

}

const PostOptionCSS={
	display:"flex",
	listStyle:"none",
	marginBottom:"2px",
	fontSize:"20px",
	padding:"5px"
}


const CloseButtonCSS={
	listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginTop:"2%",
  marginBottom:"2%"
}


const MobilePostOptionsButton={
	listStyle:"none",
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	borderRadius:"5px",
	borderStyle:"none",
	cursor:"pointer"
}

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
			hideOnboarding:true,
			featureQuestions:[],
			isLoading:true,
			displayDesktopUI:false,
			displayMobileSymposiumOptions:false,
			displayIpadUI:false,
			displayPhoneUI:false,
			isLoadingReloadedPosts:false,
			endOfPostsDBIndicator:false,
			postOption:"Image",
			displayGuestOnboarding:false
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
  		const headerContentsContainerElement=document.getElementById("headerContents");

		const profileId=this.props.location.state==null?this.props.profileId:this.props.location.state.profileId;
  		var {confirmation,data}=await getIndustryInformation(
  										this.props.match.params.symposiumName,
  									   	this.state.postCount,
  									   	profileId
									   	);
  		debugger;
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

  			var newHomePagePosts=this.addSuggestedSymposiums(posts);
  			
  			console.log(data);
  			console.log(popularQuestions);
	  			
	  		this.setState(prevState=>({
		  		...prevState,
		  		selectedSymposiumTitle:this.props.match.params.symposiumName,
		  		symposiums:this.props.location.state==null?[]:this.props.location.state.symposiums,
		  		symposiumCounter:-1,
		  		backgroundColor:this.props.location.state==null?this.symposiumBackgroundColor(this.props.match.params.symposiumName):
		  		this.props.location.state.selectedSymposium.backgroundColor,
		  		postType:"Image",
		  		posts:newHomePagePosts,
		  		popularVideos:popularPosts,
		  		activePeople:activeUsers,
		  		popularQuestions:popularQuestions,
		  		isProfileFollowingSymposium:isProfileFollowedSymposium,
		  		profileId,
		  		isLoading:false,
		  		hideOnboarding:isOnboardingCompleted,
		  		symposiumFeatureQuestions:featureQuestions,
		  		symposiumId:_id,
		  		isGuestProfile:(this.props.personalInformation.id=="0" || this.props.personalInformation.isGuestProfile==true)==true?
								true:false
	  		}));

		  	setTimeout(function(){
				postContainerElement.style.opacity="1";
				headerContentsContainerElement.style.opacity="1";
		  	},500);

		  	connectToRoom(socket,_id);

  		}else{
  			alert('Unfortunately there has been a problem with getting the symposium information. Please try again');
  		}
  		this.triggerUIChange();
	  }

	addSuggestedSymposiums=(posts)=>{
		return this.suggestedSymposiumsRecursive(posts);
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

	suggestedSymposiumsRecursive=(posts)=>{
		
		if(posts==null||posts.length==0){
			return posts;
		}else if(posts.length==1){
			posts.splice(1,0,"suggestedSymposium");
			return posts;
		}else{
			var randomNumber;
			if(posts.length<5){
				randomNumber=Math.floor(Math.random() * ((posts.length-1) - 1 + 1)) + 1;
			}else{
				randomNumber=Math.floor(Math.random() * (4 - 1 + 1)) + 1;
			}

			posts.splice(randomNumber,0,"suggestedSymposium");
			const currentPosts=posts.slice(0,6);
			const newPost=posts.slice(6,posts.length);
			const returnArray=this.suggestedSymposiumsRecursive(newPost);
			for(var i=0;i<returnArray.length;i++){
				currentPosts.push(returnArray[i]);
			}
			return currentPosts;
		}
	}

	  handleScroll=()=>{

	  	if(this.state.handleScroll!=false){

		  	document.getElementById("postChatInformation").style.overflow="visible";
		  	document.getElementById("postChatInformation").style.top="-20%";
		  	document.getElementById("postChatInformation").style.filter="blur(0)";
		  	document.getElementById("arrowIndicator").style.opacity="0";
	  		document.getElementById("postsContainer").style.opacity="0";

	  	if(this.state.headerAnimation==false){
	  		this.setState(prevState=>({
	  			...prevState,
	  			headerAnimation:true,
	  			handleScroll:false
	  		}))
	  	  }
	  	   	setTimeout(function(){
				document.getElementById("postsContainer").style.opacity="1";
		  	},1000);
	  	}
	  }


	  handlePreviousSymposiumButton=async()=>{
	  	this.fadeOutInEffect();
	  	if(this.state.symposiumCounter!=-1){
	  		const newCounter=this.state.symposiumCounter-1;
	  		const newSymposium=newCounter==-1?this.props.match.params.symposiumName:this.state.symposiums[newCounter].symposium;
	  		const postParameters={
				industry:newSymposium,
				postCount:0,
				userId:this.props.profileId
			}
	  		var {confirmation,data}=await getImagesInIndustry(postParameters);
	  		if(confirmation=="Success"){
	  			let newHomePagePosts=this.addSuggestedSymposiums(data);
	  			this.setState(prevState=>({
		  			...prevState,
		  			selectedSymposiumTitle:newSymposium,
		  			backgroundColor:this.symposiumBackgroundColor(newSymposium),
		  			symposiumCounter:newCounter,
		  			posts:newHomePagePosts,
					postType:"Image",
					isLoading:false
		  		}))
	  		}else{
	  			alert('Unfortunately there has been an error getting this symposiums data. Please try again ');
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

	  handleNextSymposiumButton=async()=>{
	  		this.fadeOutInEffect();
	  		if((this.state.symposiumCounter+1)<this.state.symposiums.length){

	  		const newCounter=this.state.symposiumCounter+1;
	  		const newSymposium=this.state.symposiums[newCounter];
	  		const postParameters={
				industry:newSymposium.symposium,
				postCount:0,
				userId:this.props.profileId
			}

			var {confirmation,data}=await getImagesInIndustry(postParameters);

			if(confirmation=="Success"){
				let newHomePagePosts=this.addSuggestedSymposiums(data);
				this.setState(prevState=>({
		  			...prevState,
		  			selectedSymposiumTitle:newSymposium.symposium,
		  			backgroundColor:this.symposiumBackgroundColor(newSymposium.symposium),
		  			symposiumCounter:newCounter,
		  			posts:newHomePagePosts,
					postType:"Image",
					isLoading:false
		  		}))
			}else{
				alert('Unfortunately there has been an error getting this symposiums data. Please try again');
			}
	  	}
	  }

	  handleSeeAllPopularVideos=()=>{
	  	return this.state.displayPopularVideos==true?
	  		<React.Fragment>
	  			<BackgroundModalContainer onClick={()=>this.setState(prevState=>({...prevState,displayPopularVideos:false}))}/>
	  			<PopularVideosModal
	  				popularVideos={this.state.popularVideos}
	  			/> 
	  		</React.Fragment>:
	  		<React.Fragment>
	  		</React.Fragment>
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
	  	return this.state.displayModalPeopleActive==true?
	  		<React.Fragment>
	  			<BackgroundModalContainer onClick={()=>this.setState(prevState=>({...prevState,displayModalPeopleActive:false}))}/>
	  			<ActivePeopleContainer>
	  				<ActivePeopleModal
	  					peopleActive={this.state.activePeople}
	  				/>
	  			</ActivePeopleContainer>
	  		</React.Fragment>:
	  		<React.Fragment>
	  		</React.Fragment>
	  }

	  handleHeaderAnimatedContents=()=>{

	  	return (
	  		<React.Fragment>
	  		</React.Fragment>
	  	)
	  }

	  handleSubSymposiumsChoices=(props)=>{

	  	console.log(props);

	  }

	  handleSeeAllSubSymposiums=()=>{

	  	return this.state.displayModalSubSymposiums==true?
	  		<React.Fragment>
	  			<BackgroundModalContainer onClick={()=>this.setState(prevState=>({...prevState,displayModalSubSymposiums:false}))}/>
	  				{/*
	  					Need to figure out how the subSymposiums are goint to displayed here
						<SubCommunitiesContainer>
			  				<SubSymposiums
			  					subCommunities={this.state.SubSymposiums}
			  					subCommunitiesChoices={this.handleSubCommunitiesChoices}
			  				/>

			  			</SubCommunitiesContainer>

	  				*/}
	  		</React.Fragment>:
	  		<React.Fragment>
	  		</React.Fragment>
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

	  //Props is huge will have to prob be refactored later

	  handleHeaderAnimation=()=>{
	  	console.log("Testing Header connection");
	  	const backgroundColor=this.state.backgroundColor;
	  	return this.state.headerAnimation==false ? 
	  		<Container id="headerContainer" style={{background:backgroundColor}}>
	  			{this.state.displayPhoneUI==false &&(
		  			<HeaderContainer
		  				activePeople={this.state.activePeople}
		  				popularVideos={this.state.popularVideos}
		  				selectedSymposiumTitle={this.state.selectedSymposiumTitle}
		  				symposiums={this.props.location.state==null?[]:this.props.location.state.symposiums}
		  				symposiumCounter={this.state.symposiumCounter}
		  				previousButton={this.handlePreviousSymposiumButton}
		  				nextButton={this.handleNextSymposiumButton}
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
		  			/>
	  			)}
	  		</Container>:
	  		<SymposiumHeaderAnimation id="animatedHeaderAnimatedContainer" style={{background:backgroundColor}}>
	  			{this.handleHeaderAnimatedContents()}
	  		</SymposiumHeaderAnimation>
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

	  symposiumFeaturesAndChat=()=>{
	  	return (
	  		<>
		  		{(this.state.selectedSymposiumTitle=="General"||
					this.state.selectedSymposiumTitle=="Religion"||
					this.state.selectedSymposiumTitle=="Gaming"||
					this.state.selectedSymposiumTitle=="Philosophy")?
		  			<SymposiumChatContainer>
			  			<Chat
					  		roomId={this.state.symposiumId}
					  		chat={this.state.chatRoom}
					  		profileId={this.state.profileId}
					  		socket={socket}
						/>
					</SymposiumChatContainer>
				  	:<SymposiumFeatureContainer>
					  	<SpecificFeatureSymposium
				  			symposium={this.state.selectedSymposiumTitle}
				  			symposiumId={this.state.symposiumId}
				  			questions={this.state.symposiumFeatureQuestions}
				  		/>
				  	</SymposiumFeatureContainer>
		  		} 
	  		</>
	  	)
	  }

	  specificSymposiumFeatures=()=>{
	  	return <>
	  			{this.state.headerAnimation==false &&(
					<>
						{this.state.selectedSymposiumTitle=="General"||
							this.state.selectedSymposiumTitle=="Religion"||
							this.state.selectedSymposiumTitle=="Gaming"||
							this.state.selectedSymposiumTitle=="Philosophy"?
							<SymposiumChatContainer>
					  			<Chat
							  		roomId={this.state.symposiumId}
							  		chat={this.state.chatRoom}
							  		profileId={this.state.profileId}
							  		socket={socket}
							  	/>
						  	</SymposiumChatContainer>:
						  	<SymposiumFeatureContainer>
							  	<SpecificFeatureSymposium
							  			symposium={this.state.selectedSymposiumTitle}
							  			symposiumId={this.state.symposiumId}
							  			questions={this.state.symposiumFeatureQuestions}
							  			isGuestProfile={this.state.isGuestProfile}
							  		/>
							</SymposiumFeatureContainer>
				  		} 
					</>
		  		)}
		  	  </>

			{/*
		  		<ul style={{padding:"0px",position:"relative",top:"-10px",left:"71%"}}>
		  			<li style={{listStyle:"none"}}>
		  				<ul style={{padding:"0px"}}>
		  					<li style={{listStyle:"none",marginBottom:"-2%"}}>
				  				<ul id="symposiumIndicatorUL" style={{padding:"0px",fontSize:"20px"}}>
				  					<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",marginBottom:"2%"}}>
				  						<ChevronLeftRoundedIcon
				  							style={{fontSize:40,marginTop:"10px"}}
				  							onClick={()=>this.handlePreviousSymposiumButton()}
				  						/>
				  					</li>

				  					<li style={{position:"relative",top:"-10px",listStyle:"none",display:"inline-block",marginRight:"2%",marginBottom:"2%"}}>
				  						{this.state.selectedSymposiumTitle}
				  					</li>
				  					
				  					<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",marginBottom:"4%"}}>
				  						<ChevronRightRoundedIcon
						  					style={{fontSize:40}}
						  					onClick={()=>this.handleNextSymposiumButton()}
						  				/>
				  					</li>
				  				</ul>
				  			</li>

				  			<li style={{listStyle:"none"}}>
				  				<ul style={{padding:"0px"}}>
				  					<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",marginBottom:"4%"}}>
				  						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					  						<ChatAndIndustryInformationContainer onClick={()=>this.setState({displayPopularVideos:true})}>
					  							View Popular videos
					  						</ChatAndIndustryInformationContainer>
				  						</a>
				  					</li>

				  					<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",marginBottom:"4%"}}>
				  						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					  						<ChatAndIndustryInformationContainer onClick={()=>this.setState({displayModalPeopleActive:true})}>
					  							View active people
					  						</ChatAndIndustryInformationContainer>
				  						</a>
				  					</li>

				  					<li style={{listStyle:"none",display:"inline-block"}}>
				  						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					  						<ChatAndIndustryInformationContainer onClick={()=>this.setState({displayChatRoom:!this.state.displayChatRoom})}>
					  							{this.state.selectedSymposiumTitle=="General"||
													this.state.selectedSymposiumTitle=="Religion"||
													this.state.selectedSymposiumTitle=="Gaming"||
													this.state.selectedSymposiumTitle=="Philosophy"?
													<p>View Chat </p>:
													<p> View Features </p>
												}
					  						</ChatAndIndustryInformationContainer>
				  						</a>
				  					</li>
				  				</ul>
				  			</li>
		  				</ul>
		  			</li>
		  			{this.state.displayChatRoom==true?
		  				<li style={{listStyle:"none"}}>
							{this.symposiumFeaturesAndChat()}
			  			</li>:null
		  			}
		  		</ul>
			*/}
	  }

	  handleDisplayPostCreation=()=>{
	  	return this.state.displayPostCreation==false?
	  		<React.Fragment></React.Fragment>:
	  		<React.Fragment>
	  			<BackgroundModalContainer onClick={()=>this.setState({displayPostCreation:false})}/>	  			
	  			<PostContainerTEst>
	  				<PostCreation/>
	  			</PostContainerTEst>
	  		</React.Fragment>
	  }

	  highlightAppropriatePostOption=(postOption)=>{
	  		document.getElementById("regular").style.backgroundColor="white";
			document.getElementById("regular").style.color="#5298F8";

			document.getElementById("image").style.backgroundColor="white";
			document.getElementById("image").style.color="#5298F8";

			document.getElementById("video").style.backgroundColor="white";
			document.getElementById("video").style.color="#5298F8";

			document.getElementById("blog").style.backgroundColor="white";
			document.getElementById("blog").style.color="#5298F8";

			switch(postOption){
				case "Image":{
					document.getElementById("image").style.backgroundColor="#5298F8";
					document.getElementById("image").style.color="white";
					break;
				}
				case "Video":{
					document.getElementById("video").style.backgroundColor="#5298F8";
					document.getElementById("video").style.color="white";
					break;
				}
				case "Blog":{
					document.getElementById("blog").style.backgroundColor="#5298F8";
					document.getElementById("blog").style.color="white";
					break;
				}
				case "Regular":{
					document.getElementById("regular").style.backgroundColor="#5298F8";
					document.getElementById("regular").style.color="white";
					break;
				}
			}
	  }




	 //Could be implemented in a better way it just looks awkward to me 
	changePostOption=async(postOption)=>{
		this.setState({
			postOption:postOption
		})
		const postParameters={
			industry:this.state.selectedSymposiumTitle,
			postCount:this.state.postCount,
			userId:this.props.profileId
		}
		if(postOption=="Image"){
			var {confirmation,data}=await getImagesInIndustry(postParameters);
			

			if(confirmation=="Success"){
				if(data.length==0){
					this.setState({
						endOfPostsDBIndicator:true,
						isLoadingReloadedPosts:false
					})
				}else{
					const currentPosts=this.state.posts;
					const nextPosts=currentPosts.concat(data);
					var newHomePagePosts=this.addSuggestedSymposiums(nextPosts);
					this.setState({
						posts:newHomePagePosts,
						postType:"Image",
						isLoadingReloadedPosts:false,
						isLoading:false
					},()=>{
						this.highlightAppropriatePostOption(postOption);
					})
				}
			}else{
				alert('Unfortunately there has been an error getting this image data. Please try again');
			}

		}else if(postOption=="Video"){
			var {confirmation,data}=await getVideoInIndustry(postParameters);
			
			if(confirmation=="Success"){
				if(data.length==0){
					this.setState({
						endOfPostsDBIndicator:true,
						isLoadingReloadedPosts:false
					})
				}else{
					const currentPosts=this.state.posts;
					const nextPosts=currentPosts.concat(data);
					var newHomePagePosts=this.addSuggestedSymposiums(nextPosts);
					this.setState({
						posts:newHomePagePosts,
						postType:"Video",
						isLoadingReloadedPosts:false,
						isLoading:false
					},function(){
						this.highlightAppropriatePostOption(postOption);
					})
				}
			}else{
				alert('Unfortunately there has been an error getting this video data. Please try again');
			}

		}else if(postOption=="Blog"){
			var {confirmation,data}=await getBlogsInIndustry(postParameters);
			
			if(confirmation=="Success"){
				if(data.length==0){
					this.setState({
						endOfPostsDBIndicator:true,
						isLoadingReloadedPosts:false
					})
				}else{
					const currentPosts=this.state.posts;
					const nextPosts=currentPosts.concat(data);
					var newHomePagePosts=this.addSuggestedSymposiums(nextPosts);
					this.setState({
						posts:newHomePagePosts,
						postType:"Blog",
						isLoadingReloadedPosts:false,
						isLoading:false
					},function(){
						this.highlightAppropriatePostOption(postOption);
					})
				}
			}else{
				alert('Unfortunately there has been an error getting this blog data. Please try again');
			}
		}else{
			var {confirmation,data}=await getRegularPostsInIndustry(postParameters);
			
			if(confirmation=="Success"){
				if(data.length==0){
					this.setState({
						endOfPostsDBIndicator:true,
						isLoadingReloadedPosts:false
					})
				}else{
					const currentPosts=this.state.posts;
					const nextPosts=currentPosts.concat(data);
					var newHomePagePosts=this.addSuggestedSymposiums(nextPosts);
					this.setState({
						posts:newHomePagePosts,
						postType:"Regular",
						isLoadingReloadedPosts:false,
						isLoading:false
					},function(){
						this.highlightAppropriatePostOption(postOption);
					})
				}
			}else{
				alert('Unfortunately there has been an error getting this regular post data. Please try again');
			}
		}
	}

	toggleLoading=(postOption)=>{
		this.setState({
			isLoading:true,
			posts:[],
			postCount:0
		},()=>{
			this.changePostOption(postOption);
		})
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
		console.log(this.state.displayChatPage);
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
			profileId:this.props.location.state==null?this.props.profileId:this.props.location.state
		  }
		});
		window.location.reload(false);
	}

	closeOnboardingModal=()=>{
		this.setState({
			hideOnboarding:true,
			displayGuestOnboarding:false
		})
	}

	arrowIndicatorButton=()=>{
		return <ArrowDownContainer id="arrowIndicator" onClick={()=>this.handleScroll()}>
					<p style={{marginLeft:"-30%",color:"#C8B0F4"}}>Click here to enter symposium </p>
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
	postOptions=()=>{
		return <>
					<li onClick={()=>this.toggleLoading("Regular")} style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<PostOptions id="regular">	
								Regular posts
							</PostOptions>
						</a>
					</li>

					<li  onClick={()=>this.toggleLoading("Image")} style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<PostOptions id="image">	
								Images
							</PostOptions>
						</a>
					</li>

					<li onClick={()=>this.toggleLoading("Video")} style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<PostOptions id="video">	
								Videos
							</PostOptions>
						</a>
					</li>

					<li onClick={()=>this.toggleLoading("Blog")} style={{listStyle:"none",display:"inline-block"}}>
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<PostOptions id="blog">	
								Blogs
							</PostOptions>
						</a>
					</li>

					{/*
						<li onClick={()=>this.displayVideoCallModal()} style={{listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<VideoCallOption id="blog">	
									+ 234 Video calls
								</VideoCallOption>
							</a>
						</li>
					*/}
				</>
	}

	symposiumOptions=(isScrollEnabled)=>{
		const isPhoneScrollTriggered=(this.state.displayPhoneUI==true && isScrollEnabled==true)==true?true:false;
		return(
			<>
				{(isScrollEnabled==true && this.state.displayDesktopUI==false) ||
					(this.state.displayPhoneUI==true)==true?
					<p onClick={()=>this.setState({displayMobileSymposiumOptions:true})}
						style={{
							...MobilePostOptionsButton,
							marginLeft:isPhoneScrollTriggered==true?"80":"0%",
							marginTop:isPhoneScrollTriggered==true?"10":"0%"
						}}>
						 Symposium Options
					</p>:
					<>
						<ChatAndIndustryInformationContainer onClick={()=>this.setState({displayPopularVideos:true})}>
							Popular videos
						</ChatAndIndustryInformationContainer>

						<ChatAndIndustryInformationContainer onClick={()=>this.setState({displayModalPeopleActive:true})}>
							Active people
						</ChatAndIndustryInformationContainer>
						
						<ChatAndIndustryInformationContainer onClick={()=>this.setState({displayChatRoom:!this.state.displayChatRoom})}>
							{this.state.selectedSymposiumTitle=="General"||
							this.state.selectedSymposiumTitle=="Religion"||
							this.state.selectedSymposiumTitle=="Gaming"||
							this.state.selectedSymposiumTitle=="Philosophy"?
							<p>Chat </p>:
							<p> Symposium Features </p>
						}
						</ChatAndIndustryInformationContainer>
					</>
				}
			</>
		)
	}
	postOptionsMobileOrDesktop=()=>{
		let mobilePostCSS={...MobilePostOptionsButton};
		if(this.state.headerAnimation==true){
			mobilePostCSS={
				...mobilePostCSS,
				marginTop:"10%",
				marginLeft:"20%"
			}
		}
		return <>
					{this.state.displayDesktopUI==false?
						<div class="dropdown">
							<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={mobilePostCSS}>
								Post Options
							</button>

							<ul class="dropdown-menu">
								{this.postOptions()}
							</ul>
						</div>
						:<ul>
							<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
								Display:
							</li>
							{this.postOptions()}
						</ul> 
					}
			   </>
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
					debugger;
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
						/>
					)}
				</>
	}

	triggerReloadingPostsHandle=()=>{
		this.setState({
			triggerPostReload:true,
			isLoadingReloadedPosts:true,
			postCount:(this.state.postCount+1)
		},()=>{
			this.changePostOption(this.state.postOption)	
		})
	}


	render(){
		return(
			<SymposiumContainer id="extendedSymposiumContainer">
				<GeneralNavBar
					displayChatPage={this.displayChatPage}
					page={"Home"}
					routerHistory={this.props.history}
					targetDom={"extendedSymposiumContainer"}
				/>
					{this.state.hideOnboarding==false &&(
						<div onMouseEnter={()=>this.setState({handleScroll:false})} >
							<SymposiumOnboarding
								closeModal={this.closeOnboardingModal}
							/>
						</div>
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
				
				{this.state.displayGroupSharingVideoCallPortal==true?
					<div onMouseEnter={()=>this.setState({handleScroll:false})}>
						<GroupSharingVideoCall
							closeModal={this.closeGroupVideoCallPortal}
							symposiumId={this.state.symposiumId}
							routerHistory={this.props.history}
						/>
					</div>:null
				}
			
				{this.state.displayConfetti &&(
					<Confetti
						style={{position:"fixed",width:"100%",height:"100%",zIndex:"20"}}
						 run={true}
					/>
				)}
				{this.arrowIndicatorButton()}
				{this.handleDisplayPostCreation()}
				{this.handleSeeAllSubSymposiums()}
				{this.handleSeeAllPeopleActiveModal()}
				{this.handleSeeAllPopularVideos()}
				{this.handleHeaderAnimation()}
				{this.specificSymposiumFeatures()}
				{this.triggerDisplayMobileSymposiumOptions()}

				<PostsChatInformation  id="postChatInformation" style={{paddingTop:this.state.handleScroll==false?"15%":"1%"}}>
					{this.state.isLoading==false?
						<>
							<SympociaOptionsContainer isScrollEnabled={this.state.headerAnimation}>	
									<SearchOptionContainer style={{width:"80%",marginLeft:this.state.headerAnimation==false?"10%":"0%"}}>	
										{/*
											Down the I would like a search function to be implemented
											Should be easy just hookup the search api to here then repopulate results when the api returns

											<SearchContainer>
												<ul style={{paddingTop:"5px"}}>
													<li style={{position:"relative",top:"-10px",listStyle:"none",display:"inline-block"}}>
														<SearchIcon
															style={{fontSize:30}}
														/>
													</li>
													<SearchTextArea
														placeholder="Type here to search"
													/>
												</ul>
											</SearchContainer>
											<li id="postOptionsLI" style={{marginTop:"1%",listStyle:"none",width:"70%",zIndex:"30"}}>
											</li>
										*/}
										{this.postOptionsMobileOrDesktop()}
										{(this.state.displayPhoneUI==true && this.state.headerAnimation==false)==true && (
											<div style={{marginLeft:"2%"}}>
												{this.symposiumOptions(this.state.headerAnimation)}
											</div>
										)}
									</SearchOptionContainer>

								{this.state.headerAnimation==true && (
									<MinifiedSymposiumInformation isScrollEnabled={this.state.headerAnimation}>
										{(this.state.displayPhoneUI==true && this.state.headerAnimation==true)==false &&(
											<>
						  						<ChevronLeftRoundedIcon
						  							style={{fontSize:40,marginTop:"10px"}}
						  							onClick={()=>this.handlePreviousSymposiumButton()}
						  						/>
									  			<p style={{marginTop:"10px",fontSize:"20px"}}>{this.state.selectedSymposiumTitle}</p>

						  						<ChevronRightRoundedIcon
								  					style={{fontSize:40,marginTop:"10px"}}
								  					onClick={()=>this.handleNextSymposiumButton()}
								  				/>
											</>
										)}
						  				{this.symposiumOptions(this.state.headerAnimation)}

									</MinifiedSymposiumInformation>
								)}
							</SympociaOptionsContainer>
							<hr/>
					
							<PostContainer isScrollEnabled={this.state.headerAnimation} id="postsContainer">
								{this.state.postType=="Image"?
									<ImagePostsModal
										posts={this.state.posts}
										_id={this.props.profileId}
										confettiAnimation={this.displayRecruitConfetti}
										isPersonalProfile={true}
										displaySymposium={this.displaySymposium}
										targetDom={"extendedSymposiumContainer"}
										isLoadingReloadedPosts={this.state.isLoadingReloadedPosts}
										triggerReloadingPostsHandle={this.triggerReloadingPostsHandle}
										endOfPostsDBIndicator={this.state.endOfPostsDBIndicator}
									/>:null
								}

								{this.state.postType=="Video"?
									<VideoPostModal
										posts={this.state.posts}
										_id={this.props.profileId}
										confettiAnimation={this.displayRecruitConfetti}
										isPersonalProfile={true}
										displaySymposium={this.displaySymposium}
										targetDom={"extendedSymposiumContainer"}
										isLoadingReloadedPosts={this.state.isLoadingReloadedPosts}
										triggerReloadingPostsHandle={this.triggerReloadingPostsHandle}
										endOfPostsDBIndicator={this.state.endOfPostsDBIndicator}
									/>:null
								}

								{this.state.postType=="Blog"?
									<li style={{listStyle:"none",marginTop:"3%",marginLeft:"5%"}}>
										<BlogPostModal
											posts={this.state.posts}
											_id={this.props.profileId}
											confettiAnimation={this.displayRecruitConfetti}
											isPersonalProfile={true}
											displaySymposium={this.displaySymposium}
											targetDom={"extendedSymposiumContainer"}
											isLoadingReloadedPosts={this.state.isLoadingReloadedPosts}
											triggerReloadingPostsHandle={this.triggerReloadingPostsHandle}
											endOfPostsDBIndicator={this.state.endOfPostsDBIndicator}
										/>
									</li>:null
								}

								{this.state.postType=="Regular"?
									<li style={{listStyle:"none",marginTop:"5%",marginLeft:"5%",width:"90%"}}>
										<RegularPostModal
											posts={this.state.posts}
											_id={this.props.profileId}
											confettiAnimation={this.displayRecruitConfetti}
											isPersonalProfile={true}
											displaySymposium={this.displaySymposium}
											targetDom={"extendedSymposiumContainer"}
											isLoadingReloadedPosts={this.state.isLoadingReloadedPosts}
											triggerReloadingPostsHandle={this.triggerReloadingPostsHandle}
											endOfPostsDBIndicator={this.state.endOfPostsDBIndicator}
										/>
									</li>:null
								}
							</PostContainer>
						</>:<LoadingScreen/>
					}
				</PostsChatInformation>
			</SymposiumContainer>
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




