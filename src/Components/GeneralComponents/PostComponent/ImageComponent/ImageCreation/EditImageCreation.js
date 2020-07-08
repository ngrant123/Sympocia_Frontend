import React,{Component} from "react";
import styled from "styled-components";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import SendIcon from '@material-ui/icons/Send';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {createImagePost} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
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
import VideoDescriptionPortal from "../VideoDescriptionPortal.js";
import VoiceDescriptionPortal from "../VoiceDescriptionPortal.js";

const Container=styled.div`
	position:fixed;
	z-index:21;
	background-color:white;
	border-radius:5px;
	top:20%;
	left:25%;
	width:65%;
	overflow-y:scroll;
	height:60%;
`;


const Image=styled.div`
	position:relative;
	width:100%;
	height:100%;
	overflow:hidden;
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
			displayVoiceDescriptionPortal:false
		}
	}

	componentDidMount(){
		console.log("Testing component");
		const imageElement= <ProcessImage
									image={this.props.imageSrcUrl}
									resize={{width:450,height:450}}
									quality={100}
									processedImage={(src, err) => this.setState({ src, err })}
							/>;

		this.setState({
			imgElement:imageElement
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
		const selectedSubCommunities=this.state.subIndustriesSelected;
		const searchCriteriaIndustryArray=[];
		var descriptionTextArea=(this.state.isImageDescriptionCleared==false)?"":document.getElementById("descriptionTextArea").value;
		var captionTextArea=(this.state.isCaptionCleared==false)?"":document.getElementById("captionTextArea").value;

		//this could be done in a better way but... niggas is on a time crunch and stressed soooooo.....
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
		const searchCriteriaObject={
			imgUrl:imgUrl,
			industryArray:searchCriteriaIndustryArray,
			description:descriptionTextArea,
			caption:captionTextArea
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
		const newImageObject={
			...searchCriteriaObject,
			industriesUploaded:searchCriteriaObject.industryArray,
			comments:[],
			datePosted:dateInMill
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
										/>
									}
									{this.state.displayVoiceDescriptionPortal==false?
										null:
										<VoiceDescriptionPortal
											closeModal={this.closeModal}
										/>
									}

									<ul style={{padding:"10px"}}>
										<li style={{listStyle:"none",display:"inline-block",width:"50%",marginRight:"2%"}}>
											<Image>
												<ul style={{backgroundColor:"white",zIndex:"8",position:"absolute",marginRight:"5%",padding:"15px"}}>
													<li style={{listStyle:"none"}}>
														<a href="javascript:;">
															<HighlightOffIcon
																style={{fontSize:30}}
															/>
														</a>
													</li>
													<li onClick={()=>this.setState({displayFilterPictureModal:true})} style={{listStyle:"none"}}>
														<a href="javascript:;">
															<FormatColorFillIcon
																style={{fontSize:30}}
															/>
														</a>
													</li>

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


