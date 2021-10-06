import React,{useState,useEffect} from "react";
import styled from "styled-components";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CameraIcon from '@material-ui/icons/Camera';
import {
	createSymposiumUniversityAnswer
} from "../../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {getSymposiumUniversityPostsApi} from "../../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import {useSelector,useDispatch} from "react-redux";
import ImagePostDisplayPortal from "../../../../../ExplorePage/ExplorePageSet/ImageHomeDisplayPortal.js";
import {refreshTokenApiCallHandle} from "../../../../../../Actions/Tasks/index.js";
import {FeatureConsumer} from "../FeatureContext.js";

const Container=styled.div`
	padding:20px;
	@media screen and (max-width:1370px){
		#image{
			height:200px !important;
			width:200px !important;
		}
		#imageLI{
			width:60% !important;
			height:100% !important;
		}
	}
	@media screen and (max-width:650px){
		#imageLI{
			width:80% !important;
		}
		#image{
			height:100px !important;
			width:100px !important;
			margin-bottom:90px !important;
		}
		#selectedImage{
			width:150px !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
 		#image{
			height:200px !important;
		}
    }

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	#image{
    		width:250px !important;
			height:200px !important;
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
	display:flex;
	justify-content:center;
	cursor:pointer;

	@keyframes glowing {
      0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
  }
`;

const DescriptionInputContainer=styled.textarea`
	border-radius:5px;
	height:70px;
	width:95%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	margin-top:5%;
	margin-bottom:5%;

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
		height:170px;
    }
`;



const ImagePopupContainer=styled.div`
	position:absolute;
	background-color:white;
	width:70%;
	height:65%;
	border-radius:5px; 
	z-index:36;
	left:15%;
	top:20%;
	overflow-y:scroll;
`;

const FinalPostContainerInformation=styled.div`
	display:flex;
	flex-direction:row;
`;

const FinalSubmittionContainer=styled.div`
	display:flex;
	flex-direction:column;

	@media screen and (max-width:650px){
		#selectedImage{
			height:130px !important;
		}
	}
	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
		#selectedImage{
			height:270px !important;
		}
    }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		#selectedImage{
			height:190px !important;
		}
    }
`;

const PostHeaderContainer=styled.div`
	display:flex;
	flex-direction:row;
`;

const ImageCSS={
	listStyle:"none",
	display:"inline-block",
	overflow:"hidden",
	borderRadius:"5px",
	marginRight:"5%",
	marginBottom:"5%",
	width:"40%",
	height:"45%"
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

const ImagePostUpload=({
	closeModal,
	symposiumId,
	userId,
	personalInformation,
	updatePosts,
	questionId,
	selectedUploadType})=>{

	const [imgUrl,changeImageUrl]=useState();
	const [finalImageEditDisplay,changeDisplayForFinalImage]=useState(false);
	const [isProccessingPost,changeIsProcessingPost]=useState(false);
	const dispatch=useDispatch();

	const submitImage=async({isAccessTokenUpdated,updatedAccessToken})=>{
		changeIsProcessingPost(true);

		const submitedImage={
			symposiumUniversityPostUrl:imgUrl,
			symposiumuniversityPrimaryText:document.getElementById("imageDescription").value,
			symposiumId,
			questionId,
			isMobile:false,
			selectedUploadType,
			userId:userId,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
						personalInformation.accessToken
		}
		let {confirmation,data}=await createSymposiumUniversityAnswer(submitedImage);
		
		if(confirmation=="Success"){
			let {message}=data;
			message={
				...message,
				imgUrl
			}
			updatePosts(message);
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						submitImage,
						dispatch,
						{},
						false
					);
			}else{
				alert('Unfortunately there has been an error with adding this image. Please try again');
			}
		}

		changeIsProcessingPost(false);
	}

	const handleUploadPicture=()=>{
		var fileReader=new FileReader();
		var currentImgUrl=document.getElementById("uploadPictureFile").files[0];

		const maxFileSize=7000*1024;
		if(currentImgUrl.size>maxFileSize){
			alert('Your file is too large. We only accept images that have a size of 250KB. You can go to preview (Mac) and lower the resolution there.');
		}else{
			fileReader.onloadend=()=>{
				const imgResult=fileReader.result;
				changeImageUrl(imgResult);
				changeDisplayForFinalImage(true);
			}

			if(currentImgUrl!=null){
				fileReader.readAsDataURL(currentImgUrl);
			}else{
				alert('Sorry, this image type is not allowed. Please try again');
			}
		}
	}


	const clickFileUpload=()=>{
		document.getElementById("uploadPictureFile").click();
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
							<b>Upload an image for others to see</b>
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
											Upload Photo
										</li>
									</ul>
								<input type="file" name="img" id="uploadPictureFile" 
									style={{position:"relative",opacity:"0",zIndex:"0"}} onChange={()=>handleUploadPicture()} 
									accept="image/jpeg">
								</input>
						</li>
					</a>:
					<FinalSubmittionContainer>
						<img id="selectedImage" src={imgUrl} style={{height:"210px",width:"40%",borderRadius:"5px"}}/>
						<DescriptionInputContainer id="imageDescription" placeholder="Write down a description here"/>

						{isProccessingPost==true ?
							<p>Please wait while we process your post </p>:
							<li onClick={()=>submitImage({isAccessTokenUpdated:false})} style={SubmitButtonCSS}>
								Submit
							</li>
						}
						
					</FinalSubmittionContainer>
				}
			</li>
		</React.Fragment>
	)
}

const ImagePostModal=(props)=>{
	const {
		isOligarch,
		closeModal,
		symposium,
		symposiumId,
		selectedQuestion,
		deleteSpecificSymposiumAnswerTrigger
	}=props

	const {
		_id,
		question,
		questionType
	}=selectedQuestion;

	const [displayCreationModal,changeDisplayCreationModal]=useState(false);
	const [posts,changePosts]=useState([]);
	const [symposiumIdState,changeSymposiumIdState]=useState();

	const [displayPostExpand,changePostExpand]=useState(false);
	const [selectedPost,changeSelectedPost]=useState(false);
	const {personalInformation}=useSelector(state=>state);
	const [isLoading,changeIsLoadingStatus]=useState(false);


	const userId=useSelector(state=>state.personalInformation.id);
	const postFeedTokenGenerator=()=>{
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	useEffect(()=>{
		const fetchData=async()=>{
			changeIsLoadingStatus(true);

			const symposiumFetchParams={
				questionId:_id,
	            questionType,
	            questionLevel:null,
	            currentPostSessionManagmentToken:postFeedTokenGenerator(),
	            ownerId:userId
			}

			const {confirmation,data}=await getSymposiumUniversityPostsApi(symposiumFetchParams);

			if(confirmation=="Success"){
				const {message}=data;
				changePosts(message);
			}else{
				alert('Unfortunately there has been an error trying to get this images data. Please try again');
			}
			changeIsLoadingStatus(false);
		}

		fetchData();
	},[])


	const initializeSymposiumId=(id)=>{
		changeSymposiumIdState(id);
	}

	const displaySelectedPost=(data)=>{
		changeSelectedPost(data);
		changePostExpand(true);
	}
	const closePostModal=()=>{
		changePostExpand(false);
	}

	const triggerCreationModal=(isGuestProfile)=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free')
		}else{
			changeDisplayCreationModal(true)
		}
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

	const updatePosts=(post)=>{
		posts.splice(0,0,post);
		changePosts([...posts]);
		changeDisplayCreationModal(false);

	}
	return(
		<FeatureConsumer>
			{featureConsumer=>{
				return <Container>
						{displayPostExpand==false?
								null:
								<div style={{zIndex:"36"}}>
									<ImagePostDisplayPortal
										closeModal={closePostModal}
										selectedImage={selectedPost}
										recommendedImages={[]}
										targetDom={"extendedSymposiumContainer"}
									/>
								</div>
							}

						{displayCreationModal==false?
							<>
								<PostHeaderContainer>
									<p style={{fontSize:"20px",marginRight:"5%"}}>
										<b>{question}</b>
									</p>
									<CreatePostButton onClick={()=>triggerCreationModal(featureConsumer.isGuestProfile)}>
										<BorderColorIcon
											style={{fontSize:"20",color:"#C8B0F4"}}
										/>
									</CreatePostButton>
								</PostHeaderContainer>
								<hr/>

								<li style={{listStyle:"none"}}>
									{isLoading==true?
										<p>Loading please wait...</p>
										:<div style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
											{posts.length==0?
												<p>No posts</p>:
												<>
													{posts.map((data,index)=>
														<div id="image" 
															style={{marginRight:"20px",width:"200px",height:"200px",marginBottom:"15%"}}>
															<img src={data.imgUrl} 
															 	onClick={()=>displaySelectedPost(data)} style={ImageCSS}
																style={{height:"100%",width:"100%",borderRadius:"5px"}}
															/>
															{deleteSymposiumAnswerIcon(data,index)}
														</div>
													)}
												</>
											}
										</div>
									}
								</li>
							</>:
							<ImagePostUpload
								closeModal={closeCreationModal}
								symposiumId={symposiumId}
								userId={personalInformation.id}
								personalInformation={personalInformation}
								updatePosts={updatePosts}
								questionId={_id}
								selectedUploadType={questionType}
							/>
						}
					</Container>
				}
			}
		</FeatureConsumer>
	);
}

export{
	ImagePostModal,
	ImagePostUpload
};

