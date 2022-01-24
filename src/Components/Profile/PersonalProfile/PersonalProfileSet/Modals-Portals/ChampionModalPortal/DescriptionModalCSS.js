import styled from "styled-components";


export const Container=styled.div`
	padding:10%;

	@media screen and (min-width:2500px){
		#backButton{
			font-size:24px !important;
		}
		#pictureLI{
	    	width:220px !important;
	    	height:220px !important;
		}
		#loadingText{
			font-size:24px !important;
		}
	}

	@media screen and (max-width:1370px){
		padding:20px;
		#pictureLI{
			width:110px !important;
			height:100px !important;
		}
	}

	@media screen and (max-width:550px){
		width:100% !important;
		#userPictureAndNameLI{
			width:90% !important;
		}
		#pictureLI{
			width:130px !important;
			height:130px !important;
		}
		#nameLI{
			width:90% !important;
		}
		#descriptionAndSubmitLI{
			margin-left:-5% !important;
			border-style:none !important;
			border-left:none !important;
		}

		#selectedChampionImageAndDate{
			flex-direction:column !important;
			margin-bottom:2% !important;
		}

		#mobileHorizontalDivider{
			display:block !important;
		}
	}


	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
		#pictureLI{
			width:110px !important;
			height:90px !important;
		}
    }


    @media screen and (max-width:740px) and (max-height:420px) and (orientation:landscape){
	 	#descriptionAndSubmitLI{
			margin-left:10% !important;
			border-style:none !important;
			border-left:none !important;
		}
		#pictureLI{
			width:110px !important;
			height:90px !important;
		}
    }
`;

export const ProfilePicture=styled.div`
	position:relative;
	width:115%;
	height:35%;
	border-radius:50%;
	background-color:red;
	border-style:solid;
	border-color:#5298F8;
	border-width:5px;
`;

export const NameTextArea=styled.textarea`
	padding:10px;
	border-radius:5px;
	resize:none;
	border-style:solid;
	border-color:#E5E5E5;
	width:90%;
	margin-bottom:2%;

	@media screen and (min-width:2500px){
		font-size:24px !important;
	}

	@media screen and (max-width:1370px){
		width:100%;
	}
`;

export const SympociaProfileSearchTextArea=styled.textarea`
	padding:10px;
	border-radius:5px;
	resize:none;
	border-style:solid;
	border-color:#E5E5E5;
	border-width:2px;
	width:90%;
	margin-bottom:2%;
	height:50px;

	@media screen and (min-width:2500px){
		font-size:24px !important;
	}

	@media screen and (max-width:1370px){
		width:100%;
	}
`;

export const DescriptionTextArea=styled.textarea`
	padding:10px;
	border-radius:5px;
	resize:none;
	border-style:solid;
	border-color:#E5E5E5;
	height:140px;
	width:90%;
	margin-bottom:2%;

	@media screen and (min-width:2500px){
		font-size:24px !important;
	}

	@media screen and (max-width:1370px){
		width:100%;
	}
`;

export const SubmitButton=styled.div`
	color:white;
	padding:10px;
	width:50%;
	background-color:#C8B0F4;
	border-radius:5px;
	cursor:pointer;

	@media screen and (min-width:2500px){
		font-size:36px !important;
	}

	@media screen and (max-width:1370px){
		width:20%;
		margin-top:2%;
		margin-bottom:10px;
	}

	@media screen and (max-width:550px){
		width:35%;
	}
`;

export const ShadowContainer= styled.div`
	position:fixed;
	width:40%;
	height:60%;
	background-color: rgba(0,0,0,0.4);
	top:95px;
	z-index:5;
`;

export const SocialMediaUrlContainer=styled.div`
	position:absolute;
	width:60%;
	height:30%;
	background-color:white;
	top:0px;
	z-index:6;
	border-radius:5px;
	top:20%;
	left:20%;
	padding:20px;
`;

export const InstagramUrlTextArea=styled.textarea`
	position:relative;
	width:300px;
	height:50px;
	resize:none;
	border-style:solid;
	border-color:#BDBDBD;
	border-radius:5px;
`;

export const SocialMediaSubmitButton=styled.div`
	position:relative;
	color:white;
	padding:10px;
	width:50%;
	height:30%;
	background-color:#5298F8;
	border-radius:5px;
	margin-top:10px;
`;


export const TikTokUrlTextArea=styled.textarea`
	position:relative;
	width:300px;
	height:50px;
	resize:none;
	border-style:solid;
	border-color:#BDBDBD;
	border-radius:5px;

`;

export const DescriptionContainer=styled.div`
	display:flex;
	flex-direction:column;
`;


