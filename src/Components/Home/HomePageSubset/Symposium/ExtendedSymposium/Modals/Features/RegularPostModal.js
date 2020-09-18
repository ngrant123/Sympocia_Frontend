import React,{useState,useEffect} from "react";
import styled from "styled-components";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CameraIcon from '@material-ui/icons/Camera';
import NoProfilePicture from "../../../../../../../designs/img/NoProfilePicture.png";

const Container=styled.div`
	position:absolute;
	z-index:13;
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
	z-index:11;
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

const RegularPostModal=({closeModal,symposium,displayImage,modalType})=>{
	const [displayCreationModal,changeDisplayCreationModal]=useState(false);
	const [posts,changePosts]=useState([{},{},{}]);
	const [knowledgeLevel,changeKnowledge]=useState();

	useEffect(()=>{
		displayBeginnerPosts();
	},[]);

	const displayIntermediatePosts=async()=>{
		document.getElementById("beginner").style.backgroundColor="white";
		document.getElementById("beginner").style.color="#3898ec";

		document.getElementById("intermediate").style.backgroundColor="#3898ec";
		document.getElementById("intermediate").style.color="white";

		document.getElementById("advanced").style.backgroundColor="white";
		document.getElementById("advanced").style.color="#3898ec";
	}

	const displayBeginnerPosts=async()=>{
		document.getElementById("intermediate").style.backgroundColor="white";
		document.getElementById("intermediate").style.color="#3898ec";

		document.getElementById("beginner").style.backgroundColor="#3898ec";
		document.getElementById("beginner").style.color="white";

		document.getElementById("advanced").style.backgroundColor="white";
		document.getElementById("advanced").style.color="#3898ec";
	}

	const displayAdvancedPosts=async()=>{
		document.getElementById("beginner").style.backgroundColor="white";
		document.getElementById("beginner").style.color="#3898ec";

		document.getElementById("advanced").style.backgroundColor="#3898ec";
		document.getElementById("advanced").style.color="white";

		document.getElementById("intermediate").style.backgroundColor="white";
		document.getElementById("intermediate").style.color="#3898ec";
	}

	const submitPost=()=>{
		const post={
			post:document.getElementById("post").value,
			knowledgeLevel:knowledgeLevel
		}

		posts.splice(0,0,post);
		changePosts([...posts]);
		changeDisplayCreationModal(false);
	}

	return(
		<ul style={{padding:"20px"}}>
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

					<InputContainer id="post" placeholder='Enter your tip here'/>

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
											<li style={{listStyle:"none",marginBottom:"2%"}}>
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

