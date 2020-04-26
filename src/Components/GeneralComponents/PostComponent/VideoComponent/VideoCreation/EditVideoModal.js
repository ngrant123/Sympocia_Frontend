import React,{Component} from "react";
import styled from "styled-components";
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import DescriptionIcon from '@material-ui/icons/Description';
import IndustryPostOptions from "../../IndustryPostOptions.js";
import SendIcon from '@material-ui/icons/Send';
import {connect} from "react-redux";
import {createVideoPost} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {PostConsumer} from "../../PostContext.js";

const TextContainerDescription=styled.textarea`
	height:30%;
	resize:none;
	border-style:none;
	color:#e4e9eb;
	border-style:solid;
	border-radius:5px;
	border-width:1px;
	border-color:#d7dadb;
	width:120%;
`;

const TextContainerTitle=styled.textarea`
	height:20%;
	resize:none;
	border-style:none;
	color:#e4e9eb;
	border-style:solid;
	border-radius:5px;
	border-width:1px;
	border-color:#d7dadb;
	width:120%;
`;

class EditVideoModal extends Component{


	constructor(props){
		super(props);

		this.state={
			industriesSelected:[],
			subIndustriesSelected:[],
			isVideoDescriptionCleared:false,
			isVideoTitleCleared:false,
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

	sendVideoDataToDB=(profilePostType)=>{

		const videoTitle=document.getElementById("videoTitle").value;
		const videoDescription=document.getElementById("videoDescription").value;

		//this could be done in a better way but... niggas is on a time crunch and stressed soooooo.....
		const industries=this.state.industriesSelected;
		const selectedSubCommunities=this.state.subIndustriesSelected;
		const searchCriteriaIndustryArray=[];
		var counter=0;
		for(var i=0;i<industries.length;i++){
			var {subCommunity}=industries[i];
			var addIndustryOrIndustryObject=false;
			var subCommunitiyArray=[];
			var subCommunityCounter=0;

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
			const searchObject={
						industry:industries[i].industry,
						subIndustry:subCommunitiyArray
			}
				searchCriteriaIndustryArray.push(searchObject);
		}
		debugger;
		const searchVideoResult={
			title:videoTitle,
			description:videoDescription,
			industryArray:searchCriteriaIndustryArray,
			videoSrc:this.props.videoSrc
		}
		
		if(profilePostType=="Company"){
			createVideoPost(this.props.companyProfileId,searchVideoResult,profilePostType);
		}
		else
			createVideoPost(this.props.personalProfileId,searchVideoResult,profilePostType);
	}

	render(){

		return(
			<PostConsumer>
				{profilePostInformation=>{
					return <React.Fragment>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block",marginRight:"15%"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",marginBottom:"4%"}}>
													<ul style={{padding:"0px",width:"110%"}}>
														<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
															<img src="" style={{borderRadius:"50%",width:"90px",height:"100px"}}/>
														</li>

														<li style={{listStyle:"none",display:"inline-block",fontSize:"25px",color:"#5e5e5e"}}>
															<b>Edit Video</b>
														</li>
													</ul>		
										</li>

										<li style={{listStyle:"none",paddingTop:"3%"}}>
											<ul style={{padding:"0px"}}>
												<li style={{position:"relative",listStyle:"none",display:"inline-block"}}>
													<SubtitlesIcon
														style={{ fontSize: 20 }}
													/>
												</li>

												<li style={{listStyle:"none",display:"inline-block",fontSize:"15px"}}>
													Title for video (optional)
												</li>

											</ul>

										</li>

										<li style={{listStyle:"none"}}>
											<TextContainerTitle
														placeholder="Write a title for your video"
														id="videoTitle"
												/>

										</li>
										<li style={{color:"#5298F8"}}>
											You will be able to edit this title at any point later
										</li>

										<li style={{listStyle:"none",paddingTop:"3%"}}>
											<ul style={{padding:"0px"}}>
												<li style={{position:"relative",listStyle:"none",display:"inline-block"}}>
													<DescriptionIcon
														style={{ fontSize: 20 }}
													/>
												</li>

												<li style={{listStyle:"none",display:"inline-block",fontSize:"15px"}}>
													Enter a description for your video (optional)
												</li>
											</ul>
										</li>

										<li style={{listStyle:"none",fontSize:"15px"}}>
													<TextContainerDescription
														placeholder="Write a description about your video"
														id="videoDescription"
													/>
										</li>
										<li style={{listStyle:"none",color:"#5298F8"}}>
											You will be able to edit this description at any point later
										</li>
									</ul>
								</li>
								<li style={{position:"relative",top:"-560px",listStyle:"none",display:"inline-block",marginLeft:"60%"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none"}}>
											<video width="100%" height="50%" controls autoplay>
													<source src={this.props.videoSrc} type="video/mp4"/>
											</video>
										</li>
										<li  style={{listStyle:"none"}}>
											<IndustryPostOptions
												alterSelectedIndustry={this.alterSelectedIndustry}
												alterSelectedSubCommunities={this.alterSelectedSubCommunities}
											/>

										</li>
										<li style={{listStyle:"none",marginTop:"5%",fontSize:"15px",backgroundColor:"#C8B0F4",padding:"5px",borderRadius:"5px",width:"150px"}}>
															<ul onClick={()=>this.sendVideoDataToDB(profilePostInformation.profileType)}>
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
									</ul>
								</li>
							</ul>

						</React.Fragment>
				}}


			</PostConsumer>
		)
	}
}

const mapStateToProps=state=>{
	return{
		personalProfileId:state.personalInformation.id,
		companyProfileId:state.companyInformation.id
	}
}

export default connect(
	mapStateToProps,
	null
)(EditVideoModal);
