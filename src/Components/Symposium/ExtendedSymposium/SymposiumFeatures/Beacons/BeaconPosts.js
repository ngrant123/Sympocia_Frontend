import React,{useState} from "react";
import styled from "styled-components";
import TestImage from "../../../../../designs/postimages/Notcameraactivated.png";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import {deleteBeaconReply} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";
import {useSelector,useDispatch} from "react-redux";
import VideoLoadingPrompt from "../../../../GeneralComponents/PostComponent/VideoLoadingPrompt.js";

const Container=styled.div`
	margin-top:5%;
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;

	@media screen and (max-width:650px){
		#image{
			width:100% !important;
			height:90px !important;
		}
		#postOwnerInformation{
			display:none !important;
		}
		#videoElement{
			height:150px !important;
		}
	}

`;

const ProfileInformation=styled.div`
	display:flex;
	flex-direction:row;
	margin-top:2%;
	justify-content:cetner;
	align-items:center;
`;

const ImageContainer=styled.div`
	width:140px;
	height:130px;
	border-radius:5px;

	${({acceptedAnswerStatus})=>
		acceptedAnswerStatus==true &&(
			`
				border-left-style:solid;
				border-bottom-style:solid;
				border-width:5px;
				border-color:#43D351;
			`
		)}
	}

	@media screen and (max-width:650px){
		width:95px !important;
		height:90px !important;
	}	

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		height:130px !important;
		width:135px !important;
	}
`;

const VideoContainer=styled.div`	
	width:100%;
	height:150px;
	border-radius:5px;


	${({acceptedAnswerStatus})=>
		acceptedAnswerStatus==true &&(
			`
				border-left-style:solid;
				border-bottom-style:solid;
				border-width:5px;
				border-color:#43D351;
			`
		)}
	}

	@media screen and (max-width:650px){
		#videoElement{
			height:150px !important;
		}
	}
`;


const TextPostContainer=styled.div`
	cursor:pointer;
	padding:5px;
	border-radius:5px;

	${({acceptedAnswerStatus})=>
		acceptedAnswerStatus==true &&(
			`
				border-style:solid;
				border-style:solid;
				border-width:1px;
				border-color:#43D351;
			`
		)}
	}
`;

const OwnerNameCSS={
	marginLeft:"2%",
	color:"#ADADAD",
	maxHeight:"20px",
	maxWidth:"30%",
	overflow:"hidden"
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
	marginTop:"5%"
}

const BeaconPosts=({
				postType,
				posts,
				displayExtendedPostModal,
				triggerAlterPosts,
				endOfNewPosts,
				isFetchingNextPosts,
				isReplyBeacons,
				isOligarch,
				symposiumId,
				beaconId,
				beaconOwnerId,
				originalBeaconPostId
			})=>{
	const [currentPost,changePosts]=useState([...posts]);
	const dispatch=useDispatch();
	const personalInformation=useSelector(state=>state.personalInformation);
	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}


	const deleteBeaconCommentIcon=()=>{
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

	const triggerDeleteBeaconComment=async({
		replyBeaconId,
		index,
		isAccessTokenUpdated,
		updatedAccessToken,
		postRef})=>{

		const {confirmation,data}=await deleteBeaconReply({
			symposiumId,
			beaconId,
			replyBeaconId,
			originalBeaconPostId,
			replyPostRefId:postRef,
			beaconType:postType,
			ownerId:personalInformation.id,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
			personalInformation.accessToken
		})
		if(confirmation=="Success"){
			currentPost.splice(index,1);
			changePosts([...currentPost])
		}else{
			const {statusCode}=data;
			if(statusCode==401){
			await refreshTokenApiCallHandle(
					personalInformation.refreshToken,
					personalInformation.id,
					triggerDeleteBeaconComment,
					dispatch,
					{
						replyBeaconId,
						index,
						postRef
					},
					false
				);
			}
		}
	}


	const postsDecider=()=>{
		switch(postType){
			case "Images":{
				return(
					<React.Fragment>
						{currentPost.map((data,index)=>
							<div style={{marginRight:"3%",width:"30%",marginBottom:"10%"}}>
								<div onClick={()=>displayExtendedPostModal(data,index)}
									style={{cursor:"pointer"}}>	
									<ImageContainer acceptedAnswerStatus={data.acceptedAnswerStatus}>
										<img src={data.imgUrl} 
											style={{position:"relative",width:"100%",height:"100%",borderRadius:"5px"}}
										/>
									</ImageContainer>
									<div id="postOwnerInformation">
										<ProfileInformation>
											<img src={data.owner.profilePicture==null?
														NoProfilePicture:data.owner.profilePicture}
												style={{
													width:"45px",
													height:"40px",
													borderRadius:"50%"
												}}/>
											<p style={OwnerNameCSS}>
												{data.owner.firstName}
											</p>
										</ProfileInformation>
										<p style={{width:"100%",height:"40px",overflow:"hidden",marginTop:"5%"}}>
											<b>
												{data.caption}
											</b>
										</p>
									</div>
								</div>
								{isReplyBeacons==true &&(
									<React.Fragment>
										{(isOligarch==true || 
											data.owner._id==personalInformation.id
											|| beaconOwnerId==personalInformation.id)==true &&(
											<div onClick={()=>triggerDeleteBeaconComment({
												replyBeaconId:data.beaconId,
												postRef:data._id,
												index,
												isAccessTokenUpdated:false,
											})}>
												{deleteBeaconCommentIcon()}
											</div>	
										)}
									</React.Fragment>
								)}
							</div>
						)}
					</React.Fragment>
				)
				break;
			}
			case "Videos":{
				return(
					<React.Fragment>
						{currentPost.map((data,index)=>
							<div style={{display:"flex",flexDirection:"column",marginRight:"3%",width:"30%",marginBottom:"15%"}}>
								<div onClick={()=>displayExtendedPostModal(data,index)} 
									style={{cursor:"pointer"}}>
									<VideoContainer acceptedAnswerStatus={data.acceptedAnswerStatus}>
										<VideoLoadingPrompt
											videoElement={
												<video id={"videoElement"+index}
													style={{borderRadius:"5px",backgroundColor:"#151515",cursor:"pointer"}}
													 position="relative" width="100%" height="100%"
												 	key={data.videoUrl} autoPlay loop autoBuffer muted playsInline>
													<source src={data.videoUrl} type="video/mp4"/>
												</video>
											}
											videoId={"videoElement"+index}
										/>
									</VideoContainer>
									<div id="postOwnerInformation">
										<ProfileInformation>
											<img src={data.owner.profilePicture==null?
													NoProfilePicture:
													data.owner.profilePicture
												} style={{
																		width:"45px",
																		height:"40px",
																		borderRadius:"50%"
																	}}/>
											<p style={OwnerNameCSS}>
												{data.owner.firstName}
											</p>
										</ProfileInformation>
										<p style={{width:"100%",height:"40px",overflow:"hidden",marginTop:"5%"}}>
											<b>
												{data.title}
											</b>
										</p>
									</div>	
								</div>
								{(isReplyBeacons==true && (isOligarch==true ||
								 	data.owner._id==personalInformation.id
								 	|| beaconOwnerId==personalInformation.id))==true &&(
									<div onClick={()=>triggerDeleteBeaconComment({
										replyBeaconId:data.beaconId,
										postRef:data._id,
										index,
										isAccessTokenUpdated:false,
									})}>
										{deleteBeaconCommentIcon()}
									</div>
								)}
							</div>
						)}
					</React.Fragment>
				)
				break;
			}
			case "Regular":{
				return(
					<React.Fragment>
						{currentPost.map((data,index)=>
							<div style={{marginRight:"3%",width:"100%",marginBottom:"5%"}}>
								<TextPostContainer onClick={()=>displayExtendedPostModal(data,index)}
									acceptedAnswerStatus={data.acceptedAnswerStatus}>
									<p style={{width:"100%",height:"40px",overflow:"hidden",marginTop:"5%"}}>
										<b>
											{data.post}
										</b>
									</p>
									<ProfileInformation>
										<img src={data.owner.profilePicture==null?
													NoProfilePicture:
													data.owner.profilePicture
												} style={{
																	width:"45px",
																	height:"40px",
																	borderRadius:"50%"
																}}/>
										<p style={OwnerNameCSS}>
											{data.owner.firstName}
										</p>
									</ProfileInformation>
								</TextPostContainer>
								{(isReplyBeacons==true && (isOligarch==true || 
									data.owner._id==personalInformation.id
									|| beaconOwnerId==personalInformation.id))==true &&(
									<div onClick={()=>triggerDeleteBeaconComment({
										replyBeaconId:data.beaconId,
										postRef:data._id,
										index,
										isAccessTokenUpdated:false,
									})}>
										{deleteBeaconCommentIcon()}
									</div>
								)}
							</div>
						)}
					</React.Fragment>
				)
				break;
			}
		}

	}
	return(
		<Container>
			{currentPost.length==0?
				<p>No beacons :(</p>:
				<React.Fragment>
					{postsDecider()}
					{endOfNewPosts==false &&(
						<>
							{isFetchingNextPosts==true?
								<p>Loading...</p>:
								<p onClick={()=>triggerAlterPosts(postType)} 
									style={{cursor:"pointer",color:"#5298F8"}}>
									Next
								</p>
							}
						</>
					)}
				</React.Fragment>
			}
		</Container>
	)
}

export default BeaconPosts;