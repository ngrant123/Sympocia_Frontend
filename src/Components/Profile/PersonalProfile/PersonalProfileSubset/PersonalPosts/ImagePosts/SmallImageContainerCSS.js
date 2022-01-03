import styled from "styled-components";

		// padding-left:40px;
		// padding-right:40px;

// background-color:blue;
export const Container=styled.div`
	display:flex;
	#smallPostLI{
		width:200px !important;
		margin-right:7% !important;
	}

	background-color:blue;
	


	@media screen and (min-width:2500px){
		#smallPostLI{
			height:270px !important;
		}
  	}

	@media screen and (max-width:1370px){
		#videoAndAudioDescriptionLI{
			margin-top:-140px !important;
		}
		#smallPostLI{
			margin-right:5% !important;
			width:140px !important;
			height:130px !important;
		}
	}

	@media screen and (max-width:650px){
		width:105% !important;
		justify-content:center;


		#videoAndAudioDescriptionLI{
			display:none !important;
		}
		#smallPostLI{
			height:115px !important;
			width:120px !important;
			margin-bottom:5% !important;
		}

		#smallPostDiv{
			width:80% !important;
		}
	}

	@media screen and (max-width:350px){
		#smallPostDiv{
			width:95% !important;
		}
	}

	@media screen and (min-width:400px) and (max-width:430px) 
	    and (min-height:730px) and (max-height:800px){
	   	#smallPostDiv{
			width:75% !important;
		}	
	}


	@media screen and (min-width:400px) and (max-width:650px) 
	    and (min-height:740px) and (max-height:850px){
	    #smallPostLI{
			height:190px !important;
		}
		margin-left:10% !important;
	}


	@media screen and (min-width:400px) and (max-width:650px) 
	    and (min-height:1000px) and (max-height:1370px){
	    #smallPostLI{
			height:120px !important;
		}
		margin-left:10px !important;
	}

	@media screen and (min-width:450px) and (max-width:650px) 
	    and (min-height:1000px) and (max-height:1370px){
	    #smallPostLI{
			height:150px !important;
			width:150px !important;
		}
		margin-left:10% !important;
	}




	@media screen and (min-width:500px) and (max-width:570px) 
	    and (min-height:700px) and (max-height:800px){
	    #smallPostLI{
			height:170px !important;
		}
	}


	@media screen and (min-width:620px) and (max-width:650px) 
	    and (min-height:1300px) and (max-height:1370px){
		margin-left:15% !important;
	}

	@media screen and (min-width:250px) and (max-width:450px) 
	    and (min-height:800px) and (max-height:1200px){
		
		#smallPostLI{
			height:100px !important;
			width:105px !important;
		} 
	}


	@media screen and (min-width:250px) and (max-width:400px) 
	    and (min-height:600px) and (max-height:900px){
	    #smallPostLI{
			height:90px !important;
			width:95px !important;
		} 
	}





	@media screen and (min-width:300px) and (max-width:550px) 
	    and (min-height:800px) and (max-height:1200px){
		margin-left:5%;
		#smallPostLI{
			height:150px !important;
			width:160px !important;
		} 
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
	 	width:100% !important;

		#smallPostLI{
			height:90px !important;
			width:95px !important;
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



