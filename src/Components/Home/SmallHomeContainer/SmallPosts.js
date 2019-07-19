import React, { useState } from "react";
import styled from "styled-components";

const RegularPostContainer=styled.div`

	position:relative;
	background-color:white;
	width:107%;
	height:170px;
	left:5%;
	border-radius:1px;
	box-shadow:0px 0px 5px 1px;

`;

const RegularPostProfilePicture = styled.div`

	position:absolute;
	height:45%;
	width:15%;
	top:19%;
	left:3%;
	background-color:black;
	border-radius:50%;
	border-style:solid;
	border-width:2px;
	border-color:#C8B0F4;

`;

const RegularPostReputationContainer = styled.div`
	
	position:absolute;
	left:3%;
	height:15%;
	width:15%;
	top:2%;
	background-color:#C8B0F4;
	border-radius:5px;
	text-align:center;
	color:white;
	font-size:110%;

`;

const RegularPostReputationTitle = styled.div`

	position:absolute;


`;

const RegularPostTitleContainer = styled.div`

	position:absolute;
	left:5%;
	height:15%;
	width:11%;
	top:63%;
	text-align:center;
	font-size:110%;
	color:#C8B0F4;

`;

const RegularPostCompanyContainer = styled.div`

	position:absolute;
	left:1%;
	height:13%;
	width:20%;
	top:73%;
	text-align:center;
	font-size:140%;
	color:#C8B0F4;

`;

const RegularPostIndustryContainer = styled.div`

	position:absolute;
	left:30%;
	height:20%;
	width:30%;
	background-color:#5298F8;
	top:2%;
	border-radius:5px;
	font-size:150%;
	border-style:solid;
	border-width:1px;
	border-color:#0649a4;
	color:white;
	text-align:center;

`;



const RegularPostContentContainer = styled.div`

	position:absolute;
	left:30%;
	height:50%;
	width:60%;
	font-size:120%;
	top:25%;
	overflow-y:scroll;
	color:#555555;

`;


const RegularPostCommentContainer = styled.div`

	position:absolute;
	left:30%;
	height:20%;
	width:40%;
	background-color:#c8ddf8;
	top:75%;
	border-radius:10px;

`;


const RegularPostCommentImageContainer = styled.div`
	
	position:absolute;
	height:80%;
	width:15%;
	top:15%;
	background-color:black;
	border-radius:50%;
	left:5%;


`;


const RegularPostLikesContainer = styled.div`

	position:absolute;
	left:72%;
	height:15%;
	width:11%;
	background-color:black;
	top:80%;

`;

const RegularPostCommentsNumberContainer = styled.div`

	position:absolute;
	left:85%;
	height:15%;
	width:11%;
	background-color:black;
	top:80%;


`;

const ImagePostContainer=styled.div`

	position:relative;
	background-color:white;
	width:107%;
	height:300px;
	left:5%;
	border-radius:5px;
	box-shadow:0px 0px 1px 1px;

`;
const MapPostContainer=styled.div`

	
	position:relative;
	background-color:white;
	width:107%;
	height:300px;
	left:5%;
	border-radius:5px;
	box-shadow:0px 0px 1px 1px;

`;

const PostPrivacyContainer = styled.div`

	
	

`;

const OptionsContainer = styled.div`

	position:absolute;
	left:85%;
	height:10%;
	width:13%;
	background-color:black;
	top:2%;
	

`;


export function Tester(props){
	console.log(props);
	var postresult="";
	if(props.postdata=="regularpost"){
		postresult=RegularPostFunction();
	}
	else if(props.postdata=="image"){
		postresult=RegularImageFunction();
	}
	else{
		postresult=RegularMapFunction();

	}
	return postresult;
}

export function RegularPostFunction(){

	const [employyeInfo,setEmployeeInfo]=useState({

				title:"CEO",
				reputation:"Beginner",
				companyName:"Google",
				companyIndustry:"Engineering",
				imgSrc:""

			});

	const [comments,getComments]=useState([
			{
				name:"Nathan",
				comment:"Hey there 1"

			},
			{

				name:"Jabari",
				comment:"Hey there 2"

			},
			{

				name:"Denis",
				comment:"Hey there 3"

			}

		]);

	const [containerHeight,setHeight] = useState(170);

	
	return <RegularPostContainer id="RegularPostContainer">

				<RegularPostProfilePicture>

					<img id="EmployeeImageContainer" src=""/>

				</RegularPostProfilePicture>

				<RegularPostReputationContainer>

					{employyeInfo.reputation}

				</RegularPostReputationContainer>

				<RegularPostTitleContainer>
					<b>{employyeInfo.title}</b>

				</RegularPostTitleContainer>

				<RegularPostCompanyContainer>

					<b>{employyeInfo.companyName}</b>

				</RegularPostCompanyContainer>

				<RegularPostIndustryContainer>

					{employyeInfo.companyIndustry}

				</RegularPostIndustryContainer>

				<RegularPostContentContainer>
					This is just a test post to see how stuff looks 
				</RegularPostContentContainer>

				<RegularPostCommentContainer onClick={handleCommentSectionClick({containerHeight})}>

					<RegularPostCommentImageContainer>
					</RegularPostCommentImageContainer>

					<p style={{position:"absolute",left:"25%",top:"10%",color:"#1e6ecd"}}> Click here to comment... </p>

				</RegularPostCommentContainer>
				<RegularPostLikesContainer></RegularPostLikesContainer>
				<RegularPostCommentsNumberContainer></RegularPostCommentsNumberContainer>

				<OptionsContainer></OptionsContainer>
				
		   </RegularPostContainer>;

}

 const handleCommentSectionClick=(props)=>{
	var regularContainer=document.getElementById("RegularPostContainer");
	console.log("Button is clicked");

	if(props==170){
		console.log(props);
	}




}

export function  RegularImageFunction(){
	return <ImagePostContainer>
				
		   </ImagePostContainer>;
}
	

export function RegularMapFunction (){
	return <MapPostContainer>
				
		   </MapPostContainer>;
	
}
