import React from "react";
import styled from "styled-components";
import SymposiumImageDisplay from "../../../../GeneralComponents/PostComponent/ImageComponent/SymposiumAndExplorePageImage.js"; 


const SmallPostContainer=styled.div`
	margin-bottom:15%;
	width:150px;
	height:110px;
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
			width:90% !important;
			height:265px !important;
		}
		#smallImageArrowDownCSS{
			margin-left:10% !important;
		}
		#smallPostCaption{
			visibility:visible !important;
		}
	}

	@media screen and (max-width:800px){
		#smallImageContainer{
			height:220px !important;
		}
	}

	@media screen and (max-width:650px){
		height:120px;
		#smallImageArrowDownCSS{
			margin-left:-10% !important;
		}
		#smallImageContainer{
			width:110% !important;
			height:120px !important;
		}
		#videoDescriptionContainer{
			height:30px !important;
			width:30px !important;
		}
	}
	@media screen and (min-width:500px) and (max-width:600px) 
		and (min-height:750px) and (max-height:850px){
		margin-bottom:120px !important;
		#smallImageContainer{
			height:170px !important;
		}
	}

	@media screen and (min-width:950px) and (max-width:1000px) 
		and (min-height:1000px) and (max-height:1040px){
		#smallImageContainer{
			height:250px !important;
		}
	}

	@media screen and (min-width:650px) and (max-width:900px) 
		and (min-height:740px) and (max-height:1040px){
		#smallImageContainer{
			height:210px !important;
		}
	}

	@media screen and (min-width:620px) and (max-width:750px) and (min-height:1100px) and (max-height:1370px){
		margin-bottom:30% !important;
		#smallImageContainer{
			height:200px !important;
		}
	}
	@media screen and (min-width:500px) and (max-width:600px) and (min-height:1100px) and (max-height:1370px){
		margin-bottom:30% !important;
		#smallImageContainer{
			height:170px !important;
		}
	}


	@media screen and (min-width:400px) and (max-width:500px) and (min-height:1000px) and (max-height:1030px){
		#smallImageContainer{
			height:140px !important;
		}
	}

	@media screen and (min-width:300px) and (max-width:350px) and (min-height:700px) and (max-height:900px){
		#smallImageContainer{
			height:90px !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		margin-bottom:200px;
    	#smallImageContainer{
			height:370px !important;
		}
    }

    @media screen and (max-width:1100px) and (max-height:800px) and (orientation:landscape){
    	#smallImageContainer{
			height:320px !important;
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






