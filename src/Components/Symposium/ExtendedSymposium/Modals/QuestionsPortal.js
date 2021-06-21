import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import CameraIcon from '@material-ui/icons/Camera';
import {
	addCommentToPopularQuestions,
	deleteCommentToPopularQuestions
} from "../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import {useSelector,useDispatch} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../../Actions/Tasks/index.js";

import ImagePostDisplayPortal from "../../../ExplorePage/ExplorePageSet/ImageHomeDisplayPortal.js";
import VideoPostDisplayPortal from "../../../ExplorePage/ExplorePageSet/VideoHomeDisplayPortal.js";
import RegularPostDisplayPortal from "../../../ExplorePage/ExplorePageSet/RegularPostHomeDisplayPortal.js";

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
			height:200px !important;
		}
		#creationImage{
			width:50% !important;
			margin-bottom:50px !important;
		}

		#videoPost{
			height:200px !important;
			width:200px !important;
		}
	}

	@media screen and (max-width:650px){
		top:10%;
		width:90% !important;
		height:85% !important;
		left:5% !important;

		#videoLI{
			width:80% !important;
			height:30% !important;
			margin-bottom:5% !important;
		}

		#creationImage{
			width:150px !important;
			height:150px !important;
			margin-bottom:20px !important;
		}

		#creationPostDiv{
			padding:10px !important;
		}
		#postLI{
			margin-left:30% !important;
		}
		#imagePicture{
			width:25% !important;
			height:50px !important;
		}
		#questionHeader{
			margin-top:10% !important;
			font-size:15px !important;
		}
		#imageDescriptionLI{
			width:130% !important;
			margin-left:-20% !important;
		}
		#imgUrl{
			width:80% !important;
			height:180px !important;
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
			width:40% !important;
			height:40% !important;
		}
		#videoLI{
			height:400px !important;
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
		#imagePicture{
			width:15% !important;
		}
		#imgUrl{
			height:200px !important;
		}
		#videoLI{
			height:250px !important;
		}
		#creationImage{
			height:150px !important;
			width:30% !important;
		}
    }
`;

const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.7);
	z-index:40;
	top:0px;
`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	height:40%;
	width:90%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;

	@media screen and (max-width:1370px){
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

	@media screen and (max-width:650px){
		justify-content:center !important;
	}
`;

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
    marginTop:"10%"
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
			selectedSymposium,
			isMobile,
			isOligarch
		}=props;
	console.log(props);

	const [currentReplies,changeCurrentReplies]=useState(questions[counter].responsesId);
	const [displayCreatePost,changeDisplayPost]=useState(false);
	const [displayUploadScreen,changeDisplayUploadScreen]=useState(true);
	let [currentCounter,changeCurrentCounter]=useState(counter);
	const [currentQuestionType,changeCurrentQuestionType]=useState(questions[currentCounter].questionType);

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
			if(currentQuestionType=="Video"){
				alert('We are processing your post and we wil notify you via email and on here when your post is uploaded. In the meantime you can close this screen everything is being handled');
			}
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
												personalInformation.accessToken,
												isMobile
											);
			if(confirmation=="Success"){
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
									<img id="creationImage" src={selectedPost} style={{borderRadius:"5px",width:"40%",height:"30%",marginBottom:"10px"}}/>
								</li>
								<InputContainer id="videoDescription" style={{width:"70%",marginRight:"2%"}} placeholder="Describe your image here"/>
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
									<video style={{backgroundColor:"#151515",borderRadius:"5px"}}
										id="videoLI" width="45%" height="50%" controls autoplay>
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
							</>
						}
				   </React.Fragment>
		}else{
			return <React.Fragment>
						<p id="regularPostQuestionLI" style={{
									marginBottom:"10%",width:"80%",color:"#585858",listStyle:"none",
									display:"inline-block",fontSize:"20px",marginTop:"2%"}}>
								<b>
									{questions[currentCounter].question}
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

	const deleteHighlightedPost=async({selectedData,index,isAccessTokenUpdated,updatedAccessToken})=>{
		debugger;
		const {confirmation,data}=await deleteCommentToPopularQuestions({
											questionId:questions[currentCounter]._id,
							           		targetDeletionResponseId:selectedData._id,
								            symposiumId:selectedSymposium,
								            userId:_id,
								            accessToken:isAccessTokenUpdated==true?updatedAccessToken:
											personalInformation.accessToken
										})
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
						deleteHighlightedPost,
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

	const deleteHighLightedQuestionIcon=(data,index)=>{
		console.log(data);
		return(
			<React.Fragment>
				{(isOligarch==true || data.owner._id==personalInformation.id)==true &&(
					<div onClick={()=>deleteHighlightedPost({selectedData:data,index,isAccessTokenUpdated:false})}>
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
										<img id="imgUrl" src={data.imgUrl} onClick={()=>displayAppropriatePostModal(data,"Images")} 
											style={{borderRadius:"5px",width:"30%",height:"140px",marginRight:"2%",marginBottom:"2%"}}
										/>
										{deleteHighLightedQuestionIcon(data,index)}
									</>
								)}
							</React.Fragment>;
				}else if(currentQuestionType=="Video"){
					return <React.Fragment>
								{replies.map((data,index)=>
									<>
										<div style={{marginRight:"2%",marginBottom:"2%"}}>
											<video id="videoPost" onClick={()=>displayAppropriatePostModal(data,"Videos")} 
												style={{borderRadius:"5px",backgroundColor:"#151515",cursor:"pointer"}}
												 position="relative" width="150" height="150"
											 	key={data.videoUrl} autoPlay loop autoBuffer muted playsInline>
												<source src={data.videoUrl} type="video/mp4"/>
											</video>
										</div>
										{deleteHighLightedQuestionIcon(data,index)}
									</>
								)}
							</React.Fragment>;
				}else{
					return <React.Fragment>
								{replies.map((data,index)=>
									<>
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
										{deleteHighLightedQuestionIcon(data,index)}
									</>
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
						<div id="creationPostDiv" style={{padding:"50px"}}>
							{createPost()}
						</div>:
						<React.Fragment>
							<ul style={{padding:"10px"}}>
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

export default QuestionsPortal;