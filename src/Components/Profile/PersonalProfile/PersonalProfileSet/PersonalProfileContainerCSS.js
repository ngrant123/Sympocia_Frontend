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
			left:10px !important;
			margin-left:0px !important;
			z-index:22;
		}
    }

    @media screen and (max-width:1060px){
		#recommendedPostsLI{
			display:block !important;
		}
    }


    @media screen and (max-width:650px){
		#postSelectionAndRecruitDiv{
			margin-top:-10% !important;
		}
		#mobilePhonePostOption{
			margin-left:20% !important;
		}
    	#postCollectionContainer{
    		margin-left:2% !important;
    	}
    	#postsContainer{
			margin-left:-80% !important;
			margin-top:180% !important;
		}
		#friendsGaugeContainer{
			margin-left: -60% !important;
    		padding-right: 10%;
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

    @media screen and (min-width:490px) and (max-width:510px) 
	    and (min-height:1100px) and (max-height:1120px){
	    #postSelectionAndRecruitDiv{
			margin-left:60px !important;
		}
	}

	@media screen and (min-width:630px) and (max-width:670px) 
	    and (min-height:1350px) and (max-height:1370px){
	    #postSelectionAndRecruitDiv{
			margin-left:140px !important;
		}
	}

    @media screen and (max-width:1370px) and (max-height:600px) and (orientation: landscape) {
		#postsContainer{
			margin-top:0% !important;
		}
    }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	#postsContainer{
			margin-top:10% !important;
			margin-left:-60% !important;
		}
		#createPostIcon{
			display:none !important;
		}
    }


    @media screen and (max-width:650px) and (max-height:420px) and (orientation:landscape){
    	#postsContainer{
			margin-top:120% !important;
		}
    }

`;

export const MobilePersonalInformationContainer=styled.div`
	position:fixed;
	background-color:white;
	width:60%;
	height:60%;
	border-radius:5px; 
	padding:20px;
	z-index:40;
	left:20%;
	top:20%;
	overflow-y:scroll;

	@media screen and (max-width:1370px){
		padding:30px;
		width: 90% !important;
	    left: 5% !important;
	    height: 70%;
	    top: 15%;
		#profileSocialMediaContainer{
			display:none !important;
		}
		#mobileDivider{
			display:block !important;
		}
	}
	@media screen and (max-width:650px){
		width:90% !important;
		left:5% !important;
		height:75% !important;
		top:10% !important;
    }
    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	width: 90% !important;
	    left: 5% !important;
	    height: 70%;
	    top: 15%;
    }
`;

export const MobileShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	top:0%;
	background-color: rgba(0,0,0,0.7); /* Black w/ opacity */
	display:block;
	z-index:40;

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
	display:flex;
	flex-direction:column;

	@media screen and (max-width:1370px){
		position:relative;
		height:30%;
	}

	@media screen and (max-width:650px){
		flex-direction: column-reverse;
		position:absolute;
		margin-left:2% !important;
		height:150px !important;
		width:90%;
	}
	@media screen and (max-width:1370px) and (max-height:600px) and (orientation: landscape) {
		height:30% !important;
		margin-top:5% !important;
    	
    }

	@media screen and (max-width:650px) and (max-height:420px) and (orientation:landscape){
		top:0%;
		margin-top:0% !important;
		height:90% !important;
    }
`;

export const PersonalProfileInformationContainer= styled.div`
	position:relative;
	width:90%;
	left:3%;
	background-color:#fbfdff;
	border-radius:5px;
	transition:.8s;
	padding:10px;

	&:hover{
		box-shadow: 5px 5px 5px 5px #d5d5d5;
	}

	@media screen and (min-width:2500px){
		top:5%;
	}

	@media screen and (max-width:1370px){
		top:0%;
		html.touch *:hover {
		    all:unset!important;
		}
		#mobileUserInformation{
			margin-left:20% !important;
			flex-direction:column !important;
		}
	}

	@media screen and (max-width:650px){
		top:-20% !important;
		#mobileUserInformation{
			margin-left:2% !important;
			flex-direction:row !important;
		}
	}

	@media screen and (min-width:600px) and (max-width:700px) 
		and (min-height:1000px) and (max-height:1370px){
		top:0% !important;
	}

	  @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	top:40px !important;
   	}

   	@media screen and (max-width:570px) and (max-height:340px) and (orientation:landscape){
    	top:-40% !important;
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

	@media screen and (max-width:1370px){
		#friendsGaugeContainer{
			margin-left:5%;
		}
	}

	@media screen and (max-width:650px){
		top:35% !important;
	}
	@media screen and (max-width:670px) and (max-height:340px){
	 	top:40% !important;
    }
	@media screen and (max-width:736px) and (max-height:320px){
	 	top:35% !important;
    }
 
 	@media screen and (max-width:1370px) and (max-height:600px) and (orientation: landscape) {
		top:20%;
    }

    @media screen and (max-width:650px){
    	top:25%;
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
	top:0%;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;
	z-index:35;

`;

export const ImagePopupContainer=styled.div`
	position:absolute;
	margin-left:20%;
	margin-top:5%;
	position:fixed;
	width:70%;
	height:70%;
	background-color:white;
	padding:20px;
	z-index:35;
	border-radius:5px;
	overflow-y:scroll;

	@media screen and (max-width:1370px){
		margin-left:1% !important;
    	width:100% !important;
    	height:85% !important;
    	border-radius:5px !important;
    }

    @media screen and (max-width:650px){
    	margin-top:0% !important;
    	height:100% !important;
    	top:0% !important;
    }

     @media screen and (max-width:740px) and (max-height:420px) and (orientation:landscape){
		width:95% !important;
    	height:80% !important;
    }

   	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	margin-top:0%;
    }
`;

export const PostPopupContainer=styled.div`
	position:absolute;
	margin-left:20%;
	margin-top:5%;
	position:fixed;
	width:70%;
	height:70%;
	background-color:white;
	padding:20px;
	z-index:35;
	border-radius:5px;
	overflow-y:scroll;

	@media screen and (max-width:1370px){
		margin-left:1% !important;
    	width:100% !important;
    	height:85% !important;
    	border-radius:5px !important;
    }
     @media screen and (max-width:740px) and (max-height:420px) and (orientation:landscape){
		width:95% !important;
    	height:80% !important;
    }

   	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	margin-top:0%;
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

  	@media screen and (min-width:2500px){
  		width:120px;
		height:120px;
		#postCreationIcon{
			font-size:50px !important;
			margin-left:15%; 
			margin-top:15%;
		}
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

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
			height:70% !important;
    }
`;





