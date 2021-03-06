import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {
	editNodeInformation,
	requestAccessToNode
} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";

import {refreshTokenApiCallHandle} from "../../../../../../Actions/Tasks/index.js";
import {useSelector,useDispatch} from "react-redux";
import {
	recruitsLocatedInNode,
	profilesRequestedAccessToNodeFetch
} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {Link} from "react-router-dom";
import {getVideoUrl} from "../../../../../../Actions/Requests/PostAxiosRequests/PostPageGetRequests.js";
import ArrowCircleRightOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import NodeDesignOptions from "./NodeDesignOptions.js";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {
	disableScrolling,
	enableScrolling
} from "../../../../../../Actions/Tasks/DisableScrolling.js";
import VideoLoadingPrompt from "../../../../../GeneralComponents/PostComponent/VideoLoadingPrompt.js";

const Container=styled.div`
	position:fixed;
	width:40%;
	height:60%;
	background-color:white;
	z-index:36;
	top:20%;
	border-radius:5px;
	left:35%;
	overflow:auto;
	@media screen and (min-width:2500px){
		height:50%;
		width:50%;
		left:25%;
		padding:2%;

		#requestAccessButton{
			font-size:36px !important;
		}

		#editIcon{
			height:50px !important;
			width:50px !important;
		}

		#closeModalIcon{
			height:50px !important;
			width:50px !important;	
		}
		#viewProfiles{
			font-size:36px !important;
		}

		#profilePictureRecruit{
			width:150px !important;
			height:140px !important;
		}
		#name{
			font-size:36px !important;
		}
		#editScreenText{
			font-size:36px !important;
		}
	}


	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
	}

	@media screen and (max-width:550px){
		width:100% !important;
		left:0% !important;
		height:100% !important;
		top:0% !important;

		#nodeInformationVideoDescription{
			height:40% !important;
		}

		#nodeDesignUploadImageButton{
			width:60% !important;
		}
		#nodeInformationDropDownMenu{
			${({videoDescription})=>
				videoDescription!=null ?
				`
					margin-left:-120% !important;
					margin-top:-250px !important;
				`:
				`
					margin-left:-120% !important;
					margin-top:10px !important;
				`
			}
		}
	}
`;

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:36;
	top:0px;
`;

const NameTextArea=styled.textarea`
	width:100%;
	resize:none;
	@media screen and (min-width:2500px){
		font-size:36px !important;
	}
	border-style:solid;
	border-color:#E5E5E5;
	border-width:1px;
`;

const DescriptionTextArea=styled.textarea`
	width:100%;
	height:40%;
	resize:none;
	margin-bottom:5%;
	@media screen and (min-width:2500px){
		font-size:36px !important;
	}

	border-style:solid;
	border-color:#E5E5E5;
	padding:2px;
	border-width:1px;
`;


const ColorChoicesContainer=styled.div`
	display:flex;
	flex-direction:row;
	margin-bottom:5%;
`;
const ButtonCSS={
  listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  cursor:"pointer"
}


const ColorBlockCSS={
	height:"40px",
	width:"40px",
	borderRadius:"5px",
	marginRight:"2%",
	marginBottom:"2%",
	cursor:"pointer"
}

const RequestAccessButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  cursor:"pointer"
}

const DropDownCSS={
	borderRadius:"50%",
	boxShadow:"1px 1px 5px #dbdddf",
	cursor:"pointer"
}
	/*
		As of right now not sure if I'm going to be implementing the color scheme feature. Maybe in the future

		<p id="editScreenText" style={{marginBottom:"5%"}}>Select a color scheme:</p>
		<p id="noColorScheme" style={{cursor:"pointer"}}
			onClick={()=>changeSelectedColorCodeHandle(null)}
		>None</p>
		<ColorChoicesContainer>
			{colorCodes.map((data,index)=>
				<div id={`colorCode-${index}`} style={{...ColorBlockCSS,backgroundColor:data}}
					onClick={()=>changeSelectedColorCodeHandle(data,index)}
				/>
			)}
			
		</ColorChoicesContainer>
	*/


const NodeInformationPortal=({
	isOwner,
	userId,
	nodeInformation,
	closeModal,
	updateNode,
	isGuestVisitorProfile,
	isPhoneUITriggered,
	triggerFriendsGaugePostDisplay})=>{

	const [displayEditArea,changeDisplayEditArea]=useState(false);
	const dispatch=useDispatch();
	const personalInformation=useSelector(state=>state.personalInformation);
	const [selectedColorCode,changeSelectedColorCode]=useState(nodeInformation.colorCode);
	const [colorCodes,changeColorCodes]=useState([
		"#7FFFD4","#8A2BE2","#FF4500","#008000","#0000FF","#FFC0CB","#DFFF00",
		"#FFF9E3","#F92424","#3F9FFF","#35FA2C","#FFFB00"
	])
	const [displaySpecifiedNodeInformation,changeDisplayForSpecifiedNodeInformation]=useState(false);
	const [isLoading,changeIsLoading]=useState(false);
	const [profilesPromotedToNode,changeProfilesPromotedToNode]=useState([]);
	const [profilesRequestedAccessToNode,changeProfilesRequestedAccessToNode]=useState([]);
	const [notificationNodeInformationType,changeNodeInformationType]=useState();
	const [videoDescription,changeVideoDescription]=useState(nodeInformation.nodeVideoDescription);
	const [changedVideoDesciption,changeAndCreateNewVideoDescription]=useState();
	const [isVideoDescriptionCleared,changeIsVideoDescriptionCleared]=useState(false);
	const [loadingVideoDescription,changeLoadingVideoDescription]=useState(false);
	const [displayNodeInformation,changeDisplayNodeInformation]=useState(true);

	const [isMountedStatus,changeIsMountedStatus]=useState(false);


	useEffect(()=>{
		const fetchData=async()=>{
			changeLoadingVideoDescription(true);
			const {confirmation,data}=await getVideoUrl(nodeInformation._id);
			if(confirmation=="Success"){
				const {message}=data;
				changeVideoDescription(message);
			}else{
				alert('Unfortunately there was an error retrieving this levels video description');
			}
			changeLoadingVideoDescription(false);
			changeIsMountedStatus(true);
		}	

		const {containsVideoDescription,nodeVideoDescription}=nodeInformation;
		if(nodeVideoDescription==null && containsVideoDescription==true){
			fetchData();
		}
		disableScrolling("personalContainer");
	},[]);



	useEffect(()=>{
		const fetchData=async()=>{
			changeLoadingVideoDescription(true);
			const {confirmation,data}=await getVideoUrl(nodeInformation._id);
			if(confirmation=="Success"){
				const {message}=data;
				changeVideoDescription(message);
			}else{
				alert('Unfortunately there was an error retrieving this levels video description');
			}
			changeLoadingVideoDescription(false);
			changeIsMountedStatus(true);
		}	

		const {containsVideoDescription,nodeVideoDescription}=nodeInformation;
		if(nodeVideoDescription==null && containsVideoDescription==true){
			fetchData();
		}
		disableScrolling("personalContainer");
	},[]);

	const closePortal=()=>{
		enableScrolling("personalContainer");
		closeModal();
	}

	const submitInformation=async({isAccessTokenUpdated,updatedAccessToken})=>{
		const name=document.getElementById("name").value;
		const description=document.getElementById("description").value;

		let isNodeVideoDescriptionAltered;
		if(isVideoDescriptionCleared==true){
			isNodeVideoDescriptionAltered=true;
		}else{
			if(((videoDescription==changedVideoDesciption)||changedVideoDesciption==null)==true){
				isNodeVideoDescriptionAltered=false;
			}else{
				isNodeVideoDescriptionAltered=true;
			}
		}


		let nodeObject={
			_id:userId,
			name:name,
			description:description,
			colorScheme:selectedColorCode,
			levelId:nodeInformation._id,
			isPhoneUIEnabled:isPhoneUITriggered,
			isNodeVideoDescriptionAltered,
			nodeVideoDescription:isNodeVideoDescriptionAltered==true?changedVideoDesciption:videoDescription,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
						personalInformation.accessToken
		}
		if((videoDescription!=null || changedVideoDesciption!=null) && isAccessTokenUpdated==false){
			alert('Your video is processing. We wil notify via email and on here when your video description is uploaded :). You can close this screen now');
		}
		const {confirmation,data}=await editNodeInformation(nodeObject);
		if(confirmation=="Success"){

			updateNode({
				...nodeObject,
				_id:nodeInformation._id,
				containsVideoDescription:isNodeVideoDescriptionAltered==true?(changedVideoDesciption==null?false:true):false,
				nodeNumber:nodeInformation.nodeCounter
			});
			closePortal();;
		}else{
			
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						submitInformation,
						dispatch,
						{},
						false
					);
			}else{
				alert('Unfortunately there has been an error. Please upload again');
			}
		}
	}

	const changeSelectedColorCodeHandle=(colorCode,index)=>{
		changeSelectedColorCode(colorCode);
		for(var i=0;i<colorCodes.length;i++){
			document.getElementById(`colorCode-${i}`).style.borderStyle="none";
		}
		if(colorCode==null){
			document.getElementById("noColorScheme").style.color="red";
		}else{
			document.getElementById("noColorScheme").style.color="black";
			document.getElementById(`colorCode-${index}`).style.borderStyle="dotted dashed solid double";
		}
	}

	const requestTrigger=async()=>{
		if(isGuestVisitorProfile==true){
			alert('Create your own profile so you can request access to this node');
		}else{
			const {confirmation,data}=await requestAccessToNode({
				nodeName:nodeInformation.name,
				targetId:userId,
				requestOwnerId:personalInformation.id,
				requestOwnerFirstName:personalInformation.firstName,
				nodeId:nodeInformation._id
			})
			if(confirmation=="Success"){
				alert('Your request has been sent');
			}else{
				const {statusCode}=data;
				if(statusCode==400){
					alert('You have already sent a request to this level');
				}else{
					alert('There has been an error sending your request');
				}
			}
		}
	}

	const fetchRecruitsSpecificToNode=async({isAccessTokenUpdated,updatedAccessToken})=>{
		changeDisplayForSpecifiedNodeInformation(true);
		changeIsLoading(true);
		const {confirmation,data}=await recruitsLocatedInNode(
											userId,
											nodeInformation._id,
											isAccessTokenUpdated==true?updatedAccessToken:
											personalInformation.accessToken)
		if(confirmation=="Success"){
			const {message}=data;
			changeProfilesPromotedToNode([...message]);
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						fetchRecruitsSpecificToNode,
						dispatch,
						{},
						false
					);
			}else{
				alert('There has been an error retrieving recruits located in specific node');
			}
		}
		changeIsLoading(false);
	}

	const editIcon=()=>{
		return(
			<li onClick={()=>changeDisplayEditArea(true)} 
				style={{listStyle:"none",display:"inline-block",marginRight:"80%",cursor:"pointer"}}>
				<BorderColorIcon
					id="postCreationIcon"
					style={{fontSize:"24",color:"#C8B0F4"}}
				/>
			</li>
		)
	}

	const closeModalIcon=()=>{
		return(
			<li onClick={()=>closePortal()} style={{listStyle:"none",display:"inline-block",cursor:"pointer"}}>
				<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
				 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
				 stroke-linecap="round" stroke-linejoin="round">
				  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				  <circle cx="12" cy="12" r="9" />
				  <path d="M10 10l4 4m0 -4l-4 4" />
				</svg>
			</li>
		)
	}


	const fetchProfilesRequestedAccessToNode=async({isAccessTokenUpdated,updatedAccessToken})=>{
		changeDisplayForSpecifiedNodeInformation(true);

		changeIsLoading(true);

		const {confirmation,data}=await profilesRequestedAccessToNodeFetch(
											nodeInformation._id,
											isAccessTokenUpdated==true?updatedAccessToken:
											personalInformation.accessToken);
		if(confirmation=="Success"){
			const {message}=data;
			changeProfilesRequestedAccessToNode([...message]);
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						fetchProfilesRequestedAccessToNode,
						dispatch,
						{},
						false
					);
			}else{
				alert('There has been an error retrieving recruits located in specific node');
			}
		}
		changeIsLoading(false);
	}

	const nodeInformationDisplayComponent=()=>{
		if(notificationNodeInformationType=="selectedColorType"){
			return(
				<React.Fragment>
					<p>
						<b>Selected color:</b>
					</p>
					{nodeInformation.colorCode==null?
						<p>None</p>:
						<div style={{backgroundColor:nodeInformation.colorCode,
							height:"40px",width:"40px",borderRadius:"5px"}}
						/>
					}
				</React.Fragment>
			)
		}else if(notificationNodeInformationType=="requestedAccess"){
			return(
				<React.Fragment>
					{isLoading==true?
						<p>Loading...</p>:
						<>
							{profilesRequestedAccessToNode.length==0?
								<p>No profiles requested access</p>:
								<>
									{profilesRequestedAccessToNode.map(data=>
										<Link to={{pathname:`/profile/${data.profileId}`}}>
											<img id="profilePictureRecruit" src={data.profilePicture==null?
														NoProfilePicture
														:data.profilePicture}
												style={{marginRight:"2%",borderRadius:"50%",width:"55px",height:"50px"}}
											/>
										</Link>
									)}
								</>
							}
						</>
					}
				</React.Fragment>
			)
		}else{
			return(
				<React.Fragment>
					{isLoading==true?
						<p>Loading...</p>:
						<>
							{profilesPromotedToNode.length==0?
								<p>No Recruits</p>:
								<>
									{profilesPromotedToNode.map(data=>
										<Link to={{pathname:`/profile/${data.userId}`}}>
											<img id="profilePictureRecruit" src={data.profilePicture==null?
														NoProfilePicture
														:data.profilePicture}
												style={{marginRight:"2%",borderRadius:"50%",width:"55px",height:"50px"}}
											/>
										</Link>
									)}
								</>
							}
						</>
					}
				</React.Fragment>
			)
		}
	}

	const handleDisplayNodeInformation=(displayType)=>{
		if(displayType=="promotedProfiles"){
			fetchRecruitsSpecificToNode({isAccessTokenUpdated:false});
		}else if(displayType=="requestedAccess"){
			fetchProfilesRequestedAccessToNode({isAccessTokenUpdated:false});
		}
		changeNodeInformationType(displayType);
		changeDisplayForSpecifiedNodeInformation(true);
	}

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const uploadNodeVideoDescription=()=>{
		const videoFile=document.getElementById("uploadVideoFile").files[0];
		const filereader=new FileReader();
		const maxFileSize=15*1024*1024
		const videoSize=videoFile.size;

		if(videoSize>maxFileSize){
			alert('The file you selected is too large. As of right now we only accept files of size 15MB for videos. Sorry for the inconvenience.');
		}else{
			filereader.onloadend=()=>{
				const videoUrl=filereader.result;
				changeIsVideoDescriptionCleared(false);
				changeAndCreateNewVideoDescription(videoUrl);
			}

			if(videoFile==null){
				alert('File format is not accepted unfortunately')
			}else{
				filereader.readAsDataURL(videoFile);
			}	
		}
	}

	const toggleVideoCreation=()=>{
		document.getElementById("uploadVideoFile").click();
	}

	const clearVideoVideoDescriptions=()=>{
		changeAndCreateNewVideoDescription(null);
		changeVideoDescription(null);
		changeIsVideoDescriptionCleared(true);
	}

	const handleIsolateFriendsGaugePosts=()=>{
		if(nodeInformation.nodeCounter==0){
			triggerFriendsGaugePostDisplay("General");
		}else{
			triggerFriendsGaugePostDisplay(nodeInformation._id);
		}
		closePortal();
	}

	const closeEditArea=()=>{
		changeDisplayEditArea(false);
	}

	return createPortal(
		<>
			<ShadowContainer
				onClick={()=>closePortal()}
			/>
			<Container videoDescription={videoDescription}>
				<ul style={{padding:"15px"}}>
					<div style={{display:"flex",justifyContent:"space-between"}}>
						{isOwner==true &&(
							<React.Fragment>
								<li style={{listStyle:"none",marginBottom:"10%"}}>
									{displayEditArea==false?
										<>{editIcon()}</>:
										<ArrowCircleRightOutlinedIcon
											onClick={()=>changeDisplayEditArea(false)}
											style={{fontSize:"24",transform:"rotate(-90deg)",color:"#C8B0F4",cursor:"pointer"}}
										/>
									}
								</li>
								{/*
									{nodeInformation.nodeCounter==0 ?
										<p>Your general node can not be edited. Create a new one to be able to edit it</p>:
										<li style={{listStyle:"none",marginBottom:"10%"}}>
											{editIcon()}
										</li>
									}
								*/}
							</React.Fragment>
						)}
						{closeModalIcon()}
					</div>
					<li style={{listStyle:"none"}}>
						{displayEditArea==false?
							<>
								<div style={{display:"flex",flexDirection:"row"}}>
									{(isOwner==false && nodeInformation.isFirstNode==false)&&(
										<p id="requestAccessButton" onClick={()=>requestTrigger()} 
											style={RequestAccessButtonCSS}>
											Request Access
										</p>
									)}
								</div>
								<p style={{fontSize:"30px"}}>{nodeInformation.name}</p>
								{nodeInformation.description!="" &&(
									<React.Fragment>
										<hr/>
										<p>{nodeInformation.description}</p>
									</React.Fragment>
								)}
								<hr/>

								<div style={{height:"50%"}}>
									{nodeInformation.containsVideoDescription==true &&(
										<React.Fragment>
											{isMountedStatus==true?
												<VideoLoadingPrompt
													videoElement={<video key={uuidv4()} autoPlay loop autoBuffer muted playsInline 
																	controls id="nodeVideoDescription"
																	width="100%" height="100%" style={{backgroundColor:"#151515",borderRadius:"5px"}}>
																	<source src={videoDescription} type="video/mp4"/>
																</video>}
													videoId="nodeVideoDescription"
												/>:
												<p>Please wait...</p>
											}
										</React.Fragment>
									)}
								</div>

								<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
									<p style={{fontSize:"15px",marginTop:"2%"}}>Node Information:</p>
									<div class="dropdown">
										<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"
											style={{backgroundColor:"white",borderStyle:"none"}}>
											<ArrowDropDownCircleOutlinedIcon
												style={{color:"black",fontSize:"20",marginLeft:"5%",cursor:"pointer"}}
											/>
										</button>

										<ul id="nodeInformationDropDownMenu" class="dropdown-menu" 
											style={{width:"200px",height:"200px",overflow:"auto",padding:"10%"}}>
											{isOwner==true &&(
												<React.Fragment>
													<li style={{listStyle:"none",cursor:"pointer"}}
														onClick={()=>handleDisplayNodeInformation("promotedProfiles")}>
														View profiles promoted to this node
													</li>
													<hr/>
												</React.Fragment>
											)}
											<li style={{listStyle:"none",cursor:"pointer"}}
												onClick={()=>handleDisplayNodeInformation("selectedColorType")}>
												View selected color
											</li>
											<hr/>
											<li style={{listStyle:"none",cursor:"pointer"}}
												onClick={()=>handleIsolateFriendsGaugePosts()}>
												View posts
											</li>
											{isOwner==true &&(
												<React.Fragment>
													<hr/>
													<li style={{listStyle:"none",cursor:"pointer"}}
														onClick={()=>handleDisplayNodeInformation("requestedAccess")}>
														View profiles that requested access
													</li>
												</React.Fragment>
											)}
										</ul>
								  	</div>
								</div>
								{displaySpecifiedNodeInformation==true &&(
									<React.Fragment>
										<hr/>
										{nodeInformationDisplayComponent()}
									</React.Fragment>
								)}
							</>:
							<>
								{nodeInformation.isFirstNode==true?
									<div style={{...ButtonCSS,width:"20%"}}>
										Node Design
									</div>:
									<div class="btn-group">
										<button class="btn btn-primary dropdown-toggle" type="button" 
											data-toggle="dropdown" style={ButtonCSS}>
											{displayNodeInformation==true?
												<>Node Information</>:
												<>Node Design</>
											}
											<span class="caret"></span>
										</button>
										<ul class="dropdown-menu" style={{padding:"10px"}}>	
											<li onClick={()=>changeDisplayNodeInformation(true)}
												style={{listStyle:"none",cursor:"pointer"}}>
												Node Information
											</li>
											<hr/>
											<li onClick={()=>changeDisplayNodeInformation(false)}
												style={{listStyle:"none",cursor:"pointer"}}>
												Node Design
											</li>
										</ul>
									</div>	
								}
								<hr/>

								{(displayNodeInformation==true && nodeInformation.nodeCounter!=0)==true?
									<React.Fragment>
										<p style={{marginTop:"5%"}}>
											<b>Friends Gauge Node Name:</b>
										</p>
										<NameTextArea id="name">
											{nodeInformation.name}
										</NameTextArea> 
										<hr/>
										<p>
											<b>Description</b>
										</p>
										<DescriptionTextArea id="description" placeholder="Enter level description">
											{nodeInformation.description}
										</DescriptionTextArea>

										{(videoDescription==null && changedVideoDesciption==null)?
											<React.Fragment>
												<hr/>
												<div onClick={()=>toggleVideoCreation()} style={ButtonCSS}>
													Create video description
												</div>
												<hr/>
											</React.Fragment>:
											<React.Fragment>
												<hr/>
												<div style={{display:"flex",flexDirection:"column"}}>
													<div style={{display:"flex",flexDirection:"row",marginBottom:"2%"}}>
														<div onClick={()=>toggleVideoCreation()} style={ButtonCSS}>
															Redo video
														</div>
														<div onClick={()=>clearVideoVideoDescriptions()}
															style={{...ButtonCSS,marginLeft:"2%"}}>
															Clear video
														</div>
													</div>
													<VideoLoadingPrompt
														videoElement={
															<video key={uuidv4()} autoPlay loop autoBuffer muted playsInline 
																id="nodeInformationVideoDescription" controls
																width="100%" height="100%" style={{backgroundColor:"#151515"}}>
																<source src={changedVideoDesciption==null?
																	videoDescription:changedVideoDesciption} type="video/mp4"/>
															</video>
														}
														videoId="nodeInformationVideoDescription"
													/>
												</div>
												<hr/>
											</React.Fragment>
										}
										<input type="file" accept="video/mp4,video/x-m4v,video/*" name="img"
										 	id="uploadVideoFile" style={{position:"relative",opacity:"0",zIndex:"0"}}
											onChange={()=>uploadNodeVideoDescription()}>
										</input>

										<li id="editScreenText" style={ButtonCSS} onClick={()=>submitInformation({isAccessTokenUpdated:false})}>
											Edit
										</li>
									</React.Fragment>:
									<NodeDesignOptions
										userId={userId}
										nodeId={nodeInformation._id}
										closeEditArea={closeEditArea}
									/>
								}
							</>
						}
					</li>
				</ul>

			</Container>
		</>
	,document.getElementById("personalContainer"));
}

export default NodeInformationPortal;