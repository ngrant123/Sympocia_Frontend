import React,{ Component } from "react";
import styled from "styled-components";

const ImageContainer = styled.div`
	
	position:relative;
	left:-30px;
	top:5%;
	height:45px;
	width:50px;
	background-color:red;
	border-radius:5px;
	margin-right:10px;

`;

class Images extends Component{

	constructor(props){
		console.log(props.tester);
		super(props);

		this.state={
			imagetester:props.tester
		}
	}

	render(){

		return(

			<React.Fragment>

				<ImageContainer>
				</ImageContainer>

			</React.Fragment>
		)
	}
}

export default Images;