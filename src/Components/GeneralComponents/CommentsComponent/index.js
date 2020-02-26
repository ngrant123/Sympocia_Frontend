import React,{Component} from "react";
import styled from "styled-components";
import CommentContainer from "./CommentContainer.js";
import VideoResponseContainer from "./VideosResponseContainer.js";

const CommentsTitleContainer=styled.div`
	padding:5px;
	color:#C8B0F4;
	border-bottom:solid;
	border-width:2px;
	border-color:#C8B0F4;
	transition:.8s;

	&:hover{
		box-shadow: 1px 1px 1px #d5d5d5;

	}
`;

const VideoResponesTitleContainer=styled.div`
	padding:5px;
	color:#848484;
	transition:.8s;

	&:hover{
		box-shadow: 1px 1px 1px #d5d5d5;

	}
`;


class CommentsContainer extends Component{

	constructor(props){

		super(props);
		this.state={
			comments:[
			{
				originalComment:"Testing out comment system",
				response:[
						{
							owner:"Nathan",
							response:"This is just a tester response"
						},
						{
							owner:"Nathan",
							response:"This is just a tester response"
						}
					]
			},
			{
				originalComment:"Testing out comment system",
				response:[
						{
							owner:"Nathan",
							response:"This is just a tester response"
						}
					]
			},
			{
				originalComment:"Testing out comment system",
				response:[
						{
							owner:"Nathan",
							response:"This is just a tester response"
						},
						{
							owner:"Nathan",
							response:"This is just a tester response"
						},
						{
							owner:"Nathan",
							response:"This is just a tester response"
						},
						{
							owner:"Nathan",
							response:"This is just a tester response"
						}
					]
			},
			{
				originalComment:"Testing out comment system",
				response:[]
			}
			],
			displayResponses:false,
			displayCommentsOrVideoResponses:true
		}
	}
	componentDidMount(){


	}
	displayCommentsOrVideoResponses=()=>{

		return this.state.displayCommentsOrVideoResponses==true?
			<CommentContainer/>:
			<VideoResponseContainer/>
	}

	handleDisplayComments=()=>{

		const  commentsElement=document.getElementById("commentsTitleContainer");
		const videoResponsesElement=document.getElementById("videoResponsesTitleContainer");


		commentsElement.style.borderBottom="solid";
		commentsElement.style.borderWidth="2px";
		commentsElement.style.borderColor="#C8B0F4";
		commentsElement.style.color="#C8B0F4";


		videoResponsesElement.style.color="#848484";
		videoResponsesElement.style.borderStyle="none";

		this.setState({
			displayCommentsOrVideoResponses:true	
		})

	}

	handleDisplayVideoResponses=()=>{


		const  commentsElement=document.getElementById("commentsTitleContainer");
		const videoResponsesElement=document.getElementById("videoResponsesTitleContainer");


		videoResponsesElement.style.borderBottom="solid";
		videoResponsesElement.style.borderWidth="2px";
		videoResponsesElement.style.borderColor="#C8B0F4";
		videoResponsesElement.style.color="#C8B0F4";

		commentsElement.style.color="#848484";
		commentsElement.style.borderStyle="none";

		this.setState({
			displayCommentsOrVideoResponses:false	
		})

	}


	render(){

		return(
			<React.Fragment>
				<ul style={{padding:"0px",backgroundColor:"white"}}>
					<li style={{marginBottom:"5%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"10%",marginRight:"10%"}}>
								<CommentsTitleContainer id="commentsTitleContainer" onClick={()=>this.handleDisplayComments()}>
									Comments
								</CommentsTitleContainer>
							</li>

							<li  style={{listStyle:"none",display:"inline-block",fontSize:"20px"}}>
								<VideoResponesTitleContainer id="videoResponsesTitleContainer" onClick={()=>this.handleDisplayVideoResponses()}>
									Video Responses
								</VideoResponesTitleContainer>

							</li>
						</ul>
					</li>
					{this.displayCommentsOrVideoResponses()}
					
				</ul>

			</React.Fragment>

		)
	}
}

export default CommentsContainer;