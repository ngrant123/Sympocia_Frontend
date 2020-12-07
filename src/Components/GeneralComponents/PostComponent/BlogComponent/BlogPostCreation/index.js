import React,{Component} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {
	BlogConsumer,
	BlogProvider
} from "./BlogContext.js";
import {GeneralNavBar} from "../../../NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import AdditionalInformation from "./AdditionalInformation.js";
import TextOptions from "./TextOptions.js";
import Blog from "./Blog.js";
import BlogEditSubmitModal from "./BlogEditSubmitModal.js";
import { convertFromRaw,EditorState } from 'draft-js';
import Comments from "../../../CommentsComponent/index.js";
import PollOptionPortal from "../../PollOptionPortal.js";
import PromotePortal from "../../../../Profile/PersonalProfile/PersonalProfileSubset/PersonalPosts/PromotePortal.js";

const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	background-color:#FFFFFF;
`;

const ShadowContainer = styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;
	z-index:35;
`;

const CommentContainer=styled.div`
	position:absolute;
	width:40%;
	height:40%;
	overflow-y:scroll;
	background-color:white;
	top:54%;
	left:55%;
	padding:20px;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	z-index:6;

	@media screen and (max-width:600px){
		width:90% !important;
		left:5% !important;
	}
`;

const ApproveDisapproveContainer=styled.div`
	position:fixed;
	background-color:white;
	width:30%;
	height:10%;
	border-radius:5px;
	left:15%;
	top:20%;
	height:25%;
	z-index:4;
	z-index:6;
	overflow:scroll;

	@media screen and (max-width:600px){
		width:90% !important;
		left:5% !important;
	}

`;

const authenticPostButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"2%"
}


class BlogPostCreation extends Component{
	constructor(props){
		super(props);
		var isPersonalProfile;
		if(this.props.location.state.profileType=="Company")
			isPersonalProfile=false;
		else
			isPersonalProfile=true;
		this.state={
			userInformation:{},
			displayEditButtonSubmitModal:false,
			blog:"",
			isPersonalProfile:isPersonalProfile,
			blogState:"",
			displayComments:false,
			displayPollModal:false,
			pollModal:false,
			displayApproveDisapproveIndicator:false,
			approvesPostNumber:this.props.location.state.isPostAuthentic!=null?
								   this.props.location.state.isPostAuthentic.numOfApprove.length:0,
			disapprovesPostNumber:this.props.location.state.isPostAuthentic!=null?
									  this.props.location.state.isPostAuthentic.numOfDisapprove.length:0,
			displayApproveModal:false,
			displayPromotePortal:false,
			displayDesktopUI:false,
			displayBlogCreationScreen:true
		}
	}


	triggerUIChange=()=>{
		if(window.innerWidth<1300){
			this.setState({
				displayDesktopUI:false
			})
			return true;
		}else{
			this.setState({
				displayDesktopUI:true
			})
			return false;
		}
	}
/*
	As of this moment creating a blog on the mobile is not available because ui for 
	react wysiwyg is booty cheeks so going to temporarily disable it for mobile
*/

	componentDidMount=()=>{
		window.addEventListener('resize',this.triggerUIChange);
		const verification=this.props.isLoggedIn;
		if(verification==false){
			this.props.history.push({
				pathname:'/'
			})
		}else{
			const isMobile=this.triggerUIChange();
			var isOwner=false;
			if(this.state.isPersonalProfile)
				isOwner=(this.props.personalInformation.id==this.props.match.params.id)?true:false;
			else
				isOwner=(this.props.companyInformation.id==this.props.match.params.id)?true:false;

			let blogContentState;
			if(this.props.location.state.postType=="Creation" && isMobile==true){
				alert('Unfortunately this isnt supported for you mobile device. Please switch to desktop to continue');
				this.setState({
					displayBlogCreationScreen:false
				})
			}else{
				if(this.props.location.state.postType=="Creation"){
					blogContentState="";
				}else{
					var DBEditorState = convertFromRaw(JSON.parse(this.props.location.state.blog));
					blogContentState=EditorState.createWithContent(DBEditorState);
				}
				this.setState({
					userInformation:this.props.personalInformation,
					isOwner:isOwner,
					blogContent:blogContentState,
					blogState:this.props.location.state,
					isInEditMode:this.props.location.state.postType=="Creation"?false:true
				})
				this.triggerUIChange();
			}
		}
	}

	editBlogSubmitModal=()=>{
		return this.state.displayEditButtonSubmitModal==false?<React.Fragment></React.Fragment>:
			<React.Fragment>
				<ShadowContainer onClick={()=>this.setState({displayEditButtonSubmitModal:false})}/>
				<BlogEditSubmitModal
					routerHistory={this.props.history}
					previousState={this.state.isInEditMode==true?this.props.location.state:null}
				/>
			</React.Fragment>
	}

	displayOrHideSubmitModal=()=>{
		console.log(this.state.displayDesktopUI);
		console.log(this.props.location.state.postType);
		if(this.state.displayDesktopUI==false){
			alert('Unfortunately this isnt supported for you mobile device. Please switch to desktop to continue');
		}else{
			console.log(this.state.blog);
			if(this.state.blog!="" || this.props.location.state.postType!="Creation"){
				this.setState({
					displayEditButtonSubmitModal:!this.state.displayEditButtonSubmitModal
				})
			}else{
				alert('Please enter a blog first')
			}
		}
	}

	displayCommentSection=()=>{
		this.setState({
			displayComments:true
		})
	}

	displayApproveDisapproveModalHandle=()=>{
		this.setState({
			displayApproveDisapproveIndicator:true
		})
	}

	hideComments=()=>{
		this.setState({
			displayComments:false
		})
	}

	closeModal=()=>{
		this.setState({
			displayPollModal:false
		})
	}

	displayApproveDisapproveModal=()=>{
		return <React.Fragment>
					{this.state.displayApproveDisapproveIndicator && (
						<>
							<ShadowContainer
								onClick={()=>this.setState({displayApproveDisapproveIndicator:false})}
							/>
							<ApproveDisapproveContainer>
								<ul style={{padding:"20px"}}>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>this.setState({
															displayApproveModal:true,
															displayPollModal:true
														})} style={authenticPostButtonCSS}>

											<p style={{color:"#01DF01"}}>{this.state.approvesPostNumber}</p> 
												approves post

										</li>
									</a>

									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>this.setState({
															displayApproveModal:false,
															displayPollModal:true
														})} style={authenticPostButtonCSS}>

												<p style={{color:"#FE2E2E"}}>{this.state.disapprovesPostNumber}</p> 
												disapproves post
										</li>
									</a>
								</ul>
							</ApproveDisapproveContainer>
						</>
					)}
			   </React.Fragment>
	}

	pollModal=()=>{
		return <React.Fragment>
					{this.state.displayPollModal && (
						<PollOptionPortal
							closeModal={this.closeModal}
							displayApproveModal={this.state.displayApproveModal}
							postId={this.props.location.state._id}
							postType="Blogs"
							targetDom={"blogPostContainer"}
						/>
					)}
				</React.Fragment>
		
	}
	closePromotePortal=()=>{
		this.setState({
			displayPromotePortal:false
		})
	}
	promotePortal=()=>{
		return <>
					{this.state.displayPromotePortal && (
						<PromotePortal
							closePromotePortal={this.closePromotePortal}
							nodes={this.props.location.state.friendsNodes}
							postId={this.props.location.state._id}
							postType={"Blogs"}
							targetDom={"blogPostContainer"}
						/>
					)}
			    </>
	}
	triggerPromoteModal=()=>{
		this.setState({
			displayPromotePortal:true
		})
	}


	render(){
		return(
			<BlogProvider value={{
				blog:this.state.blogContent,
				isOwner:this.state.isOwner,
				personInformation:this.state.userInformation,
				blogPostState:this.state.blog,
				updateBlogPost:(blogPost)=>{
					this.setState({
						blog:blogPost
					})
				}
			}}>
			<Container id="blogPostContainer">
				<GeneralNavBar
					page={"Blog"}
					routerHistory={this.props.history}
					targetDom={"blogPostContainer"}
				/>
				{this.state.displayBlogCreationScreen==true?
					<>
						{this.pollModal()}
						{this.displayApproveDisapproveModal()}
						<AdditionalInformation
							blogData={this.props.location.state}
							postType={this.props.location.state.postType}
						/>
						<TextOptions
							displayEditBlogSubmitModal={this.displayOrHideSubmitModal}
							blogState={this.state.blogState}
							postType={this.props.location.state.postType}
							displayCommentSection={this.displayCommentSection}
							displayApproveDisapproveModalHandle={this.displayApproveDisapproveModalHandle}
							triggerPromoteModal={this.triggerPromoteModal}
							postId={this.props.location.state._id}
							industriesUploaded={this.props.location.state.industriesUploaded}
							history={this.props.history}
							isOwner={this.state.isOwner}
							isDesktop={this.state.displayDesktopUI}
							profileId={this.props.personalInformation.id}
						/>
						<Blog
							isDesktop={this.state.displayDesktopUI}
						/>
						{this.editBlogSubmitModal()}
						{this.promotePortal()}
						{this.state.displayComments && (
							<CommentContainer>
								<Comments
									postId={this.props.location.state._id}
									postType={"Blog"}
									hideComments={this.hideComments}
									targetDom={"blogPostContainer"}
								/>

							</CommentContainer>
						)}
					</>
					:<p style={{marginTop:"40%"}}> Unfortunately this isnt supported for you mobile device. Please switch to desktop to continue</p>
				}
				</Container>
			</BlogProvider>
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


export default connect(
		mapStateToProps,
		null
	)(BlogPostCreation);
