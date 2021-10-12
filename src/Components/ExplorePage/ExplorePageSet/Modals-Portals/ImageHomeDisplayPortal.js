import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import ImageContainer from "../../../GeneralComponents/PostComponent/ImageAndVideoDisplay/PostContainer.js";
import {ImageDisplayContainer} from "../../../GeneralComponents/PostComponent/ImageComponent/indexCSS.js";

const Container=styled.div`
	position:fixed;
	background-color:red;
	z-index:40;
	height:90%;
	width:70%;
	border-radius:5px;
	top:5%;
	left:20%;
	background-color:white;
	padding:20px;
	overflow-y:scroll;

	@media screen and (max-width:1370px){
		left:5%;
		width:90%;
	}
	@media screen and (max-width:700px){
		width:100% !important;
		top:0%;
		height:100% !important;
		margin-right:-10% !important;
		margin-left:-5% !important;
	}


`;

const ShadowContainer= styled.div`
	position:fixed;
	width:110%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:40;
	left:-5%;
	top:0px;
`;


const ShadowContainerRecommenedImages=styled.div`
	position:absolute;
	width:280px;
	height:230px;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;
	z-index:1;
	transition:.8s;
	border-radius:5px;

	&:hover{
		background-color:transparent
	}
`;

const ImageLabelCSS={
	listStyle:"none",
	display:"inline-block",
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	padding:"5px",
	borderRadius:"5px",
	marginRight:"2%"
}

const ImageCSS={
	position:"relative",
	width:"280px",
	height:"230px",
	borderRadius:"5px",
	backgroundColor:"red"
}


const ImageHomeDisplayPortal=(props)=>{
	const closeModal=()=>{
		props.closeModal()
	}
	return createPortal(
		<React.Fragment>
			<ShadowContainer onClick={()=>closeModal()}/>
			<Container>
				<ImageDisplayContainer>
					<ImageContainer
						imageData={props.selectedImage}
						targetDom={props.targetDom}
						closePostModal={closeModal}
					/>
				</ImageDisplayContainer>

			</Container>
		</React.Fragment>,
	document.getElementById(props.targetDom)
	);
}
export default ImageHomeDisplayPortal;