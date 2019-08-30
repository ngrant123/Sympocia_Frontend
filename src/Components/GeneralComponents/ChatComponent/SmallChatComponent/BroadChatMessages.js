import React, { Component } from "react";
import styled from "styled-components";


const Container = styled.div`

	position:relative;
	width:110%;
	height:70px;
	border-radius:5px;
	border-style:solid;
	border-width:2px;
	border-color:	#cbdff8;

`;

const MessageProfilePicture= styled.div`

	position:absolute;
	width:20%;
	height:75%;
	left:5%;
	top:10%;
	background-color:red;
	border-radius:50%;
	border-style:solid;
	border-width:2px;
	border-color:#5298F8;


`;

const MessageContainer = styled.div`

	position:absolute;
	width:45%;
	height:50%;
	left:30%;
	top:50%;
	overflow-x:scroll;
	font-size:95%;
	color:	#a3a9b0;

`;

const NameContainer = styled.div`

	position:absolute;
	width:35%;
	height:50%;
	left:30%;
	top:0%;
	overflow-x:scroll;
	font-size:160%;
	color:	#5e6266;

`;

const TimeContianer = styled.div`

	position:absolute;
	left:68%;
	height:30%;
	width:30%;
	padding:5px;
	font-size:70%;


`;

const AmountOfMessagesContainer = styled.div`

	position:absolute;
	background-color:#5298F8;
	left:80%;
	height:40%;
	width:12%;
	padding:3px;
	font-size:120%;
	top:45%;
	border-radius:50%;
	text-align:center;
	color:white;


`;


class BroadChatMessages extends Component {

	constructor(props){

		super(props);
		console.log(props);

		//TESTER
		this.state={
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

				<MessageProfilePicture></MessageProfilePicture>
				<NameContainer>
					<b>Nathan</b>
				</NameContainer>

				<MessageContainer>
					Tester Message
				</MessageContainer>

				<TimeContianer>
					Recieved 5 hrs ago
				</TimeContianer>

				<AmountOfMessagesContainer>
					4
				</AmountOfMessagesContainer>


			</Container>

		)
	}
}

export default BroadChatMessages;