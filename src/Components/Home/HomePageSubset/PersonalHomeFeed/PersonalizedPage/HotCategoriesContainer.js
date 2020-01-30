import React,{Component,useState,useEffect} from "react";
import styled from "styled-components";

const Container=styled.div`
	margin-top:20px;
	position:relative;
	width:80%;
	height:40%;
	left:7%;
	background-color:white;
	border-radius:5px;
	box-shadow: 1px 1px 5px 5px #d5d5d5;
`;

const OptionsContainer=styled.div`
	position:relative;
	background-color:white;
	padding:10px;
	transition:.8s;
	border-radius:5px;
	box-shadow:1px 1px 1px 1px #d5d5d5;

	&:hover{
		background-color:#5298F8;
		color:white;
	}
`;


const HeaderOptionsCSS={
	listStyle:"none",
	display:"inline-block",
	fontSize:"15px",
	marginRight:"10px"
}

const HotCategoriesContainer=()=>{

	return(
		<Container>
			<ul style={{paddingTop:"10px"}}>
				<li style={HeaderOptionsCSS}>
					<OptionsContainer>Popular Videos</OptionsContainer>
				</li>

				<li style={HeaderOptionsCSS}>
					<OptionsContainer>Popular Communities</OptionsContainer>
				</li>
			</ul>

			<ul>
				<li>	
					Tester
				</li>
				<li>
					Tester

				</li>

			</ul>


		</Container>


	)
}


export default HotCategoriesContainer;