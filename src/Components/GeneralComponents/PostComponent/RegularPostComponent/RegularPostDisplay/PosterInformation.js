import React,{Component} from "react";
import styled from "styled-components";

const PostInformationContainer=styled.div`
	position:relative;
	height:90%;
	width:330px;
`;

const PostProfilePicture=styled.div`
	position:relative;
	width:110px;
	height:100px;
	border-radius:50%;
	background-color:red;
	left:40%;
	margin-top:10%;
	top:10%;
	border-style:solid;
	border-width:5px;
	border-color:#5298F8;

`;

const IndustryButton=styled.div`
	position:relative;
	background-color:#5298F8;
	left:25%;
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
	position:relative;
	width:40px;
	height:40px;
	background-color:blue;
	border-radius:50%;

`;
const CommentsAndLikeButtonsContainer=styled.div`
	position:relative;
	background-color:white;
	text-align:center;
	width:60px;
	padding:10px;
	color:#5298F8;
	border-style:solid;
	border-width:1px;
	border-color:#0857c2;
	border-radius:5px;
	transition:.8s;

	&:hover{
		background-color:#0857c2;
	}
`;




const PosterInformation=()=>{

	return(

		<PostInformationContainer>
						<ul style={{position:"absolute",listStyle:"none"}}>
							<li style={{listStyle:"none"}}>

								<PostProfilePicture>

								</PostProfilePicture>
							</li>

							<li style={{listStyle:"none"}}>

								<NameContainer>
									
									Nathan
								</NameContainer>
							</li>

							<li style={{listStyle:"none",marginBottom:"10%"}}>
								<ul style={{position:"relative",padding:"0px",left:"20%"}}>
									<li style={{listStyle:"none",display:"inline-block",marginLeft:"20%"}}>
										<SocialMedaIcon/> 
									</li>

									<li style={{listStyle:"none",display:"inline-block",marginLeft:"20%"}}>
										<SocialMedaIcon/>
									</li>
								</ul>

							</li>

							<li style={{listStyle:"none",left:"15%",marginBottom:"2%"}}>

								<IndustryButton>
									Engineering

								</IndustryButton>
							</li>

							<li style={{listStyle:"none",left:"20%"}}>

								<DateContainer>
									Posted 2 days ago

								</DateContainer>
							</li>

							<li style={{listStyle:"none",position:"relative",left:"25%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",marginRight:"20%"}}>
										<CommentsAndLikeButtonsContainer>
											Stamp
										</CommentsAndLikeButtonsContainer>	
									</li>

									<li style={{listStyle:"none",display:"inline-block"}}>
										<CommentsAndLikeButtonsContainer>
											Dislike
										</CommentsAndLikeButtonsContainer>	
									</li>
								</ul>

							</li>


						</ul>

					</PostInformationContainer>

	)
}

export default PosterInformation;