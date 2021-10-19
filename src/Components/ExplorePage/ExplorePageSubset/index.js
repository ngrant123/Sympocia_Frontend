import React,{Component} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import {HomeConsumer} from "../HomeContext.js";
import {SearchConsumer} from "../../SearchPage/SearchContext.js";
import SuggestedSymposiums from "./ConstructSuggestedSymposium.js";
import {explorePagePosts} from "../../../Actions/Requests/ExplorePageRequests/ExplorePageRetrieval.js";
import {refreshTokenApiCallHandle} from "../../../Actions/Tasks/index.js";
import {
	setPersonalProfileAccessToken,
	setPersonalProfileRefreshToken
} from "../../../Actions/Redux/Actions/PersonalProfile.js"; 
import PostsMemo from "./PostsMemo.js";
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {
	searchSymposiumsFilter,
	initializeSymposiums
} from "../../../Actions/Tasks/Search/SearchSymposiums.js";
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import EditExplorePageDisplay from "../ExplorePageSet/Modals-Portals/EditExploreFeed/index.js";

const Container=styled.div`
	display:flex;
	flex-direction:column;
	margin-top:7%;
	padding:10px;
	@media screen and (max-width:1370px){
		margin-left:0%;
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
		#explorePageHeader{
			flex-direction:column !important;
		}
		#mobileHeaderLI{
  			margin-top:30% !important;
  		}
		#exploreDescriptionLI{
			display:none !important;
		}
		#mobileArenaLI{
    		width:28% !important;
			margin-left:27% !important;
    	}
    	#mobileIntroductionText{
    		display:block !important;
    	}
    	#filterByText{
    		display:none !important;
    	}
    	#symposiumFilterOption{
    		margin-left:2% !important;
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
	height:70%;
	width:100%;

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

const ExplorePageOptionsCSS={
	borderColor:"#D0D0D0",
	borderStyle:"solid",
	borderWidth:"1px",
	borderRadius:"5px",
	padding:"10px",
	display:"flex",
	flexDirection:"row",
	justifyContent:"center",
	alignItems:"center",
	cursor:"pointer",
	backgroundColor:"white",
	color:"#000000"
}

const VerticalLineCSS={
	position:"relative",
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"50px",
 	marginLeft:"3%"
}
const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0"
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
			accessToken:this.props.personalInformation.accessToken,
			postSessionManagmentToken:this.uuidv4(),
			displayEditExplorePageOption:false
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

	uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	changeHomePagePosts=async({postOption,isAccessTokenUpdated,updatedAccessToken})=>{
		var homePagePostsResponse;
		const isGuestProfile=this.props.personalInformation.isGuestProfile;
		var profileId=this.props.personalInformation.id;
		let isGuestProfileIndicator=false;
		if(profileId==0 || isGuestProfile){
			isGuestProfileIndicator=true;
		}
		const searchParameters={
			id:profileId,
			postCount:this.state.postCount,
			requestedPostType:postOption,
			postSessionManagmentToken:this.state.postSessionManagmentToken,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
						this.state.accessToken
		}
		var {confirmation,data}=await explorePagePosts(searchParameters);
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
				debugger;
				let currentPosts=this.state.postsInformation;
				currentPosts=currentPosts.concat(message);
				this.setState({
					postsInformation:currentPosts,
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

	handleChangePostOption=(props)=>{
		
		this.setState({
			postOption:props,	
			isLoading:true,
			postCount:0,
			postsInformation:[],
			endOfPostsDBIndicator:false,
			postSessionManagmentToken:this.uuidv4()
		},function(){
			
			this.changeHomePagePosts({postOption:props,isAccessTokenUpdated:false});
		})
	}

	displayArenaPage=()=>{
		this.props.history.push('/arena');
	}

	retrievedCurrentDisplayedPosts=()=>{
		return this.state.postsInformation;
	}

	selectedPostSymposiums=()=>{
		const postSelectedSymposiums=initializeSymposiums(
										this.retrievedCurrentDisplayedPosts
									);
		return (
			<ul class="dropdown-menu">
				<li style={{cursor:"pointer"}} 
					onClick={()=>this.triggerPostDecider(this.state.postOption)}>
					<a>Clear Filter</a>
				</li>
				<hr/>
				{postSelectedSymposiums.map(data=>
					<li style={{cursor:"pointer"}}>
						<a onClick={()=>this.triggerSymposiumsPostFilters(data)}>{data}</a>
					</li>
				)}
			</ul>
		)
	}

	triggerPostDecider=(postType)=>{
		this.setState(prevState=>({
			...prevState,
			postCount:0
		}),function(){
			this.handleChangePostOption(postType)
		})
	}

	triggerSymposiumsPostFilters=(filteredInput)=>{
		let displayedPosts=this.retrievedCurrentDisplayedPosts();
		this.setState(prevState=>({
			isLoadingReloadedPosts:true
		}),function(){
			const filteredPosts=searchSymposiumsFilter(filteredInput,displayedPosts);
			this.setState(prevState=>({
				...prevState,
				isLoadingReloadedPosts:false,
				postsInformation:filteredPosts
			}))
		})
	}

	postOptionDropDown=()=>{
		return(
			<React.Fragment>
				<li style={{cursor:"pointer"}}
					onClick={()=>this.handleChangePostOption("Images")}>
					Images
				</li>
				<hr/>	
				<li style={{cursor:"pointer"}}
					onClick={()=>this.handleChangePostOption("Videos")}>
					Videos
				</li>	
				<hr/>
				<li style={{cursor:"pointer"}}
					onClick={()=>this.handleChangePostOption("Blogs")}>
					Blogs
				</li>	
				<hr/>
				<li style={{cursor:"pointer"}}
					onClick={()=>this.handleChangePostOption("RegularPosts")}>
					Text
				</li>	
			</React.Fragment>
		)
	}

	headerUI=()=>{
		return(
			<div style={{display:"flex",flexDirection:"column"}}>
				<SuggestedSymposiums
					userId={this.props.personalInformation.id}
				/>
				<hr style={HorizontalLineCSS}/>
				<div id="explorePageHeader" style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
					<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
						<p style={{fontSize:"24px",marginRight:"2%",color:"#C8B0F4"}}>
							<b>Explore</b>
						</p>
						<FolderOpenIcon
							onClick={()=>this.setState({displayEditExplorePageOption:true})}
							style={{fontSize:"30",cursor:"pointer"}}
						/>
					</div>
					<p id="mobileIntroductionText" style={{display:"none"}}>
						Check out the posts that we think you might like here.
					</p>

					<div style={{display:"flex",flexDirection:"row"}}>
						<div class="btn-group">
							<button class="btn btn-primary dropdown-toggle" type="button" 
								data-toggle="dropdown" style={ExplorePageOptionsCSS}>
								{this.state.postOption}
								<ArrowDropDownCircleOutlinedIcon
									style={{fontSize:"15",color:"7C7C7C",marginLeft:"10px"}}
								/>
							</button>
							<ul class="dropdown-menu" style={{padding:"10px"}}>
								{this.postOptionDropDown()}	
							</ul>
						</div>
						<div id="symposiumFilterOption" style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
							<p id="filterByText" style={{marginRight:"10px",marginLeft:"30px"}}>
								<b>Filter By:</b>
							</p>
							<div class="btn-group">
								<button class="btn btn-primary dropdown-toggle" type="button" 
									data-toggle="dropdown" style={ExplorePageOptionsCSS}>
									Symposiums
									<ArrowDropDownCircleOutlinedIcon
										style={{fontSize:"15",color:"7C7C7C"}}
									/>
								</button>
								{this.selectedPostSymposiums()}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
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

	closeExplorePageModal=()=>{
		this.setState({
			displayEditExplorePageOption:false
		})
	}

	editExplorePage=()=>{
		return(
			<React.Fragment>
				{this.state.displayEditExplorePageOption==true &&(
					<EditExplorePageDisplay
						closeModal={this.closeExplorePageModal}
					/>
				)}
			</React.Fragment>
		)
	}

	render(){
		return(
			<HomeConsumer>
				{homePageInformation=>(
					<SearchConsumer>
						{searchPageInformation=>(
							<Container>
								{this.headerUI()}
								{this.editExplorePage()}
								{this.state.isLoading==true?
									<p>Loading...</p>:
									<li style={{listStyle:"none",marginTop:"2%"}}>
										<PostsContainer>
											<PostsMemo
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
												postType={this.state.postOption}
											/>
										</PostsContainer>
									</li>
								}
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



