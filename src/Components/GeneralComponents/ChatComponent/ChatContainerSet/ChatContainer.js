import React,{useState,useEffect,Component} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import chatColumn from "../../../../designs/img/ChatFirstPageColumn.png";
import ChatTab from "./ChatTab";
import SecondPageChatContainer from "../ChatContainerSubSet/ChatSecondPage/SecondPageContainer.js";


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

const ChatOptionsButton=styled.div`
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

const BackgroundContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	z-index:4;
`;


const ChatContainer=(props)=>{
	console.log(props);

	const state= useSelector(state=>state);
	const [friends,changeFriends]=useState([{},{},{},{},{}]);
	const [displaySecondOrFirstPage,changeToFirstOrSecondPage]=useState("First");
	console.log(state);
	console.log(displaySecondOrFirstPage);

	useEffect(()=>{


	},[]);

	const displaySecondPage=()=>{
		console.log("Clicked");
		changeToFirstOrSecondPage("Second");
	}

	const displayFirstPage=()=>{
		changeToFirstOrSecondPage("First");
	}

	return(
		<React.Fragment>
			<BackgroundContainer
				onClick={()=>props.hideChatContainer()}
			/>
			{displaySecondOrFirstPage=="First"?
				<Container>

					<SearchBar placeholder="Search by name here">

					</SearchBar>
					<ColumnBackground/>

					<ul style={{borderRadius:"5px",width:"65%",marginLeft:"17%",padding:"10px",borderStyle:"solid",borderColor:"#5298F8"}}>
						<li style={{listStyle:"none",display:"inline-block",marginRight:"15%"}}>
							<ChatOptionsButton>

							</ChatOptionsButton>
						</li>

						<li style={{listStyle:"none",display:"inline-block",marginRight:"15%"}}>
							<ChatOptionsButton>

							</ChatOptionsButton>
						</li>

						<li style={{listStyle:"none",display:"inline-block"}}>
							<ChatOptionsButton>

							</ChatOptionsButton>
						</li>
					</ul>

					<ul style={{paddingLeft:"10px"}}>
						<li style={{listStyle:"none",display:"inline-block",paddingRight:"30%"}}>
							<p style={{padding:"10px",borderradius:"5px",boxShadow:"1px 1px 10px #d5d5d5"}}>
							<p style={{position:"relative",marginRight:"70px",padding:"10px",color:"white",backgroundColor:"#5298F8",width:"30%",borderRadius:"5px"}}>3</p>
							Unread Messages</p>
						</li>

						<li style={{listStyle:"none",display:"inline-block"}}>
							<p style={{padding:"10px",borderradius:"5px",boxShadow:"1px 1px 10px #d5d5d5"}}>
							<p style={{position:"relative",padding:"10px",color:"white",backgroundColor:"#5298F8",width:"30%",borderRadius:"5px"}}>3</p> Message invites</p>
						</li>
					</ul>

					<ul style={{height:"37%",padding:"0px",zIndex:"9",overflowY:"scroll",paddingLeft:"5%"}}>
						{friends.map(data=>
							<li style={{listStyle:"none",marginBottom:"5%"}}>
								<ChatTab
									displaySecondPageAction={displaySecondPage}
								/>
							</li>
						)}
					</ul>

			</Container>:
			<SecondPageChatContainer
				friends={friends}
			/>
		}
		</React.Fragment>
	)
}

export default ChatContainer;