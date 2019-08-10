import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`

	position:absolute;
	width:100%;
	height:100%;
	background-color:white;
	z-index:5;
	border-radius:5px;

`;

const SearchContainer = styled.div`

	position:absolute;
	left:12%;
	height:10%;
	width:80%;
	top:5%;
	border-radius:5px;
	border-style:solid;
	border-color:	#d4d9e1;
	border-width:2px;
	padding:5px;
`;

const SearchTextFieled = styled.textarea`

	position:absolute;
	width:80%;
	height:90%;
	background-color:blue;
	resize:none;
	padding:5px;


`;

const SearchButton = styled.div`

	position:absolute;
	background-color:red;
	left:85%;
	width:10%;
	height:80%;
	border-radius:5px;

`;

const SrollIndicatorButton = styled.div`

	position:absolute;
	left:25%;
	height:10%;
	width:50%;
	top:80%;
	border-radius:5px;
	border-style:solid;
	border-color:	#d4d9e1;
	border-width:2px;
	padding:5px;


`;

const MessagesContainer = styled.div`

	position:relative;	
	left:13%;
	top:20%;
	width:75%;
	height:70%;
	padding:20px;
	transition:.8s;
	border-radius:5px;

	&:hover{
		box-shadow: 1px 1px 1px 1px #999a9b;

	}

`;

const testerdata = [

	{
		tester:"data"


	},
	{

		tester:"data"


	}

]





class LargeChatComponent extends Component{



	render(){


		return(
			<Container>
				<SearchContainer>

					<SearchTextFieled>

					</SearchTextFieled>

					<SearchButton/>
				</SearchContainer>

				<MessagesContainer>
					<ul
				 	

				</MessagesContainer>

			</Container>

		)
	}
}

export default LargeChatComponent;