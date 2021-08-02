import styled from "styled-components";


export const Container=styled.div`
	display:flex;
	#smallPostLI{
		width:200px !important;
		margin-right:7% !important;
	}


	@media screen and (min-width:2500px){
		#smallImageDiv{
			height:270px !important;
		}
		#smallPostLI{
			width:300px !important;
		}
  	}

	@media screen and (max-width:1370px){
		#videoAndAudioDescriptionLI{
		}
		#smallPostLI{
			margin-right:10% !important;
		}
	}

	@media screen and (max-width:650px){
		width:100% !important;
		margin-left:5% !important;
		justify-content:center !important;
		#videoAndAudioDescriptionLI{
			display:none !important;
		}
		#smallImageDiv{
			height:110px !important;
		}
		#smallPostLI{
			width:37% !important;
			margin-right:10% !important;
			margin-bottom:5% !important;
		}
	}

	@media screen and (min-width:400px) and (max-width:650px) 
	    and (min-height:740px) and (max-height:850px){
	    #smallImageDiv{
			height:190px !important;
		}
		margin-left:10% !important;
	}


	@media screen and (min-width:400px) and (max-width:650px) 
	    and (min-height:1000px) and (max-height:1370px){
	    #smallImageDiv{
			height:140px !important;
		}
		margin-left:10% !important;
	}

	@media screen and (min-width:500px) and (max-width:570px) 
	    and (min-height:700px) and (max-height:800px){
	    #smallImageDiv{
			height:170px !important;
		}
	}


	@media screen and (min-width:620px) and (max-width:650px) 
	    and (min-height:1300px) and (max-height:1370px){
		margin-left:15% !important;
	}

	@media screen and (min-width:630px) and (max-width:670px) 
	    and (min-height:1350px) and (max-height:1370px){
	}


	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		width:100% !important;
		#videoAndAudioDescriptionLI{
			display:none !important;
		}
		#smallPostLI{
			margin-bottom:5% !important;
		}
    }

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape){
	 	justify-content:start !important;
	 	margin-left:0% !important;
	 	width:90% !important;
		#smallImageDiv{
			height:170px !important;
		}
		#smallPostLI{
			width:35% !important;
			margin-left:3% !important;
			margin-bottom:5% !important;
		}

		#nextButton{
			margin-left:3% !important;
		}
    }
`;

export const ImageContainer=styled.div`
	position:relative;
	width:100%;
	height:100%;
	cursor:pointer;
	@media screen and (max-width:420px){
		#imageAudio{
			display:none
		}
		#postInformation{
			display:none;
		}
	}

	@media screen and (max-width:740px){
		#audio{
			width:150px !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px)  and (orientation: landscape){
		height:270px !important;
		width:100%;
	 	#imageAudio{
			display:none
		}
		#postInformation{
			display:none;
		}
		#videoAndAudioDescriptionLI{
			display:none !important;
		}
    }
`;

export const Image=styled.div`
	width:100%;
	height:20%;
	background-color:black;
	border-radius:5px;
	overflow:hidden;

	@media screen and (max-width:650px){
		height:140px;
	}
`;

export const VideoDesriptionContainer=styled.div`
	position:absolute;
	background-color:red;
	width:50px;
	border-radius:50%;
	display:flex;
	flex-direction:column;
	left:2%;
	z-index:8;

	@media screen and (max-width:340px){
		height:30% !important;
    	width:20% !important;
    }
`;

export const ColorPatchContainer=styled.div`
	position:absolute;
	width:30px;
	height:25px;
	border-radius:50%;
	z-index:15;
	margin-top:-28px;

	${({colorCode})=>
		colorCode!=null &&
			`background-color:${colorCode};`
	}

	@media screen and (max-width:650px){
		height:17px !important;
    	width:20px !important;
    	margin-left:2%;
    }
`;
export const AudioDescriptionContainer=styled.div`
	width:20px;
`;

export const ImageCaption=styled.div`
	width:100%;
	height:15%;
	overflow:hidden;
	color:#767677;
	@media screen and (max-width:420px){
		display:none;
    }

    @media screen and (max-width:840px) and (max-height:420px)  and (orientation: landscape){
    	display:none !important;
    }
`;



