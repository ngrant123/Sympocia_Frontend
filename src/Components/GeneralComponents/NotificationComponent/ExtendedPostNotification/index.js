import React,{useEffect,useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import{
	getCommentByID,
	getVideoCommentById,
	getAuthenticPostById,
	getVideoCommentReplyById,
	getRegularCommentReplyById
} from "../../../../Actions/Requests/PostAxiosRequests/PostPageGetRequests.js";
import {notificationProfileRetrieval} from "../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";

import {
	createReply,
	createVideoCommentReply
} from "../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {useSelector,useDispatch} from "react-redux";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import {refreshTokenApiCallHandle} from "../../../../Actions/Tasks/index.js";
import VideoDescriptionMobileDisplayPortal from "../../PostComponent/VideoDescriptionMobileDisplayPortal.js";
import {Link} from "react-router-dom";
import BeaconNotifications from "./BeaconNotification.js";


const Container=styled.div`
	position:fixed;
	width:60%;
	height:70%;
	background-color:white;
	z-index:55;
	overflow:scroll;
	top:20%;
	border-radius:5px;
	left:20%;
	display:flex;
	flex-direction: column;
	padding:30px;

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
		overflow:scroll !important;
	}
`;

const ShadowContainer= styled.div`
	position:fixed;
	width:150%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:50;
	top:0px;
	left:-2%;
`;

const Notification=styled.div`
	display:flex;
	flex-direction:row;
	margin-top:2%;

	@media screen and (max-width:1370px){
		#regularCommentAndAuthenticationProfilePicture{
			width:15% !important;
			height:40px !important
		}
		#notificationRecruitOrPromotionProfilePicture{
			width:10%;
			height:70px !important;
		}
		#image{
			height:60% !important;
		}
	}

	@media screen and (max-width:650px){

		flex-direction:column;

		#backButton{
			display:none !important;
		}
		#image{
			width:90% !important;
			height:200px !important;
		}
		#viewPostButtonDIV{
			margin-top:5%;
			width:70% !important;
		}
		#notificationRecruitOrPromotionProfilePicture{
			width:15% !important;
			height:40px !important;
		}

		#regularCommentAndAuthenticationProfilePicture{
			width:20% !important;
			height:40px !important
		}

		#replyButtonDIV{
			margin-top:5%;
			width:70% !important;
		}

		#submitButtonDIV{
			margin-top:5%;
			width:70% !important;
		}

		#videoPostComponent{
			width:70% !important;
			height:150% !important;
		}
	}
	@media screen and (max-width:1370px) and (max-height:900px) and (orientation: landscape) {
		#regularCommentAndAuthenticationProfilePicture{
			width:10% !important;
		}

		#image{
			height:100% !important;
		}
    }

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		#image{
			height:200px !important;
		}

    	#regularCommentAndAuthenticationProfilePicture{
			width:15% !important;
		}
		#notificationRecruitOrPromotionProfilePicture{
			height:70px !important;
		}
    }
`;

const InputContainer=styled.textarea`
	height:50%;
	width:100%;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	margin-bottom:2%;
	margin-right:2%;
`;


const RegularCommentAndAuthenticationContaienr=styled.div`
	display:flex;
	flex-direction:column;
`;

const VideoCommentReplyContainer=styled.div`
	display:flex;
	flex-direction:row;
`;

const ButtonCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	padding:"10px",
	borderRadius:"5px",
	cursor:"pointer"
}

const RegularPostDivCSS={
	borderRadius:"5px",
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#D8D8D8",
	width:"70%",
	padding:"2%"
}


const BackButtonCSS={
	...ButtonCSS,
	width:"20%"
}

{/*
	Right now there a little problem where if someone responds to you then you don't have an option to reply. 
	Still deciding on where to have the option to add a reply button on here but yeah
*/}

const ExtendedPostNotificationPortal=({targetDom,closeModal,data,headerUrl,postId,displayPostElementPage,isPostAudio})=>{
	console.log(data);
	const {notificationType,postType,commentID,replyId,notificationOwnerId}=data;
	const [notification,changeNotification]=useState();
	const [isLoading,changeIsLoading]=useState(true);
	const [displayReplyModal,changeDisplayReplyModal]=useState(false);
	const [displayIsProcessingCommentPrompt,changeIsProcessingCommentPrompt]=useState(true);
	const [displayVideoDescriptionDisplay,changeVideoDescriptionDisplay]=useState(false);

	const dispatch=useDispatch();
	const personalInformation=useSelector(state=>state.personalInformation);

	useEffect(()=>{
		const fetchData=async()=>{
			let confirmationResponse;
			let dataResponse;
			debugger;

			if(notificationType!="Stamp" && notificationType!="BeaconResponse"){
				if(notificationType=="RegularComment"){

					const {confirmation,data}=await getCommentByID({postType,commentId:commentID,postId});
					confirmationResponse=confirmation;
					dataResponse=data;

				}else if(notificationType=="VideoComment"){

					const {confirmation,data}=await getVideoCommentById({postType,commentId:commentID,postId});
					confirmationResponse=confirmation;
					dataResponse=data;

				}else if(notificationType=="AuthenticPost"){

					const {confirmation,data}=await getAuthenticPostById({postType,commentId:commentID,postId});
					confirmationResponse=confirmation;
					dataResponse=data;

				}else if(notificationType=="VideoCommentReply"){

					const {confirmation,data}=await getVideoCommentReplyById({postType,postId,commentID,replyId});
					confirmationResponse=confirmation;
					dataResponse=data;

				}else if(notificationType=="RegularReply"){
					const {confirmation,data}=await getRegularCommentReplyById({postType,postId,commentID,replyId});
					confirmationResponse=confirmation;
					dataResponse=data;
				}else if(notificationType=="Recruit" || notificationType=="Promotion" || notificationType=="RequestAccessToNode"){
					const {confirmation,data}=await notificationProfileRetrieval(notificationOwnerId);
					confirmationResponse=confirmation;
					dataResponse=[{
						firstName:data.firstName,
						profilePicture:data.profilePicture
					}];
				}

			
				if(confirmationResponse=="Success"){
					changeNotification({...dataResponse});
				}else{
					alert('Unfortunately there has been an error when trying to retrive this notification. Please try again');
					closeModal();
				}
			}
			changeIsLoading(false);
		}

		fetchData();
	},[])

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const postUrlComponent=()=>{
		
		if(postType=="Images" || postType=="Blogs"){
			return <img id="image" src={headerUrl} style={{width:"50%",height:"70%"}}/>
		}else if(postType=="Videos"){
			return <video id="videoPostComponent" key={uuidv4()} objectFit="cover" autoPlay loop autoBuffer muted playsInline 
						position="absolute" width="50%" top="0px" height="70%" borderRadius="50%" controls>
						<source src={headerUrl} type="video/mp4"/>
					</video>
		}else{
			return (
				<div style={RegularPostDivCSS}>
					{isPostAudio!=null?
						<audio style={{width:"200px"}} key={uuidv4()} controls>
						  <source src={headerUrl} type="audio/ogg"/>
						  <source src={headerUrl} type="audio/mp4"/>
							Your browser does not support the audio element.
						</audio>:
						<p style={{color:"#A4A4A4",overflow:"hidden"}}>{headerUrl}</p>
					}
				</div>
			)
		}
	}

	const notificationTypeComponent=()=>{
		
			if(notificationType!="Stamp" && notificationType!="Recruit"){
				if(notificationType=="RegularComment" || notificationType=="AuthenticPost"){
					return(
						<RegularCommentAndAuthenticationContaienr>
							<Link to={{pathname:`/profile/${notificationOwnerId}`}}>
								<div style={{display:"flex",flexDirection:"row"}}>
									<img id="regularCommentAndAuthenticationProfilePicture" src={notification.profilePicture==null?
										NoProfilePicture:notification.profilePicture}
										style={{width:"8%",height:"40px",borderRadius:"50%"}}/>
									<p style={{marginLeft:"2%",maxWidth:"30%",maxHeight:"20px",overflow:"hidden"}}>
										<b>{notification.firstName}</b>
									</p>
								</div>
							</Link>
							<p>{notification.comment}</p>
						</RegularCommentAndAuthenticationContaienr>
					)
				}else if(notificationType=="VideoCommentReply"){
					return(
						<div>
							<VideoCommentReplyContainer>
								<p style={{marginRight:"2%"}}>Your video comment:</p>
								<video key={uuidv4()} autoPlay loop autoBuffer muted playsInline 
									width="25%" height="25%" borderRadius="50%" controls>
									<source src={notification.parentVideoComment} type="video/mp4"/>
								</video>
							</VideoCommentReplyContainer>
							<hr/>
							<p>{data.owner.firstName}'s comment:</p>
							<p>{notification.comment}</p>
						</div>
					)
				}else if(notificationType=="RegularReply"){
					return <div>
								<p>Your comment:</p>
								<p>{notification.parentComment}</p>
								<hr/>
								<p>{data.owner.firstName}'s comment:</p>
								<p>{notification.reply}</p>
							</div>
				}else{
			   		return <div style={{display:"flex",flexDirection:"column"}}>
			   					<Link to={{pathname:`/profile/${notificationOwnerId}`}}>
				   					<div style={{display:"flex",flexDirection:"row",cursor:"pointer"}}>
										<img id="regularCommentAndAuthenticationProfilePicture" 
											src={notification.ownerObject.profilePicture==null?
												NoProfilePicture:notification.ownerObject.profilePicture}
											style={{width:"10%",height:"20%",borderRadius:"50%"}}/>
										<p style={{maxWidth:"30%",maxHeight:"20px",overflow:"hidden"}}>
											<b>{notification.ownerObject.owner.firstName}</b>
										</p>
									</div>
			   					</Link>
								<video style={{cursor:"pointer",marginTop:"5px"}} key={uuidv4()} autoPlay loop autoBuffer muted playsInline 
									width="60%" height="100%" borderRadius="50%" onClick={()=>displayVideoDescriptionTrigger()}>
									<source src={notification.videoSrc} type="video/mp4"/>
								</video>
			   				</div>
				}
			}else{
				return null;
			}
	}

	const triggerDisplayElementPage=()=>{
		displayPostElementPage(postType,postId);
	}

	const triggerCloseModal=()=>{
		if(displayReplyModal==false){
			closeModal()
		}else{
			changeDisplayReplyModal(false);
		}
	}

	const submitReply=async({isAccessTokenUpdated,updatedAccessToken})=>{
		changeIsProcessingCommentPrompt(false);
		const reply=document.getElementById("replyValue").value;
		if(reply==""){
			alert('Please enter a reply');
		}else{
			const commentReply={
				postType,
				postId,
				commentId:commentID,
				reply,
				profileObject:{
					isPersonalProfile:true,
					profileId:personalInformation.id
				},
				accessToken:isAccessTokenUpdated==true?updatedAccessToken:
				personalInformation.accessToken
			}

			if(notificationType=="VideoComment"){
				const {confirmation,data}=await createVideoCommentReply(commentReply);
				if(confirmation=="Success"){
					alert('Success');
					changeDisplayReplyModal(false);
				}else{
					alert('Unfortunately there has been an error when submitting your reply. Please try again');
				}
			}else{
				const {confirmation,data}=await createReply(commentReply);
				if(confirmation=="Success"){
					alert('Success');
					changeDisplayReplyModal(false);
				}else{
					const {statusCode}=data;
					if(statusCode==401){
						await refreshTokenApiCallHandle(
								personalInformation.refreshToken,
								personalInformation.id,
								submitReply,
								dispatch,
								{},
								false
							);
					}else{
						alert('Unfortunately there has been an error when submitting your reply. Please try again');
					}
				}
			}
		}
		changeIsProcessingCommentPrompt(true);
	}
	const closeVideoDescriptionDisplayModal=()=>{
		changeVideoDescriptionDisplay(false);
	}
	const displayVideoDescriptionTrigger=()=>{
	 	changeVideoDescriptionDisplay(true);
	}	

	const nonPostNotificationDescription=()=>{
		if(notificationType=="Promotion"){
			return <p> The profile below has promoted you. Check them out :) </p>
		}else if(notificationType=="Recruit"){
			return <p> The profile below has recruited you. Check them out :) </p>
		}else{
			return <p> 
						The profile below has requested access to node:
						<b>  {data.nodeName}  </b>. 
						You have give them access on your profile :)
					</p>
		}
	}
						
	return createPortal(
		<>
			{displayVideoDescriptionDisplay==true &&(
				<VideoDescriptionMobileDisplayPortal
					targetDom={targetDom}
					closeModal={closeVideoDescriptionDisplayModal}
					videoUrl={notification.videoSrc}
				/>
			)}
			<Container>
				<div id="backButton" onClick={()=>triggerCloseModal()} style={BackButtonCSS}>
					Back
				</div>
				<Notification>

					{isLoading==true ?
						<p>Please wait..</p>:
						<>
							{notificationType=="Recruit" || notificationType=="Promotion" || notificationType=="RequestAccessToNode"?
								<div style={{display:"flex",flexDirection:"column"}}>
									{nonPostNotificationDescription()}
									
				   					<Link to={{pathname:`/profile/${notificationOwnerId}`}}>
					   					<div style={{display:"flex",flexDirection:"row",cursor:"pointer"}}>
											<img id="notificationRecruitOrPromotionProfilePicture" 
												src={notification[0].profilePicture==null?
													NoProfilePicture:notification[0].profilePicture}
												style={{width:"70px",height:"60px",borderRadius:"50%"}}/>
											<p style={{maxWidth:"30%",maxHeight:"20px",overflow:"hidden"}}>
												<b>{notification[0].firstName}</b>
											</p>
										</div>
				   					</Link>
				   				</div>
								:<React.Fragment>
									{notificationType=="BeaconResponse"?
										<BeaconNotifications
											postData={data}
											targetDom={targetDom}
										/>:
										<>
											{postUrlComponent()}
											<div style={{width:"70%",marginLeft:"2%"}}>
												{displayReplyModal==false? 
													<>
														<div id="viewPostButtonDIV" onClick={()=>triggerDisplayElementPage()} style={BackButtonCSS}>
															View Post
														</div>
														<hr/>
														<div style={{height:"40%",overflow:"scroll",marginTop:"10%",marginBottom:"10%"}}>
															{notificationTypeComponent()}
														</div>
														<hr/>
														{(notificationType=="RegularComment") &&(
															<div id="replyButtonDIV" onClick={()=>changeDisplayReplyModal(true)} style={BackButtonCSS}>
																Reply
															</div>
														)}
													</>:
													<>
														<p>
															<b>Reply to the comment here</b>
														</p>
														<hr/>
														<InputContainer id="replyValue" placeholder="Enter comment here"/>
														<hr/>
														{displayIsProcessingCommentPrompt==true? 
															<div id="submitButtonDIV" onClick={()=>submitReply({isAccessTokenUpdated:false})} style={BackButtonCSS}>
																Submit
															</div>
															:<p>Submitting... Please wait </p>
														}
													</>
												}
											</div>
										</>
									}
								</React.Fragment>
							}
						</>
					}
				</Notification>
			</Container>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
		</>
	,document.getElementById(targetDom))
}

export default ExtendedPostNotificationPortal;