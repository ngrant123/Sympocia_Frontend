import React, {Component} from "react";
import styled from "styled-components";


const OptionsContainer = styled.div`
	position:absolute;
	height:100%;
	width:100%;
	font-size:10%;

`;

const TagPplContainer = styled.div`

	position:absolute;
	background-color:#5298F8;
	top:15%;
	width:20%;
	height:60%;
	border-radius:50%;
	left:10%;


`;

const ImageContainer = styled.div`

	position:absolute;
	background-color:#5298F8;
	top:15%;
	width:20%;
	height:60%;
	border-radius:50%;
	left:40%;



`;

const LocationContainer = styled.div`
	
	position:absolute;
	background-color:#5298F8;
	top:15%;
	width:20%;
	height:60%;
	border-radius:50%;
	left:70%;



`;



class Options extends Component{



	render(){

		return(


			<OptionsContainer>

				<TagPplContainer> </TagPplContainer>
				<ImageContainer></ImageContainer>
				<LocationContainer></LocationContainer>

			</OptionsContainer>

		)
	}
}


export default Options;
