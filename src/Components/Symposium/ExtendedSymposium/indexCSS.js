import styled, {keyframes} from "styled-components";
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



export const OligarchsContainer=styled.div`
	position:relative;
	border-radius:5px;
	background-color:white;
	padding:10px;
	box-shadow: 1px 1px 1px 1px #d5d5d5;
	transition:.8s;
	margin-top:20%;
	cursor:pointer;
	width:70px;

	@media screen and (max-width:650px){
		width:50px;
		margin-bottom:40%; 
		#oligarchButtonIcon{
			width:30px !important;
			height:30px !important;
		}
	}

	&:hover{
		box-shadow: 1px 1px 10px #707070;	
	}
`;

export const SymposiumContainer=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	overflow:hidden;

	@media screen and (max-width:1370px){
    	#postOptionsLI{
    		margin-left:-10% !important;
    		z-index:34;
    	}
    	#simplifiedHeaderUL{
    		display:none !important;
    	}
    	#rightChevronLI{
    		display:none !important;
    	}
    	#symposiumIndicatorUL{
    		display:none !important;
    	}
    }

    @media screen and (max-width:650px){
    	#mobileSymposiumOptions{
    		width:120% !important;
    	}
    }


    @media screen and (max-width:730px) and (max-height:420px){
    	#postOptionsLI{
    		margin-left:-20% !important;
    	}
    }
`;

export const PopularContainer=styled.div`

	position:relative;
	width:40%;
	background-color:white;
	height:25%;
	top:70%;
	left:30%;
	border-radius:5px;
	padding:10px;

`;

export const PopularVideos=styled.div`
	position:relative;
	width:80px;
	height:90%;
	background-color:red;
	border-radius:5px;
`;


export const HightLightedQuestionsContainerModal=styled.div`
	position:relative;
	width:100%;
	height:100%;
	padding:20px;
	z-index:40;
	border-radius:5px;
	background-color:white;

	border-style:solid;
	border-color:#E4E4E4;
	border-width:1px;
	display:flex;
	flex-direction:column;
	overflow-y:auto;

	${({isSimplified})=>
		isSimplified==true &&(
			`
				#videoQuestionAnswers{
					height:210px !important;
					width:200px !important;
				}

				#imageHighlightedQuestion{
					width:200px !important;
					height:190px !important;
				}

				#postLI{
					margin-right:10% !important
				}
			`
		)
	}

	@media screen and (max-width:1370px){
		#postLI{
			width:40% !important;
		}
		#videoQuestionAnswers{
			width:200px !important;
			height:218px !important;
		}

		#imageHighlightedQuestion{
			width:90% !important;
		}
	}

	@media screen and (max-width:650px){
		#postLI{
			width:40% !important;
		}
		#videoQuestionAnswers{
			height:150px !important;
			width:110% !important;
		}
		#imageHighlightedQuestion{
			height:95px !important;
			width:90% !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:800px) and (orientation: landscape) {
		#imageHighlightedQuestion{
			width:40% !important;
			height:40% !important;
		}
    }

`;


export const PostsChatInformation=styled.div`
	position:relative;
	width:100%;
	height:45%;
	filter:blur(2px);
	z-index:-1;
	transition: all 1s;

	@media screen and (max-width:1370px){
		margin-left:0%;
		left:0%;
	}
	@media screen and (max-width:650px){
		margin-left:1%;
	}
	@media screen and (max-width:400px){
		margin-left:-1%;
	}
`;


export const BackgroundModalContainer= styled.div`
	position:fixed;
	width:100%;
	height:140%;
	background: rgba(0, 0, 0, 0.5);
	z-index:40;
	top:0%;
`;


export const ShadowContainer=styled.div`
	position:fixed;
	top:0%;
	width:100%;
	height:200%;
	left:0%;
	z-index:17;
	overflow-y:scroll;
  	transition:opacity 1s linear;
  	padding-top:20px;
  	background-color: rgba(0,0,0,0.4);
`;

export const ExamplePosts=styled.div`
	position:relative;
	width:80%;
	height:70%;
	background-color:red;
	z-index:3;
`;


export const PreventScrollScreen=styled.div`
	position:absolute;
	width:80%;
	height:100%;
	z-index:4;
	background-color:blue;
	opacity:0;
	overflow:visible;
`;

export const ExploreIconContainer=styled.div`
	position:relative;
	width:70px;
	border-radius:5px;
	background-color:white;
	padding:10px;
	box-shadow: 1px 1px 1px 1px #d5d5d5;
	transition:.8s;

	&:hover{
		box-shadow: 1px 1px 10px #707070;	
	}
`;

export const PageIndicator=styled.div`
	position:absolute;
	width:5%;
	height:20%;
	top:7%;
	left:2%;
	border-radius:5%;
	z-index:31;

	@media screen and (max-width:1370px){
    	display:none !important;
    }
`;

export const AdditionalSymposiumInformationContainer=styled.div`
	position:absolute;
	width:5%;
	height:20%;
	top:20%;
	left:2%;
	border-radius:5%;
	z-index:31;
	display:flex;
	flex-direction:column;

	@media screen and (max-width:1370px){
    	display:none !important;
    }
`;


export const PostOptions=styled.div`
	color:#5298F8;
	background-color:white;
	border-radius:5px;
	padding:5px;
`;

export const VideoCallOption=styled.div`
	border-color:#C8B0F4;
	border-style:solid;
	border-width:1px;
	color:#C8B0F4;
	background-color:white;
	border-radius:5px;
	padding:5px;
`;

export const ChatContainer=styled.div`
	position:relative;
	overflow:hidden;
	width:20%;
	height:85%;
	top:-30%;
	left:75%;
	border-radius:5px;
`;

export const SymposiumFeatureContainer=styled.div`
	position: absolute;
	overflow:hidden;
	width:20%;
	height:40%;
	top:55%;
	left:75%;
	border-radius:5px;
	overflow-y:auto;
	-webkit-transform: translate3d(0, 0, 0);
	transform: translate3d(0, 0, 0);
	z-index: 30;

	${({headerAnimation})=>
		headerAnimation==true &&(
			`top:40% !important;`
	)}

	@media screen and (max-width:1370px){
		display:none !important;
    }
`;

export const SymposiumChatContainer=styled.div`
	position: fixed;
	overflow:hidden;
	width:20%;
	height:45%;
	top:45%;
	left:75%;
	border-radius:5px;
	overflow-y:auto;
	-webkit-transform: translate3d(0, 0, 0);
	transform: translate3d(0, 0, 0);
	z-index: 30;

	@media screen and (max-width:1370px){
    	display:none !important;
    }
`;

export const ChatAndIndustryInformationContainer=styled.div`
	color:#5298F8;
	border-radius:5px;
	padding:10px;
	margin-right:2px;
	cursor:pointer;

	@media screen and (max-width:1370px){
    }
`;



export const ArrowDownContainer=styled.div`
position:fixed;
	left:50%;
	top:80%;
	z-index:39;
	cursor:pointer;
	${({backgroundColor})=>
		backgroundColor!=null &&(
			`background:${backgroundColor};`
		)
	}
	border-radius:50%;
	display:flex;
	justify-content:center;
	@media screen and (max-width:1370px){
		left:45%;
	}
	@media screen and (max-width:650px){
		left:40% !important;
	}
	@media screen and (max-width:740px) and (max-height:420px){
	 	left:40% !important;
    }
    animation: glowing 1300ms infinite, bounce 2s infinite;
  	@keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-30px);
        }
        60% {
          transform: translateY(-15px);
        }
	}
    @keyframes glowing {
	      0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
	      50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
	      100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
	  }
`;

export const MobileQuickAccessSymposiumOptions=styled.div`
	position:fixed;
	left:80%;
	top:80%;
	z-index:39;
	cursor:pointer;
	display:flex;
	flex-direction:column;
	justify-content:center;

    animation:bounce 2s infinite;
  	@keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-30px);
        }
        60% {
          transform: translateY(-15px);
        }
	}

	@media screen and (max-width:1370px){
		left:85%;
		top:75%;
	}

	@media screen and (max-width:650px){
		top:70%;
		left:75%;
	}

	@media screen and (max-width:350px){
		display:none !important;
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		left:85%;
    }


	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		top:50%;
		left:80%;
	}
`;
export const BeaconButtonContainer=styled.div`
	z-index:39;
	cursor:pointer;
	border-radius:5px;
	${({backgroundColor})=>
		backgroundColor!=null &&(
			`background:${backgroundColor};`
		)
	}
	border-radius:50%;
	display:flex;
	justify-content:center;
	animation: glowing 1300ms infinite;

    @keyframes glowing {
	    0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
	    50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
	    100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
	}

	@media screen and (max-width:1370px){
		left:80%;
		padding:10px;
		margin-top:50%;
	}

	@media screen and (max-width:650px){
		padding:0px;
		margin-top:20%;
	}

`;

export const PostContainerTEst=styled.div`
	z-index:7;
`;


