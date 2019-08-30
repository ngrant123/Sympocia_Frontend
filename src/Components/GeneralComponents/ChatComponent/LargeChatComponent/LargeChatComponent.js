import React, { Component } from "react";
import styled from "styled-components";
import BroadChatMessages from "../SmallChatComponent/BroadChatMessages.js";
import ExpandedChatDisplay from "../MediumChatComponent/ExpandedChatDisplay.js";

const Container = styled.div`

	position:absolute;
	width:100%;
	height:100%;
	background-color:white;
	z-index:5;
	border-radius:5px;

`;

const SearchContainer = styled.div`

	position:absolute;
	left:12%;
	height:10%;
	width:80%;
	top:5%;
	border-radius:5px;
	border-style:solid;
	border-color:	#d4d9e1;
	border-width:2px;
	padding:5px;
`;

const SearchTextFieled = styled.textarea`

	position:absolute;
	width:80%;
	height:90%;
	resize:none;
	padding:5px;
	border-style:none;


`;

const SearchButton = styled.div`

	position:absolute;
	background-color:red;
	left:85%;
	width:10%;
	height:80%;
	border-radius:5px;

`;

const SrollIndicatorButton = styled.div`

	position:absolute;
	left:25%;
	height:10%;
	width:50%;
	top:80%;
	border-radius:5px;
	border-style:solid;
	border-color:	#d4d9e1;
	border-width:2px;
	padding:5px;


`;

const MessagesContainer = styled.div`

	position:relative;	
	left:13%;
	top:20%;
	width:75%;
	height:70%;
	padding:10px;
	transition:.8s;
	border-radius:5px;
	background-color:white;

	&:hover{
		box-shadow: 1px 1px 1px 1px #999a9b;

	}

`;

const GeneralMessageContainer = styled.div`

	position:absolute;
	width:100%;
	height:100%;
	background-color:white;
	z-index:5;
	border-radius:5px;

`;


const testerdata = [

	{
		user:"1"
	},
	{
		user:"2"
	}
]





class LargeChatComponent extends Component{


	constructor(props){
		super(props);

		this.state={
			expandedDiv:false


		}
	}

	handleBackButton = ()=>{

		document.getElementById("container").style.width="100%";
		document.getElementById("container").style.left="0%";

		this.setState({

			expandedDiv:false
		})
	}

	expandMessageFunction=(messageId)=>{

		document.getElementById("container").style.width="210%";
		document.getElementById("container").style.left="-49%";
		
		this.setState({

			expandedDiv:true
		})
	}


	expandedOrMinimizeDiv = () =>{

		return this.state.expandedDiv ? this.expandedChat() : this.minimizedChat();
	}

	minimizedChat = () =>{
		return  <GeneralMessageContainer>
					<SearchContainer>

						<SearchTextFieled placeholder="Search for someone here">

						</SearchTextFieled>

						<SearchButton/>
					</SearchContainer>

					<MessagesContainer>
					
						<ul style={{position:"relative", left:"-30px"}}>

							{testerdata.map(data=>

								<li style={{listStyle:"none", marginBottom:"20px"}}>

									<BroadChatMessages

										usertest={data.user}
										focusOnMessage={this.expandMessageFunction}

									/>

								</li>
							)}

						</ul>
					 	

					</MessagesContainer>
				</GeneralMessageContainer>;

	}

	expandedChat = () =>{
		return <ExpandedChatDisplay/>;
	}

	render(){


		return(
			<Container id="container">

				{this.expandedOrMinimizeDiv()}

			</Container>

		)
	}
}

export default LargeChatComponent;