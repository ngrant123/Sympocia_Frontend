import React,{Component} from "react";
import styled from "styled-components";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import Checkbox from '@material-ui/core/Checkbox';
import SearchExplorePosts from "../SearchExploreSubset/index.js";
import CreatePostComponent from "../../../../GeneralComponents/PostComponent/LargePostComponent/LargePostComponent.js";
import IndustryOptions from "../../../../GeneralComponents/PostComponent/IndustryPostOptions.js"
import {connect} from "react-redux";
import {getPostsForHomePage} from "./../../../../../Actions/Requests/HomePageAxiosRequests/HomePageGetRequests.js";
import PersonalHomeFeed from "../../PersonalHomeFeed/PersonalizedPage/PersonalizedPage.js";

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
			postOption:"Images",
			postsInformation:[]
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
		if(this.props.personalInformation.loggedIn==true){
				const homePagePosts=await getPostsForHomePage(this.props.personalInformation.id,searchCriteriaIndustryArray,postOption);
				console.log(homePagePosts);
				this.setState({
					postsInformation:homePagePosts
				})
			}else{

				const homePagePosts=await getPostsForHomePage(this.props.companyInformation.id,searchCriteriaIndustryArray,postOption);
				this.setState({
					postsInformation:homePagePosts
				})
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

	render(){
		return(
			<React.Fragment>
				<ul style={{padding:"0px",marginLeft:"10%",marginTop:"8%"}}>
					<li style={{listStyle:"none",marginBottom:"1%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",marginBottom:"2%"}}>
								<ul onClick={()=>this.setState({displayCreatePostComponent:!this.state.displayCreatePostComponent})}style={{padding:"0px"}}>
												<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginRight:"2%",color:"#C8B0F4"}}>
													<b>Create a post</b>
												</li>

												<li style={{listStyle:"none",display:"inline-block",width:"30%",boxShadow:"1px 1px 5px #848484",borderRadius:"5px"}}>
													<ul style={{padding:"10px"}}>
														<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
															<ProfilePicture>
															</ProfilePicture>
														</li>
														<li style={{listStyle:"none",display:"inline-block"}}>
															<CommentTextArea placeholder="Start typing here to create a post"/>
														</li>


													</ul>
												</li>

												<li style={{marginLeft:"5%",listStyle:"none",display:"inline-block"}}>
													<ul style={{padding:"0px"}}>
														<li style={{listStyle:"none",fontSize:"40px"}}>
															<b>Explore Communities</b>
														</li>
														<li style={{listStyle:"none"}}>
															Check out the posts that we think you might like here. 
														</li>
													</ul>
													
												</li>
								</ul>
							</li>
							{this.state.displayCreatePostComponent==true?
								<li style={{listStyle:"none",width:"70%",marginLeft:"20%",marginTop:"3%",marginBottom:"2%"}}>
									<CreatePostComponent/>
								</li>:
								<React.Fragment>
								</React.Fragment>
							}
							<li style={{listStyle:"none",display:"inline-block"}}>
								<IndustryOptions
									alterSelectedIndustry={this.alterSelectedIndustry}
									alterSelectedSubCommunities={this.alterSelectedSubCommunities}
								/>
							</li>

							<li style={{listStyle:"none",display:"inline-block",marginLeft:"45%"}}>
								Checkout a more generalized view of the communities you arent following by clicking here
								<Checkbox
									style={{fontSize:20,color:"#5298F8"}}
									onChange={()=>this.handleCheckBoxCheck()}
								/>
							</li>
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



