import React, {Component} from "react";
import styled from "styled-components";
import SendIcon from '@material-ui/icons/Send';
import {HomeConsumer} from "../../../HomeContext.js";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";

const Chat=styled.div`
	background-color:white;
	width:100%;
	height:75%;
	overflow-y:auto;

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
	width:160%;
	height:12%;
	padding:10px;
	text-align:center;
	resize:none;
	border-style:none;
	overflow:hidden;
	background-color:white;
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
	position:relative;
	z-index:12;
	width:300px;
	height:60%;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#5298F8;
	padding:10px;
	word-break:break-all;
	overflow-y:scroll;
`;

const ChatAndIndustryInfoContainer=styled.div`
	position:fixed;
	width:22%;
	height:45%;
	top:45%;
	left:75%;
	border-radius:5px;
	overflow-y:auto;
	transition:.8s;
	z-index:4;
	border-style:solid;
	border-width:1px;
	border-color:#5298F8;
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

	sendMessageToGroupChat=(profile)=>{
		const {personalInformationState}=profile;
		console.log(profile);
		const messageValue=document.getElementById("messageContainer").value;
		const messageObject={
	  			room:this.props.roomId,
	  			message:messageValue,
	  			senderName:personalInformationState.firstName,
	  			senderProfilePicture:personalInformationState.profilePicture
	  	}
		this.props.pushMessageToSocket(messageObject);
	}

	constructChat=(chatRoom)=>{
		console.log(chatRoom);
		return <React.Fragment>
					{chatRoom==null?null:
						<ul style={{marginTop:"15%"}}>
							{chatRoom.map(data=>
									<li style={{listStyle:"none",marginBottom:"2%"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>
												{data.senderProfilePicture==null?
													<img src={NoProfilePicture} style={{borderRadius:"50%",width:"60%",height:"30"}}/>:
													<img src={data.senderProfilePicture} style={{borderRadius:"50%",width:"20%",height:"20"}}/>
												}
											</li>

											<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
												<b>{data.senderName}</b>
											</li>

											<li style={{listStyle:"none",display:"inline-block",color:"#848484"}}>
												{data.message}
											</li>
										</ul>
									</li>
								)
							}
						</ul>
					}
			</React.Fragment>
	}


	render(){

		return(
			<HomeConsumer>
				{personalInformation=>{
					return <React.Fragment>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",marginLeft:"55%"}}>
										{this.handleDisplayTextBox()}
									</li>
									<li style={{listStyle:"none",display:"inline-block"}}>
										<ChatAndIndustryInfoContainer>
											<SongPlaying>
												<p style={{position:"absolute",color:"#848484",left:"80px"}}>Testing song playing</p>
											</SongPlaying>

											<Chat>
												{this.constructChat(this.props.chat)}
											</Chat>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none",display:"inline-block",width:"60%"}}>
													<MessageBox id="messageContainer" placeholder="Submit something stoopid" onChange={event=>this.handleTextChange(event)}/>

													<a href="javascript:void(0);" style={{textDecoration:"none"}}>
														<SendIcon
															style={{color:"#BDBDBD",fontSize:"30",paddingLeft:"5%"}}
															onClick={()=>this.sendMessageToGroupChat(personalInformation)}
														/>
													</a>
												</li>
											</ul>
										</ChatAndIndustryInfoContainer>
									</li>
								</ul>

							{/*
								<ul style={{position:"relative",padding:"5px",backgroundColor:"white"}}>
													<li style={MessageListNestedCSS}>
														<EmojiButton>
														</EmojiButton>
													</li>

													<li style={MessageListNestedCSS}>
														<SubmitButton>
														</SubmitButton>

													</li>
								</ul>
							*/}
							</React.Fragment>
				}}
			</HomeConsumer>
		)
	}
}

export default ChatRoom;