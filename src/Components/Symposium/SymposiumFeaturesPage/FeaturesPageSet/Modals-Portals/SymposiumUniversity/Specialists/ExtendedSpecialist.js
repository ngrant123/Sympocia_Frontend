import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {
	getSymposiumSpecialists,
	getProfileToSpecialistRankingInteractionStatus
} from "../../../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import {
	incrementSpecialistRanking,
	decrementSymposiumSpecialistRanking
} from "../../../../../../../Actions/Requests/SymposiumRequests/SymposiumAdapter.js";
import NoProfilePicture from "../../../../../../../designs/img/NoProfilePicture.png";
import {useSelector} from "react-redux";

const Container=styled.div`
	width:100%;
	height:100%;
	padding:10px;
`;


const InputContainer=styled.textarea`
	width:100%;
	resize:none;
	padding:5px;
	height:50px;
	padding-top:15px;
	border-style:solid;
	border-width:1px;
	border-color:#F1F0F0;
`;

const ButtonCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	color:"#3898ec",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	cursor:"pointer",
	width:"30%"
}


const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}


const SymposiumSpecialistsExtended=({closeModal,selectedSymposiumSpecialist,currentSymposiumId,isGuestProfile})=>{
	console.log(isGuestProfile);
	console.log(selectedSymposiumSpecialist);
	const [specialists,changeSpecialists]=useState([]);
	const [highlightedSpecialist,changeHighLightedSpecialist]=useState(selectedSymposiumSpecialist);
	const [hasProfilePreviouslyInteractedWithSpecialist,changeInteractionStatus]=useState(false);
	const [submitting,changeSubmittingStatus]=useState(false);
	const personalInformation=useSelector(state=>state.personalInformation);

	useEffect(()=>{
		const fetchData=async()=>{
			const {confirmation,data}=await getProfileToSpecialistRankingInteractionStatus(
												personalInformation.id,
												selectedSymposiumSpecialist._id
											);
			if(confirmation=="Success"){
				const {message}=data;
				changeInteractionStatus(message);
			}
		}
		fetchData();
	},[]);

	const triggerBackButton=()=>{
		if(selectedSymposiumSpecialist==null){
			changeHighLightedSpecialist(null);
		}else{
			closeModal();
		}
	}

	const incrementRanking=async()=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free');
		}else{
			changeSubmittingStatus(true);
			const {confirmation,data}=await incrementSpecialistRanking(
												highlightedSpecialist._id,
												personalInformation.id);
			if(confirmation=="Success"){
				changeInteractionStatus(!hasProfilePreviouslyInteractedWithSpecialist);
			}else{
				alert('Unfortunately there has been an error adding the reputation. Please try again');
			}
			changeSubmittingStatus(false);
		}
	}


	const decrementRanking=async()=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free');
		}else{
			changeSubmittingStatus(true);
			const {confirmation,data}=await decrementSymposiumSpecialistRanking(
												highlightedSpecialist._id,
												personalInformation.id);
			if(confirmation=="Success"){
				changeInteractionStatus(!hasProfilePreviouslyInteractedWithSpecialist);
			}else{
				alert('Unfortunately there has been an error removing this reputation. Please try again');
			}
			changeSubmittingStatus(false);
		}
	}

	return(
		<Container>
			<div style={ButtonCSS} onClick={()=>triggerBackButton()}>
				Back
			</div>
			<div style={{display:"flex",flexDirection:"column",marginTop:"10%"}}>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
					<img src={highlightedSpecialist.profilePicture==null?NoProfilePicture:highlightedSpecialist.profilePicture}
						style={{width:"70px",height:"70px",borderRadius:"50%"}}
					/>
					<div style={{display:"flex",flexDirection:"column",marginLeft:"5%",width:"50%"}}>
						<p>
							<b>{highlightedSpecialist.firstName}</b>
						</p>
					</div>
				</div>
				<hr style={HorizontalLineCSS}/>
				<p style={{maxHeight:"40px",overflow:"hidden"}}>
					{highlightedSpecialist.introduction}
				</p>
			</div>

			{submitting==true?
				<p>Please wait...</p>:
				<div style={ButtonCSS}>
					{hasProfilePreviouslyInteractedWithSpecialist==true?
						<p onClick={()=>decrementRanking()}>- Reputation</p>:
						<p onClick={()=>incrementRanking()}>+ Reputation</p>
					}
				</div>
			}
		</Container>
	)
}


export default SymposiumSpecialistsExtended;