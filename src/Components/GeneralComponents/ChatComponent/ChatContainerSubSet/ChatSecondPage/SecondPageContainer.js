import React,{Component} from "react";
import styled from "styled-components";
import RecentChatContainer from "./RecentChatContainer.js";
import Chat from "./Chat.js";
import ChatCreationArea from "./ChatCreationArea";
import AdditionalInformation from "./AdditionalInformation.js";
import {getProfiles} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {sendMessagePersonal,createChat} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";


import {getCompanies,getCompanyProfileGeneralMessages} from "../../../../../Actions/Requests/CompanyPageAxiosRequests/CompanyPageGetRequests.js";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import {connectToRoom,receieveMessage} from "../../../../../Actions/Requests/SocketIORequests";


import AppsIcon from '@material-ui/icons/Apps';
const Container=styled.div`
	position:fixed;
	width:60%;
	height:70%;
	background-color:white;
	z-index:6;
	border-radius:5px;
	box-shadow: 1px 1px 30px #d5d5d5;
	margin-left:20%;
	margin-top:10%;
	overflow:hidden;
`;

const AdditionalInfoButton=styled.div`
	position:absolute;
	height:10%;
	width:10%;
	top:2%;
	left:85%;
	background-color:red;
`;
const SuggestPeopleContainer=styled.div`
	position:relative;
	border-radius:5px;	
	border-style:solid;
	border-width:1px;
	width:50%;
	margin-left:5%;
	margin-top:2%;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	overflow-y:auto;
	height:60%;
`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;	
	border-style:solid;
	border-width:1px;
	width:80%;
	margin-left:5%;
	margin-top:2%;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;

const ProfilePicture=styled.div`
	position:relative;
	width:70px;
	height:20%;
	border-radius:50%;
	background-color:blue;
`;

const ProfileChatInformation=styled.div`
	position:relative;
	width:230px;
	height:110%;
	overflow:hidden;
	border-bottom:1px solid #d1d1d1;
`;

const BackButtonCSS={
	listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginLeft:"10%"
}


class SecondPageContainer extends Component{



	constructor(props){
		super(props);
		console.log(props);

		this.state={
			displayAdditionalInformation:false,
			displayPeopleOptionsPrompt:false,
			people:[],
			isPersonalPage:false,
			createNewMessage:false,
			chat:[]
		}

		if(this.props.selectedConversation!=null){
			connectToRoom(this.props.selectedConversation._id);
			receieveMessage();
		}
	}

	async componentDidMount(){
		var profiles;
		if(this.props.selectedConversation==null){
			if(this.props.profileType==true){
				profiles=await getProfiles();
				console.log(profiles);
			}else{
				profiles=await getCompanies();
			}
			const chatIndicator=this.props.selectedConversation==null?[]:this.props.selectedConversation.chat;
			this.setState({
				people:profiles,
				selectedConvesation:this.props.selectedConversation,
				chat:chatIndicator
			})
		}
	}

	handleDisplayMoreInformation=()=>{

		return this.state.displayAdditionalInformation==true?
			<AdditionalInformation
				hideDisplayPage={()=>this.setState(prevState=>({
					...prevState,
					displayAdditionalInformation:false
				}))}
			/>: <React.Fragment></React.Fragment>
	}

	createConversation=(data)=>{
		this.setState({
			selectedConversation:data,
			createNewMessage:true
		})
	}

	sendMessageHandler=(data)=>{
		console.log(data);
		debugger;
		var currentTimeStamp=new Date();
		currentTimeStamp=currentTimeStamp.getTime();

		const messageObject={
			chatMessage:data,
			timeStamp:currentTimeStamp,
			senderId:this.props.id
		}

		//Reason behind this is that later down the wrong it would make have multiple people in conversation easier

		var participantsArray=[];
		participantsArray.push(this.state.selectedConversation._id);
		/*

			if(this.props.profileType==true){
				if(this.state.createNewMessage==true){
					var chatResponse=createChat(this.props.id,messageObject,participantsArray);
					//Create socket connection 
					const {_id}=chatResponse;
					connectToRoom(_id);
					receieveMessage();
				}else{
					sendMessagePersonal(this.props.id,messageObject,participantsArray);
				}
			}else{

			}
		*/
		var newChat;
		if(this.state.chat.length>0){
			var chat=this.state.chat;
			chat.splice(0, 0, messageObject);
			newChat=chat;
		}else{
			var newChat=[];
			newChat.push(messageObject);
		}
		this.setState({
			chat:newChat
		})
	}

	render(){

		return(
			<Container>
				{this.handleDisplayMoreInformation()}
					{this.state.selectedConversation==null?
						<React.Fragment>
							<ul>
								<li style={{listStyle:"none"}}>
									<InputContainer
										placeholder="Enter a name to begin"
										onClick={()=>this.setState({displayPeopleOptionsPrompt:true})}
									/>
								</li>
								{this.state.displayPeopleOptionsPrompt==false?
									<React.Fragment></React.Fragment>:
									<li style={{listStyle:"none"}}>
										<SuggestPeopleContainer>
											<ul style={{padding:"0px"}}>
												{this.state.people.map(data=>
													<a href="javascript:void(0);" style={{textDecoration:"none"}}>
														<li onClick={()=>this.createConversation(data)} style={{listStyle:"none",marginBottom:"5%",boxShadow: "1px 1px 1px 1px #d5d5d5"}}>
															<ul style={{padding:"0px"}}>
																<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
																		{data.profilePicture!=null?
																			<img src={data.profilePicture} style={{position:"relative",width:"70px",height:"20%",borderRadius:"50%"}}/>:
																			<img src={NoProfilePicture} style={{position:"relative",width:"70px",height:"20%",borderRadius:"50%"}}/>
																		}
																</li>
																<li style={{listStyle:"none",display:"inline-block",padding:"0px"}}>
																	<b>{data.firstName}</b>
																</li>
															</ul>
														</li>
													</a>
												)}
											</ul>
										</SuggestPeopleContainer>
									</li>
								}
							</ul>
						</React.Fragment>:
						<React.Fragment>
							<ul style={{padding:"0px"}}>
								<li>
									<ul style={{padding:"0px"}}>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>this.props.displayOriginalScreen()} style={BackButtonCSS}>
												Back
											</li>
										</a>
										<li style={{listStyle:"none",display:"inline-block",marginRight:"100px"}}>
											<RecentChatContainer
												friends={this.props.recruits}
											/>
										</li>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li style={BackButtonCSS}>
												<AppsIcon
													onClick={()=>this.setState(prevState=>({
									   				...prevState,
									  				displayAdditionalInformation:true
								   				}))}/>
											</li>
										</a>

									</ul>
								</li>
								<li style={{listStyle:"none"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
											<ul style={{padding:"5px"}}>
												<li style={{listStyle:"none",display:"inline-block"}}>
													{this.state.selectedConversation.profilePicture!=null?
														<img src={this.state.selectedConversation.profilePicture} style={{position:"relative",width:"70px",height:"10%",borderRadius:"50%"}}/>:
														<img src={NoProfilePicture} style={{position:"relative",width:"70px",height:"10%",borderRadius:"50%"}}/>
													}
												</li>

												<li style={{listStyle:"none",display:"inline-block"}}>
													{this.state.selectedConversation.firstName}
												</li>
											</ul>
										</li>
										<li style={{listStyle:"none",display:"inline-block",marginTop:"2%"}}>
											<Chat
												chat={this.state.chat}
												owner={this.props.id}
											/>
										</li>
									</ul>
								</li>
								<ChatCreationArea
									sendMessage={this.sendMessageHandler}

								/>


							</ul>
						</React.Fragment>
					}
				
			</Container>
		)
	}
}

export default SecondPageContainer;