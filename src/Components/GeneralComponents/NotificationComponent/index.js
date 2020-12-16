import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {getNotifications} from "../../../Actions/Requests/NotificationsRequests.js";
import StampIcon from "../../../designs/img/StampIcon.png";
import NoProfilePicture from "../../../designs/img/NoProfilePicture.png";
import ExtendedPostNotificationPortal from "./ExtendedPostNotification/index.js";

const Container=styled.div`
	position:fixed;
	width:25%;
	height:50%;
	background-color:white;
	z-index:45;
	overflow:scroll;
	top:20%;
	border-radius:5px;
	left:40%;
	display:flex;
	flex-direction: column;
	padding:30px;

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
		overflow:scroll !important;
	}
`;


const NotificationContainer=styled.div`
	display:flex;
	flex-direction:row;
	cursor:pointer;
`;

const PostContainer=styled.div`
	display:flex;
	flex-direction:row;
	border-style:solid;
	border-color:#F2F2F2;
	border-radius:5px;
	padding:10px;
	margin-bottom:2%;
	cursor:pointer;
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

const SelectedFilterContainer=styled.div`
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

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0"
}

const Notification=({targetDom,closeModal,userId})=>{
	const [isLoading,changeIsLoading]=useState(true);
	const [notifications,changeNotifications]=useState();
	const [currentFilterdNotifications,changeCurrentFilterNotifications]=useState();
	const [currentSelectedType,changeCurrentSelectedType]=useState("Everything");

	const [postSpecificNotifications,changePostSpecificNotifications]=useState();
	const [displayExtendedPostNotification,changeDisplayExtendedPostNotification]=useState(false);
	const [extendedNotificationData,changeExtendedNotificationData]=useState();

	const [postIdUrl,changePostIdUrl]=useState();
	const [postId,changePostId]=useState();

	useEffect(()=>{
		const fetchData=async()=>{
			const {confirmation,data}=await getNotifications(userId);
			if(confirmation=="Success"){
				debugger;
				changeCurrentFilterNotifications([...data]);
				changeNotifications([...data]);
				changeIsLoading(false);
			}else{
				alert('Unfortunately there has been an error getting your notifications. Please try again');
				closeModal();
			}
		}
		fetchData();
	},[]);

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const postUrlContruct=(postType,postUrl)=>{
		if(postType=="Images" || postType=="Blogs"){
			return <img src={postUrl} style={{width:"60px",height:"60px"}}/>
		}else{
			return <video key={uuidv4()} objectFit="cover" position="absolute" width="60px" top="0px" height="60px" borderRadius="50%">
						<source src={postUrl} type="video/mp4"/>
				   </video>
		}
	}

	const displayPostSpecificNotifications=(data)=>{
		changePostSpecificNotifications({...data});
	}

	const createPostUrl=(postType,postUrl,isAudioPost)=>{
		return(
			<div>
				{(postType=="Images" || postType=="Videos" || postType=="Blogs")==true?
					<p>{postUrlContruct(postType,postUrl)}</p>:
					<>
						{isAudioPost==true?
							<audio style={{width:"50px"}} key={this.uuidv4()} controls>
							  <source src={postUrl} type="audio/ogg"/>
							  <source src={postUrl} type="audio/mpeg"/>
							Your browser does not support the audio element.
							</audio>:
							<p style={{color:"#A4A4A4",width:"70px",overflow:"hidden"}}>{postUrl}</p>
						}
					</>
				}
			</div>
		)
	}

	const constructPost=(data)=>{
		const {postType,post,postUrl,isAudioPost}=data;
		return(
			<PostContainer onClick={()=>displayPostSpecificNotifications(data)}>
				{createPostUrl(postType,postUrl,isAudioPost)}
				<p style={{marginLeft:"2%"}}>
					<b>{post.length}</b> new notifications for this post
				</p>
			</PostContainer>
		)
	}

	const filterNotifications=(filterSelection)=>{}

	const triggerDisplayExtendedNotification=(data,postUrl,postId)=>{
		debugger;
		changePostId(postId);
		changePostIdUrl(postUrl);
		changeExtendedNotificationData({...data});
		changeDisplayExtendedPostNotification(true);
	}

	const constructSelectedPostNotifications=()=>{
		debugger;
		const {postType,post,postUrl,isAudioPost,_id}=postSpecificNotifications;
		const stampCounter=0;
		const authenticationCounter=0;
		return(
			<>
				{createPostUrl(postType,postUrl,isAudioPost)}
				<hr style={HorizontalLineCSS}/>
				{post.map(data=>
					<>
						<NotificationContainer onClick={()=>triggerDisplayExtendedNotification(data,postUrl,_id)}>
							{data.notificationType=="Stamp" &&(
								<>
									<img src={StampIcon} style={{height:"20px",width:"20px"}}/>
									<p>Congrats you posted has been stamped	</p>
								</>
							)}
							{data.notificationType=="RegularComment" &&(
								<>
									<img src={data.owner.profilePicture==null?NoProfilePicture:data.owner.profilePicture} style={{borderRadius:"50%",height:"30px",width:"30px"}}/>
									<p>{data.owner.firstName} has added a comment</p>
								</>
							)}
							{data.notificationType=="VideoComment" &&(
								<>
									<img src={data.owner.profilePicture==null?NoProfilePicture:data.owner.profilePicture}
									 style={{borderRadius:"50%",height:"30px",width:"30px"}}/>
									<p>{data.owner.firstName} has added a video comment</p>
								</>
							)}

							{data.notificationType=="RegularReply" &&(
								<>
									<img src={data.owner.profilePicture==null?NoProfilePicture:data.owner.profilePicture}
									 style={{borderRadius:"50%",height:"30px",width:"30px"}}/>
									<p>{data.owner.firstName} has commented on your video reply</p>
								</>
							)}

							{data.notificationType=="VideoCommentReply" &&(
								<>
									<img src={data.owner.profilePicture==null?NoProfilePicture:data.owner.profilePicture}
									 style={{borderRadius:"50%",height:"30px",width:"30px"}}/>
									<p>{data.owner.firstName} has commented on your video reply</p>
								</>
							)}
							{data.notificationType=="AuthenticPost" &&(
								<>
									<img src={StampIcon} style={{height:"20px",width:"20px"}}/>
									<p>Congrats you posted has authenticated by someone (View message)</p>
								</>
							)}
						</NotificationContainer>
						<hr style={HorizontalLineCSS}/>
					</>
				)}
			</>
		)
	}

	const closeExtendedPostNotificationPortal=()=>{
		changeDisplayExtendedPostNotification(false);
	}

	return createPortal(
		<>
			{displayExtendedPostNotification==true &&(
				<ExtendedPostNotificationPortal
					targetDom={targetDom}
					closeModal={closeExtendedPostNotificationPortal}
					data={extendedNotificationData}
					headerUrl={postIdUrl}
					postId={postId}
				/>
			)}
			<Container>
				{isLoading==true?
					<p> Loading.... please wait </p>
					:<>
						{postSpecificNotifications!=null?
							<>
								<p onClick={()=>changePostSpecificNotifications(null)}
									style={ButtonCSS}>
									Back
								</p>
								<hr style={HorizontalLineCSS}/>
								{constructSelectedPostNotifications()}
							</>
							:
							<>
								<p style={{fontSize:"20px"}}>
								<b>Notifications</b>
								</p>
								<hr style={HorizontalLineCSS}/>
								<SelectedFilterContainer>
									<div class="dropdown">
										<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={ButtonCSS}>
											Everything
										    <span class="caret"></span>
										</button>
										<ul class="dropdown-menu">
											<li onClick={()=>filterNotifications("Stamps")}><a href="javascript:void(0);">Stamps</a></li>
											<li onClick={()=>filterNotifications("VideoCommentReply")}><a href="javascript:void(0);">Video Comments</a></li>
											<li onClick={()=>filterNotifications("RegularReply")}><a href="javascript:void(0);">Replies</a></li>
											<li onClick={()=>filterNotifications("AuthenticPost")}><a href="javascript:void(0);">Authentic Posts</a></li>
											<li onClick={()=>filterNotifications("AudioResponse")}><a href="javascript:void(0);">Audio Response</a></li>
										</ul>
									</div>
									<p style={{marginLeft:"2%"}}>Selected Filter: <b>{currentSelectedType}</b> </p>
								</SelectedFilterContainer>
								<hr style={HorizontalLineCSS}/>
								{currentFilterdNotifications.map(data=>
									<>{constructPost(data)}</>
								)}
							</>
						}
					</>
			}
			</Container>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
		</>
	,document.getElementById(targetDom))
}

export default Notification;