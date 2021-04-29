import React from "react";
import styled from "styled-components";
import PERSONAL_INDUSTRIES from "../../../../Constants/personalIndustryConstants.js";
import COMPANY_INDUSTRIES from "../../../../Constants/industryConstants.js";
import PersonalIndustry from "../../../../Constants/personalIndustryConstants.js";
import CompanyIndustry from "../../../../Constants/industryConstants.js";
import {getSymposiumId} from "../../../../Actions/Requests/HomePageAxiosRequests/HomePageGetRequests.js";

const SuggestedSymposiumsContainer=styled.div`
	${({isBlogPost})=>
		isBlogPost!=null?
		`width:90%;`:`width:170px;`
	}

	${({currentHeight})=>
		currentHeight!=null&&(
			`height:${currentHeight};`
		)
	}
	margin-left:2%;
	margin-right:2%;

	@media screen and (max-width:1370px){
		width:90%;
	}
	@media screen and (max-width:650px){
		width:90%;
	}
`;

const SuggestedSymposiumsCSS={
	width:"100%",
	height:"30%",
	padding:"20px",
	fontSize:"15px",
	color:"white",
	listStyle:"none",
	borderRadius:"5px",
	marginBottom:"5%",
	cursor:"pointer"
}

const displayPersonalIndustryFeed=async(personalInformationRedux,selectedSymposium,selectedIndustries,previousProps)=>{
		//have to format selected industries in and add additional information so that the personalPage can 
		//accept props

		var industryColorMap=new Map();

		if(previousProps.displaySymposium!=null){
			if(selectedSymposium!=null){
				for(var i=0;i<selectedIndustries.length;i++){
					const currentSymposium=selectedIndustries[i].industry;
					if(currentSymposium==selectedSymposium.industry){
						selectedIndustries.splice(i,1);
						selectedIndustries.splice(0,0,selectedSymposium);
						break;
					}
				}
			}
			else{
				var personalIndustries=PersonalIndustry.INDUSTRIES;
				var companyIndustries=CompanyIndustry.INDUSTRIES;

				if(personalInformationRedux.loggedIn==true){
					for(var i=0;i<personalIndustries.length;i++){
						const industry=personalIndustries[i];
						industryColorMap.set(industry.industry,industry.backgroundColor);
					}
				}else{
					for(var i=0;i<companyIndustries.length;i++){
						const industry=personalIndustries[i];
						industryColorMap.set(industry.industry,industry.backgroundColor);
					}
				}
			}

			var isPersonalProfile;
			const industryArray=[];
			let selectedSymposiums;
			for(var i=0;i<selectedIndustries.length;i++){
				const currentPostIndustry=selectedIndustries[i];
				const {data}=await getSymposiumId(currentPostIndustry.industry);
				var color;
				if(currentPostIndustry.backgroundColor==null)
					var color=industryColorMap.get(currentPostIndustry.industry);
				else
					color=currentPostIndustry.backgroundColor

				const industryObject={
					_id:data,
					backgroundColor:color,
					symposium:currentPostIndustry.industry,
					popularVideos:[]
				}
				if(i!=0){
					
					industryArray.push(industryObject);
				}else{
					selectedSymposiums=industryObject;
				}
			}
			industryArray.reverse();

			const selectedSymposiumsObject={
				selectedSymposiums,
				symposiums:industryArray
			}

			previousProps.displaySymposium(selectedSymposiumsObject);
		}
}


const ConstructSuggestedSymposium=({personalInformation,previousProps,isBlogPost,currentHeight})=>{
		
		const {personalInformationState}=personalInformation;
		var symposiumContainer=new Map();
		var selectedSymposiums=[];
		var counter=0;
		while(counter<3){   
			const randomNum=Math.floor(Math.random() * ((PERSONAL_INDUSTRIES.INDUSTRIES.length-1) - 0 + 1)) + 0;
			const randomlySelected=PERSONAL_INDUSTRIES.INDUSTRIES[randomNum];
			if(!symposiumContainer.has(randomlySelected.industry)){
				symposiumContainer.set(randomlySelected.industry,1);
				selectedSymposiums.push(randomlySelected);
			}
			counter++;
		}

		return <SuggestedSymposiumsContainer isBlogPost={isBlogPost} currentHeight={currentHeight}>
					<b> Suggested symposiums </b>
					{selectedSymposiums.map(data=>
						<div id="suggestedSymposiumLI" onClick={()=>displayPersonalIndustryFeed(personalInformation,data,selectedSymposiums,previousProps)}
							 style={{...SuggestedSymposiumsCSS,background:data.backgroundColor}}>
								<b>{data.industry}</b>
						</div>
					)}
			   </SuggestedSymposiumsContainer>
}

export{
	ConstructSuggestedSymposium,
	displayPersonalIndustryFeed
};