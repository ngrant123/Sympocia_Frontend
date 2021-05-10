import React,{Component} from "react";
import styled from "styled-components";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import SendIcon from '@material-ui/icons/Send';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {connect} from "react-redux";
import IndustryPostOptions from "../../IndustryPostOptions.js";
import {PostConsumer} from "../../../../Profile/PersonalProfile/PersonalProfileSubset/PersonalPosts/PostsContext.js";
import {ImageConsumer} from "../../../../Profile/PersonalProfile/PersonalProfileSubset/PersonalPosts/ImagePosts/ImagePostContext.js";
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import FilterImageSelection from "./FilterImageSelection.js";
import {UserConsumer} from "../../../../Profile/PersonalProfile/UserContext.js";
import MicIcon from '@material-ui/icons/Mic';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import VideoDescriptionPortal from "../../VideoDescription/VideoDescriptionPortal.js";
import VoiceDescriptionPortal from "../../VoiceDescriptionPortal.js";
import { Icon, InlineIcon } from '@iconify/react';
import crownIcon from '@iconify/icons-mdi/crown';
import ReplayIcon from '@material-ui/icons/Replay';
import {
	createImagePost,
	updateCrownedImage,
	editPost
} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import CreateNewImageModal from "./index.js";
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";
import {
	setPersonalProfileAccessToken,
	setPersonalProfileRefreshToken
} from "./../../../../../Actions/Redux/Actions/PersonalProfile.js";

const Container=styled.div`
	padding:20px;
    @media screen and (max-width:1370px){
    	${({isPhoneUIEnabled})=>(
    		isPhoneUIEnabled==true && (
    			`top:5% !important;`
    		)
    	)}

		left:1% !important; 
		height:100% !important;
		width:100%;
		#editImageFlexDiv{
			flex-direction:column !important;
		}

		#imageContainerDiv{
			margin-bottom:10%;
			height:40% !important;
		}

		#verticalLineId{
			display:none !important;
		}

		#imageListContainer{
			display:block !important;
			width:100% !important;
			height:40% !important;
		}
		#imageInformationSelection{
			width:400px !important;
		}
		#uploadedImage{
			width:70% !important;
			height:300px !important;
		}
    }

	@media screen and (max-width:650px){
		left:1% !important; 
		height:100% !important;
		width:100%;

		#imageContainerDiv{
			height:30% !important;
		}
		#uploadedImage{
			height:120px !important;
			width:40% !important;
			margin-right:90px !important;
		}
		#imageListContainer{
			display:block !important;
			width:100% !important;
			height:10% !important;
		}
		#imageInformationSelection{
			width:250px !important;
		}
    }
    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
    	#uploadedImage{
			width:50% !important;
		}
    }


    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	top:5%;
		overflow-y:scroll;
		height:90% !important;

		#imageContainerDiv{
			margin-bottom:20%;
		}

    	#imageListContainer{
			display:block !important;
			width:100% !important;
			height:90% !important;
		}

		#uploadedImage{
			margin-right:150px !important;
			height:150px !important;
			width:30% !important;
		}
    }
`;


const Image=styled.div`
	position:relative;
	width:100%;
	height:100%;
	overflow-y:auto;
	border-radius:5px;

	 @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		height:80% !important;
		width:80%;
    }

`;

const ImageTextArea=styled.textarea`
	width:350px;
	resize:none;
	text-decoration:none;
	color:#8c8c8c;
	border-style:none;
	border-radius:5px;
	background-color:#f1f1f1;
	padding:5px;

	@media screen and (max-width:650px){
		width:90% !important;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		width:100% !important;
    }
`;

const SelectedIndustryButton=styled.div`
	border-radius:5px;
	border-color:white;
	border-style:solid;
	border-width:1px;
	padding:10px;
	color:white;
	background-color:#5298F8;
`;

const VideoDescriptionContainer=styled.div`
	position:relative;
	width:60px;
	height:60px;
	border-radius:50%;
	background-color:white;
	overflow:hidden;
`;


const MobileVideoDescriptionContainer=styled.div`
	width:90px;
	height:80px;
	position:relative;
	border-radius:50%;
	background-color:white;
`;
const CrownIconContainer=styled.div`
	border-style:solid;
	border-width:2px;
	border-color:red;
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

const CrownPostModal=styled.div`
	position:fixed;
	width:30%;
	height:20%;
	background-color:white;
	z-index:11;
	left:40%;
	top:40%;
	border-radius:5px;
	box-shadow: 1px 1px 50px #d5d5d5;
	overflow:scroll;

	@media screen and (max-width:740px){
		left:5% !important;
		width:90% !important;
		height:35% !important;
	}
`;

const ChangeImageVerificationModal=styled.div`
	position:fixed;
	width:30%;
	height:20%;
	background-color:white;
	z-index:11;
	left:40%;
	top:40%;
	border-radius:5px;
	box-shadow: 1px 1px 50px #d5d5d5;
	overflow:scroll;

	@media screen and (max-width:700px){
		left:10%;
		width:80%;
		height:40%;
	}
`;
const ShadowContainerNewImageCreation= styled.div`
	position:fixed;
	width:500%;
	height:500%;
	left:-50%;
	background-color: rgba(0,0,0,0.4);
	z-index:15;
	top:0px;
`;

const VerticalLineCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"300px",
 	marginRight:"5%",
 	marginLeft:"5%"
}



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
  marginRight:"4%"
}

class EditImageCreation extends Component{

	constructor(props){
		super(props);
		this.state={
			imgUrl:"",
			isCaptionCleared:false,
			isImageDescriptionCleared:false,
			industriesSelected:[],
			subIndustriesSelectedDropDown:[],
			subIndustriesSelected:[],
			displayFilterPictureModal:false,
			displayVideoDescriptionPortal:false,
			displayVoiceDescriptionPortal:false,
			videoDescription:null,
			audioDescription:null,
			isPostCrowned:false,
			isPreviousLoaded:false,
			displayCrownModalIndicator:false,
			changeImageVerification:false,
			displayReplaceImageModal:false,
			videoDescriptionId:this.uuidv4(),
			audioDescriptionId:this.uuidv4(),
			isSubmittedAndProcessing:false,
			isDesktop:true,
			isVideoDescriptionDeleted:false,
			isAudioDescriptionDeleted:false,
			isSymposiumsAltered:false
		}
	}    
	//If information is coming from image display edit button then populate information with previous data
	/*
		Was previously using image processing library react-imgpro but for mobile prod it was rotating the images
		themselves. Believe to think that the library may have been taking the images EXIFS information into consideration
		and altering it there? Maybe...maybe not who knows
	*/
	componentDidMount(){
		const {previousData}=this.props;
		console.log(this.props);
		if(previousData!=null){
			var {
				description,
				caption,
				audioDescription,
				videoDescription,
				isCrownedPost
			}=previousData;

			document.getElementById("descriptionTextArea").value=description;
			document.getElementById("captionTextArea").value=caption;

			if(isCrownedPost==true){
				const crownElement=document.getElementById("crownIcon");
				crownElement.style.backgroundColor="#D6C5F4";
				crownElement.style.color="white";
			}
		}

		this.setState({ 
			imgSrc:this.props.imageSrcUrl,
			isCaptionCleared:caption==null?false:true,
			isImageDescriptionCleared:description==null?false:true,
			videoDescription:videoDescription,
			audioDescription:audioDescription,
			isPostCrowned:isCrownedPost,
			isPreviousLoaded:previousData!=null?true:false
		},()=>{
			localStorage.removeItem('placeholder');
		});
	}

	componentDidUpdate(){
		if(this.state.isPostCrowned==true && this.state.displayRedoPage==false){
			const crownElement=document.getElementById("crownIcon");
			crownElement.style.backgroundColor="#D6C5F4";
			crownElement.style.color="white";
		}
	}

	clearImageCaptionTextArea=()=>{
		if(this.state.isCaptionCleared==false){
			document.getElementById("captionTextArea").value="";
			document.getElementById("captionTextArea").style.color="black";

			this.setState(prevState=>({
				...prevState,
				isCaptionCleared:true
			}))
		}else if(this.state.isImageDescriptionCleared==false){

			document.getElementById("descriptionTextArea").value="";
			document.getElementById("descriptionTextArea").style.color="black";
			this.setState(prevState=>({
				...prevState,
				isImageDescriptionCleared:true
			}))
		}
	}

	sendImageDateToDB=async({profilePostInformation,isAccessTokenUpdated,updatedAccessToken})=>{
		
		this.setState({
			isSubmittedAndProcessing:true
		})
		const industries=this.state.industriesSelected;
		const imgUrl=this.state.imgSrc;
		const currentVideoDescription=this.state.videoDescription;
		const currentAudioDescription=this.state.audioDescription;
		const selectedSubCommunities=this.state.subIndustriesSelected;
		let searchCriteriaIndustryArray=[];
		const isPostCrowned=this.state.isPostCrowned==undefined?false:this.state.isPostCrowned;

		var descriptionTextArea=(this.state.isImageDescriptionCleared==false)?"":document.getElementById("descriptionTextArea").value;
		var captionTextArea=(this.state.isCaptionCleared==false)?"":document.getElementById("captionTextArea").value;

		searchCriteriaIndustryArray=this.constructSelectedIndustries(searchCriteriaIndustryArray,industries,selectedSubCommunities);

		
		const searchCriteria={
			videoDescription:currentVideoDescription,
			audioDescription:currentAudioDescription,
			industryArray:searchCriteriaIndustryArray,
			description:descriptionTextArea,
			caption:captionTextArea,
			isCrownedPost:isPostCrowned,
			imgUrl,
			isPhoneUIEnabled:this.props.isPhoneUIEnabled
		}

		if(this.state.isPreviousLoaded==false){
			if(profilePostInformation==null){
				//const {confirmation,data}=await createImagePost(this.props.companyProfile.id,searchCriteria,"Company");
				//companyPostContextConsumer.hideCreationPost();
				//this.pushDummyImageObjectToProfile(companyPostContextConsumer,searchCriteria);
			}else{
				if(currentVideoDescription!=null){
					alert('We are processing your post and we wil notify you via email and on here when your post is uploaded. In the meantime you can close this screen everything is being handled')
				}
				const {confirmation,data}=await createImagePost(
													this.props.personalProfile.id,
													searchCriteria,
													"Personal",
													isAccessTokenUpdated==true?updatedAccessToken:
													this.props.personalProfile.accessToken);
				
				if(confirmation=="Success"){
					profilePostInformation.hideCreationPost();
					const {message}=data;
					this.pushDummyImageObjectToProfile(profilePostInformation,searchCriteria,message,this.props.personalProfile.id);
				}else{
					
					const {statusCode}=data;
					if(statusCode==401){
						await refreshTokenApiCallHandle(
								this.props.personalProfile.refreshToken,
								this.props.personalProfile.id,
								this.sendImageDateToDB,
								this.props,
								{
									profilePostInformation
								},
								true
							);
					}else{
						alert('Unfortunately there has been an error creating this post. Please try again');
						this.setState({
							isSubmittedAndProcessing:false
						})
					}
				}
			}
		}else{
			const {previousData}=this.props;
			let {
				description,
				caption,
				audioDescription,
				videoDescription,
				isCrownedPost,
				industriesUploaded,
				_id,
				videoDescriptionKey,
				uncompressedImageId
			}=previousData;

			
			const editedImage={
				postType:"Images",
				postId:_id,
				isPhoneUIEnabled:this.props.isPhoneUIEnabled,
				post:{
					industriesUploaded:this.state.isSymposiumsAltered==true?searchCriteriaIndustryArray:null,
					description:descriptionTextArea!=description?descriptionTextArea:null,
					caption:captionTextArea!=caption?captionTextArea:null,
					isCrownedPost:isPostCrowned!=isCrownedPost?isPostCrowned:null,
					uncompressedImageId
				},
				postS3:[
					{
						optionType:'postUrl',
						newUrl:this.isImagesSrcEqual(imgUrl,this.props.imageSrcUrl)==false?imgUrl:null
					},
					{
						optionType:'audioDescription',
						newUrl:currentAudioDescription!=audioDescription?currentAudioDescription:null,
						isCurrentlyDeleted:this.state.isAudioDescriptionDeleted
					},
					{
						optionType:'videoDescription',
						newUrl:currentVideoDescription!=videoDescription?currentVideoDescription:null,
						isCurrentlyDeleted:this.state.isVideoDescriptionDeleted,
						key:videoDescriptionKey
					}
				],
				ownerId:this.props.personalProfile.id,
				accessToken:isAccessTokenUpdated==true?updatedAccessToken:
							this.props.personalProfile.accessToken
			}
			if(editedImage.postS3[2].newUrl!=null){
				alert('We are processing your post and we wil notify you via email and on here when your post is uploaded. In the meantime you can close this screen everything is being handled');

			}

 			const {confirmation,data}=await editPost(editedImage);
			if(confirmation=="Success"){
				alert('Your post has been edited. Please reload your profile to see your updated post.')
				this.props.editPost(editedImage);
			}else{
				
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
							this.props.personalProfile.refreshToken,
							this.props.personalProfile.id,
							this.sendImageDateToDB,
							this.props,
							{
								profilePostInformation
							},
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

	isImagesSrcEqual=(img1,img2)=>{
		if(String(img1)===String(img2))
			return true;
		else 
			return false;
	}

	isArrayEqual=(arr1,arr2)=>{
		let isArrayEqualIndicator=true;

		if(arr1.length!=arr2.length)
			return false;
		else{
			let arr1Map=new Map();
			arr1.forEach((iteratedIndustry,i)=>{
				const {industry}=iteratedIndustry;
				arr1Map.set(industry,1);
			});

			for(var i=0;i<arr2.length;i++){
				if(arr1Map.has(arr2[i].industry)==undefined){
					isArrayEqualIndicator=false;
					break;
				}
			}
		}
		return isArrayEqualIndicator;
	}

	constructSelectedIndustries=(searchCriteriaIndustryArray,industries,selectedSubCommunities)=>{
		//this could be done in a better way but... niggas is on a time crunch and stressed soooooo.....
			if(industries.length==0){
				searchCriteriaIndustryArray.push({
					industry:"General",
					subIndustry:[]
				});

			}else{
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
			}

			return searchCriteriaIndustryArray;
	}


	pushDummyImageObjectToProfile=(profilePostInformation,searchCriteriaObject,_id,profileId)=>{
		
		const date=new Date();
		const dateInMill=date.getTime();
		var newImageObject={
			...searchCriteriaObject,
			industriesUploaded:searchCriteriaObject.industryArray.length==0?
			[{industry:"General",subIndustry:[]}]:searchCriteriaObject.industryArray,
			comments:[],
			datePosted:dateInMill,
			owner:profileId,
			_id
		}
		const {isCrownedPost}=searchCriteriaObject;
		if(isCrownedPost==true){
			var image=newImageObject;
			newImageObject={
				image:image,
				isCrownedPost:true
			}
		}
		profilePostInformation.updateImagePost(newImageObject);
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

	displayFilteredImageHandle=(imageFilter)=>{
		const type=""+imageFilter.type+"";
		const value=imageFilter.value;
		this.setState({
			displayReplaceImageModal:false
		},function(){
			localStorage.removeItem('placeholder');
		})
	}

	//

	handleDisplaySubmitModal=()=>{
		this.setState({
			displayFilterPictureModal:false
		})
	}

	setUpVideoDescriptionCreation=(isDesktop)=>{
		this.setState({
			displayVideoDescriptionPortal:true,
			displayVoiceDescriptionPortal:false,
			isDesktop
		})
	}

	setUpVoiceDescriptionCreation=(isDesktop)=>{
		this.setState({
			displayVideoDescriptionPortal:false,
			displayVoiceDescriptionPortal:true,
			isDesktop
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
			isVideoDescriptionDeleted:false,
			videoDescriptionId:this.uuidv4()
		})
	}

	createAudioDescription=(audioDescriptionSrc)=>{
		if(this.state.isDesktop==false){
			alert('Please scroll up to the top to view your audio description if you want to');
		}
		this.setState({
			audioDescription:audioDescriptionSrc,
			displayVoiceDescriptionPortal:false,
			isAudioDescriptionDeleted:false,
			audioDescriptionId:this.uuidv4()
		},()=>{

		})
	}

	displayImageIsCrowned=()=>{
		const crownStatus=this.state.isPostCrowned;
		const crownElement=document.getElementById("crownIcon");

		if(crownStatus==false){
			crownElement.style.backgroundColor="#D6C5F4";
			crownElement.style.color="white";
			this.setState({
				displayCrownModalIndicator:true
			})
			alert('Your post is now crowned');
		}else{
			crownElement.style.backgroundColor="white";
			crownElement.style.color="#C8B0F4";
			this.setState({
				isPostCrowned:false
			})
		}
	}

	unCrownPost=async(profilePostInformation)=>{

		const crownElement=document.getElementById("crownIcon");
		crownElement.style.backgroundColor="white";
		crownElement.style.color="#C8B0F4";

		this.setState({
			isPostCrowned:false,
			displayCrownModalIndicator:false
		})
	}


	crownPost=async(profilePostInformation)=>{
		const crownElement=document.getElementById("crownIcon");
		crownElement.style.backgroundColor="#D6C5F4";
		crownElement.style.color="white";

		this.setState({
			isPostCrowned:true,
			displayCrownModalIndicator:false
		})

		alert('Your post is now crowned');
	}

	displayNewCreateImage=(imgUrl)=>{
		this.setState({
			imgSrc:imgUrl,
			displayReplaceImageModal:false
		},function(){
			localStorage.removeItem('placeholder');
		})
	}
	uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
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

	render(){
		return(
	<PostConsumer>
		{profilePostInformation=>(
		<UserConsumer>
			{userSessionInformation=>(
				<Container id="editImageContainer" isPhoneUIEnabled={this.props.isPhoneUIEnabled}>
					{this.props.isPhoneUIEnabled==true &&(
						<div onClick={()=>this.props.closeModal()}>
							<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
							 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
							 stroke-linecap="round" stroke-linejoin="round">
							  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							  <circle cx="12" cy="12" r="9" />
							  <path d="M10 10l4 4m0 -4l-4 4" />
							</svg>
						</div>
					)}
					<hr/>
					{this.state.displayReplaceImageModal==true &&(
						<>
							<ShadowContainerNewImageCreation 
								onClick={()=>this.setState({displayReplaceImageModal:false})} 
							/>
							<CreateNewImageModal
								handleNewlyCreatedImage={this.displayNewCreateImage}
								isPreviousLoaded={true}
							/>
						</>
					)}
					{this.state.changeImageVerification==true?
						<>
							<ShadowContainer onClick={()=>this.setState({changeImageVerification:false})} />
							<ChangeImageVerificationModal>
								<ul style={{padding:"20px"}}>
									<a href="javascript:void(0);">
										<li onClick={()=>this.setState({changeImageVerification:false})} style={{listStyle:"none",marginLeft:"90%"}}>
											<HighlightOffIcon
												style={{fontSize:"20"}}
											/>
										</li>
									</a>
									<p> 
										Are you sure you want to change the image for this post?
									</p>
									<li style={{listStyle:"none"}}>
										<ul style={{padding:"0px"}}>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li onClick={()=>this.setState({
																		displayReplaceImageModal:true,
																		changeImageVerification:false
																	})} 
												style={ButtonCSS}>
													Yes
												</li>
											</a>

											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li onClick={()=>this.setState({changeImageVerification:false})}
												style={ButtonCSS}>
													No
												</li>
											</a>
										</ul>
									</li>
								</ul>
							</ChangeImageVerificationModal>
						</>
						:null
					}

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
							parentContainer="personalContainer"
						/>
					}
					{this.state.displayCrownModalIndicator==false?null:
						<React.Fragment>
							<ShadowContainer onClick={()=>this.setState({displayCrownModalIndicator:false})} />
							<CrownPostModal>
								<ul style={{padding:"20px"}}>
									<a href="javascript:void(0);">
										<li onClick={()=>this.setState({displayCrownModalIndicator:false})} style={{listStyle:"none",marginLeft:"90%"}}>
											<HighlightOffIcon
												style={{fontSize:"20"}}
											/>
										</li>
									</a>
									{this.state.isPostCrowned==true?
										<React.Fragment>
											<p> 
												Are you sure you want to uncrown this post?
											</p>
											<li style={{listStyle:"none"}}>
												<ul style={{padding:"0px"}}>
													<a href="javascript:void(0);" style={{textDecoration:"none"}}>
														<li onClick={()=>this.unCrownPost(profilePostInformation)} style={ButtonCSS}>
															Yes
														</li>
													</a>

													<a href="javascript:void(0);" style={{textDecoration:"none"}}>
														<li style={ButtonCSS} onClick={()=>this.setState({displayCrownModalIndicator:false})}>
															No
														</li>
													</a>
												</ul>
											</li>
										</React.Fragment>:
										<React.Fragment>
											<p> 
												Are you sure you want to crown this post? You're current crowned 
												post will be replace.
											</p>
											<li style={{listStyle:"none"}}>
												<ul style={{padding:"0px"}}>
													<a href="javascript:void(0);" style={{textDecoration:"none"}}>
														<li onClick={()=>this.crownPost(profilePostInformation)} style={ButtonCSS}>
															Yes
														</li>
													</a>

													<a href="javascript:void(0);" style={{textDecoration:"none"}}>
														<li style={ButtonCSS} onClick={()=>this.setState({displayCrownModalIndicator:false})}>
															No
														</li>
													</a>
												</ul>
											</li>
										</React.Fragment>
									}
								</ul>
							</CrownPostModal>
						</React.Fragment>
					}
					<div id="editImageFlexDiv" style={{display:"flex",flexDirection:"row",marginTop:"5%"}}>
						<div id="imageContainerDiv" 
							style={{height:"60%",display:"flex",flexDirection:"row"}}>
							<div id="uploadedImage" style={{width:"320px",height:"300px"}}>
								<img src={this.state.imgSrc}
									style={{width:"100%",height:"100%",borderRadius:"5px"}}
								/>
							</div>
							<div style={{display:"flex",flexDirection:"column",marginLeft:"2%"}}>
								<ReplayIcon
									onClick={()=>this.setState({changeImageVerification:true})}
									style={{cursor:"pointer",fontSize:30,marginBottom:"60px"}}
								/>
								<CrownIconContainer onClick={()=>this.setState({displayCrownModalIndicator:true})}>
									<Icon 
										id="crownIcon"
										icon={crownIcon}
										style={{
											borderRadius:"50%",zIndex:"8",backgroundColor:"white",
											fontSize:"40px",color:"#C8B0F4"}}
									/>
								</CrownIconContainer>
							</div>
						</div>
						<div id="verticalLineId" style={VerticalLineCSS}/>

						<div style={{width:"100%",display:"flex",flexDirection:"column"}}>
							<IndustryPostOptions
								alterSelectedIndustry={this.alterSelectedIndustry}
								alterSelectedSubCommunities={this.alterSelectedSubCommunities}
								symposiumsUploaded={this.props.previousData==null?[]:this.props.previousData.industriesUploaded}
							/>
							<li style={{listStyle:"none",marginTop:"5%",fontSize:"15px"}}>
								<ImageTextArea id="captionTextArea" onClick={()=>this.clearImageCaptionTextArea()}>
												Writing a caption...
								</ImageTextArea>
							</li>

							<li style={{listStyle:"none",marginTop:"5%",fontSize:"15px"}}>
								<ImageTextArea id="descriptionTextArea" onClick={()=>this.clearImageCaptionTextArea()}>
									Write a title description...
								</ImageTextArea>

							</li>
							<p style={{marginLeft:"50%",fontSize:"20px",color:"#5298F8"}}> Or </p>
							<ul style={{padding:"0px"}}>
								<li style={{marginBottom:"2%",listStyle:"none",color:"#8c8c8c"}}>
									Create either a video or voice description for your image. Much more interesting than regular text imo ;)
								</li>
								<li style={{listStyle:"none",boxShadow:"1px 1px 10px #d5d5d5",borderRadius:"5px"}}>
									<ul style={{padding:"10px"}}>
										<li onClick={()=>this.setUpVoiceDescriptionCreation(userSessionInformation.displayDesktopUI)}
											 style={{listStyle:"none",display:"inline-block",marginLeft:"20%",marginRight:"20%"}}>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<MicIcon
													style={{fontSize:40}}
												/>
											</a>
										</li>

										<li onClick={()=>this.setUpVideoDescriptionCreation(userSessionInformation.displayDesktopUI)}
											 style={{listStyle:"none",display:"inline-block"}}>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<CameraAltIcon
													style={{fontSize:40}}
												/>
											</a>
										</li>
									</ul>
								</li>
							</ul>
							{this.state.videoDescription!=null &&(
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
										<VideoDescriptionContainer>
											<video key={this.state.videoDescriptionId} width="100%" height="100%" borderRadius="50%" autoplay="true" controls>
												<source src={this.state.videoDescription} type="video/mp4"/>
											</video>
										</VideoDescriptionContainer>
									</li>

									<li style={{cursor:"pointer",listStyle:"none",display:"inline-block"}}>
										<HighlightOffIcon
											onClick={()=>this.removeVideoDescription()}
											style={{fontSize:"20",color:"#C8B0F4"}}
										/>
									</li>
								</ul>
							)}
							{this.state.audioDescription!=null &&(
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
										<audio key={this.state.audioDescriptionId} controls>
										  <source src={this.state.audioDescription} type="audio/ogg"/>
										  <source src={this.state.audioDescription} type="audio/mp4"/>
										Your browser does not support the audio element.
										</audio>
									</li>
									<li style={{cursor:"pointer",listStyle:"none",display:"inline-block"}}>
										<HighlightOffIcon
											onClick={()=>this.removeAudioDescription()}
											style={{fontSize:"20",color:"#C8B0F4"}}
										/>
									</li>
								</ul>
							)}

							{this.state.isSubmittedAndProcessing==false?
								<li style={{cursor:"pointer",listStyle:"none",marginTop:"15%",fontSize:"15px",backgroundColor:"#C8B0F4",padding:"5px",borderRadius:"5px",width:"150px"}}>
									<ul onClick={()=>this.sendImageDateToDB({profilePostInformation,isAccessTokenUpdated:false})}>
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
						 		</li>:
						 		<p>Please wait...</p>
						 	}
						</div>
					</div>
				</Container>
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
)(EditImageCreation);


