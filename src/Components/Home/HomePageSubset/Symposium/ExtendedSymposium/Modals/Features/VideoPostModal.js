import React,{useState,useEffect} from "react";
import styled from "styled-components";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CameraIcon from '@material-ui/icons/Camera';
import {createSpecificIndustryVideoAnswer} from "../../../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {getIndustryVideoFeatureAnswers} from "../../../../../../../Actions/Requests/PostAxiosRequests/PostPageGetRequests.js";
import {useSelector} from "react-redux";
import VideoPostDisplayPortal from "../../../../../HomePageSet/VideoHomeDisplayPortal.js";


const Container=styled.div`
	position:absolute;
	z-index:45;
	height:95%;
	width:80%;
	border-radius:5px;
	top:2%;
	left:10%;
	overflow-y:auto;
	background-color:white;
	padding:20px;
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
	padding:15px;
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
`;



const ImageCSS={
	listStyle:"none",
	display:"inline-block",
	overflow:"hidden",
	borderRadius:"5px",
	marginRight:"5%",
	marginBottom:"5%",
	width:"40%"
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

const VideoPostModal=({closeModal,symposium,displayVideoHandler,modalType,questionIndex,symposiumId,question,selectedPostId})=>{
	
	const [displayCreationModal,changeDisplayCreationModal]=useState(false);
	const [finalImageEditDisplay,changeDisplayForFinalImage]=useState(false);
	const [videoUrl,changeVideoUrl]=useState();
	const [questionId,changeQuestionId]=useState();
	const [posts,changePosts]=useState([]);	

	const [displayPostExpand,changePostExpand]=useState(false);
	const [selectedPost,changeSelectedPost]=useState(false);
	const userId=useSelector(state=>state.personalInformation.id);


	useEffect(()=>{
		const fetchData=async()=>{
			
			console.log(symposiumId);
			const {confirmation,data}=await getIndustryVideoFeatureAnswers({
				industryId:symposiumId,
				questionIndex,
				questionId:selectedPostId
			})

			if(confirmation=="Success"){
				const {message}=data;
				const {
					questionId,
					posts
				}=message;
				changePosts(posts);
				changeQuestionId(questionId);
			}else{
				alert('Unfortunately there has been an error trying to get this images data. Please try again');
			}
		}

		fetchData();
	},[])

	const handleUploadVideo=()=>{
		var fileReader=new FileReader();
		var currentVideoUrl=document.getElementById("uploadVideoFile").files[0];

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

	const clickFileUpload=()=>{
		document.getElementById("uploadVideoFile").click();
	}

	const submitVideo=async()=>{
		
			
		var video={
			videoUrl,
			description:document.getElementById("videoDescription").value
		}
		const submitedVideo={
			video,
			industryId:symposiumId,
			questionId:selectedPostId,
			questionIndex:questionIndex,
			userId:userId
		}

		let {confirmation,data}=await createSpecificIndustryVideoAnswer(submitedVideo);
		if(confirmation=="Success"){
			let {message}=data;
			message={
				...message,
				videoUrl
			}

			posts.splice(0,0,message);
			changeQuestionId(questionId);
			changePosts([...posts]);
			changeDisplayCreationModal(false);
		}else{
			alert('Unfortunately there has been an error with adding this image. Please try again');
		}
	}

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const displaySelectedPost=(data)=>{
		changeSelectedPost(data);
		changePostExpand(true);
	}

	const closePostModal=()=>{
		changePostExpand(false);
	}
	return(
		<ul style={{padding:"20px"}}>
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

					<li style={{listStyle:"none"}}>
						<ul style={{padding:"0px"}}>
							{/*
								<InputContainer placeholder="Search for a person here"/>
							*/}
							<li style={{listStyle:"none",marginTop:"2%"}}>
								<ul style={{padding:"0px"}}>
									{posts.map(data=>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>displaySelectedPost(data)} style={ImageCSS}>
												<video key={data._id} width="100%" height="40%" borderRadius="5px" controls autoplay>
													<source src={data.videoUrl} type="video/mp4"/>
												</video>
											</li>
										</a>
									)}
								</ul>
							</li>
						</ul>
					</li>
				</>:
				<>
					<li style={{listStyle:"none"}}>
						<ul style={{padding:"0px"}}>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li onClick={()=>changeDisplayCreationModal(false)} style={ButtonCSS}>
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
						{finalImageEditDisplay==false?
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
								<video key={uuidv4()} width="80%" height="20%" borderRadius="5px" controls autoplay>
									<source src={videoUrl} type="video/mp4"/>
								</video>
								
								<DescriptionInputContainer id="videoDescription" placeholder="Write down a description here"/>
								<li onClick={()=>submitVideo()} style={SubmitButtonCSS}>
									Submit
								</li>

							</FinalSubmittionContainer>
						}
					</li>
				</>
			}
		</ul>
	);
}

export default VideoPostModal;