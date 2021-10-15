import styled from "styled-components";
import {Link} from "react-router-dom";

export const Container=styled.div`
	display:flex;
	top:5%;
	flex-direction:column;

	@media screen and (max-width:1370px){
		width:100%;
		margin-bottom:30% !important;
		flex-direction:column;

		#horizontalSeperator{
			display:block !important;
		}
		#headerLI{
			display:block !important;
			margin-top:10% !important;
			width:120% !important;
			margin-left:-5% !important;
		}
		#headerBlogInformation{
			width:110% !important;
			height:50px !important;
			overflow:scroll !important;
			display:block !important;
			margin-top:10% !important;
			margin-left:5% !important;
		}
		#smallBlogInformation{
			display:block !important;
			margin-top:80% !important;
			top:10px !important;
		}
		#smallPostLI{
			width:95% !important;
			margin-top:20% !important;
		}
		#smallTitleAndDescription{
			height:30px !important;
			width:300px !important;
			overflow:scroll !important;
		}
		#image{
			width:280px;
			height:230px;
			margin-right:2%;
		}
		#suggestedSymposiumLI{
			top:-15% !important;
			width:70% !important;
		}
		#postLI{
			margin-right:2% !important;
		}
		#headerBlogOwnerInformation{
			width:110% !important;
		}
		#headerBlogImage{
			width:240px !important;
			height:180px !important;
		}
	}

	@media screen and (max-width:650px){
		margin-left:-5% !important;
		#headerLI{
			margin-top:5% !important;
			width:80% !important;
		}
		#headerVideoDescriptionContainer{
			width:50px !important;
			height:20% !important;
		}
		#image{
			width:120px !important;
			height:90px !important;
			margin-right:2%;
		}
		#headerAudioLI{
			width:200px !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		#headerLI{
			margin-top:25% !important;
		}
		#headerVideoDescriptionContainer{
			width:55px !important;
			height:15% !important;
		}
    }
`;

export const HeaderBlog=styled.div`
	width:400px;
	height:55%;
	border-radius:5px;
	border-radius:5px;
`;



export const VideosContainer=styled.div`
	position:relative;
	width:280px;
	height:230px;
	border-radius:5px;
	background-color:red;
`;

export const ShadowContainer= styled.div`
	position:absolute;
	width:280px;
	height:230px;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;
	z-index:1;
	transition:.8s;
	border-radius:5px;

	&:hover{
		background-color:transparent
	}
	@media screen and (max-width:740px) and (max-height:420px){
    	display:none !important;
    }

	@media screen and (max-width:450px){
		display:none !important;
		position:relative;
	}
`;

export const ProfileImage=styled.div`
	position:relative;
	width:50px;
	height:50px;
	background-color:red;
	border-radius:50%;
`;

export const VideoDesriptionContainer=styled.div`
	position:relative;
	width:60px;
	height:60px;
	border-radius:50%;
	top:70%;
	left:2%;
	z-index:8;
`;

export const HeaderContainer=styled.div`	
	display:flex;
	flex-direction:column;
	width:40%;
	flex-wrap:wrap;
	cursor:pointer;
	@media screen and (max-width:1370px){
		width:90%;
		margin-top:5%;
		#headerBlogImage{
			height:550px !important;
			width:650px !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:1400px) {
    	#headerPostProfilePictureLIInformation{
			top:60% !important;
		}
    }

	@media screen and (max-width:650px){
		width:100%;
		margin-bottom:-5%;
		#headerAudioTag{
			margin-left:0% !important;
		}
		#headerBlogImage{
			height:200px !important;
			width:90% !important;
		}

		#headerSymposiumSubmitted{
			margin-top:2% !important;
			margin-bottom:2% !important;
			width:90% !important;
		}
	}
	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		#headerBlogImage{
			width:700px !important;
		}
    }

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	margin-top:45px !important;
    	#headerBlogImage{
    		height:400px !important;
			width:90% !important;
		}
    }
`;

export const PostUserAndSymposiumInformation=styled.div`
	display:flex;
	flex-direction:row;
	margin-bottom:2%;
	@media screen and (max-width:1370px){
		flex-direction:column;
	}

	@media screen and (max-width:600px){
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

export const HeaderBlogImageInformationContainer=styled.div`
	display:flex;
	flex-direction:column;
	margin-top:2%;

	@media screen and (max-width:650px){
		margin-top:2% !important;
	}
`;
export const PostsContainer=styled.div`
	display:flex;
	flex-direction:row; 
	width:70%;
	height:600px;
	margin-left:5%;
	overflow-y:scroll;
	flex-wrap: wrap;
	margin-bottom:5%;
	@media screen and (max-width:1370px){
		width:90%;
		overflow:visible !important;
	}
	@media screen and (max-width:1024px) and (max-height:1366px) {
    	height:100%;
    }

	@media screen and (max-width:600px){
		margin-left:-5% !important;
		width:100% !important;
		#smallAudioDescription{
			display:none !important;
		}
	}
`;

export const SmallPostContainer=styled.div`
	display:flex;
	flex-direction:row;
	width:95%;
	cursor:pointer;
	padding:10px;
	border-radius:10px;
	border-style:solid;
	border-width:2px;
	border-color:#EFEFEF;
	margin-bottom:2%;

	@media screen and (max-width:1370px){	
		margin-bottom:5%;
	}
	@media screen and (max-width:650px){
		width:100%;
		margin-top:15% !important;
		margin-bottom:5%;

		#smallImageAndOwnerContainer{
			margin-right:-30px !important;
		}
		#smallPostTitleAndDescription{
			width:50%;
		}
		#smallPostTitle{
			font-size:15px !important;
		}
		#smallPostDescription{

		}

		#smallImageContainer{
			height:100px !important;
		}
	}
`;

export const SmallPostDescriptionContainer=styled.div`
	display:flex;
	flex-direction:column;
	margin-left:5%;
	width:100%;
`;




