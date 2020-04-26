import React,{Component} from "react";
import styled from "styled-components";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import SendIcon from '@material-ui/icons/Send';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {createImagePost} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {connect} from "react-redux";
import IndustryPostOptions from "../../IndustryPostOptions.js";
import {PostConsumer} from "../../PostContext.js";


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
			subIndustriesSelected:[]
		}
	}

	componentDidMount(){
		console.log("Testing component");
		this.setState({
			imgUrl:this.props.imageSrcUrl
		})
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

	sendImageDateToDB=(profilePostType)=>{
		debugger;
		console.log("Submit button clicked");
		const industries=this.state.industriesSelected;
		const selectedSubCommunities=this.state.subIndustriesSelected;
		const imgUrl=this.state.imgUrl;
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
		const searchCriteriaObject={
			imgUrl:imgUrl,
			industryArray:searchCriteriaIndustryArray,
			description:descriptionTextArea,
			caption:captionTextArea
		}

		if(profilePostType=="Company"){
			createImagePost(this.props.companyProfileId,searchCriteriaObject,profilePostType);
		}
		else
			createImagePost(this.props.personalProfileId,searchCriteriaObject,profilePostType);
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

	render(){
		return(
			<PostConsumer>
				{profilePostInformation=>{
					return <React.Fragment>
								<ul style={{padding:"10px"}}>
									<li style={{listStyle:"none",display:"inline-block",width:"50%",marginRight:"2%"}}>
										<Image>
											<img src={this.state.imgUrl} style={{position:"relative",height:"100%",width:"100%"}}/>
										</Image>
									</li>

									<li style={{position:"absolute",listStyle:"none",display:"inline-block"}}>
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

									<li style={{listStyle:"none",marginTop:"5%",fontSize:"15px",backgroundColor:"#C8B0F4",padding:"5px",borderRadius:"5px",width:"150px"}}>
																<ul onClick={()=>this.sendImageDateToDB(profilePostInformation.profileType)}>
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
)(EditImageCreation);


