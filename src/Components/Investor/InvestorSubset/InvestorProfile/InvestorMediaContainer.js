import React, {Component} from "react";
import styled from "styled-components";

const Container = styled.div`

	postion:absolute;
	width:100%;
	height:100%;



`;

const FacebookContainer = styled.div`
	position:absolute;
	left:10%;
	height:60%;
	top:10%;
	width:20%;
	background-color:black;
	border-radius:50%;




`;

const InstagramContainer = styled.div`

	position:absolute;
	left:35%;
	height:60%;
	top:10%;
	width:20%;
	background-color:black;
	border-radius:50%;

`;


const TwitterContainer = styled.div`
	position:absolute;
	left:60%;
	height:60%;
	top:10%;
	width:20%;
	background-color:black;
	border-radius:50%;

`;

class SmallInvestorMediaContainer extends Component{

	render(){


		return(

			<Container>
				<FacebookContainer/>
				<InstagramContainer/>
				<TwitterContainer/>


			</Container>


		);
	}

}

export default SmallInvestorMediaContainer;