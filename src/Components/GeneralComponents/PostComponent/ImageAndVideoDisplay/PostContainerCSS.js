import styled,{keyframes,css} from "styled-components";

export const Container=styled.div`
	position:relative;
	width:100%;
	display:flex;
	padding:30px;
	background-color:white;
	flex-direction:column;
	z-index:40;

	@media screen and (max-width:1370px){
		height:100%;
		padding:10px;
	
		#postInformationLI{
			display:none !important;
		}
		#postOptionsLI{
			display:none !important;
		}
		#ownerProfilePicture{
			width:50px !important;
			height:50px !important;
		}
		#audio{
			margin-top:5%;
			margin-bottom:2%;
			width:90% !important;
			margin-left:0% !important;
		}
			#postInformation{
			display:none !important;
		}
		#removePostOption{
			width:50px !important;
		}

		#promotePostOption{
			width:50px !important;
		}
    }

    @media screen and (max-width:650px){
    	#ownerProfilePicture{
			width:50px !important;
			height:50px !important;
		}
    }  
    @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	#ownerProfilePicture{
			width:50px !important;
		}
	}
`;

/*
    @media screen and (max-width:650px){
    	height:200px !important;
    }
*/

export const Image=styled.div`
	position:relative;
	border-radius:20px;
	margin-bottom:5px;
	cursor:pointer;
	height:250px;
	width:260px;

	@media screen and (max-width:1370px){
		height:100% !important;
		width:100%;
    }

    @media screen and (max-width:650px){
    	width:90% !important;
    }

    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
   		height:600px !important;
    }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	height:400px !important;
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
	  z-index:40;

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

	// ${({postHeight})=>
	// 	postHeight!=null?
	// 	`height:${postHeight}px;`:
	// 	`height:100%;`
	// }
export const VideoDesriptionContainer=styled.div`
	height:250px;
	width:360px;

	justify-content:center;
	margin-right:2%;
	background-color:#151515;
	cursor:pointer;
	border-radius:5px;

	@media screen and (max-width:1370px){
		height:500px;
	}

	@media screen and (max-width:650px){
		height:150px;
		width:110%;
	}
    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
   		height:600px !important;
    }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	height:400px !important;
	}
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

	@media screen and (max-width:650px){
		width:100%;
	}
`;

export const PersonalInformation=styled.div`
	display:flex;
	flex-direction:row;
	justify-content:space-between;

	@media screen and (max-width:650px){
		margin-bottom:5%;
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	margin-bottom:-10% !important;
    }
`;

/*
		@media screen and (max-width:650px){
		${({isImagePost})=>
			isImagePost==false?
			css`height:250px;`:
			css`height:180px;`
		}
	}
*/
//height:350px;

/*
		${({isImagePost,isWidthFocusedImage})=>
			isImagePost==false?
			`
				isWidthFocusedImage==true?
	    		height:250px !important;:
	    		height:300px !important;
			`:
			`height:180px;`
		}
*/
export const Post=styled.div`
	position:relative;
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;

	@media screen and (max-width:1370px){
		height:500px;
		margin-bottom:5%;
		#image{
			height:100% !important;
		}
		#audioOnClickDiv{
			width:500px !important;
			display:none !important;
		}

		#audioDescription{
			width:500px !important;
			display:none !important;
		}
	}



	@media screen and (max-width:650px){
		${({isImagePost})=>
			isImagePost==false?
			css`height:250px;`:
			css`height:150px;`
		}
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
   		#image{
			height:100% !important;
		}
		height:600px;
		margin-bottom:5%;
    }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	height:400px;
	}
`;

export const PollingOptionsContainer=styled.div`
	display:flex;
	flex-direction:column;
`;









