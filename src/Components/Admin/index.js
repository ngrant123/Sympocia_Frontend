import React,{Component} from "react";
import styled from "styled-components";
import UploadInterview from "./UploadInterview.js";
import UploadPost from "./UploadPost.js";
import {verifyAdmin} from "../../Actions/Requests/AdminRequests.js";


const Container=styled.div`
	display:flex;
	flex-direction:row;
`;

const LoginPanel=styled.div`
	display:flex;
	flex-direction:row;
	justify-content:center;
	margin-top:20%;
	margin-left:40%;
`;

const ChoicesPanel=styled.div`
	display:flex;
	flex-direction:row;
	margin-top:20%;
`;

const UploadInterviewContainer=styled.div`
	margin-top:10%;
	display:flex;
	flex-direction:column;
`;

const ButtonContainer={
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  cursor:"pointer",
  marginRight:"5%",
  marginBottom:"5%"
}


class Admin extends Component{

	constructor(props){
		super(props);
		this.state={
			displayLoginPanel:true,
			uploadInterview:false,
			displayChoicesPanel:false,
			uploadPosts:false
		}
	}

	handleSubmitToken=async()=>{
		const token=document.getElementById("entranceToken").value;
		const {confirmation,data}=await verifyAdmin(token);
		if(confirmation=="Success"){
			if(data==false){
				alert('Incorrect token. Please try again');
			}else{
				this.setState({
					displayLoginPanel:false,
					uploadInterview:false,
					displayChoicesPanel:false,
					uploadPosts:true
				})
			}
		}else{
			alert('Incorrect token');
		}
	}

	loginPanel=()=>{
		return (
			<>
				{this.state.displayLoginPanel==true &&(
					<LoginPanel>
						<input id="entranceToken" style={{marginRight:"2%"}} placeholder="Enter the token"/>
						<button onClick={()=>this.handleSubmitToken()}> Submit</button>
					</LoginPanel>
				)}
			</>
		)
	}

	adminChoicePanel=()=>{
		return(
			<>
				{(this.state.displayLoginPanel==false && this.state.displayChoicesPanel==true) &&(
					<ChoicesPanel>
						<div style={ButtonContainer}>
							Upload Interview
						</div>

						<div style={ButtonContainer}>
							Upload Posts
						</div>
					</ChoicesPanel>
				)}
			</>
		)
	}

	displayUploadInterviewPanel=()=>{
		return(
			<>
				{this.state.uploadInterview==true &&(
					<UploadInterview/>
				)}
			</>
		)
	}
	closePostModal=()=>{
		this.setState({
			displayLoginPanel:true,
			uploadInterview:false,
			displayChoicesPanel:false,
			uploadPosts:false
		})
	}

	displayUploadPostsPanel=()=>{
		return(
			<>
				{this.state.uploadPosts==true &&(
					<UploadPost
						closeUploadPostModal={this.closePostModal}
					/>
				)}
			</>
		)
	}

	render(){
		return(
			<Container>
				{this.loginPanel()}
				{this.adminChoicePanel()}
				{this.displayUploadInterviewPanel()}
				{this.displayUploadPostsPanel()}
			</Container>
		)
	}
}

export default Admin;