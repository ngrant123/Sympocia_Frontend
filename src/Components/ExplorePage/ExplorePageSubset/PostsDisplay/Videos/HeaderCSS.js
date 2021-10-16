import styled from "styled-components";

export const Container=styled.div`
	display:flex;
	flex-direction:row;

	@media screen and (max-width:1000px){
		flex-direction:column;
	}

	@media screen and (max-width:650px){
		margin-top:5% !important;
	}
`;

export const HeaderContainer=styled.div`
	width:600px !important;
	height:400px !important;
	margin-right:2%;

	#video{
		width:600px !important;
		height:400px !important;
	}

	#videoTitle{
		font-size:18px !important;
	}

	@media screen and (min-width:2600px) and (min-height:2600px){
		width:1000px !important;

    	#video{
			width:1000px !important;
			height:400px !important;
		}
    }



	@media screen and (max-width:1000px){
		#video{
			width:700px !important;
		}
	}

	@media screen and (max-width:680px){
		width:100% !important;
		#video{
			width:90% !important;
		}
	}

	@media screen and (min-width:600px) and (max-width:700px) 
		and (min-height:700px) and (max-height:800px){
		#video{
			width:650px !important;
		}
	}

	@media screen and (min-width:900px) and (max-width:1000px) 
		and (min-height:1000px) and (max-height:1100px){
		#video{
			width:850px !important;
		}
	}

`;

export const SupportingPosts=styled.div`
	display:flex;
	flex-direction:column;
	flex-wrap:wrap;
	width:100%;

	#video{
		width:700px !important;
		height:200px !important;

	}
	#videoTitle{
		font-size:15px !important;
	}
	@media screen and (min-width:2600px) and (min-height:2600px){
		width:1200px !important;

    	#video{
			width:1200px !important;
		}
    }


	@media screen and (max-width:1370px){
		#video{
			width:350px !important;
		}
	}

	@media screen and (max-width:1000px){
		#video{
			width:700px !important;
		}
	}

	@media screen and (max-width:680px){
		width:100% !important;
		#video{
			width:90% !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		#video{
			width:600px !important;
		}
    }

    @media screen and (max-width:1200px) and (max-height:840px) and (orientation:landscape){
		#video{
			width:300px !important;
		}
    }


    @media screen and (min-width:1100px) and (max-width:1200px) 
		and (min-height:800px) and (max-height:840px){
		#video{
			width:370px !important;
		}
	}

	@media screen and (min-width:600px) and (max-width:700px) 
		and (min-height:700px) and (max-height:800px){
		#video{
			width:650px !important;
		}
	}


	@media screen and (min-width:900px) and (max-width:1000px) 
		and (min-height:1000px) and (max-height:1100px){
		#video{
			width:850px !important;
		}
	}


	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	#video{
			width:90% !important;
		}	
    }
`;