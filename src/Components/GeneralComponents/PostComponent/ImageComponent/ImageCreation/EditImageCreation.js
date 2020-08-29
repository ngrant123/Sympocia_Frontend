import React,{Component} from "react";
import styled from "styled-components";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import SendIcon from '@material-ui/icons/Send';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {createImagePost,updateCrownedImage} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {connect} from "react-redux";
import IndustryPostOptions from "../../IndustryPostOptions.js";
import {PostConsumer} from "../../../../Profile/PersonalProfile/PersonalProfileSubset/PersonalPosts/PostsContext.js";
import {ImageConsumer} from "../../../../Profile/PersonalProfile/PersonalProfileSubset/PersonalPosts/ImagePosts/ImagePostContext.js";
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import FilterImageSelection from "./FilterImageSelection.js";
import ProcessImage from 'react-imgpro';
import {CompanyPostConsumer} from "../../../../Profile/CompanyProfile/CompanyPostsContext.js";

import MicIcon from '@material-ui/icons/Mic';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import VideoDescriptionPortal from "../../VideoDescriptionPortal.js";
import VoiceDescriptionPortal from "../../VoiceDescriptionPortal.js";

import { Icon, InlineIcon } from '@iconify/react';
import crownIcon from '@iconify/icons-mdi/crown';


const Container=styled.div`
	position:fixed;
	z-index:21;
	background-color:white;
	border-radius:5px;
	top:20%;
	left:25%;
	width:65%;
	overflow-y:scroll;
	height:55%;
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
	width:90px;
	height:80px;
	border-radius:50%;
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
			displayCrownModalIndicator:false
		}
	}    
	//If information is coming from image display edit button then populate information with previous data

	componentDidMount(){
		console.log("Testing component");
		console.log(this.props);

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
			displayVideoDescriptionPortal:audioDescription==null?false:true,
			displayVoiceDescriptionPortal:videoDescription==null?false:true,
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

	sendImageDateToDB=(profilePostInformation,companyPostContextConsumer)=>{
		debugger;

		console.log("Submit button clicked");
		const industries=this.state.industriesSelected;
		const imgUrl=this.state.src;
		const videoDescription=this.state.videoDescription;
		const audioDescription=this.state.audioDescription;
		const selectedSubCommunities=this.state.subIndustriesSelected;
		const searchCriteriaIndustryArray=[];
		const isPostCrowned=this.state.isPostCrowned;

		var descriptionTextArea=(this.state.isImageDescriptionCleared==false)?"":document.getElementById("descriptionTextArea").value;
		var captionTextArea=(this.state.isCaptionCleared==false)?"":document.getElementById("captionTextArea").value;

		if(this.state.isPreviousLoaded==false){
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
		}
		debugger;
		const searchCriteriaObject={
			imgUrl:imgUrl,
			videoDescription:videoDescription,
			audioDescription:audioDescription,
			industryArray:this.state.isPreviousLoaded==true?this.props.previousData.industriesUploaded:
															searchCriteriaIndustryArray,
			description:descriptionTextArea,
			caption:captionTextArea,
			isCrownedPost:isPostCrowned
		}

		if(profilePostInformation==null){
			companyPostContextConsumer.hideCreationPost();
			this.pushDummyImageObjectToProfile(companyPostContextConsumer,searchCriteriaObject);
		}else{
			profilePostInformation.hideCreationPost();
			this.pushDummyImageObjectToProfile(profilePostInformation,searchCriteriaObject);
		}

			if(this.props.personalProfile.loggedIn==true){
					createImagePost(this.props.personalProfile.id,searchCriteriaObject,"Personal");
			}
			else{
					createImagePost(this.props.companyProfile.id,searchCriteriaObject,"Company");
			}
	}

	pushDummyImageObjectToProfile=(profilePostInformation,searchCriteriaObject)=>{
		debugger;
		const date=new Date();
		const dateInMill=date.getTime();
		var newImageObject={
			...searchCriteriaObject,
			industriesUploaded:searchCriteriaObject.industryArray,
			comments:[],
			datePosted:dateInMill
		}
		const {isCrownedPost}=searchCriteriaObject;
		if(isCrownedPost==true){
			var image=newImageObject;
			newImageObject={
				image:image,
				isCrownedImage:true
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
		console.log("Testing image filtering");
		const type=""+imageFilter.type+"";
		const value=imageFilter.value;
		debugger;
		const imageElement= <ProcessImage
									image={this.props.imageSrcUrl}
									resize={{width:450,height:450}}
									quality={100}
									processedImage={(src, err) => this.setState({ src, err })}
									{...{[type]:value}}
							/>;
		this.setState({
			imgElement:imageElement
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
			displayVideoDescriptionPortal:false
		})
	}

	createAudioDescription=(audioDescriptionSrc)=>{
		this.setState({
			audioDescription:audioDescriptionSrc,
			displayVoiceDescriptionPortal:false
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
		debugger;
		console.log(profilePostInformation);

		const crownElement=document.getElementById("crownIcon");
		crownElement.style.backgroundColor="white";
		crownElement.style.color="#C8B0F4";
		const {previousData}=this.props;
		if(previousData!=null){
			const headerObject={
				isCrownedImage:true,
				image:null
			}
			previousData.contextLocation.updateImagePost(headerObject);
			const crownedImageResponse= await updateCrownedImage(previousData.owner,false,previousData._id);
		}

		this.setState({
			isPostCrowned:false,
			displayCrownModalIndicator:false
		})
	}


	crownPost=async(profilePostInformation)=>{
		console.log(profilePostInformation);
		debugger;
		const crownElement=document.getElementById("crownIcon");
		crownElement.style.backgroundColor="#D6C5F4";
		crownElement.style.color="white";
		const {previousData}=this.props;
		if(previousData!=null){
			const headerObject={
			isCrownedImage:true,
				image:this.props.previousData
			}
			previousData.contextLocation.updateImagePost(headerObject);
			const crownedImageResponse= await updateCrownedImage(previousData.owner,true,previousData._id);
		}

		this.setState({
			isPostCrowned:true,
			displayCrownModalIndicator:false
		})

		alert('Your post is now crowned');

	}

	render(){
		return(
			<PostConsumer>
				{profilePostInformation=>(
						<CompanyPostConsumer>
							{companyPostInformation=>(
								<Container id="editImageContainer">

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
										<li style={{listStyle:"none",display:"inline-block",width:"50%",marginRight:"2%"}}>
											<Image>
												<ul style={{backgroundColor:"white",zIndex:"8",position:"absolute",marginRight:"5%",padding:"15px"}}>
													<li style={{listStyle:"none"}}>
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

												<ul style={{zIndex:"8",position:"absolute",marginRight:"5%",padding:"15px",marginTop:"55%"}}>
													{this.state.videoDescription==null?null:
														<li style={{listStyle:"none"}}>
															<VideoDescriptionContainer>
																<video width="100%" height="100%" borderRadius="50%" autoplay="true">
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

												{this.state.imgElement}
											</Image>
										</li>

										{this.state.displayFilterPictureModal==false?
											<li style={{position:"absolute",listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
												<ul style={{padding:"0px",width:"300px"}}>
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
															<li style={{listStyle:"none",boxShadow:"1px 1px 10px #d5d5d5",borderRadius:"5px",marginLeft:"10%"}}>
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
																		<ul onClick={()=>this.sendImageDateToDB(profilePostInformation,companyPostInformation)}>
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
						</CompanyPostConsumer>
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


