import React,{Component} from "react";
import styled from "styled-components";
import CommentContainer from "./CommentContainer.js";
import VideoResponseContainer from "./VideosResponseContainer.js";

const Container=styled.div`
	position:relative;
	overflow-y:scroll;
	height:100%;
	width:100%;
	background-color:white;
	@media screen and (max-width:1370px){
		height:500px;

	}
	@media screen and (max-width:700px){
		height:350px !important;
		#containerUL{
			width:100% !important;
		}
    }
`;

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

const BackButtonCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px"
}
const MobileOptionCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginTop:"5%"
}


class CommentsContainer extends Component{

	constructor(props){
		super(props);
		console.log(props);
		this.state={
			displayResponses:false,
			displayCommentsOrVideoResponses:true,
			createVideoResponses:false,
			displayPhoneUI:false,
			selectedType:"Comments"
		}
	}

	triggerUIChange=()=>{
		if(window.innerWidth<700){
			this.setState({
				displayPhoneUI:true
			})
			return true;
		}else{
			this.setState({
				displayPhoneUI:false
			})
			return false;
		}
	}
/*
	As of this moment creating a blog on the mobile is not available because ui for 
	react wysiwyg is booty cheeks so going to temporarily disable it for mobile
*/

	componentDidMount=()=>{
		window.addEventListener('resize',this.triggerUIChange);
		this.triggerUIChange();
	}

	closeModal=()=>{
		this.setState({
			createVideoResponses:!this.state.createVideoResponses
		})
	}
	displayCommentsOrVideoResponses=()=>{

		return this.state.displayCommentsOrVideoResponses==true?
			<CommentContainer
				postType={this.props.postType}
				postId={this.props.postId}
				isGuestProfile={this.props.isGuestProfile}
			/>:
			<VideoResponseContainer
				postType={this.props.postType}
				postId={this.props.postId}
				displayCreationPrompt={this.state.createVideoResponses}
				closeVideoCreationModal={this.closeModal}
				targetContainer={this.props.targetDom}
				isGuestProfile={this.props.isGuestProfile}
			/>
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
			displayCommentsOrVideoResponses:true,
			selectedType:"Comments"
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
			displayCommentsOrVideoResponses:false,
			selectedType:"Video Comments"
		})

	}

	commentOptions=()=>{
		return(
			<ul style={{padding:"0px"}}>
				<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginLeft:"10%",marginRight:"10%"}}>
					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						<CommentsTitleContainer id="commentsTitleContainer" onClick={()=>this.handleDisplayComments()}>
							Comments
						</CommentsTitleContainer>
					</a>
				</li>
				{this.props.postType!="RegularPosts" &&(
					<li  style={{listStyle:"none",display:"inline-block",fontSize:"20px"}}>
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<VideoResponesTitleContainer id="videoResponsesTitleContainer" onClick={()=>this.handleDisplayVideoResponses()}>
								Video Responses
							</VideoResponesTitleContainer>
						</a>
					</li>
				)}
			</ul>
		)
	}

	triggerDisplayVideoComments=()=>{
		if(this.props.isGuestProfile==true){
			 alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free')
		}else{
			if(this.state.displayPhoneUI==true){
				alert('Unfortunately you have to be on a desktop to access this feature. Sorry for the inconvenience');
			}else{
				this.setState({
					createVideoResponses:!this.state.createVideoResponses
				})
			}
		}
	}


	render(){
		return(
			<Container>
				<ul id="containerUL" style={{padding:"0px",backgroundColor:"white"}}>
					<li style={{listStyle:"none"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block",marginRight:"3%",cursor:"pointer"}}
								 onClick={()=>this.props.hideComments()}>
								<p style={BackButtonCSS} onClick={()=>this.props.hideComments()}>
									Back
								</p>
							</li>


							<li onClick={()=>this.triggerDisplayVideoComments()}
																 style={{listStyle:"none",display:"inline-block"}}>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									{this.state.displayCommentsOrVideoResponses==false?
										<p style={BackButtonCSS}>
											Create Video Response
										</p>:null	
									}
								</a>
							</li>
						</ul>
					</li>

					{this.state.displayPhoneUI==true?
						<div class="dropdown">
							<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={MobileOptionCSS}>
								{this.state.selectedType}
								<span class="caret"></span>
							</button>

							<ul class="dropdown-menu">
								{this.commentOptions()}
							</ul>
						</div>
						:<li style={{marginBottom:"5%",listStyle:"none"}}>
							{this.commentOptions()}
						</li>
					}
					{this.displayCommentsOrVideoResponses()}
				</ul>
			</Container>
		)
	}
}

export default CommentsContainer;