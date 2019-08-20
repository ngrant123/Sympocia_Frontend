import React , { Component } from "react";
import styled from "styled-components";
import MessengerDetailsDisplay from "./MessengerDetailsDisplay.js";
import ImageDisplay from "./ImageDisplay.js";
import AttachmentDisplay from "./AttachmentsDisplay.js";
import ChatDisplay from "./ChatDisplay.js";



const BackDetailedMessageContainerButton = styled.div`
	
	position:absolute;
	height:10%;
	width:20%;
	left:5%;
	border-radius:5px;
	top:5%;
	background-color:#5298F8;
	color:white;
`;

const MessengerProfileContainer = styled.div`

	position:absolute;
	left:5%;
	width:25%;
	height:75%;
	top:20%;
	transition:.8s;
	border-radius:5px;

	&:hover{
		box-shadow: 1px 1px 1px 1px #999a9b;

	}

`;

const ChatContainer = styled.div`

	position:absolute;
	left:32%;
	width:45%;
	height:90%;
	top:5%;

`;

const ImageContainer = styled.div`

	position:absolute;
	left:78%;
	width:21%;
	height:45%;
	top:5%;
	overflow-y:scroll;

`;

const AttachmentContainer = styled.div`


	position:absolute;
	left:78%;
	width:21%;
	height:40%;
	top:55%;
	overflow-y:scroll;


`;

class ExpandedChatDisplay extends Component{


	render(){

		return(	
				<React.Fragment>

					<BackDetailedMessageContainerButton onClick={()=>this.handleBackButton()}>
					</BackDetailedMessageContainerButton>

					<MessengerProfileContainer>
						<MessengerDetailsDisplay/>
					</MessengerProfileContainer>

					<ChatContainer>

						<ChatDisplay/>

					</ChatContainer>

					<ImageContainer>
						<ImageDisplay/>

					</ImageContainer>

					<AttachmentContainer>

						<AttachmentDisplay/>

					</AttachmentContainer>

				


				</React.Fragment>
		)
	}
}

export default ExpandedChatDisplay;