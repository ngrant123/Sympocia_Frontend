import React,{Component} from "react";
import styled from "styled-components";
import {getRegularComments,
		getRepliesFromComment
	} from "../../../Actions/Requests/PostAxiosRequests/PostPageGetRequests.js";
import {createComment,createReply} from "../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js"
import NoProfilePicture from "../../../designs/img/NoProfilePicture.png";
import {connect} from "react-redux";

const Container=styled.div`
	@media screen and (max-width:420px){
		#profilePictureLI{
			height:40% !important;
			display:none;
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
	height:40%;
	background-color:white;
	border-radius:10px;
	border-style:solid;
	border-width:1px;
	border-color:#a2a2a2;
	margin-bottom:10px;
	resize:none;
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


const ProfilePicture={
	position:"relative",
	width:"53px",
	height:"13%",
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

const CommentText=styled.div`
	position:relative;
	width:80%;
	margin-left:10px;
	margin-top:2%;
`;

class CommentsContainer extends Component{

/*

	Right now the program just initiliazes the current comment key then stores it in state
	Then after the displayResponses is true it checks if the key matches the this state key
	problem with this is that its continuously re rendering the prop (could be done in a better way)

*/

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
			selectedReplies:[]
		}
	}
	async componentDidMount(){
		const {confirmation,data}=await getRegularComments(this.props.postType,this.props.postId);
		if(confirmation=="Success"){
			console.log(data);
			this.setState({
				comments:data
			})
		}else{
			alert('Unfortunately, there has been an error. Please try again');
		}

	}


	replyComment=(data)=>{
		return <ul style={{color:"#03A9F4",marginBottom:"20px",marginTop:"5%"}}>
				<li style={{listStyle:"none",display:"inline-block",marginRight:"20px"}}>
					<ul style={{padding:"0px"}}>
						<li id="profilePictureLI" style={{listStyle:"none",display:"inline-block",marginRight:"10px"}}>
							<img src={data.profilePicture==null?NoProfilePicture:data.profilePicture} style={ProfilePicture}/>
						</li>
						<li style={{listStyle:"none",display:"inline-block"}}>
							<b>{data.ownerObject.owner.firstName}</b>
						</li>
					</ul>
				</li>
				<CommentText>
					{data.reply}
				</CommentText>
				<hr/>
			</ul>
	}
//
	handleReplyFetch=async(commentId)=>{
		debugger;
		console.log(this.state.comments);
		var indexOfComment=this.state.comments.findIndex(comment=>comment._id === commentId);
		const replyObject={
			postType:this.props.postType,
			postId:this.props.postId,
			commentIndex:(this.state.comments.length-1)-indexOfComment
		}

		const {confirmation,data}=await getRepliesFromComment(replyObject);
		console.log(data);
		debugger;
		if(confirmation=="Success"){
			this.setState({
				keyToDisplayRespones:commentId,
				displayResponses:true,
				selectedReplies:data
			});
		}else{
			alert('Unfortunately there has been an error getting the replies. Please try again');
		}
	}

	commentComponent=(data)=>{
		return <ul style={{marginBottom:"20px",marginTop:"5%"}}>
				<li style={{listStyle:"none",display:"inline-block",marginRight:"20px"}}>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",display:"inline-block",marginRight:"10px"}}>
							<img src={data.profilePicture==null?NoProfilePicture:data.profilePicture} style={ProfilePicture}/>
						</li>
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
						{data.replies.length>0?
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li style={{listStyle:"none",display:"inline-block",marginRight:"5%",marginBottom:"5px"}}
									 onClick={()=>this.handleReplyFetch(data._id)}>

									<b>View replies </b>
								</li>
							</a>:
							null
						}
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<li onClick={()=>this.setState({displayReplyCreation:true,keyToDisplayReplyCreation:data._id})} 
																		style={{listStyle:"none",display:"inline-block"}}>
								Reply
							</li>
						</a>
					</ul>
				</li>
			</ul>
	}

	handleCreateComment=async()=>{
		const comment=document.getElementById("comment").value;
		const isPersonalProfileIndicator=this.props.personalState.loggedIn==true?true:false;
		const profileObject={
			isPersonalProfile:isPersonalProfileIndicator,
			profileId:isPersonalProfileIndicator==true?this.props.personalState.id:
														this.props.companyState.id
		}
		if(comment!=""){
			const {confirmation,data}=await createComment(this.props.postType,
													 this.props.postId,
													 comment,
													 profileObject
													);
			debugger;
			if(confirmation=="Success"){
				debugger;
				var currentComments=this.state.comments;
				console.log(data);
				const newComment={
					comment:comment,
					profilePicture:data.profilePicture,
					ownerObject:{
						owner:{
							firstName:isPersonalProfileIndicator==true?this.props.personalState.firstName:
							this.props.companyState.companyName
						}
					},
					replies:[],
					_id:data.comments.regularComments[data.comments.regularComments.length-1]._id.toString()
				}

				currentComments.splice(0,0,newComment);
				this.setState({
					comments:currentComments,
					creationCommentExtended:false
				})

			}else{
				alert('Unfortunately an error has occured please submit your comment again');
			}
		}else{
			alert('Please enter a comment');
		}
	}

	createCommentUI=()=>{
		return <>
					{this.state.creationCommentExtended==false?
						<InputContainer onClick={()=>this.setState({creationCommentExtended:true})} 
							placeholder="Add a comment"
						/>:
						<>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none"}}>
									<ExtendedTextArea id="comment" />
								</li>
								<li style={{listStyle:"none"}}>
									<ul style={{padding:"0px"}}>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li  onClick={()=>this.handleCreateComment()} style={ExtendedCommentAreaButton}>
												Create
											</li>
										</a>

										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>this.setState({creationCommentExtended:false})} style={ExtendedCommentAreaButton}>
												Close
											</li>
										</a>
									</ul>
								</li>
							</ul>
						</>
					}
			   </>
	}

	handleDisplayResponses=(key)=>{
		console.log(this.state.keyToDisplayRespones); 
		if(key==this.state.keyToDisplayRespones){
			return <ul style={{borderStyle:"solid",borderWidth:"1px",borderColor:"#D8D8D8",borderRadius:"5px"}}>
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
								{this.state.selectedReplies.map(data=>
									<li style={{listStyle:"none"}}>
										{this.replyComment(data)}
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
//

/*

Sample reply


	date: "1599313696007"
ownerObject:
isPersonalProfile: true
owner:
firstName: "Doggo"
_id: "5f50fc195459bcf522a64fb0"
__proto__: Object
__proto__: Object
reply: "Testing doggo again lol"
_id: "5f5397209c484c08c99c389d"
*/


	handleCreateReply=async()=>{
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
				postId:this.props.postId
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
						}
					},
					profilePicture:data.profilePicture
				}

				currentReplies.splice(0,0,newReply);

				//Add this temporarily to the appropriate comment so user can see 
				debugger;
				console.log(this.state);
				var newComments=this.state.comments
				for(var i=0;i<newComments.length;i++){
					const iterationCommentId=newComments[i]._id;
					if(iterationCommentId==this.state.keyToDisplayReplyCreation){
						newComments[i].replies=currentReplies;
						break;
					}
				}

				this.setState({
					selectedReplies:currentReplies,
					displayReplyCreation:false,
					comments:newComments
				})
			}else{
				alert('Unfortunately an error has occured please submit your comment again');
			}
		}else{
			alert('Please enter a comment');
		}
	}

	createReplyComment=(key)=>{
		console.log(key);
		console.log(this.state.keyToDisplayReplyCreation)
		if(key==this.state.keyToDisplayReplyCreation && this.state.displayReplyCreation==true){
			return <ul style={{padding:"0px",backgroundColor:"white"}}>
						<li style={{listStyle:"none"}}>
							<ExtendedTextArea id="reply"/>
						</li>
						<li style={{listStyle:"none"}}>
							<ul style={{padding:"0px"}}>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li  onClick={()=>this.handleCreateReply()} style={ExtendedCommentAreaButton}>
										Create
									</li>
								</a>

								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li onClick={()=>this.setState({displayReplyCreation:false})} style={ExtendedCommentAreaButton}>
										Close
									</li>
								</a>
							</ul>
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
				<ul style={{padding:"0px",backgroundColor:"white"}}>
					{this.createCommentUI()}
					{this.state.comments.map(data=>
						<li style={{padding:"0px",listStyle:"none",marginBottom:"10px"}} key={data._id}>
							{this.commentComponent(data)}
							{this.createReplyComment(data._id)}
							{this.handleDisplayResponses(data._id)}
						</li>
					)}
				</ul>
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

export default connect(
	mapStateToProps
)(CommentsContainer);
