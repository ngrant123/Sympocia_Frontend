import React from "react";
import styled from "styled-components";
import SymposiumImageDisplay from "../../../../GeneralComponents/PostComponent/ImageComponent/SymposiumAndExplorePageImage.js"; 


const SmallPostContainer=styled.div`
	margin-bottom:15%;
	width:160px;
	height:120px;
	cursor:pointer;
	margin-right:5%;
	#smallImageContainer{
		height:110% !important;
	}

	@media screen and (max-width:1370px){
		margin-right:10%;
		width:40%;
		height:250px;

		${({isSymposiumPostUI})=>
			isSymposiumPostUI==true?
			`margin-bottom:80px;`:
			`margin-bottom:60px;`
		}
		#smallVideoDescriptionContainer{
			width:50px !important;
			height:40% !important;
		}
		#smallImageContainer{
			width:100% !important;
			height:220px !important;
		}
		#smallImageArrowDownCSS{
			margin-left:10% !important;
		}
		#smallPostCaption{
			visibility:visible !important;
		}
	}

	@media screen and (max-width:650px){
		height:120px;
		#smallImageArrowDownCSS{
			margin-left:-10% !important;
		}
		#smallImageContainer{
			width:100% !important;
			height:125px !important;
		}
		#videoDescriptionContainer{
			height:30px !important;
			width:30px !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		margin-bottom:200px;
    	#smallImageContainer{
			height:190px !important;
		}
    }


	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	#smallImageContainer{
			height:170px !important;
		}
    }
`;

const Image=({imageInformation})=>{
	return(
		<SmallPostContainer>
			<SymposiumImageDisplay
				imageInformation={imageInformation}
				targetDom={"extendedSymposiumContainer"}
			/>
		</SmallPostContainer>
	)
}

export default Image;






