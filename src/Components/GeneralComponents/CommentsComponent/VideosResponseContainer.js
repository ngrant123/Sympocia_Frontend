import React,{Component} from "react";
import styled from "styled-components";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import CommentsContainer from "./CommentContainer.js";
import {getVideoComments,
		getVideoCommentsReplies
	} from "../../../Actions/Requests/PostAxiosRequests/PostPageGetRequests.js";

import {
		createVideoResponse,
		createVideoCommentReply,
		deleteVideoCommentOrReply
	} from "../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import VideoDescriptionPortal from "../PostComponent/VideoDescription/VideoDescriptionPortal.js";
import {connect} from "react-redux";
import NoProfilePicture from "../../../designs/img/NoProfilePicture.png";
import {refreshTokenApiCallHandle} from "../../../Actions/Tasks/index.js";
import {Link} from "react-router-dom";
import {
		setPersonalProfileAccessToken,
		setPersonalProfileRefreshToken
	} from "../../../Actions/Redux/Actions/PersonalProfile.js"; 


const Video=styled.div`

	position:relative;
	width:100%;
	height:80%;
	overflow:hidden;
	border-radius:5px
	display:flex;
	flex-direction:column;
	z-index:5;
	background-color:white;

	@media screen and (max-width:1370px){
		#videoElement{
			height:80% !important;
		}
	}
	@media screen and (max-width:650px){
		margin-top:20px !important;
		#ownerFirstName{
			font-size:15px !important;
		}
		#videoElement{
			height:70% !important;
		}
	}
`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	width:100%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;


const CommentsContainerDiv=styled.div`
	position:absolute;
	width:90%;
	top:80%;
	background-color:white;
	left:0%;
	border-radius:5px;
	overflow-y:scroll;
`;

const CommentText=styled.div`
	position:relative;
	width:80%;
	margin-left:10px;
	margin-top:2%;
`;

const ExtendedTextArea=styled.textarea`
	position:relative;
	width:100%;
	height:250px;
	background-color:white;
	border-radius:10px;
	border-style:solid;
	border-width:1px;
	border-color:#a2a2a2;
	margin-bottom:10px;
	resize:none;

	@media screen and (max-width:1370px){
		height:50%;
	}

	@media screen and (max-width:650px){
		height:200px !important;
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	width:90%;
    	margin-left:5%;
	}
`;

const SubmitButtonCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	listStyle:"none",
	display:"inline-block",
	cursor:"pointer"
}

const ExtendedCommentAreaButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"5%"
}

const ProfilePicture={
	position:"relative",
	width:"53px",
	height:"13%",
	borderRadius:"50%"
}

const ButtonCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	listStyle:"none",
	display:"inline-block",
	marginRight:"2%",
	marginBottom:"1%",
	cursor:"pointer",
	marginTop:"10px"
}

const ShadowButtonCSS={
	display:"inline-block",
	listStyle:"none",
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	marginRight:"5px",
	borderRadius:"5px",
	borderStyle:"none",
	marginRight:"10%",
	marginBottom:"2%",
	cursor:"pointer",
	marginTop:"5%",
	marginLeft:"5%"
}


/*
	Later should have sharing etc but not implementing right now
	Could be turned into funcitonal component is not complex but later
*/

class VideoResponseContainer extends Component{

	constructor(props){

		super(props);
		this.state={
			videoResponses:[],
			indicatorPosition:0,
			displayComments:false,
			displayFinalResultVideoResponseScreen:false,
			createdVideoSrc:null,
			isVideoResponsesReady:false,
			replies:[],
			creationCommentExtended:false,
			isProcessingInput:false,
			isProcessingSubmitInput:false,
			isRepliesFetched:false,
			selectedCommentPoolId:"",
			isCurrentlyFetchReplies:false,
			selectedVideoComment:{}
		}
	}	
	componentDidUpdate(){
		if(this.props.selectedCommentPoolId!=this.state.selectedCommentPoolId){
			this.setState({
				selectedCommentPoolId:this.props.selectedCommentPoolId==null?"":
									this.props.selectedCommentPoolId
			},async()=>{
				await this.fetchData();
			})
		}
	}

	async componentDidMount(){
		await this.fetchData();
	}

	fetchData=async()=>{
		this.setState({
			isProcessingInput:true
		})
		const {confirmation,data}=await getVideoComments(
											this.props.postType,
											this.props.postId,
											this.state.selectedCommentPoolId
											);
		if(confirmation=="Success"){
			const {message}=data;
			this.setState({
				videoResponses:message,
				isVideoResponsesReady:true
			})
		}else{
			alert('Unfortunately there has been an error getting the video responses. Please try again');
		}
		this.setState({
			isProcessingInput:false
		})
	}

	getReplies=async(videoData)=>{
		const commentId=videoData._id;

		this.setState({
			isCurrentlyFetchReplies:true,
			selectedVideoComment:videoData
		})
		const {confirmation,data}=await getVideoCommentsReplies(
											this.props.postId,
											this.props.postType,
											commentId);
		if(confirmation=="Success"){
			const {message}=data;
			this.setState({
				displayComments:!this.state.displayComments,
				replies:message,
				isRepliesFetched:true
			});
		}else{
			alert('Unfortunately there has been an error getting the replies. Please try again');
		}
		this.setState({
			isCurrentlyFetchReplies:false
		})
	}

	handleCreateComment=async({isAccessTokenUpdated,updatedAccessToken})=>{
		this.setState({
			isProcessingSubmitInput:true
		})
		const comment=document.getElementById("comment").value;
		const isPersonalProfileIndicator=this.props.personalState.loggedIn==true?true:false;
		const profileObject={
			isPersonalProfile:isPersonalProfileIndicator,
			profileId:isPersonalProfileIndicator==true?this.props.personalState.id:
														this.props.companyState.id
		}
		if(comment!=""){
			const replyObject={
				postType:this.props.postType,
				commentId:this.state.videoResponses[this.state.indicatorPosition]._id,
				reply:comment,
				profileObject:profileObject,
				postId:this.props.postId,
				userId:this.props.personalState.id,
				commentOwnerId:this.state.selectedVideoComment.ownerObject.owner._id,
				accessToken:isAccessTokenUpdated==true?updatedAccessToken:
							this.props.personalState.accessToken
			}

			const {confirmation,data}=await createVideoCommentReply(replyObject);
			
			if(confirmation=="Success"){
				const {message}=data;
				var currentComments=this.state.replies;
				const newComment={
					comment,
					ownerObject:{
						profilePicture:message.ownerObject.profilePicture,
						owner:{
							firstName:isPersonalProfileIndicator==true?this.props.personalState.firstName:
							this.props.companyState.companyName
						}
					}
				}

				currentComments.splice(0,0,newComment);
				this.setState({
					replies:currentComments,
					creationCommentExtended:false
				})
			}else{
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
							this.props.personalState.refreshToken,
							this.props.personalState.id,
							this.handleCreateComment,
							this.props,
							{},
							true
						);
				}else{
					alert('Unfortunately an error has occured please submit your comment again');
				}
			}
		}else{
			alert('Please enter a comment');
		}
		this.setState({
			isProcessingInput:false,
			isProcessingSubmitInput:false
		})
	}


	createCommentUI=()=>{
		return <>
					{this.state.creationCommentExtended==false?
						<>
							<InputContainer onClick={()=>this.setState({creationCommentExtended:true})} 
								placeholder="Add a comment"
							/>
						</>:
						<>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none"}}>
									<ExtendedTextArea id="comment" />
								</li>
								<li style={{listStyle:"none"}}>
									{this.state.isProcessingSubmitInput==true?
										<p>Please wait</p>:
										<ul style={{padding:"0px"}}>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li  onClick={()=>this.handleCreateComment({isAccessTokenUpdated:false})} style={ExtendedCommentAreaButton}>
													Create
												</li>
											</a>

											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li onClick={()=>this.setState({creationCommentExtended:false})} style={ExtendedCommentAreaButton}>
													Close
												</li>
											</a>
										</ul>
									}
								</li>
							</ul>
						</>
					}
			   </>
	}

	commentUI=()=>{
		
		return <ul style={{marginBottom:"20px",marginTop:"5%"}}>
					<li onClick={()=>this.setState({displayComments:false})} style={{marginRight:"80%",listStyle:"none"}}>
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" 
							  width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#03A9F4" fill="none" 
							  stroke-linecap="round" stroke-linejoin="round">
								  <path stroke="none" d="M0 0h24v24H0z"/>
								  <circle cx="12" cy="12" r="9" />
								  <path d="M10 10l4 4m0 -4l-4 4" />
							</svg>
						</a>
					</li>
					{this.createCommentUI()}
					<li style={{listStyle:"none",marginTop:"10px"}}>
						{this.state.replies.length==0?
							<p>No replies</p>:
							<>
								{this.state.replies.map(data=>
									<>
										<li style={{marginTop:"5%",listStyle:"none",display:"inline-block",marginRight:"20px"}}>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none",display:"inline-block",marginRight:"10px"}}>
													<img src={data.ownerObject.profilePicture==null
														?NoProfilePicture:data.ownerObject.profilePicture} 
														style={{borderRadius:"50%",width:"50px",height:"45px"}}/>
												</li>
												<li style={{listStyle:"none",display:"inline-block"}}>
													<b>{data.ownerObject.owner.firstName}</b>
												</li>
											</ul>
										</li>
										<CommentText>
											{data.comment}
										</CommentText>
										{(this.props.isOligarch==true || this.props.personalState.id==this.props.ownerId._id
											|| data.ownerObject.owner._id==this.props.personalState.id)==true &&(
											<div onClick={()=>this.triggerDeleteVideoCommentOrReply({
												isAccessTokenUpdated:false,
												commentId:data._id,
												isReplyDeletion:true
											})}>
												{this.deleteCommentIcon()}
											</div>
										)}
										<hr/>
									</>
								)}
							</>
						}
					</li>
					
			</ul>
	}

	deleteCommentIcon=()=>{
		return(
			<svg id="removePostOption" 
				 xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash"
				width="50" height="50" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6e6e6e" fill="none"
				stroke-linecap="round" stroke-linejoin="round" style={ShadowButtonCSS}>
			  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
			  <line x1="4" y1="7" x2="20" y2="7" />
			  <line x1="10" y1="11" x2="10" y2="17" />
			  <line x1="14" y1="11" x2="14" y2="17" />
			  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
			  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
			</svg>
		)
	}

	triggerDeleteVideoCommentOrReply=async({isAccessTokenUpdated,updatedAccessToken,commentId,isReplyDeletion,targetIndex})=>{
		const {confirmation,data}=await deleteVideoCommentOrReply(
											commentId,
											this.props.personalState.id,
											isAccessTokenUpdated==true?updatedAccessToken:
											this.props.personalState.accessToken)
		if(confirmation=="Success"){
			if(isReplyDeletion==true){
				const replies=this.state.replies;
				replies.splice(targetIndex,1);
				this.setState({
					replies
				})
			}else{
				const videoResponses=this.state.videoResponses;
				videoResponses.splice(this.state.indicatorPosition,1);
				this.setState({
					videoResponses
				})	
			}
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						this.props.personalState.refreshToken,
						this.props.personalState.id,
						this.triggerDeleteVideoCommentOrReply,
						this.props,
						{
							commentId,
							isReplyDeletion,
							targetIndex
						},
						true
					);
			}else{
				alert('Unfortunately an error has occured. Please try again');
			}
		}
	}


	VideoComponent=()=>{ 
		const videoData=this.state.videoResponses[this.state.indicatorPosition];
		return <>
			{this.state.isProcessingInput==true?
				<p>Please wait...</p>:
				<>
					{this.state.videoResponses.length==0 || videoData==null?
						<p>No video comments</p>:
						<>	
							<ul style={{padding:"0px",marginTop:"15px",marginBottom:"10px"}}>
								{this.state.indicatorPosition==0?null:
									<li onClick={()=>this.handlePreviousResponse()} 
										style={{listStyle:"none",cursor:"pointer",color:"#5298F8"}}>
										Previous
									</li>
								}

								{this.state.indicatorPosition==this.state.videoResponses.length-1?null:
									<li onClick={()=>this.handleNextResponse()} 
										style={{listStyle:"none",cursor:"pointer",color:"#5298F8"}}> 
										Next
									</li>
								}
							</ul>
							<Video>
								{this.state.displayComments==false?
									<React.Fragment>
										<div style={{display:"flex",flexDirection:"row",marginBottom:"5px",alignItems:"center"}}>
											<Link to={{pathname:`/profile/${videoData.ownerObject.owner._id}`}}>
												<img src={videoData.ownerObject.profilePicture==null?
													NoProfilePicture:videoData.ownerObject.profilePicture}
													style={{borderRadius:"50%",width:"50px",height:"45px"}}
												/>
											</Link>
											<p id="ownerFirstName"
												style={{color:"#2E2E2E",fontSize:"25px",marginLeft:"5%"}}>
												<b>{videoData.ownerObject.owner.firstName}</b>
											</p>
											{(this.props.isOligarch==true || this.props.personalState.id==this.props.ownerId._id
												|| videoData.ownerObject.owner._id==this.props.personalState.id)==true &&(
												<div onClick={()=>this.triggerDeleteVideoCommentOrReply({
													isAccessTokenUpdated:false,
													commentId:videoData._id
												})}>
													{this.deleteCommentIcon()}
												</div>
											)}
										</div>
										<video id="videoElement"
											style={{borderRadius:"5px",backgroundColor:"#151515"}}
											key={videoData._id} objectFit="cover" position="absolute" 
											width="100%" top="0px" height="50%" borderRadius="50%" 
											autoplay="true" controls>
											<source src={videoData.videoSrc} type="video/mp4"/>
										</video>
										{this.state.isCurrentlyFetchReplies==true?
											<p>Please wait...</p>:
											<div onClick={()=>this.getReplies(videoData)} 
												style={ButtonCSS}>
												Comments
											</div>
										}
									</React.Fragment>:
									<React.Fragment>
										{this.commentUI()}
									</React.Fragment>
								}
							</Video>
						</>
					}
				</>
			}
		</>
	}

	handleNextResponse=()=>{
		let currentIndicator=this.state.indicatorPosition;

		if(currentIndicator<this.state.videoResponses.length-1){
			const newIndicator=currentIndicator+1;

			this.setState({
				indicatorPosition:newIndicator,
				displayComments:false,
				isRepliesFetched:false
			})
		}
	}



	handlePreviousResponse=()=>{

		let currentIndicator=this.state.indicatorPosition;

		if(currentIndicator!=0){
			const newIndicator=currentIndicator-1;

			this.setState({
				indicatorPosition:newIndicator,
				displayComments:false,
				isRepliesFetched:false
			})
		}
	}

	closeModal=()=>{
		this.props.closeVideoCreationModal();
	}

	createVideoDescription=(videoSrc)=>{
		this.setState({
			createdVideoSrc:videoSrc,
			displayFinalResultVideoResponseScreen:true
		});
	}

	handleNewVideoResponse=async({isAccessTokenUpdated,updatedAccessToken})=>{
		this.setState({
			isProcessingInput:true
		})
		const isPersonalProfileIndicator=this.props.personalState.loggedIn==true?true:false;
		const currentProfile={
			isPersonalProfile:isPersonalProfileIndicator,
			profileId:isPersonalProfileIndicator==true?this.props.personalState.id:
														this.props.companyState.id
		}
		const videoResponse={
			postType:this.props.postType,
			videoSrc:this.state.createdVideoSrc,
			currentProfile:currentProfile,
			postId:this.props.postId,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
						this.props.personalState.accessToken,
			commentPoolId:this.state.selectedCommentPoolId,
			ownerId:this.props.ownerId,
			isMobile:this.props.displayPhoneUI
		}

		alert('Your video is processing. We wil notify via email and on here when your post is uploaded :). You can close this screen now')
		
		let {confirmation,data}=await createVideoResponse(videoResponse);
		if(confirmation=="Success"){
			data=data.message;
			const newComment={
				videoSrc:this.state.createdVideoSrc,
				ownerObject:{
					owner:{
						firstName:isPersonalProfileIndicator==true?this.props.personalState.firstName:
						this.props.companyState.companyName
					},
					profilePicture:data.profilePicture
				},
				_id:data._id
			}

			const currentVideos=this.state.videoResponses;
			currentVideos.splice(0,0,newComment);
			this.setState({
				videoResponses:currentVideos
			},function(){
				this.props.closeVideoCreationModal()
			})


		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						this.props.personalState.refreshToken,
						this.props.personalState.id,
						this.handleNewVideoResponse,
						this.props,
						{},
						true
					);
			}else{
				alert('Unfortunately there was an error creating your video response. Please try again');
			}
		}
		this.setState({
			isProcessingInput:false
		})
	}
	render(){
		return(
			<React.Fragment>
				{this.props.displayCreationPrompt==false?
					<>
						{this.VideoComponent()}
					</>:
					<>
						{this.state.displayFinalResultVideoResponseScreen==false?
							<VideoDescriptionPortal
								closeModal={this.closeModal}
								createVideoDescription={this.createVideoDescription}
								parentContainer={this.props.targetContainer}
							/>:
							<>
								<hr/>
								{this.state.isProcessingInput==true?
									<p>Please wait...</p>:
									<ul style={{padding:"0px"}}>

										<li style={{listStyle:"none"}}>
											<ul style={{padding:"0px"}}>
												<a href="javascript:void(0);" style={{textDecoration:"none"}}>
													<li onClick={()=>this.handleNewVideoResponse({isAccessTokenUpdated:false})} style={SubmitButtonCSS}>
														Submit 
													</li>
												</a>

												<a href="javascript:void(0);" style={{textDecoration:"none"}}>
													<li onClick={()=>this.setState({displayFinalResultVideoResponseScreen:false})}style={SubmitButtonCSS}>
														Redo response
													</li>
												</a>
											</ul>
										</li>

										<li style={{listStyle:"none"}}>
											<video width="100%" height="100%" autoplay="true" controls>
												<source src={this.state.createdVideoSrc} type="video/mp4"/>
											</video>
										</li>
									</ul>
								}
							</>
						}
					</>
				}
			</React.Fragment>
		)
	}
}

const mapStateToProps=(state)=>{
	return{
		personalState:state.personalInformation,
		companyState:state.personalInformation
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
)(VideoResponseContainer);



