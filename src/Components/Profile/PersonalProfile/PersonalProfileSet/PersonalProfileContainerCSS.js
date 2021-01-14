import styled from "styled-components";
export const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	overflow-x:hidden;

	@media screen and (max-width:1370px){
		#postsContainer{
			margin-left:-50%;
			margin-top:20% !important;
		}
		#createPostIcon{
			top:5% !important;
			position:absolute !important;
			margin-left:5% !important;
			z-index:22;
		}

    }
    @media screen and (max-width:1060px){
		#recommendedPostsLI{
			display:block !important;
		}
    }

    @media screen and (max-width:700px){
    	#postsContainer{
			margin-left:-80% !important;
			margin-top:180% !important;
		}
		#friendsGaugeContainer{
			margin-left:-50% !important;
		}
    }
    @media screen and (max-width:640px){
		#createPostContainer{
			box-shadow:none !important;
			&:hover{
				box-shadow:none !important;
			}
		}
		#recommendedPostsLI{
			box-shadow:none !important;
			&:hover{
				box-shadow:none !important;
			}
		}
    }
    @media screen and (max-width:620px){
		#createPostContainer{
			width:400px
		}
    }

    @media screen and (max-width:520px){
		#createPostContainer{
			width:350px
		}
    }
    @media screen and (max-width:420px){
		#createPostContainer{
			width:300px
		}
    }
    @media screen and (max-width:350px){
    	#mobilePhonePostOption{
			margin-left:15% !important;
		}
		#createPostContainer{
			width:250px
		}
		#recommendedPostsLI{
			margin-top:60% !important;
		}
    }

    @media screen and (max-width:570px) and (max-height:330px){
    	#createPostContainer{
			margin-bottom:40% !important;
		}
	 	#recommendedPostsLI{
			margin-top:20% !important;
		}
    }
    @media screen and (max-width:670px) and (max-height:380px){
    	#createPostContainer{
			margin-bottom:40% !important;
		}
	 	#recommendedPostsLI{
			margin-top:20% !important;
			width:80% !important;
			box-shadow:none !important;
			&:hover{
				box-shadow:none !important;
			}
		}
    }

    @media screen and (max-width:1370px) and (max-height:600px) and (orientation: landscape) {
		#postsContainer{
			margin-top:0% !important;
		}
    }

    @media screen and (max-width:700px) and (max-height:420px) and (orientation:landscape){
    	#postsContainer{
			margin-top:120% !important;
		}
		#createPostIcon{
			margin-left:-10% !important;
		}
    }

`;

export const ProfilePictureContainer=styled.div`
	position:relative;
	width:90%;
	height:35%;
	left:2%;
	background-color:white;
	border-style:solid;
	border-color:white;
	border-width:7px;
	border-radius:5px;
	z-index:3;
	box-shadow: 1px 1px 10px #d5d5d5;
	display:flex;
	justify-content:center;

	@media screen and (max-width:1370px){
	 	box-shadow:none !important;
	 	height:90% !important;
		width:100% !important;
	 	top:5% !important;
	 	#profilePicture{
	      border-radius:50%;
          height:70% !important;
          width:70% !important;
          margin-left:10%;
	    }
    }


    @media screen and (max-width:700px){
    	top:-10% !important;
    	height:100% !important;
    	margin-left:5%;
    	width:90% !important;
		z-index:10;
		#profilePicture{
          height:200% !important;
          left:5% !important;
          max-height:240px !important;
	    }

	    max-height:250px !important;
    }

    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
	 	#profilePicture{
	 		width:50% !important;
	 	}
    }
`;

export const HeaderContainer=styled.div`
	position:relative;
	width:100%;
	background-color:white;
	height:10%;
	z-index:30;
`;

export const ProfileContainer=styled.div`
	position:fixed;
	width:30%;
	height:100%;
	z-index:10;

	@media screen and (max-width:1370px){
		position:relative;
		height:30% !important;
	}

	@media screen and (max-width:700px){
		position:relative;
		top:30%;
		margin-left:2% !important;
		height:20% !important;
		width:90%;
	}
	@media screen and (max-width:1370px) and (max-height:600px) and (orientation: landscape) {
		height:60% !important;
		margin-top:5% !important;
    	
    }

	@media screen and (max-width:740px) and (max-height:420px) and (orientation:landscape){
		top:70%;
		height:90% !important;
    }
`;

export const PersonalProfileInformationContainer= styled.div`
	position:absolute;
	top:37%;
	width:90%;
	left:3%;
	background-color:#fbfdff;
	border-radius:5px;
	transition:.8s;
	padding:10px;

	&:hover{
		box-shadow: 5px 5px 5px 5px #d5d5d5;
	}
`;

export const PersonalProfileContentContainer= styled.div`

	position:relative;
	top:0%;
	width:64%;
	height:80%;
	left:30%;
	background-color:white;
	border-radius:5px;
`;



export const ChangePictureButton=styled.div`	
	position:absolute;
	top:85%;
	background-color:#5298F8;
	padding:5px;
	border-radius:5px;
	color:white;
	left:5%;



`;

export const BackgroundModalContainer= styled.div`
	position:absolute;
	width:100%;
	height:100%;
	background: rgba(0, 0, 0, 0.5);
	z-index:3;
	display: block;

`;


export const ImageModal=styled.div`
	position:absolute;
	width:65%;
	height:60%;
	top:20%;
	background-color:white;
	z-index:4;
	left:20%;
	border-radius:5px;

`;

export const SelectedImage=styled.div`
	position:absolute;
	top:10%;
	width:40%;
	height:70%;

	left:5%;
	border-radius:5px;
	box-shadow: 5px 5px 5px 5px #d5d5d5;

`;


export const ImagePortfolioContainer=styled.div`
	position:relative;
	top:10%;
	width:50%;
	height:70%;
	left:50%;
	border-radius:5px;
	padding:5px;
	overflow-y:scroll;
`;

export const VideoModal=styled.div`
	position:absolute;
	width:80%;
	height:90%;
	top:5%;
	background-color:white;
	z-index:4;
	left:10%;
	border-radius:5px;
`;

export const Video=styled.div`
	position:relative;
	height:70%;
	left:5%;
	top:5%;
	width:90%;
	border-radius:5px;
	margin-bottom:50px;
`;

export const PostInformationContainer=styled.div`
	position:absolute;
	background-color:white;
	width:60%;
	height:83%;
	left:33%;
	z-index:7;
	top:15%;
	@media screen and (max-width:670px) and (max-height:340px){
	 	top:40% !important;
    }
	@media screen and (max-width:736px) and (max-height:320px){
	 	top:35% !important;
    }
 
 	@media screen and (max-width:1370px) and (max-height:600px) and (orientation: landscape) {
		top:20%;
    }

`;

export const PostInformationContainerShadowOverlay=styled.div`
	position:absolute;
	background-color:white;
	width:60%;
	height:83%;
	left:33%;
	z-index:8;
	top:15%;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`;

export const ShadowContainer= styled.div`

	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;
	z-index:35;

`;

export const ImagePopupContainer=styled.div`
	margin-left:20%;
	margin-top:10%;
	position:fixed;
	width:70%;
	height:70%;
	background-color:white;
	padding:20px;
	z-index:35;
	border-radius:5px;

	@media screen and (max-width:1370px){
		margin-left:1% !important;
    	width:100% !important;
    	height:90% !important;
    	border-radius:5px !important;
    }

     @media screen and (max-width:740px) and (max-height:420px) and (orientation:landscape){
		width:95% !important;
    	height:80% !important;
    }
`;

export const PostPopupContainer=styled.div`
	margin-left:0%;
	margin-top:10%;
	position:fixed;
	width:70%;
	height:60%;
	padding:20px;
	z-index:35;
	border-radius:5px;

	@media screen and (max-width:800px){
		margin-left:0% !important;
		top:0% !important;
    	width:100% !important;
    	height:90% !important;
    	border-radius:5px !important;
    }
    @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	margin-top:7%;
    	margin-left:20%;
    }
`;

export const CreatePostButton=styled.div`	
	width:70px;
	height:70px;
	border-radius:50%;
	background-color:white;
	border-color:white;
	border-style:solid;
	padding:15px;
	border-width:5px;
	animation: glowing 1300ms infinite;


	@keyframes glowing {
      0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
  }
  	@media screen and (max-width:1200px){
			width:60px !important;
			height:60px !important;
    }
    @media screen and (max-width:1080px){
			width:50px !important;
			height:50px !important;
    }
     @media screen and (max-width:1080px){
			width:70px !important;
			height:70px !important;
    }
`;

export const RegularPostContainerParent=styled.div`
	position:fixed;
	width:60%;
	height:50%;
	z-index:35;
	left:25%;
	top:20%;
	border-radius:5px;
	background-color:white;
	border-radius:5px;
	padding:5px;
	box-shadow: 1px 1px 50px #d5d5d5;
	overflow:hiden;

	@media screen and (max-width:1370px) and (max-height:1030px){
    	left:10% !important;
    }


	@media screen and (max-width:1030px){
		left:10% !important;
		width:80% !important;
	}

	@media screen and (max-width:450px){
		left:0% !important;
		height:100% !important;
		width:100% !important;

	}

		@media screen and (max-width:740px) and (max-height:420px) and (orientation:landscape){
			height:120% !important;
    }
`;





