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

export const Posts=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	display:flex;
	flex-direction:row;

	@media screen and (max-width:650px){
		margin-top:5% !important;
		width:100%;
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		margin-top:10% !important;
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

export const Container=styled.div`
	position:relative;
	width:100%;
	height:44%;
	paddding-left:5px;
	transition: transform 200ms ease-in-out;
	boxShadow: "1px 1px 1px 1px #d5d5d5";
	borderRadius:5px;
	z-index:30;
	display:flex;
	flex-direction:row;

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

export const PopularVideosContainer=styled.div`
	position:fixed;
	background-color:white;
	border-radius:5px;
	top:20%;
	left:25%;
	width:50%;
	height:60%;
	padding:20px;
	overflow-y:scroll;
	z-index:40;
	box-shadow: 1px 5px 5px 1px #d5d5d5;

	@media screen and (max-width:740px){
		width:90% !important;
		left:5% !important;
	}
`;

export const HightLightedQuestionsContainerModal=styled.div`
	position:relative;
	width:100%;
	height:100%;
	padding:20px;
	overflow-y:scroll;
	z-index:40;
	border-radius:5px;
	background-color:white;

	border-style:solid;
	border-color:#E4E4E4;
	border-width:1px;
	overflow-y:scroll;

	${({isSimplified})=>
		isSimplified==true &&(
			`
				#videoQuestionAnswers{
					height:80% !important;
					width:300px !important;
				}

				#imageHighlightedQuestion{
					width:200px !important;
				}

				#postLI{
					margin-right:10% !important
				}
			`
		)
	}

	@media screen and (max-width:1370px){
		#postLI{
			width:110% !important;
		}
		#videoQuestionAnswers{
			width:60% !important;
			height:50% !important;
		}

		#imageHighlightedQuestion{
			width:70% !important;
		}
	}

	@media screen and (max-width:650px){
		#postLI{
			width:40% !important;
		}
		#videoQuestionAnswers{
			height:30% !important;
			width:100% !important;
		}
		#imageHighlightedQuestion{
			height:20% !important;
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
	top:0%;
	width:90%;
	height:45%;
	left:8%;
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



export const ActivePeopleContainer=styled.div`

	position:fixed;
	background-color:white;
	border-radius:5px;
	width:40%;
	height:50%;
	z-index:46;
	left:30%;
	top:15%;
	padding:10px;
	overflow:scroll;

	@media screen and (max-width:640px){
		width:90% !important;
		left:5% !important;
		height:65% !important;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		width:70% !important;
		height:65% !important;
		left:10%;
	}
`;

export const PostContainer=styled.div`
	position:relative;
	padding-left:40px;
	left:-3%;
	top:5%;
	width:100%;
	height:100%;
	transition:1s;

	@media screen and (max-width:1370px){
    	position:absolute;
    	left:5%;
		height:180% !important;
		padding-top:20% !important;
    	margin-left:-2% !important;

		${({isScrollEnabled})=>
			isScrollEnabled?
			`
				top:50% !important;
			`:
			`
				top:10% !important; 
			`
		}
    }

	@media screen and (max-width:650px){
    	position:absolute;
		width:100%;
		height:150% !important;
		padding-top:50% !important;
    	top:58% !important;
    	margin-left:-7% !important;
    }

    @media screen and (max-width:600px){
    	top:-20% !important;
    	${({isScrollEnabled})=>
			isScrollEnabled==true &&(
				`top:10% !important;`
			)
		}
    }
    @media screen  and (max-width:850px) and (max-height:420px) 
	  and (orientation: landscape) 
	  and (-webkit-min-device-pixel-ratio: 1){
    	height:170% !important;
    	padding:20px !important;
    	width:90%;
    	top:130% !important;
    	margin-bottom:120% !important;
    	margin-left:0% !important;
    }


    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	height:170% !important;
    	padding:20px !important;
    	width:100%;
    	top:60% !important;
    	margin-bottom:120% !important;
    	margin-left:0% !important;
    }

    @media screen and (max-width:1370px) and (max-height:800px) and (orientation: landscape) {
		top:50%!important;
		${({isScrollEnabled})=>
			isScrollEnabled==true &&(
				`top:90% !important;`
			)
		}
    }


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



export const SearchContainer=styled.div`
	position:relative;
	width:630px;
	height:50px;
	display:flex;
	flex-direction:row;
	border-radius:5px;
	margin-right:2%;
	box-shadow: 1px 1px 5px 	#dbdddf;
	@media screen and (max-width:1370px){
    	width:400px;
    	margin-left:2% !important;
    }

    @media screen and (max-width:730px){
    	margin-left:-140% !important;
    	width:720px;
    	display:none !important;
    }

    @media screen and (max-width:730px) and (max-height:420px){
    	height:35% !important;
    }

    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	margin-left:0% !important;
    }

    @media screen  and (max-width:730px) and (max-height:420px) 
	  and (orientation: landscape) 
	  and (-webkit-min-device-pixel-ratio: 1){
    	margin-left:-100% !important;
    }
`;

export const SearchTextArea=styled.textarea`
	position:relative;
	resize:none;
	width:500px;
	height:90%;
	padding-top:10px;
	border-style:none;

	border: none;
    overflow: auto;
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none; /*remove the resize handle on the bottom right*/

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
	width:80%;
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
	background-color:red;
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
		left:75%;
		top:70%;
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		left:85%;
    }


	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		top:50%;
		left:75%;
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
		margin-top:20%;
	}

	@media screen and (max-width:650px){
		padding:0px;
	}

`;

export const PostContainerTEst=styled.div`
	z-index:7;
`;


export const SympociaOptionsContainer=styled.div`
	position:relative;
	display:flex;							
	flex-direction:row;
	z-index:30;

	@media screen and (max-width:1370px){
		top:10%;
		margin-left:5% !important;
		${({isScrollEnabled})=>
			isScrollEnabled?
			`
				top:30%;
			`:
			`
				top:10%;
			`
		}
	}
	@media screen and (max-width:650px){
		margin-left:-5px !important;
	}
`;

export const SearchOptionContainer=styled.div`
	display:flex;
	flex-direction:row;
	@media screen and (max-width:1370px){
		flex-direction:row;
	}
`;

export const MinifiedSymposiumInformation=styled.div`
	display:flex;
	flex-direction:row;

	@media screen and (max-width:1370px){
		display:none !important;
	}
`;