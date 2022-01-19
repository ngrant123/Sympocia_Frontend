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
import PromotePortal from "../../../../Profile/PersonalProfile/PersonalProfileSet/Modals-Portals/PromotePortal.js";
import {getVideoUrl} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageGetRequests.js";


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
	z-index:41;
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
	width:50%;
	height:70%;
	border-radius:5px;
	left:25%;
	top:15%;
	z-index:51;
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
		var isPersonalProfile=true;

		console.log(props);
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
			approvesPostNumber:0,
			disapprovesPostNumber:0,
			displayApproveModal:false,
			displayPromotePortal:false,
			displayDesktopUI:false,
			displayBlogCreationScreen:true,
			isLoading:true,
			blogContent:""
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

	componentDidMount=async()=>{
		
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
			console.log(this.props.location.state);
			if(this.props.location.state.postType=="Creation" && isMobile==true){
				alert('Unfortunately this isnt supported for you mobile device. Please switch to desktop to continue');
				this.setState({
					displayBlogCreationScreen:false
				})
			}else{
				if(this.props.location.state.postType=="Creation"){
					blogContentState="";
				}else{
					if(this.props.location.state.videoDescriptionKey!=null){
						const {confirmation,data}=await getVideoUrl(
															this.props.location.state.videoDescriptionKey
														);

						if(confirmation=="Success"){
							const videoDescriptionUrl=data.message;
							this.props.location.state.videoDescription=videoDescriptionUrl;
						}
					}
					var DBEditorState = convertFromRaw(JSON.parse(this.props.location.state.blog));
					blogContentState=EditorState.createWithContent(DBEditorState);
				}
				this.setState({
					userInformation:this.props.personalInformation,
					isOwner:isOwner,
					blogContent:blogContentState,
					blogState:this.props.location.state,
					isInEditMode:this.props.location.state.postType=="Creation"?false:true,
					isLoading:false
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
		if(this.state.displayDesktopUI==false){
			alert('Unfortunately this isnt supported for you mobile device. Please switch to desktop to continue');
		}else{
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

	triggerDisplayUnApproveModal=()=>{
		this.setState({
			displayApproveModal:false,
			displayPollModal:true
		})
	}



	triggerDisplayApproveModal=()=>{
		this.setState({
			displayApproveModal:true,
			displayPollModal:true
		})
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
							postOwnerId={this.props.location.state.owner}
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
						{this.state.isLoading==true?
							<p>Please wait </p>:
							<>
								{this.pollModal()}
								<AdditionalInformation
									postType={this.props.location.state.postType}
									profileId={this.props.personalInformation.id}
									displayEditBlogSubmitModal={this.displayOrHideSubmitModal}
									blogState={this.state.blogState}
									postType={this.props.location.state.postType}
									displayCommentSection={this.displayCommentSection}
									displayApproveDisapproveModalHandle={this.displayApproveDisapproveModalHandle}
									history={this.props.history}
									isDesktop={this.state.displayDesktopUI}
									profileId={this.props.personalInformation.id}
									postId={this.props.location.state._id}
									triggerPromoteModal={this.triggerPromoteModal}
									targetDom={"blogPostContainer"}
									ownerId={this.props.location.state.owner}
									selectedCommentPools={{
										regularCommentPool:this.props.location.state.regularCommentPool,
										videoCommentPool:this.props.location.state.videoCommentPool
									}}
									triggerDisplayUnApproveModal={this.triggerDisplayUnApproveModal}
									triggerDisplayApproveModal={this.triggerDisplayApproveModal}
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
									isDesktop={this.state.displayDesktopUI}
									profileId={this.props.personalInformation.id}
									isInEditMode={this.state.isInEditMode}
								/>
								<Blog
									isDesktop={this.state.displayDesktopUI}
									blog={this.state.blogContent}
								/>
								{this.editBlogSubmitModal()}
								{this.promotePortal()}
							</>
						}
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
