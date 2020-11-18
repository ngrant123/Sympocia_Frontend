import React, { useState } from "react";
import styled from "styled-components";
import SmallRegularPost from "../SmallPostComponent/SmallRegularPost.js";
import SmallImagePost from "../SmallPostComponent/SmallImagePost.js";
import SmallMapPost from "../SmallPostComponent/SmallMapPost.js";


const RegularPostContainer=styled.div`

	position:relative;
	background-color:white;
	width:107%;
	height:170px;
	left:5%;
	border-radius:1px;
	box-shadow:0px 0px 5px 1px;

	overflow-y:scroll;
`;


const PostContainer = styled.div`
	
	position:absolute;
	height:100%;
	width:100%;

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

	position:absolute;
	left:65%;
	height:10%;
	width:13%;
	background-color:black;
	top:2%;

`;

const OptionsContainer = styled.div`

	position:absolute;
	left:85%;
	height:10%;
	width:13%;
	background-color:black;
	top:2%;
	

`;



export function MediumPosts(props){
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
	
	return <SmallRegularPost/>;

}

export function  RegularImageFunction(){
	return <SmallImagePost/>;
}
	

export function RegularMapFunction (){
	return <SmallMapPost />;
	
}
