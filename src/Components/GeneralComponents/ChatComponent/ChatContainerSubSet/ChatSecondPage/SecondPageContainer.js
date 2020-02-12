import React,{Component} from "react";
import styled from "styled-components";
import RecentChatContainer from "./RecentChatContainer.js";
import Chat from "./Chat.js";
import ChatCreationArea from "./ChatCreationArea";
import AdditionalInformation from "./AdditionalInformation.js";

const Container=styled.div`
	position:fixed;
	width:60%;
	height:65%;
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

class SecondPageContainer extends Component{



	constructor(props){
		super(props);
		console.log(props);

		this.state={
			displayAdditionalInformation:false
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




	render(){

		return(
			<Container>
				{this.handleDisplayMoreInformation()}
				<RecentChatContainer
					friends={this.props.friends}
				/>
				<Chat/>
				<ChatCreationArea/>
				<AdditionalInfoButton
					onClick={()=>this.setState(prevState=>({
	   				...prevState,
	  				displayAdditionalInformation:true
   				}))}/>
		

			</Container>
		)
	}
}

export default SecondPageContainer;