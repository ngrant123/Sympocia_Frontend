import React,{ Component } from "react";
import styled from "styled-components";



class ChatMessages extends Component{

	constructor(props){
		console.log(props);
		super(props);

		this.state={
			chatType:props.chatType,
			value:""
		}
	} 

	componentDidMount(){
		console.log(this.state.chatType);
			if(this.state.chatType=="Image Message5"){
				var testercontainer=document.getElementById("tester").style.left="20%";
				return testercontainer;

			}
			else{
				return <p> {this.state.chatType} </p>;

			}
	}



	render(){

		return(

			<React.Fragment>
				<div id="tester" style={{position:"relative",backgroundColor:"blue"}}>
				</div>

			</React.Fragment>

		)
	}
}

export default ChatMessages;