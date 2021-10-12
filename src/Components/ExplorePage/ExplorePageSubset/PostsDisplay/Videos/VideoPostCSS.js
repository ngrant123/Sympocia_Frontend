import styled from "styled-components";
import {Link} from "react-router-dom";

export const Container=styled.div`
	display:flex;
	top:5%;
	flex-direction:row;

	@media screen and (max-width:1370px){
		width:100%;
		flex-direction:column;
		margin-left:-5% !important;

		#symposiumText{
			display:none !important;
		}
		#headerVideoLI{
			height:600px !important;
			width:750px !important;
		}
		#smallPostLI{
			width:95% !important;
			margin-left:-5% !important;
		}
		#horizontalSeperator{
			display:block !important;
		}
	}

	@media screen and (max-width:650px){
		#headerAudio{
			height:20px !important;
		}
		
		#headerVideoLI{
			height:200px !important;
			width:300px !important;
		}
	}
	@media screen and (max-width:450px){
		margin-left:-5% !important;
	}
`;

export const HeaderVideo=styled.div`
	width:120%;
	height:80%;
	border-radius:5px;
	background-color:red;
	border-radius:5px;
`;

export const VideosContainer=styled.div`
	position:relative;
	width:580px;
	height:290px;
	border-radius:5px;
	background-color:red;
`;

export const ShadowContainer= styled.div`
	position:absolute;
	width:580px;
	height:290px;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;
	z-index:1;
	transition:.8s;
	border-radius:5px;

	&:hover{
		background-color:transparent
	}
	@media screen and (max-width:1300px){
		width:330px !important;
			height:370px !important;
	}
	@media screen and (max-width:450px){
					width:230px !important;
			height:160px !important;
	}
`;



export const ProfilePictureLink=styled(Link)`
	position:relative;
	margin-bottom:1%;
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
	width:60%;
	flex-direction:column;

	@media screen and (max-width:1370px){
		margin-top:30px !important;
		margin-left:3%;
		width:90%;
		#headerPostProfilePictureLIInformation{
			top:60% !important;
		}
		#videoDescriptionContainer{
			top:25% !important;
			left:0% !important;
		}
	}


	@media screen and (max-width:650px){
		margin-left:0%;
		#headerPostProfilePictureLIInformation{
			top:-30% !important;
		}
		#videoDescriptionContainer{
			height:25% !important;
			width:50px !important;
		}
	}


	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	margin-top:60px !important;
    	#headerPostProfilePictureLIInformation{
			top:160% !important;
		}
		#headerVideoLI{
			height:400px !important;
			width:500px !important;
		}
		#videoDescriptionContainer{
			top:20% !important;
			width:60px !important;
			height:15% !important;
		}
		#headerVideoContainer{
			position:relative !important;
		}
    }
`;

export const HeaderDescriptionContainer=styled.div`
	display:flex;
	flex-direction:column;
	margin-top:1%;

	@media screen and (max-width:650px){
		#headerDescriptionParagraph{
			max-width:100% !important;
		}
		#heaerCaptionParagraph{
			width:100% !important;
		}
	}
`;

export const HeaderTextsContainer=styled.div`
	display:flex;
	flex-direction:column;
	margin-left:2%;
`;

export const SmallPostContainer=styled.div`
	display:flex;
	flex-direction:row; 
	width:80%;
	height:600px;
	margin-left:5%;
	overflow-y:scroll;
	flex-wrap:wrap;



	@media screen and (max-width:1370px){
		overflow:visible !important;
		width:100%;
		flex-direction:column;
		flex-wrap:nowrap;

		#video{
			width:100% !important;
			height:150px !important;
		}
	}

	@media screen and (max-width:650px){
		margin-top:10%;
		margin-left:0%;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	#video{
			width:450px !important;
		}
    }

`;

export const HeaderOwnerInformation=styled.div`
	display:flex;
	flex-direction:row;

	@media screen and (max-width:1370px){
		#ownerInformationDiv{
			width:100% !important;
		}
	}
	@media screen and (max-width:650px){
		flex-direction:column;
		#headerOwnerName{
			font-size:15px !important;
			max-width:90% !important;
		}
	}
`;

export const DescriptionContainer=styled.div`
	display:flex;
	flex-direction:row;
	width:100%;
`;

export const PostContainer=styled.div`
	margin-bottom:8%;
	width:35%;
	margin-right:15%;

	@media screen and (max-width:1370px){
		margin-right:8%;
		width:90%;
		#smallVideoDescriptionContainer{
			margin-left:5%;
		}
	}

	@media screen and (max-width:650px){
		#smallVideoDescriptionContainer{
			width:100px !important;
			height:40% !important;
			margin-left:5%;
			top:25% !important;
			left:0% !important;
		}
	}
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
