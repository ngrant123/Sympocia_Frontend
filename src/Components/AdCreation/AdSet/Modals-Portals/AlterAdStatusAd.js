import React,{useState,useContext} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {PostAdsContext} from "../../AdSubset/Ads/PostAdsContext.js";
import {
	pauseAdStatus,
	resumeAdStatus
} from "../../../../Actions/Requests/AdAxiosRequests/AdSetRequests.js";


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


const PauseAd=({closeModal,postId,userId,postType,isAdPaused})=>{
	const postAdConsumer=useContext(PostAdsContext);
	const [pauseStatusIndicator,changePauseStatusIndicator]=useState(false); 

	const triggerPauseAd=async()=>{
		changePauseStatusIndicator(true);
		const {confirmation,data}=await pauseAdStatus(postId,userId,postType);
		if(confirmation=="Success"){
			alert("Success");
			postAdConsumer.removePost(postId);
		}else{
			alert('Unfortunately an error has occured when pausing your ad. Please try again');
		}
		changePauseStatusIndicator(false);
	}

	const triggerResume=async()=>{
		changePauseStatusIndicator(true);
		const {confirmation,data}=await resumeAdStatus(postId,userId,postType);
		if(confirmation=="Success"){
			alert("Success");
			postAdConsumer.removePost(postId);
		}else{
			alert('Unfortunately an error has occured when resuming your ad. Please try again');
		}
		changePauseStatusIndicator(false);
	}

	return (
		<Container>
			<p>
				<b>Are you sure you want to {isAdPaused==true?<>resume</>:<>pause</>} this ad </b>
			</p>

			{pauseStatusIndicator==true ?
				<p>Please wait...</p>:
				<div style={{display:"flex",flexDirection:"row"}}>
					<div style={ButtonCSS} onClick={()=>closeModal()}>
						Back
					</div>
					{isAdPaused==true?
						<div style={ButtonCSS} onClick={()=>triggerResume()}>
							Resume
						</div>:
						<div style={ButtonCSS} onClick={()=>triggerPauseAd()}>
							Pause
						</div>
					}
				</div>
			}
		</Container>

	)
}

export default PauseAd;