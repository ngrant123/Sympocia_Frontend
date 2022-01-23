import React,{useState} from "react";
import styled from "styled-components";
import {removeTag} from "../../../../../../../Actions/Requests/SymposiumRequests/SymposiumAdapter.js";
import {refreshTokenApiCallHandle} from "../../../../../../../Actions/Tasks/index.js";
import {useSelector,useDispatch} from "react-redux";

const Container=styled.div`
	width:100%;
	height:100%;
	padding:10px;
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
	marginRight:"2%",
	marginBottom:"5%"
}


const DeleteTag=({closeModal,symposiumId,ownerId,tagId,deleteTag})=>{
	const [deletingTagStatus,changeDeletingTagStatus]=useState(false);
	const personalInformation=useSelector(state=>state.personalInformation);
	const dispatch=useDispatch();

	const triggerRemoveTag=async({isAccessTokenUpdated,updatedAccessToken})=>{
		changeDeletingTagStatus(true);
		const {confirmation,data}=await removeTag(
											tagId,
											symposiumId,
											ownerId,
											isAccessTokenUpdated==true?updatedAccessToken:
											personalInformation.accessToken);
		if(confirmation=="Success"){
			deleteTag(tagId);
			closeModal();
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
					personalInformation.refreshToken,
					personalInformation.id,
					triggerRemoveTag,
					dispatch,
					{},
					false
				);
			}else{
				alert('Unfortunately an has occured when deleting this beacon tag. Please try again');
			}
		}
		changeDeletingTagStatus(false);
	}

	return(
		<Container>
			<div style={ButtonCSS} onClick={()=>closeModal()}>
				Back
			</div>

			<p style={{fontSize:"20px"}}>
				<b>Delete</b>
			</p>
			<hr/>
			<p>Are you sure you want to delete this tag? </p>
			{deletingTagStatus==true?
				<p>Please wait...</p>:
				<div style={{display:"flex",flexDirection:"row"}}>
					<div onClick={()=>triggerRemoveTag({isAccessTokenUpdated:false})} style={ButtonCSS}>
						Yes
					</div>

					<div style={ButtonCSS} onClick={()=>closeModal()}>
						No
					</div>
				</div>
			}
		</Container>
	)
}

export default DeleteTag;
