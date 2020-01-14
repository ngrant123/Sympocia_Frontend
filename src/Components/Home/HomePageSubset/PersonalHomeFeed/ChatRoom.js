import React, {Component} from "react";
import styled from "styled-components";


const Chat=styled.div`
	background-color:white;
	width:100%;
	height:85%;

`;

const SongPlaying =styled.div`
	position:absolute;
	width:100%;
	height:10%;
	padding:10px;
	top:0%;
	background-color:white;
	overflow-x:scroll;
`;

const MessageContainer=styled.div`
	width:100%;
	height:15%;
	background-color:white;
	border-radius:5px;
	z-index:2; 
`;

const MessageBox=styled.textarea`
	position:absolute;
	width:60%;
	height:12%;
	padding:10px;
	text-align:center;
	resize:none;
	border-style:none;

`;


const Submit =styled.div`
	position:absolute;
	left:60%;
	width:40%;
	height:12%;
	background-color:blue;
	

`;

class ChatRoom extends Component{

	constructor(props){

		super(props);
		this.state={
			songPlaying:""
		};
	}



	render(){


		return(

			<React.Fragment>

				<SongPlaying>
					<p style={{position:"absolute",color:"#848484",left:"80px"}}>Testing song playing</p>
				</SongPlaying>

				<Chat>

				</Chat>

				<MessageContainer>
					<MessageBox placeholder="Send a message :)">

					</MessageBox>

					<Submit>
					</Submit>
				</MessageContainer>
			</React.Fragment>
		)
	}
}

export default ChatRoom;