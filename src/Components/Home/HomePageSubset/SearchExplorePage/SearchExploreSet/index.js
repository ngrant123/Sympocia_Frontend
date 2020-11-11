import React,{Component} from "react";
import styled from "styled-components";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import Checkbox from '@material-ui/core/Checkbox';
import SearchExplorePosts from "../SearchExploreSubset/index.js";
import CreatePostComponent from "../../../../GeneralComponents/PostComponent/LargePostComponent/LargePostComponent.js";
import IndustryOptions from "../../../../GeneralComponents/PostComponent/IndustryPostOptions.js"
import {connect} from "react-redux";


import {
		getPostsForHomePage,
		exploreImagePosts,
		exploreVideoPosts,
		exploreBlogPosts,
		exploreRegularPosts
	} from "./../../../../../Actions/Requests/HomePageAxiosRequests/HomePageGetRequests.js";

const Container=styled.div`

	@media screen and (max-width:1370px) and (max-height:1030px){
    	#mobileArenaLI{
    		width:10% !important;
			margin-left:40% !important;
    	}
    }
	
   
	@media screen and (max-width:1030px){
		#exploreDescriptionLI{
			display:none !important;
		}
		#mobileArenaLI{
    		width:15% !important;
			margin-left:35% !important;
    	}
	}

	@media screen and (max-width:460px){
		#exploreDescriptionLI{
			display:none !important;
		}
		#mobileArenaLI{
    		width:35% !important;
			margin-left:27% !important;
    	}
	}
	@media screen and (max-width:740px) and (max-height:420px) and (orientation: landscape) {
    	#mobileArenaLI{
    		width:20% !important;
			margin-left:35% !important;
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

`;

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
	width:"30%",
	marginLeft:"25%"
}


class SearchExploreContainer extends Component{

	constructor(props){
		super(props);
		console.log("Search Explore");
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
			displayDesktopUI:false
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
		
		this.changeHomePagePosts(this.state.postOption);
		this.triggerUIChange();
	}

	handleCheckBoxCheck=()=>{
		console.log("Testing");
		this.props.displayGrids(false);
	}

	alterSelectedIndustry=(selectedIndustries)=>{
		this.setState({
			selectedIndustries:selectedIndustries
		},function(){
			this.changeHomePagePosts(this.state.postOption);
		})
	}

	alterSelectedSubCommunities=(selectedSubCommunities)=>{
		this.setState({
			selectedSubCommunities:selectedSubCommunities
		},function(){
			this.changeHomePagePosts(this.state.postOption);
		})
	}

	changeHomePagePosts=async(postOption)=>{
		
		var homePagePostsResponse;
		var profileId=(this.props.personalInformation.loggedIn==true)?this.props.personalInformation.id:this.props.companyInformation.id;

		if(postOption=="Images"){
			homePagePostsResponse=await exploreImagePosts(profileId,this.state.postCount);
		}else if(postOption=="Blogs"){
			homePagePostsResponse=await exploreBlogPosts(profileId,this.state.postCount);
		}else if(postOption=="Videos"){
			homePagePostsResponse=await exploreVideoPosts(profileId,this.state.postCount);
		}else{
			homePagePostsResponse=await exploreRegularPosts(profileId,this.state.postCount);
		}
		var {confirmation,data}=homePagePostsResponse;
		if(confirmation=="Success"){
			var newHomePagePosts=this.addSuggestedSymposiums(data);
			this.setState({
				postsInformation:newHomePagePosts
			})

		}else{
			alert('Unfortunately there has been an error in retrieving you data. Please try again');
		}
	}


	/*
	changeHomePagePosts=async(postOption)=>{
		
		const industries=this.state.selectedIndustries;
		const selectedSubCommunities=this.state.selectedSubCommunities;
		const searchCriteriaIndustryArray=[];
		//this could be done in a better way but... niggas is on a time crunch and stressed soooooo.....
		var counter=0;
		for(var i=0;i<industries.length;i++){
			var {subCommunity}=industries[i];
			var addIndustryOrIndustryObject=false;
			var subCommunitiyArray=[];
			var subCommunityCounter=0;
			if(subCommunity!=null){
				while(subCommunityCounter<subCommunity.length){
					const targetedSubCommunity=subCommunity[subCommunityCounter];
					if(targetedSubCommunity.industry==selectedSubCommunities[counter]){
						subCommunitiyArray.push(selectedSubCommunities[counter]);
						counter++;
						subCommunityCounter=0;
					}else{
						subCommunityCounter++;
					}
				}
			}
			const searchObject={
						industry:industries[i].industry,
						subIndustry:subCommunitiyArray
			}
				searchCriteriaIndustryArray.push(searchObject);
		}
		
		var homePagePosts;
		if(this.props.personalInformation.loggedIn==true){
				homePagePosts=await getPostsForHomePage(this.props.personalInformation.id,searchCriteriaIndustryArray,postOption);
			}else{
				homePagePosts=await getPostsForHomePage(this.props.companyInformation.id,searchCriteriaIndustryArray,postOption);
			}

			var newHomePagePosts=this.addSuggestedSymposiums(homePagePosts);
			this.setState({
					postsInformation:newHomePagePosts
				})
		}
	*/


	addSuggestedSymposiums=(posts)=>{
		return this.suggestedSymposiumsRecursive(posts);
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

	handleChangePostOption=(props)=>{
		
		this.setState({
			postOption:props
		},function(){
			this.changeHomePagePosts(this.state.postOption);
		})
	}

	displayArenaPage=()=>{
		this.props.history.push('/arena');
	}

	mobileHeaderUI=()=>{
		return  <li style={{listStyle:"none",marginBottom:"2%",marginTop:"30%"}}>
					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						<li id="mobileArenaLI" onClick={()=>this.displayArenaPage()} style={MobileArenaButtonCSS}>
							<MobileArenaContainer>
								<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trophy" width="44" height="44" viewBox="0 0 24 24" stroke-width="2" stroke="#03A9F4" fill="none" stroke-linecap="round" stroke-linejoin="round">
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
					</a>
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
				</li>
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
						<li onClick={()=>this.displayArenaPage()} style={ArenaButtonCSS}>
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
				</li>
	}

	render(){
		return(
			<Container>

				<ul style={{padding:"0px",marginLeft:"10%",marginTop:"8%"}}>
					<li style={{listStyle:"none",marginBottom:"1%"}}>
						<ul style={{padding:"0px"}}>
							{this.state.displayDesktopUI==true?
								<>{this.headerUI()}</>
								:
								<>{this.mobileHeaderUI()}</>}
						{/*
								<li style={{listStyle:"none",display:"inline-block"}}>
									<IndustryOptions
										alterSelectedIndustry={this.alterSelectedIndustry}
										alterSelectedSubCommunities={this.alterSelectedSubCommunities}
									/>
								</li>
						*/}
						</ul> 
					</li>

					<li style={{listStyle:"none"}}>
						<SearchExplorePosts
							changePostOption={this.handleChangePostOption}
							posts={this.state.postsInformation}
						/>
					</li>
				</ul>
			</Container>
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
)(SearchExploreContainer);



