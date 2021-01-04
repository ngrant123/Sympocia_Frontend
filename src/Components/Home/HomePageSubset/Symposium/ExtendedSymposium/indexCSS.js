import styled, {keyframes} from "styled-components";
 export const keyFrameExampleTwo= keyframes`
  0% {
    width:100%;
	height:42%;
	left:0%;
	top:0px;
  }
  100% {
  	height:15%;
    width:100%;
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
     @media screen and (max-width:730px) and (max-height:420px){
    	#postOptionsLI{
    		margin-left:-20% !important;
    	}
    }
`;

export const Container=styled.div`
	position:relative;
	background: linear-gradient(to left, #9933ff 0%, #ff99ff 100%);
	width:100%;
	height:42%;
	paddding-left:5px;
	transition: transform 300ms ease-in-out;
	boxShadow: "1px 1px 1px 1px #d5d5d5";
	borderRadius:5px;
	z-index:30;

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



export const PostsChatInformation=styled.div`
	position:relative;
	top:0%;
	width:100%;
	height:45%;
	left:0%;
	margin-left:5%;
	z-index:2;

	@media screen and (max-width:1370px){
		margin-left:0%;
	}
`;


export const BackgroundModalContainer= styled.div`
	position:absolute;
	width:100%;
	height:100%;
	background: rgba(0, 0, 0, 0.5);
	z-index:15;
`;



export const ActivePeopleContainer=styled.div`

	position:absolute;
	background-color:white;
	border-radius:5px;
	width:40%;
	height:50%;
	z-index:17;
	left:30%;
	top:15%;
`;

export const PostContainer=styled.div`
	position:relative;
	padding-left:40px;
	left:-2%;
	top:5%;
	width:100%;
	height:170%;
	transition:1s;



	@media screen and (max-width:1370px){
    	position:absolute;
    	left:5%;
		height:180% !important;
		padding-top:20% !important;
    	margin-left:-5% !important;

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

	@media screen and (max-width:740px){
    	position:absolute;
		width:100%;
		height:150% !important;
		padding-top:90% !important;
    	top:58% !important;
    	margin-left:-10% !important;
    }

    @media screen and (max-width:600px){
    	top:-20% !important;
    	${({isScrollEnabled})=>
			isScrollEnabled==true &&(
				`top:10% !important;`
			)
		}
    }


    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	height:170% !important;
    	padding:20px !important;
    	width:100%;
    	top:10% !important;
    	margin-bottom:120% !important;
    	margin-left:0% !important;
    }

    @media screen and (max-width:1370px) and (max-height:800px) and (orientation: landscape) {
		top:30%!important;
    }


    @media screen  and (max-width:850px) and (max-height:420px) 
	  and (orientation: landscape) 
	  and (-webkit-min-device-pixel-ratio: 1){
    	height:170% !important;
    	padding:20px !important;
    	width:100%;
    	top:130% !important;
    	margin-bottom:120% !important;
    	margin-left:0% !important;
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
	left:10%;
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


export const SearchContainer=styled.div`
	position:relative;
	width:630px;
	border-radius:5px;
	background-color:red;
	box-shadow: 1px 1px 5px 	#dbdddf;
	@media screen and (max-width:1370px){
    	width:500px;
    }

    @media screen and (max-width:730px){
    	margin-left:-140% !important;
    	width:720px;
    }

    @media screen and (max-width:730px) and (max-height:420px){
    	height:35% !important;
    }

    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	margin-left:-100% !important;
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

`;

export const PostOptions=styled.div`
	border-color:#5298F8;
	border-style:solid;
	border-width:1px;
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
	background-color:red;
	border-radius:5px;
`;

export const SymposiumFeatureContainer=styled.div`
	position: fixed;
	overflow:hidden;
	width:80%;
	height:85%;
	top:10%;
	left:75%;
	border-radius:5px;
	overflow-y:auto;
	-webkit-transform: translate3d(0, 0, 0);
	transform: translate3d(0, 0, 0);
	z-index: 20;

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
	z-index: 40;

	@media screen and (max-width:1370px){
    	display:none !important;
    }
`;

export const ChatAndIndustryInformationContainer=styled.div`
	border-style:solid;
	border-width:1px;
	color:white;
	background-color:#5298F8;
	border-radius:5px;
	padding:10px;
	margin-right:2px;

	@media screen and (max-width:1370px){
    }
`;



export const ArrowDownContainer=styled.div`
	position:fixed;
	left:45%;
	top:80%;
	z-index:40;

  animation: bounce 2s infinite;
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
`;

export const PostContainerTEst=styled.div`
	z-index:7;
`;

