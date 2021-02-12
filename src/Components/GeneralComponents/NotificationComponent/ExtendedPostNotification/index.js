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

import {
	createReply,
	createVideoCommentReply
} from "../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {useSelector,useDispatch} from "react-redux";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import {refreshTokenApiCallHandle} from "../../../../Actions/Tasks/index.js";

const Container=styled.div`
	position:fixed;
	width:60%;
	height:55%;
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
			height:55px !important
		}
	}

	@media screen and (max-width:740px){
		flex-direction:column;
		#viewPostButtonDIV{
			margin-top:5%;
			width:70% !important;
		}
		#regularCommentAndAuthenticationProfilePicture{
			width:30% !important;
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
    }

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	#regularCommentAndAuthenticationProfilePicture{
			width:15% !important;
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
	const {notificationType,postType,commentID,replyId}=data;
	const [notification,changeNotification]=useState();
	const [isLoading,changeIsLoading]=useState(true);
	const [displayReplyModal,changeDisplayReplyModal]=useState(false);
	const [displayIsProcessingCommentPrompt,changeIsProcessingCommentPrompt]=useState(true);

	const dispatch=useDispatch();
	const personalInformation=useSelector(state=>state.personalInformation);

	useEffect(()=>{
		const fetchData=async()=>{
			
			let confirmationResponse;
			let dataResponse;
			

			if(notificationType!="Stamp"){
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

				}else{
					const {confirmation,data}=await getRegularCommentReplyById({postType,postId,commentID,replyId});
					confirmationResponse=confirmation;
					dataResponse=data;
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
			return <img src={headerUrl} style={{width:"50%",height:"70%"}}/>
		}else if(postType=="Videos"){
			return <video id="videoPostComponent" key={uuidv4()} objectFit="cover"
						 position="absolute" width="50%" top="0px" height="70%" borderRadius="50%" controls>
						<source src={headerUrl} type="video/mp4"/>
				   </video>
		}else{
			return (
				<div style={RegularPostDivCSS}>
					{isPostAudio!=null?
						<audio style={{width:"50px"}} key={uuidv4()} controls>
						  <source src={headerUrl} type="audio/ogg"/>
						  <source src={headerUrl} type="audio/mpeg"/>
							Your browser does not support the audio element.
						</audio>:
						<p style={{color:"#A4A4A4",overflow:"hidden"}}>{headerUrl}</p>
					}
				</div>
			)
		}
	}

	const notificationTypeComponent=()=>{
		
			if(notificationType!="Stamp"){
				if(notificationType=="RegularComment" || notificationType=="AuthenticPost"){
					return(
						<RegularCommentAndAuthenticationContaienr>
							<div style={{display:"flex",flexDirection:"row"}}>
								<img id="regularCommentAndAuthenticationProfilePicture" src={notification.profilePicture==null?
									NoProfilePicture:notification.profilePicture}
									style={{width:"10%",height:"40px",borderRadius:"50%"}}/>
								<p style={{maxWidth:"30%",maxHeight:"20px",overflow:"hidden"}}>
									<b>{notification.firstName}</b>
								</p>
							</div>
							<p>{notification.comment}</p>
						</RegularCommentAndAuthenticationContaienr>
					)
				}else if(notificationType=="VideoCommentReply"){
					return(
						<div>
							<VideoCommentReplyContainer>
								<p style={{marginRight:"2%"}}>Your video comment:</p>
								<video key={uuidv4()} width="25%" height="25%" autoplay="true" muted controls>
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
			   					<div style={{display:"flex",flexDirection:"row"}}>
									<img id="regularCommentAndAuthenticationProfilePicture" 
										src={notification.ownerObject.profilePicture==null?
											NoProfilePicture:notification.ownerObject.profilePicture}
										style={{width:"10%",height:"10%",borderRadius:"50%"}}/>
									<p style={{maxWidth:"30%",maxHeight:"20px",overflow:"hidden"}}>
										<b>{notification.ownerObject.owner.firstName}</b>
									</p>
								</div>
				   				<video key={uuidv4()} width="60%" height="100%" autoplay="true" muted controls>
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
						
	return createPortal(
		<>
			<Container>
				<div onClick={()=>triggerCloseModal()} style={BackButtonCSS}>
					Back
				</div>
				<Notification>
					{postUrlComponent()}
					<div style={{width:"70%",marginLeft:"2%"}}>
						{displayReplyModal==false? 
							<>
								<div id="viewPostButtonDIV" onClick={()=>triggerDisplayElementPage()} style={BackButtonCSS}>
									View Post
								</div>
								<hr/>
								{isLoading==true ?
									<p>Loading please wait </p>:
									<div style={{height:"40%",overflow:"scroll",marginTop:"10%",marginBottom:"10%"}}>
										{notificationTypeComponent()}
									</div>
								}
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
				</Notification>
			</Container>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
		</>
	,document.getElementById(targetDom))
}

export default ExtendedPostNotificationPortal;