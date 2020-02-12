import React,{Component} from "react";
import styled from "styled-components";

const Container=styled.div`
	
	position:relative;
	width:90%;
	height:60%;
	border-radius:5px;
	transition:.8s;
	padding:10px;
	&:hover{

		box-shadow: 1px 1px 1px 1px #d5d5d5;
	}
`;

const ProfilePicture=styled.div`
	position:relative;
	width:80px;
	height:90%;
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

const ChatTab=(props)=>{
	console.log(props);

	const displaySecondPage=()=>{
			props.displaySecondPageAction();
	}
	return(

		<Container onClick={()=>displaySecondPage()}>
			<ul style={{padding:"0px"}}>
				<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
					<ProfilePicture>

					</ProfilePicture>
				</li>
				<li style={{listStyle:"none",display:"inline-block",padding:"0px"}}>
					<ProfileChatInformation>
						<p style={{fontSize:"20px"}}><b> Nathan Grant</b></p>
						<p style={{color:"#b9b9b9"}}> This is a sample message </p>

					</ProfileChatInformation>
				</li>
			</ul>
		</Container>


	)
}

export default ChatTab;