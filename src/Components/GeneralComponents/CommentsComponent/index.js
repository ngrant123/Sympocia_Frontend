import React,{Component} from "react";
import styled from "styled-components";
import CommentContainer from "./CommentContainer.js";
import VideoResponseContainer from "./VideosResponseContainer.js";
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import CommentPoolCreation from "./CommentPoolCreationPortal.js";
import DeleteCommentPool from "./DeleteCommentPortal.js";


const Container=styled.div`
	position:relative;
	height:100%;
	width:100%;
	@media screen and (max-width:700px){
		#containerUL{
			width:100% !important;
		}
		#commentLI{
			width:90px !important;
		}
		#videoCommentLI{
			width:10px !important;
		}
    }
`;

const CommentsTitleContainer=styled.div`
	padding:5px;
	transition:.8s;
	cursor:pointer; 

	@media screen and (max-width:650px){
		#dropDownUL{
			width:200px !important;
			margin-left:-20px !important;
		}
	}
`;

const VideoResponesTitleContainer=styled.div`
	padding:5px;
	color:#848484;
	transition:.8s;
	cursor:pointer;

	@media screen and (max-width:650px){
		#dropDownUL{
			width:200px !important;
			margin-left:-110px !important;
		}
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

const ExploreButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"#3898ec",
  borderRadius:"5px",
  padding:"5px",
  color:"white",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  cursor:"pointer"
}

const ShadowButtonCSS={
	display:"inline-block",
	listStyle:"none",
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	borderRadius:"50%",
	borderStyle:"none",
	marginRight:"5%",
	marginBottom:"2%",
	cursor:"pointer"
}




class CommentsContainer extends Component{

	constructor(props){
		super(props);
		this.state={
			displayResponses:false,
			displayCommentsOrVideoResponses:true,
			createVideoResponses:false,
			displayPhoneUI:false,
			selectedType:"Comments",
			displayCommentPoolCreationPortal:false,
			displayDeleteCommentPool:false,
			selectedCommentPool:null,
			currentCommentPools:[],
			commentType:"RegularComment",
			selectedCommentPools_Regular:this.props.selectedCommentPools.regularCommentPool,
			selectedCommentPools_Video:this.props.selectedCommentPools.videoCommentPool,
			selectedCommentId:"",
			selectedCommentPoolDescription:"General"
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

		const  commentsElement=document.getElementById("commentsTitleContainer");
		commentsElement.style.borderBottom="solid";
		commentsElement.style.borderWidth="2px";
		commentsElement.style.borderColor="#C8B0F4";
		commentsElement.style.color="#C8B0F4";
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
				ownerId={this.props.ownerId}
				selectedCommentPoolId={this.state.selectedCommentId}
			/>:
			<VideoResponseContainer
				postType={this.props.postType}
				postId={this.props.postId}
				displayCreationPrompt={this.state.createVideoResponses}
				closeVideoCreationModal={this.closeModal}
				targetContainer={this.props.targetDom}
				isGuestProfile={this.props.isGuestProfile}
				selectedCommentPoolId={this.state.selectedCommentId}
				displayPhoneUI={this.state.displayPhoneUI}
				ownerId={this.props.ownerId}
			/>
	}

	handleDisplayComments=()=>{

		const  commentsElement=document.getElementById("commentsTitleContainer");
		const videoResponsesElement=document.getElementById("videoResponsesTitleContainer");


		commentsElement.style.borderBottom="solid";
		commentsElement.style.borderWidth="2px";
		commentsElement.style.borderColor="#C8B0F4";
		commentsElement.style.color="#C8B0F4";

		if(videoResponsesElement!=null){	
			videoResponsesElement.style.color="#848484";
			videoResponsesElement.style.borderStyle="none";
		}

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

	triggerDeleteCommentPool=(selectedCommentPool,index,commentType,commentPools)=>{
		this.setState({
			displayDeleteCommentPool:true,
			selectedCommentPool:{
				...selectedCommentPool,
				index
			},
			commentType,
			currentCommentPools:commentPools
		})
	}
	commentPoolComponent=(commentType)=>{
		const commentPools=commentType=="VideoComment"?this.state.selectedCommentPools_Video:
		this.state.selectedCommentPools_Regular;

		return(
			<ul class="dropdown-menu" 
				id="dropDownUL"
				style={{color:"#848484",padding:"10px",height:"300px",overflow:"auto",width:"400px"}}>
				{this.props.isOwnProfile==true &&(
					<>
						<div onClick={()=>this.setState({
							displayCommentPoolCreationPortal:true,
							currentCommentPools:commentPools,
							commentType
						})}
							style={ExploreButton}>
							Create Comment Pool
						</div>
						<hr/>
					</>
				)}
				<p onClick={()=>this.setState({
								selectedCommentId:"",
								selectedCommentPoolDescription:"General"
							})}>General</p>
				<hr/>
				{commentPools.map((data,index)=>
					<React.Fragment>
						<div onClick={()=>this.setState({
											selectedCommentId:data._id,
											selectedCommentPoolDescription:data.description})} 
							style={{display:"flex",flexDirection:"row"}}>
							<p style={{marginRight:"5%"}}>{data.description}</p>
							{this.props.isOwnProfile==true &&(
								<svg id="removePostOption"
									onClick={()=>this.triggerDeleteCommentPool(
															data,
															index,
															commentType,
															commentPools)}
									xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash"
									width="35" height="35" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6e6e6e" fill="none"
									stroke-linecap="round" stroke-linejoin="round" style={ShadowButtonCSS}>
								  	<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
								 	<line x1="4" y1="7" x2="20" y2="7" />
								  	<line x1="10" y1="11" x2="10" y2="17" />
								  	<line x1="14" y1="11" x2="14" y2="17" />
								  	<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
								  	<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
								</svg>
							)}
						</div>
						<hr/>
					</React.Fragment>
				)}
			</ul>
		)
	}
	commentOptions=()=>{
		return(
			<ul style={{padding:"0px",marginTop:"2%"}}>

				<li style={{listStyle:"none",fontSize:"15px",marginRight:"10%"}}>
					Selected comment pool: <b>{this.state.selectedCommentPoolDescription}</b>
				</li>
				<li id="commentLI" 
				style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginRight:"10%"}}>
					<CommentsTitleContainer commentType={"RegularComment"}
						onClick={()=>this.handleDisplayComments()}>
						<div class="dropdown">
							<button id="commentsTitleContainer" class="btn btn-primary dropdown-toggle" 
								type="button" data-toggle="dropdown" 
								style={{color:"#C8B0F4",borderRadius:"0px",backgroundColor:"white",borderStyle:"none"}}>
								
								Comments

							   	<ArrowDropDownCircleOutlinedIcon style={{marginLeft:"5%"}}/>
							</button>
							{this.commentPoolComponent("RegularComment")}
					  	</div>
					</CommentsTitleContainer>
				</li>
				{this.props.postType!="RegularPosts" &&(
					<li  id="videoCommentLI"
						style={{listStyle:"none",display:"inline-block",fontSize:"20px"}}>
						<VideoResponesTitleContainer commentType={"VideoComment"}
							onClick={()=>this.handleDisplayVideoResponses()}>
							<div class="dropdown">
								<button id="videoResponsesTitleContainer" class="btn btn-primary dropdown-toggle" 
									type="button" data-toggle="dropdown" 
									style={{color:"#848484",borderRadius:"0px",backgroundColor:"white",borderStyle:"none"}}>
									
									Video Responses

								   	<ArrowDropDownCircleOutlinedIcon style={{marginLeft:"5%"}}/>
								</button>
								{this.commentPoolComponent("VideoComment")}
						  	</div>
						</VideoResponesTitleContainer>
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

	closeCommentPoolIdPortal=()=>{
		this.setState({
			displayCommentPoolCreationPortal:false
		})
	}
	updateCommentPools=(updatedCommentPools)=>{
		let updateCommentParam=this.state.commentType=="VideoComment"?this.state.selectedCommentPools_Video
		:this.state.selectedCommentPools_Regular;

		this.setState({
			[updateCommentParam]:updatedCommentPools,
			displayCommentPoolCreationPortal:false
		})
	}

	commentPoolCreationPortal=()=>{
		return(
			<React.Fragment>
				{this.state.displayCommentPoolCreationPortal==true &&(
					<CommentPoolCreation
						closeModal={this.closeCommentPoolIdPortal}
						currentCommentPools={this.state.currentCommentPools}
						addCommentPool={this.updateCommentPools}
						commentType={this.state.commentType}
						postType={this.props.postType}
						postId={this.props.postId}
						targetContainer={this.props.targetDom}
					/>
				)}
			</React.Fragment>
		)
	}

	closeDeleteCommentPortal=()=>{
		this.setState({
			displayDeleteCommentPool:false
		})
	}
	updateCommentPoolsAfterDeletion=(updatedCommentPools)=>{
		let updateCommentParam=this.state.commentType=="VideoComment"?this.state.selectedCommentPools_Video
		:this.state.selectedCommentPools_Regular;

		this.setState({
			[updateCommentParam]:updatedCommentPools,
			displayDeleteCommentPool:false
		})

	}

	deleteCommentPoolPortal=()=>{
		return(
			<React.Fragment>
				{this.state.displayDeleteCommentPool==true &&(
					<DeleteCommentPool
						closeModal={this.closeDeleteCommentPortal}
						selectedCommentPool={this.state.selectedCommentPool}
						updateCommentPoolsAfterDeletion={this.updateCommentPoolsAfterDeletion}
						currentCommentPools={this.state.currentCommentPools}
						commentType={this.state.commentType}
						postType={this.props.postType}
						postId={this.props.postId}
						targetContainer={this.props.targetDom}
					/>
				)}
			</React.Fragment>
		)
	}


	render(){
		return(
			<Container>
				{this.commentPoolCreationPortal()}
				{this.deleteCommentPoolPortal()}

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
					<li style={{marginBottom:"5%",listStyle:"none"}}>
						{this.commentOptions()}
					</li>
					<hr/>
					{/*
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
					*/}
					{this.displayCommentsOrVideoResponses()}
				</ul>
			</Container>
		)
	}
}

export default CommentsContainer;