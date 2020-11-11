import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NoProfilePicture from "../../../designs/img/NoProfilePicture.png"; 
import ReplyIcon from '@material-ui/icons/Reply';

import {markPostAsAuthentic,markPostAsFakeNews} from "../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js"
import {getFakeNewsComments,getAuthenticPostComments} from "../../../Actions/Requests/PostAxiosRequests/PostPageGetRequests.js";
import {useSelector} from "react-redux";


const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:20;
	top:0px;
`;

const Container=styled.div`
	position:fixed;
	width:40%;
	height:50%;
	background-color:white;
	z-index:20;
	top:20%;
	border-radius:5px;
	left:35%;
	overflow-y:scroll;

	@media screen and (max-width:1930px){
		#profilePictureLI{
			top:0px !important;
		}
    }

    @media screen and (max-width:1030px){
		width:80% !important;
		left:10%
    }

	@media screen and (max-width:840px){
		width:100% !important;
		left:2% !important;
		height:90% !important;

		#profilePictureLI{
			top:0px !important;
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
`;

const ProfilePictureContainer=styled.div`
	width:130px;
	height:50px
	border-radius:50%;
	background-color:blue;
`;

const ProfilePictureCSS={
	width:"6 0px",
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

	useEffect(()=>{
		const getData=async()=>{
			var comments;
			if(displayApproveModal==true){
				comments=await getAuthenticPostComments(postId,postType);
			}else{
				comments=await getFakeNewsComments(postId,postType);
			}
			changeComments(comments.reverse());
		}
		getData();
	},[]);

	const submitComment=async()=>{
		const comment=document.getElementById("extendedInputContainer").value;
		const commentObject={
			comment:comment,
			firstName:personalInformation.firstName,
			_id:personalInformation.id,
			postOption:postType,
			postId:postId
		}
		debugger;
		let confirmationResponse,dataResponse;
		if(displayApproveModal==true){
			const {confirmation,data}=await markPostAsAuthentic(commentObject);
			debugger
			confirmationResponse=confirmation;
			dataResponse=data;

		}else{
			const {confirmation,data}=await markPostAsFakeNews(commentObject);
			confirmationResponse=confirmation;
			dataResponse=data;
		}

		if(confirmationResponse=="Success"){
			changeDisplayCreateComment(false);
			var dummyCommentObject={
				profilePicture:dataResponse,
				comment:comment,
				firstName:personalInformation.firstName
			};

			var currentComments=comments;
			currentComments.splice(0,0,dummyCommentObject);
			changeComments([...currentComments]);
		}else{
			alert('An error has unfortunately occured. Please try again');
		}
	}


	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container>
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
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>submitComment()} style={ExploreButton}>
												Submit
											</li>
										</a>
									</ul>
								</li>
							</ul>:
							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									{comments.map(data=>
											<li style={{listStyle:"none",marginBottom:"4%"}}>
												<ul style={{pading:"0px"}}>
													<li id="profilePictureLI" style={{position:"relative",top:"-80px",listStyle:"none",display:"inline-block"}}>
														<ul style={{padding:"0px"}}>
															<li style={{listStyle:"none"}}>
																{data.profilePicture==null?
																	<img src={NoProfilePicture} style={ProfilePictureCSS}/>:
																	<img src={data.profilePicture} style={ProfilePictureCSS}/>
																}
															</li>

															<li style={{listStyle:"none"}}>
																{data.firstName}
															</li>
														</ul>
													</li>

													<li style={{height:"30%",width:"60%",listStyle:"none",display:"inline-block",overflowY:"auto"}}>
														{data.comment}
													</li>
												</ul>
											</li>
										)}
								</ul>
							</li>
					}
					
				</ul>
			</Container>
		</React.Fragment>
	,document.getElementById(targetDom));
}

export default PollOptionPortal;

