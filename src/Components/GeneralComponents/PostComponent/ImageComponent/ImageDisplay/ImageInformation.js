import React,{useState} from "react";
import styled from "styled-components";
import {ImageConsumer} from "./ImageContext.js";
import PollOptionPortal from "../../PollOptionPortal.js";


const Container=styled.div`
	position:absolute;
		width:40%;
	height:82%;
	z-index:3;
	background-color:white;
	top:30px;
	overflow-y:scroll;
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
	console.log(props);
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
										firstName={props.imageInformation.firstName}
										postId={props.imageInformation._id}
										postType="Images"
										ownerId={props.imageInformation.owner}
									/>:null
								}
								<ul style={{padding:"0px",width:"140%"}}>
									{props.imageInformation.audioDescription==null?null:
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
									}
									<li style={{listStyle:"none",display:"inline-block",marginTop:"0%",marginRight:"3%"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none"}}>
												<p style={{fontSize:"20px"}}>{props.imageInformation.firstName}</p>
											</li>

											<li style={{listStyle:"none"}}>	
												<IndustryButton>
													{props.imageInformation.industriesUploaded[0].industry}
												</IndustryButton>
											</li>
										</ul>
									</li>

									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>displayApproved()} style={ButtonCSS}>
											<p style={{color:"#01DF01"}}>{approvesPostNumber}</p> Approve Post
										</li>
									</a>

									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>displayUnApprove()} style={ButtonCSS}>
											<p style={{color:"#FE2E2E"}}>{disapprovesPostNumber}</p> Mark as Fake News
										</li>
									</a>
								</ul>

								<p style={{height:"30%",width:"90%",fontSize:"40px",overflow:"hidden"}}>
									<b>
										{props.imageInformation.caption}
									</b>
								</p>
								<p style={{height:"35%",overflow:"hidden"}}> 
									 {props.imageInformation.description}
								 </p>

								 <ul style={{padding:"0px",marginTop:"5px"}}>
								 	<li style={{listStyle:"none",display:"inline-block",marginRight:"10px"}}>
								 		 <ImagePostsButtons onClick={()=>information.updateIndicator(false)}>
								 			Comments
										 </ImagePostsButtons>
								 	</li>


								 </ul>
							</Container>

				}
			}
			</ImageConsumer>

		)
}

export default ImageInformation;