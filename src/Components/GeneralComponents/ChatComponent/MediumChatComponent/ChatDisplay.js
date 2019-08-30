import React, { Component } from "react";
import styled from "styled-components";
import ChatDisplaySmallProfile from "../SmallChatComponent/ChatDisplaySmallProfile.js";
import ChatMessages from "../SmallChatComponent/ChatMessages.js";

const SmallChatContainer = styled.div`

	position:absolute;
	background-color:white;
	width:80%;
	height:10%;
	left:10%;
	top:1%;
	border-radius:5px;
	box-shadow: 1px 1px 1px 1px #999a9b;
	overflow-x:scroll;



`;

const Chat = styled.div`
	
	position:absolute;
	top:15%;
	width:95%;
	left:2%;
	background-color:white;
	height:87%;

`;

const MessengerTabContainer = styled.div`
	position:absolute;



`;


const ChatMessagesContainer = styled.div`

	position:absolute;
	background-color:red;
	width:100%;
	height:85%;
	padding:5px;
	overflow-y:scroll;



`;

const MessagesContainer = styled.div`
	position:absolute;
	width:100%;
	top:84%;
	height:16%;

`;

const CreateMessage = styled.div`

	position:absolute;
	background-color:white;
	width:70%;
	left:5%;
	height:70%;
	padding:10px;
	top:10%;
	border-radius:5px;
	opacity:1;
	border-style:solid;
	border-width:2px;
	border-color:	#cbdff8;
	color:#cbdff8;

`;


const CreateImageContainer = styled.div`

	position:absolute;
	background-color:red;
	width:10%;
	height:60%;
	top:10%;
	left:80%;
	border-radius:50%;

`;

const Testerdata= [
	{
		chatType:"RegularMessage1"
	},
	{
		chatType:"Image Message2"

	},
	{
		chatType:"Attachment Message3"

	},
	{
		chatType:"RegularMessage4"
	},
	{
		chatType:"Image Message5"

	},
	{
		chatType:"Attachment Message6"

	}
]

class ChatDisplay extends Component {

	constructor(props){
		super(props);

		this.state={


		}
	}


	render(){

		return(

			<React.Fragment>
				<SmallChatContainer>

					<ul>
					
						<li style={{display:"inline-flex", listStyle:"none"}}>

							{Testerdata.map(data=>

								<ChatDisplaySmallProfile
								/>
							)}

						</li>
					
					</ul>

				</SmallChatContainer>

				<Chat>
					<ChatMessagesContainer>

						<ul style={{  display:"flex",flexDirection:"column-reverse"}}>

							{Testerdata.map(data=>
								<li style={{flex:"0 0 auto"}}>
									<ChatMessages
										chatType={data.chatType}

									/>

								</li>
							)}

						</ul>

					</ChatMessagesContainer>

					<MessagesContainer>

						<CreateMessage>
							Enter a message here...

						</CreateMessage>

						<CreateImageContainer>
						</CreateImageContainer>

					</MessagesContainer>
				</Chat>

			</React.Fragment>
	
		)
	}
}

export default ChatDisplay;