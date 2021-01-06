import React,{Component} from "react";
import styled,{keyframes} from "styled-components";
import CommunityContainer from "./CommunityContainer";
import Symposium from "../ExtendedSymposium/index.js"
import {getSymposiumsFollowedHome,getSymposiumsNotFollowed} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {getFollowedSymposiumsCompanyHome} from "../../../../../Actions/Requests/CompanyPageAxiosRequests/CompanyPageGetRequests.js";
import StampIcon from "../../../../../designs/img/StampIcon.png";
import {connect} from "react-redux";
import ChatPageContainer from "../../../../GeneralComponents/ChatComponent/ChatContainerSet/ChatContainer.js";
import {GeneralNavBar} from "../../../../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";


 const keyFrameExampleThree= keyframes`
  0% {
  	top:10%;
  	left:20%
	width:70%;
	height:30%;
  }
  100% {
  	top:0%;
  	left:0%;
    height: 40%;
    width:100%;
  }
`;


 const keyFrame= keyframes`
  0% {
	left:110%;
  }
  100% {
    left:20%;
  }
`;

const keyFramMobile=keyframes`
	 0% {
		left:110%;
	  }
	  100% {
	    left:-15%;
	  }
`;



const Container=styled.div`
	position:absolute;
	width:100%;
	padding:10px;
	height:100%;
	background-color:white;
	overflow-y:scroll;
	transition:.8s;
	overflow-x:hidden;
	overflow-y:scroll;
	padding-top:0px;

	@media screen and (max-width:1370px){
		#stampIcon{
			width:50% !important;
		}
	}
	@media screen and (max-width:1150px) {
		#followedSymposiumsButton{
			font-size:20px !important;
		}
		#exploreSymposiumsButton{
			font-size:20px !important;
		}
	}

	@media screen and (max-width:1050px) {
		#SymposiumListContainer{
			margin-top:5% !important;
		}
	}


	@media screen and (max-width:960px) {
		#popularButton{
			margin-left:-25% !important;
		}
	}

	@media screen and (max-width:960px) {
		#stampIcon{
			width:50% !important;
		}
	}

	@media screen and (max-width:620px) {
		#stampIcon{
			width:50% !important;
		}
	}


	@media screen and (max-width:580px) {
		#SymposiumListContainer{
			margin-top:15% !important;
		}
	}

	@media screen and (max-width:420px) {
		#SymposiumListContainer{
			margin-top:25% !important;
			margin-left:-20% !important;
		}
		#stampIcon{
			width:60% !important;
		}
	}

	@media screen and (max-width:350px) {
		#SymposiumListContainer{
			margin-left:-25% !important;
		}
	}

	@media screen  and (max-width:830px) and (max-height:420px) 
	  and (orientation: landscape) 
	  and (-webkit-min-device-pixel-ratio: 1){
 		#symposiumsLI{
 			margin-bottom:30% !important;
 		}
    }
    @media screen and (max-width:900px) and (max-height:420px) and (orientation: landscape) {
    	#stampImage{
    		height:40% !important;
    	}
    }
`;

const CommunityTransitionAnimation=styled.div`
	position:relative;
	background-color:red;
	width:70%;
	height:30%;
	transition: transform 300ms ease-in-out;
	border-radius:5px;
	z-index:1;
	animation:${keyFrameExampleThree} 1s ease-in-out 0s forwards;
`;

const CommunityContainerAnimationFollowed=styled.div`

	position:relative;
	width:70%;
	height:30%;
	transition: transform 300ms ease-in-out;
	border-radius:5px;
	animation:${keyFrame} 1s ease-in-out 0s forwards;

	@media screen and (max-width:960px) {
		animation:${keyFramMobile} 1s ease-in-out 0s forwards;
		width:100%;
		height:70%;
	}
`;

const CommunityContainerAnimationExplore=styled.div`

	position:relative;
	width:70%;
	height:30%;
	transition: transform 300ms ease-in-out;
	border-radius:5px;
	animation:${keyFrame} 1s ease-in-out 0s forwards;

	@media screen and (max-width:960px) {
		animation:${keyFramMobile} 1s ease-in-out 0s forwards;
	}
`;

const ExploreButton={
  listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec"
}

const ShadowButtonCSS={
	display:"inline-block",
	listStyle:"none",
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	marginRight:"5px",
	borderRadius:"5px",
	borderStyle:"none"
}


const RouteOptionsDropDown={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white"
}


/*
	For some reason the delayed animation that I have set up
	isnt triggering properly will have to fix that later but
	thats a minor issue at the moment





	Right now im passing in this.props.history so that it can push 
	directly to extended symposium but later on I should make this 
	page its standalone page 
*/ 

class PersonalFeedContainer extends Component{


	constructor(props){

		super(props);
		this.state={
			symposiumArray:[],
			triggerAnimation:false,
			selectedSymposium:{},
			displaySymposiumPage:false,
			triggerExploreAnimation:false,
			isLoading:true,
			displayMobileUI:false,
			displayChatPage:false,
			chatPageIndicator:"",
			displayDesktopUI:false
		}
	}

	//Find a better way of doing this
	async componentDidMount(){
		try{
			console.log("TEst")
			const verification=this.props.isLoggedIn;
			if(verification==false){
				this.props.history.push({
					pathname:'/'
				})
			}else{
				window.addEventListener('resize',this.triggerUIChange)
				const {isPersonalProfile,profileId}=this.props;
				var symposiumsResponse;

				if(isPersonalProfile==true){
					symposiumsResponse=await getSymposiumsFollowedHome(profileId);
				}else{
					symposiumsResponse=await getFollowedSymposiumsCompanyHome(profileId);
				}

				const {confirmation,data}=symposiumsResponse;
				debugger;
				if(confirmation=="Success"){
					const {message}=data;
					var symposiums=[];
					if(message.length>0){
						for(var i=0;i<message.length;i++){
							const specificCommunity=message[i];
							const newTimer=100*i;
							await this.timerFunction(newTimer);

							symposiums.push(specificCommunity);

							this.setState(prevState=>({
								...prevState,
								symposiumArray:symposiums,
								isPersonalProfile:isPersonalProfile,
								isLoading:false
							}));
						}
					}else{
						this.setState(prevState=>({
							...prevState,
							symposiumArray:symposiums,
							isPersonalProfile:isPersonalProfile,
							isLoading:false
						}));	
					}
				}else{
					alert('Unfortunately an error has occured when getting symposiums. Please try again');
				}
				
				this.triggerUIChange();
			}
		}catch(err){
		}
	}

	triggerUIChange=()=>{
		
		if(window.innerWidth<960){
			this.setState({
				displayMobileUI:true,
				displayDesktopUI:false
			})

		}else{
			this.setState({
				displayMobileUI:false,
				displayDesktopUI:true
			})
		}
	}


	timerFunction=(seconds)=>{
		return new Promise(resolve => setTimeout(resolve, seconds));
	}

	changeColorForFastestGrowingButton=()=>{
		document.getElementById("fastestGrowingButton").style.color="white";
		document.getElementById("fastestGrowingButton").style.backgroundColor="#5298F8";

		document.getElementById("mostPopularButton").style.color="#6e6e6e";
		document.getElementById("mostPopularButton").style.backgroundColor="white";

		this.setState(prevState=>({
			...prevState,
			popularOrNewCommunites:this.state.newestCommunities
		}))
	}

	changeColorForPopularButton=()=>{


		document.getElementById("mostPopularButton").style.color="white";
		document.getElementById("mostPopularButton").style.backgroundColor="#5298F8";

		document.getElementById("fastestGrowingButton").style.color="#6e6e6e";
		document.getElementById("fastestGrowingButton").style.backgroundColor="white";

		this.setState(prevState=>({
			...prevState,
			popularOrNewCommunites:this.state.popularCommunities
		}))
	}

	handleSymposiumClick=(data)=>{
		var symposiums=[];
		
		for(var i=0;i<this.state.symposiumArray.length;i++){
			const currentSymposium=this.state.symposiumArray[i];
			if(currentSymposium.symposium!=data.symposium){
				symposiums.push(currentSymposium);
			}
		}

		this.props.history.push({
		  pathname:`/symposium/${data.symposium}`,
		  state: {
		  	selectedSymposium:data,
			profileId:this.props.profileId,
			symposiums
		  }
		});
	}

	displayFollowSymposiums=async()=>{

		const followingSymposiumButton=document.getElementById("followedSymposiumsButton");
		const exploreSymposiumsButton=document.getElementById("exploreSymposiumsButton");

		var explorePosts=[];
	
		followingSymposiumButton.style.color="#151518";
		exploreSymposiumsButton.style.color="#999999";

		explorePosts=await getSymposiumsFollowedHome(this.props.profileId);
		const {confirmation,data}=explorePosts;
		if(confirmation=="Success"){
			const {message}=data;
			this.setState({
				symposiumArray:(message.length==0?[]:message),
				isLoading:false
			})
		}else{
			alert('Unfortunately an error has occured when getting symposiums. Please try again');
		}
	}

	displayExploreSymposiums=async()=>{
		const followingSymposiumButton=document.getElementById("followedSymposiumsButton");
		const exploreSymposiumsButton=document.getElementById("exploreSymposiumsButton");
		var explorePosts=[];
		this.setState({
			isLoading:true
		})

		followingSymposiumButton.style.color="#999999";
		exploreSymposiumsButton.style.color="#151518";

		if(this.props.isPersonalProfile==true){
			explorePosts=await getSymposiumsNotFollowed(this.props.profileId);
			
		}
		const {confirmation,data}=explorePosts;
		if(confirmation=="Success"){
			const {message}=data;
			this.setState({
				symposiumArray:(message.length==0?[]:message),
				isLoading:false
			})
		}else{
			alert('Unfortunately an error has occured when getting symposiums. Please try again');
		}
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


	 TransitionAnimationTrigger=()=>{
	 	if(this.state.triggerAnimation==true)
			this.triggerAnimation();

	 	return this.state.triggerAnimation==false?
	 		<ul id="SymposiumListContainer" style={{position:"relative",paddingTop:"10%"}}>
	 			<ul style={{position:"relative",marginBottom:"30px"}}>
	 				{this.state.displayDesktopUI==false?
	 					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
		 	 				<div class="dropdown">
								<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" 
									style={ShadowButtonCSS}>
										Change Post Option
								   		<span class="caret"></span>
								</button>
								<ul class="dropdown-menu">
									<li id="followedSymposiumsButton" onClick={()=>this.displayFollowSymposiums()}><a>My Symposiums</a></li>
									<li id="exploreSymposiumsButton"  onClick={()=>this.displayExploreSymposiums()}><a>Explore Symposiums</a></li>
								</ul>
							</div>
						</a>:
						<li id="symposiumFilterLI" style={{listStyle:"none",marginBottom:"2%"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none"}}>
									<ul id="titlesContainer" style={{padding:"0px"}}>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>this.displayFollowSymposiums()} id="followedSymposiumsButton" style={{display:"inline-block",listStyle:"none",fontSize:"40px",marginRight:"5%"}}>
												<b>My symposiums</b>
											</li>
										</a>

										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>this.displayExploreSymposiums()} id="exploreSymposiumsButton" style={{color:"#999999",display:"inline-block",listStyle:"none",fontSize:"40px",marginLeft:"5%"}}>
												<b>Explore Symposiums</b>
											</li>
										</a>
									</ul>
								</li>
							</ul>
						</li>
					}
					<hr/>
					{/*
						<li id="popularButton" onClick={()=>this.changeColorForPopularButton()} id="mostPopularButton"
						style={{display:"inline-block",listStyle:"none",padding:"10px",backgroundColor:"#5298F8",color:"white",boxShadow:"1px 1px 5px #6e6e6e",marginRight:"10px",borderRadius:"5px"}}>
							 Most Popular
						</li>

						<li id="fastestGrowinButton" onClick={()=>this.changeColorForFastestGrowingButton()} id="fastestGrowingButton" style={ShadowButtonCSS}>
							Fastest Growing
						</li>
					*/}
						
					{this.state.displayDesktopUI==true &&(
						<li style={{listStyle:"none",width:"30%"}}>
							Go back and check out the newest posts in the symposiums you follow. 
						</li>
					)}
				</ul>
				{this.state.isLoading==true?
					<p style={{marginLeft:"15%"}}>Loading please wait..</p>:
					<>
						{this.state.symposiumArray.length==0?
								<li style={{listStyle:"none",marginLeft:"30%"}}>
									<ul>
										<li id="stampIcon" style={{listStyle:"none",display:"inline-block",width:"20%"}}>
											<img id="stampImage" src={StampIcon} style={{borderRadius:"50%",width:"100%",height:"20%"}}/>
										</li>
										<li style={{listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none"}}>
													<p> Unfortunately, we noticed that you arent following any symposiums  </p>
													<p> Click the explore button below to search and find news ones  </p>
												</li>
												<a href="javascript:void(0);" style={{textDecoration:"none"}}>
													<li onClick={()=>this.displayExploreSymposiums()} style={ExploreButton}>
														Explore
													</li>
												</a>
											</ul>
										</li>
									</ul>
								</li>:
							<React.Fragment>
								{this.state.symposiumArray.map(data=>
									<li id="symposiumsLI" style={{paddingBottom:"40px",listStyle:"none"}}>
										<CommunityContainerAnimationFollowed>
											<CommunityContainer
												data={data}
												isPersonalProfile={this.props.isPersonalProfile}
												handleSymposiumClickHandler={this.handleSymposiumClick}
												isMobileView={this.state.displayMobileUI}
											/>
										</CommunityContainerAnimationFollowed>
									</li>
								)}
							</React.Fragment>
						}	
					</>
				}
			</ul>:
				<CommunityTransitionAnimation style={{background:this.state.selectedSymposium.backgroundColor}}>
				</CommunityTransitionAnimation>
	}

	triggerAnimation=()=>{

		setTimeout(()=>{
			this.setState(prevState=>({
				...prevState,
				displaySymposiumPage:true
			}))
		},1300);
	}

	displaySymposiumPage=()=>{

		return this.state.displaySymposiumPage==true?
			<Symposium
				selectedSymposium={this.state.selectedSymposium}
				symposiums={this.state.symposiums}
			/>:
			<React.Fragment></React.Fragment>
	}

	render(){
		return(
			<Container id="symposiumListContainer">
				<GeneralNavBar
					displayChatPage={this.displayChatPage}
					page={"Home"}
					routerHistory={this.props.history}
					targetDom={"symposiumListContainer"}
				/>

				{this.displaySymposiumPage()}
				{this.TransitionAnimationTrigger()}
			</Container>
		)
	}

}

const mapStateToProps=(state)=>{
	return{
		profileId:state.personalInformation.id,
		isPersonalProfile:state.personalInformation.loggedIn,
		isLoggedIn:state.personalInformation.loggedIn
	}
}

export default connect(
	mapStateToProps,
	null
)(PersonalFeedContainer)

