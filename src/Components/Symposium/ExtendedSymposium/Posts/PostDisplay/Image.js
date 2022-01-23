import React from "react";
import styled from "styled-components";
import SymposiumImageDisplay from "../../../../GeneralComponents/PostComponent/ImageComponent/SymposiumAndExplorePageImage.js"; 

const SmallPostContainer=styled.div`
	margin-bottom:15%;
	width:145px;
	height:110px;
	cursor:pointer;
	margin-right:7%;
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
			width:90px !important;
			height:95px !important;
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
	@media screen and (min-width:350px) and (max-width:900px) 
		and (min-height:640px) and (max-height:800px){
		
		#smallImageContainer{
			height:130px !important;
			width:135px !important;
		}
	}
	@media screen and (min-width:380px) and (max-width:900px) 
		and (min-height:640px) and (max-height:800px){
		
		#smallImageContainer{
			height:150px !important;
			width:155px !important;
		}
	}



	@media screen and (min-width:800px) and (max-width:1100px) 
		and (min-height:850px) and (max-height:1100px){
		#smallImageContainer{
			height:270px !important;
			width:260px !important;
		}
	}


	@media screen and (min-width:250px) and (max-width:400px) and (min-height:800px) and (max-height:1400px){
		#smallImageContainer{
			height:105px !important;
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


	@media screen and (min-width:350px) and (max-width:500px) and (min-height:800px) and (max-height:1030px){
		#smallImageContainer{		
			height:140px !important;
			width:145px !important;
		}
	}

	@media screen and (min-width:200px) and (max-width:350px) and (min-height:600px) and (max-height:900px){
		#smallImageContainer{
			height:110px !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		margin-bottom:200px;
    	#smallImageContainer{
			height:300px !important;
			width:310px !important;
		}
    }


	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		margin-bottom:90px;
    	#smallImageContainer{
			height:130px !important;
			width:130px !important;
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






