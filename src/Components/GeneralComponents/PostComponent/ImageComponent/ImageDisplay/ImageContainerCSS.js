import styled,{keyframes} from "styled-components";

export const Container=styled.div`
	position:relative;
	width:100%;
	height:100%;
	background-color:white;
	@media screen and (max-width:800px){
		#postInformationLI{
			display:none !important;
		}
		#postOptionsLI{
			display:none !important;
		}
    }
`;


export const Image=styled.div`
	position:relative;
	width:460px;
	height:75%;
	background-color:blue;
	border-radius:20px;
	margin-bottom:5px;

	@media screen and (max-width:1370px){
		height:40% !important;
    }

	@media screen and (max-width:350px){
		height:40%;
		width:200px;
    }
`;

export const ImageButtons=styled.div`
	position:relative;
	background-color:#5298F8;
	text-align:center;
	width:120px;
	padding:5px;
	color:white;
	border-style:solid;
	border-width:1px;
	border-color:#0857c2;
	border-radius:5px;
	transition:.8s;

	&:hover{
		background-color:#0857c2;
	}
`;
export const keyFrame=keyframes`
  0%{
    opacity: 0;
  }
  10%{
    opacity:.50;
    transform-origin: 50% 50%;
    transform: scale(5);
    transition: all .3s cubic-bezier(0.6, 0.04, 0.98, 0.335);
  }
  100%{
    opacity:1;
    transform: scale(1);
  }
`;
export const StampIconEffect=styled.div`
	  height:100px;
	  width:100px;
	  border-radius:5px;
	  position:absolute;
	  animation:${keyFrame} 1s ease-in-out 0s forwards;

    @media screen and (max-width:1030px){
		height:70px !important;
		width:70px !important;
		left:2% !important;
    }

	@media screen and (max-width:420px){
		height:50px !important;
		width:50px !important;
		left:2% !important;
    }

`;
export const VideoDesriptionContainer=styled.div`
	position:absolute;
	width:30%;
	height:30%;
	border-radius:50%;
	top:70%;
	left:2%;
`;

export const CrownIconContainer=styled.div`
	position:relative;
	border-style:solid;
	border-width:2px;
	width:100%;
	animation: glowing 1300ms infinite;
	border-radius:50%;


	@keyframes glowing {
      0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
  }
`;

export const ShadowContainer= styled.div`
	position:fixed;
	width:110%;
	height:100%;
	left:-5%;
	z-index:11;
	top:0px;
`;

export const CrownPostModal=styled.div`
	position:fixed;
	width:30%;
	height:20%;
	background-color:white;
	z-index:11;
	left:40%;
	top:40%;
	border-radius:5px;
	box-shadow: 1px 1px 50px #d5d5d5;
`;

export const CommentContainer=styled.div`
	position:absolute;
	width:40%;
	height:82%;
	margin-top:13px;
	top:30px;
`;