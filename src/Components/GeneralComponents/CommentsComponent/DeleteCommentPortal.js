import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {deleteCommentPool} from "../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {useSelector,useDispatch} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../Actions/Tasks/index.js";

const Container=styled.div`
	position:fixed;
	width:30%;
	height:50%;
	background-color:white;
	z-index:36;
	top:20%;
	border-radius:5px;
	left:40%;
	overflow-y:auto;
	display:flex;
	padding:20px;
	flex-direction:column;

	@media screen and (max-width:1370px){
		width:60% !important;
		left:20% !important;
    }
    @media screen and (max-width:600px){
		width:90% !important;
		left:5% !important;
	}


    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	height:65%;
    }
`;
const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;

	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	padding-right:120px;
`;


const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:35;
	top:0px;
`;

const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
}

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
  marginRight:"2%",
  cursor:"pointer"
}

const DeleteCommentPool=({
						selectedCommentPool,
						closeModal,
						updateCommentPoolsAfterDeletion,
						currentCommentPools,
						commentType,
						postType,
						postId,
						targetContainer
					})=>{
	const dispatch=useDispatch();
	const personalInformation=useSelector(state=>state.personalInformation);
	const [isDeletingStatus,changeIsDeletingStatus]=useState(false);

	const deletedSelectedCommentPool=async({isAccessTokenUpdated,updatedAccessToken})=>{
		changeIsDeletingStatus(true);
		const {confirmation,data}=await deleteCommentPool({
			userId:personalInformation.id,
            postId,
            postType,
            commentPoolId:selectedCommentPool._id,
            commentType,
            accessToken:isAccessTokenUpdated==true?updatedAccessToken:
						personalInformation.accessToken
		});
		if(confirmation=="Success"){
			const {index}=selectedCommentPool;
			currentCommentPools.splice(index,1);
			updateCommentPoolsAfterDeletion(currentCommentPools);
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						deletedSelectedCommentPool,
						dispatch,
						{},
						false
					);
			}else{
				alert('Unfortunately there has been an error deleting this comment pool. Please try again');
			}
		}
		changeIsDeletingStatus(false);
	}
	return createPortal(
		<React.Fragment>
			<Container>
				<p>
					Are you sure you want to delete the comment pool  
						<b> {selectedCommentPool.questionType}</b>
					?
				</p>
				<hr style={HorizontalLineCSS}/>

				{isDeletingStatus==true?
					<p>Please wait...</p>:
					<div style={{display:"flex",flexDirection:"row"}}>
						<div onClick={()=>deletedSelectedCommentPool({isAccessTokenUpdated:false})}
						 	style={ButtonCSS}>
							Delete
						</div>
						<div onClick={()=>closeModal()} style={ButtonCSS}>
							Close
						</div>
					</div>
				}
			</Container>
			<ShadowContainer onClick={()=>closeModal()}/>
		</React.Fragment>
	,document.getElementById(targetContainer))
}

export default DeleteCommentPool;
