import React,{useState,useContext} from "react";
import styled from "styled-components";
import {addSymposiumResources} from "../../../../../../../Actions/Requests/SymposiumRequests/SymposiumAdapter.js";
import {FeaturesContext} from "../../../../FeaturesPageSet/FeaturesPageContext.js";
import {refreshTokenApiCallHandle} from "../../../../../../../Actions/Tasks/index.js";
import {useSelector,useDispatch} from "react-redux";


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


const CreateResource=({closeModal,triggerAddSymposiumResource,symposiumId})=>{
	const [submittingStatus,changeSubmittingStatus]=useState(false);
	const personalInformation=useSelector(state=>state.personalInformation);
	const featuresPageConsumer=useContext(FeaturesContext);	
	const dispatch=useDispatch();

	const {
		updateSecondaryInformation,
		featuresPageSecondaryInformation
	}=featuresPageConsumer;


	const triggerUpdateSecondaryInformation=(resource)=>{
		let symposiumUniversitySecondaryInformation=featuresPageSecondaryInformation;
		let {resources}=symposiumUniversitySecondaryInformation;
		resources.splice(0,0,resource);

		symposiumUniversitySecondaryInformation={
			...symposiumUniversitySecondaryInformation,
			resource
		}
		updateSecondaryInformation(symposiumUniversitySecondaryInformation);
	}

	const createSymposiumResource=async({isAccessTokenUpdated,updatedAccessToken})=>{
		const userSubmittedResource=document.getElementById("resource").value;
		changeSubmittingStatus(true);
		if(userSubmittedResource!=""){
			let resource={
				firstName:personalInformation.firstName,
				profileId:personalInformation.id,
				symposiumId,
				resourcePost:userSubmittedResource,
				accessToken:isAccessTokenUpdated==true?updatedAccessToken:
							personalInformation.accessToken
			}

			const {confirmation,data}=await addSymposiumResources(resource);
			if(confirmation=="Success"){
				const {message}=data;
				resource={
					...resource,
					profilePicture:message
				}
				triggerUpdateSecondaryInformation(resource);
				triggerAddSymposiumResource(resource);

			}else{
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						createSymposiumResource,
						dispatch,
						{},
						false
					);
				}else{
					alert('Unfortunately there has been an error when creating this symposium resource.Please try again');
				}
			}
		}else{
			alert('Please enter a resource');
		}
		changeSubmittingStatus(false);
	}

	return(
		<Container>
			<div style={ButtonCSS} onClick={()=>closeModal()}>
				Back
			</div>
			<hr/>
			<InputContainer
				id="resource"
				placeholder="Create a resource here"
			/>
			{submittingStatus==true?
				<p>Please wait...</p>:
				<div style={SubmitButtonCSS} onClick={()=>createSymposiumResource({isAccessTokenUpdated:false})}>
					Submit
				</div>
			}
		</Container>
	)
}

export default CreateResource;