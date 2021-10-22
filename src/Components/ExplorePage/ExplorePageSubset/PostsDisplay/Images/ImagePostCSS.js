import styled from "styled-components";
import {Link} from "react-router-dom";

export const Container=styled.div`
	display:flex;
	top:5%;
	width:100%;
	flex-direction:row;
	flex-wrap:wrap;

	@media screen and (max-width:1370px){
		flex-direction:column;
		#headerImageLI{
			width:100% !important;
			height:500px !important;
		}
		#image{
			border-radius:5px !important;
		}
	}

	@media screen and (max-width:650px){
		flex-direction:column !important;
		top:-5%;
		#headerImageLI{
			width:100% !important;
			height:210px !important;
		}
		#headerAudioLI{
			display:none !important;

		}
		#smallPersonalInformation{
			display:none !important;
		}
		#descriptionLI{
			display:none !important;
		}
		#postLI{
			top:-80px;
			margin-bottom:20% !important;
		}

		#nextButton{
			width:25% !important;
		}
	}
`;

export const HeaderContainer=styled.div`
	display:flex;
	flex-direction:column;
	width:40%;
	margin-right:5%;

	@media screen and (max-width:1370px){
		width:90%;
		margin-top:5%;
		#headerPostProfilePictureLIInformation{
			top:70% !important;
		}
		#headerImageSympoosiumLI{
		}
	}

	@media screen and (max-width:1370px) and (max-height:1400px) {
    	#headerPostProfilePictureLIInformation{
			top:60% !important;
		}
    }

	@media screen and (max-width:650px){
		margin-top:5%;
		#headerImageDescription{
			display:none !important;
		}
		#headerPostProfilePictureLIInformation{
			top:0% !important;
		}
		#headerImageSympoosiumLI{
			display:none !important;
		}

		#videoDescriptionContainer{
			top:80% !important;
			left:0% !important;
			width:50px !important;
			height:20% !important;
		}
	}

    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		margin-top:45px !important;
    	#headerPostProfilePictureLIInformation{
			top:120% !important;
		}
    }

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	margin-top:45px !important;
    	#headerPostProfilePictureLIInformation{
			top:90% !important;
		}
		#headerImageLI{
			height:300px !important;
		}
		margin-bottom:10%;
    }
`;

export const PostsContainer=styled.div`
	display:flex;
	flex-direction:row; 
	width:100%;
	height:560px;
	flex-wrap: wrap;
	overflow-y:scroll;

	@media screen and (max-width:1370px){
		width:90%;
		overflow:visible !important;
	}
	@media screen and (max-width:1024px) and (max-height:1366px) {
    	height:100%;
    }

	@media screen and (max-width:650px){
		margin-left:0% !important;
		margin-top:2%;
		width:100% !important;
		margin-bottom:10% !important;
		#smallAudioDescription{
			display:none !important;
		}
	}
`;


export const ShadowContainer= styled.div`
	width:220px;
	height:200px;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;
	z-index:1;
	transition:.8s;
	border-radius:5px;

	&:hover{
		background-color:transparent
	}
	@media screen and (max-width:740px) and (max-height:420px){
    	width:120px !important;
    	height:120px !important;
    }

	@media screen and (max-width:450px){
		display:none !important;
		position:relative;
	}
`;


export const HeaderDescriptionContainer=styled.div`
	padding:10px;
	display:flex;
	flex-direction:column;
	height:20%;
	overflow:hidden;

	@media screen and (max-width:650px){
		height:70px;
		margin-bottom:50px !important; 
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	display:none !important;
    }
`;

export const SmallPostContainer=styled.div`
	margin-bottom:10%;
	width:208px;
	height:120px;
	cursor:pointer;
	margin-right:5%;

	@media screen and (max-width:1370px){
		margin-right:10%;
		width:40%;
		height:250px;

		${({isSymposiumPostUI})=>
			isSymposiumPostUI==true?
			`margin-bottom:80px;`:
			`margin-bottom:60px;`
		}
		#smallVideoDescriptionContainer{
			width:50px !important;
			height:40% !important;
		}
		#smallImageContainer{
			width:100% !important;
			height:220px !important;
		}
		#smallImageArrowDownCSS{
			margin-left:10% !important;
		}
		#smallPostCaption{
			visibility:visible !important;
		}
	}

	@media screen and (max-width:650px){
		height:120px;
		#smallImageArrowDownCSS{
			margin-left:-10% !important;
		}
		#smallImageContainer{
			width:100% !important;
			height:110px !important;
		}
		#videoDescriptionContainer{
			height:30px !important;
			width:30px !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		margin-bottom:200px;
    	#smallImageContainer{
			height:280px !important;
		}
    }


	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	#smallImageContainer{
			height:170px !important;
		}
    }
`;

export const DescriptionContainer=styled.div`
	display:flex;
	flex-direction:row;

`;

export const HeaderInformationContainer=styled.div`
	display:flex;
	flex-direction:column;
`;


export const SmallPostOwnerContainer=styled.div`
	position:absolute;
	display:flex;
	flex-direction:column;
	top:5%;
	left:75%;
`;


export const VideoDesriptionContainer=styled.div`
	width:60px;
	height:60px;
	border-radius:50%;
	top:70%;
	left:2%;
	z-index:8;
`;

export const PostUserAndSymposiumInformation=styled.div`
	display:flex;
	flex-direction:row;
	margin-bottom:5%;
	@media screen and (max-width:1370px){
		flex-direction:row;
		#postOwner{
			font-size:15px !important;
			margin-right:2% !important;
		}
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    		flex-direction:row;
		#postOwner{
			font-size:15px !important;
			margin-right:2% !important;
		}
    }
`;

export const PostUserInformation=styled.div`
	display:flex;
	flex-direction:row;
	padding:10px;
	margin-right:10%;

	@media screen and (max-width:1370px){
		margin-left:0% !important;
	}
`;

export const SuggestedSymposiumsContainer=styled.div`
	display:flex;
	flex-direction:column;
	width:90%;
	margin-left:2%;
	margin-right:2%;
`;




