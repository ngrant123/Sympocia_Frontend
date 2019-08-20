import React, { Component } from "react";
import styled from "styled-components";
import ChatDisplaySmallProfile from "../SmallChatComponent/ChatDisplaySmallProfile.js";

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
	background-color:blue;
	top:15%;
	width:95%;
	left:2%;
	height:87%;

`;


const Testerdata= [
	{	
		tester:1

	},
	{
		tester:2

	},
	{
		tester:3
	},
	{	
		tester:1

	},
	{
		tester:2

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
					
						<li style={{display:"inline-flex"}}>

							{Testerdata.map(data=>

								<ChatDisplaySmallProfile
								/>
							)}

						</li>
					
					</ul>

				</SmallChatContainer>

				<Chat>
				</Chat>

			</React.Fragment>
	
		)
	}
}

export default ChatDisplay;