import React,{useState,useEffect,useContext} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import CameraIcon from '@material-ui/icons/Camera';
import {
	createSymposiumCommunityAnswer,
	deleteSymposiumCommunityAnswer
} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import {useSelector,useDispatch} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";

import ImagePostDisplayPortal from "../../../../ExplorePage/ExplorePageSet/Modals-Portals/ImageHomeDisplayPortal.js";
import VideoPostDisplayPortal from "../../../../ExplorePage/ExplorePageSet/Modals-Portals/VideoHomeDisplayPortal.js";
import RegularPostDisplayPortal from "../../../../ExplorePage/ExplorePageSet/Modals-Portals/RegularPostHomeDisplayPortal.js";
import {SymposiumContext} from "../../SymposiumContext.js";

import VideoLoadingPrompt from "../../../../GeneralComponents/PostComponent/VideoLoadingPrompt.js";
import {
	Container,
	UploadContainer,
	ShadowContainer,
	InputContainer,
	CreatePostContainer,
	PostsContainer
} from "./CommunityPortalCSS.js";


const SendButtonCSS={
    listStyle:"none",
	borderRadius:"5px",
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#3898ec",
    borderRadius:"5px",
    padding:"10px",
    color:"#3898ec",
    marginRight:"2%",
    marginTop:"2%",
    cursor:"pointer",
    marginTop:"10%",
    width:"20%"
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


const RegularPostContainer=styled.div`
	transition:.8s;
	border-radius:5px;
	padding:20px;
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;
	width:100%;

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
	color:"#3898ec",
	padding:"20px",
	fontSize:"15px",
	listStyle:"none",
	cursor:"pointer",
	width:"20%"
}
/*
	Total madness in these streets bruv
*/

const QuestionUploadOption=({
	currentQuestionType,
	userId,
	questions,
	questionId,
	symposiumId,
	personalInformation,
	question,
	updatePosts,
	dispatch
})=>{
	const [isCommentProcessing,changeIsCommentProcessing]=useState(false);
	const [selectedPost,changeSelectedPost]=useState();
	const [displayUploadScreen,changeDisplayUploadScreen]=useState(true);
	const [displayedVideoProcessingAlertStatus,changeDisplayedVideoProcessingAlertStatus]=useState(false);


	const processingVideoInformationAlert=()=>{
		if(!displayedVideoProcessingAlertStatus){
			alert('We are processing your post and we wil notify you via email and on here when your post is uploaded. In the meantime you can close this screen everything is being handled');
			changeDisplayedVideoProcessingAlertStatus(true);
		}
	}


	const sendData=async({postData,isAccessTokenUpdated,updatedAccessToken})=>{
		//const profileIndicator=personalInformation.industry==null?"Profile":"Company";
		debugger;
		changeIsCommentProcessing(true);
		let description;
		let continueUploadProcess=true;
		if(currentQuestionType=="Video"){
			const isVideoAppropiateSize=checkVideoLength();
			continueUploadProcess=isVideoAppropiateSize;

			description=document.getElementById("videoDescription").value;
		}else if(currentQuestionType=="Image"){
			description=document.getElementById("imageDescription").value;
		}else{
			description=postData;
		}

		if(continueUploadProcess!=false){
			if(currentQuestionType=="Video"){
				processingVideoInformationAlert();
			}
			const postInformation={
				symposiumCommunityPostUrl:postData,
				symposiumCommunityPrimaryText:description,
				symposiumId,
				questionId,
				userId,
				selectedUploadType:currentQuestionType,
				isMobile:false,
				accessToken:isAccessTokenUpdated==true?updatedAccessToken:
						personalInformation.accessToken
			}
			const {confirmation,data}=await createSymposiumCommunityAnswer(postInformation);
			if(confirmation=="Success"){
				let {message}=data;
				if(currentQuestionType=="Images" || currentQuestionType=="Videos"
					|| currentQuestionType=="Image" || currentQuestionType=="Video"){
					const postUrlParameter=currentQuestionType=="Image"?"imgUrl":"videoUrl"
					message={
						...message,
						[postUrlParameter]:postData
					};
				}
				message={
					...message,
					owner:{
						...message.owner,
						_id:userId,
						firstName:personalInformation.firstName
					}
				};
				updatePosts(message);
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

	const uploadFile=(postType)=>{
		const reader=new FileReader();
		const uploadedFile=document.getElementById("uploadFile").files[0];
		let proceedWithUploadIndicator=true;

		if(postType=="Images"){
			const maxFileSize=7000*1024;
			if(uploadedFile.size>maxFileSize){
				alert('Your file is too large. We only accept images that have a size of 250KB. You can go to preview (Mac) and lower the resolution there.');
				proceedWithUploadIndicator=false;
			}
		}else{
			const maxSize=11*1024*1024;
			if(uploadedFile.size>maxSize){
				alert('Your file is too large. We only accept video descriptions that have a size of 11MB. You can go to quicktime (Mac) and lower the resolution there.');
				proceedWithUploadIndicator=false;
			}
		}

		if(proceedWithUploadIndicator==true){
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
	}

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

	const createPost=()=>{
		if(currentQuestionType=="Image"){
			return <React.Fragment>
						{displayUploadScreen==true?
							<>
								<p style={{fontSize:"20px",marginBottom:"5%"}}>
									<b>Upload an image here</b>
								</p>
								<li onClick={()=>document.getElementById("uploadFile").click()} style={{listStyle:"none"}}>
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
												Upload Image
											</li>
										</ul>																			
									</button>
									<input type="file" name="img" id="uploadFile" 
										style={{position:"relative",opacity:"0",zIndex:"0"}} onChange={()=>uploadFile("Images")} 
										accept="image/jpeg">
									</input>
								</li>
							</>:
							<>
								<p style={{fontSize:"20px",marginBottom:"5%"}}>
									<b>Submit image</b>
								</p>
								<hr/>
								<li style={{listStyle:"none"}}>
									<img id="creationImage" src={selectedPost} 
										style={{borderRadius:"5px",width:"20%",height:"20%",marginBottom:"10px"}}
									/>
								</li>
								<InputContainer id="imageDescription" style={{marginRight:"2%"}} placeholder="Describe your image here"/>
								<hr/>
								{isCommentProcessing==false?
									<li onClick={()=>sendData({postData:selectedPost,isAccessTokenUpdated:false})} style={SendButtonCSS}>

										Send
									</li>
									:<p>Please wait while we process your post...</p>
								}
							</>
						}
				   </React.Fragment>;
		}else if(currentQuestionType=="Video"){
			return <React.Fragment>
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
									<input type="file" name="img" id="uploadFile" 
										style={{position:"relative",opacity:"0",zIndex:"0"}} 
										onChange={()=>uploadFile("Videos")} accept="video/*">
									</input>
								</li>
							</>:
							<>
								<p style={{fontSize:"20px",marginBottom:"5%"}}>
									<b>Submit video</b>
								</p>
								<hr/>
								<li style={{listStyle:"none",marginBottom:"20px"}}>
									<VideoLoadingPrompt
										videoElement={
											<video style={{backgroundColor:"#151515",borderRadius:"5px"}}
												id="videoLI" width="45%" height="50%" controls autoplay>
												<source src={selectedPost} type="video/mp4"/>
											</video>
										}
										videoId="videoLI"
									/>
								</li>


								<InputContainer id="videoDescription" style={{width:"100%",marginRight:"2%"}} placeholder="Describe your video here"/>
								<hr/>
								{isCommentProcessing==false?
									<li onClick={()=>sendData({postData:selectedPost,isAccessTokenUpdated:false})} style={SendButtonCSS}>

										Send
									</li>
									:<p>Please wait while we process your post...</p>
								}
							</>
						}
				   </React.Fragment>
		}else{
			return <React.Fragment>
						<p id="regularPostQuestionLI" style={{
									marginBottom:"10%",width:"80%",color:"#585858",listStyle:"none",
									display:"inline-block",fontSize:"20px",marginTop:"2%"}}>
								<b>
									{question}
								</b>
						</p>
						<hr/>
						<div style={{listStyle:"none"}}>
							<InputContainer
								style={{width:"100%"}}
								placeholder="Create a post"
								id="regularPostText"
							/>
							{isCommentProcessing==false?
								<li onClick={()=>sendData({
													postData:document.getElementById("regularPostText").value,
													isAccessTokenUpdated:false
												})} style={SendButtonCSS}>
									Send
								</li>
								:<p>Please wait while we process your post... </p>
							}
						</div>
				   </React.Fragment>
		}
	}

	return(
		<UploadContainer>
			{createPost()}
		</UploadContainer>
	)
}



const QuestionsPortal=(props)=>{
	const ownerInformation=useSelector(state=>state.personalInformation);
	const userId=useSelector(state=>state.personalInformation.id);
	const [displayPhoneUI,changeDisplayPhoneUI]=useState(false);
	const personalInformation=useSelector(state=>state.personalInformation);

	const [displayImagePortal,changeImagePortal]=useState(false);
	const [displayVideoPortal,changeVideoPortal]=useState(false);
	const [displayRegularPortal,changeRegularPortal]=useState(false);
	const [selectedPostDisplayModal,changeSelectedPostDisplayModal]=useState();
	const symposiumInformation=useContext(SymposiumContext);

	const {	questionType,
			counter,
			questions,
			closeModalAndDisplayData,
			selectedSymposium,
			isMobile,
			isOligarch,
			responses,
			closeModal
		}=props;

	const [currentReplies,changeCurrentReplies]=useState(responses);
	const [displayCreatePost,changeDisplayPost]=useState(false);
	const [currentQuestionType,changeCurrentQuestionType]=useState(questions[counter].questionType);

	//const [displayExpandedQuestionModal,change]

	const dispatch=useDispatch();

	const triggerUIChange=()=>{
		if(window.innerWidth<740){
			changeDisplayPhoneUI(true);

		}else{
			changeDisplayPhoneUI(false);
		}
	}
	useEffect(()=>{
		triggerUIChange();
	},[]);

	window.addEventListener('resize',triggerUIChange)

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


	const deleteSymposiumCommunityPost=async({selectedData,index,isAccessTokenUpdated,updatedAccessToken})=>{
		const {confirmation,data}=await deleteSymposiumCommunityAnswer({
											questionId:selectedData._id,
							           		responseId:questions[counter]._id,
								            symposiumId:symposiumInformation.symposiumId,
								            ownerId:userId,
								            accessToken:isAccessTokenUpdated==true?updatedAccessToken:
											personalInformation.accessToken
										});
		if(confirmation=="Success"){
			const currentResponses=currentReplies;
			currentResponses.splice(index,1);
			changeCurrentReplies([...currentResponses]);
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						deleteSymposiumCommunityPost,
						dispatch,
						{
							selectedData,
							index
						},
						false
					);
			}else{
				alert('Unfortunately there has been an error when trying to delete your post. Please try again');
			}
		}
	}

	const deleteSymposiumCommunityQuestionIcon=(data,index)=>{
		return(
			<React.Fragment>
				{(isOligarch==true || data.owner._id==personalInformation.id)==true &&(
					<div onClick={()=>deleteSymposiumCommunityPost({selectedData:data,index,isAccessTokenUpdated:false})}>
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
					</div>
				)}
			</React.Fragment>
		)
	}


	const constructResponses=(replies)=>{
			var element;
			if(replies.length==0){
				return <p> No replies yet :(. Click on the question and click the pencil icon to make a post </p>
			}else{
				if(currentQuestionType=="Image"){
					return <React.Fragment>
								{replies.map((data,index)=>
									<>
										<div id="imageCommunityResponses" 
											style={{display:"flex",flexDirection:"column",marginRight:"2%",marginBottom:"5%"}}>
											<img id="imgUrl" src={data.imgUrl} onClick={()=>displayAppropriatePostModal(data,"Images")} 
												style={{borderRadius:"5px",height:"130px",width:"135px"}}
											/>
											{deleteSymposiumCommunityQuestionIcon(data,index)}
										</div>
									</>
								)}
							</React.Fragment>;
				}else if(currentQuestionType=="Video"){
					return <React.Fragment>
								{replies.map((data,index)=>
									<div style={{display:"flex",flexDirection:"column",marginRight:"2%",marginBottom:"2%"}}>
										<VideoLoadingPrompt
											videoElement={
												<video id={"videoPost"+index} onClick={()=>displayAppropriatePostModal(data,"Videos")} 
													style={{borderRadius:"5px",backgroundColor:"#151515",cursor:"pointer"}}
													 position="relative" width="170" height="150"
												 	key={data.videoUrl} autoPlay loop autoBuffer muted playsInline>
													<source src={data.videoUrl} type="video/mp4"/>
												</video>
											}
											videoId={"videoPost"+index} 
										/>
										{deleteSymposiumCommunityQuestionIcon(data,index)}
										<hr/>
									</div>
								)}
							</React.Fragment>;
				}else{
					return <div style={{display:"flex",flexDirection:"column"}}>
								{replies.map((data,index)=>
									<div id="regularReplyContainer">
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
											<p style={{marginLeft:"5%",maxHeight:"90px",maxWidth:"80%",overflow:"hidden"}}>
												{data.post}	
											</p>
										</RegularPostContainer>
										{deleteSymposiumCommunityQuestionIcon(data,index)}
										<hr/>
									</div>
								)}
							</div>;
			}
		}
	}

	const closePostModal=()=>{
		changeImagePortal(false);
		changeRegularPortal(false);
		changeVideoPortal(false);
	}

	const updatePosts=(recentlyAddedPost)=>{
		changeDisplayPost(false);
		closeModalAndDisplayData({
			data:recentlyAddedPost,
			currentQuestionType
		});
	}

	const closeIcon=()=>{
		return(
			<div id="closeIconMobile" style={{marginBottom:"2%",cursor:"pointer",display:"none"}} onClick={()=>closeModal()}>
				<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
					 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
					 stroke-linecap="round" stroke-linejoin="round">
					  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					  <circle cx="12" cy="12" r="9" />
					  <path d="M10 10l4 4m0 -4l-4 4" />
				</svg>
			</div>
		)
	}


	return createPortal(
			<React.Fragment>
				{displayImagePortal==true?
					<ImagePostDisplayPortal
						closeModal={closePostModal}
						selectedImage={selectedPostDisplayModal}
						recommendedImages={[]}
						targetDom="extendedSymposiumContainer"
					/>:
					<React.Fragment></React.Fragment>
				}

				{displayVideoPortal==true?
					<VideoPostDisplayPortal
						closeModal={closePostModal}
						selectedVideo={selectedPostDisplayModal}
						recommendedVideos={[]}
						targetDom="extendedSymposiumContainer"
					/>
					:<React.Fragment></React.Fragment>
				}

				{displayRegularPortal==true?
					<RegularPostDisplayPortal
						closeModal={closePostModal}
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
					{closeIcon()}
					{displayCreatePost==true?
						<QuestionUploadOption
							currentQuestionType={currentQuestionType}
							userId={userId}
							questions={questions}
							questionId={questions[counter]._id}
							symposiumId={symposiumInformation.symposiumId}
							personalInformation={personalInformation}
							question={questions[counter].question}
							updatePosts={updatePosts}
							dispatch={dispatch}
						/>:
						<React.Fragment>
							<ul style={{padding:"15px"}}>
								<li style={{listStyle:"none",display:"inline-block",width:"100%"}}>
									<ul style={{padding:"0px"}}>
										<li id="createButtonLI" onClick={()=>changeDisplayPost(true)} 
											style={MobileCreationButtonCSS}>
											Create
										</li>

										<li id="questionHeader" style={{width:"100%",color:"#585858",listStyle:"none",display:"inline-block",fontSize:"24px"}}>
											<b>
												{questions[counter].question}
											</b>
										</li>
										<hr/>
										<li style={{listStyle:"none",cursor:"pointer"}}>
											<PostsContainer>
												{responses.length==0?
													<p>No replies yet :( </p>:
													<React.Fragment>
														{constructResponses(currentReplies)}
													</React.Fragment>
												}
											</PostsContainer>
										</li>
									</ul>
								</li> 
							</ul>
						</React.Fragment>
					}
				</Container>
			</React.Fragment>
	,document.getElementById("extendedSymposiumContainer"))
};

export{
	QuestionsPortal,
	QuestionUploadOption
};