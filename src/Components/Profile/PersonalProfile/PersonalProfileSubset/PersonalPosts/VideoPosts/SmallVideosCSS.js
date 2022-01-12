import styled from "styled-components";

export const Container=styled.div`
	margin-top:1%;
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;


	@media screen and (min-width:2500px){
		margin-right:-10% !important;
		margin-top:5% !important;
	}

	@media screen and (max-width:1370px){
		margin-left:-5% !important;
	}

	@media screen and (max-width:650px){
		margin-left:0% !important;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		margin-bottom:-5% !important;
    }
`;

export const SmallVideoComponent=styled.div`
	position:relative;
	width:250px;
	height:40%;
	background-color:white;


	@media screen and (min-width:2500px){
		height:30%;
		width:350px;
		#symposiumsDisplay{
			margin-top:2% !important;
		}
	}

	@media screen and (max-width:740px){
		width:300% !important;
		height:30%;
		margin-left:5%;
		#videoAudio{
			display:none
		}
		#postInformation{
			display:none;
		}

	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){

	 	#postInformation{
			margin-top:5% !important;
		}
    }

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape){
		margin-left:-5%;
		height:70% !important;
	 	#videoAudio{
			display:none
		}
		#postInformation{
			display:none;
		}
    }
`;



export const SmallVideo=styled.div`
	position:relative;
	height:150px;
	width:30%;
	background-color:white;
	border-radius:5px;
	overflow:hidden;
	margin-right:20px;
	margin-bottom:20px;
	cursor:pointer;

	@media screen and (max-width:1370px){
		#videoAndAudioDescriptionLI{
			margin-top:10% !important;
		}
		margin-left:5%;
		margin-right:5% !important;
		width:40% !important;
	}


	@media screen and (max-width:740px){
		height:200px;
		width:100% !important;
		
		#videoAndAudioDescriptionLI{
			display:none !important;
		}
		#audioLI{
			height:20px !important;
			width:50px !important;
		}
	}

	 @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	#videoAndAudioDescriptionLI{
			margin-top:5% !important;
		}
		margin-bottom:5% !important;
    }
      @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		#videoAndAudioDescriptionLI{
			display:none !important;
		}
    }
`;

export const VideoDescriptionContainer=styled.div`
	position:relative;
	width:70px;
	height:60px;
	border-radius:50%;

	@media screen and (max-width:700px){
		width:30px;
		height:40px;
	}

`;

export const ColorPatchContainer=styled.div`
	width:30px;
	height:25px;
	border-radius:50%;
	z-index:8;

	${({colorCode})=>
		colorCode!=null &&
			`background-color:${colorCode};`
	}

	@media screen and (max-width:650px){
		width:20px;
		height:15px;
    }
`;


