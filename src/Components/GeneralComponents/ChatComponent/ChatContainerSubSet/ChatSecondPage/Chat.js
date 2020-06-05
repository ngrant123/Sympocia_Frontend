import React,{Component} from "react";
import styled from "styled-components";


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

const Chat=(props)=>{
	console.log(props);
	const {chat,owner}=props;
	const constructChat=()=>{
		//chat.reverse();
		return <ul>
					{chat.map(data=>
						<React.Fragment>
							{data.senderId==owner ||data.owner==owner?
								<li style={{backgroundColor:"red"}}>
									{data.chatMessage}
									{data.message}
								</li>:
								<li style={{backgroundColor:"blue"}}>
									{data.message}
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