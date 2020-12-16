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

const Container=styled.div`
	position:fixed;
	width:60%;
	height:55%;
	background-color:white;
	z-index:45;
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
	z-index:40;
	top:0px;
	left:-2%;
`;

const Notification=styled.div`
	display:flex;
	flex-direction:row;
	margin-top:2%;
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

const BackButtonCSS={
	...ButtonCSS,
	width:"20%"
}


const ExtendedPostNotificationPortal=({targetDom,closeModal,data,headerUrl,postId})=>{
	const {notificationType,postType,commentID}=data;
	const [notification,changeNotification]=useState();
	const [isLoading,changeIsLoading]=useState(true);

	useEffect(()=>{
		const fetchData=async()=>{
			console.log(data);
			if(notificationType=="RegularComment"){
				const {confirmation,data}=await getCommentByID({postType,commentId:commentID,postId});
				if(confirmation=="Success"){
					changeNotification({...data});
				}else{
					alert('Unfortunately there has been an error when trying to retrive this notification. Please try again');
				}
			}else if(notificationType=="VideoComment"){
				const {confirmation,data}=await getVideoCommentById({postType,commentID,postId});
			}else if(notificationType=="AuthenticPost"){

			}else{

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
			return <video key={uuidv4()} objectFit="cover" position="absolute" width="50%" top="0px" height="70%" borderRadius="50%">
						<source src={headerUrl} type="video/mp4"/>
				   </video>
		}else{
			return (
				<>
					{headerUrl!=null?
						<audio style={{width:"50px"}} key={this.uuidv4()} controls>
						  <source src={headerUrl} type="audio/ogg"/>
						  <source src={headerUrl} type="audio/mpeg"/>
						Your browser does not support the audio element.
						</audio>:
						<p style={{color:"#A4A4A4",width:"70px",overflow:"hidden"}}>{headerUrl}</p>
					}
				</>
			)
		}
	}

	const notificationTypeComponent=()=>{
			if(notificationType!="Stamp"){
				if(notificationType=="RegularComment" || notificationType=="AuthenticPost" || notificationType=="AuthenticPost"
					|| notificationType=="VideoCommentReply"){
					return(
						<>
							{notificationType=="RegularComment" &&(
								<p>{notification.comment}</p>
							)}
						</>
					)
				}else{
					<video key={uuidv4()} objectFit="cover" position="absolute" width="60px" top="0px" height="60px" borderRadius="50%">
						<source src={notification.videoSrc} type="video/mp4"/>
				   </video>
				}
			}else{
				return null;
			}
	}
						
	return createPortal(
		<>
			<Container>
				<div onClick={()=>closeModal()} style={BackButtonCSS}>
					Back
				</div>
				<Notification>
					{postUrlComponent()}
					<div>
						<div style={ButtonCSS}>
							View Post
						</div>
						<hr/>
						{isLoading==true ?
							<p>Loading please wait </p>:
							<div style={{height:"20%",overflow:"scroll",marginTop:"10%",marginBottom:"10%"}}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
						}
						<hr/>
						<div style={ButtonCSS}>
							Reply
						</div>
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