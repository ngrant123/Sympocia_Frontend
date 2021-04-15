import React,{Component} from "react";
import styled from "styled-components";
import PERSONAL_INDUSTRIES from "../../../Constants/personalIndustryConstants.js";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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


class IndustryPostOptions extends Component{

	constructor(props){
		super(props);
		var subCommunitiesMap=new Map();
		debugger;
		this.state={
			industriesSelected:props.symposiumsUploaded.length==0?[]:props.symposiumsUploaded,
			subIndustriesSelectedDropDown:[],
			subIndustriesSelected:[],
			subCommunitiesMap:subCommunitiesMap
		}
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
			this.props.alterSelectedSubCommunities(newSubIndustries);
		}
	}

	addSelectedIndustry=(industry)=>{
		const currentSelectedIndustries=this.state.industriesSelected;

		var subIndustries=this.state.subIndustriesSelectedDropDown;
		var newSubCommunityMap=this.state.subCommunitiesMap;

		var industryContainerIndicator=false;
		for(var i=0;i<currentSelectedIndustries.length;i++){
			const industryArray=currentSelectedIndustries[i].industry;
			if(industry==industryArray){
				industryContainerIndicator=true;
				break;
			}
		}

		if(industryContainerIndicator!=true){
			currentSelectedIndustries.push(industry);
			const subCommunities=industry.subCommunity;
			var subCommunityCounter=subIndustries.length;
			if(subCommunities!=null){
				for(var i=0;i<subCommunities.length;i++){
					const subCommunity=subCommunities[i];
					if(!newSubCommunityMap.has(subCommunity)){
						subIndustries.push(subCommunity);
						newSubCommunityMap.set(subCommunity,subCommunityCounter);
						subCommunityCounter++;
					}
				}

			}
		}
		console.log(currentSelectedIndustries);
		this.setState({
			industriesSelected:currentSelectedIndustries,
			subCommunitiesMap:newSubCommunityMap,
			subIndustriesSelectedDropDown:subIndustries
		})
		this.props.alterSelectedIndustry(currentSelectedIndustries);
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

		if(industry.subCommunity!=null){
			for(var i=0;i<industry.subCommunity.length;i++){
				const subCommunity=industry.subCommunity;
				var focusedSubCommunity=subCommunity[i];
				this.removeSubCommunity(focusedSubCommunity,"dropDown");
			}
		}
		
		this.setState({
			industriesSelected:industries
		})
		this.props.alterSelectedIndustry(industries);
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
				<li style={{listStyle:"none",display:"inline-block"}}>
										<p style={{color:"#8c8c8c"}}>Choose an symposium:</p>
										<div class="dropdown">
															<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																																					borderColor:"#5298F8",
																																					borderStyle:"solid",
																																					borderWidth:"1px",
																																					color:"#5298F8",
																																					backgroundColor:"white"}}>
																Symposiums
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
																<li  onClick={()=>this.removeIndustry(data)} style={{cursor:"pointer",listStyle:"none",display:"inline-block"}}>
																	<HighlightOffIcon
																		style={{ fontSize: 30 }}
																	/>
																</li>
															</ul>
														</li>
													)}
												</ul>
											</li>
											{/*
												<li style={{listStyle:"none",display:"inline-block"}}>
													<p>Choose an sub-symposium (optional):</p>
													<div class="dropdown">
														<button class="btn btn-primary dropdown-toggle" type="button"
															data-toggle="dropdown" style={{	
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
											*/}
											<li style={{listStyle:"none",display:"inline-block"}}>
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


			</React.Fragment>

		)
	}
}

export default IndustryPostOptions;
