import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import CameraIcon from '@material-ui/icons/Camera';
import BorderColorIcon from '@material-ui/icons/BorderColor';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import MicIcon from '@material-ui/icons/Mic';
import {addCommentToPopularQuestions} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {HomeConsumer} from "../../../HomeContext.js";

const Container=styled.div`
	position:absolute;
	background-color:white;
	width:45%;
	height:60%;
	border-radius:5px; 
	z-index:17;
	left:30%;
	top:20%;
`;

const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:17;
	top:0px;
`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	height:40%;
	width:30%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;

const CreatePostContainer=styled.div`
	position:absolute;
	top:80%;
	left:60%;
	width:30%;
	height:10%;
	background-color:white;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#3898ec;
	color:#3898ec;
	padding:20px;
	font-size:15px;
`;

const SendButtonCSS={
    listStyle:"none",
    display:"inline-block",
    backgroundColor:"#3898ec",
    borderRadius:"5px",
    padding:"10px",
    color:"white",
    marginRight:"2%"
}



const QuestionsPortal=(props)=>{
	console.log("QuestionsPortal rendering");
	console.log(props);

	const {	questionType,
			component,
			closeModal,
			counter,
			questions,
			selectedSymposium
		}=props;

	const [displayCreatePost,changeDisplayPost]=useState(false);
	const [selectedPost,changeSelectedPost]=useState();
	const [displayUploadScreen,changeDisplayUploadScreen]=useState(true);
	const [currentCounter,changeCurrentCounter]=useState(counter);

	const sendData=async(data,personalInformation)=>{
		debugger;
		const profileIndicator=personalInformation.industry==null?"Profile":"Company";
		const postInformation={
			userId:personalInformation._id,
			profileIndicator:profileIndicator,
			questionId:questions[counter]._id,
			questionType:questionType,
			comment:data,
			industry:selectedSymposium
		}
		const response=await addCommentToPopularQuestions(postInformation);
		props.closeModal();
	}

	const uploadFile=()=>{
		const reader=new FileReader();
		const uploadedFile=document.getElementById("uploadFile").files[0];

		reader.onload=()=>{
			console.log(reader.result);
			changeSelectedPost(reader.result);
			changeDisplayUploadScreen(false);
		}

		if(uploadedFile!=null){
			reader.readAsDataURL(uploadedFile);
		}else{
			alert('This type of file is unfortunatley not supported ')
		}
	}


	const createPost=(personalContext)=>{
		const {personalInformationState}=personalContext;
		if(questionType=="Image"){
			return <ul>
						{displayUploadScreen==true?
							<li onClick={()=>document.getElementById("uploadFile").click()} style={{listStyle:"none",marginRight:"1%"}}>
								<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																														borderColor:"#5298F8",
																														borderStyle:"solid",
																														borderWidth:"1px",
																														color:"white",
																														backgroundColor:"#5298F8"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
											<CameraIcon/>
										</li>

										<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"20px"}}>
											Upload Photo   
										</li>
									</ul>																			
								</button>
								<input type="file" name="img" id="uploadFile" style={{position:"relative",opacity:"0",zIndex:"0"}} onChange={()=>uploadFile()} accept="image/x-png,image/gif,image/jpeg"></input>
							</li>:
							<li style={{listStyle:"none"}}>
								<ul>
									<li>
										<img src={selectedPost} style={{borderRadius:"5px",width:"40%",height:"50%"}}/>
									</li>
									<InputContainer placeholder="Describe your picture here"/>
									<li onClick={()=>sendData()} style={SendButtonCSS}>
										Send
									</li>
								</ul>
							</li>
						}
				   </ul>;
		}else if(questionType=="Video"){
			return <ul>
						{displayUploadScreen==true?
							<li onClick={()=>document.getElementById("uploadFile").click()} style={{listStyle:"none",marginRight:"1%"}}>
								<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																														borderColor:"#5298F8",
																														borderStyle:"solid",
																														borderWidth:"1px",
																														color:"white",
																														backgroundColor:"#5298F8"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
											<CameraIcon/>
										</li>

										<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"20px"}}>
											Upload Video
										</li>
									</ul>																			
								</button>
								<input type="file" name="img" id="uploadFile" style={{position:"relative",opacity:"0",zIndex:"0"}} onChange={()=>uploadFile()} accept="image/x-png,image/gif,image/jpeg"></input>
							</li>:
							<li style={{listStyle:"none"}}>
								<ul>
									<li>
										<source style={{borderRadius:"5px",width:"45%",height:"30%"}}>
											<video src={selectedPost} type="video/mp4"/>
										</source>
									</li>
									<InputContainer placeholder="Describe your picture here"/>
									<li onClick={()=>sendData()} style={SendButtonCSS}>
										Send
									</li>
								</ul>
							</li>
						}
				   </ul>
		}else{
			return <ul>
						{displayUploadScreen==true?
							<React.Fragment>
								<li style={{marginBottom:"10%",width:"80%",color:"#585858",listStyle:"none",display:"inline-block",fontSize:"30px"}}>
										<b>
											{questions[currentCounter].question}
										</b>
								</li>
								<li style={{listStyle:"none"}}>
									<ul style={{padding:"0px"}}>
										<li style={{marginRight:"2%",width:"50%",listStyle:"none",display:"inline-block"}}>
											<ul style={{padding:"0px"}}> 
												<li style={{listStyle:"none"}}>
													<InputContainer
														style={{width:"100%"}}
														placeholder="Create a post"
														id="regularPostText"
													/>
												</li>
												<a href="javascript:void(0);" style={{textDecoration:"none"}}>
													<li onClick={()=>sendData(document.getElementById("regularPostText").value,personalInformationState)} style={SendButtonCSS}>
														Send
													</li>
												</a>
											</ul>
										</li>
										<li style={{marginRight:"2%",position:"relative",top:"-50px",listStyle:"none",display:"inline-block"}}>
											Or
										</li>
										<li style={{position:"relative",top:"-50px",listStyle:"none",display:"inline-block",marginRight:"1%"}}>
											<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																																	borderColor:"#5298F8",
																																	borderStyle:"solid",
																																	borderWidth:"1px",
																																	color:"white",
																																	backgroundColor:"#5298F8"}}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
														<MicIcon/>
													</li>

													<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"20px"}}>
														Say it instead
													</li>
												</ul>																			
											</button>
											<input type="file" name="img" id="uploadFile" style={{position:"relative",opacity:"0",zIndex:"0"}} onChange={()=>uploadFile()} accept="image/x-png,image/gif,image/jpeg"></input>
										</li>
									</ul>
								</li>
							</React.Fragment>
							:
							<li style={{listStyle:"none"}}>
								<ul>
									<li>
										<img src={selectedPost} style={{borderRadius:"5px",width:"40%",height:"50%"}}/>
									</li>
									<InputContainer placeholder="Describe your picture here"/>
									<li onClick={()=>sendData()} style={SendButtonCSS}>
										Send
									</li>
								</ul>
							</li>
						}
				   </ul>
		}
	}

	return createPortal(
		<HomeConsumer>
			{personalInformation=>{
					return <React.Fragment>
								<ShadowContainer
									onClick={()=>props.closeModal()}
								/>
								<Container>
									{displayCreatePost==true?
										<React.Fragment>
											{createPost(personalInformation)}
										</React.Fragment>:
										<React.Fragment>
											<ul style={{padding:"10px"}}>
												<li style={{marginRight:"10%",listStyle:"none",display:"inline-block"}}>
													{currentCounter!=0?
															<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																<NavigateBeforeIcon
																	style={{borderRadius:"50%",boxShadow:"1px 1px 5px #dbdddf"}}
																	onClick={()=>changeCurrentCounter(currentCounter--)}
																/>
															</a>:<React.Fragment></React.Fragment>
													}
												</li>

												<li style={{listStyle:"none",display:"inline-block",width:"60%"}}>
													<ul style={{padding:"0px"}}>

														<li style={{width:"130%",color:"#585858",listStyle:"none",display:"inline-block",fontSize:"30px"}}>
																	<b>
																		{questions[currentCounter].question}
																	</b>
														</li>
														<hr/>
														<li style={{listStyle:"none"}}>
															<ul style={{padding:"0px"}}>
																{component==null?
																	<p>No replies yet :( </p>:
																	<React.Fragment>
																		{component}
																	</React.Fragment>
																}
															</ul>
														</li>
													</ul>
												</li>
						  
												<li style={{marginLeft:"10%",listStyle:"none",display:"inline-block"}}>
													{currentCounter!=(questions.length-1)?
															<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																<NavigateNextIcon
																	style={{fontSize:"25",borderRadius:"50%",boxShadow:"1px 1px 5px #dbdddf"}}
																	onClick={()=>changeCurrentCounter(currentCounter++)}
																/>
															</a>:<React.Fragment></React.Fragment>
													}
												</li>
											</ul>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<CreatePostContainer onClick={()=>changeDisplayPost(true)} >
													Create a post
												</CreatePostContainer>
											</a>
										</React.Fragment>
									}
								</Container>
							</React.Fragment>
				}
			}



		</HomeConsumer>
	,document.getElementById("extendedSymposiumContainer"))
}

export default QuestionsPortal;