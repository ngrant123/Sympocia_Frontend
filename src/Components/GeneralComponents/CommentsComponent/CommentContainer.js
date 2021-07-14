import React,{Component} from "react";
import styled from "styled-components";
import {getRegularComments,
		getRepliesFromComment
	} from "../../../Actions/Requests/PostAxiosRequests/PostPageGetRequests.js";
import {
	createComment,
	createReply,
	deleteCommentOrReply
} from "../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js"
import NoProfilePicture from "../../../designs/img/NoProfilePicture.png";
import {connect} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../Actions/Tasks/index.js";
import {
		setPersonalProfileAccessToken,
		setPersonalProfileRefreshToken
} from "../../../Actions/Redux/Actions/PersonalProfile.js"; 
import {Link} from "react-router-dom";

const Container=styled.div`
	padding:10px;
	@media screen and (max-width:1370px){
		#commentOwnerProfilePicture{
			height:40px !important;
		}
	}
	@media screen and (max-width:650px){
		height:80% !important;
		#commentDIVLI{
			margin-bottom:20% !important;
		}
		#profilePictureLI{
			height:120% !important;
		}
		#replyCommentLI{
			margin-top:-80% !important;
		}
		#replyLIImage{
			height:30px !important;
			width:30px !important;
		}

		#replyDiv{
			margin-left:1% !important;
			width:75% !important;
		}
		#replyLI{
			margin-left:-20% !important;
		}
    }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	#commentDIVLI{
			margin-left:-5% !important;
		}
		#commentOwnerProfilePicture{
			height:40px !important;
		}
		#replyLI{
			margin-left:-15% !important;
		}
		#replyDiv{
			margin-left:10% !important;
			width:75% !important;
		}

		#replyCreateCloseOption{
			margin-left:5% !important;
		}
	}

`;

const CommentContainerDiv=styled.div`
	position:relative;
	width:50%;
`;

const CommentCreationContainer=styled.div`
	position:relative;
	width:250px;
	height:10%;
	background-color:white;
	border-radius:10px;
	border-style:solid;
	border-width:1px;
	border-color:#a2a2a2;
`;
const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	width:100%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;



const ExtendedTextArea=styled.textarea`
	position:relative;
	width:100%;
	height:250px;
	background-color:white;
	border-radius:10px;
	border-style:solid;
	border-width:1px;
	border-color:#a2a2a2;
	margin-bottom:10px;
	resize:none;

	@media screen and (max-width:1370px){
		height:50%;
	}

	@media screen and (max-width:650px){
		height:200px !important;
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	width:90%;
    	margin-left:5%;
	}
`;

const ExtendedProfilePicture=styled.div`
	position:relative;
	width:35px;
	height:90%;
	background-color:red;
	border-radius:50%;

`;

const CommentTextArea=styled.textarea`
	resize:none;
	border-style:none;
	height:90%;
`;

const OwnerProfilePictureLink=styled(Link)`
	listStyle:none;
	display:inline-block;
	margin-right:10px
`;

const CommentText=styled.div`
	position:relative;
	width:80%;
	margin-left:10px;
	margin-top:2%;
`;

const ProfilePicture={
	position:"relative",
	width:"40px",
	height:"40px",
	borderRadius:"50%"
}

const ExtendedCommentAreaButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"5%"
}

const ShadowButtonCSS={
	display:"inline-block",
	listStyle:"none",
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	marginRight:"5px",
	borderRadius:"5px",
	borderStyle:"none",
	marginRight:"10%",
	marginBottom:"2%",
	cursor:"pointer",
	marginTop:"5%"
}




class CommentsContainer extends Component{


	constructor(props){
		super(props);
		this.state={
			comments:[],
			displayResponses:false,
			keyToDisplayRespones:null,
			keyToDisplayReplyCreation:null,
			extendCreationAreaa:false,
			creationCommentExtended:false,
			displayReplyCreation:false,
			selectedReplies:[],
			commentIndex:0,
			isProcessingInput:false,
			isProcessingReplyInput:false,
			isProcessingReplyFetchRequest:false,
			isCreatingComment:false,
			selectedCommentPoolId:"",
			selectedFetchRepliesIndex:0
		}
	}
	async componentDidMount(){
		await this.fetchData();
	}

	componentDidUpdate(){
		if(this.props.selectedCommentPoolId!=this.state.selectedCommentPoolId){
			this.setState({
				selectedCommentPoolId:this.props.selectedCommentPoolId==null?"":
									this.props.selectedCommentPoolId
			},async()=>{
				await this.fetchData();
			})
		}
	}

	fetchData=async()=>{
		this.setState({
			isProcessingInput:true
		})
		const {confirmation,data}=await getRegularComments(
										this.props.postType,
										this.props.postId,
										this.state.selectedCommentPoolId
									);
		if(confirmation=="Success"){
			const {message}=data;
			this.setState({
				comments:message
			})
		}else{
			alert('Unfortunately, there has been an error. Please try again');
		}
		this.setState({
			isProcessingInput:false
		})
	}


	replyComment=(data,index)=>{
		const postOwnerId=this.props.ownerId==null?this.props.ownerId._id:this.props.ownerId
		return <ul style={{marginBottom:"20px",marginTop:"5%"}}>
				<li style={{listStyle:"none",display:"inline-block",marginRight:"20px"}}>
					<ul style={{padding:"0px"}}>
						<Link to={{pathname:`/profile/${data.ownerObject.owner._id}`}}>
							<li style={{cursor:"pointer",listStyle:"none",display:"inline-block",
								marginRight:"10px"}}>
								<img id="replyLIImage" 
									src={data.ownerObject.profilePicture==null?
										NoProfilePicture:data.ownerObject.profilePicture}
								style={ProfilePicture}/>
							</li>
						</Link>
						<li style={{listStyle:"none",display:"inline-block"}}>
							<b>{data.ownerObject.owner.firstName}</b>
						</li>
					</ul>
				</li>
				<CommentText>
					{data.comment}
				</CommentText>

				{(this.props.isOligarch==true || this.props.personalState.id==postOwnerId
					|| data.ownerObject.owner._id==this.props.personalState.id)==true &&(
					<div onClick={()=>this.triggerDeleteCommentOrReply({
						isAccessTokenUpdated:false,
						commentId:data._id,
						targetIndex:index,
						isReplyDeletion:true
					})}>
						{this.deleteCommentIcon()}
					</div>
				)}

			 </ul>
	}
	handleReplyFetch=async(commentId,index)=>{
		const replyObject={
			postType:this.props.postType,
			postId:this.props.postId,
			commentId
		}
		this.setState({
			isProcessingReplyFetchRequest:true,
			selectedFetchRepliesIndex:index
		})

		const {confirmation,data}=await getRepliesFromComment(replyObject);
		
		if(confirmation=="Success"){
			const {message}=data;
			this.setState({
				keyToDisplayRespones:commentId,
				displayResponses:true,
				selectedReplies:message
			});
		}else{
			alert('Unfortunately there has been an error getting the replies. Please try again');
		}
		this.setState({
			isProcessingReplyFetchRequest:false
		})
	}

	triggerReply=(data,index)=>{
		if(this.props.isGuestProfile){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free')
		}else{
			this.setState({
				displayReplyCreation:true,
				keyToDisplayReplyCreation:data._id,
				commentIndex:index
			}) 												
		}
	}

	deleteCommentIcon=()=>{
		return(
			<svg id="removePostOption" 
				 xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash"
				width="50" height="50" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6e6e6e" fill="none"
				stroke-linecap="round" stroke-linejoin="round" style={ShadowButtonCSS}>
			  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
			  <line x1="4" y1="7" x2="20" y2="7" />
			  <line x1="10" y1="11" x2="10" y2="17" />
			  <line x1="14" y1="11" x2="14" y2="17" />
			  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
			  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
			</svg>
		)
	}

	triggerDeleteCommentOrReply=async({isAccessTokenUpdated,updatedAccessToken,commentId,targetIndex,isReplyDeletion})=>{
		const {confirmation,data}=await deleteCommentOrReply(
											commentId,
											this.props.personalState.id,
											isAccessTokenUpdated==true?updatedAccessToken:
											this.props.personalState.accessToken,
											this.props.symposiumId)
		if(confirmation=="Success"){
			if(isReplyDeletion==true){
				const replies=this.state.selectedReplies;
				replies.splice(targetIndex,1);
				this.setState({
					replies
				})
			}else{
				const comments=this.state.comments;
				comments.splice(targetIndex,1);
				this.setState({
					comments
				})	
			}
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						this.props.personalState.refreshToken,
						this.props.personalState.id,
						this.triggerDeleteCommentOrReply,
						this.props,
						{
							commentId,
							targetIndex,
							isReplyDeletion
						},
						true
					);
			}else{
				alert('Unfortunately an error has occured. Please try again');
			}
		}
	}
	commentComponent=(data,index)=>{
		const postOwnerId=this.props.ownerId==null?this.props.ownerId._id:this.props.ownerId

		return <ul style={{marginBottom:"20px",marginTop:"5%"}}>
				<li style={{listStyle:"none",display:"inline-block",marginRight:"20px"}}>
					<ul style={{padding:"0px"}}>
						<OwnerProfilePictureLink to={{pathname:`/profile/${data.ownerObject.owner._id}`}}>
							<img id="commentOwnerProfilePicture" 
								src={data.ownerObject.profilePicture==null?
									NoProfilePicture:data.ownerObject.profilePicture}
							style={ProfilePicture}/>
						</OwnerProfilePictureLink>
						<li style={{listStyle:"none",display:"inline-block"}}>
							<b>{data.ownerObject.owner.firstName}</b>
						</li>
					</ul>
				</li>
				<CommentText>
					{data.comment}
				</CommentText>
				<li style={{listStyle:"none",marginTop:"5%"}}>
					<ul style={{padding:"0px"}}>
						{this.state.isProcessingReplyFetchRequest==true &&
							index==this.state.selectedFetchRepliesIndex?
							<p>Please wait...</p>:
							<>
								{data.containsReplies==true &&(
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li style={{listStyle:"none",display:"inline-block",marginRight:"5%",marginBottom:"5px"}}
											 onClick={()=>this.handleReplyFetch(data._id,index)}>

											<b>View replies </b>
										</li>
									</a>
								)}
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li onClick={()=>this.triggerReply(data,index)} style={{listStyle:"none",display:"inline-block"}}>
										Reply
									</li>
								</a>
							</>
						}
					</ul>
				</li>
				{(this.props.isOligarch==true || this.props.personalState.id==postOwnerId
					|| data.ownerObject.owner._id==this.props.personalState.id)==true &&(
					<div onClick={()=>this.triggerDeleteCommentOrReply({
						isAccessTokenUpdated:false,
						commentId:data._id,
						targetIndex:index
					})}>
						{this.deleteCommentIcon()}
					</div>
				)}
			</ul>
	}

	handleCreateComment=async({isAccessTokenUpdated,updatedAccessToken})=>{
		this.setState({isCreatingComment:true});
		const comment=document.getElementById("comment").value;
		const isPersonalProfileIndicator=this.props.personalState.loggedIn==true?true:false;
		const profileObject={
			isPersonalProfile:isPersonalProfileIndicator,
			profileId:isPersonalProfileIndicator==true?this.props.personalState.id:
														this.props.companyState.id
		}
		if(comment!=""){
			let {confirmation,data}=await createComment(
												this.props.personalState.id,
												this.props.postType,
												this.props.postId,
												comment,
												profileObject,
												isAccessTokenUpdated==true?updatedAccessToken:
												this.props.personalState.accessToken,
												this.props.ownerId,
												this.state.selectedCommentPoolId
											);

			
			if(confirmation=="Success"){
				data=data.message;
				data={
					...data,
					ownerObject:{
						...data.ownerObject,
						owner:{
							...data.ownerObject.owner,
							firstName:this.props.personalState.firstName
						}
					}
				}
				var currentComments=this.state.comments;
				currentComments.splice(0,0,data);
				this.setState({
					comments:currentComments,
					creationCommentExtended:false
				})

			}else{
				
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
							this.props.personalState.refreshToken,
							this.props.personalState.id,
							this.handleCreateComment,
							this.props,
							{},
							true
						);
				}else{
					alert('Unfortunately an error has occured please submit your comment again');
				}
			}
		}else{
			alert('Please enter a comment');
		}
		this.setState({
			isProcessingInput:false,
			isCreatingComment:false
		})
	}

	triggerDisplayAddComment=()=>{
		if(this.props.isGuestProfile){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free')
		}else{
			this.setState({
				creationCommentExtended:true
			})
		}
	}

	createCommentUI=()=>{
		return <>
					{this.state.creationCommentExtended==false?
						<InputContainer onClick={()=>this.triggerDisplayAddComment()} 
							placeholder="Add a comment"
						/>:
						<>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none"}}>
									<ExtendedTextArea id="comment" />
								</li>
								<li style={{listStyle:"none"}}>
									{this.state.isCreatingComment==true?
										<p>Please wait...</p>:
										<ul style={{padding:"0px"}}>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li  onClick={()=>this.handleCreateComment({isAccessTokenUpdated:false})} style={ExtendedCommentAreaButton}>
													Create
												</li>
											</a>

											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li onClick={()=>this.setState({creationCommentExtended:false})} style={ExtendedCommentAreaButton}>
													Close
												</li>
											</a>
										</ul>
									}
								</li>
							</ul>
						</>
					}
			   </>
	}

	handleDisplayResponses=(key)=>{
		if(key==this.state.keyToDisplayRespones){
			return <ul id="replyDiv" style={{borderStyle:"solid",borderWidth:"1px",borderColor:"#D8D8D8",borderRadius:"5px"}}>
						<li onClick={()=>this.setState({keyToDisplayRespones:null})} style={{marginRight:"80%",listStyle:"none"}}>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" 
								  width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#03A9F4" fill="none" 
								  stroke-linecap="round" stroke-linejoin="round">
									  <path stroke="none" d="M0 0h24v24H0z"/>
									  <circle cx="12" cy="12" r="9" />
									  <path d="M10 10l4 4m0 -4l-4 4" />
								</svg>
							</a>
						</li>

						<li style={{listStyle:"none",marginTop:"5%"}}>
							<ul style={{padding:"0px"}}>
								{this.state.selectedReplies.map((data,index)=>
									<li id="replyLI" style={{listStyle:"none"}}>
										{this.replyComment(data,index)}
									</li>
								)}
							</ul>
						</li>
					</ul>
		}else{
			return <React.Fragment>
					</React.Fragment>
		}
	} 


	handleCreateReply=async({isAccessTokenUpdated,updatedAccessToken,commentOwnerId})=>{
		this.setState({
			isProcessingReplyInput:true
		})
		const reply=document.getElementById("reply").value;
		const isPersonalProfileIndicator=this.props.personalState.loggedIn==true?true:false;
		const profileObject={
			isPersonalProfile:isPersonalProfileIndicator,
			profileId:isPersonalProfileIndicator==true?this.props.personalState.id:
														this.props.companyState.id
		}
		if(reply!=""){
			const replyObject={
				postType:this.props.postType,
				commentId:this.state.keyToDisplayReplyCreation,
				reply:reply,
				profileObject:profileObject,
				postId:this.props.postId,
				accessToken:isAccessTokenUpdated==true?updatedAccessToken:
							this.props.personalState.accessToken,
				ownerId:commentOwnerId
			}


			const {confirmation,data}=await createReply(replyObject);
			if(confirmation=="Success"){
				var currentReplies=this.state.selectedReplies;
				var newReply={
					reply:reply,
					ownerObject:{
						owner:{
							firstName:isPersonalProfileIndicator==true?this.props.personalState.firstName:
							this.props.companyState.companyName
						},
						profilePicture:data.profilePicture
					}
				}

				currentReplies.splice(0,0,newReply);

				//Add this temporarily to the appropriate comment so user can see 
				
				var newComments=this.state.comments
				for(var i=0;i<newComments.length;i++){
					const iterationCommentId=newComments[i]._id;
					if(iterationCommentId==this.state.keyToDisplayReplyCreation){
						newComments[i].replies=currentReplies;
						newComments[i].containsReplies=true;
						break;
					}
				}

				this.setState({
					selectedReplies:currentReplies,
					displayReplyCreation:false,
					comments:newComments
				})
			}else{
						
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
							this.props.personalState.refreshToken,
							this.props.personalState.id,
							this.handleCreateReply,
							this.props,
							{commentOwnerId},
							true
						);
				}else{
					alert('Unfortunately an error has occured please submit your comment again');
				}
			}
		}else{
			alert('Please enter a comment');
		}
		this.setState({
			isProcessingInput:false,
			isProcessingReplyInput:false
		})
	}

	createReplyComment=(key,commentOwnerId)=>{
		if(key==this.state.keyToDisplayReplyCreation && this.state.displayReplyCreation==true){
			return <ul style={{padding:"0px",backgroundColor:"white"}}>
						<li style={{listStyle:"none"}}>
							<ExtendedTextArea id="reply"/>
						</li>
						<li id="replyCreateCloseOption" style={{listStyle:"none"}}>
							{this.state.isProcessingReplyInput==true?
								<p>Please wait...</p>:
								<ul style={{padding:"0px"}}>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li  onClick={()=>this.handleCreateReply({isAccessTokenUpdated:false,commentOwnerId})} 
											style={ExtendedCommentAreaButton}>
											Create
										</li>
									</a>

									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>this.setState({displayReplyCreation:false})} style={ExtendedCommentAreaButton}>
											Close
										</li>
									</a>
								</ul>
							}
						</li>
					</ul>
		}else{
			return <React.Fragment>
					</React.Fragment>
		}
	}


	render(){
		return(
			<Container>
				{this.state.isProcessingInput==true?
					<p>Please wait </p>:
					<>
						{this.createCommentUI()}
						{this.state.comments.map((data,index)=>
							<li id="commentDIVLI" 
								 style={{padding:"0px",listStyle:"none",marginBottom:"10px"}}
								 key={data._id}>
								{this.commentComponent(data,index)}
								{this.createReplyComment(data._id,data.ownerObject.owner._id)}
								{this.handleDisplayResponses(data._id)}
							</li>
						)}
					</>
				}
			</Container>
		)
	}
}
const mapStateToProps=(state)=>{
	return{
		personalState:state.personalInformation,
		companyState:state.personalInformation
	}
}

const mapDispatchToProps=dispatch=>{
	return{
		setPersonalProfileAccessToken:(accessToken)=>dispatch(setPersonalProfileAccessToken(accessToken)),
		setPersonalProfileRefreshToken:(refreshToken)=>dispatch(setPersonalProfileRefreshToken(refreshToken))
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CommentsContainer);
