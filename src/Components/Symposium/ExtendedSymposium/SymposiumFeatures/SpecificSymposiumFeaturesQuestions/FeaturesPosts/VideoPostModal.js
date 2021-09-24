import React,{useState,useEffect} from "react";
import styled from "styled-components";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CameraIcon from '@material-ui/icons/Camera';
import {createSymposiumUniversityAnswer} from "../../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {getIndustryVideoFeatureAnswers} from "../../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import {useSelector,useDispatch} from "react-redux";
import VideoPostDisplayPortal from "../../../../../ExplorePage/ExplorePageSet/VideoHomeDisplayPortal.js";
import {refreshTokenApiCallHandle} from "../../../../../../Actions/Tasks/index.js";

const Container=styled.div`
	padding:20px;

	@media screen and (max-width:650px){
		#symposiumFeatureVideo{
			width:250px !important;
			margin-bottom:25% !important;
		}
	}
`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	height:10%;
	width:80%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;

const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:60;
	top:0px;
`;

const CreatePostButton=styled.div`
	width:50px;
	height:50px;
	border-radius:50%;
	background-color:white;
	border-color:white;
	border-style:solid;
	padding:10px;
	border-width:5px;
	animation: glowing 1300ms infinite;
	text-align:center;
	cursor:pointer;
	display:flex;
	justify-content:center;

	@keyframes glowing {
      0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
  }
`;

const DescriptionInputContainer=styled.textarea`
	border-radius:5px;
	height:100px;
	width:95%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	margin-top:5%;
	margin-bottom:5%;
	padding:5px;
`;


const PostHeaderContainer=styled.div`
	display:flex;
	flex-direction:row;
`;

const FinalSubmittionContainer=styled.div`
	display:flex;
	flex-direction:column;
	@media screen and (max-width:1370px){
		#uploadVideoUrl{
			height:400px !important;
		}	
	}
	@media screen and (max-width:650px){
		#uploadVideoUrl{
			height:200px !important;
		}	
	}
`;



const VideoCSS={
	listStyle:"none",
	display:"inline-block",
	overflow:"hidden",
	borderRadius:"5px",
	marginRight:"5%",
	marginBottom:"5%",
	width:"40%",
	height:"200px",
	cursor:"pointer"
}

const ButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec"
}


const SubmitButtonCSS={
  listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  width:"30%",
  cursor:"pointer"
}

const SkillLevelButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"2%"
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

const VideoPostUpload=({
	closeModal,
	symposiumId,
	questionId,
	personalInformation,
	userId,
	displayPhoneUI,
	updatePosts,
	selectedUploadType})=>{

	const [finalVideoEditDisplay,changeDisplayForFinalImage]=useState(false);
	const [videoUrl,changeVideoUrl]=useState();
	const [isProccessingPost,changeIsProcessingPost]=useState(false);
	const dispatch=useDispatch();

	const checkVideoLength=()=>{
		const video=document.getElementById("uploadVideoUrl");
		let duration=video.duration;
		duration=Math.ceil(duration);
		if(duration>30){
			alert('The video is too long. As of right now we only support 30 sec videos that are below 50MB. Sorry for the inconvience.');
			return false;
		}else{
			return true;
		}
	}

	const handleUploadVideo=()=>{
		var fileReader=new FileReader();
		var currentVideoUrl=document.getElementById("uploadVideoFile").files[0];

		const maxFileSize=15*1024*1024 //50MB;
		if(currentVideoUrl.size>maxFileSize){
			alert('The file you selected is too large. As of right now we only accept files of size 15MB for videos. Sorry for the inconvenience.');
		}else{
			fileReader.onloadend=()=>{
				const videoResult=fileReader.result;
				changeVideoUrl(videoResult);
				changeDisplayForFinalImage(true);
			}

			if(currentVideoUrl!=null){
				fileReader.readAsDataURL(currentVideoUrl);
			}else{
				alert('Sorry, this image type is not allowed. Please try again');
			}
		}
	}

	const clickFileUpload=()=>{
		document.getElementById("uploadVideoFile").click();
	}

	const submitVideo=async({isAccessTokenUpdated,updatedAccessToken})=>{
		const isVideoAppropriateSize=checkVideoLength();
		if(isVideoAppropriateSize==true){
			changeIsProcessingPost(true);
			const submitedVideo={
				symposiumUniversityPostUrl:videoUrl,
				symposiumuniversityPrimaryText:document.getElementById("videoDescription").value,
				symposiumId,
				questionId,
				isMobile:displayPhoneUI,
				selectedUploadType,
				userId:userId,
				accessToken:isAccessTokenUpdated==true?updatedAccessToken:
					personalInformation.accessToken

			}

			alert('We are processing your post and we wil notify you via email and on here when your post is uploaded. In the meantime you can close this screen everything is being handled');
			let {confirmation,data}=await createSymposiumUniversityAnswer(submitedVideo);
			if(confirmation=="Success"){
				let {message}=data;
				message={
					...message,
					owner:{
						...message.owner,
						firstName:personalInformation.firstName
					},
					videoUrl
				}

				updatePosts(message);
			}else{
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
							personalInformation.refreshToken,
							personalInformation.id,
							submitVideo,
							dispatch,
							{},
							false
						);
				}else{
					alert('Unfortunately there has been an error with adding this image. Please try again');
				}
			}
		}
		changeIsProcessingPost(false);
	}

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	return(
		<React.Fragment>
			<li style={{listStyle:"none"}}>
				<ul style={{padding:"0px"}}>
					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						<li onClick={()=>closeModal()} style={ButtonCSS}>
							Back
						</li>
					</a>
					<li style={{listStyle:"none",display:"inline-block"}}>
						<p style={{fontSize:"20px"}}>
							<b>Upload video for others to view</b>
						</p>
					</li>
				</ul>
			</li>
			<hr/>
			<li style={{marginTop:"2%",listStyle:"none"}}>
				{finalVideoEditDisplay==false?
					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						<li onClick={()=>clickFileUpload()} style={ButtonCSS}>
								<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
											<CameraIcon/>
										</li>

										<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"20px"}}>
											Upload Video
										</li>
									</ul>
								<input type="file" name="img" id="uploadVideoFile" 
									style={{position:"relative",opacity:"0",zIndex:"0"}} onChange={()=>handleUploadVideo()} 
									accept="video/*">
								</input>

						</li>
					</a>:
					<FinalSubmittionContainer>
						<video id="uploadVideoUrl" key={uuidv4()} width="80%" height="300px" 
							borderRadius="5px" controls autoplay style={{backgroundColor:"#151515",borderRadius:"5px"}}>
							<source src={videoUrl} type="video/mp4"/>
						</video>
						
						<DescriptionInputContainer id="videoDescription" placeholder="Write down a description here"/>
						
						{isProccessingPost==true ?
							<p>Please wait while we process your post </p>:
							<li onClick={()=>submitVideo({isAccessTokenUpdated:false})} style={SubmitButtonCSS}>
								Submit
							</li>
						}

					</FinalSubmittionContainer>
				}
			</li>
		</React.Fragment>
	)
}


const VideoPostModal=(props)=>{
	const {
		isOligarch,
		closeModal,
		symposium,
		questionIndex,
		symposiumId,
		question,
		selectedPostId,
		deleteSpecificSymposiumAnswerTrigger
	}=props
	const [displayCreationModal,changeDisplayCreationModal]=useState(false);
	const [questionId,changeQuestionId]=useState();
	const [posts,changePosts]=useState([]);	

	const [displayPostExpand,changePostExpand]=useState(false);
	const [selectedPost,changeSelectedPost]=useState(false);
	const userId=useSelector(state=>state.personalInformation.id);
	const {personalInformation}=useSelector(state=>state);
	const [isLoading,changeIsLoadingIndicator]=useState(false);
	const [displayPhoneUI,changeDisplayPhoneUI]=useState(false);


	const triggerUIChange=()=>{
		if(window.innerWidth<740){
			changeDisplayPhoneUI(true);

		}else{
			changeDisplayPhoneUI(false);
		}
	}

	window.addEventListener('resize',triggerUIChange)

	useEffect(()=>{
		const fetchData=async()=>{
			changeIsLoadingIndicator(true);
			const {confirmation,data}=await getIndustryVideoFeatureAnswers({
				industryId:symposiumId,
				questionIndex,
				questionId:selectedPostId
			})

			if(confirmation=="Success"){
				const {message}=data;
				const {
					posts
				}=message;
				changePosts(posts);
				changeQuestionId(selectedPostId);
			}else{
				alert('Unfortunately there has been an error trying to get this video data. Please try again');
			}
			changeIsLoadingIndicator(false);
		}

		triggerUIChange();
		fetchData();
	},[])


	const displaySelectedPost=(data)=>{
		changeSelectedPost(data);
		changePostExpand(true);
	}

	const closePostModal=()=>{
		changePostExpand(false);
	}

	const deleteSpecificAnswer=async(data,index)=>{
		deleteSpecificSymposiumAnswerTrigger({
			selectedIndex:index,
			changePosts,
			posts,
			selectedPost:data,
			isAccessTokenUpdated:false,
			personalInformation
		})
	}

	const deleteSymposiumAnswerIcon=(data,index)=>{
		return(
			<React.Fragment>
				{(isOligarch==true || data.owner._id==userId)==true &&(
					<div onClick={()=>deleteSpecificAnswer(data,index)}>
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

	const closeVideoUploadModal=()=>{
		changeDisplayCreationModal(false);
	}

	const updatePosts=(message)=>{
		posts.splice(0,0,message);
		changeQuestionId(questionId);
		changePosts([...posts]);
		changeDisplayCreationModal(false);
	}


	return(
		<Container>
			{displayPostExpand==false?
				null:
				<VideoPostDisplayPortal
					closeModal={closePostModal}
					selectedVideo={selectedPost}
					recommendedVideos={[]}
					targetDom={"extendedSymposiumContainer"}
				/>
			}
			{displayCreationModal==false?
				<>
					<PostHeaderContainer>
						<p style={{fontSize:"20px"}}>
							<b>Review my {symposium}</b>
						</p>
						<CreatePostButton onClick={()=>changeDisplayCreationModal(true)} >
							<BorderColorIcon
								style={{fontSize:"20",color:"#C8B0F4"}}
							/>
						</CreatePostButton>
					</PostHeaderContainer>
					<hr/>

					{isLoading==true?
						<p>Loading please wait</p>:
						<React.Fragment>
							{posts.legnth==0?
								<p>No posts</p>:
								<div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
									{posts.map((data,index)=>
										<div style={{display:"flex",flexDirection:"column",marginRight:"5%",marginBottom:"5%"}}>
											<video onClick={()=>displaySelectedPost(data)} 
												id="symposiumFeatureVideo" key={data._id} autoPlay loop autoBuffer muted playsInline 
												style={{borderRadius:"5px",height:"200px",width:"200px"}}>
												<source src={data.videoUrl} type="video/mp4"/>
											</video>	
											{deleteSymposiumAnswerIcon(data,index)}
										</div>
									)}
								</div>
							}
						</React.Fragment>
					}
				</>:
				<VideoPostUpload
					closeModal={closeVideoUploadModal}
					symposiumId={symposiumId}
					userId={userId}
					personalInformation={personalInformation}
					displayPhoneUI={displayPhoneUI}
					updatePosts={updatePosts}
				/>
			}
		</Container>
	);
}

export{
	VideoPostModal,
	VideoPostUpload
};



