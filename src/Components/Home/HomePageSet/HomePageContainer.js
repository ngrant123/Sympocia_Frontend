import React , {Component} from "react";
import styled from "styled-components";
import {GeneralNavBar} from "../../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import { connect } from "react-redux";
import ExplorePage from "../HomePageSubset/ExploreHomeFeed/ExplorePage/ExplorePage";
import SymposiumList from "../HomePageSubset/Symposium/SymposiumList/FeedContainer";
import ChatPageContainer from "../../GeneralComponents/ChatComponent/ChatContainerSet/ChatContainer.js";
import SearchExploreScreen from "../HomePageSubset/SearchExplorePage/SearchExploreSet/index.js";

import ExploreIcon from '@material-ui/icons/Explore';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import AssistantIcon from '@material-ui/icons/Assistant';
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';
import RecruitsPosts from "./RecruitsPostsModal.js";

import AppsIcon from '@material-ui/icons/Apps';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PlayListComponent from "../../PlayList/PlayListSet/PlayListContainer.js";
import {HomeProvider} from "../HomeContext.js";
import Symposium from "../HomePageSubset/Symposium/ExtendedSymposium/index.js";

import {getProfileForHomePage} from "../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {getCompanyProfileForHomePage} from "../../../Actions/Requests/CompanyPageAxiosRequests/CompanyPageGetRequests.js";
import NoProfileIcon from "../../../designs/img/NoProfilePicture.png";
import PERSONAL_INDUSTRIES from "../../../Constants/personalIndustryConstants.js";
import COMPANY_INDUSTRIES from "../../../Constants/industryConstants.js";
import Confetti from 'react-confetti';

import LoadingScreen from "../../../LoadingAnimation.js";

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
`;


const PageIndicator=styled.div`
	position:absolute;
	width:5%;
	height:20%;
	top:7%;
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
	width:70px;
	left:-80%;
	border-radius:5px;
	background-color:white;
	padding:10px;
	box-shadow: 1px 1px 1px 1px #d5d5d5;
	transition:.8s;

	&:hover{
		box-shadow: 1px 1px 10px #707070;	
	}
`;

const ForYouIconContainer=styled.div`
	position:relative;
	width:70px;
	left:-80%;
	border-radius:5px;
	background-color:white;
	padding:10px;
	box-shadow: 1px 1px 1px 1px #d5d5d5;
	transition:.8s;

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
			isLoading:true
		}
	}

	async componentDidMount(){
		/*
		*/
		console.log(this.props);
		var profile;
		var symposiumsMap;
		var isPersonalProfile;
		debugger;
		if(this.props.location.query!=null){
			const profileData=this.props.location.query.createProfile;
			if(this.props.location.query.createProfile.isPersonalProfile==true){
				const {
						createProfile,
						previousProps,
				 		reduxFunctions
				 	}=profileData;
				 	const personalProfile=profileData.profile;

				profile=await createProfile(previousProps,personalProfile,reduxFunctions);
				symposiumsMap=this.constructSymposiumsMap(PERSONAL_INDUSTRIES.INDUSTRIES);
				isPersonalProfile=true;
			}else{
				const {
					handleSendDataToDatabase,
					companyInformation,
					reduxFunctions
				}=profileData

				profile=await handleSendDataToDatabase(companyInformation,reduxFunctions)
				symposiumsMap=this.constructSymposiumsMap(PERSONAL_INDUSTRIES.INDUSTRIES);
				isPersonalProfile=false;
			}
		}else{
			debugger;
			if(this.props.personalInformation.loggedIn==true){
				symposiumsMap=this.constructSymposiumsMap(PERSONAL_INDUSTRIES.INDUSTRIES);
				profile=await getProfileForHomePage(this.props.personalInformation.id)
				isPersonalProfile=true;

			}else{
				var symposiumsMap=this.constructSymposiumsMap(COMPANY_INDUSTRIES.INDUSTRIES);
				profile=await getCompanyProfileForHomePage(this.props.companyInformation.id);
				isPersonalProfile=false
			}
		}

		this.setState({
			recruitsPost:profile.recruits,
			isPersonalProfile:isPersonalProfile,
			profile:profile,
			profileId:profile._id,
			symposiumsMap:symposiumsMap,
			isLoading:false
		})
		debugger;
	}

	constructSymposiumsMap=(symposiums)=>{
		debugger;
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
		console.log(this.state.displayChatPage);
		return this.state.displayChatPage==true?
			<ChatPageContainer
				pageIndicator={this.state.chatPageIndicator}
				hideChatContainer={this.hideChatPage}
			/>:<React.Fragment></React.Fragment>
	}

	handleDisplayGridLayout=(indicator)=>{
		console.log("Testing grid layout");
		console.log(indicator);
		this.setState(prevState=>({
			...prevState,
			displaySearchExplorePage:indicator,
			displayExplorerFeed:!this.state.displayExplorerFeed
		}))
	}

	displaySelectedScreen=()=>{
		console.log(this.props)
		if(this.state.displaySymposiumList==true){
			return <SymposiumList
						isPersonalProfile={this.state.isPersonalProfile}
						profileId={this.state.profile._id}
						routerHistory={this.props.history}
					/>
		}else if(this.state.displayExplorerFeed==true){
			const userObject={
				id:this.state.profileId,
				isPersonalPage:this.state.isPersonalProfile
			}
			return <ExplorePage
						displayGrids={this.handleDisplayGridLayout}
						userInformation={userObject}
						symposiumMap={this.state.symposiumsMap}
					/>;
		}else if(this.state.displaySearchExplorePage==true){
				return <SearchExploreScreen
								displayGrids={this.handleDisplayGridLayout}
							/>;
		}else if(this.state.displayPlayListPage==true){
			return <PlayListComponent/>
		}else if(this.state.displayExpandedSymposium==true){
			debugger;
			this.props.history.push({
			  pathname:`/symposium/${this.state.selectedSymposiumPersonalFeed.symposium}`,
			  state: {
			  	selectedSymposium:this.state.selectedSymposiumPersonalFeed,
				symposiums:this.state.symposiums,
				profileId:this.state.profileId
			  }
			});
			/*
			return <Symposium
						selectedSymposium={this.state.selectedSymposiumPersonalFeed}
						symposiums={this.state.symposiums}
						profileId={this.state.profileId}
					/>
			*/
		}
	}

	render(){
		return(
			<HomeProvider
				value={{
					personalInformationState:this.state.profile,
					isPersonalProfile:this.state.isPersonalProfile,
					displaySymposium:(data)=>{
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
						/>
						
						{this.state.displayConfetti==true?
								<Confetti
									style={{position:"fixed",width:"100%",height:"100%",zIndex:"20"}}
									 run={true}
								/>
							:<React.Fragment></React.Fragment>
						}

						{this.chatPage()}
						{this.state.displayRecruitsPosts==true?
								<React.Fragment>
									<ShadowContainer
										onClick={()=>this.setState({displayRecruitsPosts:!this.state.displayRecruitsPosts})}
									/>
									<RecruitsPosts
										recruits={this.state.recruitsPost}
										id={this.state.profileId}
										isPersonalProfile={this.state.isPersonalProfile}
									/>
								</React.Fragment>
								:<React.Fragment></React.Fragment>}

								{/*
									Home for you like for what you subscribed
									and something like a mix between what you already like and what you may like
						*/}
						<PageIndicator>
							<ul>
								<li style={{listStyle:"none",marginBottom:"30px",marginTop:"10px"}}>
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
								</li>
								<li style={{listStyle:"none"}}>
									<ForYouIconContainer>
										<ul style={{padding:"0px"}}>
											<li onClick={()=>this.handleDisplayFollowedCommunitiesPage()} style={{listStyle:"none",marginBottom:"20%"}}>
												<a style={{textDecoration:"none",color:"black"}} href="javascript:void(0);">
													<AppsIcon
														style={{fontSize:40}}
													/>
												</a>
											</li>

											<li style={{listStyle:"none",marginBottom:"20%"}}>
												<a onClick={()=>this.handleDisplayPlayListPage()}style={{textDecoration:"none",color:"black"}} href="javascript:void(0);">
													<PlaylistAddIcon
														style={{fontSize:40}}
													/>
												</a>
											</li>
											<li style={{listStyle:"none",marginBottom:"10%"}}>
												<PersonPinIcon
													style={{fontSize:40}}
												/>
											</li>
											<li style={{listStyle:"none",height:"130%",overflowY:"auto "}}>
												<ul style={{padding:"0px"}}>
													{this.state.recruitsPost!=null?
														<React.Fragment>
															{this.state.recruitsPost.map(data=>
																<li onClick={()=>this.setState({displayRecruitsPosts:true})} style={{listStyle:"none",marginBottom:"15%"}}>
																	<a style={{textDecoration:"none"}} href="javascript:void(0);">
																			{data.profilePicture==null||data.profilePicture==""?
																				<img src={NoProfileIcon} style={RecruitImageCSS}/>:
																				<img src={data.profilePicture} style={RecruitImageCSS}/>
																			}
																	</a>
																</li>
															)}
														</React.Fragment>:null
													}
													
												</ul>
											</li>
										</ul>
									</ForYouIconContainer>
								</li>
							</ul>
						</PageIndicator>
						{this.state.isLoading==true?<LoadingScreen/>:
							<React.Fragment>
								{this.displaySelectedScreen()}
							</React.Fragment>
						}
						
					</Container>
					
			</HomeProvider>
		)
	}
}

const mapStateToProps=(state)=>{
	return{
		personalInformation:state.personalInformation,
		companyInformation:state.companyInformation
	}
}


export default connect(
		mapStateToProps,
		null
	)(HomePageContainer);