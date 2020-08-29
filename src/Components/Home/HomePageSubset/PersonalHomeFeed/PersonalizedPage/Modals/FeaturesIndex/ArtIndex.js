import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import ImagePostModal from "../Features/ImagePostModal.js";
import RegularPostModal from "../Features/RegularPostModal.js";
import ImageDisplayContainer from "../../../../../../GeneralComponents/PostComponent/ImageComponent/ImageDisplay/ImageContainer.js";


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



const ArtIndex=({closeModal,modalType,symposium})=>{
	const [displayImageExpand,changeImageExpandDisplay]=useState(false);
	const [imageData,changeImageData]=useState();

	const modalDecider=()=>{
		if(modalType=="Critique" || modalType=="Supplies"){
			return <ImagePostModal
						symposium={symposium}
						displayImage={displayImageHandler}
						modalType={modalType.toLowercase()}
					/>
		}else{
			return <RegularPostModal
						symposium={symposium}
						displayImage={displayImageHandler}
						modalType={modalType.toLowercase()}
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

export default ArtIndex;