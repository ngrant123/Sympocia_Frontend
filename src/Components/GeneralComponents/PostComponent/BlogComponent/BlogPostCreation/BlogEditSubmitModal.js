import React,{Component} from "react";
import styled from "styled-components";
import CameraIcon from '@material-ui/icons/Camera';
import SendIcon from '@material-ui/icons/Send';
import IndustryPostOptions from "../../IndustryPostOptions.js";
import {
		createBlogPost,
		editPost
	} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {connect} from "react-redux";
import {BlogConsumer} from "./BlogContext.js";
import {PostConsumer} from "../../PostContext.js";
import { convertToRaw } from 'draft-js';

import VideoDescriptionPortal from "../../VideoDescriptionPortal.js";
import VoiceDescriptionPortal from "../../VoiceDescriptionPortal.js";
import MicIcon from '@material-ui/icons/Mic';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

import { Icon, InlineIcon } from '@iconify/react';
import crownIcon from '@iconify/icons-mdi/crown';
import CrownPostModal from "../../CrownPost.js";

import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";
import {
		setPersonalProfileAccessToken,
		setPersonalProfileRefreshToken
	} from "./../../../../../Actions/Redux/Actions/PersonalProfile.js"; 

const Container=styled.div`
	position:fixed;
	width:55%;
	height:70%;
	background-color:white;
	border-radius:5px;
	z-index:35;
	top:25%;
	left:25%;
	overflow:scroll;
`;

const ImageContainer=styled.div`
	position:relative;
	width:310px;
	height:60%;
`;

const BlogDescription=styled.textarea`
	height:30%;
	resize:none;
	border-style:none;
	color:#1C1C1C;
	border-style:solid;
	border-radius:5px;
	border-width:1px;
	border-color:#d7dadb;
	width:90%;
	padding:5px;
`;

const BlogTitle=styled.textarea`
	height:10%;
	resize:none;
	border-style:none;
	color:#1C1C1C;
	border-style:solid;
	border-radius:5px;
	border-width:1px;
	border-color:#d7dadb;
	width:90%;
	marginBottom:5%;
	padding:5px;
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
	top:1%;
	left:85%;
	border-radius:50%;
	z-index:20;


	@keyframes glowing {
      0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
  }
`;




class BlogEditSubmitModal extends Component{

	constructor(props){
		super(props);
		this.state={
			pictureUrl:"",
			displayImage:false,
			displayIndustrySelectModal:false,
			industriesSelected:[],
			subIndustriesSelected:[],
			title:"",
			description:"",
			blog:"",
			displayVideoDescriptionPortal:false,
			displayVoiceDescriptionPortal:false,
			videoDescription:null,
			audioDescription:null,
			isPostCrowned:false,
			isSubmittedAndProcessing:false,
			retryCounter:0
		}
	}

	componentDidMount(){
		
		if(this.props.previousState!=null){
			const {
				blogImageUrl,
				title,
				description,
				audioDescription,
				videoDescription
			}=this.props.previousState;

			document.getElementById("blogTitle").value=title;
			document.getElementById("blogDescription").value=description;

			this.setState({
				pictureUrl:blogImageUrl,
				displayImage:true,
				audioDescription:audioDescription,
				videoDescription:videoDescription
			})
		}
	}

	clickInputFileButton=()=>{
		document.getElementById("uploadPictureFile").click();
	}

	handleUploadPicture=()=>{
		let fileReader= new FileReader();
		const picture=document.getElementById("uploadPictureFile").files[0];

		fileReader.onloadend=()=>{
			const picUrl=fileReader.result;
			this.setState({
				pictureUrl:picUrl,
				displayImage:true
			})
		}

		if(picture!=null){
			fileReader.readAsDataURL(picture);
		}else{
			alert("Sorry but this type of image is not currently allowed. Change it to either jpeg,png to continue");
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

	sendBlogDataToDB=async({blogPostInformation,profilePostType,isAccessTokenUpdated,updatedAccessToken})=>{
		this.setState({
			isSubmittedAndProcessing:true
		})
		const currentTitle=this.state.title;
		const currentDescription=this.state.description;
		//this could be done in a better way but... niggas is on a time crunch and stressed soooooo.....
		const industries=this.state.industriesSelected;
		const selectedSubCommunities=this.state.subIndustriesSelected;
		const currentVideoDescription=this.state.videoDescription;
		const currentAudioDescription=this.state.audioDescription;
		let isEditSuccess=true;

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
		debugger;
		
			//Quick fix but this could be implemented in a better way
		if(this.props.previousState==null){
			const rawDraftContentState = JSON.stringify(convertToRaw(blogPostInformation.blogPostState.getCurrentContent()));
			const blogPostSendObject={
				title:currentTitle,
				description:currentDescription,
				industryArray:searchCriteriaIndustryArray,
				blog:rawDraftContentState,
				imgUrl:this.state.pictureUrl,
				videoDescription:currentVideoDescription,
				audioDescription:currentAudioDescription,
				isPostCrowned:this.state.isPostCrowned
			}

			const{confirmation,data}=await createBlogPost(
											this.props.personalInformation.id,
											blogPostSendObject,
											"Personal",
											isAccessTokenUpdated==true?updatedAccessToken:
											this.props.personalInformation.accessToken
										);
			if(confirmation=="Failure"){
				debugger;
				const {statusCode}=data;
				if(statusCode==401){
					isEditSuccess=false;
					await refreshTokenApiCallHandle(
							this.props.personalInformation.refreshToken,
							this.props.personalInformation.id,
							this.sendBlogDataToDB,
							this.props,
							{
								blogPostInformation,
								profilePostType
							},
							true
						);
				}else{
					isEditSuccess=false;
					alert('Unfortunately there has been an error when creating this post. Please try again');
					this.setState({
						isSubmittedAndProcessing:false
					})
				}
			}
		}else{
			const {previousData}=this.props;
			const {
				blogImageUrl,
				title,
				description,
				audioDescription,
				videoDescription,
				isCrownedPost,
				_id,
				industriesUploaded
			}=this.props.previousState;

			const editedImage={
				postType:"Blogs",
				postId:_id,
				post:{
					industriesUploaded:this.isArrayEqual(industriesUploaded,(searchCriteriaIndustryArray.length==0?industriesUploaded:searchCriteriaIndustryArray))==false
						?searchCriteriaIndustryArray:null,
					description:currentDescription!=description?currentDescription:null,
					title:currentTitle!=title?currentTitle:null,
					isCrownedPost:this.state.isPostCrowned!=isCrownedPost?this.state.isPostCrowned:null
				},
				postS3:[
					{
						optionType:'postUrl',
						newUrl:this.isImagesSrcEqual(this.state.pictureUrl,blogImageUrl)==false?this.state.pictureUrl:null
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
				ownerId:this.props.previousState.owner,
				accessToken:isAccessTokenUpdated==true?updatedAccessToken:
							this.props.personalInformation.accessToken
			}
			
 			const {confirmation,data}=await editPost(editedImage);
			if(confirmation=="Failure"){
				debugger;
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
							this.props.personalInformation.refreshToken,
							this.props.personalInformation.id,
							this.sendBlogDataToDB,
							this.props,
							{
								blogPostInformation,
								profilePostType
							},
							true
						);
				}else{
					isEditSuccess=false;
					alert('Unfortunately there has been an error editing this post. Please try again');
					this.setState({
						isSubmittedAndProcessing:false
					})
				}
			}
		}
		if(isEditSuccess!=false){
			alert('Your blog has been published. If you do not see it on your profile please wait a little bit');
			this.props.routerHistory.push('/profile/'+this.props.personalInformation.id);
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

	crownPost=()=>{
		this.setState({
			isPostCrowned:true,
			displayCrownModalIndicator:false
		})
	}

	unCrownPost=()=>{
		this.setState({
			isPostCrowned:false,
			displayCrownModalIndicator:false
		})
	}

	closeCrownModal=()=>{
		this.setState({
			isPostCrowned:false,
			displayCrownModalIndicator:false
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
			<BlogConsumer>
				{blogPostInformation=>(
					 <PostConsumer>
			{profilePostInformation=>(
				  <Container>	

						{this.state.displayVideoDescriptionPortal==false?
							null:
							<VideoDescriptionPortal
								closeModal={this.closeModal}
								createVideoDescription={this.createVideoDescription}
								parentContainer="blogPostContainer"
							/>
						}
						{this.state.displayVoiceDescriptionPortal==false?
							null:
							<VoiceDescriptionPortal
								closeModal={this.closeModal}
								createAudioDescription={this.createAudioDescription}
								isBlog={true}
							/>
						}

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


							<ul style={{padding:"0px"}}>
								<li style={{listStyle:'none',marginLeft:"5%",marginTop:"5%"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",fontSize:"25px"}}>
											<b>Final touches</b>    (optional)
										</li>
										<li style={{listStyle:"none"}}>
											Before you finally submit your blog you can add some additional information. This would allow people to 
											learn about your article more and even locate it easier 
										</li>
									</ul>
								</li>

								<li style={{listStyle:"none",display:"inline-block",
											boxShadow:"1px 1px 5px #8c8c8c",borderStyle:"dotted",borderRadius:"5px",marginLeft:"4%",marginTop:"10%"}}>
									<a href="javascript:void(0);">
										<CrownIconContainer onClick={()=>this.setState({displayCrownModalIndicator:true})}>
											<Icon 
												id="crownIcon"
												icon={crownIcon}
												style={{borderRadius:"50%",zIndex:"8",backgroundColor:"white",fontSize:"40px",color:"#C8B0F4"}}
											/>
										</CrownIconContainer>
									</a>
									<input type="file" name="img" id="uploadPictureFile" style={{position:"relative",opacity:"0",zIndex:"0"}} onChange={()=>this.handleUploadPicture()} accept="image/x-png,image/gif,image/jpeg"></input>
									{this.state.displayImage==false?
										<React.Fragment>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<ul onClick={()=>this.clickInputFileButton()} style={{padding:"110px"}}>
													<li style={{listStyle:"none",marginLeft:"25%"}}>
														<CameraIcon
															style={{fontSize:35,color:"#5298F8"}}
														/>
													</li>
													<li style={{listStyle:"none",color:"#5298F8"}}>
														Upload photo
													</li>
												</ul>
											</a>
										</React.Fragment>:
										<ImageContainer>
											<ul style={{backgroundColor:"white",zIndex:"8",position:"absolute",marginRight:"5%",padding:"15px"}}>
												<li onClick={()=>this.clickInputFileButton()} style={{listStyle:"none"}}>
													<a href="javascript:void(0);">
														<HighlightOffIcon
															style={{fontSize:30}}
														/>
													</a>
												</li>
												{/*	
													<li style={{listStyle:"none"}}>
														<a href="javascript:void(0);">
															<FormatColorFillIcon
																style={{fontSize:30}}
															/>
														</a>
													</li>
												*/}
											</ul>
											<img src={this.state.pictureUrl} width="100%" height="80%"/>
										</ImageContainer>
									}
								</li>

								<li style={{position:"absolute",listStyle:"none",display:"inline-block",marginLeft:"10%"}}>
									{this.state.displayIndustrySelectModal==false?
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none"}}>
												<ul style={{zIndex:"8",marginRight:"5%",padding:"15px"}}>
													{this.state.videoDescription==null?null:
														<li style={{listStyle:"none",marginBottom:"2%"}}>
															<VideoDescriptionContainer>
																<video key={this.uuidv4()} width="100%" height="100%" borderRadius="50%" autoplay="true">
																	<source src={this.state.videoDescription} type="video/mp4"/>
																</video>
															</VideoDescriptionContainer>
														</li>
													}
													{this.state.audioDescription==null?null:
														<li style={{listStyle:"none"}}>
															<audio key={this.uuidv4()} controls>
															  <source src={this.state.audioDescription} type="audio/ogg"/>
															  <source src={this.state.audioDescription} type="audio/mpeg"/>
															Your browser does not support the audio element.
															</audio>
														</li>
													}
												</ul>
											</li>

											<p> Title (optinal)</p>
											<BlogTitle
												placeholder="Write down a title so it will immediately grab users attention"
												id="blogTitle"
											/>
											<p> Description (optinal)</p>
											<BlogDescription
												placeholder="Write down a description so readers can get a quick summary of you masterpiece"
												id="blogDescription"
											/>
											<hr/>
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

											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li style={{listStyle:"none",marginTop:"5%",fontSize:"15px",backgroundColor:"#C8B0F4",padding:"5px",borderRadius:"5px",width:"150px"}}>
													<ul onClick={()=>this.setState({
																displayIndustrySelectModal:true,
																title:document.getElementById("blogTitle").value,
																description:document.getElementById("blogDescription").value
															})}>
														<li style={{listStyle:"none",display:"inline-block",color:"white"}}>
															Next
														</li>
													</ul>
												 </li>
											 </a>
										</ul>:
										<React.Fragment>
											<li style={{top:"-280px",listStyle:"none"}}>
												<IndustryPostOptions
													alterSelectedIndustry={this.alterSelectedIndustry}
													alterSelectedSubCommunities={this.alterSelectedSubCommunities}
												/>
											</li>
											{this.state.isSubmittedAndProcessing==false &&(
												<li style={{listStyle:"none",marginTop:"5%",fontSize:"15px",backgroundColor:"#C8B0F4",padding:"5px",borderRadius:"5px",width:"150px"}}>
													<a href="javascript:void(0);" style={{textDecoration:"none"}}>
															<ul onClick={()=>this.sendBlogDataToDB({blogPostInformation,profilePostInformation,isAccessTokenUpdated:false})}>
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
											)}
										</React.Fragment>
									}
								</li>
							</ul>
						</Container>
						)}
				</PostConsumer>
				)}
			</BlogConsumer>
		)
	}
}


const mapStateToProps=state=>{
	return{
		personalInformation:state.personalInformation,
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
)(BlogEditSubmitModal);
