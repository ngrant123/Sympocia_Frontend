import styled from "styled-components";

export const Container=styled.div`
	display:flex;
	#smallPostLI{
		width:200px !important;
		margin-right:7% !important;
	}

	@media screen and (max-width:1370px){
		#smallPostLI{
			width:180px !important;
		}
	}

	@media screen and (max-width:550px){
		position:relative;
		justify-content:center !important;
		align-items:center !important;

		#smallPostLI{
			width:30% !important;
			height:17% !important;
			margin-right:2% !important;
		}
		#videoAndAudioDescriptionLI{
			margin-top:-80px !important;
		}
	}

	@media screen and (min-width:300px) and (max-width:400px) 
		and (min-height:900px) and (max-height:1400px){
		#smallPostLI{
			height:10% !important;
		}
	}

	@media screen and (min-width:490px) and (max-width:700px) 
	    and (min-height:1100px) and (max-height:1370px){
		#smallPostLI{
			height:15% !important;
		}
	}

	@media screen and (min-width:300px) and (max-width:420px) 
	    and (min-height:700px) and (max-height:900px){
		#smallPostLI{
			height:100px !important;
		}
	}

	@media screen and (min-width:300px) and (max-width:420px) 
	    and (min-height:800px) and (max-height:1100px){
		#smallPostLI{
			height:12% !important;
		}
	}


	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
		#smallPostLI{
			width:160px !important;
			height:155px !important;
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
		
    }
`;

export const Image=styled.div`
	width:100%;
	height:20%;
	background-color:black;
	border-radius:5px;
	overflow:hidden;

	@media screen and (max-width:550px){
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

	@media screen and (max-width:550px){
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



