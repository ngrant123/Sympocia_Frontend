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
	background-color:blue;
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
				changeUnFollowedSymposiums([...result[0].data.message]);
			}else{
				const followedSymposiumsConfirmationStatus=result[0].confirmation;
				const unFollowedSymposiumsConfirmationStatus=result[1].confirmation;

				if(followedSymposiumsConfirmationStatus=="Success" && unFollowedSymposiumsConfirmationStatus=="Success"){
					changeFollowedSymposiums([...result[0].data.message]);
					changeUnFollowedSymposiums([...result[1].data.message]);
				}
			}
		});
	},[]);
	const symposiumsConstruction=()=>{

	}
	return (
		<SuggestedSymposiumsContainer>
			<div>
				<div style={{display:"flex",flexDirection:"row"}}>
					<p>Popular Symposiums</p>
					<p>View All</p>
				</div>
			</div>

			<div>
				<div style={{display:"flex",flexDirection:"row"}}>
					<p>Symposiums For You</p>
				</div>

			</div>
	   	</SuggestedSymposiumsContainer>
	)
}


export default ConstructSuggestedSymposium;