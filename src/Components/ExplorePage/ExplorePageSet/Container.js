import React , {Component} from "react";
import styled from "styled-components";
import {GeneralNavBar} from "../../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import { connect } from "react-redux";
import SymposiumList from "../../Symposium/SymposiumList/FeedContainer";
import ChatPageContainer from "../../GeneralComponents/ChatComponent/ChatContainerSet/ChatContainer.js";
import ExplorePagePosts from "../ExplorePageSubset/index.js";

import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import AppsIcon from '@material-ui/icons/Apps';
import PlayListComponent from "../../PlayList/PlayListSet/PlayListContainer.js";
import {HomeProvider} from "../HomeContext.js";

import {getProfileForHomePage} from "../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import PERSONAL_INDUSTRIES from "../../../Constants/personalIndustryConstants.js";
import Confetti from 'react-confetti';
import ExplorePageOnboarding from "../../OnBoarding/ExplorePageOnboarding.js";
import LoadingScreen from "../../../LoadingAnimation.js";
import GuestOnboarding from "../../OnBoarding/GuestOnboarding.js";
import {signUpGuestUser} from "../../../Actions/Redux/Actions/PersonalProfile.js";
import TokenDisplay from "../../GeneralComponents/TokenComponent/Display/index.js";


const Container=styled.div`
	position:absolute;
	width:100%;
	padding:10px;
	padding-top:0px;
	height:100%;
	overflow-y:scroll;
	transition:.8s;
	overflow-x:hidden;
	overflow-y:scroll;

	@media screen and (max-width:740px){
		#confettiAnimation{
			width:300% !important;
		}
	}
`;


const PageIndicator=styled.div`
	position:absolute;
	width:5%;
	height:20%;
	top:15%;
	left:2%;
	border-radius:5%;
	z-index:4;
`;


const PersonalPageIndicator=styled.div`
	position:absolute;
	height:40%;
	top:30%;
	left:10%;
	border-radius:5%;
	z-index:4;


`;

const Home=styled.div`
	position:absolute;
	top:12%; 
	width:85%;
	height:85%;
	background-color:blue;
	left:10%;

`;

const ExploreIconContainer=styled.div`
	position:relative;
	width:89px;
	left:-80%;
	border-radius:5px;
	background-color:white;
	padding:10px;
	transition:.8s;
	display:flex;
	flex-direction:column;
	cursor:pointer;
	align-items:center;
	border-style:solid;
	border-color:#D0D0D0;
	border-width:1px;


	&:hover{
		box-shadow: 1px 1px 10px #707070;	
	}
`;

const ForYouIconContainer=styled.div`
	position:relative;
	width:89px;
	left:-80%;
	border-radius:5px;
	background-color:white;
	padding:10px;
	transition:.8s;
	display:flex;
	flex-direction:column;
	cursor:pointer;
	align-items:center;
	border-style:solid;
	border-color:#D0D0D0;
	border-width:1px;
	margin-top:30px;



	&:hover{
		box-shadow: 1px 1px 10px #707070;	
	}
`;

const FollowedForYouPageIcon=styled.div`
	position:relative;
	width:70px;
	padding-left:5px;
	left:-80%;
	border-radius:5px;

	background-color:white;
	box-shadow: 1px 1px 1px 1px #d5d5d5;
	transition:.8s;

	&:hover{
		box-shadow: 1px 1px 10px #707070;	
	}
`;

const CustomizedForYouPageIcon=styled.div`
	position:relative;
	padding-left:5px;
	left:-80%;

	background-color:white;
	border-radius:5px;
	box-shadow: 1px 1px 1px 1px #d5d5d5;
	transition:.8s;

	&:hover{
		box-shadow: 1px 1px 10px #707070;	
	}
`;

const RecruitsProfileContainer=styled.div`
	position:relative;
	width:90%;
	height:20%;
	background-color:red;
	border-radius:50%;
	border-style:solid;
	border-color:#5298F8;
	border-width:2px;
	transition:8s;

	&:hover{
		box-shadow: 1px 1px 10px #707070; 
	}
`;

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	z-index:10;

`;

const RecruitImageCSS={
	borderRadius:"50%",
	borderStyle:"solid",
	borderColor:"#5298F8",
	borderWidth:"2px",
	widht:"40%",
	height:"20%"
}


class HomePageContainer extends Component{

	constructor(props){
		super(props);

		this.state={
			displaySymposiumList:false,
			displayExplorerFeed:false,
			displayCustomizedFeed:false,
			displayForYourChoices:false,
			profileId:0,
			displayChatPage:false,
			chatPageIndicator:"",
			displaySearchExplorePage:true,
			recruitsPost:[],
			displayRecruitsPosts:false,
			displayPlayListPage:false,
			displayExpandedSymposium:false,
			isPersonalProfile:true,
			profileId:"",
			displayConfetti:false,
			isLoading:true,
			hideOnboarding:true,
			displayDesktopUI:false,
			displayGuestOnboarding:false,
			displayToken:false
		}
	}


	triggerUIChange=()=>{
		if(window.innerWidth<1370){
			this.setState({
				displayDesktopUI:false
			})

		}else{
			this.setState({
				displayDesktopUI:true
			})
		}
	}
	async componentDidMount(){
		window.addEventListener('resize',this.triggerUIChange)
		const {isGuestProfile,id}=this.props.personalInformation;
		if(id==null){
			this.setState({
				displayGuestOnboarding:true
			})
			this.props.dispatch(signUpGuestUser())
		}else if(id=="0" && isGuestProfile==false){
			this.setState({
				displayGuestOnboarding:true
			})
		}
		this.initiliazeUserProfileForHomePage(id);
		this.triggerUIChange();
		this.setState({
			displayToken:true
		})	
	}

	initiliazeUserProfileForHomePage=async(id)=>{
		
		var profile={};
		var symposiumsMap=this.constructSymposiumsMap(PERSONAL_INDUSTRIES.INDUSTRIES);
		var isPersonalProfile=true;
		if(id!="0" && this.props.personalInformation.isGuestProfile==false){
			const{confirmation,data}=await getProfileForHomePage(this.props.personalInformation.id)
			
			if(confirmation=="Success"){
				profile=data;
				isPersonalProfile=true;
			}else{
				alert('Unfortunately there has been an error with getting the posts/profile for the home page. Please try again');
			}
		}

		this.setState({
			recruitsPost:id=="0"?[]:profile.recruitsFollowing,
			isPersonalProfile:isPersonalProfile,
			profile:profile,
			profileId:id,
			symposiumsMap:symposiumsMap,
			isLoading:false,
			hideOnboarding:(id=="0"
							 || this.props.personalInformation.isGuestProfile
							 || this.props.personalInformation.isGuestProfile==null)?false:!profile.firstTimeLoggedIn.explorePage
		})
	}

	constructSymposiumsMap=(symposiums)=>{
		
		var symposiumsHashMap=new Map();
		for(var i=0;i<symposiums.length;i++){
			const {industry,backgroundColor,subCommunity}=symposiums[i];
			if(!symposiumsHashMap.has(industry)){
				const symposiumInformation={
					backgroundColor:backgroundColor,
					subCommunity:subCommunity
				}
				symposiumsHashMap.set(industry,symposiumInformation);
			}
		}
	}


	handleDisplayFollowedCommunitiesPage=()=>{

		document.getElementById('homePageContainer').style.backgroundColor="white";

		this.setState(prevState=>({
			...prevState,
			displaySymposiumList:true,
			displayExplorerFeed:false,
			displayCustomizedFeed:false,
			displaySearchExplorePage:false,
			displayExpandedSymposium:false
		}))
	}


	handleDisplayExplorePage=()=>{

		document.getElementById('homePageContainer').style.backgroundColor="white";

		this.setState(prevState=>({
			...prevState,
			displaySymposiumList:false,
			displayExplorerFeed:false,
			displaySearchExplorePage:true,
			displayForYourChoices:false,
			displayCustomizedFeed:false,
			displayExpandedSymposium:false
		}))
	}
	handleDisplayPlayListPage=()=>{
		this.setState(prevState=>({
			...prevState,
			displaySymposiumList:false,
			displayExplorerFeed:false,
			displaySearchExplorePage:false,
			displayPlayListPage:true,
			displayExpandedSymposium:false
		}))
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

	handleDisplayGridLayout=(indicator)=>{
		this.setState(prevState=>({
			...prevState,
			displaySearchExplorePage:indicator,
			displayExplorerFeed:!this.state.displayExplorerFeed
		}))
	}

	closeOnboardingModal=()=>{
		this.setState({
			hideOnboarding:true,
			displayGuestOnboarding:false
		})
	} 

	displaySymposiumHandle=(data)=>{
		this.setState(prevState=>({
			...prevState,
			displaySymposiumList:false,
			displayExplorerFeed:false,
			displaySearchExplorePage:false,
			displayPlayListPage:false,
			displayExpandedSymposium:true,
			selectedSymposiumPersonalFeed:data.selectedSymposiums,
			symposiums:data.symposiums
		}))	
	}

	guestOnboarding=()=>{
		return(
			<React.Fragment>
				{this.state.displayGuestOnboarding==true &&(
					<GuestOnboarding
						targetDom="homePageContainer"
						closeModal={this.closeOnboardingModal}
						routerHistory={this.props.history}
					/>
				)}
			</React.Fragment>
		)
	}

	explorePageOnboarding=()=>{
		return(
			<React.Fragment>
				{(
					this.state.hideOnboarding==false &&
				 	this.props.personalInformation.id!="0" &&
				 	this.props.personalInformation.isGuestProfile!=true && 
				 	this.props.personalInformation.isGuestProfile!=null
				 )==true &&(
					<ExplorePageOnboarding
						closeModal={this.closeOnboardingModal}
					/>
				)}
			</React.Fragment>
		)
	}

	handleTokenDisplay=()=>{
		return(
			<React.Fragment>
				{this.state.displayToken==true &&(
					<TokenDisplay
						targetDom={"homePageContainer"}
					/>
				)}
			</React.Fragment>
		)
	}

	render(){
		return(
			<HomeProvider
				value={{
					isDesktop:this.state.displayDesktopUI,
					personalInformationState:this.state.profile,
					isPersonalProfile:this.state.isPersonalProfile,
					displaySymposium:(data)=>{
						this.displaySymposiumHandle(data);
					},
					displayRecruitConfetti:(displayIndicator)=>{
						this.setState({
							displayConfetti:true
						})

						setTimeout(()=>{
							this.setState({
								displayConfetti:false
							})
						},5000);
					}
				}}
			>
					<Container id="homePageContainer">
						<GeneralNavBar
							displayChatPage={this.displayChatPage}
							page={"Home"}
							routerHistory={this.props.history}
							targetDom={"homePageContainer"}
						/>
						{this.handleTokenDisplay()}
						{this.guestOnboarding()}
						{this.explorePageOnboarding()}
						
						{this.state.isLoading==true?
							<LoadingScreen/>:
							<ExplorePagePosts
								displayGrids={this.handleDisplayGridLayout}
								history={this.props.history}
							/>
						}
						
					</Container>
					
			</HomeProvider>
		)
	}
}

const mapStateToProps=(state)=>{
	return{
		personalInformation:state.personalInformation,
		companyInformation:state.companyInformation,
		isLoggedIn:state.personalInformation.loggedIn
	}
}

const mapDispatchToProps=dispatch=>{
	return{
		signUpGuestUser:()=>dispatch(signUpGuestUser())
	}
}

export default connect(
		mapStateToProps,
		null
	)(HomePageContainer);