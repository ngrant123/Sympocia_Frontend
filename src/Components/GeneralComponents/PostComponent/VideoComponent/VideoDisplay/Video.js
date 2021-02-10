import React,{Component} from "react";
import ReactDom from "react-dom";
import styled , {keyframes}from "styled-components";
import Comments from "../../../../GeneralComponents/CommentsComponent/index.js";
import { Icon, InlineIcon } from '@iconify/react';
import stampIcon from '@iconify/icons-fa-solid/stamp';
import shareIcon from '@iconify/icons-fa-solid/share';

import ChatIcon from '@material-ui/icons/Chat';
import DescriptionIcon from '@material-ui/icons/Description';
import StampIcon from "../../../../../designs/img/StampIcon.png";
import PollIcon from '@material-ui/icons/Poll';

import {connect} from "react-redux";
import {
		addStampPost,
		unStampPost
	} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {Link} from "react-router-dom";
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";
import {
		setPersonalProfileAccessToken,
		setPersonalProfileRefreshToken
	} from "../../../../../Actions/Redux/Actions/PersonalProfile.js"; 

const Container=styled.div`
	position:relative;
	width:100%;
	height:100%;
	background-color:black;
	border-radius:5px;
`;

const OptionsContainer=styled.div`
	position:absolute;
	width:7%;
	height:75%;
	z-index:3;
	top:0%;
	left:85%;
`;

const SmallVideoModal=styled.div`
	position:relative;
	width:350px;
	height:300px;
	border-radius:5px;

`;

const CommentsContainer=styled.div`
	position:relative;
	width:450px;
	height:100%;
	overflow-y:scroll;
	border-radius:5px;
`;

const VideoCommentsAndModalContainer=styled.div`
	position:absolute;
	width:100%;
	height:80%;
	z-index:3;
	top:10%;
	left:2%;
	visibility: hidden;
	z-index:4;
`;

const ShadowContainer = styled.div`

	position:absolute;
	width:100%;
	height:100%;
	background-color:rgba(0,0,0,0.4); /* Black w/ opacity */
	z-index:3;

`;

const DescriptionModal=styled.div`

	position:absolute;
	width:45%;
	height:45%;
	z-index:3;
	top:2%;
	left:5%;
	overflow-y:auto;
	border-radius:5px;
`;

const SmallProfileDescriptionPicture=styled.div`
	postion:relative;
	width:80px;
	height:30%;
	border-radius:50%;
	background-color:white;

`;

const IndustryContainer=styled.div`
	position:relative;
	background-color:white;
	text-align:center;
	width:60px;
	padding:10px;
	color:#5298F8;
	border-style:solid;
	border-width:1px;
	border-color:#0857c2;
	border-radius:5px;
	transition:.8s;

	&:hover{
		background-color:#0857c2;
	}
`;

const keyFrame=keyframes`
	  0%{
	    opacity: 0;
	  }
	  10%{
	    opacity:.50;
	    transform-origin: 50% 50%;
	    transform: scale(5);
	    transition: all .3s cubic-bezier(0.6, 0.04, 0.98, 0.335);
	  }
	  100%{
	    opacity:1;
	    transform: scale(1);
	  }

`;
const StampIconEffect=styled.div`
	  height:100px;
	  width:100px;
	  border-radius:5px;
	  position:absolute;
	  animation:${keyFrame} 1s ease-in-out 0s forwards;
`;

const ApproveDisapproveContainer=styled.div`
	position:fixed;
	background-color:white;
	width:30%;
	height:10%;
	border-radius:5px;
	left:30%;
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





class Video extends Component{
	constructor(props){
		console.log(props);
		super(props);
		this.state={
			displayComments:false,
			displayDescription:false,
			seconds:0,
			displayStampEffect:false,
			displayPollModal:false,
			pollModal:false,
			displayApproveDisapproveIndicator:false,
			approvesPostNumber:props.video.isPostAuthentic.numOfApprove!=null?
								   props.video.isPostAuthentic.numOfApprove.length:0,
			disapprovesPostNumber:props.video.isPostAuthentic.numOfDisapprove!=null?
									  props.video.isPostAuthentic.numOfDisapprove.length:0
		}
	}


	displayOrHideVideoAndComments=()=>{
		debugger;
		if(this.state.displayComments==true){
			const commentsAndVideoContainer=document.getElementById("commentsAndVideoContainer");
			commentsAndVideoContainer.style.visibility="visible";

			const videoElement=document.getElementById("largeVideoElement");
			const videoSeconds=videoElement.currentTime;
			videoElement.muted=true;
			const smallVideo=document.getElementById("smallVideo");
			smallVideo.currentTime=videoSeconds;
			smallVideo.play();

			//make api call to get comments
		}else{
			const commentsAndVideoContainer=document.getElementById("commentsAndVideoContainer");
			if(commentsAndVideoContainer!=null){
				const videoElement=document.getElementById("largeVideoElement");
				commentsAndVideoContainer.style.visibility="hidden";
				const smallVideo=document.getElementById("smallVideo");
				smallVideo.pause();
				videoElement.muted=false;
			}
		}
	}

	displayDescription=(postInformation)=>{
		console.log(postInformation);
		return this.state.displayDescription==false? <React.Fragment></React.Fragment>:
			<DescriptionModal>
				<ul style={{padding:"0px"}}>
					<li style={{listStyle:"none",marginBottom:"2%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
								<SmallProfileDescriptionPicture>
									{this.props.video.videoDescription==null?
										<>
											{postInformation.owner.profilePicture!=null &&(
												<Link to={{pathname:`/profile/${postInformation.owner._id}`}}>
													<img src={postInformation.owner.profilePicture} 
														style={{borderRadius:"50%",width:"100%",height:"100%"}}
													/>
												</Link>
											)}
										</>:
										<video style={{borderRadius:"50%"}} width="100%" height="100%" autoplay="true" controls>
											<source src={this.props.video.videoDescription} type="video/mp4"/>
										</video>
									}
								</SmallProfileDescriptionPicture>
							</li>

							<li style={{listStyle:"none",display:"inline-block",fontSize:"25px",color:"white",marginRight:"35%"}}>
								<b>{postInformation.owner.firstName}</b>
							</li>
							{postInformation.audioDescription!=null &&(
								<li style={{listStyle:"none"}}>
									<audio controls>
										<source src={this.props.video.audioDescription} type="audio/ogg"/>
										<source src={this.props.video.audioDescription} type="audio/mpeg"/>
										Your browser does not support the audio element.
									</audio>
								</li>
							)}
						</ul>
					</li>
					<li style={{listStyle:"none",marginBottom:"2%",padding:"5px",fontSize:"20px",color:"white"}}>
						<b>{postInformation.title}</b>
					</li>

					<li style={{listStyle:"none",marginBottom:"2%",padding:"5px",fontSize:"15px",color:"white"}}>
						{postInformation.description}
					</li>
					<li onClick={()=>this.setState({displayDescription:false})} style={{position:"relative",listStyle:"none",color:"white",cursor:"pointer"}}>
						<b>Close</b>
					</li>
				</ul>
			</DescriptionModal>


	}


	displayShadow=()=>{
		return this.state.displayComments==true?<ShadowContainer onClick={()=>this.setState({displayComments:false})}/>:
			<React.Fragment></React.Fragment>
	}

	createOrRemoveStampEffect=async({isAccessTokenUpdated,updatedAccessToken})=>{
		debugger;
		let confirmationResponse;
		let dataResponse;
		if(this.state.displayStampEffect==false){
			const {confirmation,data}=await addStampPost(
												this.props.video._id,
												"personal",
												"Videos",
												this.props.personalId,
												isAccessTokenUpdated==true?updatedAccessToken:
												this.props.personalInformation.accessToken
											);
			confirmationResponse=confirmation;
			dataResponse=data;

		}else{
			const {confirmation,data}=await unStampPost(
												this.props.video._id,
												"personal",
												"Videos",
												this.props.personalId,
												isAccessTokenUpdated==true?updatedAccessToken:
												this.props.personalInformation.accessToken
											);
			confirmationResponse=confirmation;
			dataResponse=data;
		}

		if(confirmationResponse=="Success"){
			if(this.state.displayStampEffect==false){
				this.setState({
					displayStampEffect:true
				})
			}else{
				this.setState({
					displayStampEffect:false
				})
			}
		}else{
			const {statusCode}=dataResponse;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						this.props.personalInformation.refreshToken,
						this.props.personalInformation.id,
						this.createOrRemoveStampEffect,
						this.props,
						{},
						true
					);
			}else{
				alert('Unfortunately there has been an error with stamping/unstamping this post. Please try again');
			}
		}
	}

	hideComments=()=>{
		const smallVideoCurrentTime=document.getElementById("smallVideo").currentTime;
		const largeVideo=document.getElementById("largeVideoElement");
		const commentsAndVideoContainer=document.getElementById("commentsAndVideoContainer");

		largeVideo.currentTime=smallVideoCurrentTime;
		largeVideo.play();

		const videoElement=document.getElementById("largeVideoElement");
		commentsAndVideoContainer.style.visibility="hidden";

		this.setState({
			displayComments:false
		})
	}
	closeModal=()=>{
		this.setState({
			displayPollModal:false
		})
	}

	triggerPollModal=(indicator)=>{
		this.props.displayPollModal(indicator);
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
										<li onClick={()=>this.triggerPollModal(true)} style={authenticPostButtonCSS}>

											<p style={{color:"#01DF01"}}>{this.state.approvesPostNumber}</p> 
												approves post

										</li>
									</a>

									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>this.triggerPollModal(false)} style={authenticPostButtonCSS}>

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

//Like,Dislike,Comment,Share,Promote

	render(){
		return(
			<Container>
				{this.displayApproveDisapproveModal()}
				{this.displayShadow()}

				<VideoCommentsAndModalContainer id="commentsAndVideoContainer">
					<ul style={{padding:"0px",position:"relative",zIndex:"5px"}}>
						{this.state.displayComments==true?
							<li style={{listStyle:"none",display:"inline-block"}}>
								<CommentsContainer>
									<Comments
										postId={this.props.video._id}
										postType={"Videos"}
										hideComments={this.hideComments}
										targetDom={this.props.targetDom}
									/> 
								</CommentsContainer>
							</li>:null
						}

						<li style={{listStyle:"none",display:"inline-block",color:"yellow",marginRight:"2%"}}>
							<SmallVideoModal key={this.props.video.videoUrl} id="smallVideoMaodl">
								<video id="smallVideo" position="relative" height="100%" width="100%" controls autoplay>
								    <source src={this.props.video.videoUrl} type="video/mp4"/>
								</video>
							</SmallVideoModal>
						</li>
					</ul>
				</VideoCommentsAndModalContainer>

				{this.displayOrHideVideoAndComments()}
				{this.state.displayStampEffect==true?
						<StampIconEffect
							id="stampEffect"
						>
							<img src={StampIcon} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
						</StampIconEffect>:
						null
				}

    			<video  key={this.props.video.videoUrl} id="largeVideoElement" position="relative" height="100%" width="100%" controls autoplay muted>
				    <source src={this.props.video.videoUrl} type="video/mp4"/>
				</video>

				{this.displayDescription(this.props.video)}

				<OptionsContainer>
					<ul style={{paddingTop:"10px"}}>
						{this.props.isGuestProfile==false &&(
							<React.Fragment>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li onClick={()=>this.createOrRemoveStampEffect({isAccessTokenUpdated:false})} style={{listStyle:"none",marginBottom:"20px"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",marginLeft:"5%"}}>
												<LoyaltyIcon 
													icon={stampIcon}
													style={{fontSize:30,color:"white"}}
												/>
											</li>
											<li style={{listStyle:"none",color:"white",fontSize:"10px"}}>
												Stamp
											</li>
										</ul>
									</li>
								</a>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li onClick={()=>this.setState({displayComments:!this.state.displayComments})} 
										style={{listStyle:"none",marginBottom:"20px"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",marginLeft:"5%"}}>
												<ChatIcon
													style={{fontSize:30,color:"white"}}
												/>
											</li>
											<li style={{listStyle:"none",color:"white",fontSize:"10px"}}>
												Comments
											</li>
										</ul>
									</li>
								</a>
							</React.Fragment>
						)}


						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<li onClick={()=>this.setState({displayDescription:!this.state.displayDescription})} 
								style={{listStyle:"none",marginBottom:"20px"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",marginLeft:"5%"}}>
										<DescriptionIcon
											style={{fontSize:30,color:"white"}}
										/>
									</li>
									<li style={{listStyle:"none",color:"white",fontSize:"10px"}}>
										Description
									</li>
								</ul>
							</li>
						</a>

						{this.props.isGuestProfile==false &&(
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li onClick={()=>this.setState({
													displayApproveDisapproveIndicator:!this.state.displayApproveDisapproveIndicator
												})}
									 style={{listStyle:"none",marginBottom:"20px"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",marginLeft:"5%"}}>
											<PollIcon
												style={{fontSize:30,color:"white"}}
											/>
										</li>
										<li style={{listStyle:"none",color:"white",fontSize:"10px"}}>
											Poll
										</li>
									</ul>
								</li>
							</a>
						)}

						{(this.props.pageType=="personalProfile" && this.props.isOwnPostViewing==true) &&(
							<>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li onClick={()=>this.props.triggerPromoteModal(this.props.video._id,"Videos")}
										 style={{listStyle:"none",marginBottom:"20px"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",marginLeft:"5%"}}>
												<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-award"
													 width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" 
													 fill="none" stroke-linecap="round" stroke-linejoin="round">
													  <path stroke="none" d="M0 0h24v24H0z"/>
													  <circle cx="12" cy="9" r="6" />
													  <polyline points="9 14.2 9 21 12 19 15 21 15 14.2" transform="rotate(-30 12 9)" />
													  <polyline points="9 14.2 9 21 12 19 15 21 15 14.2" transform="rotate(30 12 9)" />
												</svg>
											</li>
											<li style={{listStyle:"none",color:"white",fontSize:"10px"}}>
												Promote
											</li>
										</ul>
									</li>
								</a>

								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li onClick={()=>this.props.deletePost()}
										 style={{listStyle:"none",marginBottom:"20px"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",marginLeft:"5%"}}>
												<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler 
													icon-tabler-trash" width="30" height="30" viewBox="0 0 24 24" 
													stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round"
													 stroke-linejoin="round">
													  <path stroke="none" d="M0 0h24v24H0z"/>
													  <line x1="4" y1="7" x2="20" y2="7" />
													  <line x1="10" y1="11" x2="10" y2="17" />
													  <line x1="14" y1="11" x2="14" y2="17" />
													  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
													  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
												</svg>
											</li>
											<li style={{listStyle:"none",color:"white",fontSize:"10px"}}>
												Delete
											</li>
										</ul>
									</li>
								</a>

								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li onClick={()=>this.props.displayEditModal()}
										 style={{listStyle:"none",marginBottom:"20px"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",marginLeft:"5%"}}>
												<BorderColorIcon
													style={{fontSize:30,color:"#FFFFFF"}}
												/>
											</li>
											<li style={{listStyle:"none",color:"white",fontSize:"10px"}}>
												Edit
											</li>
										</ul>
									</li>
								</a>
							</>
						)}
					</ul>
				</OptionsContainer>
			</Container>
		)
	}
}


const mapStateToProps=(state)=>{
	return {
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
)(Video);