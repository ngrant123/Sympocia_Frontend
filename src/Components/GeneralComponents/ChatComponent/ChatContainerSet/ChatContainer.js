import React,{useState,useEffect,Component} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import chatColumn from "../../../../designs/img/ChatFirstPageColumn.png";
import SecondPageChatContainer from "../ChatContainerSubSet/ChatSecondPage/SecondPageContainer.js";
import {getPersonalProfileGeneralMessages} from "../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {getCompanyProfileGeneralMessages} from "../../../../Actions/Requests/CompanyPageAxiosRequests/CompanyPageGetRequests.js";

import {getPersonalProfileChat} from "../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";

	
	
const Container=styled.div`
	position:fixed;
	background-color:white;
	width:30%;
	height:52%;
	z-index:6;
	margin-left:60%;
	margin-top:6%;
	border-radius:5px;
	box-shadow: 1px 1px 30px #d5d5d5;
	border-style:solid;
	border-width:4px;
	border-color:#dddddd;
`;

const ChatOptionsButton=styled.div `
	width:50px;
	height:10%;
	background-color:red;

`;

const SearchBar=styled.textarea`
	position:relative;
	resize:none;
	width:80%;
	height:10%;
	border-radius:5px;
	border-style:none;
	background-color:#e1e1e1;
	color:#535353;
	margin-left:10%;
	margin-top:3%;
	margin-bottom:5%;
	padding:10px;
`;

const ColumnBackground=styled.div`
	position:absolute;
	width:23%;
	height:20%;
	background-color:red;
	top:35%;
	left:37%;
	background-image:url(${chatColumn});
	background-size: cover; /* or contain depending on what you want */
    background-position: center center;
    background-repeat: no-repeat;
    text-align:center;
    margin:auto;
    padding:0;
    z-index:5;
    border-radius:5px;

`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	width:70%;
	margin-left:5%;
	margin-top:2%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	margin-right:5%;
`;


const BackgroundContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	
	z-index:4;
`;

const ProfilePicture=styled.div`
	position:relative;
	width:70px;
	height:80%;
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

const ChatOptions={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"2%"
}


const ChatContainer=(props)=>{
	const state= useSelector(state=>state);
	const [recruits,changeRecruits]=useState([]);
	const [selectedRecruit,changeSelectedRecruit]=useState();
	const [displaySecondPage,changeSecondPage]=useState(false);
	const [personalProfileIndicator,changePersonalProfileIndicator]=useState(false);
	const [ownerProfileInfo,changeOwnerProfileInformation]=useState();

	const [ownerId,changeOwnerId]=useState("");
	useEffect(()=>{
		const getData=async()=>{
			var isPersonalProfile=state.personalInformation.loggedIn;
			if(isPersonalProfile==true){
				debugger;
				const chats=await getPersonalProfileGeneralMessages(state.personalInformation.id);
				const {chatMessage}=chats;
				changePersonalProfileIndicator(true);
				changeOwnerId(state.personalInformation.id);

				const ownerName=chats.firstName;
				const ownerProfilePicture=chats.profilePicture;
				const ownerObject={
					firstName:ownerName,
					profilePicture:ownerProfilePicture
				}
				changeOwnerProfileInformation(ownerObject);
				changeRecruits(chatMessage);
			}else{
				const {chatMessage}=await getCompanyProfileGeneralMessages(state.companyInformation.id);
				changePersonalProfileIndicator(false);
				changeOwnerId(state.companyInformation.id);
			}
		}
		getData();
	},[]);

	const displaySecondPageHandler=(data)=>{
		changeSecondPage(true);
		changeSelectedRecruit(data)
	}

	const displayOriginalScreen=()=>{
		changeSecondPage(false);
	}

	const test=(data)=>{
		debugger;
		return <ProfileChatInformation>
					<p style={{fontSize:"20px"}}><b>{data.participants[0].firstName}</b></p>
					<p style={{color:"#b9b9b9"}}>{data.chat[data.chat.length-1].message}</p>
				</ProfileChatInformation>;
	}

	return(
		<React.Fragment>
			<BackgroundContainer
				onClick={()=>props.hideChatContainer()}
			/>
			{displaySecondPage==false?
				<Container>

					<InputContainer placeholder="Search by name here"
					/>
					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						<BorderColorIcon
							onClick={()=>changeSecondPage(true)}
							style={{fontSize:"30",color:"#5298F8"}}
						/>
					</a>

					<ul style={{marginTop:"3%"}}>
						<li style={ChatOptions}>
							Recent messages
						</li>

						<li style={ChatOptions}>
							My favorites
						</li>
					</ul>

					<ul style={{height:"65%",padding:"0px",zIndex:"9",overflowY:"scroll",paddingLeft:"5%"}}>
						{recruits.map(data=>
							<React.Fragment>
								{data.participants.length>0?
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>displaySecondPageHandler(data)} style={{height:"30%",listStyle:"none",marginBottom:"5%"}}>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
													{data.participants[0].profilePicture!=null?
														<img src={data.participants[0].profilePicture.profilePicture} style={{position:"relative",width:"70px",height:"80%",borderRadius:"50%",top:"-50px"}}/>:
														<img src={NoProfilePicture} style={{position:"relative",width:"70px",height:"80%",borderRadius:"50%",top:"-50px"}}/>
													}
												</li>
												<li style={{listStyle:"none",display:"inline-block",padding:"0px"}}>
													{test(data)}
												</li>
											</ul>
										</li>
									</a>:null
								}
							</React.Fragment>
						)}
					</ul>
			</Container>:
			<SecondPageChatContainer
				recruits={recruits}
				selectedConversation={selectedRecruit}
				profileType={personalProfileIndicator}
				displayOriginalScreen={displayOriginalScreen}
				id={ownerId}
				ownerInfo={ownerProfileInfo}
			/>
		}
		</React.Fragment>
	)
}

export default ChatContainer;