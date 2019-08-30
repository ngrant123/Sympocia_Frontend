import React,{ Component } from "react";
import styled from "styled-components";

const Container = styled.div`
	position:relative;
	left:-30px;
	top:5%;
	height:45px;
	width:110%;
	background-color:black;
	border-radius:5px;
	margin-bottom:10px;
`;


class Attachments extends Component{

	constructor(props){
		super(props);

		this.state={

		}
	}

	render(){
		return(
			<Container>
			</Container>



		)
	}
}

export default Attachments;