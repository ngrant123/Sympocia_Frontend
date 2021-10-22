import styled from "styled-components";

export const SupportingPostsContainer=styled.div`
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;
	width:100%;
`;

export const VideoContainer=styled.div`
	display:flex;
	flex-direction:column;
	margin-right:7%;
	width:250px !important;
	#video{
		width:250px !important;
		height:200px !important;
		margin-right:7%;
		margin-bottom:15px;
	}

	@media screen and (max-width:1000px){
		#video{
			width:320px !important;
		}
	}
	@media screen and (max-width:680px){
		width:100% !important;
		#video{
			width:90% !important;
		}
	}


	@media screen and (min-width:900px) and (max-width:1000px) 
		and (min-height:1000px) and (max-height:1100px){
		#video{
			width:380px !important;
		}
	}



	@media screen and (min-width:600px) and (max-width:700px) 
		and (min-height:700px) and (max-height:800px){
		#video{
			width:270px !important;
		}
	}


	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		#video{
			width:350px !important;
		}
    }

    @media screen and (max-width:1200px) and (max-height:800px) and (orientation:landscape){
		#video{
			width:250px !important;
		}
    }

	@media screen and (max-width:840px) and (max-height:450px) and (orientation: landscape) {
		width:100%;
    	#video{
			width:90% !important;
		}	
    }
`;
