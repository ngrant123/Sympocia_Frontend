import React,{useState} from "react";
import styled from "styled-components";
import {ImageConsumer} from "./ImageContext.js";
import PollOptionPortal from "../../PollOptionPortal.js";


const Container=styled.div`
	position:absolute;
	background-color:white;
	width:40%;
	height:82%;
	z-index:3;
	top:30px;

	@media screen and (max-width:1370px){
		width:80% !important;
		height:600% !important;
		margin-left:8% !important;
		padding:10px;
		border-radius:5px;
		#postLIContainer{
			width:60% !important;
		}
	}

	@media screen and (max-width:800px){
		width:100% !important;
		height:600% !important;
		padding:10px;
		border-radius:5px;

		#postOwnerAndSymposium{
			display:block !important;
			margin-bottom:3% !important;
		}
		#disapprovePostLI{
			display:block !important;
			margin-bottom:3% !important;
		}
		#approvesPostLI{
			display:block !important;
			margin-bottom:3% !important;
		}
	}

	@media screen and (max-width:420px){
		width:100% !important;
		height:600% !important;
		margin-left:8% !important;
		padding:10px;
		border-radius:5px;

		#postOwnerAndSymposium{
			display:block !important;
			margin-bottom:3% !important;
		}
		#disapprovePostLI{
			display:block !important;
			margin-bottom:3% !important;
		}
		#approvesPostLI{
			display:block !important;
			margin-bottom:3% !important;
		}
		#postLIContainer{
			width:80% !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:1030px){
	 	width:80%;
	 	#postLIContainer{
	 		width:100% !important;
	 		margin-left:2%
	 	}
    }

	@media screen and (max-width:1370px) and (max-height:1030px){
	 	width:100%;
	 	#postLIContainer{
	 		width:100% !important;
	 	}
    }
`;

const IndustryButton=styled.div`
	position:relative;
	background-color:#5298F8;
	text-align:center;
	width:120px;
	padding:5px;
	color:white;
	border-style:solid;
	border-width:1px;
	border-color:#0857c2;
	border-radius:5px;
	transition:.8s;

	&:hover{
		background-color:#0857c2;
	}
`;

const PostInformationContainer=styled.div`
	position:absolute
`;



const ImagePostsButtons=styled.div`
	position:relative;
	background-color:#5298F8;
	text-align:center;
	width:120px;
	padding:5px;
	color:white;
	border-style:solid;
	border-width:1px;
	border-color:#0857c2;
	border-radius:5px;
	transition:.8s;

	&:hover{
		background-color:#0857c2;
	}
`; 


const ButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"4%"
}

//Could be turned into a functional component im a bot
const ImageInformation=(props)=>{
	debugger;
	const [displayPollingModal,changeDisplayPollingModal]=useState(false);
	const [displayApproveModal,changeDisplayApproveModal]=useState(false);

	if(props.imageInformation.isPostAuthentic!=null){
		var approvesPostNumber=props.imageInformation.isPostAuthentic.numOfApprove!=null?
							   props.imageInformation.isPostAuthentic.numOfApprove.length:null;

		var disapprovesPostNumber=props.imageInformation.isPostAuthentic.numOfDisapprove!=null?
								  props.imageInformation.isPostAuthentic.numOfDisapprove.length:null;
	}

	const closeModal=()=>{
		changeDisplayPollingModal(false);
	}

	const displayApproved=()=>{
		changeDisplayPollingModal(true);
		changeDisplayApproveModal(true);
	}

	const displayUnApprove=()=>{
		changeDisplayPollingModal(true);
		changeDisplayApproveModal(false);
	}
		return (
			<ImageConsumer>
				{information=>{
					return <Container>
								{displayPollingModal==true?
									<PollOptionPortal
										closeModal={closeModal}
										displayApproveModal={displayApproveModal}
										postId={props.imageInformation._id}
										postType="Images"
										targetDom={props.targetDom}
									/>:null
								}
								<ul id="postLIContainer" style={{padding:"0px",width:"90%"}}>
									{(props.imageInformation.audioDescription!=null &&
									 	 props.isMobileTrue==false)==true && (
									 	 <React.Fragment>
											<li style={{listStyle:"none"}}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block"}}>
														<audio style={{width:"200px"}} controls>
															<source src={props.imageInformation.audioDescription} type="audio/ogg"/>
															<source src={props.imageInformation.audioDescription} type="audio/mpeg"/>
															Your browser does not support the audio element.
														</audio>
													</li>
												</ul>
											</li>
											<hr/>
										</React.Fragment>
									)}

									<li id="postOwnerAndSymposium" style={{listStyle:"none",display:"inline-block",marginTop:"0%",marginRight:"3%"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none"}}>
												<p style={{fontSize:"20px"}}>{props.imageInformation.firstName}</p>
											</li>
											{props.imageInformation.industriesUploaded.length>0 &&(
												<li style={{listStyle:"none"}}>	
													<IndustryButton>
														{props.imageInformation.industriesUploaded[0].industry}
													</IndustryButton>
												</li>
											)}
										</ul>
									</li>
									<ul style={{padding:"0px",marginTop:"2%"}}>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li id="approvesPostLI" onClick={()=>displayApproved()} style={ButtonCSS}>
												<p style={{color:"#01DF01"}}>{approvesPostNumber}</p> Approve Post
											</li>
										</a>

										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li id="disapprovePostLI" onClick={()=>displayUnApprove()} style={ButtonCSS}>
												<p style={{color:"#FE2E2E"}}>{disapprovesPostNumber}</p> Mark as Fake News
											</li>
										</a>
									</ul>

								</ul>

								<p style={{height:"30%",width:"90%",fontSize:"40px"}}>
									<b>
										{props.imageInformation.caption}
									</b>
								</p>
								<p style={{height:"35%",overflow:"hidden"}}> 
									 {props.imageInformation.description}
								 </p>

								 {props.isMobileTrue!=true &&(
								 	 <ul style={{padding:"0px",marginTop:"5px"}}>
									 	<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										 	<li style={{listStyle:"none",display:"inline-block",marginRight:"10px"}}>
										 		 <ImagePostsButtons onClick={()=>information.updateIndicator(false)}>
										 			Comments
												 </ImagePostsButtons>
										 	</li>
										 </a>
									 </ul>
								 )}
								
							</Container>

				}
			}
			</ImageConsumer>

		)
}

export default ImageInformation;