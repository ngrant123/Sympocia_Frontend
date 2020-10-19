import React,{useState,useEffect} from "react";
import styled from "styled-components";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import MicIcon from '@material-ui/icons/Mic';
import NoProfilePicture from "../../../../../../../designs/img/NoProfilePicture.png";
import {createSpecificIndustryAudioAnswer} from "../../../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {getIndustryAudioFeatureAnswers} from "../../../../../../../Actions/Requests/PostAxiosRequests/PostPageGetRequests.js";
import {useSelector} from "react-redux";
import RegularPostDisplayPortal from "../../../../../HomePageSet/RegularPostHomeDisplayPortal.js";



const Container=styled.div`
	position:absolute;
	z-index:13;
	height:95%;
	width:75%;
	border-radius:5px;
	top:2%;
	left:20%;
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
	z-index:11;
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

	@keyframes glowing {
      0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
  }
`;

const DescriptionInputContainer=styled.textarea`
	border-radius:5px;
	height:20%;
	width:95%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;

const ProfilePictureCSS={
	position:"relative",
	width:"10%",
	marginRight:"6%",
	top:"-75px",
	listStyle:"none",
	display:"inline-block"
}

const AudioCSS={
	listStyle:"none",
	display:"inline-block",
	overflow:"hidden",
	borderRadius:"5px",
	marginRight:"5%",
	marginBottom:"5%"
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
  width:"30%"
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

///<input type="file" accept=".mp3,audio/*">
const AudioPostModal=({closeModal,symposium,displayImage,modalType,symposiumId,question,selectedPostId,questionIndex})=>{

	const [displayCreationModal,changeDisplayCreationModal]=useState(false);
	const [finalAudioEditDisplay,changeDisplayForFinalAudio]=useState(false);
	const [audioUrl,changeAudioUrl]=useState();
	const [posts,changePosts]=useState([]);
	const [questionId,changeQuestionId]=useState();	
	const [symposiumIdState,changeSymposiumIdState]=useState();	

	const [displayPostExpand,changePostExpand]=useState(false);
	const [selectedPost,changeSelectedPost]=useState(false);
	const userId=useSelector(state=>state.personalInformation.id);

	useEffect(()=>{
		const fetchData=async()=>{
			debugger;
			console.log(symposiumId);
			const {confirmation,data}=await getIndustryAudioFeatureAnswers({
				industryId:symposiumId,
				questionIndex,
				questionId:selectedPostId
			})
			console.log(data);

			if(confirmation=="Success"){
				const {
					questionId,
					posts
				}=data;
				changePosts(posts);
				changeQuestionId(questionId);
			}else{
				alert('Unfortunately there has been an error trying to get this images data. Please try again');
			}
		}

		fetchData();
	},[])

	const handleUploadAudio=()=>{
		var fileReader=new FileReader();
		var currentAudioUrl=document.getElementById("uploadAudioFile").files[0];

		fileReader.onloadend=()=>{
			const audioResult=fileReader.result;
			changeAudioUrl(audioResult);
			changeDisplayForFinalAudio(true);
		}

		if(currentAudioUrl!=null){
			fileReader.readAsDataURL(currentAudioUrl);
		}else{
			alert('Sorry, this image type is not allowed. Please try again');
		}
	}

	const clickFileUpload=()=>{
		document.getElementById("uploadAudioFile").click();
	}

	const submitImage=async()=>{
			debugger;
		var audio={
			audioUrl:audioUrl,
			description:document.getElementById("imageDescription").value
		}
		const submitedAudio={
			audio,
			industryId:symposiumId,
			questionId:selectedPostId,
			questionIndex:questionIndex,
			userId:userId
		}

		let {confirmation,data}=await createSpecificIndustryAudioAnswer(submitedAudio);
		if(confirmation=="Success"){
			data={
				...data,
				post:audioUrl
			}

			posts.splice(0,0,data);
			changeQuestionId(questionId);
			changePosts([...posts]);
			changeDisplayForFinalAudio(false);
			changeDisplayCreationModal(false);
		}else{
			alert('Unfortunately there has been an error with adding this image. Please try again');
		}
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
				<RegularPostDisplayPortal
					closeModal={closePostModal}
					selectedPost={selectedPost}
					recommendedPosts={[]}
					targetDom={"extendedSymposiumContainer"}
				/>
			}

			{displayCreationModal==false?
				<>
					<li style={{listStyle:"none"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								<p style={{fontSize:"20px"}}>
									<b>{symposium} {modalType}</b>
								</p>
							</li>
							<li style={{listStyle:"none",display:"inline-block"}}>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li onClick={()=>changeDisplayCreationModal(true)} 
										style={{listStyle:"none",marginLeft:"400px",marginBottom:"5%"}}>
										<CreatePostButton>
											<BorderColorIcon
												style={{fontSize:"20",color:"#C8B0F4"}}
											/>
										</CreatePostButton>
									</li>
								</a>
							</li>
						</ul>
					</li>
					<hr/>

					<li style={{listStyle:"none"}}>
						<ul style={{padding:"0px"}}>
							<InputContainer placeholder="Search for a person here"/>
							<li style={{listStyle:"none",marginTop:"2%"}}>
								<ul style={{padding:"0px"}}>
									{posts.map(data=>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>displaySelectedPost(data)} style={AudioCSS}>
												<ul style={{padding:"0px"}}>
													<li style={ProfilePictureCSS}>
														<img src={data.owner.profilePicture==null?
															NoProfilePicture:
															data.owner.profilePicture
														} style={{width:"60px",height:"10%",borderRadius:"50%"}}/>
													</li>

													<li style={{listStyle:"none",display:"inline-block"}}>
														<p> 
															<b>{data.owner.firstName}</b>
														</p>
														<audio controls>
														  <source src={data.post} type="audio/ogg"/>
														  <source src={data.post} type="audio/mpeg"/>
															Your browser does not support the audio element.
														</audio>
														<p style={{overflowY:"auto",height:"10%"}}>
															{data.description}
														</p>
													</li>
												</ul>
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
									<b>Upload an image for others to {modalType}</b>
								</p>
							</li>
						</ul>
					</li>
					<hr/>
					<li style={{marginTop:"2%",listStyle:"none"}}>
						{finalAudioEditDisplay==false?
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li onClick={()=>clickFileUpload()} style={ButtonCSS}>
										<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
													<MicIcon/>
												</li>

												<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"20px"}}>
													Upload Audio
												</li>
											</ul>
										<input type="file" id="uploadAudioFile" name="img" accept=".mp3,.mp4,.wav"
											style={{position:"relative",opacity:"0",zIndex:"0"}} onChange={()=>handleUploadAudio()}>
										</input>
								</li>
							</a>:
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",marginBottom:"2%"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",width:"40%"}}>
											<audio controls>
											  <source src={audioUrl} type="audio/ogg"/>
											  <source src={audioUrl} type="audio/mpeg"/>
											Your browser does not support the audio element.
											</audio>
										</li>
										<li style={{width:"45%",listStyle:"none"}}>
											<DescriptionInputContainer id="imageDescription" placeholder="Write down a description here"/>
										</li>
									</ul>
								</li>
								<li onClick={()=>submitImage()} style={SubmitButtonCSS}>
									Submit
								</li>
							</ul>
						}
					</li>
				</>
			}
		</ul>
	);
}

export default AudioPostModal;