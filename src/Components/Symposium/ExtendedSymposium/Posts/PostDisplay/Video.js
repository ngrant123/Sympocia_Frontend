import React from "react";
import styled from "styled-components";
import SymposiumVideoDisplay from "../../../../GeneralComponents/PostComponent/VideoComponent/SymposiumAndExplorePageVideo.js";

const Container=styled.div`
	margin-bottom:8%;
	width:90%;
	margin-right:15%;

	@media screen and (max-width:1370px){
		margin-right:8%;
		width:90%;
		#smallVideoDescriptionContainer{
			margin-left:5%;
		}
		#video{
			height:185px !important;
			width:110% !important;
		}
	}

	@media screen and (max-width:650px){
		#smallVideoDescriptionContainer{
			width:100px !important;
			height:40% !important;
			margin-left:5%;
			top:25% !important;
			left:0% !important;
		}
		#video{
			width:285px !important;
		}
	}

	@media screen and (max-width:330px){
		#video{
			width:200px !important;
		}
	}

	@media screen and (min-width:500px) and (max-width:600px) 
		and (min-height:750px) and (max-height:850px){
		#video{
			width:120% !important;
		}
	}


	@media screen and (min-width:400px) and (max-width:720px) and (min-height:1100px) and (max-height:1370px){
		#video{
			width:120% !important;
		}
	}

`;

const Video=({videoInformation})=>{
	return(
		<Container>
			<SymposiumVideoDisplay
				videoInformation={videoInformation}
				targetDom={"extendedSymposiumContainer"}
			/>
		</Container>
	)
}

export default Video;