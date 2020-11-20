import styled from "styled-components";
export const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	overflow-x:hidden;

	@media screen and (max-width:1300px){
		#postsContainer{
			margin-left:-50%;
			margin-top:10%;
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
			margin-left:-60%;
			margin-top:105%;
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
		#postsContainer{
			margin-top:120%;
		}
		#createPostContainer{
			width:400px
		}
    }
    @media screen and (max-width:550px){
		#postsContainer{
			margin-top:140%;
		}
    }

    @media screen and (max-width:520px){
    	#postsContainer{
			margin-left:-80%;
		}
		#createPostContainer{
			width:350px
		}
    }
    @media screen and (max-width:420px){
    	#postsContainer{
			margin-left:-80%;
			margin-top:180%;
		}
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
		#mobilePersonalOptionCaret{
			margin-left:30% !important;
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
`;

export const ProfilePictureContainer=styled.div`
	position:absolute;
	width:25%;
	height:35%;
	top:15%;
	left:2%;
	background-color:white;
	border-style:solid;
	border-color:white;
	border-width:7px;
	border-radius:5px;
	z-index:3;
	box-shadow: 1px 1px 10px #d5d5d5;


	 @media screen and (max-width:420px) and (max-height:740px){
     	top:80% !important;
	 	height:80% !important;
     }

	 @media screen and (max-width:1300px){
	 	box-shadow:none !important;
	 	height:25% !important;
	 	top:15% !important;
	 	 #profilePicture{
	          border-radius:50%;
	          height:70% !important;
	          width:70% !important;
	          margin-left:10%;
	     }
    }
     @media screen and (max-width:1030px){
     	width:31% !important;
    }
     @media screen and (max-width:800px){
     	width:25% !important;
     	height: 20% !important;
    }
    @media screen and (max-width:700px){
		top:35% !important;
		width:70% !important;
		height:30% !important;
		margin-left:10% !important;
		z-index:10;
		#profilePicture{
	          height:100% !important;
	          width:75% !important;
	          left:5% !important;
	     }
    }
    @media screen and (max-width:485px){
		width:60% !important;
		margin-left:15% !important;
		height:20% !important;
		#profilePicture{
	          height:100% !important;
	          width:80% !important;
	     }
    }

    @media screen and (max-width:520px){
		#personalInformationIcon{
			font-size:10 !important;
		}
    }

    @media screen and (max-width:510px) and (max-height:770px){
	 	top:35% !important;
	 	height:30% !important;
    }


    @media screen and (max-width:420px){
		height:30% !important;
		margin-left:20% !important;
		width:80% !important;
		top:40% !important;
		left:-10% !important;
    }
     @media screen and (max-width:350px){
    	top:50% !important;
    }


    @media screen and (max-width:570px) and (max-height:330px){
	 	top:75% !important;
	 	height:80% !important;
    }

    @media screen and (max-width:670px) and (max-height:380px){
    	top:75% !important;
	 	height:80% !important;
    }
    @media screen and (max-width:400px) and (max-height:770px){
    	top:35% !important;
    }

    @media screen and (max-width:380px) and (max-height:670px){
    	height:35% !important;
    }
     @media screen and (max-width:330px) and (max-height:570px){
    	top:40% !important;
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
	width:30%;
	height:70%;
	background-color:white;
	z-index:10;
`;

export const PersonalProfileInformationContainer= styled.div`
	position:absolute;
	top:52%;
	width:25%;
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
	height:60%;
	background-color:white;
	padding:20px;
	z-index:35;
	border-radius:5px;

	@media screen and (max-width:800px){
		margin-left:1% !important;
		top:10% !important;
    	width:100% !important;
    	height:90% !important;
    	border-radius:5px !important;
    }
`;

export const PostPopupContainer=styled.div`
	margin-left:20%;
	margin-top:10%;
	position:fixed;
	width:70%;
	height:60%;
	background-color:white;
	padding:20px;
	z-index:35;
	border-radius:5px;

	@media screen and (max-width:800px){
		margin-left:1% !important;
		top:10% !important;
    	width:100% !important;
    	height:90% !important;
    	border-radius:5px !important;
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
	height:40%;
	z-index:35;
	left:20%;
	top:20%;
	border-radius:5px;
	background-color:white;
	border-radius:5px;
	padding:5px;
	box-shadow: 1px 1px 50px #d5d5d5;
	overflow-y:auto;

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
`;





