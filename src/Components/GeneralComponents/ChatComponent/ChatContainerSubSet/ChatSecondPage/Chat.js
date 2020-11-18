import React,{Component} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";



const Container=styled.div`
	position:relative;
	height:400px;
	overflow-y:auto;
	width:700px;
	background-color:white;
	border-radius:5px;	
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
`;

const OwnerChatCSS={
	marginLeft:"50%",
	listStyle:"none",
	width:"40%",
	marginBottom:"%"
}

const OwnerMessageCSS={
	backgroundColor:"white",
	padding:"5px",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	color:"#5298F8",
	borderRadius:"5px",
	color:"black",
	position:"relative",
	top:"-30px",
	width:"40%",
	display:"inline-block"
}

const FriendChatCSS={
	color:"white",
	listStyle:"none",
	width:"40%",
	marginBottom:"1%"
}
const FriendMessageCSS={
	borderRadius:"5px",
	color:"white",
	width:"40%",
  	backgroundColor:"#5298F8",
	padding:"5px",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	position:"relative",
	top:"-30px",display:"inline-block"
}

const Chat=(props)=>{
	const {chat,owner,ownerShortInfo,participantInformation}=props;
	const constructChat=()=>{
		if(props.firstTimeEnteringChat==true)
			chat.reverse();
		
		return <ul style={{padding:"5px"}}>
					{chat.map(data=>
						<React.Fragment>
							{data.senderId==owner ||data.owner==owner?
								<li style={OwnerChatCSS}>
									<ul style={{padding:"5px"}}>
										<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none"}}>
													{data.profilePicture!=null?
														<img src={ownerShortInfo.profilePicture} style={{position:"relative",width:"40px",height:"10%",borderRadius:"50%"}}/>:
														<img src={NoProfilePicture} style={{position:"relative",width:"40px",height:"10%",borderRadius:"50%"}}/>
													}
												</li>
												<li style={{color:"#a6a6a6",listStyle:"none"}}>
													{ownerShortInfo.firstName}
												</li>
											</ul>
										</li>
										<li style={OwnerMessageCSS}>
											{data.message}
											{data.chatMessage}
										</li>

									</ul>
								</li>:
								<li style={FriendChatCSS}>
									<ul style={{padding:"5px"}}>
										<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none"}}>
													{participantInformation.profilePicture!=null?
														<img src={participantInformation.profilePicture} style={{position:"relative",width:"40px",height:"10%",borderRadius:"50%"}}/>:
														<img src={NoProfilePicture} style={{position:"relative",width:"40px",height:"10%",borderRadius:"50%"}}/>
													}
												</li>
												<li style={{color:"white",listStyle:"none"}}>
													{participantInformation.firstName}
												</li>
											</ul>
										</li>
										<li style={FriendMessageCSS}>
											{data.message}
											{data.chatMessage}
										</li>
									</ul>
								</li>
							}
						</React.Fragment>
					)}

			  </ul> 
	}

	return(
			<Container>
				{constructChat()}
			</Container>
	)
}

export default Chat;