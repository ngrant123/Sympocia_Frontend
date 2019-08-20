import React, { Component } from "react";
import styled from "styled-components";


const Container = styled.div`

	position:relative;
	width:110%;
	height:80px;
	background-color:red;

`;

const MessageProfilePicture= styled.div`




`;


class BroadChatMessages extends Component {

	constructor(props){

		super(props);
		console.log(props);

		//TESTER
		this.state={
			user:props.usertest,
			expandMessageFunction:props.focusOnMessage

		}
	}

	testerDisplay =()=>{

		this.state.expandMessageFunction(this.state.user);
		console.log(this.state.user);

	}

	render(){

		return(
			<Container onClick={()=>this.testerDisplay()}>

				<p>{this.state.user}</p>

			</Container>

		)
	}
}

export default BroadChatMessages;