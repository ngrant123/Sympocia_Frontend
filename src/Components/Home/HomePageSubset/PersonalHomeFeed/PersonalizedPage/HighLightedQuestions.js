import React,{useState} from "react";
import styled from "styled-components";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ImagePostDisplayPortal from "../../../HomePageSet/ImageHomeDisplayPortal.js";
import VideoPostDisplayPortal from "../../../HomePageSet/VideoHomeDisplayPortal.js";
import RegularPostDisplayPortal from "../../../HomePageSet/RegularPostHomeDisplayPortal.js";

import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import QuestionsPortal from "./QuestionsPortal.js";

const Container=styled.div`
	position:absolute;
	overflow:hidden;
	width:20%;
	height:60%;
	top:5%;
	left:10%;
	border-radius:5px;
	background-color:white;
	border-style:solid;
	border-width:1px;
	border-color:#5298F8;
	z-index:17;
	overflow-y:scroll;
`;

const SimplifiedContainer=styled.div`
	position:absolute;
	overflow:hidden;
	width:20%;
	height:20%;
	top:5%;
	left:10%;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#5298F8;
	overflow-y:scroll;
`;

const HighLightedQuestions=(props)=>{
	debugger;
	const {
			questionInformation,
			isSimplied,
			selectedSymposium
		}=props;
		console.log(props);
	const [counter,changeCounter]=useState(0);
	const [repliesComponent,changeRepliesComponent]=useState();

	const [displayImagePortal,changeImagePortal]=useState(false);
	const [displayVideoPortal,changeVideoPortal]=useState(false);
	const [displayRegularPortal,changeRegularPortal]=useState(false);

	const [selectedPost,changeSelectedPost]=useState();
	const [displayExpandedQuestionModal,changeExpandedQuestionModal]=useState(false);


	const headerQuestion=()=>{

	}

	const setImagePost=(data)=>{
		changeSelectedPost(data);
		changeImagePortal(!displayImagePortal);
	}

	const setVideoPost=(data)=>{
		changeSelectedPost(data);
		changeVideoPortal(!displayVideoPortal);
	}

	const setRegularPost=(data)=>{
		changeSelectedPost(data);
		changeRegularPortal(!displayRegularPortal);
	}



	const constructResponses=(replies)=>{
		const {questionType}=questionInformation;
		var element;
		if(replies.length==0){
			return <p> No replies yet :(. Click on the question and click the pencil icon to make a post </p>
		}else{
			if(questionType=="Image"){
				element=<React.Fragment>
									{replies.map(data=>
										<li onClick={()=>setImagePost(data)} style={{listStyle:"none",display:"inline-block"}}>
											<img src={data.imgUrl} style={{borderRadius:"5px",width:"30%",height:"40%"}}/>
										</li>
									)}
								</React.Fragment>;
			}else if(questionType=="Video"){
				element= <React.Fragment>
							{replies.map(data=>
								<li onClick={()=>setVideoPost(data)} style={{listStyle:"none",display:"inline-block"}}>
									<video style={{borderRadius:"5px",width:"45%",height:"30%"}}>
										<source src={data.imgUrl} type="video/mp4"/>
									</video>
								</li>
							)}
						</React.Fragment>;
			}else{
				element= <React.Fragment>
							{replies.map(data=>
								<li onClick={()=>setRegularPost(data)} style={{listStyle:"none",display:"inline-block"}}>
									{data.post}
								</li>
							)}
						</React.Fragment>;
			}
		}
		changeRepliesComponent(element);
		return element;
	}

	const expandQuestion=()=>{
		changeExpandedQuestionModal(true);
	}


	const closeModal=()=>{
		changeImagePortal(false);
		changeVideoPortal(false);
		changeRegularPortal(false);
		changeExpandedQuestionModal(false);
	}

	return(
		<React.Fragment>
			{questionInformation.length>0?
				<React.Fragment>
											{displayExpandedQuestionModal==true?
												<QuestionsPortal
													questionType={questionInformation[counter].questionType}
													component={repliesComponent}
													closeModal={closeModal}
													counter={counter}
													questions={questionInformation}
													selectedSymposium={selectedSymposium}
												/>:<React.Fragment></React.Fragment>
											}
											{displayImagePortal==true?
												<ImagePostDisplayPortal
													closeModal={closeModal}
													selectedImage={selectedPost}
													recommendedImages={[]}
												/>:
												<React.Fragment></React.Fragment>
											}
						
											{displayVideoPortal==true?
												<VideoPostDisplayPortal
													closeModal={closeModal}
													videoData={selectedPost}
													recommendedVideos={[]}
												/>
												:<React.Fragment></React.Fragment>
											}
						
											{displayRegularPortal==true?
												<RegularPostDisplayPortal
													closeModal={closeModal}
													regularPostData={selectedPost}
													recommendedRegularPosts={[]}
												/>
												:<React.Fragment></React.Fragment>
											}
											{isSimplied==false?
												<Container>
														<ul style={{padding:"0px"}}>
															<li style={{listStyle:"none"}}>
																<ul style={{padding:"10px"}}>
																	{counter!=0?
																		<li style={{listStyle:"none",display:"inline-block"}}>
																			<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																				<NavigateBeforeIcon
																					style={{borderRadius:"50%",boxShadow:"1px 1px 5px #dbdddf"}}
																					onClick={()=>changeCounter(counter--)}
																				/>
																			</a>
																		</li>:<React.Fragment></React.Fragment>
																	}
																	<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																		<li onClick={()=>expandQuestion()} style={{fontSize:"15px",color:"#3898ec",listStyle:"none",display:"inline-block",width:"70%"}}>
																			
																				{questionInformation[counter].question}
																		</li>
																	</a>
																	{counter!=(questionInformation.length-1)?
																		<li style={{listStyle:"none",display:"inline-block"}}>
																			<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																				<NavigateNextIcon
																					style={{borderRadius:"50%",boxShadow:"1px 1px 5px #dbdddf"}}
																					onClick={()=>changeCounter(counter++)}
																				/>
																			</a>
																		</li>:<React.Fragment></React.Fragment>
																	}
																</ul>
															</li>
															<hr/>
															<li style={{listStyle:"none"}}>
																<ul style={{padding:"0px"}}>
																	<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																		{constructResponses(questionInformation[counter].responsesId)}
																	</a>
																</ul>
															</li>
														</ul>
												</Container>:
												<SimplifiedContainer>
						
						
												</SimplifiedContainer>
											}]
				</React.Fragment>:null

			}
		</React.Fragment>
	)
}


export default HighLightedQuestions;