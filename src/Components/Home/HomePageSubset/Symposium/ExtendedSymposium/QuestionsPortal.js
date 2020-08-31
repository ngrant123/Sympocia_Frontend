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
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";

const Container=styled.div`
	position:absolute;
	background-color:white;
	width:45%;
	height:60%;
	border-radius:5px; 
	z-index:17;
	left:30%;
	top:20%;
	overflow-y:scroll;
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

const RegularPostContainer=styled.div`
	transition:.8s;
	border-radius:5px;
	&:hover{
		box-shadow: 1px 1px 1px 1px #d5d5d5;
	}
`;



const QuestionsPortal=(props)=>{
	console.log("QuestionsPortal rendering");
	console.log(props);

	const {	questionType,
			closeModal,
			counter,
			questions,
			selectedSymposium,
			triggerImagePortal,
			triggerVideoPortal,
			triggerRegularPostPortal
		}=props;

	const [displayCreatePost,changeDisplayPost]=useState(false);
	const [selectedPost,changeSelectedPost]=useState();
	const [displayUploadScreen,changeDisplayUploadScreen]=useState(true);
	const [currentCounter,changeCurrentCounter]=useState(counter);

	const sendData=async(data,personalInformation)=>{
		debugger;
		const profileIndicator=personalInformation.industry==null?"Profile":"Company";
		if(questionType=="Video"){
			data={
				videoUrl:data,
				description:document.getElementById("videoDescription").value
			}
		}else if(questionType=="Image"){
			data={
				imgUrl:data,
				description:document.getElementById("imageDescription").value
			}
		}

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
									<ul style={{padding:"0px",marginTop:"20%",marginLeft:"10%"}}>
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
								<ul style={{paddingTop:"10px"}}>
									<li style={{listStyle:"none"}}>
										<img src={selectedPost} style={{borderRadius:"5px",width:"60%",height:"50%"}}/>
									</li>
									<InputContainer  id="imageDescription" style={{width:"70%",marginRight:"2%"}} placeholder="Describe your picture here"/>
									<li onClick={()=>sendData(selectedPost,personalInformationState)} style={SendButtonCSS}>
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
								<input type="file" name="img" id="uploadFile" style={{position:"relative",opacity:"0",zIndex:"0"}} onChange={()=>uploadFile()} accept="video/*"></input>
							</li>:
							<li style={{listStyle:"none"}}>
								<ul>
									<li style={{listStyle:"none"}}>
										<video width="45%" height="50%" controls autoplay>
											<source src={selectedPost} type="video/mp4"/>
										</video>
									</li>
									<InputContainer id="videoDescription" style={{width:"70%",marginRight:"2%"}} placeholder="Describe your picture here"/>
									<li onClick={()=>sendData(selectedPost,personalInformationState)} style={SendButtonCSS}>
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
										<li style={{marginRight:"2%",position:"relative",top:"-100px",listStyle:"none",display:"inline-block"}}>
											Or
										</li>
										<li style={{width:"25%",position:"relative",top:"-100px",listStyle:"none",display:"inline-block",marginRight:"1%"}}>
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

	const constructResponses=(replies)=>{
			var element;
			if(replies.length==0){
				return <p> No replies yet :(. Click on the question and click the pencil icon to make a post </p>
			}else{
				if(questionType=="Image"){
					return <React.Fragment>
										{replies.map(data=>
											<li onClick={()=>triggerImagePortal(data)} style={{listStyle:"none",display:"inline-block"}}>
												<img src={data.imgUrl} style={{borderRadius:"5px",width:"30%",height:"20%"}}/>
											</li>
										)}
									</React.Fragment>;
				}else if(questionType=="Video"){
					return <React.Fragment>
								{replies.map(data=>
									<li onClick={()=>triggerVideoPortal(data)} style={{listStyle:"none",display:"inline-block"}}>
										<video style={{borderRadius:"5px",width:"45%",height:"30%"}}>
											<source src={data.imgUrl} type="video/mp4"/>
										</video>
									</li>
								)}
							</React.Fragment>;
				}else{
					return <React.Fragment>
								{replies.map(data=>
									<RegularPostContainer>
										<a href="javascript:void(0);"  style={{textDecoration:"none"}}>
											<li onClick={()=>triggerRegularPostPortal(data)} style={{listStyle:"none",display:"inline-block"}}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block",marginRight:"1%",width:"20%"}}>
														<ul style={{padding:"0px"}}>
															<li style={{listStyle:"none"}}>
																{data.owner.profilePicture==null?
																	<img src={NoProfilePicture} style={{width:"80%",height:"15%",borderRadius:"50%"}}/>:
																	<img src={data.owner.profilePicture} style={{width:"60%",height:"15%",borderRadius:"50%"}}/>
																}
															</li>
															<li style={{listStyle:"none"}}>
																<b>{data.owner.firstName}</b>
															</li>
														</ul>
													</li>
													<li style={{listStyle:"none",display:"inline-block",position:"relative",top:"-60px"}}>
														{data.post}			
													</li>
												</ul>
											</li>
										</a>
									</RegularPostContainer>
								)}
							</React.Fragment>;
				}
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
																{questions[currentCounter].responsesId.length==0?
																	<p>No replies yet :( </p>:
																	<React.Fragment>
																		{constructResponses(questions[counter].responsesId)}
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
};

export default QuestionsPortal;