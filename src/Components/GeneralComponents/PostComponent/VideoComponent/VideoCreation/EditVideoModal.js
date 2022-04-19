import React,{Component} from "react";
import styled from "styled-components";
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import DescriptionIcon from '@material-ui/icons/Description';
import IndustryPostOptions from "../../IndustryPostOptions.js";
import SendIcon from '@material-ui/icons/Send';
import {connect} from "react-redux";
import {
		createVideoPost,
		updateCrownedVideo,
		editPost
	} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {PostConsumer} from "../../../../Profile/PersonalProfile/PersonalProfileSubset/PersonalPosts/PostsContext.js";
import {CompanyPostConsumer} from "../../../../Profile/CompanyProfile/CompanyPostsContext.js";

import MicIcon from '@material-ui/icons/Mic';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import VideoDescriptionPortal from "../../VideoDescription/VideoDescriptionPortal.js";
import VoiceDescriptionPortal from "../../VoiceDescriptionPortal.js";

import { Icon, InlineIcon } from '@iconify/react';
import crownIcon from '@iconify/icons-mdi/crown';
import CrownPostModal from "../../CrownPost.js";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import RedoVideoCreationModal from "./index.js";
import {UserConsumer} from "../../../../Profile/PersonalProfile/UserContext.js";
import {
		setPersonalProfileAccessToken,
		setPersonalProfileRefreshToken
	} from "./../../../../../Actions/Redux/Actions/PersonalProfile.js"; 
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";
import ReplayIcon from '@material-ui/icons/Replay';
import VideoLoadingPrompt from "../../../../GeneralComponents/PostComponent/VideoLoadingPrompt.js";


const Container=styled.div`
	#symposiumCategoryOptionsHR{
		display:none !important;
	}
	@media screen and (min-width:2500px){
		padding:20px !important;
		#editContainer{
			top:-150px !important;
		}
		#videoElementContainer{
			margin-left:30% !important;
			width:20% !important;
		}
		#title{
			font-size:48px !important;
		}
		#text{
			font-size:24px !important;
		}
	}

	@media screen and (max-width:1370px){
		width:80%;

		#closeModalButton{
			display:block !important;
		}
	}
	@media screen and (max-width:700px){
		padding:5px;
		width:100%;
		#editContainer{
			width:100% !important;
		}

		#secondaryVideoInformation{
			width:90% !important;
		}
		#videoElement{
			display:block !important;
			width:120% !important;
			height:40% !important;
		}
		#sendButtonLIContainer{
			margin-bottom:50% !important;
		}
		#audioOptionsLI{
			width:100% !important;
		}
		#videoOptions{
			margin-left:5% !important;
		}
	}

	@media screen and (min-width:500px) and (max-width:750px) 
        and (min-height:730px) and (max-height:1039px){
        #editContainer{
			margin-left:0% !important;
		}
    }

	@media screen and (min-width:680px) and (max-width:1000px) 
        and (min-height:730px) and (max-height:1039px){
       	#editContainer{
			margin-left:0% !important;
		}
    }

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		#editContainer{
			margin-left:5% !important;
		}

    }
`;

const TextContainerDescription=styled.textarea`
	height:30%;
	resize:none;
	border-style:none;
	color:#1C1C1C;
	border-radius:5px;
	border-width:1px;
	color:#8c8c8c;
	background-color:#f1f1f1;
	height:90px;
	margin-bottom:5%;
	padding:15px;
	width:100%;

	@media screen and (max-width:650px){
		padding:10px !important;
	}
`;

const TextContainerTitle=styled.textarea`
	height:20%;
	resize:none;
	border-style:none;
	color:#1C1C1C;
	border-radius:5px;
	border-width:1px;
	width:100%;
	color:#8c8c8c;
	background-color:#f1f1f1;
	margin-bottom:5%;
	height:90px;
	padding:15px;

	@media screen and (min-width:2500px){
		font-size:36px !important;
		width:600px !important;
	}

	@media screen and (max-width:650px){
		padding:10px !important;
	}
`;
const VideoDescriptionContainer=styled.div`
	position:relative;
	width:60px;
	height:50px;
	border-radius:50%;
`;

const CrownIconContainer=styled.div`
	position:relative;
	border-style:solid;
	border-width:2px;
	border-color:#C8B0F4;
	animation: glowing 1300ms infinite;
	border-radius:50%;
	cursor:pointer;


	@keyframes glowing {
	    0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
	    50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
	    100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
	 }
    
`;

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	z-index:11;
	top:0px;
`;

const ChangeVideoVerificationModal=styled.div`
	position:fixed;
	width:30%;
	height:20%;
	background-color:white;
	z-index:11;
	left:40%;
	top:40%;
	border-radius:5px;
	box-shadow: 1px 1px 50px #d5d5d5;
`;

const ButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"4%",
  marginTop:"10%",
  cursor:"pointer"
}


const HorizontalLineCSS={
	position:"relative",
	width:"90%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
}

class EditVideoModal extends Component{


	constructor(props){
		super(props);

		this.state={
			industriesSelected:[],
			subIndustriesSelected:[],
			isVideoDescriptionCleared:false,
			isVideoTitleCleared:false,
			displayVideoDescriptionPortal:false,
			displayVoiceDescriptionPortal:false,
			videoDescription:null,
			audioDescription:null,
			displayCrownModalIndicator:false,
			isPostCrowned:false,
			videoSrc:this.props.videoSrc,
			audioId:this.uuidv4(),
			videoDescriptionId:this.uuidv4(),
			changeVideoVerification:false,
			displayRedoPage:false,
			isSubmittedAndProcessing:false,
			isVideoDescriptionDeleted:false,
			isAudioDescriptionDeleted:false,
			isSymposiumsAltered:false,
			symposiumCategoryUpload:null,
			displayedVideoProcessingAlertStatus:false
		}
	}

	componentDidMount(){
		const {previousData}=this.props;
		if(previousData!=null){
			const {
				audioDescription,
				videoDescription,
				videoUrl,
				title,
				industriesUploaded,
				isCrownedPost,
				description
			}=previousData;

			document.getElementById("videoTitle").value=title;
			document.getElementById("videoDescription").value=description;

			this.setState({
				audioDescription:audioDescription,
				videoDescription:videoDescription,
				industriesSelected:industriesUploaded,
				isPostCrowned:isCrownedPost
			})
		}
	}

	componentDidUpdate(prevProps,prevState){
		if(this.state.isPostCrowned==true && this.state.displayRedoPage==false){
			const crownElement=document.getElementById("crownIcon");
			crownElement.style.backgroundColor="#D6C5F4";
			crownElement.style.color="white";
		}

		if(this.props.previousData!=null){		
			if(prevState.isPostCrowned!=this.props.previousData.isCrownedPost){
				const crownElement=document.getElementById("crownIcon");
				crownElement.style.backgroundColor="#D6C5F4";
				crownElement.style.color="white";
			}
		}
	}

	clearImageCaptionTextArea=()=>{

		if(this.state.isVideoDescriptionCleared==false){
			document.getElementById("videoDescription").value="";
			document.getElementById("videoDescription").style.color="black";

			this.setState(prevState=>({
				...prevState,
				isVideoDescriptionCleared:true
			}))
		}else if(this.state.isVideoTitleCleared==false){

			document.getElementById("videoTitle").value="";
			document.getElementById("videoTitle").style.color="black";
			this.setState(prevState=>({
				...prevState,
				isVideoTitleCleared:true
			}))
		}
	}


	alterSelectedIndustry=(selectedIndustries)=>{
		this.setState({
			industriesSelected:selectedIndustries,
			isSymposiumsAltered:true
		})
	}

	alterSelectedSubCommunities=(selectedSubCommunities)=>{
		this.setState({
			subIndustriesSelected:selectedSubCommunities
		})
	}

	uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	processingVideoInformationAlert=()=>{
		if(!this.state.displayedVideoProcessingAlertStatus){
			alert('Your video is processing. We wil notify via email and on here when your post is uploaded :). You can close this screen now');
			this.setState({
				displayedVideoProcessingAlertStatus:true
			})
		}
	}

	sendVideoDataToDB=async({videoPostInformation,isAccessTokenUpdated,updatedAccessToken})=>{

		this.setState({
			isSubmittedAndProcessing:true
		})
		const currentVideoTitle=document.getElementById("videoTitle").value;
		const currentVideoDescription=document.getElementById("videoDescription").value;
		const industries=this.state.industriesSelected;
		const selectedSubCommunities=this.state.subIndustriesSelected;
		const videoAudioDescription=this.state.videoDescription;
		const currentAudioDescription=this.state.audioDescription;
		const isPostCrowned=this.state.isPostCrowned==undefined?false:this.state.isPostCrowned;
		const currentSymposiumUploadCategory=this.state.symposiumCategoryUpload==null?"The Grind":this.state.symposiumCategoryUpload

		const searchCriteriaIndustryArray=[];
		var counter=0;
		for(var i=0;i<industries.length;i++){
			var {subCommunity}=industries[i];
			var addIndustryOrIndustryObject=false;
			var subCommunitiyArray=[];
			var subCommunityCounter=0;

			if(subCommunity!=null){
				while(subCommunityCounter<subCommunity.length){
					const targetedSubCommunity=subCommunity[subCommunityCounter];
					if(targetedSubCommunity.industry==selectedSubCommunities[counter]){
						subCommunitiyArray.push(selectedSubCommunities[counter]);
						counter++;
						subCommunityCounter=0;
					}else{
						subCommunityCounter++;
					}
				}
			}
			
			const searchObject={
				industry:industries[i].industry,
				subIndustry:subCommunitiyArray,
				isSwimmingTriggeredForPost:false,
				isSymposiumUploadedToViaSwimming:false
			}
			searchCriteriaIndustryArray.push(searchObject);
		}
		
		var searchVideoResult={
			title:currentVideoTitle,
			description:currentVideoDescription,
			industriesUploaded:searchCriteriaIndustryArray,
			videoUrl:this.props.videoSrc,
			videoDescription:videoAudioDescription,
			audioDescription:currentAudioDescription,
			isCrownedPost:this.state.isPostCrowned,
			isPhoneUIEnabled:this.props.isPhoneUIEnabled,
			symposiumUploadCategory:currentSymposiumUploadCategory,
			videoCommentPool:[],
			regularCommentPool:[]
		}


		if(this.props.previousData==null){

			this.processingVideoInformationAlert();
			const {confirmation,data}=await createVideoPost(
												this.props.personalProfile.id,
												searchVideoResult,
												"Personal",
												isAccessTokenUpdated==true?updatedAccessToken:
												this.props.personalProfile.accessToken
											);
			const {
				firstName,
				id
			}=this.props.personalProfile;

			if(confirmation=="Success"){
				searchVideoResult={
					...searchVideoResult,
					isPostAuthentic:{
						numOfApprove:[],
						numOfDisapprove:[]
					},
					owner:id,
					_id:data.message,
					key:this.uuidv4()
				}
				videoPostInformation.hideCreationPost();
				this.pushDummyVideoObjectToProfile(videoPostInformation,searchVideoResult);
			}else{
				
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
							this.props.personalProfile.refreshToken,
							this.props.personalProfile.id,
							this.sendVideoDataToDB,
							this.props,
							{videoPostInformation},
							true
						);
				}else{
					alert('Unfortunately an error has occured please try again ');
					this.setState({
						isSubmittedAndProcessing:false
					})
				}
			}
		}else{
			const {previousData}=this.props;
			let {
				audioDescription,
				description,
				videoDescription,
				videoUrl,
				title,
				isCrownedPost,
				industriesUploaded,
				_id,
				videoUrlKey,
				videoDescriptionKey,
				symposiumUploadCategory
			}=previousData;

			const editedVideo={
				postType:"Videos",
				postId:_id,
				isPhoneUIEnabled:this.props.isPhoneUIEnabled,
				post:{
					industriesUploaded:this.state.isSymposiumsAltered==true?searchCriteriaIndustryArray:null,
					videoDescription:currentVideoDescription!=videoDescription?currentVideoDescription:null,
					title:currentVideoTitle!=title?currentVideoTitle:null,
					isCrownedPost:isPostCrowned!=isCrownedPost?isPostCrowned:null,
					symposiumUploadCategory:currentSymposiumUploadCategory!=symposiumUploadCategory?currentSymposiumUploadCategory:null
				},
				postS3:[
					{
						optionType:'postUrl',
						newUrl:this.isVideosSrcEqual(this.state.videoSrc,this.props.videoSrc)==false?this.state.videoSrc:null,
						key:videoUrlKey
					},
					{
						optionType:'audioDescription',
						newUrl:currentAudioDescription!=audioDescription?currentAudioDescription:null,
						isCurrentlyDeleted:this.state.isAudioDescriptionDeleted
					},
					{
						optionType:'videoDescription',
						newUrl:videoAudioDescription!=videoDescription?videoAudioDescription:null,
						key:videoDescriptionKey,
						isCurrentlyDeleted:this.state.isVideoDescriptionDeleted
					}
				],
				ownerId:this.props.personalProfile.id,
				accessToken:isAccessTokenUpdated==true?updatedAccessToken:
				this.props.personalProfile.accessToken
			}
			if(editedVideo.postS3[2].newUrl!=null || editedVideo.postS3[0].newUrl!=null){
				this.processingVideoInformationAlert();
			}

 			const {confirmation,data}=await editPost(editedVideo);
			if(confirmation=="Success"){
				alert('Your post has been edited. Please reload your profile to see your updated post.')
				this.props.editPost(editedVideo);
			}else{
				
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
							this.props.personalProfile.refreshToken,
							this.props.personalProfile.id,
							this.sendVideoDataToDB,
							this.props,
							{videoPostInformation},
							true
						);
				}else{
					alert('Unfortunately there has been an error editing this post. Please try again');
					this.setState({
						isSubmittedAndProcessing:false
					})
				}
			}
		}
		this.setState({
			isSubmittedAndProcessing:false
		})
	}

isArrayEqual=(arr1,arr2)=>{
		
		let isArrayEqualIndicator=true;

		if(arr1.length!=arr2.length)
			return false;
		else{
			let arr1Map=new Map();

			arr1.forEach((iteratedIndustry,i)=>{
				const {industry,subIndustry}=iteratedIndustry;
				let subArr1Map=new Map();

				subIndustry.forEach((selectedSubIndustry,j)=>{
					subArr1Map.set(selectedSubIndustry,1);
				})
				arr1Map.set(industry,subArr1Map);
			});

			arr2.forEach((selectedIndustry,index)=>{
				
				var testing=arr1Map.has(selectedIndustry.industry);
				if(arr1Map.has(selectedIndustry.industry)==undefined || arr1Map.has(selectedIndustry.industry)==false)
					isArrayEqualIndicator=false
				else{
					
					const {subIndustry}=selectedIndustry;

					subIndustry.forEach((selectedSubIndustry,i)=>{
						const selectedIndustryArr1=arr1Map.get(selectedSubIndustry.industry);
						if(selectedIndustryArr1.get(selectedSubIndustry.industry)==undefined)
							isArrayEqualIndicator=false
					})
				}
			})
		}
		return isArrayEqualIndicator;
	}

	isVideosSrcEqual=(video1,video2)=>{
		if(String(video1)===String(video2))
			return true;
		else 
			return false;
	}
	

	pushDummyVideoObjectToProfile=(profilePostInformation,searchCriteriaObject)=>{
		
		const date=new Date();
		const dateInMill=date.getTime();
		var newVideoObject={
			...searchCriteriaObject,
			industriesUploaded:searchCriteriaObject.industriesUploaded.length==0?
			[{industry:"General",subIndustry:[]}]:searchCriteriaObject.industriesUploaded,
			comments:[],
			datePosted:dateInMill
		}
		if(this.state.isPostCrowned==true){
			var video=newVideoObject;
			newVideoObject={
				video:video,
				isCrownedVideo:true
			}
		}
		profilePostInformation.updateVideoPost(newVideoObject);
	}

	setUpVideoDescriptionCreation=()=>{
		this.setState({
			displayVideoDescriptionPortal:true,
			displayVoiceDescriptionPortal:false
		})
	}

	setUpVoiceDescriptionCreation=()=>{
		this.setState({
			displayVideoDescriptionPortal:false,
			displayVoiceDescriptionPortal:true
		})
	}

	closeModal=()=>{
		this.setState({
			displayVideoDescriptionPortal:false,
			displayVoiceDescriptionPortal:false
		})
	}

	createVideoDescription=(videoDescriptionSrc)=>{
		this.setState({
			videoDescription:videoDescriptionSrc,
			displayVideoDescriptionPortal:false,
			videoDescriptionId:this.uuidv4()
		})
	}

	createAudioDescription=(audioDescriptionSrc)=>{
		const uuid=this.uuidv4();
		this.setState({
			audioDescription:audioDescriptionSrc,
			audioId:uuid,
			displayVoiceDescriptionPortal:false
		})
	}

	crownPost=()=>{
		this.setState({
			isPostCrowned:true,
			displayCrownModalIndicator:false,
			changeVideoVerification:false
		})
	}

	unCrownPost=()=>{
		this.setState({
			isPostCrowned:false,
			displayCrownModalIndicator:false,
			changeVideoVerification:false
		})
	}

	closeCrownModal=()=>{
		this.setState({
			isPostCrowned:false,
			displayCrownModalIndicator:false,
			changeVideoVerification:false
		})
	}

	uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	redoVideo=()=>{
		if(this.props.redoVideo==null){
			this.setState({
				displayRedoPage:true
			})
		}else{
			this.props.redoVideo();
		}
	}

	uploadedRedoVideo=(videoData)=>{
		this.setState({
			videoSrc:videoData,
			displayRedoPage:false
		})
	}

	displayVideoElement=()=>{
		return(
			<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
				<div style={{height:"220px",width:"90%",position:"relative"}}>
					<video  id="video" 
						style={{borderRadius:"5px",backgroundColor:"#151515",position:"absolute",cursor:"pointer"}}
						 position="relative" height="90%" width="100%" borderRadius="50%"
					 	key={this.uuidv4()} autoPlay loop autoBuffer muted playsInline controls>
						<source src={this.state.videoSrc} type="video/mp4"/>
					</video>
				</div>
				<div id="videoOptions" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
					<CrownIconContainer onClick={()=>this.setState({changeVideoVerification:true})}>
						<Icon 
							id="crownIcon"
							icon={crownIcon}
							style={{borderRadius:"50%",backgroundColor:"white",fontSize:"34px",color:"#C8B0F4"}}
						/>
					</CrownIconContainer>
					<hr style={HorizontalLineCSS}/>
					<ReplayIcon
						onClick={()=>this.redoVideo()}
						style={{cursor:"pointer",fontSize:34,marginTop:"10px"}}
					/>
				</div>
			</div>
		)
	}

	removeVideoDescription=()=>{
		this.setState({
			videoDescription:null,
			isVideoDescriptionDeleted:true
		})
	}

	removeAudioDescription=()=>{
		this.setState({
			audioDescription:null,
			isAudioDescriptionDeleted:true
		})
	}

	alterSymposiumUploadedCategory=(selectedCategory)=>{
		this.setState({
			symposiumCategoryUpload:selectedCategory
		})
	}


	render(){

		return(
			<PostConsumer>
				{videoPostInformation=>(
				<UserConsumer>
					{userSessionInformation=>(
						 <React.Fragment>
						 	{this.state.displayRedoPage==true?
						 		<RedoVideoCreationModal
						 			uploadedRedoVideo={this.uploadedRedoVideo}
						 		/>
						 		:
						 		<Container>
						 			<div id="closeModalButton" 
										onClick={()=>this.props.closeModal()} 
										style={{marginTop:"0%",cursor:"pointer",display:"none"}}>
										<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
										 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
										 stroke-linecap="round" stroke-linejoin="round">
										  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
										  <circle cx="12" cy="12" r="9" />
										  <path d="M10 10l4 4m0 -4l-4 4" />
										</svg>
									</div>
						 			{this.state.displayVideoDescriptionPortal==false?
										null:
										<VideoDescriptionPortal
											closeModal={this.closeModal}
											createVideoDescription={this.createVideoDescription}
											parentContainer="personalContainer"
										/>
									}
									{this.state.displayVoiceDescriptionPortal==false?
										null:
										<VoiceDescriptionPortal
											closeModal={this.closeModal}
											createAudioDescription={this.createAudioDescription}
										/>
									}

									{this.state.changeVideoVerification==true?
										<CrownPostModal
											closeModal={this.closeCrownModal}
											parentCrownPost={this.crownPost}
											parentUnCrownPost={this.unCrownPost}
											previousData={this.props.previousData}
											isPostCrowned={this.state.isPostCrowned}
										/>
										:null
									}
									<ul style={{padding:"20px"}}>

										<div id="editContainer" style={{display:"flex",flexDirection:"column"}}>
											{this.displayVideoElement()}
											<div style={{display:"flex",flexDirection:"column"}}>
												<TextContainerTitle
													placeholder="Write a title for your video"
													id="videoTitle"
												/>

												<TextContainerDescription
													placeholder="Write a description about your video"
													id="videoDescription"
												/>
											</div>
										</div>


										<hr/>
										<li id="secondaryVideoInformation" style={{listStyle:"none"}}>
											<ul style={{padding:"0px"}}>
												<li style={{marginBottom:"2%",listStyle:"none",color:"#8c8c8c"}}>
													Create either a video or voice description for your image. Much more interesting than regular text imo ;)
												</li>
												<li id="audioOptionsLI" style={{listStyle:"none",boxShadow:"1px 1px 10px #d5d5d5",borderRadius:"5px",marginLeft:"1%",width:"50%"}}>
													<ul style={{padding:"10px"}}>
														<li onClick={()=>this.setUpVoiceDescriptionCreation()} style={{listStyle:"none",display:"inline-block",marginLeft:"20%",marginRight:"20%"}}>
															<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																<MicIcon
																	style={{fontSize:40}}
																/>
															</a>
														</li>

														<li onClick={()=>this.setUpVideoDescriptionCreation()} style={{listStyle:"none",display:"inline-block"}}>
															<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																<CameraAltIcon
																	style={{fontSize:40}}
																/>
															</a>
														</li>
													</ul>
												</li>
											</ul>
										</li>
										<li style={{listStyle:"none"}}>
											<ul style={{zIndex:"8",marginRight:"5%",padding:"15px"}}>
												{this.state.videoDescription!=null &&(
													<li style={{listStyle:"none"}}>
														<ul style={{padding:"0px"}}>
															<li style={{listStyle:"none",display:"inline-block"}}>
																<VideoDescriptionContainer>
																	<VideoLoadingPrompt
																		videoElement={
																			<video id="videoCreationDescritption"
																				key={this.state.videoDescriptionId} width="100%" 
																				height="100%" borderRadius="50%" controls autoplay="true">
																				<source src={this.state.videoDescription} type="video/mp4"/>
																			</video>
																		}
																		videoId="videoCreationDescritption"
																	/>
																</VideoDescriptionContainer>
															</li>
															<li style={{listStyle:"none",display:"inline-block",marginLeft:"2%"}}>
																<HighlightOffIcon
																	onClick={()=>this.removeVideoDescription()}
																	style={{cursor:"pointer",fontSize:"20",color:"#C8B0F4"}}
																/>
															</li>
														</ul>
													</li>
												)}
												{this.state.audioDescription==null?null:
													<li style={{listStyle:"none"}}>
														<ul style={{padding:"0px"}}>
															<li style={{listStyle:"none",display:"inline-block"}}>
																<audio key={this.state.audioId} controls>
																  <source src={this.state.audioDescription} type="audio/ogg"/>
																  <source src={this.state.audioDescription} type="audio/mp4"/>
																Your browser does not support the audio element.
																</audio>
															</li>
															<li style={{listStyle:"none",display:"inline-block",marginLeft:"2%"}}>
																<HighlightOffIcon
																	onClick={()=>this.removeAudioDescription()}
																	style={{cursor:"pointer",fontSize:"20",color:"#C8B0F4"}}
																/>
															</li>
														</ul>
													</li>
												}
											</ul>
										</li>
										<hr/>
										<li  style={{listStyle:"none",display:"inline-block"}}>
											<IndustryPostOptions
												alterSelectedIndustry={this.alterSelectedIndustry}
												alterSelectedSubCommunities={this.alterSelectedSubCommunities}
												symposiumsUploaded={this.props.previousData==null?[]:this.props.previousData.industriesUploaded}
												uploadedCategorySection={this.props.previousData==null?null:this.props.previousData.symposiumUploadCategory}
												alterSymposiumUploadedCategory={this.alterSymposiumUploadedCategory}
											/>

										</li>
										<hr/>
										{this.state.isSubmittedAndProcessing==false ?
											<li id="sendButtonLIContainer" style={{cursor:"pointer",top:"-560px",listStyle:"none",display:"inline-block",marginTop:"1%"}}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",marginTop:"5%",fontSize:"15px",backgroundColor:"#C8B0F4",padding:"5px",borderRadius:"5px",width:"150px"}}>
														<ul onClick={()=>this.sendVideoDataToDB({videoPostInformation,isAccessTokenUpdated:false})}>
															{this.props.previousData==null?
																<React.Fragment>
																	<li style={{listStyle:"none",display:"inline-block"}}>
																		<SendIcon
																			style={{fontSize:20,color:"white"}}
																		/>
																	</li>

																	<li style={{listStyle:"none",display:"inline-block",color:"white"}}>
																		Send
																	</li>
																</React.Fragment>:
																<li style={{listStyle:"none",display:"inline-block",color:"white"}}>
																	Edit
																</li>
															}
														</ul>
													 </li>
												</ul>
											</li>:
											<p>Please wait...</p>
										}
									</ul>
						 		</Container>
						 	}
							</React.Fragment>
						) 
					}
				</UserConsumer>
				)
				}
			</PostConsumer>
		)
	}
}


const mapStateToProps=state=>{
	return{
		personalProfile:state.personalInformation,
		companyProfile:state.companyInformation
	}
}

const mapDispatchToProps=dispatch=>{
	return{
		setPersonalProfileAccessToken:(accessToken)=>dispatch(setPersonalProfileAccessToken(accessToken)),
		setPersonalProfileRefreshToken:(refreshToken)=>dispatch(setPersonalProfileRefreshToken(refreshToken))
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditVideoModal);
