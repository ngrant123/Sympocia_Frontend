import React,{useState,useEffect} from "react";
import styled from "styled-components";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import MicIcon from '@material-ui/icons/Mic';
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import {createSymposiumUniversityAnswer} from "../../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {getSymposiumUniversityPostsApi} from "../../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import {useSelector,useDispatch} from "react-redux";
import RegularPostDisplayPortal from "../../../../../ExplorePage/ExplorePageSet/Modals-Portals/RegularPostHomeDisplayPortal.js";
import {refreshTokenApiCallHandle} from "../../../../../../Actions/Tasks/index.js";


const Container=styled.div`
	position:absolute;
	z-index:40;
	height:95%;
	width:75%;
	border-radius:5px;
	top:2%;
	left:20%;
	overflow-y:auto;
	background-color:white;
	padding:20px;

	@media screen and (max-width:650px){
		#audioLI{
			width:50% !important;
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
	z-index:40;
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
	height:20%;
	width:95%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;

`;

const PostHeaderContainer=styled.div`
	display:flex;
	flex-direction:row;
`;


const AudioPostContainer=styled.div`
	display:flex;
	flex-direction:column;
	cursor:pointer;
	margin-bottom:5%;
`;

const AudioPostOwnerInformation=styled.div`
	display:flex;
	flex-direction:row;
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

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}
///<input type="file" accept=".mp3,audio/*">
const AudioPostUpload=({
	closeModal,
	symposiumId,
	questionId,
	userId,
	personalInformation,
	updatePosts,
	selectedUploadType})=>{

	const [finalAudioEditDisplay,changeDisplayForFinalAudio]=useState(false);
	const [audioUrl,changeAudioUrl]=useState();
	const [isProccessingPost,changeIsProcessingPost]=useState(false);
	const dispatch=useDispatch();

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

	const submitAudio=async({isAccessTokenUpdated,updatedAccessToken})=>{
		changeIsProcessingPost(true);
		const submitedAudio={
			symposiumUniversityPostUrl:audioUrl,
			symposiumuniversityPrimaryText:document.getElementById("audioDescription").value,
			symposiumId,
			questionId,
			isMobile:false,
			selectedUploadType,
			userId,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
						personalInformation.accessToken
		}

		let {confirmation,data}=await createSymposiumUniversityAnswer(submitedAudio);
		if(confirmation=="Success"){
			let {message}=data;
			message={
				...message,
				post:audioUrl,
				owner:{
					...message.owner,
					firstName:personalInformation.firstName
				}
			}
			updatePosts(message);
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						submitAudio,
						dispatch,
						{},
						false
					);
			}else{
				alert('Unfortunately there has been an error with adding this audio post. Please try again');
			}
		}
		changeIsProcessingPost(false);
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
							<b>Upload an audio for others to listen to</b>
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
									<audio id="audioLI" controls>
									  <source src={audioUrl} type="audio/ogg"/>
									  <source src={audioUrl} type="audio/mp4"/>
									Your browser does not support the audio element.
									</audio>
								</li>
								<DescriptionInputContainer id="audioDescription" 
									placeholder="Write down a description here"
								/>
							</ul>
						</li>

						{isProccessingPost==true ?
							<p>Please wait while we process your post </p>:
							<li onClick={()=>submitAudio({isAccessTokenUpdated:false})} style={SubmitButtonCSS}>
								Submit
							</li>
						}
					</ul>
				}
			</li>
		</React.Fragment>
	)
}

const AudioPostModal=(props)=>{
	const {
		isOligarch,
		closeModal,
		symposium,
		symposiumId,
		selectedQuestion,
		deleteSpecificSymposiumAnswerTrigger
	}=props;

	const {
		_id,
		question,
		questionId,
		questionType
	}=selectedQuestion;

	const [displayCreationModal,changeDisplayCreationModal]=useState(false);
	const [posts,changePosts]=useState([]);
	const [symposiumIdState,changeSymposiumIdState]=useState();	

	const [displayPostExpand,changePostExpand]=useState(false);
	const [selectedPost,changeSelectedPost]=useState(false);
	const userId=useSelector(state=>state.personalInformation.id);
	const name=useSelector(state=>state.personalInformation.firstName);
	const {personalInformation}=useSelector(state=>state);
	const [isLoading,changeIsLoading]=useState(false);

	const postFeedTokenGenerator=()=>{
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	useEffect(()=>{
		const fetchData=async()=>{
			changeIsLoading(true);
			const symposiumFetchParams={
				questionId,
	            questionType,
	            questionLevel:null,
	            currentPostSessionManagmentToken:postFeedTokenGenerator(),
	            ownerId:userId
			}

			const {confirmation,data}=await getSymposiumUniversityPostsApi(symposiumFetchParams)

			if(confirmation=="Success"){
				const {message}=data;
				changePosts(message);
			}else{
				alert('Unfortunately there has been an error trying to get this images data. Please try again');
			}
			changeIsLoading(false);
		}

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

	const closeCreationModal=()=>{
		changeDisplayCreationModal(false);
	}

	const updatePosts=(uploadedPost)=>{
		posts.splice(0,0,uploadedPost);
		changePosts([...posts]);
		changeDisplayCreationModal(false);
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
					<PostHeaderContainer>
						<p style={{fontSize:"20px"}}>
							<b>{question}</b>
						</p>
						<CreatePostButton onClick={()=>changeDisplayCreationModal(true)}>
							<BorderColorIcon
								style={{fontSize:"20",color:"#C8B0F4"}}
							/>
						</CreatePostButton>
					</PostHeaderContainer>
					<hr/>
					{isLoading==true?
						<p>Loading please wait...</p>:
						<li style={{listStyle:"none"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",marginTop:"2%"}}>
									{posts.length==0?
										<p>No posts</p>:
										<ul style={{padding:"0px"}}>
											{posts.map((data,index)=>
												<>
													<AudioPostContainer onClick={()=>displaySelectedPost(data)}>
														<AudioPostOwnerInformation>
															<img src={data.owner.profilePicture==null?
																	NoProfilePicture:
																	data.owner.profilePicture
																} style={{width:"60px",height:"60px",borderRadius:"50%"}}
															/>
															<p> 
																<b>{data.owner.firstName}</b>
															</p>
														</AudioPostOwnerInformation>
														<audio key={data._id} controls>
														  <source src={data.post} type="audio/ogg"/>
														  <source src={data.post} type="audio/mp4"/>
															Your browser does not support the audio element.
														</audio>
														<p style={{overflowY:"auto",maxHeight:"10%",overflow:"hidden"}}>
															{data.description}
														</p>
													</AudioPostContainer>
													{deleteSymposiumAnswerIcon(data,index)}
													<hr style={HorizontalLineCSS}/>
												</>
											)}
										</ul>
									}
								</li>
							</ul>
						</li>
					}
				</>:
				<AudioPostUpload
					questionId={questionId}
					selectedUploadType={questionType}
					closeModal={closeCreationModal}
					symposiumId={symposiumId}
					userId={userId}
					personalInformation={personalInformation}
					updatePosts={updatePosts}
				/>
			}
		</ul>
	);
}

export{
	AudioPostUpload,
	AudioPostModal
};