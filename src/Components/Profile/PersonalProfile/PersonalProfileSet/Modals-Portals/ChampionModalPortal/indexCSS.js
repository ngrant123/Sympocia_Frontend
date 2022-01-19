import styled from "styled-components";

export const Container=styled.div`
	position:fixed;
	width:40%;
	height:60%;
	background-color:white;
	z-index:41;
	top:20%;
	border-radius:5px;
	left:30%;
	overflow:auto;

	@media screen and (min-width:2500px){
		height:50%;
		width:50%;
		left:25%;
		padding:20px;

		#profilePicture{
			height:200px !important;
		}

		#profileFirstName{
			margin-top:5%;
			font-size:30px !important;
		}
	}


	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
		height:70%;
		top:15%;
		justify-content:center;

		#profilePicture{
			width:65px !important;
			height:60px !important;
		}
    }

    @media screen and (max-width:650px){
    	top:0%;
    	left:0% !important;
    	width:100% !important;
    	height:100%;	
   		#profilePicture{
			width:45px !important;
			height:40px !important;
		}

		#mobileCloseButton{
			display:block !important;
		}
    }

    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	#profilePicture{
			width:65px !important;
			height:60px !important;
		}
    }
`;


export const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:40;
	top:0px;
`;









