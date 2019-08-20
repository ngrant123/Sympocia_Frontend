import React,{ Component } from "react";
import styled from "styled-components";


const Container= styled.div`
	position:relative;
	width:90px;
	height:30px;
	margin-right:5px;
	top:5px;
	left:-30px;
	border-radius:5px;
	margin-right:10px;
	border-style:solid;
	border-width:2px;
	border-color:	#cbdff8;
	overflow-y:scroll;
	transition:.8s;


	&:hover{
		background-color:#cbdff8;


	}
`;

const ContainerProfilePicture = styled.div`
	position:absolute;
	left:10%;
	top:5%;
	width:30%;
	height:90%;
	background-color:red;
	border-radius:50%;
`;


const ContainerBeginningMessage = styled.div`

	position:absolute;
	left:50%;
	top:5%;
	width:30%;
	height:70%;


`;

class ChatDisplaySmallProfile extends Component{

	constructor(props){
		super(props);

		this.state={

		}
	}

	render(){
		return(
			<Container>
				<ContainerProfilePicture>
				</ContainerProfilePicture>

				<ContainerBeginningMessage>
					Tester one two three
				</ContainerBeginningMessage>


			</Container>
		)
	}
}

export default ChatDisplaySmallProfile;