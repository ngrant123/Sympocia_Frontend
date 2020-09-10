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

const ArenaButtonCSS={
	listStyle:"none",
	display:"inline-block",
	borderRadius:"50%",
	padding:"10px",
	boxShadow: "1px 1px 30px #d5d5d5"
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
			postCount:0
		}
	}

	componentDidMount(){
		//If user just gets to the page set industry to general and postType to images
		debugger;
		this.changeHomePagePosts(this.state.postOption);
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
		debugger;
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
		debugger;
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
		debugger;
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
		debugger;
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
		debugger;
		this.setState({
			postOption:props
		},function(){
			this.changeHomePagePosts(this.state.postOption);
		})
	}

	displayArenaPage=()=>{
		this.props.history.push('/arena');
	}

	render(){
		return(
			<React.Fragment>

				<ul style={{padding:"0px",marginLeft:"10%",marginTop:"8%"}}>
					<li style={{listStyle:"none",marginBottom:"1%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",marginBottom:"2%"}}>
							 
								<li style={{listStyle:"none",display:"inline-block",width:"40%"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",fontSize:"40px"}}>
											<b>Explore Symposiums</b>
										</li>
										<li style={{listStyle:"none"}}>
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
								{/*
										<li style={{position:"relative",top:"-10px",listStyle:"none",display:"inline-block"}}>
									Checkout a more generalized view of the communities you arent following by clicking here
									<Checkbox
										style={{fontSize:20,color:"#5298F8"}}
										onChange={()=>this.handleCheckBoxCheck()}
									/>
								</li>
								*/}
							</li>
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
			</React.Fragment>
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



