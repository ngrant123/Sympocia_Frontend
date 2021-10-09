import React,{useState,useEffect} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {deleteBeacon} from "../../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {refreshTokenApiCallHandle} from "../../../../../../Actions/Tasks/index.js";
import {useSelector,useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import ZoomedPostImageOrVideoPortal from "../../../../../GeneralComponents/PostComponent/ZoomedInPostImageOrVideo.js";
import {
	getVideoUrl
} from "../../../../../../Actions/Requests/PostAxiosRequests/PostPageGetRequests.js";
import {
	updateBeaconsAcceptedAnswerStatus
} from "../../../../../../Actions/Requests/SymposiumRequests/SymposiumAdapter.js";
import AcceptedBeaconIcon from "../../../../../../designs/img/StampIcon.png";
import UnAcceptedBeaconIcon from "../../../../../../designs/img/UnStampIcon.png";

const SelectedPostContainer=styled.div`
	position:relative; 
	padding:20px;
	@media screen and (max-width:650px){
		#uploadVideoUrl{
			height:80% !important;
		}
	}
`;

const BeaconOptionsContainer=styled.div`
	position:fixed;
	left:47%;
	top:40%;
	width:20%;
	height:40%;
	background-color:white;
	z-index:30;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#9D9D9D;
	padding:15px;
	box-shadow: 1px 1px 5px #C1C1C1;

	@media screen and (max-width:1370px){
		width:40%;
		top:35%;
	}

	@media screen and (max-width:650px){
		height:60%;
		overflow-y:scroll;
		left:5%;
		width:50%;
		top:25%;
	}
`;

const ShadowContainer=styled.div`
	position:fixed;
	width:200%;
	height:100%;
	z-index:29;
	background-color: rgba(0,0,0,0);
	top:0px;
	left:-50%;
`;

const OwnerNameCSS={
	marginLeft:"2%",
	color:"#ADADAD",
	maxHeight:"20px"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0"
}

const ImageCSS={
	cursor:"pointer",
	width:"260px",
	height:"220px",
	borderRadius:"5px",
	marginBottom:"2%"
}

const BeaconAcceptionButtonCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderRadius:"5px",
	borderColor:"#ECECEC",
	display:"flex",
	flexDirection:"row",
	alignItems:"center",
	padding:"5px",
	width:"50%",
	cursor:"pointer"
}

const SelectedPost=({
		post,
		postType,
		enableCreationPost,
		isOligarch,
		beaconOwnerId,
		fetchReplies,
		deleteBeaconPost,
		symposiumId,
		beaconId,
		isReplyBeacon,
		acceptedStatus,
		originalBeaconId,
		targetDom,
		originalBeaconOwnerId,
		updateBeaconUpdatedStatus
	})=>{
	const [beaconOptionsDropDownModal,changeBeaconOptionsModal]=useState(false);
	const dispatch=useDispatch();
	const personalInformation=useSelector(state=>state.personalInformation);
	const [displayZoomedInPostPortal,changeDisplayZoomedInPostPortal]=useState(false);
	const [isLoadingUnCompressedPost,changeIsLoadingUnCompressedPost]=useState(false);
	const [selectedPostUrl,changeSelectedPostUrl]=useState(post.videoUrl);
	const [beaconAcceptedStatus,changeBeaconAcceptedStatus]=useState(acceptedStatus);


	useEffect(()=>{
		const fetchData=async()=>{
			if(post.videoUrlKey!=null){
				let postData;
				changeIsLoadingUnCompressedPost(true);
				if(postType=="Videos"){
					postData=await getVideoUrl(post.videoUrlKey);
				}
				const {confirmation,data}=postData;
				if(confirmation=="Success"){
					const {message}=data;
					changeSelectedPostUrl(message);
				}else{
					alert('An error has occured when trying to retrieve this post');
				}
				changeIsLoadingUnCompressedPost(false);
			}
		}

		fetchData();
	},[post.videoUrlKey]);

	const displayZoomedPost=()=>{
		changeDisplayZoomedInPostPortal(true);
	}

	const closeZoomedInPostModal=()=>{
		changeDisplayZoomedInPostPortal(false);
	}

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const displayPost=()=>{
		switch(postType){
			case "Images":{
				return(
					<React.Fragment>
						<img src={post.imgUrl}
							onClick={()=>displayZoomedPost()}
							style={ImageCSS}
						/>
						<p>{post.caption}</p>
					</React.Fragment>
				)
				break;
			}
			case "Videos":{
				return(
					<div style={{display:"flex",flexDirection:"column"}}>
						{isLoadingUnCompressedPost==false?
							<React.Fragment>
								<video id="uploadVideoUrl" onClick={()=>displayZoomedPost()}
									style={{borderRadius:"5px",backgroundColor:"#151515",cursor:"pointer"}}
									width="100%" height="20%" 
								 	key={selectedPostUrl}  autoPlay loop autoBuffer muted playsInline>
									<source src={selectedPostUrl} type="video/mp4"/>
								</video>
								<p style={{marginTop:"5%"}}>{post.title}</p>
							</React.Fragment>:
							<p>Loading...</p>
						}
					</div>
				)
				break;
			}
			case "Regular":{
				return(
					<p>{post.post}</p>
				)
			}
		}
	}


	const triggerBeaconDeletion=async({isAccessTokenUpdated,updatedAccessToken})=>{
		const {confirmation,data}=await deleteBeacon({
			symposiumId,
			beaconId,
			beaconType:postType,
			ownerId:personalInformation.id,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
			personalInformation.accessToken
		});
		if(confirmation=="Success"){
			deleteBeaconPost();
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
					personalInformation.refreshToken,
					personalInformation.id,
					triggerBeaconDeletion,
					dispatch,
					{},
					false
				);
			}
		}
	}

	const beaconsDropDownModal=()=>{
		return(
			<React.Fragment>
				{beaconOptionsDropDownModal==true &&(
					<React.Fragment>
						<BeaconOptionsContainer>
							<div style={{cursor:"pointer"}} onClick={()=>enableCreationPost()}>
								Create Response to Beacon
							</div>
							<hr/>
							<div style={{cursor:"pointer"}} onClick={()=>fetchReplies()}>
								View Replies
							</div>
							<hr/>
							{(isOligarch==true || beaconOwnerId==personalInformation.id)==true &&(
								<div style={{cursor:"pointer"}} 
									onClick={()=>triggerBeaconDeletion({isAccessTokenUpdated:false})}>
									Delete Beacon
								</div>
							)}
						</BeaconOptionsContainer>
						<ShadowContainer onClick={()=>changeBeaconOptionsModal(false)}/>	
					</React.Fragment>
				)}
			</React.Fragment>
		)
	}

	const triggerBeaconAcceptedStatusUpdate=async()=>{
		const updateStatusInformation={
			beaconId:originalBeaconId,
			acceptedAnswerStatus:!beaconAcceptedStatus,
			postType,
			acceptedAnswerBeaconId:beaconId,
			postId:post._id,
			acceptedAnswerOwnerId:beaconOwnerId,
			symposiumId
		}
		const {confirmation,data}=await updateBeaconsAcceptedAnswerStatus(updateStatusInformation);

		updateBeaconUpdatedStatus(originalBeaconId,!beaconAcceptedStatus);
		changeBeaconAcceptedStatus(!beaconAcceptedStatus);
		alert('Beacon has been accepted');
	}

	return(
		<React.Fragment>
			{displayZoomedInPostPortal==true &&(
				<ZoomedPostImageOrVideoPortal
					targetDom={targetDom}
					closeModal={closeZoomedInPostModal}
					postUrl={postType!="Images"?post.videoUrl:post.imgUrl}
					postType={postType}				
					unCompressedId={postType!="Images"?post.videoUrlKey:post.uncompressedImageId}
				/>
			)}
			<p>Click on the post to zoom in </p>
			<hr/>
			<SelectedPostContainer>
				{beaconsDropDownModal()}
				<div style={{display:"flex",flexDirection:"row",marginBottom:"2%",justifyContent:"space-between",alignItems:"center"}}>
					<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
						<Link to={{pathname:`/profile/${post.owner._id}`}}>
							<img src={post.owner.profilePicture==null?NoProfilePicture:
										post.owner.profilePicture} style={{
														width:"45px",
														height:"40px",
														borderRadius:"50%"
													}}/>
						</Link>
						<p style={OwnerNameCSS}>
							{post.owner.firstName}
						</p>
					</div>
					{isReplyBeacon==false &&(
						<ArrowDropDownCircleOutlinedIcon
							onClick={()=>changeBeaconOptionsModal(true)}
							style={{fontSize:"30",cursor:"pointer",color:"#6E6E6E"}}
						/>
					)}
				</div>
				<hr/>
				{displayPost()}
			</SelectedPostContainer>
			{originalBeaconId!=beaconId &&(
				<React.Fragment>
					<hr style={HorizontalLineCSS}/>


					{(isOligarch==true || originalBeaconOwnerId==personalInformation.id)==true &&(
						<div style={BeaconAcceptionButtonCSS} onClick={()=>triggerBeaconAcceptedStatusUpdate()}>
							<img src={beaconAcceptedStatus==true?AcceptedBeaconIcon:UnAcceptedBeaconIcon}
							 	style={{width:"60px",height:"60px"}}
							/>
							<p style={{marginLeft:"5%"}}>
								<b>{beaconAcceptedStatus==true?
									"UnAccept":"Accept"}</b>
							</p>
						</div>
					)}
				</React.Fragment>
			)}
		</React.Fragment>
	)
}

export default SelectedPost;
