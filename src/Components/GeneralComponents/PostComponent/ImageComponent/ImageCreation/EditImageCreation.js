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
import ProcessImage from 'react-imgpro';
import {UserConsumer} from "../../../../Profile/PersonalProfile/UserContext.js";

import MicIcon from '@material-ui/icons/Mic';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import VideoDescriptionPortal from "../../VideoDescriptionPortal.js";
import VoiceDescriptionPortal from "../../VoiceDescriptionPortal.js";

import { Icon, InlineIcon } from '@iconify/react';
import crownIcon from '@iconify/icons-mdi/crown';

import {
	createImagePost,
	updateCrownedImage,
	editPost
} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import CreateNewImageModal from "./index.js";


const Container=styled.div`
	position:fixed;
	z-index:35;
	background-color:white;
	border-radius:5px;
	top:20%;
	left:25%;
	width:65%;
	overflow-y:scroll;
	height:55%;

	@media screen and (max-width:1030px) and (max-height:1370px){
    	height:100% !important;
		width:100%;
		left:5% !important; 
    }

    @media screen and (max-width:770px){
		left:1% !important; 
		height:100% !important;
		width:100%;
		#imageListContainer{
			display:block !important;
			width:100% !important;
			height:40% !important;
		}
		#processedImage{
			height:200px !important;
			width:200px !important;
		}
		#imageInformationSelection{
			width:400px !important;
		}
    }

	@media screen and (max-width:420px){
		left:1% !important; 
		height:100% !important;
		width:100%;
		#imageListContainer{
			display:block !important;
			width:100% !important;
			height:50% !important;
		}
		#processedImage{
			height:50px !important;
			width:50px !important;
		}
		#imageInformationSelection{
			width:250px !important;
		}
    }
    @media screen and (max-width:740px) and (max-height:420px){
    	#imageListContainer{
			display:block !important;
			width:100% !important;
			height:90% !important;
		}
    }
`;


const Image=styled.div`
	position:relative;
	width:100%;
	height:100%;
	overflow-y:auto;
	border-radius:5px;

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

	@media screen and (max-width:330px){
		width:250px;
		
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
	position:absolute;
	border-style:solid;
	border-width:2px;
	border-color:red;
	animation: glowing 1300ms infinite;
	top:1%;
	left:75%;
	border-radius:50%;


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
			audioDescriptionId:this.uuidv4()
		}
	}    
	//If information is coming from image display edit button then populate information with previous data

	componentDidMount(){

		const {previousData}=this.props;
		
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

		const imageElement= <ProcessImage
								image={this.props.imageSrcUrl}
								resize={{width:450,height:450}}
								quality={100}
								processedImage={(src, err) => this.setState({ src, err })}
							/>;

		this.setState({
			imgElement:imageElement,
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

	sendImageDateToDB=async(profilePostInformation)=>{
		const industries=this.state.industriesSelected;
		const imgUrl=this.state.src;
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
			imgUrl
		}


		if(this.state.isPreviousLoaded==false){
			if(profilePostInformation==null){
				//const {confirmation,data}=await createImagePost(this.props.companyProfile.id,searchCriteria,"Company");
				//companyPostContextConsumer.hideCreationPost();
				//this.pushDummyImageObjectToProfile(companyPostContextConsumer,searchCriteria);
			}else{
				const {confirmation,data}=await createImagePost(this.props.personalProfile.id,searchCriteria,"Personal");
				
				if(confirmation=="Success"){
					profilePostInformation.hideCreationPost();
					this.pushDummyImageObjectToProfile(profilePostInformation,searchCriteria,data,this.props.personalProfile.id);
				}else{
					alert('Unfortunately there was an error uploading your image. Please try again');
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
				_id
			}=previousData;

			const editedImage={
				postType:"Images",
				postId:_id,
				post:{
					industriesUploaded:this.isArrayEqual(industriesUploaded,(searchCriteriaIndustryArray.length==0?industriesUploaded:searchCriteriaIndustryArray))==false
						?searchCriteriaIndustryArray:null,
					description:descriptionTextArea!=description?descriptionTextArea:null,
					caption:captionTextArea!=caption?captionTextArea:null,
					isCrownedPost:isPostCrowned!=isCrownedPost?isPostCrowned:null
				},
				postS3:[
					{
						optionType:'postUrl',
						newUrl:this.isImagesSrcEqual(imgUrl,this.props.imageSrcUrl)==false?imgUrl:null
					},
					{
						optionType:'audioDescription',
						newUrl:currentAudioDescription!=audioDescription?currentAudioDescription:null
					},
					{
						optionType:'videoDescription',
						newUrl:currentVideoDescription!=videoDescription?currentVideoDescription:null
					}
				],
				ownerId:this.props.personalProfile.id
			}

 			const {confirmation,data}=await editPost(editedImage);
			if(confirmation=="Success"){
				this.props.editPost(editedImage);
			}else{
				alert('Unfortunately there has been an error editing this post. Please try again');
			}
		}
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
				const {industry,subIndustry}=iteratedIndustry;
				let subArr1Map=new Map();

				subIndustry.forEach((selectedSubIndustry,j)=>{
					subArr1Map.set(selectedSubIndustry,1);
				})
				arr1Map.set(industry,subArr1Map);
			});

			arr2.forEach((selectedIndustry,index)=>{
				
				var testing=arr1Map.has(selectedIndustry.industry);
				if(arr1Map.has(selectedIndustry.industry)==undefined)
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
			industriesUploaded:searchCriteriaObject.industryArray,
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
			industriesSelected:selectedIndustries
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
		const imageElement= <ProcessImage
		 							id="processedImage"
									image={this.props.imageSrcUrl}
									resize={{width:450,height:450}}
									quality={100}
									processedImage={(src, err) => this.setState({ src, err })}
									{...{[type]:value}}
							/>;
		this.setState({
			imgElement:imageElement,
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
		this.setState({
			audioDescription:audioDescriptionSrc,
			displayVoiceDescriptionPortal:false,
			audioDescriptionId:this.uuidv4()
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

/*
		const {previousData}=this.props;
		if(previousData!=null){
			const headerObject={
				isCrownedImage:true,
				image:null
			}
			previousData.contextLocation.updateImagePost(headerObject);
			const crownedImageResponse= await updateCrownedImage(previousData.owner,false,previousData._id);
		}
*/

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


		/*
			const {previousData}=this.props;
			if(previousData!=null){
				const headerObject={
				isCrownedImage:true,
					image:this.props.previousData
				}
				previousData.contextLocation.updateImagePost(headerObject);
				const crownedImageResponse= await updateCrownedImage(previousData.owner,true,previousData._id);
			}
		*/

	}

	displayNewCreateImage=(imgUrl)=>{

		const imageElement= <ProcessImage
									id="processedImage"
									image={imgUrl}
									resize={{width:450,height:450}}
									quality={100}
									processedImage={(src, err) => this.setState({ src, err })}
							/>;
		this.setState({
			imgElement:imageElement,
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
	render(){
		return(
			<PostConsumer>
				{profilePostInformation=>(
						<UserConsumer>
							{userSessionInformation=>(
								<Container id="editImageContainer">
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
									<ul style={{padding:"10px"}}>
										{userSessionInformation.displayDesktopUI==false &&(
											<li style={{listStyle:"none",marginBottom:"2%"}}>
												<ul style={{padding:"0px"}}>
													{this.state.videoDescription!=null && (
														<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",marginBottom:"2%"}}>
															<MobileVideoDescriptionContainer>
																<video key={this.state.videoDescriptionId} width="100%" height="100%" borderRadius="50%" autoplay="true">
																	<source src={this.state.videoDescription} type="video/mp4"/>
																</video>
															</MobileVideoDescriptionContainer>
														</li>
													)}
													{this.state.audioDescription!=null &&(
														<li style={{listStyle:"none",display:"inline-block",marginBottom:"2%"}}>
															<audio controls>
															  <source src={this.state.audioDescription} typ e="audio/ogg"/>
															  <source src={this.state.audioDescription} type="audio/mpeg"/>
															Your browser does not support the audio element.
															</audio>
														</li>
													)}
												</ul>
											</li>
										)}

										<li id="imageListContainer" style={{listStyle:"none",display:"inline-block",width:"50%",marginRight:"2%"}}>
											<Image>
												<ul style={{backgroundColor:"white",zIndex:"8",position:"absolute",marginRight:"5%",padding:"15px"}}>
													<li onClick={()=>this.setState({changeImageVerification:true})} style={{listStyle:"none"}}>
														<a href="javascript:void(0);">
															<HighlightOffIcon
																style={{fontSize:30}}
															/>
														</a>
													</li>
													<li onClick={()=>this.setState({displayFilterPictureModal:true})} style={{listStyle:"none"}}>
														<a href="javascript:void(0);">
															<FormatColorFillIcon
																style={{fontSize:30}}
															/>
														</a>
													</li>
												</ul>
												<a href="javascript:void(0);">
													<CrownIconContainer onClick={()=>this.setState({displayCrownModalIndicator:true})}>
														<Icon 
															id="crownIcon"
															icon={crownIcon}
															style={{borderRadius:"50%",zIndex:"8",backgroundColor:"white",fontSize:"40px",color:"#C8B0F4"}}
														/>
													</CrownIconContainer>
												</a>

												{userSessionInformation.displayDesktopUI==true &&(
													<ul style={{zIndex:"8",position:"absolute",marginRight:"5%",padding:"15px",marginTop:"55%"}}>

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
																<audio controls>
																  <source src={this.state.audioDescription} type="audio/ogg"/>
																  <source src={this.state.audioDescription} type="audio/mpeg"/>
																Your browser does not support the audio element.
																</audio>
															</li>
														}
													</ul>
												)}
											
												{this.state.imgElement}
											</Image>
										</li>

										{this.state.displayFilterPictureModal==false?
											<li style={{overflowY:"scroll",height:"150%",position:"absolute",listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
												<ul id="imageInformationSelection" style={{padding:"0px",width:"350px"}}>
													<IndustryPostOptions
														alterSelectedIndustry={this.alterSelectedIndustry}
														alterSelectedSubCommunities={this.alterSelectedSubCommunities}
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
													<li style={{listStyle:"none"}}>
														<ul style={{padding:"0px"}}>
															<li style={{marginBottom:"2%",listStyle:"none",color:"#8c8c8c"}}>
																Create either a video or voice description for your image. Much more interesting than regular text imo ;)
															</li>
															<li style={{listStyle:"none",boxShadow:"1px 1px 10px #d5d5d5",borderRadius:"5px"}}>
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

													<li style={{listStyle:"none",marginTop:"15%",fontSize:"15px",backgroundColor:"#C8B0F4",padding:"5px",borderRadius:"5px",width:"150px"}}>
														<a style={{textDecoration:"none"}} href="javascript:void(0);">
															<ul onClick={()=>this.sendImageDateToDB(profilePostInformation)}>
																<li style={{listStyle:"none",display:"inline-block"}}>
																	<SendIcon
																		style={{fontSize:20,color:"white"}}
																	/>
																</li>

																<li style={{listStyle:"none",display:"inline-block",color:"white"}}>
																	Send
																</li>

															</ul>
														</a>
											 		</li>
												</ul>
											</li>:
											<FilterImageSelection
												imgUrl={this.props.imageSrcUrl}
												displayFilteredImage={this.displayFilteredImageHandle}
												switchBackToSubmitModal={this.handleDisplaySubmitModal}
											/>
										}
										
									</ul>
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

export default connect(
	mapStateToProps,
	null
)(EditImageCreation);

