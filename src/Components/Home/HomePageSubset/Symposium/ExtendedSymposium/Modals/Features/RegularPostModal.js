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
  width:"30%"
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
  width:"30%",
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
		
		const {confirmation,data}=await retrievePosts('Intermediate');

		if(confirmation=="Success"){
			const {
				questionId,
				posts
			}=data;
			if(displayCreationModal==false){
				document.getElementById("beginner").style.backgroundColor="white";
				document.getElementById("beginner").style.color="#3898ec";

				document.getElementById("intermediate").style.backgroundColor="#3898ec";
				document.getElementById("intermediate").style.color="white";

				document.getElementById("advanced").style.backgroundColor="white";
				document.getElementById("advanced").style.color="#3898ec";

				changeCurrentLevel("intermediate");
				changePosts(posts);
				changeQuestionId(questionId);
			}
		}else{
			alert('Unfortunately there has been an error trying to get this images data. Please try again');
		}
	}

	const displayBeginnerPosts=async()=>{
		const {confirmation,data}=await retrievePosts('Beginner');
		if(confirmation=="Success"){
			const {
				questionId,
				posts
			}=data;

			if(displayCreationModal==false){
				document.getElementById("intermediate").style.backgroundColor="white";
				document.getElementById("intermediate").style.color="#3898ec";

				document.getElementById("beginner").style.backgroundColor="#3898ec";
				document.getElementById("beginner").style.color="white";

				document.getElementById("advanced").style.backgroundColor="white";
				document.getElementById("advanced").style.color="#3898ec";

				changeCurrentLevel("beginner");
				changePosts(posts);
				changeQuestionId(questionId);
			}

		}else{
			alert('Unfortunately there has been an error trying to get this images data. Please try again');
		}
	}

	const displayAdvancedPosts=async()=>{
		const {confirmation,data}=await retrievePosts('Advanced');
		if(confirmation=="Success"){
			const {
				questionId,
				posts
			}=data;

			if(displayCreationModal==false){
				document.getElementById("beginner").style.backgroundColor="white";
				document.getElementById("beginner").style.color="#3898ec";

				document.getElementById("advanced").style.backgroundColor="#3898ec";
				document.getElementById("advanced").style.color="white";

				document.getElementById("intermediate").style.backgroundColor="white";
				document.getElementById("intermediate").style.color="#3898ec";

				changeCurrentLevel("advanced");
				changePosts(posts);
				changeQuestionId(questionId);				
			}


		}else{
			alert('Unfortunately there has been an error trying to get this images data. Please try again');
		}
	}

	const submitPost=async()=>{
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
			
			if(displayCurrentLevel==knowledgeLevel.toLowerCase()){	
				const {
					questionId,
					postId
				}=data;
				var submittedPost={
					post:document.getElementById("post").value,
					_id:postId,
					comments:[],
					isCrownedPost:false,
					industriesUploaded:[{industry:symposium}]
				}

				posts.splice(0,0,submittedPost);
				changePosts([...posts]);
			}

			changeDisplayCreationModal(false);
			changeQuestionId(questionId);

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

					<li onClick={()=>submitPost()} style={SubmitButtonCSS}>
						Submit
					</li>
				</>
				:
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
					<p> 
						Learn from the best. Give out tips and {modalType} that could help others 
						in this craft
					</p>
					<hr/>
					<li style={{listStyle:"none"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<ul stlye={{padding:"0px"}}>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>displayBeginnerPosts()} id="beginner" style={SkillLevelButton}>
											Beginner
										</li>
									</a>

									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>displayIntermediatePosts()} id="intermediate" style={SkillLevelButton}>
											Intermediate
										</li>
									</a>

									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>displayAdvancedPosts()} id="advanced" style={SkillLevelButton}>
											Advanced
										</li>
									</a>
								</ul>
							</li>

							<li style={{listStyle:"none",marginTop:"2%"}}>
								<ul style={{padding:"0px"}}>
									{posts.map(data=>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>displaySelectedPost(data)} style={{listStyle:"none",marginBottom:"2%"}}>
												<ul style={{padding:"0px"}}>
													<li style={{top:"-50px",position:"relative",width:"10%",listStyle:"none",display:"inline-block"}}>
														<img src={NoProfilePicture} style={{width:"60px",height:"10%",borderRadius:"50%"}}/>
													</li>

													<li style={{width:"70%",listStyle:"none",display:"inline-block"}}>
														<p> 
															<b>{data.firstName}</b>
														</p>
														<p style={{height:"10%",overflowY:"auto",}}>
															{data.post}
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
				</>
			}
			
		</ul>
	)
}

export default RegularPostModal;

