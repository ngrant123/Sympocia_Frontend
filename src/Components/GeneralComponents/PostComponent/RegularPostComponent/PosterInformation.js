import React,{Component} from "react";
import styled from "styled-components";

const PostInformationContainer=styled.div`
	position:relative;
	height:90%;
	width:330px;
	background-color:white;
`;

const PostProfilePicture=styled.div`
	position:relative;
	width:130px;
	height:120px;
	border-radius:50%;
	background-color:red;
	left:45%;
	margin-top:10%;
	top:10%;
	border-style:solid;
	border-width:5px;
	border-color:#5298F8;

`;

const IndustryButton=styled.div`
	position:relative;
	background-color:#5298F8;
	left:30%;
	text-align:center;
	width:160px;
	padding:10px;
	color:white;
	border-style:solid;
	border-width:1px;
	border-color:#0857c2;
	border-radius:5px;
	transition:.8s;

	&:hover{
		background-color:#0857c2;
	}
`;

const NameContainer=styled.div`
	position:relative;
	left:30%;
	text-align:center;
	width:160px;
	padding:10px;
	color:black;
	transition:.8s;
	font-size:20px;

`;

const DateContainer=styled.div`
	position:relative;
	left:30%;
	text-align:center;
	width:160px;
	padding:10px;
	color:black;
	transition:.8s;
	font-size:15px;
`;


const SocialMedaIcon=styled.div`

`;




const PosterInformation=()=>{

	return{

		<PostInformationContainer>
						<ul style={{position:"absolute",listStyle:"none"}}>
							<li style={{listStyle:"none"}}>

								<PostProfilePicture>

								</PostProfilePicture>
							</li>

							<li style={{listStyle:"none"}}>

								<NameContainer>
									
									Nathan Grant
								</NameContainer>
							</li>

							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
										Testing 
									</li>

									<li style={{listStyle:"none",display:"inline-block"}}>
										Tesitng

									</li>


								</ul>

							</li>

							<li style={{listStyle:"none",left:"20%",marginBottom:"2%"}}>

								<IndustryButton>
									Engineering

								</IndustryButton>
							</li>


							<li style={{listStyle:"none",left:"20%"}}>

								<IndustryButton>
									Stamp

								</IndustryButton>
							</li>

							<li style={{listStyle:"none",left:"20%"}}>

								<DateContainer>
									Posted 2 days ago

								</DateContainer>
							</li>

						</ul>

					</PostInformationContainer>

	}
}

export default PosterInformation;