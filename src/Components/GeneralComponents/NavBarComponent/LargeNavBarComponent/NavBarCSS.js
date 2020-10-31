import styled from "styled-components";
import {Link} from "react-router-dom";

export const Container=styled.div`
	position:fixed;
	width:100%;
	height:14%;
	border-radius:0px 0px 5px 5px;
	z-index:10;
	background-color:white;

	@media screen and (max-width:960px) {
		#searchLIContainer{
			width:40% !important;
		}
	}
	@media screen and (max-width:620px) {
		#mobileRoutesButton{
			margin-left:10% !important;
		}
	}

	@media screen and (max-width:595){
		#searchLIContainer{
			margin-left:40% !important;
			margin-right:-30% !important;
		}

	}
	@media screen and (max-width:480px) {
		#mobileRoutesButton{
			margin-left:5% !important;
		}
	}


	@media screen and (max-width:400px) {
		#searchLIContainer{
			width:20% !important;
		}
	}

`;

export const SearchButton=styled.textarea`
	position:relative;
	height:30%;
	top:10px;
	width:60%;
	resize:none;
	border-radius:5px;
	border-style:none;
	text-align:center;
	z-index:6;
	margin-left:40%;

	border-style:solid;
	border-width:2px;
	border-color:#BDBDBD;

	@media screen and (max-width:960px) {
		margin-left:2%;
		width:80%;
		height:40%;
	}

	@media screen and (max-width:595px) {
		width:90%;
		height:50%;
	}

`;

export const PersonalProfileChatContainer=styled.div`
	position:relative;
	background-color:red;
	width:50%;
	height:60px;
	border-radius:5px;
	transition:.8s;

	&:hover{

		box-shadow: 5px 5px 10px 	#9395a0;
	}
`;


export const PersonalProfileNotificationsContainer=styled.div`

	position:relative;
	background-color:red;
	width:50%;
	height:60px;
	border-radius:5px;
	transition:.8s;

	&:hover{

		box-shadow: 5px 5px 10px 	#9395a0;
	}
`;

export const CompanyProfileChatContainer=styled.div`
	position:relative;
	background-color:red;
	width:50%;
	height:60px;
	border-radius:5px;
	transition:.8s;
	
	&:hover{

		box-shadow: 5px 5px 10px 	#9395a0;
	}
`;


export const CompanyProfileNotificationsContainer=styled.div`
	position:relative;
	background-color:red;
	width:50%;
	height:60px;
	border-radius:5px;
	transition:.8s;
	
	&:hover{
		box-shadow: 5px 5px 10px 	#9395a0;
	}

`;

export const NavBarButton=styled(Link)`
	position:absolute;
	background-color:#5298F8;
	padding:10px;
	color:white;
	border-radius:5px;

	@media screen and (max-width:960px) {
		margin-top:-25px;
	}

	&:hover{
		color:white;
		text-decoration:none;
	}
`;


export const CreateButton=styled.div`
	position:absolute;
	background-color:#C8B0F4;
	padding:10px;
	color:white;
	border-radius:5px;
	filter: blur(4px);
	
	@media screen and (max-width:960px) {
		margin-top:-25px;
	}

	&:hover{
			color:white;
			text-decoration:none;
		}
`;




export const BackgroundContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	z-index:7;
	background-color: rgba(0,0,0,0.4);
`;