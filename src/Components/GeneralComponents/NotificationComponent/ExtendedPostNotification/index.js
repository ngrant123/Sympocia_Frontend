import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";



const Container=styled.div`
	position:fixed;
	width:40%;
	height:50%;
	background-color:white;
	z-index:45;
	overflow:scroll;
	top:20%;
	border-radius:5px;
	left:25%;
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


const ExtendedPostNotificationPortal=({targetDom,closeModal,data,headerPostUrl})=>{
	const {notificationType,postType}=data;

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const postUrlComponent=()=>{
		if(postType=="Images" || postType=="Blogs"){
			return <img src={headerPostUrl} style={{width:"60px",height:"60px"}}/>
		}else if(postType=="Videos"){
			return <video key={uuidv4()} objectFit="cover" position="absolute" width="60px" top="0px" height="60px" borderRadius="50%">
						<source src={headerPostUrl} type="video/mp4"/>
				   </video>
		}else{
			return (
				<>
					{headerPostUrl!=null?
						<audio style={{width:"50px"}} key={this.uuidv4()} controls>
						  <source src={headerPostUrl} type="audio/ogg"/>
						  <source src={headerPostUrl} type="audio/mpeg"/>
						Your browser does not support the audio element.
						</audio>:
						<p style={{color:"#A4A4A4",width:"70px",overflow:"hidden"}}>{postSubmitted}</p>
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
					<p>comment</p>
				)
			}else{
				<video key={uuidv4()} objectFit="cover" position="absolute" width="60px" top="0px" height="60px" borderRadius="50%">
					<source src={postUrl} type="video/mp4"/>
			   </video>
			}
		}else{
			return null;
		}
	}

	return createPortal(
		<>
			<Container>
				<div onClick={()=>closeModal()} style={ButtonCSS}>Back</div>
				<Notification>
					{postUrlComponent()}
					<div>
						<div style={ButtonCSS}>
							View Post
						</div>

						{notificationTypeComponent()}
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
	,document.getElmentById(targetDom))
}

export default ExtendedPostNotificationPortal;