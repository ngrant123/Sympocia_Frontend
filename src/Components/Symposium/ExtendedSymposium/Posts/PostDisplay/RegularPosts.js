import React from "react";
import styled from "styled-components";
import SymposiumRegularPostDisplay from "../../../../GeneralComponents/PostComponent/RegularPostComponent/SymposiumAndExplorePageRegularPost.js";


const Container=styled.div`
	display:flex;
	flex-direction:column;
	height:350px;
	flex-shrink: 0;
	background-color:white;

	width:90%;
	cursor:pointer;
	overflow:hidden;
	border-radius:5px;
	margin-right:2%;
	margin-bottom:2%;

	#headerPostTextOrAudioContainerLI{
		top:0px !important;
		margin-left:0% !important;
	}
	margin-bottom:15%;


	@media screen and (max-width:1370px){
		width:90%;
		margin-top:5%;
		#headerPostTextOrAudioContainerLI{
			top:0px !important;
		}
	}

	@media screen and (max-width:650px){
		width:80%;
		height:200px;
		overflow:hidden;
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

	@media screen and (min-width:250px) and (max-width:400px) 
		and (min-height:800px) and (max-height:1400px){
		#headerOwnerNameLI{
			margin-left:15% !important;
		}
	}


	@media screen and (min-width:200px) and (max-width:350px)
		and (min-height:600px) and (max-height:900px){
		#headerOwnerNameLI{
			margin-left:25% !important;
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
	return(
		<React.Fragment>
			<Container>
				<SymposiumRegularPostDisplay
					regularPostInformation={regularPostInformation}
					targetDom={"extendedSymposiumContainer"}
				/>
			</Container>
			{displayDesktopUI==false &&(
				<hr style={HorizontalLineCSS}/>
			)}
		</React.Fragment>
	)
}

export default RegularPost;