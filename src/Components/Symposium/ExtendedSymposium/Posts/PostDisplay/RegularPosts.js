import React from "react";
import styled from "styled-components";
import SymposiumRegularPostDisplay from "../../../../GeneralComponents/PostComponent/RegularPostComponent/SymposiumAndExplorePageRegularPost.js";

const Container=styled.div`
	display:flex;
	flex-direction:column;
	height:350px;
	flex-shrink: 0;

	width:90%;
	background-color:red;
	cursor:pointer;
	overflow:hidden;
	border-radius:5px;
	background-color:white;
	margin-right:2%;
	margin-bottom:2%;
	@media screen and (max-width:1370px){
		width:90%;
		margin-top:5%;
		#headerPostTextOrAudioContainerLI{
			top:0px !important;
		}
	}

	@media screen and (max-width:650px){
		width:100%;
		height:200px;
		margin-bottom:5%;
		#headerOwnerNameLI{
			max-width:100% !important;
			margin-left:20% !important;
		}
		#headerPostTextOrAudioContainerLI{
			top:20px !important;
			width:100% !important;
		}
		#audio{
			width:190px;
		}
	}
	@media screen and (max-width:740px) and (max-height:420px) and (orientation: landscape) {
    	margin-top:45px !important;
    }
`;

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}


const RegularPost=({regularPostInformation,displayDesktopUI})=>{
	console.log(regularPostInformation);
	return(
		<Container>
			<SymposiumRegularPostDisplay
				regularPostInformation={regularPostInformation}
				targetDom={"extendedSymposiumContainer"}
			/>
			{displayDesktopUI==false &&(
				<hr style={HorizontalLineCSS}/>
			)}
		</Container>
	)
}

export default RegularPost;