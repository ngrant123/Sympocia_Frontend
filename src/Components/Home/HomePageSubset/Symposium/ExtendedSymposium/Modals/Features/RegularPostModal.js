import React,{useState,useEffect} from "react";
import styled from "styled-components";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CameraIcon from '@material-ui/icons/Camera';
import NoProfilePicture from "../../../../../../../designs/img/NoProfilePicture.png";
import {createSpecificIndustryRegularPostAnswer} from "../../../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {getIndustryRegularPostFeatureAnswers} from "../../../../../../../Actions/Requests/PostAxiosRequests/PostPageGetRequests.js";
import {useSelector} from "react-redux";
import RegularPostDisplayPortal from "../../../../../HomePageSet/RegularPostHomeDisplayPortal.js";

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
	height:10%;
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
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginTop:"1%"
}

const RegularPostModal=({closeModal,symposium,displayImage,modalType,symposiumId,questionIndex,question,selectedPostId})=>{

	const [displayCreationModal,changeDisplayCreationModal]=useState(false);
	const [posts,changePosts]=useState([]);
	const [knowledgeLevel,changeKnowledge]=useState();
	const [questionId,changeQuestionId]=useState();	

	const [displayPostExpand,changePostExpand]=useState(false);
	const [selectedPost,changeSelectedPost]=useState(false);
	const userId=useSelector(state=>state.personalInformation.id);
	const name=useSelector(state=>state.personalInformation.firstName);
	const [isProccessingPost,changeIsProcessingPost]=useState(false);
	const [isLoadingTextIndicator,changeIsLoadingTextIndicator]=useState(false);

	const [displayCurrentLevel,changeCurrentLevel]=useState(false);

	useEffect(()=>{
		const fetchData=async()=>{
			console.log(symposiumId);
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
		console.log(data);
		if(confirmation=="Success"){
			const {message}=data;
			const {
				questionId,
				posts
			}=message;
			if(displayCreationModal==false){
				changeCurrentLevel("Intermediate");
				changePosts(posts);
				changeQuestionId(questionId);
			}
		}else{
			alert('Unfortunately there has been an error trying to get this images data. Please try again');
		}
		changeIsLoadingTextIndicator(false);
	}

	const displayBeginnerPosts=async()=>{
		changeIsLoadingTextIndicator(true);

		const {confirmation,data}=await retrievePosts('Beginner');
		if(confirmation=="Success"){
			const {message}=data;
			const {
				questionId,
				posts
			}=message;

			if(displayCreationModal==false){
				changeCurrentLevel("Beginner");
				changePosts(posts);
				changeQuestionId(questionId);
			}

		}else{
			alert('Unfortunately there has been an error trying to get this images data. Please try again');
		}
		changeIsLoadingTextIndicator(false);
	}

	const displayAdvancedPosts=async()=>{
		changeIsLoadingTextIndicator(true);
		const {confirmation,data}=await retrievePosts('Advanced');

		if(confirmation=="Success"){
			const {message}=data;
			const {
				questionId,
				posts
			}=message;

			if(displayCreationModal==false){
				changeCurrentLevel("Advanced");
				changePosts(posts);
				changeQuestionId(questionId);				
			}


		}else{
			alert('Unfortunately there has been an error trying to get this images data. Please try again');
		}
		changeIsLoadingTextIndicator(false);
	}

	const submitPost=async()=>{
		if(knowledgeLevel==null){
			alert('Please enter a level to continue');
		}else{
			changeIsProcessingPost(true);
			const post={
				industryId:symposiumId,
				questionId:selectedPostId,
				question,
				userId:userId,
				post:document.getElementById("post").value,
				postLevel:knowledgeLevel
			}
			const {confirmation,data}=await createSpecificIndustryRegularPostAnswer(post);
			if(confirmation=="Success"){
				const {message}=data;
				if(displayCurrentLevel.toLowerCase()==knowledgeLevel.toLowerCase()){	
					const {
						questionId,
						postId
					}=message;
					var submittedPost={
						post:document.getElementById("post").value,
						_id:postId,
						comments:[],
						isCrownedPost:false,
						industriesUploaded:[{industry:symposium}],
						owner:{
							firstName:name,
							profilePicture:null
						}
					}

					posts.splice(0,0,submittedPost);
					changePosts([...posts]);
				}

				changeDisplayCreationModal(false);
				changeQuestionId(questionId);

			}else{
				alert('Unfortunately there has been an error with adding this image. Please try again');
			}
			changeIsProcessingPost(false);
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

			{displayCreationModal==true?
				<>
					<div class="dropdown">
										<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																																borderColor:"#5298F8",
																																borderStyle:"solid",
																																borderWidth:"1px",
																																color:"#5298F8",
																																backgroundColor:"white"}}>
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
						<li onClick={()=>submitPost()} style={SubmitButtonCSS}>
							Submit
						</li>
					}
				</>
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
									<ul style={{padding:"0px"}}>
										{posts.map(data=>
											<RegularPostContainer>
												<RegularPostInformation>
													<img src={data.owner.profilePicture==null?
																NoProfilePicture:
																data.owner.profilePicture
															} style={{width:"60px",height:"10%",borderRadius:"50%"}}
													/>
													<p> 
														<b>{data.owner.firstName}</b>
													</p>
												</RegularPostInformation>
												<p style={{height:"10%",overflow:"hidden",maxHeight:"15%"}}>
													{data.post}
												</p>
											</RegularPostContainer>
										)}
									</ul>
								</li>

							}
						</ul>
					</li>
				</>
			}
			
		</ul>
	)
}

export default RegularPostModal;

