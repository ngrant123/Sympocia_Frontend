import React, {Component} from "react";
import styled from "styled-components";
import SendIcon from '@material-ui/icons/Send';
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import {getProfilePicture} from "../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {connect} from "react-redux";
import {sendChatRoomMessage} from "../../../../Actions/Requests/SocketIORequests";


const Container=styled.div`
	@media screen and (max-width:1370px){
    	#chatContainerUL{
    		margin-left:-20% !important;
    	}
    }
`;

const ChatContainer=styled.div`
	positiion:absolute;
`;

const Chat=styled.div`
	background-color:white;
	width:100%;
	height:75%;
	overflow-y:auto;

	${({isSimplified})=>
		isSimplified==true &&(
			`
			#chatProfilePicture{
				width:20% !important;
			}
			@media screen and (max-width:1340px){
				#chatProfilePicture{
					width:70% !important;
					height:20% !important;
				}
			}


			@media screen and (max-width:640px){
				#chatProfilePicture{
					width:80% !important;
				}
			}

			@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
		    	#chatProfilePicture{
					width:50% !important;
				}
		    }


			@media screen  and (max-width:840px) and (max-height:420px) 
			  and (orientation: landscape) 
			  and (-webkit-min-device-pixel-ratio: 1){
			  	#chatProfilePicture{
					width:50% !important;
				}
		    }
		`)
	}

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
	width:100%;
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
	position:absolute;
	width:100%;
	height:100%;
	left:0%;
	border-radius:5px;
	overflow-y:auto;
	transition:.8s;
	z-index:17;
	border-style:solid;
	border-width:1px;
	border-color:#5298F8;
	background-color:white;

	@media screen and (max-width:1370px){
		width:75%;
		height:60%;
		left:10%;
	}

	@media screen and (max-width:640px){
		width:100%;
		height:100%;
		left:0%;
	}
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
			chatMessages:this.props.chat,
			text:""
		};
		this.props.socket.on('symposiumChatMessage',this.handleChatData);
	}

	 handleChatData=(data)=>{

  		const currentChatRoomState=this.state.chatMessages;
  		currentChatRoomState.splice(0,0,data);
  		this.setState({
  			chatMessages:currentChatRoomState
  		})
	  }

	handleDisplayTextBox=()=>{

		return this.state.text.length>this.state.characterLimit?
			<ExtendedMessageBox>
				{this.state.text}
			</ExtendedMessageBox>:
			<React.Fragment>
			</React.Fragment>
	}
	 pushMessageToSocketHandle=(message)=>{
  		sendChatRoomMessage(this.props.socket,message);
  	}

	handleTextChange=(event)=>{
		const newText=event.target.value;
		this.setState({
			songPlaying:this.state.songPlaying,
			characterLimit:20,
			text:newText
		})
	}

	sendMessageToGroupChat=async()=>{
		
		const messageValue=document.getElementById("messageContainer").value;
		const {data}=await getProfilePicture(this.props.profileId);

		const message={
  			room:this.props.roomId,
  			message:messageValue,
  			senderName:this.props.personalName,
  			senderProfilePicture:data
	  	}
	  	const updatedChatMessages=this.state.chatMessages;
	  	updatedChatMessages.splice(0,0,message);
	  	this.setState({
	  		chatMessages:updatedChatMessages
	  	},function(){
	  		document.getElementById("messageContainer").value="";
	  		this.pushMessageToSocketHandle(message);
	  	})
	}

	constructChat=(chatRoom)=>{
		
		return <React.Fragment>
					{chatRoom==null?null:
						<ul style={{marginTop:"15%"}}>
							{chatRoom.map(data=>
									<li style={{listStyle:"none",marginBottom:"2%"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>
												{data.senderProfilePicture==null?
													<img id="chatProfilePicture" src={NoProfilePicture} style={{borderRadius:"50%",width:"60%",height:"30"}}/>:
													<img id="chatProfilePicture" src={data.senderProfilePicture} style={{borderRadius:"50%",width:"60%",height:"30"}}/>
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
			<div style={{position:"relative",width:"100%",height:"100%"}}>
				<ul id="chatContainerUL" style={{padding:"0px"}}>
					<li style={{listStyle:"none",display:"inline-block",marginLeft:"55%"}}>
						{this.handleDisplayTextBox()}
					</li>
					<li style={{listStyle:"none",display:"inline-block"}}>
						<ChatAndIndustryInfoContainer>
							
							{/*	
							<div onClick={()=>this.props.closePostModal()} style={{marginBottom:"5%"}}>
								<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
								 width="44" height="44" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
								 stroke-linecap="round" stroke-linejoin="round">
								  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
								  <circle cx="12" cy="12" r="9" />
								  <path d="M10 10l4 4m0 -4l-4 4" />
								</svg>
							</div>
								<SongPlaying>
									<p style={{position:"absolute",color:"#848484",left:"80px"}}>Testing song playing</p>
								</SongPlaying>
							*/}

							<Chat isSimplified={this.props.isSimplified}>
								{this.constructChat(this.state.chatMessages)}
							</Chat>

							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block",marginLeft:"2%"}}>

									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<SendIcon id="sendIcon"
											style={{color:"#5298F8",fontSize:"30",paddingLeft:"5%"}}
											onClick={()=>this.sendMessageToGroupChat()}
										/>
									</a>
								</li>
								<li style={{listStyle:"none",display:"inline-block",width:"50%"}}>
									<MessageBox id="messageContainer" placeholder="Send something...." 
									/>
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
			</div>
		)
	}
}

const mapStateToProps=(state)=>{
	return{
		personalName:state.personalInformation.firstName
	}
}

export default connect(
	mapStateToProps,
	null
)(ChatRoom);

