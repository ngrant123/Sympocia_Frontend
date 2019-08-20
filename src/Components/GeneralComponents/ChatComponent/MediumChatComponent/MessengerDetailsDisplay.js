import React, { Component } from "react";
import styled from "styled-components";

const MessengerProfileContainer = styled.div`

	position:absolute;
	left:5%;
	width:30%;
	height:70%;
	top:20%;
	transition:.8s;


	&:hover{
		box-shadow: 1px 1px 1px 1px #999a9b;

	}

`;

const MessengerProfilePicture = styled.div`

	position:relative;
	height:26%;
	width:40%;
	left:30%;
	top:12%;
	background-color:black;
	border-radius:50%;
	border-style:solid;
	border-width:3px;
	border-color:#af9ad5;
	padding:2px;

`;

const SectionDivider = styled.div`

	position:relative;
	height:1%;
	width:100%;
	top:30%;
	border-radius:5px;
	background-color:#c5d7ec;

`;

const MessengerName = styled.div`

	position:absolute;
	padding:5px;
	width:40%;
	height:10%;
	top:1%;
	left:30%;
	font-size:170%;
	color:#619df5;

`;

const MessengerCompany = styled.div`
	
	position:absolute;
	padding:5px;
	width:40%;
	height:8%;
	left:30%;
	top:38%;
	font-size:120%;
	color:#619df5;
	text-align:center;
`;

const MessengerReputationTitle = styled.div`

	position:absolute;
	padding:5px;
	width:40%;
	height:10%;
	top:40%;
	font-size:100%;
	left:50%;
	color:#619df5;

`;

const MessengerReputation = styled.div`

	position:absolute;
	width:40%;
	height:5%;
	top:65%;
	font-size:90%;
	left:55%;
	color:#5298F8;

`;

const MessengerBio = styled.div`

	position:absolute;
	width:50%;
	height:28%;
	top:67%;	
	font-size:100%;
	left:2%;
	font-size:70%;
	overflow:scroll;

`;

const MessengerTitle = styled.div`

	position:absolute;
	width:40%;
	height:5%;
	top:47%;
	font-size:90%;
	left:43%;
	color:#5298F8;

`;

const MessengerLocation = styled.div`
	position:absolute;
	width:40%;
	height:5%;
	top:72%;
	font-size:90%;
	left:55%;
	color:#5298F8;


`;

const MessengeActiveStatus = styled.div`
	position:absolute;
	width:40%;
	height:5%;
	top:79%;
	font-size:90%;
	left:55%;
	color:#5298F8;

`;

const MessengerContactGraphButton = styled.div`

	position:absolute;
	padding:5px;
	width:40%;
	height:10%;
	top:86%;
	font-size:95%;
	left:55%;
	border-radius:5px;
	border-style:solid;
	border-width:2px;
	border-color:#5298F8;
	text-align:center;
	color:#5298F8;
	transition:.8s;

	&:hover{
		background-color:#5298F8;
		color:white;

	}
`;

const MessengerPersonalInformationCaption = styled.div`
	position:absolute;
	width:60%;
	height:5%;
	top:58%;	
	left:2%;
	color:#95b7dc;
	font-size:100%;
`;


class MessengerDetailsDisplay extends Component {


	render(){

		return(
				<React.Fragment>
						<MessengerProfilePicture>
						</MessengerProfilePicture>

						<MessengerName>
							<b>Nathan</b>
						</MessengerName>

						<MessengerCompany>
							Razu
						</MessengerCompany>

						<MessengerTitle>
							CEO
						</MessengerTitle>

						<SectionDivider/>

						<MessengerPersonalInformationCaption>
							Personal Information
						</MessengerPersonalInformationCaption>

						<MessengerBio>
							TEster stuff inside bio 
							TEster stuff inside bio
							TEster stuff inside bio
							TEster stuff inside bio
							TEster stuff inside bio
							TEster stuff inside bio
							TEster stuff inside bio
							TEster stuff inside bio
							TEster stuff inside bio
							TEster stuff inside bio

						</MessengerBio>

						<MessengerReputation>
							Beginner
						</MessengerReputation>
						<MessengerLocation>
							New York,NY
						</MessengerLocation>

						<MessengeActiveStatus>
							Active Now
						</MessengeActiveStatus>

						<MessengerContactGraphButton>
							Connections
						</MessengerContactGraphButton>



				</React.Fragment>
	
		)
	}
}

export default MessengerDetailsDisplay;