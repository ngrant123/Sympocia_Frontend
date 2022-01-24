import React,{useState,useContext} from "react";
import styled from "styled-components";
import {useSelector,useDispatch} from "react-redux";
import {addSymposiumSpecialist} from "../../../../../../../Actions/Requests/SymposiumRequests/SymposiumAdapter.js";
import {FeaturesContext} from "../../../../FeaturesPageSet/FeaturesPageContext.js";
import {refreshTokenApiCallHandle} from "../../../../../../../Actions/Tasks/index.js";

const Container=styled.div``;
const InputContainer=styled.textarea`
	width:100%;
	resize:none;
	padding:5px;
	height:150px;
	padding-top:15px;
	border-style:solid;
	border-width:1px;
	border-color:#F1F0F0;
	margin-top:2%;
	margin-bottom:2%;
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
	width:"20%"
}


const SubmitButtonCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"C8B0F4",
	borderRadius:"5px",
	padding:"10px",
	color:"white",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#B38AFF",
	cursor:"pointer",
	width:"20%"
}
const Creation=({closeModal,triggerAddSymposiumSpecialist,symposiumId})=>{
	const personalInformation=useSelector(state=>state.personalInformation);
	const [submittingStatus,changeSubmittingStatus]=useState(false);
	const featuresPageConsumer=useContext(FeaturesContext);
	const dispatch=useDispatch();

	const {
		updateSecondaryInformation,
		featuresPageSecondaryInformation
	}=featuresPageConsumer;

	const triggerUpdateSecondaryInformation=(resource)=>{
		let symposiumUniversitySecondaryInformation=featuresPageSecondaryInformation;
		let {specialists}=symposiumUniversitySecondaryInformation;
		specialists.splice(0,0,resource);

		symposiumUniversitySecondaryInformation={
			...symposiumUniversitySecondaryInformation,
			specialists
		}
		updateSecondaryInformation(symposiumUniversitySecondaryInformation);
	}


	const createSymposiumSpecialist=async({isAccessTokenUpdated,updatedAccessToken})=>{
		const introduction=document.getElementById("introduction").value;
		if(introduction==""){
			alert('Please enter an introduction');
		}else{	
			changeSubmittingStatus(true);
			let specialist={
				introduction,
				profileId:personalInformation.id,
				firstName:personalInformation.firstName,
				symposiumId,
				accessToken:isAccessTokenUpdated==true?updatedAccessToken:
							personalInformation.accessToken
			}
			const {confirmation,data}=await addSymposiumSpecialist(specialist);
			if(confirmation=="Success"){
				const {message}=data;
				specialist={
					...specialist,
					_id:message._id,
					profilePicture:message.profilePicture
				}
				triggerAddSymposiumSpecialist(specialist);
				triggerUpdateSecondaryInformation(specialist);

			}else{
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						createSymposiumSpecialist,
						dispatch,
						{},
						false
					);
				}else{
					alert('Unfortunately there has been an error when creating your symposium specialist.Please try again');
				}

				changeSubmittingStatus(false);
			}
			changeSubmittingStatus(false);
		}
	}

	return(
		<Container>
			<div style={ButtonCSS} onClick={()=>closeModal()}>
				Back
			</div>
			<hr/>
			<InputContainer
				id="introduction"
				placeholder="Create a introduction here"
			/>
			{submittingStatus==true?
				<p>Please wait...</p>:
				<div style={SubmitButtonCSS} onClick={()=>createSymposiumSpecialist({isAccessTokenUpdated:false})}>
					Submit
				</div>
			}
		</Container>
	)
}

export default Creation;