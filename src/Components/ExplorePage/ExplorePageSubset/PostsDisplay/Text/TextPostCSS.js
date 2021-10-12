import styled from "styled-components";
import {Link} from "react-router-dom";

export const Container=styled.div`	
	display:flex;
	top:5%;
	flex-direction:row;
	flex-wrap:wrap;
	overflow-y:scroll;
	width:100%;
	height:600px;
	@media screen and (max-width:1370px){
		flex-direction:column;
		overflow:visible;
		flex-wrap:nowrap;
	}
	@media screen and (max-width:650px){
		margin-left:-10%;
		padding-bottom:10px;
		margin-top:5%;
		#headerImageLI{
			width:220px !important;
			height:180px !important;
		}
		#headerAudioLI{
			width:200px !important;
		}
		#image{
			width:100px !important;
			height:100px !important;
			margin-bottom:10%;
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
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	top:10px;
    	margin-top:0%;
    }
`;


export const PostsContainer=styled.div`
	display:flex;
	flex-direction:column;
	height:350px;
	flex-shrink: 0;

	width:30%;
	background-color:red;
	cursor:pointer;
	overflow:hidden;
	border-radius:5px;
	background-color:white;
	margin-right:2%;
	margin-bottom:2%;
	@media screen and (max-width:1370px){
		width:90%;
		margin-top:5%;
	}

	@media screen and (max-width:650px){
		width:100%;
		height:200px;
		margin-bottom:5%;
		#headerOwnerNameLI{
			max-width:100% !important;
			margin-left:20% !important;
		}
		#headerPostTextOrAudioContainerLI{
			top:20px !important;
			width:100% !important;
		}
		#audio{
			width:190px;
		}
	}
	@media screen and (max-width:740px) and (max-height:420px) and (orientation: landscape) {
    	margin-top:45px !important;
    }
`;


export const Post=styled.div`
	display:flex;
	flex-direction:column;
	cursor:pointer;
`;

export const ProfileHeaderImage=styled.div`
	position:relative;
	width:20%;
	height:20%;
	border-radius:5px;
	background-color:red;
	border-radius:50%;
`;

export const ImagesContainer=styled.div`
	position:relative;
	width:320px;
	height:230px;
	border-radius:5px;
	background-color:red;
`;

export const ProfilePicture=styled.div`
	position:relative;
	width:50px;
	height:50px;
	background-color:red;
	border-radius:50%;
`;


export const ProfilePictureLink=styled(Link)`
	position:relative;
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



