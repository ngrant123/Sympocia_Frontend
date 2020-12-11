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
		createVideoCommentReply
	} from "../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import VideoDescriptionPortal from "../PostComponent/VideoDescriptionPortal.js";
import {connect} from "react-redux";
import NoProfilePicture from "../../../designs/img/NoProfilePicture.png";


const Video=styled.div`

	position:absolute;
	width:100%;
	height:80%;
	overflow-y:scroll;
	border-radius:5px
	z-index:5;
	background-color:#1C1C1C;
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
	height:40%;
	background-color:white;
	border-radius:10px;
	border-style:solid;
	border-width:1px;
	border-color:#a2a2a2;
	margin-bottom:10px;
	resize:none;
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
	display:"inline-block"
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
	marginBottom:"1%"
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
			creationCommentExtended:false
		}
	}

	async componentDidMount(){
		const {confirmation,data}=await getVideoComments(this.props.postType,this.props.postId);
		if(confirmation=="Success"){
			this.setState({
				videoResponses:data,
				isVideoResponsesReady:true
			})
		}else{
			alert('Unfortunately there has been an error getting the video responses. Please try again');
		}
	}

	getReplies=async()=>{
		
		const {confirmation,data}=await getVideoCommentsReplies(this.props.postId,this.state.indicatorPosition,this.props.postType);
		if(confirmation=="Success"){
			this.setState({
				displayComments:!this.state.displayComments,
				replies:data
			});
		}else{
			alert('Unfortunately there has been an error getting the replies. Please try again');
		}
	}

	handleCreateComment=async()=>{
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
				commentIndex:this.state.indicatorPosition,
				userId:this.props.personalState.id
			}
			const {confirmation,data}=await createVideoCommentReply(replyObject);
			
			if(confirmation=="Success"){
				
				var currentComments=this.state.replies;
				const newComment={
					reply:comment,
					profilePicture:data.profilePicture,
					ownerObject:{
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
				alert('Unfortunately an error has occured please submit your comment again');
			}
		}else{
			alert('Please enter a comment');
		}
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
									<ul style={{padding:"0px"}}>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li  onClick={()=>this.handleCreateComment()} style={ExtendedCommentAreaButton}>
												Create
											</li>
										</a>

										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>this.setState({creationCommentExtended:false})} style={ExtendedCommentAreaButton}>
												Close
											</li>
										</a>
									</ul>
								</li>
							</ul>
						</>
					}
			   </>
	}

	commentUI=()=>{
		console.log(this.state.replies);
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
					<li style={{listStyle:"none"}}>
						{this.state.replies.map(data=>
							<>
								<li style={{marginTop:"5%",listStyle:"none",display:"inline-block",marginRight:"20px"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",marginRight:"10px"}}>
											<img src={data.profilePicture==null?NoProfilePicture:data.profilePicture} 
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
								<hr/>
							</>
						)}
					</li>
					
			</ul>
	}



	VideoComponent=()=>{ 
		const videoData=this.state.videoResponses[this.state.indicatorPosition];

		return <>
					{this.state.videoResponses.length==0 || videoData==null?
						null:
						<>	
							<ul style={{padding:"0px"}}>
								{this.state.indicatorPosition==0?null:
									<li onClick={()=>this.handlePreviousResponse()} style={ButtonCSS}>
										Previous
									</li>
								}

								{this.state.indicatorPosition==this.state.videoResponses.length-1?null:
									<li onClick={()=>this.handleNextResponse()} style={ButtonCSS}> 
										Next
									</li>
								}
							</ul>
							<Video>
								<video key={videoData._id} objectFit="cover" position="absolute" width="100%" top="0px" height="110%" borderRadius="50%" autoplay="true" controls>
									<source src={videoData.videoSrc} type="video/mp4"/>
								</video>
								<ul style={{position:"absolute",top:"50px"}}>
									<li style={{listStyle:"none",width:"400px"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
												<img src={videoData.profilePicture==null?NoProfilePicture:videoData.profilePicture}
													style={{borderRadius:"50%",width:"50px",height:"45px"}}
												/>
											</li>

											<li style={{listStyle:"none",display:"inline-block"}}>
												<p style={{color:"white",fontSize:"25px",marginLeft:"5%"}}>
													<b>{videoData.ownerObject.owner.firstName}</b>
												</p>
											</li>
										</ul>
									</li>

									<li style={{listStyle:"none"}}>
										<ul style={{zIndex:"2",padding:"0px",width:"15%"}}>
											<li style={{listStyle:"none",marginBottom:"40%"}} onClick={()=>this.getReplies()}>
												<a href="javascript:void(0);" style={{textDecoration:"none"}}>
													<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-2"
														 width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" 
														 fill="none" stroke-linecap="round" stroke-linejoin="round">
													  <path stroke="none" d="M0 0h24v24H0z"/>
													  <path d="M12 20l-3 -3h-2a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-2l-3 3" />
													  <line x1="8" y1="9" x2="16" y2="9" />
													  <line x1="8" y1="13" x2="14" y2="13" />
													</svg>
												</a>
											</li>
										</ul>
									</li>
									{this.state.displayComments==true?
											<CommentsContainerDiv>
												{this.commentUI()}
											</CommentsContainerDiv>:null
									}
								</ul>
							</Video>
							
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
				displayComments:false
			})
		}
	}



	handlePreviousResponse=()=>{

		let currentIndicator=this.state.indicatorPosition;

		if(currentIndicator!=0){
			const newIndicator=currentIndicator-1;

			this.setState({
				indicatorPosition:newIndicator,
				displayComments:false
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

	handleNewVideoResponse=async()=>{
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
			postId:this.props.postId
		}

		const {confirmation,data}=await createVideoResponse(videoResponse);
		if(confirmation=="Success"){
			const newComment={
					videoSrc:this.state.createdVideoSrc,
					profilePicture:data.profilePicture,
					ownerObject:{
						owner:{
							firstName:isPersonalProfileIndicator==true?this.props.personalState.firstName:
							this.props.companyState.companyName
						}
					},
					_id:data.comments.videoComments[data.comments.videoComments.length-1]._id.toString()
				}

			const currentVideos=this.state.videoResponses;
			currentVideos.splice(0,0,newComment);
			this.setState({
				videoResponses:currentVideos
			},function(){
				this.props.closeVideoCreationModal()
			})


		}else{
			alert('Unfortunately there was an error creating your video response. Please try again');
		}
	}
	/*
		<{this.state.indicatorPosition==this.state.videoResponses.length-1?
		<React.Fragment>
		</React.Fragment>:
		<KeyboardArrowRightIcon onClick={()=>this.handleNextResponse()} style={{fontSize: 40,position:"absolute",top:"70%",right:"5%"}}/>


						{this.state.isVideoResponsesReady && (
							<>
								{this.VideoComponent()}
							</>
						)}
	*/
	render(){
		return(
			<React.Fragment>
				{this.props.displayCreationPrompt==false?
					<>
						{this.state.isVideoResponsesReady && (
							<>
								{this.VideoComponent()}
							</>
						)}
					</>:
					<>
						{this.state.displayFinalResultVideoResponseScreen==false?
							<VideoDescriptionPortal
								closeModal={this.closeModal}
								createVideoDescription={this.createVideoDescription}
								parentContainer={this.props.targetContainer}
							/>:
							<>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none"}}>
										<ul style={{padding:"0px"}}>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li onClick={()=>this.handleNewVideoResponse()} style={SubmitButtonCSS}>
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

export default connect(
	mapStateToProps
)(VideoResponseContainer);



