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
	z-index:4;
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
		console.log(props);
		console.log("Teste");
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
			displayPromotePortal:false
		}
	}

	componentDidMount=()=>{
		debugger;
		var isOwner=false;
		if(this.state.isPersonalProfile)
			isOwner=(this.props.personalInformation.id==this.props.match.params.id)?true:false;
		else
			isOwner=(this.props.companyInformation.id==this.props.match.params.id)?true:false;

		let blogContentState;
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
		this.setState({
			displayEditButtonSubmitModal:!this.state.displayEditButtonSubmitModal
		})
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
					{this.pollModal()}
					{this.displayApproveDisapproveModal()}
					<GeneralNavBar/>
					<AdditionalInformation
						blogData={this.props.location.state}
					/>
					<TextOptions
						displayEditBlogSubmitModal={this.displayOrHideSubmitModal}
						blogState={this.state.blogState}
						postType={this.props.location.state.postType}
						displayCommentSection={this.displayCommentSection}
						displayApproveDisapproveModalHandle={this.displayApproveDisapproveModalHandle}
						triggerPromoteModal={this.triggerPromoteModal}
						postId={this.props.location.state._id}
						history={this.props.history}
				/>
				<Blog/>

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

				</Container>
			</BlogProvider>
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
	)(BlogPostCreation);
