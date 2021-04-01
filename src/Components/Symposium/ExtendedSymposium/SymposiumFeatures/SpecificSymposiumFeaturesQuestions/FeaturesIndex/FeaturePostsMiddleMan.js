import React from "react";
import AudioPostModal from "../FeaturesPosts/AudioPostModal.js";
import RegularPostModal from "../FeaturesPosts/RegularPostModal.js";
import VideoPostModal from "../FeaturesPosts/VideoPostModal.js";
import styled from "styled-components";
import ImagePostModal from "../FeaturesPosts/ImagePostModal.js";
import {createPortal} from "react-dom";

const Container=styled.div`
	position:fixed;
	background-color:white;
	width:45%;
	height:60%;
	border-radius:5px; 
	z-index:40;
	left:30%;
	top:20%;
	overflow-y:scroll;

	
	@media screen and (max-width:1370px){
		width:80%;
		left:10%;
	}
	@media screen and (max-width:600px){
		left:5%;
		height:80%;
		width:90%;
	}
`;


const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:40;
	top:0px;
`;


const ModalDecider=({closeModal,modalType,symposium,questionIndex,symposiumId,question,selectedPostId})=>{
	const modalDecider=()=>{
		if(modalType=="Image"){
			return <ImagePostModal
						symposium={symposium}
						modalType={modalType}
						questionIndex={questionIndex}
						question={question}
						symposiumId={symposiumId}
						selectedPostId={selectedPostId}
					/>
		}else if(modalType=="Video"){
			return <VideoPostModal
						symposium={symposium}
						modalType={modalType}
						questionIndex={questionIndex}
						question={question}
						symposiumId={symposiumId}
						selectedPostId={selectedPostId}
					/>
		}else if(modalType=="RegularPost"){
			return <RegularPostModal
						symposium={symposium}
						modalType={modalType}
						questionIndex={questionIndex}
						question={question}
						symposiumId={symposiumId}
						selectedPostId={selectedPostId}
					/>
		}else{
			return <AudioPostModal
						symposium={symposium}
						modalType={modalType}
						questionIndex={questionIndex}
						symposiumId={symposiumId}
						question={question}
						selectedPostId={selectedPostId}
					/>
		}
	}
		return createPortal(
		<>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container>
				{modalDecider()}
			</Container>
		</>

	,document.getElementById("extendedSymposiumContainer"));
}
export default ModalDecider;