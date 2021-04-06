import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {
		getNotifications,
		clearNewNotifications
	} from "../../../Actions/Requests/NotificationsRequests.js";
import StampIcon from "../../../designs/img/StampIcon.png";
import NoProfilePicture from "../../../designs/img/NoProfilePicture.png";
import ExtendedPostNotificationPortal from "./ExtendedPostNotification/index.js";
import {refreshToken} from "../../../Actions/Requests/JWTRequests.js"; 
import {refreshTokenApiCallHandle} from "../../../Actions/Tasks/index.js";
import {useSelector,useDispatch} from "react-redux";

const Container=styled.div`
	position:fixed;
	width:25%;
	height:50%;
	background-color:white;
	z-index:50;
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

	@media screen and (max-width:740px){
		#postContainerDiv{
			overflow:scroll;
			height:150px !important;
		}
	}
`;


const NotificationContainer=styled.div`
	position:relative;
	display:flex;
	flex-direction:row;
	cursor:pointer;
`;

const PostContainer=styled.div`
	display:flex;
	height:90%;
	flex-direction:column;

	@media screen and (max-width:740px){
		height:200% !important;
	}

`;
/*
	border-style:solid;
	border-color:#F2F2F2;
	border-radius:5px;
	padding:10px;
	margin-bottom:2%;
	cursor:pointer;
	@media screen and (max-width:740px){
		height:120px !important;
	}
*/


const ShadowContainer= styled.div`
	position:fixed;
	width:150%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:45;
	top:0px;
	left:-2%;
`;

const SelectedFilterContainer=styled.div`
	display:flex;
	flex-direction:row;
`;

const TitleContainer=styled.div`
	display:flex;
	flex-direction:row;
	align-items:center;
`;

const PostsCSS={
	borderStyle:"solid",
	borderColor:"#F2F2F2",
	borderRadius:"5px",
	padding:"10px",
	marginBottom:"2%",
	cursor:"pointer",
	display:"flex",
	flexDirection:"row",
	height:"50%",
	position:"relative"
}

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

let MobilePostOptionsButton={
    listStyle:"none",
    backgroundColor:"white",
    padding:"10px",
    color:"#6e6e6e",
    boxShadow:"1px 1px 5px #6e6e6e",
    borderRadius:"5px",
    borderStyle:"none",
    cursor:"pointer",
    marginLeft:"5%"
}


const Notification=({targetDom,closeModal,userId,history,tokens})=>{
	
	const [isLoading,changeIsLoading]=useState(true);
	const [notifications,changeNotifications]=useState();
	const [currentFilterdNotifications,changeCurrentFilterNotifications]=useState();
	const [currentSelectedType,changeCurrentSelectedType]=useState("Everything");

	const [postSpecificNotifications,changePostSpecificNotifications]=useState();
	const [displayExtendedPostNotification,changeDisplayExtendedPostNotification]=useState(false);
	const [extendedNotificationData,changeExtendedNotificationData]=useState();
	const [isPostAudio,changeIsPostAudio]=useState();
	const personalInformation=useSelector(state=>state.personalInformation);
	const dispatch=useDispatch();
	const [selectedNotificationType,changeSelectedNotificationType]=useState("Notifications");

	const [postIdUrl,changePostIdUrl]=useState();
	const [postId,changePostId]=useState();
	const {accessToken}=tokens;

	useEffect(()=>{
		const fetchData=async()=>{
			
			triggerGetNotifications({notificationsStatus:"New",isAccessTokenUpdated:false})
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
			return <video key={uuidv4()} autoPlay loop autoBuffer muted playsInline 
						objectFit="cover" width="60px" top="0px" height="60px" borderRadius="50%">
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
							<audio style={{width:"200px"}} key={uuidv4()} controls>
							  <source src={postUrl} type="audio/ogg"/>
							  <source src={postUrl} type="audio/mp4"/>
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
			<React.Fragment>
				{createPostUrl(postType,postUrl,isAudioPost)}
				<p style={{marginLeft:"2%"}}>
					<b>{post.length}</b> new notifications for this post
				</p>
			</React.Fragment>
		)
	}

	const filterNotifications=(filterSelection)=>{}

	const triggerDisplayExtendedNotification=(data,postUrl,postId,isAudioPost)=>{
		
		changePostId(postId);
		changePostIdUrl(postUrl);
		changeIsPostAudio(isAudioPost);
		changeExtendedNotificationData({...data});
		changeDisplayExtendedPostNotification(true);
	}

	const constructSelectedPostNotifications=()=>{
		
		const {postType,post,postUrl,isAudioPost,_id}=postSpecificNotifications;
		const stampCounter=0;
		const authenticationCounter=0;
		return(
			<>
				{createPostUrl(postType,postUrl,isAudioPost)}
				<hr style={HorizontalLineCSS}/>
				{post.map(data=>
					<>
						<NotificationContainer onClick={()=>triggerDisplayExtendedNotification(data,postUrl,_id,isAudioPost)}>
							{data.notificationType=="Stamp" &&(
								<>
									<img src={StampIcon} style={{height:"20px",width:"20px"}}/>
									<p>Congrats your posted has been stamped	</p>
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
									<p>{data.owner.firstName} has commented on your reply</p>
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

	const displayPostElementPage=(postType,postId)=>{
		if(postType=="Images"){
			history.push(`/image/${postId}`);
		}else if(postType=="Videos"){
			history.push(`/video/${postId}`);
		}else if(postType=="Blogs"){
			history.push(`/blog/${postId}`);
		}else{
			history.push(`/regularPost/${postId}`);
		}
	}


	const triggerGetNotifications=async({notificationsStatus,isAccessTokenUpdated,updatedAccessToken})=>{
		changeIsLoading(true);
		const {confirmation,data}=await getNotifications(
											userId,
											notificationsStatus,
											isAccessTokenUpdated==true?updatedAccessToken:
											personalInformation.accessToken);
		if(confirmation=="Success"){
			if(notificationsStatus=="New"){
				changeSelectedNotificationType("Notifications");
			}else{
				changeSelectedNotificationType("Previous");
			}
			
			const {message}=data;
			changeCurrentFilterNotifications([...message]);
			changeNotifications([...message]);
			changeIsLoading(false);
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				const {refreshToken}=tokens;
				await refreshTokenApiCallHandle(
						refreshToken,
						userId,
						triggerGetNotifications,
						dispatch,
						{
							notificationsStatus
						},
						false
					);
			}else{
				alert('Unfortunately there has been an error getting your notifications. Please try again');
				closeModal();
			}
		}
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
					displayPostElementPage={displayPostElementPage}
					isPostAudio={isPostAudio}
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
							:<>
								<TitleContainer>
									<div class="dropdown">
										<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={MobilePostOptionsButton}>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none",display:"inline-block"}}>
													<p>{selectedNotificationType}</p>
												</li>
												<li style={{listStyle:"none",display:"inline-block"}}>
													<span class="caret"></span>
												</li>
											</ul>
										</button>

										<ul class="dropdown-menu">
											<p onClick={()=>triggerGetNotifications({notificationsStatus:"New",isAccessTokenUpdated:false})}
												style={{cursor:"pointer"}}>
												Notifications
											</p>
											<p onClick={()=>triggerGetNotifications({notificationsStatus:"Previous",isAccessTokenUpdated:false})}
												style={{cursor:"pointer"}}>
												Previous Notifications
											</p>
										</ul>
									</div>
								</TitleContainer>

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
								<PostContainer>
									{currentFilterdNotifications.map(data=>
										<div id="postContainerDiv" style={PostsCSS}
											onClick={()=>displayPostSpecificNotifications(data)}>
											{constructPost(data)}
										</div>
									)}
								</PostContainer>
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