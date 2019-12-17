import React from "react";
import styled from "styled-components";


const Container=styled.div`
	
	position:relative;
	width:160%;
	left:-75px;
	background-color:red;
	padding:10px;
	height:15%;
	border-radius:5px;

`;

const IndustryNameContainer=styled.div`
	position:relative;
	width:100%;
	background-color:red;
	height:100%;
	border-radius:5px;
	overflow-x:scroll;


`;



const IndustryContainer =()=>{

	return(
		<Container>
			<IndustryNameContainer>
				Fashion
			</IndustryNameContainer>
		</Container>
	)


}

export default IndustryContainer;