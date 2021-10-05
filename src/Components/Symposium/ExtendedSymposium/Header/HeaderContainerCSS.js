import styled,{keyframes} from "styled-components";
import {Link} from "react-router-dom";

 export const keyFrameExampleTwo= keyframes`
  0% {
    width:100%;
	height:42%;
	left:0%;
  }
  100% {
  	height:15%;
    width:100%;
  }
`;

export const OligarchButtonContainer=styled.div`
	animation: glowing 2000ms infinite;
	border-radius:50%;
    @keyframes glowing {
		0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
		50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
		100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
	}
`;


export const HeaderContainerDiv=styled.div`
	position:relative;
	width:35%;
	height:100%;
	margin-right:.5%;
	overflow:hidden;
`;

export const SymposiumHeaderAnimation=styled.div`
	position:sticky;
	top:0%;
	background-color:red;
	width:400px;
	height:40%;
	paddding-left:5px;
	transition: transform 300ms ease-in-out;
	boxShadow: 1px 1px 1px 1px #d5d5d5;
	border-radius:5px;
	z-index:3;
	animation:${keyFrameExampleTwo} 1s ease-in-out 0s forwards;
`;



export const Container=styled.div`
	position:relative;
	width:100%;
	height:50%;
	paddding-left:5px;
	transition: transform 200ms ease-in-out;
	boxShadow: "1px 1px 1px 1px #d5d5d5";
	borderRadius:5px;
	z-index:30;
	display:flex;
	flex-direction:row;
	justify-content:space-between;

	@media screen and (max-width:1370px){
		height:20%;
	}

	@media screen and (max-width:1370px) and (max-height:800px) and (orientation: landscape) {
		height:50% !important;
    }
	@media screen and (max-width:730px) and (max-height:420px){
    	height:60% !important;
    }

`;


export const ActiveContainer =styled.div`
	position:relative;
	width:300px;
	height:50%;
	background-color:white;
	padding:5px;
	padding-top:10px;
	overflow:auto;
	-ms-overflow-style: none;  /* IE 10+ */
    scrollbar-width: none;
    border-radius:5px;

    border-style:solid;
	border-color:#E4E4E4;
	border-width:1px;
`;

export const SymposiumTitle=styled.div`
	position:relative;
	border-style:solid;
	border-color:#E4E4E4;
	border-width:1px;
	border-radius:5px;
	

	@media screen and (max-width:1370px){
		margin-top:10%;
		#symposiumTitleText{
			font-size:24px !important;
		}
	}
	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
		margin-top:5%;
    }
`;

export const ActiveProfilePictures=styled(Link)`
	position:relative;
	width:50px;
	height:25%;
	border-radius:50%;
	background-color:red;
	cursor:pointer;
	margin-right:2%;
	margin-bottom:2%;
`;

export const PopularContainer=styled.div`

	position:relative;
	width:40%;
	background-color:white;
	height:25%;
	border-radius:5px;
	padding:10px;

`;

export const ChatContainer =styled.div`
	position:relative;
	width:100%;
	height:50%;
	background-color:white;
	padding:5px;
	padding-top:10px;
	overflow:auto;
	-ms-overflow-style: none;  /* IE 10+ */
    scrollbar-width: none;
`;


export const HighlightedQuestionsContainer=styled.div`
	position:absolute;
	height:55%;
	width:20%;
	left:10%;
	top:30%;
	border-radius:5px;

	@media screen and (max-width:1370px){
    	display:none !important;
    }
`;

export const SymposiumTitlesAndVideosContainer=styled.div`
	position:absolute;
	left:35%;
	width:35%;
	height:55%;
	border-radius:5px;
	top:40%;
	display:flex;
	flex-direction:column;

	@media screen and (max-width:1370px){
		left:5% !important;
    	top:40px !important;
    	width:80% !important;
		height:20% !important;
		#titleContainer{
			font-size:10px !important;
		}

		#selectedSymposiumTitle{
			font-size:20px !important;
			color:red;
		}
		#popularVideosTitle{
			display:none !important;
		}
		#seeAllTitle{
			display:none !important;
		}
		#previousTitleLI{
			margin-top:-5% !important;
		}
		#nextTitleLI{
			margin-top:-5% !important;
		}
		#popularVideosUL{
			height:120% !important;
		}
    }

    @media screen and (max-width:640px){
    	display:none !important;
    }
`;

export const ActivePeopleAndFollowContainer=styled.div`
	position:absolute;
	height:55%;
	width:20%;
	left:75%;
	top:33%;
	border-radius:5px;
	display:flex;
	flex-direction:column;

	@media screen and (max-width:1370px){
    	display:none !important;
    }
`;

export const MobileOptions=styled.div`
	position:absolute;
	top:40%;
	left:90%;
	z-index:40;
	border-radius:50%;
	box-shadow:1px 1px 5px #6e6e6e;
	background-color:white;

	@media screen and (max-width:730px) and (max-height:420px){
    	top:40% !important;
    }
`;

export const PopularVideosContainer=styled.div`
	position:relative;
	margin-top:5%;

	@media screen and (max-width:1370px){
		visibility: hidden;
	}

	@media screen and (max-width:1370px) and (max-height:800px) and (orientation: landscape) {
		visibility:visible;
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		visibility: hidden;
	}
`;

export const PopularVideos=styled.div`
	display:flex;
	flex-direction:row;
	border-style:solid;
	border-color:#E4E4E4;
	border-width:1px;
	border-radius:5px;
	padding:5px;
`;
