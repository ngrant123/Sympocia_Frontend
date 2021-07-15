import React,{useState} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {deleteBeacon} from "../../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {refreshTokenApiCallHandle} from "../../../../../../Actions/Tasks/index.js";
import {useSelector,useDispatch} from "react-redux";

import {Link} from "react-router-dom";

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
	maxHeight:"20px",
	maxWidth:"30%",
	overflow:"hidden"
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

const SelectedPost=({
		post,
		postType,
		displayZoomedPost,
		enableCreationPost,
		isOligarch,
		originalBeaconOwnerId,
		fetchReplies,
		deleteBeaconPost,
		symposiumId,
		beaconId,
		isReplyBeacon
	})=>{
	console.log(isOligarch);
	const [beaconOptionsDropDownModal,changeBeaconOptionsModal]=useState(false);
	const dispatch=useDispatch();
	const personalInformation=useSelector(state=>state.personalInformation);

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
						<video id="uploadVideoUrl" onClick={()=>displayZoomedPost()}
							style={{borderRadius:"5px",backgroundColor:"#151515",cursor:"pointer"}}
							width="100%" height="20%" 
						 	key={post.videoUrl}  autoPlay loop autoBuffer muted playsInline>
							<source src={post.videoUrl} type="video/mp4"/>
						</video>
						<p style={{marginTop:"5%"}}>{post.title}</p>
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
							{(isOligarch==true || originalBeaconOwnerId==personalInformation.id)==true &&(
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
	return(
		<React.Fragment>
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
			<hr style={HorizontalLineCSS}/>
		</React.Fragment>
	)
}

export default SelectedPost;
