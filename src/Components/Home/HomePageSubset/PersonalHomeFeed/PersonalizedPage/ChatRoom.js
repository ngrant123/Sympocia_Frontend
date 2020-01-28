import React, {Component} from "react";
import styled from "styled-components";


const Chat=styled.div`
	background-color:white;
	width:100%;
	height:75%;

`;

const SongPlaying =styled.div`
	position:absolute;
	width:100%;
	height:10%;
	padding:10px;
	top:0%;
	background-color:white;
	overflow:hidden;
`;

const MessageContainer=styled.div`
	width:100%;
	height:20%;
	background-color:blue;
	border-radius:5px;
	z-index:2; 
`;

const MessageBox=styled.textarea`
	position:relative;
	width:100%;
	height:12%;
	padding:10px;
	text-align:center;
	resize:none;
	border-style:none;
	overflow:hidden;
`;

const SubmitButton=styled.div`
 	left:60%;
	width:110px;
	height:30px;
	background-color:black;
	border-radius:5px;
	transition:.8s;

	&:hover{
		box-shadow: 1px 5px 5px 1px #d5d5d5;
	}
`;


const EmojiButton=styled.div`
	left:60%;
	width:50px;
	height:30px;
	background-color:black;
	border-radius:5px;
	transition:.8s;

	&:hover{
		box-shadow: 1px 5px 5px 1px #d5d5d5;
	}
`;

const ExtendedMessageBox=styled.div`
	position:absolute;
	z-index:5;
	width:85%;
	height:60%;
	left:-90%;
	top:40%;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#5298F8;
	padding:10px;
	word-break:break-all;
	overflow-y:scroll;
`;

const MessageListCSS={
	listStyle:"none"
}


const MessageListNestedCSS={
	listStyle:"none",
	display:"inline-block",
	marginLeft:"50px"
}

class ChatRoom extends Component{
	constructor(props){

		super(props);
		this.state={
			songPlaying:"",
			characterLimit:20,
			text:""
		};
	}

	handleDisplayTextBox=()=>{

		return this.state.text.length>this.state.characterLimit?
			<ExtendedMessageBox>
				{this.state.text}
			</ExtendedMessageBox>:
			<React.Fragment>
			</React.Fragment>
	}

	handleTextChange=(event)=>{
		console.log(event);
		const newText=event.target.value;
		this.setState({
			songPlaying:this.state.songPlaying,
			characterLimit:20,
			text:newText
		})
	}



	render(){

		return(

			<React.Fragment>
				{this.handleDisplayTextBox()}

				<SongPlaying>
					<p style={{position:"absolute",color:"#848484",left:"80px"}}>Testing song playing</p>
				</SongPlaying>

				<Chat>

				</Chat>
				<MessageBox placeholder="Submit something stoopid" onChange={event=>this.handleTextChange(event)}/>
					<ul style={{position:"absolute",padding:"5px"}}>
									<li style={MessageListNestedCSS}>
										<EmojiButton>
										</EmojiButton>
									</li>

									<li style={MessageListNestedCSS}>
										<SubmitButton>
										</SubmitButton>

									</li>
							</ul>

			</React.Fragment>
		)
	}
}

export default ChatRoom;