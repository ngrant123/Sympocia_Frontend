import React, {useState,useEffect} from "react";
import styled from "styled-components";
import {
	addTag,
	editTag
} from "../../../../../../Actions/Requests/SymposiumRequests/SymposiumAdapter.js"
import {useSelector,useDispatch} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../../../../Actions/Tasks/index.js";

const Container=styled.div`
	width:100%;
	height:100%;
	padding:10px;
	display:flex;
	flex-direction:column;
`;

const InputContainer=styled.textarea`
	width:90%;
	resize:none;
	padding:5px;
	height:120px;
	padding-top:15px;
	border-style:solid;
	border-width:1px;
	border-color:#F1F0F0;
`;
const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}


const SubmitButtonCSS={
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
	marginTop:"5%",
	width:"20%"
}
                                                            
const TagsCreationModal=({symposiumId,ownerId,insertTagIntoQueue,closeModal,editedTagInformation,updateTag})=>{
	const [submittingState,changeSubmittingStatus]=useState(false);
	const personalInformation=useSelector(state=>state.personalInformation);
	const dispatch=useDispatch();

	useEffect(()=>{
		if(editedTagInformation!=null){
			document.getElementById("tagName").value=editedTagInformation.name;
		}
	},[]);

	const createTag=async({isAccessTokenUpdated,updatedAccessToken})=>{
		changeSubmittingStatus(true);
		const userSubmittedTagName=document.getElementById("tagName").value;
		if(userSubmittedTagName==""){
			alert('Please add a tag name');
		}else{
			const {confirmation,data}=await addTag(
												symposiumId,
												userSubmittedTagName,
												ownerId,
												isAccessTokenUpdated==true?updatedAccessToken:
												personalInformation.accessToken);
			if(confirmation=="Success"){
				const{
					message
				}=data;
				const tag=message;
				insertTagIntoQueue(tag);
				closeModal();
			}else{
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						createTag,
						dispatch,
						{},
						false
					);
				}else{
					alert('Unfortunately an has occured when creating this beacon tag. Please try again');
				}

				changeSubmittingStatus(false);
			}
		}
		changeSubmittingStatus(false);
	}

	const triggerEditTag=async({isAccessTokenUpdated,updatedAccessToken})=>{
		changeSubmittingStatus(true);
		const userSubmittedTagName=document.getElementById("tagName").value;
		if(userSubmittedTagName==""){
			alert('Please add a tag name');
		}else{
			const {confirmation,data}=await editTag(
												editedTagInformation._id,
												userSubmittedTagName,
												symposiumId,
												personalInformation.id,
												isAccessTokenUpdated==true?updatedAccessToken:
												personalInformation.accessToken);
			if(confirmation=="Success"){
				editedTagInformation={
					...editedTagInformation,
					name:userSubmittedTagName
				}
				updateTag(editedTagInformation);
				closeModal();
			}else{
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						triggerEditTag,
						dispatch,
						{},
						false
					);
				}else{
					alert('Unfortunately an has occured when editing this beacon tag. Please try again');
				}
			}
		}
		changeSubmittingStatus(false);
	}

	return(
		<Container>
			<p style={{fontSize:"20px"}}>
				<b>Create Beacons Tags</b>
			</p>
			<hr style={HorizontalLineCSS}/>
			<InputContainer
				id="tagName"
				placeholder="Create tag name"
			/>
			{submittingState==true?
				<p>Loading...</p>:
				<React.Fragment>
					{editedTagInformation==null?
						<div style={SubmitButtonCSS} onClick={()=>createTag({isAccessTokenUpdated:false})}>
							Submit
						</div>:
						<div style={SubmitButtonCSS} onClick={()=>triggerEditTag({isAccessTokenUpdated:false})}>
							Edit
						</div>
					}
				</React.Fragment>
			}
		</Container>
	)
}


export default TagsCreationModal;