import React,{Component} from "react";
import styled from "styled-components";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import Checkbox from '@material-ui/core/Checkbox';
import CreatePostComponent from "../../../../GeneralComponents/PostComponent/LargePostComponent/LargePostComponent.js";
import IndustryOptions from "../../../../GeneralComponents/PostComponent/IndustryPostOptions.js"
import {connect} from "react-redux";
import {HomeConsumer} from "../../../HomeContext.js";
import {SearchConsumer} from "../../../../SearchPage/SearchContext.js";

import {ImagePostsModal} from '../SearchExploreSubset/ImagePostsModal.js';
import VideosPostsModal from '../SearchExploreSubset/VideoPostsModal.js';
import BlogsPostsModal from '../SearchExploreSubset/BlogPostsModal.js';
import RegularPostsModal from '../SearchExploreSubset/RegularPostsModal.js';

import {
		exploreImagePosts,
		exploreVideoPosts,
		exploreBlogPosts,
		exploreRegularPosts
	} from "./../../../../../Actions/Requests/HomePageAxiosRequests/HomePageGetRequests.js";
import {refreshTokenApiCallHandle} from "./../../../../../Actions/Tasks/index.js";
import {
		setPersonalProfileAccessToken,
		setPersonalProfileRefreshToken
		} from "./../../../../../Actions/Redux/Actions/PersonalProfile.js"; 

const Container=styled.div`
	@media screen and (max-width:1370px){
    	#mobileArenaLI{
    		display:none!important;
    	}
    }

    @media screen and (max-width:1370px){
    	#mobileHeaderLI{
  			margin-top:13% !important;
  		}
  		#mobileArenaLI{
    		width:15% !important;
			margin-left:35% !important;
    	}
		#exploreDescriptionLI{
			display:none !important;
		}
	}

	@media screen and (max-width:650px){
		margin-left:0%;
		#mobileHeaderLI{
  			margin-top:25% !important;
  		}
		#exploreDescriptionLI{
			display:none !important;
		}
		#mobileArenaLI{
    		width:28% !important;
			margin-left:27% !important;
    	}
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		#mobileArenaLI{
    		width:10% !important;
			margin-left:37% !important;
  		}
    }

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	#mobileArenaLI{
    		width:15% !important;
			margin-left:35% !important;
  		}
  		#mobileHeaderLI{
  			margin-top:15% !important;
  		}
    }

    @media screen and (max-width:700px) and (max-height:420px) and (orientation: landscape) {
    	#mobileArenaLI{
    		width:20% !important;
  		}
    }
`;
const CommentCreationContainer=styled.div`
	position:relative;
	width:80px;
	height:7%;
	background-color:white;
	border-radius:10px;
	border-style:noe;
	box-shadow: 1px 1px 5px 	#9395a0;
`;


const ProfilePicture=styled.div`
	position:relative;
	width:45px;
	height:5%;
	background-color:black;
	border-radius:50%;
`;

const CommentTextArea=styled.textarea`
	position:relative;
	resize:none;
	border-style:none;
	height:5%;
	text-align:center;
	padding-top:10px;
	width:180%;
`;

const ArenaContainer=styled.div`
	border-color:white;
	border-style:solid;
	border-width:5px;
	animation: glowing 1300ms infinite;
	padding:5px;
	border-radius:50%;

	@keyframes glowing {
      0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
  	}
  	@media screen and (max-width:1370px){
  		display:none !important;
  	}
`;

const MobileArenaContainer=styled.div`
	border-color:white;
	border-style:solid;
	border-width:5px;
	animation: glowing 1300ms infinite;
	padding:5px;
	border-radius:50%;
	text-align:center;

	@keyframes glowing {
      0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
  	}

  	@media screen and (max-width:1370px){
  		display:none !important;
  	}
`;

const PostsContainer=styled.div`
	position:absolute;
	width:85%;
	height:70%;
	overflow:hidden;

	@media screen and (max-width:1370px){
		overflow:visible;
		#headerTitleLI{
			display:none !important;
		}
	}
`;

const Posts=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	margin-top:0%;

	@media screen and (max-width:1370px){
		margin-top:0%;		
	}

	@media screen and (max-width:450px){
		margin-top:60% !important;
	}

`;

const PostOptionButtonCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white"
}

const ArenaButtonCSS={
	listStyle:"none",
	display:"inline-block",
	borderRadius:"50%",
	padding:"10px",
	boxShadow: "1px 1px 30px #d5d5d5"
}

const MobileArenaButtonCSS={
	listStyle:"none",
	borderRadius:"50%",
	padding:"10px",
	boxShadow: "1px 1px 30px #d5d5d5",
	marginLeft:"25%"
}


class SearchExploreContainer extends Component{

	constructor(props){
		super(props);
	
		this.state={
			subCommunitiesDisplay:[],
			selectedIndustry:"",
			selectedSubCommunities:[],
			selectedIndustries:[],
			displayCreatePostComponent:false,
			displayPersonalPage:false,
			postOption:"Images",
			postsInformation:[],
			postCount:0,
			displayDesktopUI:false,
			isLoading:true,
			isLoadingReloadedPosts:false,
			endOfPostsDBIndicator:false,
			accessToken:this.props.personalInformation.accessToken
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

	componentDidMount(){
		//If user just gets to the page set industry to general and postType to images
		window.addEventListener('resize',this.triggerUIChange)
		
		this.changeHomePagePosts({postOption:this.state.postOption,isAccessTokenUpdated:false});
		this.triggerUIChange();
	}

	handleCheckBoxCheck=()=>{
		
		this.props.displayGrids(false);
	}

	alterSelectedIndustry=(selectedIndustries)=>{
		this.setState({
			selectedIndustries:selectedIndustries
		},function(){
			this.changeHomePagePosts({postOption:this.state.postOption,isAccessTokenUpdated:false});
		})
	}

	alterSelectedSubCommunities=(selectedSubCommunities)=>{
		this.setState({
			selectedSubCommunities:selectedSubCommunities
		},function(){
			this.changeHomePagePosts({
				postOption:this.state.postOption,
				isAccessTokenUpdated:false
			});
		})
	}

	changeHomePagePosts=async({postOption,isAccessTokenUpdated,updatedAccessToken})=>{
		var homePagePostsResponse;
		const isGuestProfile=this.props.personalInformation.isGuestProfile;
		var profileId=this.props.personalInformation.id;
		let isGuestProfileIndicator=false;
		debugger;
		if(profileId==0 || isGuestProfile){
			isGuestProfileIndicator=true;
		}
		const searchParameters={
			id:profileId,
			postCount:this.state.postCount,
			isGuestProfile:isGuestProfileIndicator,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
						this.state.accessToken
		}
		if(postOption=="Images"){
			homePagePostsResponse=await exploreImagePosts(searchParameters);
		}else if(postOption=="Blogs"){
			homePagePostsResponse=await exploreBlogPosts(searchParameters);
		}else if(postOption=="Videos"){
			homePagePostsResponse=await exploreVideoPosts(searchParameters);
		}else{
			homePagePostsResponse=await exploreRegularPosts(searchParameters);
		}
		var {confirmation,data}=homePagePostsResponse;
		if(confirmation=="Success"){
			const {message}=data;
			if(message.length==0){
				this.setState({
					endOfPostsDBIndicator:true,
					isLoadingReloadedPosts:false,
					isLoading:false,
					isGuestProfileIndicator
				})
			}else{
				let currentPosts=this.state.postsInformation;
				currentPosts=currentPosts.concat(message);
				this.setState({
					postsInformation:this.state.postCount==0?this.addSuggestedSymposiums(currentPosts):currentPosts,
					isLoading:false,
					isLoadingReloadedPosts:false,
					postOption:postOption,
					isGuestProfileIndicator
				})
			}

		}else{
			
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						this.props.personalInformation.refreshToken,
						this.props.personalInformation.id,
						this.changeHomePagePosts,
						this.props,
						{
							postOption
						},
						true
					);
			}else{
				alert('Unfortunately there has been an error in retrieving you data. Please try again');
			}
		}
	}


	addSuggestedSymposiums=(posts)=>{
		return this.suggestedSymposiumsRecursive(posts);
	}

	suggestedSymposiumsRecursive=(posts)=>{
		if(posts==null||posts.length==0){
			return posts;
		}else if(posts.length==1){
			return posts;
		}else{
			var randomNumber;
			if(posts.length<8){
				randomNumber=Math.floor(Math.random() * ((posts.length-1) - 1 + 1)) + 1;
			}else{
				randomNumber=Math.floor(Math.random() * (7 - 1 + 1)) + 1;
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

	handleChangePostOption=(props)=>{
		
		this.setState({
			postOption:props,	
			isLoading:true,
			postCount:0,
			postsInformation:[],
			endOfPostsDBIndicator:false
		},function(){
			
			this.changeHomePagePosts({postOption:props,isAccessTokenUpdated:false});
		})
	}

	displayArenaPage=()=>{
		this.props.history.push('/arena');
	}

	mobileHeaderUI=()=>{
		return  <div id="mobileHeaderLI" style={{listStyle:"none",marginBottom:"2%",marginTop:"30%"}}>
					<li id="mobileArenaLI" onClick={()=>alert('Arena coming soon... :)')} style={MobileArenaButtonCSS}>
						<MobileArenaContainer>
							<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trophy" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="#03A9F4" fill="none" stroke-linecap="round" stroke-linejoin="round">
							  <path stroke="none" d="M0 0h24v24H0z"/>
							  <line x1="8" y1="21" x2="16" y2="21" />
							  <line x1="12" y1="17" x2="12" y2="21" />
							  <line x1="7" y1="4" x2="17" y2="4" />
							  <path d="M17 4v8a5 5 0 0 1 -10 0v-8" />
							  <circle cx="5" cy="9" r="2" />
							  <circle cx="19" cy="9" r="2" />
							</svg>
						</MobileArenaContainer>
					</li>
					<li style={{listStyle:"none",width:"100%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",fontSize:"20px"}}>
								<b>Explore Symposiums</b>
							</li>
							<li style={{listStyle:"none"}}>
								Check out the posts that we think you might like here. 
							</li>
						</ul>
					</li>
				</div>
	}

	headerUI=()=>{
		return <li style={{listStyle:"none",marginBottom:"2%"}}>
					<li style={{listStyle:"none",display:"inline-block",width:"40%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",fontSize:"40px"}}>
								<b>Explore Symposiums</b>
							</li>
							<li id="exploreDescriptionLI" style={{listStyle:"none"}}>
								Check out the posts that we think you might like here. 
							</li>
						</ul>
					</li>
					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						<li onClick={()=>alert('Arena coming soon... :)')} style={ArenaButtonCSS}>
							<ArenaContainer>
								<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trophy" width="44" height="44" viewBox="0 0 24 24" stroke-width="2" stroke="#03A9F4" fill="none" stroke-linecap="round" stroke-linejoin="round">
								  <path stroke="none" d="M0 0h24v24H0z"/>
								  <line x1="8" y1="21" x2="16" y2="21" />
								  <line x1="12" y1="17" x2="12" y2="21" />
								  <line x1="7" y1="4" x2="17" y2="4" />
								  <path d="M17 4v8a5 5 0 0 1 -10 0v-8" />
								  <circle cx="5" cy="9" r="2" />
								  <circle cx="19" cy="9" r="2" />
								</svg>
							</ArenaContainer>
						</li>
					</a>
					<li style={{listStyle:"none",display:"inline-block",marginLeft:"10%",width:"40%"}}>
						<ul style={{padding:"0px"}}>
							<li id="headerTitleLI" style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"40px"}}>
								<b>{this.state.postOption}</b>
							</li>
							<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
								<div class="btn-group">
									<button class="btn btn-primary dropdown-toggle" type="button" 
										data-toggle="dropdown" style={PostOptionButtonCSS}>
										Post Options
										<span class="caret"></span>
									</button>
									<ul class="dropdown-menu">
										<li onClick={()=>this.handleChangePostOption("Images")}>
											<a href="javascript:;">Images</a>
										</li>	
										<li onClick={()=>this.handleChangePostOption("Videos")}>
											<a href="javascript:;">Videos</a>
										</li>	
										<li onClick={()=>this.handleChangePostOption("Blogs")}>
											<a href="javascript:;">Blogs</a>
										</li>	
										<li onClick={()=>this.handleChangePostOption("RegularPosts")}>
											<a href="javascript:;">Posts</a>
										</li>		
									</ul>
								</div>
							</li>
							{/*
								<li style={{listStyle:"none",display:"inline-block"}}>
									<div class="dropdown">
										<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={PostOptionButtonCSS}>
											Options
											<span class="caret"></span>
										</button>
										<ul class="dropdown-menu">
											<li><a href="javascript:;">Most Popular</a></li>
											<li><a href="javascript:;">Newest</a></li>
											<li><a href="javascript:;">Popular</a></li>						
										</ul>
									</div>
								</li>
							*/}
						</ul>
					</li>
				</li>
	}
	handleDisplayImages=(homePageInformation,searchPageInformation)=>{
		homePageInformation=homePageInformation==null?searchPageInformation:homePageInformation;
		return this.state.postOption=="Images"?
			<ImagePostsModal
				posts={this.state.postsInformation}
				_id={homePageInformation.personalInformationState._id}
				confettiAnimation={homePageInformation.displayRecruitConfetti}
				isPersonalProfile={homePageInformation.isPersonalProfile}
				displaySymposium={homePageInformation.displaySymposium}
				targetDom={"homePageContainer"}
				isMobileUI={this.state.displayDesktopUI==true?false:true}
				isLoadingReloadedPosts={this.state.isLoadingReloadedPosts}
				endOfPostsDBIndicator={this.state.endOfPostsDBIndicator}
				triggerReloadingPostsHandle={this.triggerReloadingPostsHandle}
				isGuestProfileIndicator={this.state.isGuestProfileIndicator}
			/>:
			<React.Fragment></React.Fragment>
	}

	handleDisplayVideos=(homePageInformation,searchPageInformation)=>{
		return this.state.postOption=="Videos"?
			<VideosPostsModal
				posts={this.state.postsInformation}
				_id={homePageInformation.personalInformationState._id}
				confettiAnimation={homePageInformation.displayRecruitConfetti}
				isPersonalProfile={homePageInformation.isPersonalProfile}
				displaySymposium={homePageInformation.displaySymposium}
				targetDom={"homePageContainer"}
				isMobileUI={this.state.displayDesktopUI==true?false:true}
				isLoadingReloadedPosts={this.state.isLoadingReloadedPosts}
				triggerReloadingPostsHandle={this.triggerReloadingPostsHandle}
				endOfPostsDBIndicator={this.state.endOfPostsDBIndicator}
				isGuestProfileIndicator={this.state.isGuestProfileIndicator}
			/>:
			<React.Fragment></React.Fragment>
	}
	handleDisplayBlogs=(homePageInformation,searchPageInformation)=>{
		return this.state.postOption=="Blogs"?
			<BlogsPostsModal
				posts={this.state.postsInformation}
				_id={homePageInformation.personalInformationState._id}
				confettiAnimation={homePageInformation.displayRecruitConfetti}
				isPersonalProfile={homePageInformation.isPersonalProfile}
				displaySymposium={homePageInformation.displaySymposium}
				targetDom={"homePageContainer"}
				isMobileUI={this.state.displayDesktopUI==true?false:true}
				isLoadingReloadedPosts={this.state.isLoadingReloadedPosts}
				triggerReloadingPostsHandle={this.triggerReloadingPostsHandle}
				endOfPostsDBIndicator={this.state.endOfPostsDBIndicator}
				isGuestProfileIndicator={this.state.isGuestProfileIndicator}
			/>:
			<React.Fragment></React.Fragment>
	}
	handleDisplayRegularPosts=(homePageInformation,searchPageInformation)=>{
		return this.state.postOption=="RegularPosts"?
			<RegularPostsModal
				posts={this.state.postsInformation}
				_id={homePageInformation.personalInformationState._id}
				confettiAnimation={homePageInformation.displayRecruitConfetti}
				isPersonalProfile={homePageInformation.isPersonalProfile}
				displaySymposium={homePageInformation.displaySymposium}
				targetDom={"homePageContainer"}
				isMobileUI={this.state.displayDesktopUI==true?false:true}
				isLoadingReloadedPosts={this.state.isLoadingReloadedPosts}
				triggerReloadingPostsHandle={this.triggerReloadingPostsHandle}
				endOfPostsDBIndicator={this.state.endOfPostsDBIndicator}
				isGuestProfileIndicator={this.state.isGuestProfileIndicator}
			/>:
			<React.Fragment></React.Fragment>
	}

	triggerReloadingPostsHandle=(props)=>{
		this.setState({
			triggerPostReload:true,
			isLoadingReloadedPosts:true,
			postCount:(this.state.postCount+1)
		},()=>{
			
			this.changeHomePagePosts({postOption:props,isAccessTokenUpdated:false});	
		})
	}

	render(){
		return(
			<HomeConsumer>
				{homePageInformation=>(
					<SearchConsumer>
						{searchPageInformation=>(
							<Container>
								<ul style={{padding:"0px",marginLeft:"10%",marginTop:"8%"}}>
									<li style={{listStyle:"none",marginBottom:"1%"}}>
										<ul style={{padding:"0px"}}>
											{this.state.displayDesktopUI==true?
												<>{this.headerUI()}</>:
												<>{this.mobileHeaderUI()}</>
											}
										</ul> 
									</li>
									{this.state.isLoading==true?
										<p>Loading...</p>:
										<li style={{listStyle:"none"}}>
											<PostsContainer>
												<ul style={{padding:"0px"}}>
													{this.state.displayDesktopUI==false &&(
														<React.Fragment>
															<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
																<div class="btn-group">
																	<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={PostOptionButtonCSS}>
																		Post Options
																		<span class="caret"></span>
																	</button>
																	<ul class="dropdown-menu">
																		<li onClick={()=>this.handleChangePostOption("Images")}>
																			<a href="javascript:;">Images</a>
																		</li>	
																		<li onClick={()=>this.handleChangePostOption("Videos")}>
																			<a href="javascript:;">Videos</a>
																		</li>	
																		<li onClick={()=>this.handleChangePostOption("Blogs")}>
																			<a href="javascript:;">Blogs</a>
																		</li>	
																		<li onClick={()=>this.handleChangePostOption("RegularPosts")}>
																			<a href="javascript:;">Posts</a>
																		</li>		
																	</ul>
																</div>
															</li>
															{/*
																<li style={{listStyle:"none",display:"inline-block"}}>
																	<div class="dropdown">
																		<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={PostOptionButtonCSS}>
																			Options
																			<span class="caret"></span>
																		</button>
																		<ul class="dropdown-menu">
																			<li><a href="javascript:;">Most Popular</a></li>
																			<li><a href="javascript:;">Newest</a></li>
																			<li><a href="javascript:;">Popular</a></li>						
																		</ul>
																	</div>
																</li>
															*/}
														</React.Fragment>
													)}
													<Posts>
														{this.handleDisplayImages(homePageInformation,searchPageInformation)}
														{this.handleDisplayVideos(homePageInformation,searchPageInformation)}
														{this.handleDisplayBlogs(homePageInformation,searchPageInformation)}
														{this.handleDisplayRegularPosts(homePageInformation,searchPageInformation)}	
													</Posts>
												</ul>
											</PostsContainer>
										</li>
									}
								</ul>
							</Container>
						)}
					</SearchConsumer>
				)}
			</HomeConsumer>
		)
	}
}

const mapStateToProps=(state)=>{
	return{
		personalInformation:state.personalInformation,
		companyInformation:state.companyInformation
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
)(SearchExploreContainer);



