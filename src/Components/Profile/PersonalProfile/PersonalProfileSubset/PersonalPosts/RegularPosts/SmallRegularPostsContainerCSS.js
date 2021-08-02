import styled from "styled-components";


export const Container=styled.div`
	position:relative;
	background-color:white;
	width:90%;
	height:100%;
	margin-right:20%;
	border-radius:5px;

	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	padding:10px;
	overflow:hidden;

	@media screen and (min-width:2500px){
		height:50% !important;
	}

	@media screen and (max-width:1370px){
		width:350% !important;
		height:80%;
		#smallRegularPostProfilePicture{
			height:80px !important;
			width:90px !important;
			margin-bottom:2% !important;
		}

		#post{
			font-size:15px !important;
		}
		#postLI{
			font-size:18px !important;
		}
		#commentLI{
			display:none !important;
		}
	}

	@media screen and (max-width:600px){
		width:200% !important;
		height:60%;

		#postOwnerInformation{
			display:none !important;
		}
		#post{
			font-size:18px !important;
		}
		#postLI{
			height:60% !important;
		}

		#commentLI{
			display:none !important;
		}
	}
	@media screen and (min-width:620px) and (max-width:650px) 
	    and (min-height:1300px) and (max-height:1390px){
		width:200% !important;
		margin-left:10% !important;
	}


	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
	 	width:350% !important;
		height:90% !important;

		#smallRegularPostProfilePicture{
			height:50px !important;
			width:60px !important;
		}
    }

    @media screen  and (max-width:840px) and (max-height:420px) 
	  and (orientation: landscape) 
	  and (-webkit-min-device-pixel-ratio: 1){
    	width:350% !important;
		height:100% !important;
    }
    @media screen  and (max-width:570px) and (max-height:320px) 
		  and (orientation: landscape) 
		  and (-webkit-min-device-pixel-ratio: 1){
			width:200% !important;
    }
`;

export const ProfilePicture=styled.div`
	position:relative;
	border-radius:50%;
	height:50px;
	width:55px;
	margin-top:2%;
	overflow:hidden;
	border-radius:50%;
	border-style:solid;
	border-width:2px;
	border-color:#5298F8;
`;

export const SmallProfileCommentPicture=styled.div`
	position:relative;
	width:40px;
	height:15%;
	background-color:red;
	border-radius:50%;
	margin-top:2%;
`;
export const ColorPatchContainer=styled.div`
	position:absolute;
	width:30px;
	height:25px;
	border-radius:50%;
	top:55%;
	left:80%;
	z-index:8;

	${({colorCode})=>
		colorCode!=null &&
			`background-color:${colorCode};`
	}

	@media screen and (max-width:650px){
    }
`;


