import React,{useState,useEffect} from "react";
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
import {useSelector,useDispatch} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";

import ImagePostDisplayPortal from "../../../HomePageSet/ImageHomeDisplayPortal.js";
import VideoPostDisplayPortal from "../../../HomePageSet/VideoHomeDisplayPortal.js";
import RegularPostDisplayPortal from "../../../HomePageSet/RegularPostHomeDisplayPortal.js";

const Container=styled.div`
	position:fixed;
	background-color:white;
	width:45%;
	height:60%;
	border-radius:5px; 
	z-index:40;
	left:30%;
	top:20%;
	overflow-y:scroll;

	@media screen and (max-width:1370px){
		left:3% !important;
		width:90% !important;
		height:80% !important;

		#videoLI{
			width:80% !important;
		}
		#imgUrl{
			width:60% !important;
		}
		#creationImageLI{
			width:80% !important;
		}

		#videoPost{
			height:200px !important;
			width:200px !important;
		}
	}

	@media screen and (max-width:740px){
		#postLI{
			margin-left:30% !important;
		}
		#imagePicture{
			width:25% !important;
			height:60% !important;
		}
		#questionHeader{
			margin-top:10% !important;
			font-size:15px !important;
		}
		#creationImageLI{
			width:90% !important;
		}
		#creationImage{
			height:20% !important;
		}
		#imageDescriptionLI{
			width:130% !important;
			margin-left:-20% !important;
		}
		#imgUrl{
			width:60% !important;
		}
		#regularPostQuestionLI{
			font-size:15px !important;
		}
		#createButtonLI{
			width:30% !important;	
		}
	}


	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
		#imgUrl{
			width:70% !important;
			height:40% !important;
		}

		#creationImage{
			height:60% !important;
		}
    }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		#imageDescriptionLI{
			width:90% !important;
			margin-left:0% !important;
		}
    }
`;

const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:40;
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

	@media screen and (max-width:1370px){
		width:80% !important;
	}
	@media screen and (max-width:600px){
		width:100% !important;
	}
`;

const CreatePostContainer=styled.div`
	position:fixed;
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
	cursor:pointer;
`;

const PostsContainer=styled.div`
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;
`;

const SendButtonCSS={
    listStyle:"none",
    backgroundColor:"#3898ec",
    borderRadius:"5px",
    padding:"10px",
    color:"white",
    marginRight:"2%",
    marginTop:"2%",
    cursor:"pointer"
}

const UploadButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  cursor:"pointer"
}

const RegularPostContainer=styled.div`
	transition:.8s;
	border-radius:5px;
	padding:20px;
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;
	width:100%;
	&:hover{
		box-shadow: 1px 1px 1px 1px #d5d5d5;
	}
	@media screen and (max-width:600px){
		flex-direction:column;
	}
`;

const RegularPostUserInformation=styled.div`
	display:flex;
	flex-direction:column;
`;

const MobileCreationButtonCSS={
	backgroundColor:"white",
	borderRadius:"5px",
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#3898ec",
	color:"#3898ec",
	padding:"20px",
	fontSize:"15px",
	listStyle:"none",
	cursor:"pointer",
	width:"20%"
}



const QuestionsPortal=(props)=>{
	const ownerInformation=useSelector(state=>state.personalInformation);
	const _id=useSelector(state=>state.personalInformation.id);
	const [displayPhoneUI,changeDisplayPhoneUI]=useState(false);
	const [isCommentProcessing,changeIsCommentProcessing]=useState(false);
	const personalInformation=useSelector(state=>state.personalInformation);

	const [displayImagePortal,changeImagePortal]=useState(false);
	const [displayVideoPortal,changeVideoPortal]=useState(false);
	const [displayRegularPortal,changeRegularPortal]=useState(false);
	const [selectedPost,changeSelectedPost]=useState();
	const [selectedPostDisplayModal,changeSelectedPostDisplayModal]=useState();

	const {	questionType,
			counter,
			questions,
			closeModalAndDisplayData,
			selectedSymposium
		}=props;

	const [displayCreatePost,changeDisplayPost]=useState(false);
	const [displayUploadScreen,changeDisplayUploadScreen]=useState(true);
	let [currentCounter,changeCurrentCounter]=useState(counter);
	const [currentQuestionType,changeCurrentQuestionType]=useState(questions[currentCounter].questionType);

	//const [displayExpandedQuestionModal,change]

	const dispatch=useDispatch();

	const triggerUIChange=()=>{
		if(window.innerWidth<600){
			changeDisplayPhoneUI(true);

		}else{
			changeDisplayPhoneUI(false);
		}
	}
	useEffect(()=>{
		triggerUIChange();
	},[]);

	window.addEventListener('resize',triggerUIChange)

	const checkVideoLength=()=>{
		const video=document.getElementById("videoLI");
		let duration=video.duration;
		duration=Math.ceil(duration);
		if(duration>30){
			alert('The video is too long. As of right now we only support 30 sec videos that are below 50MB. Sorry for the inconvience.');
			return false;
		}else{
			return true;
		}
	}


	const sendData=async({postData,isAccessTokenUpdated,updatedAccessToken})=>{
		//const profileIndicator=personalInformation.industry==null?"Profile":"Company";
		changeIsCommentProcessing(true);
		let addCommentRequestData;
		let continueUploadProcess=true;
		if(currentQuestionType=="Video"){
			const isVideoAppropiateSize=checkVideoLength();
			continueUploadProcess=isVideoAppropiateSize;

			addCommentRequestData={
				videoUrl:postData,
				description:document.getElementById("videoDescription").value
			}
		}else if(currentQuestionType=="Image"){
			addCommentRequestData={
				imgUrl:postData,
				description:document.getElementById("imageDescription").value,
				comment:[]
			}
		}else{
			addCommentRequestData={
				post:postData,
				comment:[]
			}
		}

		if(continueUploadProcess!=false){
			const postInformation={
				userId:_id,
				profileIndicator:"Profile",
				questionId:questions[currentCounter]._id,
				questionType:currentQuestionType,
				comment:addCommentRequestData,
				industry:selectedSymposium
			}
			const {confirmation,data}=await addCommentToPopularQuestions(
												postInformation,
												isAccessTokenUpdated==true?updatedAccessToken:
												personalInformation.accessToken
											);
			if(confirmation=="Success"){
				debugger;
				const {message}=data;
				props.closeModalAndDisplayData({
					data:{
						...message,
						videoUrl:postData,
						imgUrl:postData
					},
					currentQuestionType
				});
			}else{
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
							personalInformation.refreshToken,
							personalInformation.id,
							sendData,
							dispatch,
							{postData},
							false
						);
				}else{
					alert('Unfortunately there has been an error when trying to add your post. Please try again');
				}
			}
		}
		changeIsCommentProcessing(false);

	}

	const displayAppropriatePostModal=(data,currentQuestionType)=>{
		changeSelectedPostDisplayModal(data);
		if(currentQuestionType=="Images"){
			changeImagePortal(true);
		}else if(currentQuestionType=="Videos"){
			changeVideoPortal(true);
		}else{
			changeRegularPortal(true);
		}
	}

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
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


	const createPost=()=>{
		if(currentQuestionType=="Image"){
			return <ul style={{padding:"50px"}}>
						{displayUploadScreen==true?
							<>
								<p style={{fontSize:"20px",marginBottom:"5%"}}>
									<b>Upload an image here</b>
								</p>
								<li onClick={()=>document.getElementById("uploadFile").click()} style={UploadButtonCSS}>
										<ul style={{padding:"0px",marginTop:"20%",marginLeft:"10%"}}>
											<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
												<CameraIcon/>
											</li>

											<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"20px"}}>
												Upload Photo   
											</li>
										</ul>	
									<input type="file" name="img" id="uploadFile" style={{position:"relative",opacity:"0",zIndex:"0"}} onChange={()=>uploadFile()} accept="image/x-png,image/gif,image/jpeg"></input>
								</li>
							</>:
							<li style={{listStyle:"none"}}>
								<ul style={{paddingTop:"10px"}}>
									<p style={{fontSize:"20px",marginBottom:"5%"}}>
										<b>Submit image</b>
									</p>
									<hr/>
									<li id="creationImageLI" style={{position:"relative",listStyle:"none",display:"inline-block",width:"40%",marinRight:"2%"}}>
										<img id="creationImage" src={selectedPost} style={{borderRadius:"5px",width:"90%",height:"30%"}}/>
									</li>
									<hr/>
									<li id="imageDescriptionLI" style={{listStyle:"none",display:"inline-block",width:"85%",marginTop:"2%"}}>
										<ul style={{padding:"0px"}}>
											<InputContainer  id="imageDescription" style={{width:"100%",marginRight:"2%"}}
												 placeholder="Describe your picture here"
											/>
											<hr/>
											{isCommentProcessing==false?
												<li onClick={()=>sendData({postData:selectedPost,isAccessTokenUpdated:false})} style={SendButtonCSS}>
													Send
												</li>:
												<p>Please wait while we process your post... </p>
											}
										</ul>
									</li>
								</ul>
							</li>
						}
				   </ul>;
		}else if(currentQuestionType=="Video"){
			return <ul style={{padding:"20px"}}>
						{displayUploadScreen==true?
							<>
								<p style={{fontSize:"20px",marginBottom:"5%"}}>
									<b>Upload a video here</b>
								</p>
								<hr/>
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
								</li>
							</>:
							<li style={{listStyle:"none"}}>
								<ul>
									<p style={{fontSize:"20px",marginBottom:"5%"}}>
										<b>Submit video</b>
									</p>
									<hr/>
									<li style={{listStyle:"none"}}>
										<video id="videoLI" width="45%" height="50%" controls autoplay>
											<source src={selectedPost} type="video/mp4"/>
										</video>
									</li>
									<InputContainer id="videoDescription" style={{width:"70%",marginRight:"2%"}} placeholder="Describe your video here"/>
									<hr/>
									{isCommentProcessing==false?
										<li onClick={()=>sendData({postData:selectedPost,isAccessTokenUpdated:false})} style={SendButtonCSS}>

											Send
										</li>
										:<p>Please wait while we process your post...</p>
									}
								</ul>
							</li>
						}
				   </ul>
		}else{
			return <ul>
						{displayUploadScreen==true?
							<React.Fragment>
								<li id="regularPostQuestionLI" style={{
											marginBottom:"10%",width:"80%",color:"#585858",listStyle:"none",
											display:"inline-block",fontSize:"30px",marginTop:"2%"}}>
										<b>
											{questions[currentCounter].question}
										</b>
								</li>
								<hr/>
								<li style={{listStyle:"none"}}>
									<ul style={{padding:"0px"}}>
										<li style={{marginRight:"2%",width:"90%",listStyle:"none",display:"inline-block"}}>
											<ul style={{padding:"0px"}}> 
												<li style={{listStyle:"none"}}>
													<InputContainer
														style={{width:"100%"}}
														placeholder="Create a post"
														id="regularPostText"
													/>
												</li>

												{isCommentProcessing==false?
													<li onClick={()=>sendData({
																		postData:document.getElementById("regularPostText").value,
																		isAccessTokenUpdated:false
																	})} style={SendButtonCSS}>
														Send
													</li>
													:<p>Please wait while we process your post... </p>
												}
											</ul>
										</li>
										{/*	
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
										*/}
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
									{isCommentProcessing==false?
										<li onClick={()=>sendData({isAccessTokenUpdated:false})} style={SendButtonCSS}>
											Send
										</li>
										:<p>Please wait while we process your post... </p>
									}
								</ul>
							</li>
						}
				   </ul>
		}
	}

	const constructResponses=(replies)=>{
			var element;
			console.log(replies);
			console.log(currentQuestionType);
			if(replies.length==0){
				return <p> No replies yet :(. Click on the question and click the pencil icon to make a post </p>
			}else{
				if(currentQuestionType=="Image"){
					return <React.Fragment>
								{replies.map(data=>
									<img id="imgUrl" src={data.imgUrl} onClick={()=>displayAppropriatePostModal(data,"Images")} 
									style={{borderRadius:"5px",width:"30%",height:"20%",marginRight:"2%",marginBottom:"2%"}}/>
								)}
							</React.Fragment>;
				}else if(currentQuestionType=="Video"){
					debugger;
					return <React.Fragment>
								{replies.map(data=>
									<div style={{marginRight:"2%",marginBottom:"2%"}}>
										<video id="videoPost" onClick={()=>displayAppropriatePostModal(data,"Videos")} 
											key={uuidv4()} width="150" height="150" borderRadius="5px" muted autoplay>
											<source src={data.videoUrl} type="video/mp4"/>
										</video>
									</div>
								)}
							</React.Fragment>;
				}else{
					return <React.Fragment>
								{replies.map(data=>
									<RegularPostContainer onClick={()=>displayAppropriatePostModal(data,"RegularPosts")}>
										<RegularPostUserInformation>
											<img id="imagePicture" src={data.owner.profilePicture==null?
														NoProfilePicture:
														data.owner.profilePicture} 
											style={{height:"60px",width:"60px",borderRadius:"50%"}}/>
											<p style={{maxHeight:"30px",maxWidth:"80%",overflow:"hidden"}}>
												<b>{data.owner.firstName}</b>
											</p>
										</RegularPostUserInformation>
										<p style={{marginLeft:"1%",maxHeight:"90px",maxWidth:"80%",overflow:"hidden"}}>
											{data.post}		
										</p>
									</RegularPostContainer>
								)}
							</React.Fragment>;
			}
		}
	}

	const increaseCounter=()=>{

		const nextCounter=currentCounter+1;
		const previousType=questions[nextCounter].questionType

		changeCurrentCounter(nextCounter);
		changeCurrentQuestionType(previousType);
	}

	const decreaseCounter=()=>{

		const previousCounter=currentCounter-1;
		const previousType=questions[previousCounter].questionType

		changeCurrentCounter(previousCounter);
		changeCurrentQuestionType(previousType);
	}

	const closeModal=()=>{
		changeImagePortal(false);
		changeRegularPortal(false);
		changeVideoPortal(false);
	}



	return createPortal(
			<React.Fragment>
				{displayImagePortal==true?
					<ImagePostDisplayPortal
						closeModal={closeModal}
						selectedImage={selectedPostDisplayModal}
						recommendedImages={[]}
						targetDom="extendedSymposiumContainer"
					/>:
					<React.Fragment></React.Fragment>
				}

				{displayVideoPortal==true?
					<VideoPostDisplayPortal
						closeModal={closeModal}
						selectedVideo={selectedPostDisplayModal}
						recommendedVideos={[]}
						targetDom="extendedSymposiumContainer"
					/>
					:<React.Fragment></React.Fragment>
				}

				{displayRegularPortal==true?
					<RegularPostDisplayPortal
						closeModal={closeModal}
						selectedPost={selectedPostDisplayModal}
						recommendedRegularPosts={[]}
						targetDom="extendedSymposiumContainer"
					/>
					:<React.Fragment></React.Fragment>
				}
				<ShadowContainer
					onClick={()=>props.closeModal()}
				/>
				<Container>
					{displayCreatePost==true?
						<React.Fragment>
							{createPost()}
						</React.Fragment>:
						<React.Fragment>
							<ul style={{padding:"10px"}}>
								{/*

									<li style={{marginRight:"10%",listStyle:"none",display:"inline-block"}}>
										{currentCounter!=0?
												<a href="javascript:void(0);" style={{textDecoration:"none"}}>
													<NavigateBeforeIcon
														style={{fontSize:"25",borderRadius:"50%",boxShadow:"1px 1px 5px #dbdddf"}}
														onClick={()=>decreaseCounter()}
													/>
												</a>:<React.Fragment></React.Fragment>
										}
									</li>

								*/}

								<li style={{listStyle:"none",display:"inline-block",width:"100%"}}>
									<ul style={{padding:"0px"}}>
										<li id="createButtonLI" onClick={()=>changeDisplayPost(true)} 
											style={MobileCreationButtonCSS}>
											Create
										</li>

										<li id="questionHeader" style={{width:"100%",color:"#585858",listStyle:"none",display:"inline-block",fontSize:"30px"}}>
											<b>
												{questions[currentCounter].question}
											</b>
										</li>
										<hr/>
										<li style={{listStyle:"none",cursor:"pointer"}}>
											<PostsContainer>
												{questions[currentCounter].responsesId.length==0?
													<p>No replies yet :( </p>:
													<React.Fragment>
														{constructResponses(questions[counter].responsesId)}
													</React.Fragment>
												}
											</PostsContainer>
										</li>
									</ul>
								</li>
		  
		  						{/*
									<li style={{marginLeft:"10%",listStyle:"none",display:"inline-block"}}>
										{currentCounter!=(questions.length-1)?
												<a href="javascript:void(0);" style={{textDecoration:"none"}}>
													<NavigateNextIcon
														style={{fontSize:"25",borderRadius:"50%",boxShadow:"1px 1px 5px #dbdddf"}}
														onClick={()=>increaseCounter()}
													/>
												</a>:<React.Fragment></React.Fragment>
										}
									</li>
		  						*/}
							</ul>
						</React.Fragment>
					}
				</Container>
			</React.Fragment>
	,document.getElementById("extendedSymposiumContainer"))
};

export default QuestionsPortal;