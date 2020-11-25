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
import VideoDescriptionPortal from "../../VideoDescriptionPortal.js";
import VoiceDescriptionPortal from "../../VoiceDescriptionPortal.js";

import { Icon, InlineIcon } from '@iconify/react';
import crownIcon from '@iconify/icons-mdi/crown';
import CrownPostModal from "../../CrownPost.js";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import RedoVideoCreationModal from "./index.js";
import {UserConsumer} from "../../../../Profile/PersonalProfile/UserContext.js";

const Container=styled.div`
	@media screen and (max-width:420px){
		#videoElement{
			display:block !important;
			width:120% !important;
			height:40% !important;
		}
		#sendButtonLIContainer{
			margin-bottom:50% !important;
		}
		#audioOptionsLI{
			width:70% !important;
		}
	}
`;

const TextContainerDescription=styled.textarea`
	height:30%;
	resize:none;
	border-style:none;
	color:#1C1C1C;
	border-style:solid;
	border-radius:5px;
	border-width:1px;
	border-color:#d7dadb;
	width:100%;
`;

const TextContainerTitle=styled.textarea`
	height:20%;
	resize:none;
	border-style:none;
	color:#1C1C1C;
	border-style:solid;
	border-radius:5px;
	border-width:1px;
	border-color:#d7dadb;
	width:100%;
`;
const VideoDescriptionContainer=styled.div`
	position:relative;
	width:60px;
	height:50px;
	border-radius:50%;
`;

const CrownIconContainer=styled.div`
	position:absolute;
	border-style:solid;
	border-width:2px;
	border-color:red;
	animation: glowing 1300ms infinite;
	top:25%;
	left:77%;
	border-radius:50%;
	z-index:20;


	@keyframes glowing {
	    0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
	    50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
	    100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
	 }

	 @media screen and (max-width:420px){
	 	top:40% !important;
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
  marginTop:"10%"
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
			isSubmittedAndProcessing:false
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

			if(isCrownedPost==true){
				const crownElement=document.getElementById("crownIcon");
				crownElement.style.backgroundColor="#D6C5F4";
				crownElement.style.color="white";
			}

			this.setState({
				audioDescription:audioDescription,
				videoDescription:videoDescription,
				industriesSelected:industriesUploaded,
				isPostCrowned:isCrownedPost
			})
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
			industriesSelected:selectedIndustries
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
	sendVideoDataToDB=async(videoPostInformation)=>{

		this.setState({
			isSubmittedAndProcessing:true
		})
		const currentVideoTitle=document.getElementById("videoTitle").value;
		const currentVideoDescription=document.getElementById("videoDescription").value;

		//this could be done in a better way but... niggas is on a time crunch and stressed soooooo.....
		const industries=this.state.industriesSelected;
		const selectedSubCommunities=this.state.subIndustriesSelected;
		const videoAudioDescription=this.state.videoDescription;
		const currentAudioDescription=this.state.audioDescription;
		const isPostCrowned=this.state.isPostCrowned==undefined?false:this.state.isPostCrowned;

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
						subIndustry:subCommunitiyArray
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
			isCrownedPost:this.state.isPostCrowned
		}

		if(this.props.previousData==null){
			const {confirmation,data}=await createVideoPost(this.props.personalProfile.id,searchVideoResult,"Personal");
			
			if(confirmation=="Success"){
				searchVideoResult={
					...searchVideoResult,
					isPostAuthentic:{
						numOfApprove:[],
						numOfDisapprove:[]
					},
					id:data,
					key:this.uuidv4()
				}
				videoPostInformation.hideCreationPost();
				this.pushDummyVideoObjectToProfile(videoPostInformation,searchVideoResult);
			}else{
				alert('Unfortunately an error has occured please try again ');
				this.setState({
					isSubmittedAndProcessing:false
				})
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
				_id
			}=previousData;

			const editedVideo={
				postType:"Videos",
				postId:_id,
				post:{
					industriesUploaded:this.isArrayEqual(industriesUploaded,(searchCriteriaIndustryArray.length==0?industriesUploaded:searchCriteriaIndustryArray))==false
						?searchCriteriaIndustryArray:null,
					videoDescription:currentVideoDescription!=videoDescription?currentVideoDescription:null,
					title:currentVideoTitle!=title?currentVideoTitle:null,
					isCrownedPost:isPostCrowned!=isCrownedPost?isPostCrowned:null
				},
				postS3:[
					{
						optionType:'postUrl',
						newUrl:this.isVideosSrcEqual(this.state.videoSrc,this.props.videoSrc)==false?this.state.videoSrc:null
					},
					{
						optionType:'audioDescription',
						newUrl:currentAudioDescription!=audioDescription?currentAudioDescription:null
					},
					{
						optionType:'videoDescription',
						newUrl:videoAudioDescription!=videoDescription?videoAudioDescription:null
					}
				],
				ownerId:this.props.personalProfile.id
			}

 			const {confirmation,data}=await editPost(editedVideo);
			if(confirmation=="Success"){
				this.props.editPost(editedVideo);
			}else{
				alert('Unfortunately there has been an error editing this post. Please try again');
				this.setState({
					isSubmittedAndProcessing:false
				})
			}
		}
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
			<li style={{position:"relative",listStyle:"none",width:"45%",display:"inline-block",marginLeft:"3%"}}>
				<ul style={{padding:"0px"}}>
					<li id="videoElement" style={{listStyle:"none",borderRadius:"5px",overflow:"hidden"}}>
						<video key={this.uuidv4()} width="100%" height="80%" controls autoplay>
								<source src={this.state.videoSrc} type="video/mp4"/>
						</video>
					</li>
				</ul>
			</li>
		)
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


											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<CrownIconContainer onClick={()=>this.setState({changeVideoVerification:true})}>
													<Icon 
														id="crownIcon"
														icon={crownIcon}
														style={{borderRadius:"50%",zIndex:"8",backgroundColor:"white",fontSize:"40px",color:"#C8B0F4"}}
													/>
												</CrownIconContainer>
											</a>

											{/*
												{this.state.displayCrownModalIndicator==true?
													<CrownPostModal
														closeModal={this.closeCrownModal}
														parentCrownPost={this.crownPost}
														parentUnCrownPost={this.unCrownPost}
														previousData={this.props.previousData}
														isPostCrowned={this.state.isPostCrowned}
													/>
													:null
												}
											*/}

											<ul style={{padding:"20px"}}>
												<li style={{listStyle:"none"}}>
													<ul style={{padding:"0px"}}>
														<li style={{listStyle:"none",display:"inline-block",fontSize:"25px",color:"#5e5e5e"}}>
															<b>Edit Video Description </b>
														</li>
														{/*
															<li onClick={()=>videoPostInformation.closeModal()} style={{listStyle:"none",display:"inline-block",marginLeft:"55%"}}>
																<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																	<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" 
																		width="52" height="52" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2196F3" fill="none" 
																		stroke-linecap="round" stroke-linejoin="round">
																	  <path stroke="none" d="M0 0h24v24H0z"/>
																	  <circle cx="12" cy="12" r="9" />
																	  <path d="M10 10l4 4m0 -4l-4 4" />
																	</svg>
																</a>
															</li>
														*/}
													</ul>				
												</li>
								
												<hr/>
												<li style={{position:"relative",listStyle:"none",top:"-50px",display:"inline-block",marginLeft:"5%"}}>
													<ul style={{padding:"0px"}}>
														<li style={{listStyle:"none",display:"inline-block"}}>
															<ul style={{padding:"0px"}}>
																<li onClick={()=>this.redoVideo()} style={ButtonCSS}>
																	Redo
																</li>

																<li style={{listStyle:"none",paddingTop:"3%"}}>
																	<ul style={{padding:"0px"}}>
																		<li style={{listStyle:"none",}}>
																			<b>Title for video (optional)</b>
																		</li>

																		<li style={{color:"#5298F8",listStyle:"none"}}>
																			You will be able to edit this title at any point later
																		</li>
																	</ul>
																</li>
																{userSessionInformation.displayDesktopUI==false &&(
																	<>
																		{this.displayVideoElement()}
																	</>
																)}

																<li style={{listStyle:"none"}}>
																	<TextContainerTitle
																		placeholder="Write a title for your video"
																		id="videoTitle"
																	/>
																</li>

																<li style={{listStyle:"none",paddingTop:"3%",marginTop:"3%"}}>
																	<ul style={{padding:"0px"}}>
																		<li style={{position:"relative",listStyle:"none",display:"inline-block"}}>
																			<b>Enter a description for your video (optional)</b>
																		</li>

																		<li style={{listStyle:"none",color:"#5298F8"}}>
																			You will be able to edit this description at any point later
																		</li>
																	</ul>
																</li>

																<li style={{listStyle:"none",fontSize:"15px"}}>
																			<TextContainerDescription
																				placeholder="Write a description about your video"
																				id="videoDescription"
																			/>
																</li>
															</ul>
														</li>
														{userSessionInformation.displayDesktopUI==true &&(
															<>
																{this.displayVideoElement()}
															</>
														)}
														
													</ul>
												</li>
												<hr/>
												<li style={{listStyle:"none"}}>
													<ul style={{padding:"0px"}}>
														<li style={{listStyle:"none",display:"inline-block",fontSize:"25px",color:"#5e5e5e",marginBottom:"4%"}}>
															<b>Audio/Video Description</b>

														</li>
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
														{this.state.videoDescription==null?null:
															<li style={{listStyle:"none"}}>
																<VideoDescriptionContainer>
																	<video key={this.state.videoDescriptionId} width="100%" height="100%" borderRadius="50%" autoplay="true">
																		<source src={this.state.videoDescription} type="video/mp4"/>
																	</video>
																</VideoDescriptionContainer>
															</li>
														}
														{this.state.audioDescription==null?null:
															<li style={{listStyle:"none"}}>
																<audio key={this.state.audioId} controls>
																  <source src={this.state.audioDescription} type="audio/ogg"/>
																  <source src={this.state.audioDescription} type="audio/mpeg"/>
																Your browser does not support the audio element.
																</audio>
															</li>
														}
													</ul>
												</li>
												<hr/>
												<li style={{listStyle:"none",fontSize:"25px",color:"#5e5e5e"}}>
													<b>Symposiums </b>
												</li>
												<li  style={{listStyle:"none",display:"inline-block"}}>
													<IndustryPostOptions
														alterSelectedIndustry={this.alterSelectedIndustry}
														alterSelectedSubCommunities={this.alterSelectedSubCommunities}
													/>

												</li>
												<hr/>
												{this.state.isSubmittedAndProcessing==false &&(
													<li id="sendButtonLIContainer" style={{top:"-560px",listStyle:"none",display:"inline-block",marginTop:"1%"}}>
														<ul style={{padding:"0px"}}>
															<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																<li style={{listStyle:"none",marginTop:"5%",fontSize:"15px",backgroundColor:"#C8B0F4",padding:"5px",borderRadius:"5px",width:"150px"}}>
																	<ul onClick={()=>this.sendVideoDataToDB(videoPostInformation)}>
																		<li style={{listStyle:"none",display:"inline-block"}}>
																			<SendIcon
																				style={{fontSize:20,color:"white"}}
																			/>
																		</li>

																		<li style={{listStyle:"none",display:"inline-block",color:"white"}}>
																			Send
																		</li>

																	</ul>
																 </li>
															 </a>
														</ul>
													</li>

												)}
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

export default connect(
	mapStateToProps,
	null
)(EditVideoModal);
