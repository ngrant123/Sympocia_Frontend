import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import AchievementsModal from "./AchievementsModal.js";
import RecommendedBooksModal from "./RecommendedBooksModal.js";
import TutoringModal from "./TutoringModal.js";


const Container=styled.div`
	position:absolute;
	background-color:white;
	width:45%;
	height:60%;
	border-radius:5px; 
	z-index:17;
	left:30%;
	top:20%;
	overflow-y:scroll;
`;

const ImageContainer=styled.div`
	position:absolute;
	background-color:white;
	width:60%;
	height:60%;
	border-radius:5px; 
	z-index:17;
	left:20%;
	top:20%;
	overflow-y:scroll;
`;

const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:17;
	top:0px;
`;



const STEMFeatures=({closeModal,modalType,symposium})=>{
	const [displayImageExpand,changeImageExpandDisplay]=useState(false);
	const [imageData,changeImageData]=useState();

	const modalDecider=()=>{
		if(modalType=="Tutoring"){
			return <TutoringModal
						symposium={symposium}
						displayImage={displayImageHandler}
					/>
		}else if(modalType=="Books"){
			return <RecommendedBooksModal
						symposium={symposium}
						displayImage={displayImageHandler}
					/>
		}else{
			return <AchievementsModal
						symposium={symposium}
						displayImage={displayImageHandler}
					/>
		}
	}

	const displayImageHandler=(imgData)=>{
		changeImageData(imgData);
		changeImageExpandDisplay(true);
	}

	const closeImageModal=()=>{
		changeImageExpandDisplay(false);
	}

	/*
		<Comments
			postId={props.imageData._id}
			postType={"Image"}
			hideComments={hideComments}
		/>
	*/

	return createPortal(
		<>
			{displayImageExpand==true?
				<ImageDisplayContainer
					imageData={imageData}
				/>
				:null
			}
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container>
				{modalDecider()}
			</Container>
		</>

	,document.getElementById("extendedSymposiumContainer"));
}

export default STEMFeatures;
``1