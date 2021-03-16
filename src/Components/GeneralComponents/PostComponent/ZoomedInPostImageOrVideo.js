import React,{useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";


const Container=styled.div`
	position:fixed;
	width:60%;
	height:80%;
	background-color:white;
	z-index:55;
	top:10%;
	border-radius:5px;
	left:25%;
	display:flex;
	flex-direction: column;
	padding:30px;
	overflow:scroll;

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
		overflow:scroll !important;
	}
	@media screen and (max-width:650px){
		#postDisplay{
			height:60% !important;
		}
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	#postDisplay{
    		height:200% !important;
    	}
	}
`;

const ShadowContainer= styled.div`
	position:fixed;
	width:110%;
	height:100%;
	background-color: rgba(0,0,0,0.9);
	z-index:55;
	top:0px;
	left:-5%;
`;

const ZoomedPostDisplayPortal=({postUrl,targetDom,closeModal,postType})=>{
	const postDisplay=()=>{
		return(
			<React.Fragment>
				{postType=="Images"?
					<img id="postDisplay" src={postUrl} style={{width:"100%",height:"100%"}}/>
					:<video id="postDisplay" controls width="100%" height="100%">
						<source  type="video/mp4" src={postUrl}/>
						<p>This is fallback content to display for user agents that do not support the video tag.</p>
					</video>
				}
			</React.Fragment>
		)
	}
	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container>
				<div onClick={()=>closeModal()} style={{cursor:"pointer",marginBottom:"5%"}}>
					<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
					 width="44" height="44" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
					 stroke-linecap="round" stroke-linejoin="round">
					  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					  <circle cx="12" cy="12" r="9" />
					  <path d="M10 10l4 4m0 -4l-4 4" />
					</svg>
				</div>
				<hr/>
				{postDisplay()}
			</Container>
		</React.Fragment>
	,document.getElementById(targetDom))
}

export default ZoomedPostDisplayPortal;