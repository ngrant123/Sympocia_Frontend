import React,{useState,useEffect} from "react";
import styled from "styled-components";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CameraIcon from '@material-ui/icons/Camera';
import {createIndustryFeatureImageResponse} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {getIndustryImageFeatureAnswers} from "../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import {useSelector,useDispatch} from "react-redux";
import ImagePostDisplayPortal from "../../../../Home/HomePageSet/ImageHomeDisplayPortal.js";
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";
import {FeatureConsumer} from "../../SpecificSympsoiumFeatures/FeatureContext.js";

const Container=styled.div`
	padding:20px;
	@media screen and (max-width:600px){
		#imageLI{
			height:20% !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
 		#imageLI{
			height:60% !important;
		}
    }

	@media screen and (max-width:740px) and (max-height:420px) and (orientation: landscape) {
    	#imageLI{
			height:50% !important;
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
	padding:15px;
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

const ImagePostModal=({closeModal,symposium,displayImage,questionIndex,symposiumId,question,selectedPostId})=>{
	
	const [displayCreationModal,changeDisplayCreationModal]=useState(false);
	const [finalImageEditDisplay,changeDisplayForFinalImage]=useState(false);
	const [imgUrl,changeImageUrl]=useState();
	const [posts,changePosts]=useState([]);
	const [questionId,changeQuestionId]=useState();	
	const [symposiumIdState,changeSymposiumIdState]=useState();

	const [displayPostExpand,changePostExpand]=useState(false);
	const [selectedPost,changeSelectedPost]=useState(false);
	const [isProccessingPost,changeIsProcessingPost]=useState(false);
	const dispatch=useDispatch();
	const {personalInformation}=useSelector(state=>state);
	const [isLoading,changeIsLoadingStatus]=useState(false);


	const userId=useSelector(state=>state.personalInformation.id);

	useEffect(()=>{
		const fetchData=async()=>{
			changeIsLoadingStatus(true);
			const {confirmation,data}=await getIndustryImageFeatureAnswers({
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
				alert('Unfortunately there has been an error trying to get this images data. Please try again');
			}
			changeIsLoadingStatus(false);
		}

		fetchData();
	},[])

	const handleUploadPicture=()=>{
		var fileReader=new FileReader();
		var currentImgUrl=document.getElementById("uploadPictureFile").files[0];

		const maxFileSize=250*1024;
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

	const submitImage=async({isAccessTokenUpdated,updatedAccessToken})=>{
		changeIsProcessingPost(true);
		var image={
			imgUrl:imgUrl,
			description:document.getElementById("imageDescription").value
		}
		const submitedImage={
			image,
			industryId:symposiumId,
			questionId:selectedPostId,
			questionIndex:questionIndex,
			userId:userId,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
						personalInformation.accessToken
		}
		const message={
			imgUrl,
			description:document.getElementById("imageDescription").value
		}
		let {confirmation,data}=await createIndustryFeatureImageResponse(submitedImage);
		
		if(confirmation=="Success"){
			let {message}=data;

			message={
				...message,
				owner:{
					...message.owner,
					firstName:personalInformation.firstName
				},
				imgUrl
			}
			posts.splice(0,0,message);
			changeQuestionId(questionId);
			changePosts([...posts]);
			changeDisplayCreationModal(false);
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
										:<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",marginTop:"2%"}}>
												{posts.length==0?
													<p>No posts</p>:
													<ul style={{padding:"0px"}}>
														{posts.map(data=>
															<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																<li onClick={()=>displaySelectedPost(data)} style={ImageCSS}>
																	<img id="imageLI" src={data.imgUrl} 
																	style={{height:"40%",width:"100%",borderRadius:"5px"}}/>
																</li>
															</a>
														)}
													</ul>
												}
											</li>
										</ul>
									}
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
											<img src={imgUrl} style={{height:"40%",width:"40%",borderRadius:"5px"}}/>
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
							</>
						}
					</Container>
				}
			}
		</FeatureConsumer>
	);
}

export default ImagePostModal;

