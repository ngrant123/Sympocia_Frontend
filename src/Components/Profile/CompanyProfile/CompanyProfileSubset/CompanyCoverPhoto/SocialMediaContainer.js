import React,{Component} from "react";
import styled from "styled-components";


const Container = styled.div`
	position:absolute;
	width:100%;
	height:100%;


`;

const FacebookContainer =styled.div`
	position:absolute;
	left:10%;
	width:14%;
	top:10%;
	height:15%;
	border-radius:50%;
	border-style:solid;
	border-width:1px;
	color:#d6d6d6;
	text-align:center;
	font-size:140%;
	transition: all ease 0.8s;

	 &:hover{

      background-color:white;

	   color:black;
	   border-style:solid;


   }


`;

const InstagramContainer = styled.div`
	position:absolute;
	left:30%;
	width:14%;
	top:10%;
	height:15%;
	border-radius:50%;
	border-style:solid;
	border-width:1px;
	color:#d6d6d6;
	text-align:center;
	font-size:140%;
	transition: all ease 0.8s;

	 &:hover{

      background-color:white;

	   color:black;
	   border-style:solid;


   }



`;

const TwitterContainer = styled.div`
	position:absolute;
	left:50%;
	width:14%;
	top:10%;
	height:15%;
	border-radius:50%;
	border-style:solid;
	border-width:1px;
	color:#d6d6d6;
	text-align:center;
	font-size:140%;
	transition: all ease 0.8s;

	 &:hover{

      background-color:white;

	   color:black;
	   border-style:solid;


   }

`;


class SocialMediaContainer extends Component{



	render(){

		return(

			<Container>
				<FacebookContainer>+</FacebookContainer>
				<InstagramContainer>+</InstagramContainer>
				<TwitterContainer>+</TwitterContainer>
			</Container>
		)
	}
}

export default SocialMediaContainer;