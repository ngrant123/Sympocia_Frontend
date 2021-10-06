import styled from "styled-components";
import {Link} from "react-router-dom";




export const SearchTextArea=styled.textarea`
	position:relative;
	resize:none;
	width:500px;
	height:90%;
	padding-top:10px;
	border-style:none;
	background-color:#EEEEEE;

	border: none;
    overflow: auto;
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none; /*remove the resize handle on the bottom right*/

`;

export const SearchContainer=styled.div`
	position:relative;
	width:60%;
	height:50px;
	display:flex;
	flex-direction:row;
	border-radius:5px;
	padding:5px;
	margin-right:2%;
	background-color:#EEEEEE;


	@media screen and (max-width:1370px){
    	width:400px;
    	display:none !important;
    	margin-left:2% !important;
    }

    @media screen and (max-width:730px){
    	margin-left:-140% !important;
    	width:720px;
    	display:none !important;
    }

    @media screen and (max-width:730px) and (max-height:420px){
    	height:35% !important;
    }

    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	margin-left:0% !important;
    }

    @media screen  and (max-width:730px) and (max-height:420px) 
	  and (orientation: landscape) 
	  and (-webkit-min-device-pixel-ratio: 1){
    	margin-left:-100% !important;
    }


    @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		display:none !important;
	}
`;

export const Container=styled.div`
	position:fixed;
	width:100%;
	height:10%;
	border-bottom:1px solid #F8F8F8;
	background-color:white;

	
	z-index:40;

	@media screen and (max-width:1370px) {
		margin-left:-2%;
		width:105%;
		height:7%;
		#ULContainer{
			background-color:white !important;
		}
		#mobileRoutesButton{
			margin-left:5% !important;
		}
		#searchLIContainer{
			margin-left:-250% !important;
			with:110% !important;
		}
	}

	@media screen and (max-width:960px) {
		#mobileRoutesButton{
			margin-left:10% !important;
		}
		#searchLIContainer{
			
			width:30px !important;
		}
	}

	@media screen and (max-width:650px) {
		width:105%;
		height:12%;
		margin-left:-3%;
		#mobileRoutesButton{
			margin-left:2% !important;
		}
		#searchLIContainer{
			margin-left:-150% !important;
		}
	}
	@media screen and (max-width:1370px) and (max-height:800px) and (orientation: landscape) {
		height:9%;
    }
	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		height:21%;
    	#searchLIContainer{
    		margin-left:-90px !important;
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
		height:90%;
	}

	@media screen and (max-width:595px) {
		width:90%;
		height:50%;
	}

`;

export const PersonalProfileChatContainer=styled.div`
	position:relative;
	background-color:white;
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
	background-color:white;
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
	background-color:white;
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
	background-color:white;
	width:50%;
	height:60px;
	border-radius:5px;
	transition:.8s;
	
	&:hover{
		box-shadow: 5px 5px 10px 	#9395a0;
	}

`;

export const NavBarButton=styled(Link)`
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
	background-color:#C8B0F4;
	padding:10px;
	color:white;
	border-radius:5px;
	filter: blur(4px);
	margin-right:5%;
	margin-left:5%;
	
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
	width:130%;
	height:1000%;
	margin-left:-5%;
	background-color: rgba(0,0,0,0.4);
	border-radius:5px;
	box-shadow: 1px 1px 10px #d5d5d5;
	z-index:30;
`;






