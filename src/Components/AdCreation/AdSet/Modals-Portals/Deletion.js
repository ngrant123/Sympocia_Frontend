import React,{useState,useContext} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {PostAdsContext} from "../../AdSubset/Ads/PostAdsContext.js";
import {deleteAd} from "../../../../Actions/Requests/AdAxiosRequests/AdSetRequests.js";


const Container=styled.div`
	position:fixed;
	width:25%;
	height:50%;
	background-color:white;
	z-index:51;
	top:20%;
	border-radius:5px;
	left:40%;
	display:flex;
	flex-direction: column;
	padding:30px;

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
		overflow:scroll !important;
	}
`;

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:50;
	top:0px;
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
	marginRight:"2%",
	cursor:"pointer"
}

const Deletion=({closeModal,postId,postType,userId})=>{
	const postAdConsumer=useContext(PostAdsContext);
	const [deletionStatusIndicator,changeDeletionStatusIndicator]=useState(false);

	const triggerDeleteAd=async()=>{
		changeDeletionStatusIndicator(true);
		const {confirmation,data}=await deleteAd(
			postId,
			postType,
			userId);
		if(confirmation=="Success"){
			alert("Success");
			postAdConsumer.removePost(postId);
		}else{
			alert('Unfortunately an error has occured when deleting this ad. Please try again');
		}
		changeDeletionStatusIndicator(false);
	}

	return (
		<Container>
			<p>
				<b>Are you sure you want to delete this ad </b>
			</p>
			{deletionStatusIndicator==true?
				<p>Please wait...</p>:
				<div style={{display:"flex",flexDirection:"row"}}>
					<div style={ButtonCSS} onClick={()=>closeModal()}>
						Back
					</div>

					<div style={ButtonCSS} onClick={()=>triggerDeleteAd()}>
						Delete
					</div>
				</div>
			}
		</Container>

	)
}

export default Deletion;