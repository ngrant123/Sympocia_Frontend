import React,{useState,useEffect} from "react";
import styled from "styled-components";
import PERSONAL_INDUSTRIES from "../../../Constants/personalIndustryConstants.js";
import COMPANY_INDUSTRIES from "../../../Constants/industryConstants.js";
import PersonalIndustry from "../../../Constants/personalIndustryConstants.js";
import CompanyIndustry from "../../../Constants/industryConstants.js";
import {getSymposiumId} from "../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import {
	getSymposiumsFollowedHome,
	getSymposiumsNotFollowed
} from "../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";

const SuggestedSymposiumsContainer=styled.div`
	background-color:white;
	width:100%;
	display:flex;
	flex-direction:row;
	justify-content:space-between;
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


const ConstructSuggestedSymposium=({userId})=>{
	const [followedSymposiums,changeFollowedSymposiums]=useState([]);
	const [unFollowedSymposiums,changeUnFollowedSymposiums]=useState([]);

	useEffect(()=>{
		debugger;
		const promise=[];
		if(userId!="0"){
			promise.push(getSymposiumsFollowedHome(userId));
		}
		promise.push(getSymposiumsNotFollowed(userId));

		Promise.all(promise).then(result=>{
			debugger;
			if(userId=="0"){
				const spliceSymposiums=result[0].data.message.splice(0,5);
				changeUnFollowedSymposiums([...spliceSymposiums]);
			}else{
				const followedSymposiumsConfirmationStatus=result[0].confirmation;
				const unFollowedSymposiumsConfirmationStatus=result[1].confirmation;

				if(followedSymposiumsConfirmationStatus=="Success" && unFollowedSymposiumsConfirmationStatus=="Success"){
					const splicedFollowedSymposiums=result[0].data.message.splice(0,5);
					const splicedUnFollowedSymposiums=result[1].data.message.splice(0,5);

					changeFollowedSymposiums([...splicedFollowedSymposiums]);
					changeUnFollowedSymposiums([...splicedUnFollowedSymposiums]);
				}
			}
		});
	},[]);

	const symposiumConstruction=(symposium)=>{
		var symposiums=PERSONAL_INDUSTRIES.INDUSTRIES;
		let backgroundColor;
		for(var i=0;i<symposiums.length;i++){
			const currentSymposium=symposiums[i].industry;
			if(currentSymposium==symposium){
				backgroundColor=symposiums[i].backgroundColor;
				break;
			}
		}

		return(
			<div style={{display:"flex",alignItems:"center",justifyContent:"center",background:backgroundColor}}>
				<p>{symposium}</p>
			</div>
		)
	}
	return (
		<SuggestedSymposiumsContainer>
			<div style={{display:"flex",flexDirection:"column"}}>
				<div style={{display:"flex",flexDirection:"row"}}>
					<p>Popular Symposiums</p>
					<p>View All</p>
				</div>
				<div style={{display:"flex",flexDirection:"row"}}>
					{unFollowedSymposiums.map(data=>
						<React.Fragment>
							{symposiumConstruction(data.symposium)}
						</React.Fragment>
					)}
				</div>
			</div>

			<div style={{display:"flex",flexDirection:"column"}}>
				<div style={{display:"flex",flexDirection:"row"}}>
					<p>Symposiums For You</p>
				</div>
				<div style={{display:"flex",flexDirection:"row"}}>
					{followedSymposiums.map(data=>
						<p>{data.symposium}</p>
					)}
				</div>
			</div>
	   	</SuggestedSymposiumsContainer>
	)
}


export default ConstructSuggestedSymposium;