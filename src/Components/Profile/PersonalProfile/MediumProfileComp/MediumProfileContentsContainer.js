import React, { Component } from "react";
import styled from "styled-components";
import PostCreationComponent from "../../../GeneralComponents/PostComponent/LargePostComponent/LargePostComponent.js";

const ImageOrVideosContainer=styled.div`
	
	position:absolute;
	background-color:#fbfdff;
	width:90%;
	left:5%;
	top:2%;
	height:30%;
	border-radius:5px;
	box-shadow: 2px 2px 2px 2px #acbed9;
	transition:.8s;

	&:hover{
		box-shadow: 5px 5px 5px 5px #acbed9;

	}

`;

const PostCreationContainer=styled.div`
	position:absolute;
	background-color:blue;
	height:65%;
	top:35%;
	left:1%;
	width:68%;
`;

const BlogsContainer=styled.div`
	position:absolute;
	background-color:black;
	left:73%;
	height:60%;
	width:25%;
	top:35%;

`;



class MediumProfileContentsContainer extends Component{


	constructor(props){

		super(props);
		this.state={

		}
	}



	render(){

		return(
			<React.Fragment>

				<ImageOrVideosContainer>

				</ImageOrVideosContainer>

				<PostCreationContainer>
					<PostCreationComponent/>
				

				</PostCreationContainer>

				<BlogsContainer>

				</BlogsContainer>

			</React.Fragment>
		)
	}
}

export default MediumProfileContentsContainer;
