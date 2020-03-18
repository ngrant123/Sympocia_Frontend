import React,{useState,useEffect,Component} from "react";
import styled from "styled-components";
import CommentsContainer from "../../../../GeneralComponents/CommentsComponent/index.js";
import PosterInformation from "./PosterInformation.js";
import PostContent from "./PostInformation.js";


const Container=styled.div`
	position:relative;
	width:50%;
	height:10%;
	background-color:white;
	z-index:3;
	border-radius:5px;
	padding:5px;

`;

const PostInformationContainer=styled.div`
	position:relative;
	height:90%;
	width:330px;
	background-color:white;
`;

const PostContentAndCommentsButtons=styled.div`
	position:relative;
	height:80%;
	width:800;
	background-color:blue;

`;


const CommentsContainerDiv=styled.div`
	position:absolute;
	width:35%;
	height:90%;
	top:0%;
	left:60%;
	background-color:blue;
	border-radius:5px;
	overflow-y:scroll;
	background-color:blue;
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





const RegularPostContainer=()=>{

	const [displayCommentsAndResponses,changeDisplayCommentsAndResponses]=useState(false);
	const DisplayCommentsAndResponses=()=>{

		if(displayCommentsAndResponses==true){
			const postContainer=document.getElementById("postContentContainer");

			return <CommentsContainerDiv>
						<CommentsContainer/>
				  </CommentsContainerDiv>
		}else{
			return <React.Fragment></React.Fragment>
		}
	}

	const DisplayCommentsState=()=>{
		changeDisplayCommentsAndResponses(true);
	}
	const HideComments=()=>{
		changeDisplayCommentsAndResponses(false);
	}

	return(
		<Container>
			<ul style={{padding:"0px"}}>
				<li style={{listStyle:"none",display:"inline-block",marginRight:"1%"}}>
					<PosterInformation/>

				</li>

				<li style={{listStyle:"none",display:"inline-block",marginRight:"1%"}}>
					<PostContent
						displayComments={DisplayCommentsState}	
						hideComments={HideComments}
					/>
				</li>
			</ul>

			{DisplayCommentsAndResponses()}




		</Container>


	)
}

export default RegularPostContainer;