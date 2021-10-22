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
import {Link} from "react-router-dom";

const SuggestedSymposiumsContainer=styled.div`
	background-color:white;
	width:100%;
	display:flex;
	flex-direction:row;
	justify-content:space-between;
	margin-bottom:5px;

	@media screen and (max-width:1370px){
		margin-top:7% !important;
		#userSymposiums{
			display:none !important;
		}
	}

	@media screen and (max-width:650px){
		margin-top:20% !important;
		#popularSymposiumsDiv{
			width:100% !important;
		}

		#popularSymposiums{
			overflow-x:scroll !important;
		}

		#symposium{
			margin-bottom:3% !important;
			width:130px !important;
		}
		#viewAllText{
			display:none !important;
		}
	}

	@media screen and (min-width:300px) and (max-width:430px) 
		and (min-height:1000px) and (max-height:1400px){
		margin-top:40% !important;
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		margin-top:0% !important;
    }

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	margin-top:5% !important;
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

const SymposiumCSS={
	display:"flex",
	alignItems:"center",
	justifyContent:"center",
	borderRadius:"5px",
	color:"white",
	padding:"5px",
	position:"relative",
	width:"120px",
	overflow:"hidden",
	boxShadow:"1px 1px 5px #6e6e6e",
	cursor:"pointer"
}

const ShadowDivCSS={
	position:"absolute",
	width:"100%",
	height:"100%"
}

const ConstructSuggestedSymposium=({userId})=>{
	const [followedSymposiums,changeFollowedSymposiums]=useState([]);
	const [unFollowedSymposiums,changeUnFollowedSymposiums]=useState([]);

	useEffect(()=>{
		const promise=[];
		if(userId!="0"){
			promise.push(getSymposiumsFollowedHome(userId));
		}
		promise.push(getSymposiumsNotFollowed(userId));

		Promise.all(promise).then(result=>{
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

	const symposiumConstruction=(symposiumData)=>{
		var symposiums=PERSONAL_INDUSTRIES.INDUSTRIES;
		let symposiumColors;
		const {symposium}=symposiumData;
		for(var i=0;i<symposiums.length;i++){
			const currentSymposium=symposiums[i].industry;
			if(currentSymposium==symposium){
				const {
					backgroundColor,
					solidBackgroundColor
				}=symposiums[i];
				symposiumColors={
					backgroundColor,
					solidBackgroundColor
				}
				break;
			}
		}
		symposiumData={
			...symposiumData,
			...symposiumColors
		}

		return(
			<Link to={{pathname:`/symposium/${symposiumData.symposium}`,
					state:{
						selectedSymposium:symposiumData,
						profileId:userId,
						symposiums:[]
					}
				}} style={{marginRight:"2%",textDecoration:"none"}}>
				<div id="symposium" style={{...SymposiumCSS,backgroundColor:symposiumColors.solidBackgroundColor}}>
					<div style={ShadowDivCSS}>
						<div style={{background:"rgba(0, 0, 0, 0.1)",position:"absolute",width:"100%",height:"100%",zIndex:2}}/>
					</div>
					<p style={{zIndex:10}}>{symposium}</p>
				</div>
			</Link>
		)
	}
	return (
		<SuggestedSymposiumsContainer>
			<div id="popularSymposiumsDiv" style={{display:"flex",flexDirection:"column"}}>
				<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
					<p style={{color:"#BEBEBE"}}>
						<b>Popular Symposiums</b>
					</p>
					<p id="viewAllText" style={{cursor:"pointer",color:"#BEBEBE"}}>
						<b>View All</b>
					</p>
				</div>
				<div id="popularSymposiums" style={{display:"flex",flexDirection:"row"}}>
					{unFollowedSymposiums.map(data=>
						<React.Fragment>
							{symposiumConstruction(data)}
						</React.Fragment>
					)}
				</div>
			</div>

			<div id="userSymposiums" style={{display:"flex",flexDirection:"column",width:"40%"}}>
				<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
					<p style={{color:"#BEBEBE"}}>
						<b>Symposiums For You</b>
					</p>
					<p style={{color:"#BEBEBE",cursor:"pointer"}}>
						<b>View All</b>
					</p>
				</div>
				<div style={{display:"flex",flexDirection:"row"}}>
					{followedSymposiums.map(data=>
						<React.Fragment>
							{symposiumConstruction(data)}
						</React.Fragment>
					)}
				</div>
			</div>
	   	</SuggestedSymposiumsContainer>
	)
}


export default ConstructSuggestedSymposium;