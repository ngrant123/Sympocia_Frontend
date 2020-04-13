import React,{Component} from "react";
import styled from "styled-components";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import SendIcon from '@material-ui/icons/Send';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {createImagePost} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {connect} from "react-redux";
import {industryPostOptions} from "../../IndustryPostOptions.js";


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
		var subCommunitiesMap=new Map();
		this.setState({
			imgUrl:this.props.imageSrcUrl,
			subCommunitiesMap:subCommunitiesMap
		})
	}

	clearImageCaptionTextArea=()=>{

		if(this.state.isCaptionCleared==false){
			document.getElementById("captionTextArea").value="";
			document.getElementById("captionTextArea").stlye.color="black";

			this.setState(prevState=>({
				...prevState,
				isCaptionCleared:true
			}))
		}else if(this.state.isImageDescriptionCleared==false){

			document.getElementById("descriptionTextArea").value="";
			document.getElementById("descriptionTextArea").stlye.color="black";
			this.setState(prevState=>({
				...prevState,
				isImageDescriptionCleared:true
			}))
		}
	}

	sendImageDateToDB=()=>{
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
			for(var j=0;j<subCommunity.length;j++){
				const targetedSubCommunity=subCommunity[j];
				if(targetedSubCommunity.industry==selectedSubCommunities[counter]){
					const searchObject={
						industry:industries[i].industry,
						subCommunity:selectedSubCommunities[counter]
					}
					searchCriteriaIndustryArray.push(searchObject);
					counter++;
					break;
				}
			}
		}
		const searchCriteriaObject={
			imgUrl:imgUrl,
			industryArray:searchCriteriaIndustryArray,
			description:descriptionTextArea,
			caption:captionTextArea
		}
		createImagePost(this.props._id,searchCriteriaObject);
	}

	addSelectedSubCommunity=(subIndustry)=>{
		const newSubIndustries=this.state.subIndustriesSelected;
		const subCommunity=subIndustry.industry;
		var pushToArrayIndicator=false;
		for(var i=0;i<newSubIndustries.length;i++){
			const community=newSubIndustries[i];
			if(community==subCommunity){
				pushToArrayIndicator=true;
				break;
			}
		}
		if(pushToArrayIndicator==false){
			newSubIndustries.push(subIndustry.industry);
			this.setState({
				subIndustriesSelected:newSubIndustries
			})
		}
	}

	addSelectedIndustry=async(industry)=>{
		console.log(industry);
		const currentSelectedIndustries=this.state.industriesSelected;

		var subIndustries=this.state.subIndustriesSelectedDropDown;
		var newSubCommunityMap=this.state.subCommunitiesMap;

		const {
			industriesSelected,
			subCommunitiesMap,
			subIndustriesSelectedDropDown
		}=await industryPostOptions(industry,currentSelectedIndustries,subIndustries,newSubCommunityMap);

		this.setState({
			industriesSelected:currentSelectedIndustries,
			subCommunitiesMap:newSubCommunityMap,
			subIndustriesSelectedDropDown:subIndustries
		})
	}

	removeIndustry=(industry)=>{
		const {subCommunity}=industry;
		var subCommunities=this.state.subIndustriesSelectedDropDown;
		var industries=this.state.industriesSelected;

		for(var i=0;i<industries.length;i++){
			const industryArray=industries[i];
			const industrySelectectedArrary=industryArray.industry;
			if(industry.industry==industrySelectectedArrary){
				industries.splice(i,1);
				break;
			}
		}

		for(var i=0;i<industry.subCommunity.length;i++){
			const subCommunity=industry.subCommunity;
			var focusedSubCommunity=subCommunity[i];
			this.removeSubCommunity(focusedSubCommunity,"dropDown");
		}

		this.setState({
			industriesSelected:industries
		})
	}

	removeSubCommunity=(subCommunity,location)=>{
		var subCommunities=this.state.subIndustriesSelectedDropDown;
		var subCommunitiesMap=this.state.subCommunitiesMap;

		if(location=="dropDown"){
			if(subCommunitiesMap.has(subCommunity)){
				for(var i=0;i<subCommunities.length;i++){
					if(subCommunities[i]==subCommunity){
							subCommunities.splice(i,1);
							subCommunitiesMap.delete(subCommunity);
						break;
					}
				}
			}

			for(var i=0;i<this.state.subIndustriesSelected.length;i++){
				if(this.state.subIndustriesSelected[i]==subCommunity.industry){
					this.state.subIndustriesSelected.splice(i,1);
					break;
				}
			}

		}else{
			for(var i=0;i<this.state.subIndustriesSelected.length;i++){
				if(this.state.subIndustriesSelected[i]==subCommunity){
					this.state.subIndustriesSelected.splice(i,1);
					break;
				}
			}
		}

		this.setState({
			subIndustriesSelectedDropDown:subCommunities,
			subCommunitiesMap:subCommunitiesMap
		})
	}

	render(){
		return(
			<React.Fragment>
				<ul style={{padding:"10px"}}>
					<li style={{listStyle:"none",display:"inline-block",width:"50%",marginRight:"2%"}}>
						<Image>
							<img src={this.state.imgUrl} style={{position:"relative",height:"100%",width:"100%"}}/>
						</Image>
					</li>

					<li style={{position:"absolute",listStyle:"none",display:"inline-block"}}>
						<ul style={{padding:"0px",width:"300px"}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
										Choose an industry:
										<div class="dropdown">
															<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																																					borderColor:"#5298F8",
																																					borderStyle:"solid",
																																					borderWidth:"1px",
																																					color:"#5298F8",
																																					backgroundColor:"white"}}>
																Industries
															   	<span class="caret"></span>
															</button>
															<ul class="dropdown-menu" style={{height:"350px",overflowY:"auto"}}>
																{PERSONAL_INDUSTRIES.INDUSTRIES.map(data=>
																	<li onClick={()=>this.addSelectedIndustry(data)}>
																		<a href="javascript:;">{data.industry}</a>
																	</li>
																)}
															</ul>
									  	</div>
									</li>
									{this.state.industriesSelected.length!=0?
										<React.Fragment>
											<li style={{listStyle:"none"}}>
												<ul style={{padding:"0px"}}>
													{this.state.industriesSelected.map(data=>
														<li style={{listStyle:"none",display:"inline-block",marginRight:"1px",marginBottom:"1%"}}>
															<ul style={{padding:"0px"}}>
																<li style={{listStyle:"none",display:"inline-block"}}>
																	<SelectedIndustryButton>
																		{data.industry}
																	</SelectedIndustryButton>
																</li>
																<li  onClick={()=>this.removeIndustry(data)} style={{listStyle:"none",display:"inline-block"}}>
																	<HighlightOffIcon
																		style={{ fontSize: 30 }}
																	/>
																</li>
															</ul>
														</li>
													)}
												</ul>
											</li>
											<li style={{listStyle:"none"}}>
												Choose an sub-industry (optional):
												<div class="dropdown">
																	<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																																							borderColor:"#5298F8",
																																							borderStyle:"solid",
																																							borderWidth:"1px",
																																							color:"#5298F8",
																																							backgroundColor:"white"}}>
																		Sub-industries
																	   	<span class="caret"></span>
																	</button>
																	<ul class="dropdown-menu" style={{height:"350px",overflowY:"auto"}}>
																		{this.state.subIndustriesSelectedDropDown.map(data=>
																			<li onClick={()=>this.addSelectedSubCommunity(data)}>
																				<a href="javascript:;">{data.industry}</a>
																			</li>
																		)}
																	</ul>
											  	</div>
											</li>
											<li style={{listStyle:"none"}}>
													<ul style={{padding:"0px"}}>
														{this.state.subIndustriesSelected.map(data=>
															<li style={{listStyle:"none",display:"inline-block",marginRight:"1px",marginBottom:"1%"}}>
																<ul style={{padding:"0px"}}>
																	<li style={{listStyle:"none",display:"inline-block"}}>
																		<SelectedIndustryButton>
																			{data}
																		</SelectedIndustryButton>
																	</li>

																	<li onClick={()=>this.removeSubCommunity(data,"selected")} style={{listStyle:"none",display:"inline-block"}}>
																		<HighlightOffIcon/>
																	</li>
																</ul>
																
															</li>
														)}
													</ul>
											</li>
											
										</React.Fragment>:
										<React.Fragment></React.Fragment>
									}

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
												<ul onClick={()=>this.sendImageDateToDB()}>
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
		)
	}
}

const mapStateToProps=state=>{
	return{
		_id:state.personalInformation.id
	}
}

export default connect(
	mapStateToProps,
	null
)(EditImageCreation);


