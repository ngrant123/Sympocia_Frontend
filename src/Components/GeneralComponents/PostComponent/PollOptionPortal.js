import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NoProfilePicture from "../../../designs/img/NoProfilePicture.png"; 
import ReplyIcon from '@material-ui/icons/Reply';

import {markPostAsAuthentic,markPostAsFakeNews} from "../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js"
import {getFakeNewsComments,getAuthenticPostComments} from "../../../Actions/Requests/PostAxiosRequests/PostPageGetRequests.js";
import {useSelector,useDispatch} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../Actions/Tasks/index.js";


const ShadowContainer= styled.div`
	position:fixed;
	width:110%;
	height:100%;
	margin-left:-5%;
	background-color: rgba(0,0,0,0.4);
	z-index:45;
	top:0px;
`;

const Container=styled.div`
	position:fixed;
	width:40%;
	height:50%;
	background-color:white;
	z-index:45;
	top:20%;
	border-radius:5px;
	left:35%;
	padding:20px;
	overflow-y:scroll;

	@media screen and (max-width:1370px){
		width:100% !important;
		left:10% !important;
		height:70% !important;
		#profilePictureLI{
			top:-200px !important;
		}
		#commentsLI{
			margin-top:15% !important;
		}
    }

    @media screen and (max-width:1030px){
		width:80% !important;
		left:10%
    }

	@media screen and (max-width:700px){
		width:90% !important;
		left:5% !important;
		#profilePictureLI{
			top:-80px !important;
		}
    }
`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;

const ExtendedInputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	height:40%;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	margin-bottom:2%;
	width:80%;

	@media screen and (max-width:700px){
		width:90%;
	}
`;

const ProfilePictureContainer=styled.div`
	width:130px;
	height:50px
	border-radius:50%;
	background-color:blue;
`;

const CommentContainer=styled.div`
	display:flex;
	flex-direction:row;
	margin-bottom:5%;
`;
const CommentOwnerImage=styled.div`
	display:flex;
	flex-direction:column;
`;

const CommentTextAndOwner=styled.div`
	display:flex;
	flex-direction:column;
`;

const ProfilePictureCSS={
	width:"60px",
	height:"50px",
	borderRadius:"50%",
	backgroundColor:"blue"
}

const ExploreButton={
  listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  width:"30%"
}

/*

if(displayApproveModal==true){
	await getAuthenticPostComments(imageId,postOption);
}else{}

*/

const PollOptionPortal=(props)=>{
	const {
		postId,
		profilePicture,
		closeModal,
		displayApproveModal,
		postType,
		targetDom
	}=props;

	const personalInformation=useSelector(state=>state.personalInformation);
	const [displayCreateComment,changeDisplayCreateComment]=useState(false);
	const [comments,changeComments]=useState([]);
	const [isProcessing,changeIsProcessingStatus]=useState(false);
	const [isProcessingSubmittion,changeIsProcessingSubmittion]=useState(false)
	const dispatch=useDispatch();

	useEffect(()=>{
		const getData=async()=>{
			changeIsProcessingStatus(true);
			var comments;
			if(displayApproveModal==true){
				comments=await getAuthenticPostComments(postId,postType);
			}else{
				comments=await getFakeNewsComments(postId,postType);
			}
			changeComments(comments.reverse());
			changeIsProcessingStatus(false);
		}
		getData();
	},[]);

	const submitComment=async({isAccessTokenUpdated,updatedAccessToken})=>{
		const comment=document.getElementById("extendedInputContainer").value;
		if(comment!=""){
			const commentObject={
				comment:comment,
				firstName:personalInformation.firstName,
				_id:personalInformation.id,
				postOption:postType,
				postId:postId,
				accessToken:isAccessTokenUpdated==true?updatedAccessToken:
				personalInformation.accessToken
			}
			
			let confirmationResponse,dataResponse;
			if(displayApproveModal==true){
				const {confirmation,data}=await markPostAsAuthentic(commentObject);
				confirmationResponse=confirmation;
				dataResponse=data;

			}else{
				const {confirmation,data}=await markPostAsFakeNews(commentObject);
				confirmationResponse=confirmation;
				dataResponse=data;
			}

			if(confirmationResponse=="Success"){
				const {message}=dataResponse;
				changeDisplayCreateComment(false);
				var dummyCommentObject={
					ownerObject:{
						profilePicture:message,
					},
					comment:comment,
					firstName:personalInformation.firstName
				};

				var currentComments=comments;
				currentComments.splice(0,0,dummyCommentObject);
				changeComments([...currentComments]);
			}else{
				const {statusCode}=dataResponse;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
							personalInformation.refreshToken,
							personalInformation.id,
							submitComment,
							dispatch,
							{},
							false
						);
				}else{
					alert('An error has unfortunately occured. Please try again');
				}
			}
		}else{
			alert('Please enter a value your comment');
		}
		changeIsProcessingSubmittion(false);
	}


	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container>
				{isProcessing==true?
					<p>Please wait</p>:
					<ul style={{padding:"10px"}}>
						<li style={{listStyle:"none",display:"inline-block",marginLeft:"90%"}}>
							<HighlightOffIcon
								style={{fontSize:"30"}}
								onClick={()=>closeModal()}
							/>
						</li>
						{displayApproveModal==true?
							<React.Fragment>
								<li style={{listStyle:"none"}}>
									<InputContainer
										 placeholder="Click here and tell everyone why you think this post isnt fake news"
										 style={{width:"80%",marginLeft:"10%"}}
										 onClick={()=>changeDisplayCreateComment(true)}
									/>
								</li>
								<hr/>

								<li style={{color:"#01DF01",listStyle:"none",marginLeft:"10%",marginBottom:"2%"}}>	
									<CheckCircleIcon
										style={{fontSize:"30",color:"#01DF01"}}
									/> Approves																																																																																								
								</li>
							</React.Fragment>:
							<React.Fragment>
								<li style={{listStyle:"none"}}>
									<InputContainer
										 placeholder="Click here and tell everyone why you think this post is fake news"
										 style={{width:"80%",marginLeft:"10%"}}
										 onClick={()=>changeDisplayCreateComment(true)}
									/>
								</li>
								<hr/>

								<li style={{color:"#FE2E2E",listStyle:"none",marginLeft:"10%",marginBottom:"2%"}}>	
									<HighlightOffIcon
										style={{fontSize:"30",color:"#FE2E2E"}}
									/> Disapproves																																																																																								
								</li>
							</React.Fragment>
						}

						{displayCreateComment==true?
							<ul style={{overflow:"scroll",padding:"0px"}}>
								<ExtendedInputContainer
									placeholder="Write down what you want to say :)"
									id="extendedInputContainer"
								/>
								<li style={{listStyle:"none"}}>
									<ul style={{padding:"0px"}}>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li style={{listStyle:"none",display:"inline-block"}}>
												<ReplyIcon
													style={{fontSize:"20"}}
													onClick={()=>changeDisplayCreateComment(false)}
												/>
											</li>
										</a>
										{isProcessingSubmittion==true?
											<p>Please wait...</p>:
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li onClick={()=>submitComment({isAccessTokenUpdated:false})} style={ExploreButton}>
													Submit
												</li>
											</a>
										}
									</ul>
								</li>
							</ul>:
							<li id="commentsLI" style={{listStyle:"none"}}>
								{comments.length==0?
									<p>No opinions</p>:
									<ul style={{padding:"0px"}}>
										{comments.map(data=>
											<CommentContainer>
												<CommentOwnerImage>
													{data.ownerObject.profilePicture==null?
														<img src={NoProfilePicture} style={ProfilePictureCSS}/>:
														<img src={data.ownerObject.profilePicture} style={ProfilePictureCSS}/>
													}
												</CommentOwnerImage>
												<CommentTextAndOwner>
													<p>
														<b>{data.firstName}</b>
													</p>
													<p>{data.comment}</p>
												</CommentTextAndOwner>
											</CommentContainer>
											)}
									</ul>
								}
							</li>
						}
					</ul>
				}
			</Container>
		</React.Fragment>
	,document.getElementById(targetDom));
}

export default PollOptionPortal;

