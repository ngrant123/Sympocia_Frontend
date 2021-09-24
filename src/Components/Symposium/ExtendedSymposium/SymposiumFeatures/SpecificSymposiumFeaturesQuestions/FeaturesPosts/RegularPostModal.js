import React,{useState,useEffect} from "react";
import styled from "styled-components";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CameraIcon from '@material-ui/icons/Camera';
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import {
	createSymposiumUniversityAnswer,
	deleteSpecificSymposiumAnswer
} from "../../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {getIndustryRegularPostFeatureAnswers} from "../../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import {useSelector,useDispatch} from "react-redux";
import RegularPostDisplayPortal from "../../../../../ExplorePage/ExplorePageSet/RegularPostHomeDisplayPortal.js";
import {refreshTokenApiCallHandle} from "../../../../../../Actions/Tasks/index.js";

const Container=styled.div`
	position:absolute;
	z-index:40;
	height:95%;
	width:80%;
	border-radius:5px;
	top:2%;
	left:10%;
	overflow-y:auto;
	background-color:white;
	padding:20px;
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
	height:30%;
	width:80%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	margin-top:2%;
	margin-bottom:2%;

	@media screen and (max-width:600px){
		height:60% !important;
		width:90% !important;
	}
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
	height:20%;
	width:95%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;

const RegularPostContainer=styled.div`
	display:flex;
	flex-direction:column;
	cursor:pointer;
`;

const RegularPostInformation=styled.div`
	display:flex;
	flex-direction:row;
`;


const PostHeaderContainer=styled.div`
	display:flex;
	flex-direction:row;
`;

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

const LevelSelectionCSS={	
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white"
}

const KnowledgeLevelIndicatorCSS={
  listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  marginTop:"1%"
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


const DropDownButtonCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white"
}

const TextPostUpload=({
	symposiumId,
	questionId,
	userId,
	personalInformation,
	displayCurrentLevel,
	updatePosts})=>{
	
	const [knowledgeLevel,changeKnowledge]=useState();
	const [isProccessingPost,changeIsProcessingPost]=useState(false);
	const dispatch=useDispatch();

	const submitPost=async({isAccessTokenUpdated,updatedAccessToken})=>{	
		if(knowledgeLevel==null || document.getElementById("post").value==""){
			alert('Please enter a level to continue');
		}else{
			changeIsProcessingPost(true);

			const post={
				symposiumuniversityPrimaryText:document.getElementById("post").value,
				symposiumId,
				questionId,
				isMobile:false,
				selectedUploadType:"Text",
				textKnowledgeLevel:knowledgeLevel,
				userId:userId,
				accessToken:isAccessTokenUpdated==true?updatedAccessToken:
							personalInformation.accessToken
			}

			const {confirmation,data}=await createSymposiumUniversityAnswer(post);
			if(confirmation=="Success"){
				let {message}=data;
				if(displayCurrentLevel.toLowerCase()==knowledgeLevel.toLowerCase()){	
					message={
						...message,
						owner:{
							...message.owner,
							firstName:personalInformation.firstName
						}
					}
					updatePosts(message);
				}
			}else{
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
							personalInformation.refreshToken,
							personalInformation.id,
							submitPost,
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
	}

	return(
		<React.Fragment>
			<div class="dropdown">
				<button class="btn btn-primary dropdown-toggle" 
					type="button" data-toggle="dropdown" style={DropDownButtonCSS}>
						Choose Level
					   	<span class="caret"></span>
					</button>
					<ul class="dropdown-menu">
						<li onClick={()=>changeKnowledge("Beginner")}>
							<a href="javascript:void(0);">Beginner</a>
						</li>
						<li onClick={()=>changeKnowledge("Intermediate")}>
							<a href="javascript:void(0);">Intermediate</a>
						</li>
						<li onClick={()=>changeKnowledge("Advanced")}>
							<a href="javascript:void(0);">Advanced</a>
						</li>
					</ul>
				 </div>
				 {knowledgeLevel!=null && (
				 	<li style={KnowledgeLevelIndicatorCSS}>
				 		{knowledgeLevel}
				 	</li>

				 )}

			<InputContainer id="post" placeholder='Enter your text here'/>

			{isProccessingPost==true ?
				<p>Please wait while we process your post </p>:
				<li onClick={()=>submitPost({isAccessTokenUpdated:false})} style={SubmitButtonCSS}>
					Submit
				</li>
			}
		</React.Fragment>
	)
}


const RegularPostModal=(props)=>{
	const {
		closeModal,
		symposium,
		modalType,
		symposiumId,
		questionIndex,
		question,
		selectedPostId,
		isOligarch,
		deleteSpecificSymposiumAnswerTrigger
	}=props;

	const [displayCreationModal,changeDisplayCreationModal]=useState(false);
	const [posts,changePosts]=useState([]);
	const [questionId,changeQuestionId]=useState();	

	const [displayPostExpand,changePostExpand]=useState(false);
	const [selectedPost,changeSelectedPost]=useState(false);
	const userId=useSelector(state=>state.personalInformation.id);
	const name=useSelector(state=>state.personalInformation.firstName);
	const [isLoadingTextIndicator,changeIsLoadingTextIndicator]=useState(false);
	const {personalInformation}=useSelector(state=>state);

	const [displayCurrentLevel,changeCurrentLevel]=useState(false);

	useEffect(()=>{
		const fetchData=async()=>{
			displayBeginnerPosts()
		}

		fetchData();
	},[]);

	const retrievePosts=async(questionLevel)=>{
		const response=await getIndustryRegularPostFeatureAnswers({
			industryId:symposiumId,
			questionIndex,
			questionId:selectedPostId,
			questionLevel
		});
		return response;
	}

	const displayIntermediatePosts=async()=>{
		changeIsLoadingTextIndicator(true);
		const {confirmation,data}=await retrievePosts('Intermediate');
		if(confirmation=="Success"){
			const {message}=data;
			const {posts}=message;
			if(displayCreationModal==false){
				changeCurrentLevel("Intermediate");
				changePosts(posts);
				changeQuestionId(selectedPostId);
			}
		}else{
			alert('Unfortunately there has been an error trying to get this regular post data. Please try again');
		}
		changeIsLoadingTextIndicator(false);
	}

	const displayBeginnerPosts=async()=>{
		changeIsLoadingTextIndicator(true);

		const {confirmation,data}=await retrievePosts('Beginner');
		if(confirmation=="Success"){
			const {message}=data;
			const {posts}=message;

			if(displayCreationModal==false){
				changeCurrentLevel("Beginner");
				changePosts(posts);
				changeQuestionId(selectedPostId);
			}

		}else{
			alert('Unfortunately there has been an error trying to get this regular post data. Please try again');
		}
		changeIsLoadingTextIndicator(false);
	}

	const displayAdvancedPosts=async()=>{
		changeIsLoadingTextIndicator(true);
		const {confirmation,data}=await retrievePosts('Advanced');

		if(confirmation=="Success"){
			const {message}=data;
			const {posts}=message;

			if(displayCreationModal==false){
				changeCurrentLevel("Advanced");
				changePosts(posts);
				changeQuestionId(selectedPostId);				
			}


		}else{
			alert('Unfortunately there has been an error trying to get this regular post data. Please try again');
		}
		changeIsLoadingTextIndicator(false);
	}

	const displaySelectedPost=(data)=>{
		changeSelectedPost(data);
		changePostExpand(true);
	}

	const closePostModal=()=>{
		changePostExpand(false);
	}

	const deleteSymposiumFeaturePost=(data,index)=>{
		deleteSpecificSymposiumAnswerTrigger({
			selectedIndex:index,
			changePosts,
			posts,
			selectedPost:data,
			isAccessTokenUpdated:false,
			personalInformation,
			postLevel:displayCurrentLevel
		})
	}
	const deleteIcon=(data,index)=>{
		return(
			<React.Fragment>
				{(isOligarch==true || data.owner._id==personalInformation.id)==true &&(
					<div style={{marginLeft:"5%"}}>
						<svg id="removePostOption" onClick={()=>deleteSymposiumFeaturePost(data,index)}
							xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash"
							width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#6e6e6e" fill="none"
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

	const updatePosts=(recentlyAddedPost)=>{
		posts.splice(0,0,recentlyAddedPost);
		changePosts([...posts]);
		changeDisplayCreationModal(false);
		changeQuestionId(questionId);
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

			{displayCreationModal==true?
				<TextPostUpload
					symposiumId={symposiumId}
					userId={userId}
					personalInformation={personalInformation}
					displayCurrentLevel={displayCurrentLevel}
					updatePosts={updatePosts}
				/>
				:<>
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
					<p> 
						Learn from the best. Give out tips and {question} that could help others 
						in this craft
					</p>
					<hr/>
					<li style={{listStyle:"none"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
										<div class="dropdown">
											<button class="btn btn-primary dropdown-toggle"
												 type="button" data-toggle="dropdown" style={LevelSelectionCSS}>
												Choose Level
											   	<span class="caret"></span>
											</button>
											<ul class="dropdown-menu">
												<li onClick={()=>displayBeginnerPosts()}>
													<a href="javascript:void(0);">Beginner</a>
												</li>
												<li onClick={()=>displayIntermediatePosts()}>
													<a href="javascript:void(0);">Intermediate</a>
												</li>
												<li onClick={()=>displayAdvancedPosts()}>
													<a href="javascript:void(0);">Advanced</a>
												</li>
											</ul>
						  				</div>
									</li>
									<li style={{listStyle:"none",display:"inline-block"}}>
										{displayCurrentLevel}	
									</li>
								</ul>
							</li>

							{isLoadingTextIndicator==true?
								<p>Loading please wait...</p>:
								<li style={{listStyle:"none",marginTop:"2%"}}>
									{posts.length==0?
										<p>No posts</p>:
										<ul style={{padding:"0px"}}>
											{posts.map((data,index)=>
												<>
													<RegularPostContainer onClick={()=>displaySelectedPost(data)}>
														<RegularPostInformation>
															<img src={data.owner.profilePicture==null?
																		NoProfilePicture:
																		data.owner.profilePicture
																	} style={{width:"60px",height:"60px",borderRadius:"50%"}}
															/>
															<p> 
																<b>{data.owner.firstName}</b>
															</p>
														</RegularPostInformation>
														<p style={{height:"10%",overflow:"hidden",maxHeight:"15%"}}>
															{data.post}
														</p>
													</RegularPostContainer>
													{deleteIcon(data,index)}
													<hr style={HorizontalLineCSS}/>
												</>
											)}
										</ul>

									}
								</li>

							}
						</ul>
					</li>
				</>
			}
			
		</ul>
	)
}

export{
	RegularPostModal,
	TextPostUpload
};

