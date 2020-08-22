import React,{Component} from "react";
import styled from "styled-components";
import CameraIcon from '@material-ui/icons/Camera';
import SendIcon from '@material-ui/icons/Send';
import IndustryPostOptions from "../../IndustryPostOptions.js";
import {createBlogPost} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {connect} from "react-redux";
import {BlogConsumer} from "./BlogContext.js";
import {PostConsumer} from "../../PostContext.js";
import { convertToRaw } from 'draft-js';

import VideoDescriptionPortal from "../../VideoDescriptionPortal.js";
import VoiceDescriptionPortal from "../../VoiceDescriptionPortal.js";
import MicIcon from '@material-ui/icons/Mic';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

const Container=styled.div`
	position:absolute;
	width:50%;
	height:70%;
	background-color:white;
	border-radius:5px;
	z-index:5;
	top:25%;
	left:30%;
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
	width:170%;
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
	width:170%;
	marginBottom:5%;
	padding:5px;
`;

const VideoDescriptionContainer=styled.div`
	position:relative;
	width:60px;
	height:50px;
	border-radius:50%;
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
			audioDescription:null	
		}
	}

	clickInputFileButton=()=>{
		document.getElementById("uploadPictureFile").click();
	}

	handleUploadPicture=()=>{
		let fileReader= new FileReader();
		const picture=document.getElementById("uploadPictureFile").files[0];

		fileReader.onloadend=()=>{
			console.log(fileReader.result);
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

	sendBlogDataToDB=(blogPostInformation,profilePostType)=>{
		const {title,description}=this.state;
		//this could be done in a better way but... niggas is on a time crunch and stressed soooooo.....
		const industries=this.state.industriesSelected;
		const selectedSubCommunities=this.state.subIndustriesSelected;
		const videoDescription=this.state.videoDescription;
		const audioDescription=this.state.audioDescription;

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
		const rawDraftContentState = JSON.stringify(convertToRaw(blogPostInformation.blogPostState.getCurrentContent()));
		const blogPostSendObject={
			title:title,
			description:description,
			industryArray:searchCriteriaIndustryArray,
			blog:rawDraftContentState,
			imgUrl:this.state.pictureUrl,
			videoDescription:videoDescription,
			audioDescription:audioDescription
		}
			//Quick fix but this could be implemented in a better way

			if(this.props.personalProfile.loggedIn==true){
				createBlogPost(this.props.personalProfile.id,blogPostSendObject,"Personal");
			}
			else{
				createBlogPost(this.props.companyProfile.id,blogPostSendObject,"Company");
			}
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
													<li style={{listStyle:"none",display:"inline-block",boxShadow:"1px 1px 5px #8c8c8c",borderStyle:"dotted",borderRadius:"5px",marginLeft:"4%",marginTop:"10%"}}>
														{this.state.displayImage==false?
															<React.Fragment>
																<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																	<ul onClick={()=>this.clickInputFileButton()}style={{padding:"110px"}}>
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
																<input type="file" name="img" id="uploadPictureFile" style={{position:"relative",opacity:"0",zIndex:"0"}} onChange={()=>this.handleUploadPicture()} accept="image/x-png,image/gif,image/jpeg"></input>
															</React.Fragment>:
															<ImageContainer>
																<img src={this.state.pictureUrl} width="100%" height="100%"/>
															</ImageContainer>
														}
													</li>

													<li style={{position:"absolute",listStyle:"none",display:"inline-block",marginLeft:"10%",marginTop:"15%"}}>
														{this.state.displayIndustrySelectModal==false?
																<ul style={{padding:"0px"}}>
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
																</ul>:
																<React.Fragment>
																	<li style={{top:"-280px",listStyle:"none"}}>
																		<IndustryPostOptions
																			alterSelectedIndustry={this.alterSelectedIndustry}
																			alterSelectedSubCommunities={this.alterSelectedSubCommunities}
																		/>
																	</li>
																	<li style={{listStyle:"none",marginTop:"5%",fontSize:"15px",backgroundColor:"#C8B0F4",padding:"5px",borderRadius:"5px",width:"150px"}}>
																		<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																				<ul onClick={()=>this.sendBlogDataToDB(blogPostInformation,profilePostInformation)}>
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
		personalProfile:state.personalInformation,
		companyProfile:state.companyInformation
	}
}

export default connect(
	mapStateToProps,
	null
)(BlogEditSubmitModal);