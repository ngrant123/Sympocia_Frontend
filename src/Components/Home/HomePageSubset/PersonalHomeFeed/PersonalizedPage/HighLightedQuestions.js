import React,{Component} from "react";
import styled from "styled-components";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ImagePostDisplayPortal from "../../../HomePageSet/ImageHomeDisplayPortal.js";
import VideoPostDisplayPortal from "../../../HomePageSet/VideoHomeDisplayPortal.js";
import RegularPostDisplayPortal from "../../../HomePageSet/RegularPostHomeDisplayPortal.js";

import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import QuestionsPortal from "./QuestionsPortal.js";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import {getPopularQuestionReplies} from "../../../../../Actions/Requests/HomePageAxiosRequests/HomePageGetRequests.js";

const Container=styled.div`
	overflow:hidden;
	width:60%;
	height:60%;
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


class HighLightedQuestions extends Component{
	constructor(props){
		debugger;
		console.log(props);
		super(props);
		this.state={
			questionData:props.questionInformation,
			displayImagePortal:false,
			displayVideoPortal:false,
			displayRegularPortal:false,
			selectedPost:{},
			displayExpandedQuestionModal:false,
			counter:0
		}
	}
	headerQuestion=()=>{

	}

	setImagePost=(data)=>{
		this.setState({
			selectedPost:data,
			displayImagePortal:!this.state.displayImagePortal
		})
	}

	setVideoPost=(data)=>{
		this.setState({
			selectedPost:data,
			displayVideoPortal:!this.state.displayVideoPortal
		})
	}

	setRegularPost=(data)=>{
		this.setState({
			selectedPost:data,
			displayRegularPortal:!this.state.displayRegularPortal
		})
	}



	constructResponses=(question)=>{
		debugger;
		const {questionType}=question;
		var replies=question.responsesId;
		var element;
		if(replies.length==0){
			return <p> No replies yet :(. Click on the question and click the pencil icon to make a post </p>
		}else{
			if(questionType=="Image"){
				return <React.Fragment>
									{replies.map(data=>
										<React.Fragment>
											{data._id==null?null:
												<li onClick={()=>this.setImagePost(data)} style={{listStyle:"none",display:"inline-block"}}>
													<img src={data.imgUrl} style={{borderRadius:"5px",width:"90px",height:"30%"}}/>
												</li>
											}
										</React.Fragment>
									)}
								</React.Fragment>;
			}else if(questionType=="Video"){
				console.log(replies);
				return <React.Fragment>
							{replies.map(data=>
								<React.Fragment>
									{data._id==null?null:
													<li onClick={()=>this.setVideoPost(data)} style={{width:"30%",listStyle:"none",display:"inline-block"}}>
														<video width="90%" height="40%" borderRadius="5px" controls autoplay>
															<source src={data.videoUrl} type="video/mp4"/>
														</video>
													</li>
									}
								</React.Fragment>
							)}
						</React.Fragment>;
			}else{
				return <React.Fragment>
							{replies.map(data=>
								<React.Fragment>
									{data._id==null?null:
										<li onClick={()=>this.setRegularPost(data)} style={{listStyle:"none",display:"inline-block"}}>
											<ul>
												<li style={{listStyle:"none",display:"inline-block",marginRight:"1%"}}>
													{data.owner.profilePicture==null?
														<img src={NoProfilePicture} style={{width:"15%",height:"10%",borderRadius:"50%"}}/>:
														<img src={data.owner.profilePicture} style={{width:"15%",height:"10%",borderRadius:"50%"}}/>
													}
												</li>

												<li style={{listStyle:"none",display:"inline-block",marginRight:"1%"}}>
													<b>{data.owner.firstName}</b>
												</li>

												<li style={{listStyle:"none",display:"inline-block"}}>
													{data.post}			
												</li>
											</ul>
										</li>
									}
								</React.Fragment>
							)}
						</React.Fragment>;
			}
		}
	}

	expandQuestion=()=>{
		this.setState({
			displayExpandedQuestionModal:true
		});
	}
	addComment=(data)=>{

	}


	closeModal=()=>{
		this.setState({
			displayImagePortal:false,
			displayVideoPortal:false,
			displayRegularPortal:false,
			displayExpandedQuestionModal:false
		})
	}

	increaseCounter=async()=>{
		debugger;
		var currentCounter=this.state.counter;
		currentCounter=this.state.counter+1;

		const questionData=await getPopularQuestionReplies(this.props.selectedSymposium,currentCounter);
		this.setState({
			counter:currentCounter,
			questionData:questionData
		})
	}

	decreaseCounter=async()=>{
		var currentCounter=this.state.counter;
		currentCounter=this.state.counter-1;

		const questionData=await getPopularQuestionReplies(this.props.selectedSymposium,currentCounter);
		this.setState({
			counter:currentCounter,
			questionData:questionData
		})
	}

	render(){
		return(
			<React.Fragment>
				{this.state.questionData.length>0?
					<React.Fragment>
												{this.state.displayExpandedQuestionModal==true?
													<QuestionsPortal
														questionType={this.state.questionData[this.state.counter].questionType}													
														closeModal={this.closeModal}
														counter={this.state.counter}
														questions={this.state.questionData}
														selectedSymposium={this.props.selectedSymposium}
														triggerImagePortal={this.setImagePost}
														triggerVideoPortal={this.setVideoPost}
														triggerRegularPostPortal={this.setRegularPost}
														addComment={this.addComment}
													/>:<React.Fragment></React.Fragment>
												}
												{this.state.displayImagePortal==true?
													<ImagePostDisplayPortal
														closeModal={this.closeModal}
														selectedImage={this.state.selectedPost}
														recommendedImages={[]}
													/>:
													<React.Fragment></React.Fragment>
												}
							
												{this.state.displayVideoPortal==true?
													<VideoPostDisplayPortal
														closeModal={this.closeModal}
														videoData={this.state.selectedPost}
														recommendedVideos={[]}
													/>
													:<React.Fragment></React.Fragment>
												}
							
												{this.state.displayRegularPortal==true?
													<RegularPostDisplayPortal
														closeModal={this.closeModal}
														regularPostData={this.state.selectedPost}
														recommendedRegularPosts={[]}
													/>
													:<React.Fragment></React.Fragment>
												}
												{this.props.isSimplified==false?
													<Container>
															<ul style={{padding:"0px"}}>
																<li style={{listStyle:"none"}}>
																	<ul style={{padding:"10px"}}>
																		{this.state.counter!=0?
																			<li style={{listStyle:"none",display:"inline-block",marginLeft:"1%"}}>
																				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																					<NavigateBeforeIcon
																						style={{borderRadius:"50%",boxShadow:"1px 1px 5px #dbdddf"}}
																						onClick={()=>this.decreaseCounter()}
																					/>
																				</a>
																			</li>:<React.Fragment></React.Fragment>
																		}
																		<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																			<li onClick={()=>this.expandQuestion()} style={{fontSize:"15px",color:"#3898ec",listStyle:"none",display:"inline-block",width:"70%"}}>
																				
																					{this.state.questionData[this.state.counter].question}
																			</li>
																		</a>
																		{this.state.counter!=(this.state.questionData.length-1)?
																			<li style={{listStyle:"none",display:"inline-block",marginRight:"1%"}}>
																				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																					<NavigateNextIcon
																						style={{borderRadius:"50%",boxShadow:"1px 1px 5px #dbdddf"}}
																						onClick={()=>this.increaseCounter()}
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
																			{this.constructResponses(this.state.questionData[this.state.counter])}
																		</a>
																	</ul>
																</li>
															</ul>
													</Container>:
													<SimplifiedContainer>
							
							
													</SimplifiedContainer>
												}
					</React.Fragment>:null
				}
			</React.Fragment>
		)
	}
}





{/*
const HighLightedQuestions=(props)=>{
	debugger;
	const {
			questionInformation,
			isSimplified,
			selectedSymposium
		}=props;
		console.log(props);
	var [counter,changeCounter]=useState(0);

	useEffect(()=>{
		changeQuestionData(questionInformation);
	});


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
		console.log(data);
		changeSelectedPost(data);
		changeRegularPortal(!displayRegularPortal);
	}



	const constructResponses=(replies)=>{
		debugger;
		console.log(questionType);
		console.log(counter);
		const {questionType}=questionData;
		var element;
		if(replies.length==0){
			return <p> No replies yet :(. Click on the question and click the pencil icon to make a post </p>
		}else{
			if(questionType=="Image"){
				return <React.Fragment>
									{replies.map(data=>
										<li onClick={()=>setImagePost(data)} style={{listStyle:"none",display:"inline-block"}}>
											<img src={data.imgUrl} style={{borderRadius:"5px",width:"30%",height:"40%"}}/>
										</li>
									)}
								</React.Fragment>;
			}else if(questionType=="Video"){
				return <React.Fragment>
							{replies.map(data=>
								<li onClick={()=>setVideoPost(data)} style={{listStyle:"none",display:"inline-block"}}>
									<video style={{borderRadius:"5px",width:"45%",height:"30%"}}>
										<source src={data.imgUrl} type="video/mp4"/>
									</video>
								</li>
							)}
						</React.Fragment>;
			}else{
				return <React.Fragment>
							{replies.map(data=>
								<li onClick={()=>setRegularPost(data)} style={{listStyle:"none",display:"inline-block"}}>
									<ul>
										<li style={{listStyle:"none",display:"inline-block",marginRight:"1%"}}>
											{data.owner.profilePicture==null?
												<img src={NoProfilePicture} style={{width:"15%",height:"10%",borderRadius:"50%"}}/>:
												<img src={data.owner.profilePicture} style={{width:"15%",height:"10%",borderRadius:"50%"}}/>
											}
										</li>

										<li style={{listStyle:"none",display:"inline-block",marginRight:"1%"}}>
											<b>{data.owner.firstName}</b>
										</li>

										<li style={{listStyle:"none",display:"inline-block"}}>
											{data.post}			
										</li>
									</ul>
								</li>
							)}
						</React.Fragment>;
			}
		}
	}

	const expandQuestion=()=>{
		changeExpandedQuestionModal(true);
	}
	const addComment=(data)=>{

	}


	const closeModal=()=>{
		changeImagePortal(false);
		changeVideoPortal(false);
		changeRegularPortal(false);
		changeExpandedQuestionModal(false);
	}

	const increaseCounter=async()=>{
		debugger;
		var currentCounter=counter;
		currentCounter=counter+1;
		changeCounter(currentCounter);

		const questionData=await getPopularQuestionReplies(selectedSymposium,currentCounter);
		changeQuestionData(questionData); 
		console.log(questionData);
	}

	const decreaseCounter=async()=>{
		var currentCounter=counter;
		currentCounter=counter-1;
		changeCounter(currentCounter);

		const questionData=await getPopularQuestionReplies(selectedSymposium,currentCounter);
		changeQuestionData(questionData);
		console.log(questionData);
		
	}
	return(
		<React.Fragment>
			{questionData.length>0?
				<React.Fragment>
											{displayExpandedQuestionModal==true?
												<QuestionsPortal
													questionType={questionData[counter].questionType}													closeModal={closeModal}
													counter={counter}
													questions={questionData}
													selectedSymposium={selectedSymposium}
													triggerImagePortal={setImagePost}
													triggerVideoPortal={setVideoPost}
													triggerRegularPostPortal={setRegularPost}
													addComment={addComment}
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
											{isSimplified==false?
												<Container>
														<ul style={{padding:"0px"}}>
															<li style={{listStyle:"none"}}>
																<ul style={{padding:"10px"}}>
																	{counter!=0?
																		<li style={{listStyle:"none",display:"inline-block",marginLeft:"1%"}}>
																			<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																				<NavigateBeforeIcon
																					style={{borderRadius:"50%",boxShadow:"1px 1px 5px #dbdddf"}}
																					onClick={()=>decreaseCounter()}
																				/>
																			</a>
																		</li>:<React.Fragment></React.Fragment>
																	}
																	<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																		<li onClick={()=>expandQuestion()} style={{fontSize:"15px",color:"#3898ec",listStyle:"none",display:"inline-block",width:"70%"}}>
																			
																				{questionData[counter].question}
																		</li>
																	</a>
																	{counter!=(questionData.length-1)?
																		<li style={{listStyle:"none",display:"inline-block",marginRight:"1%"}}>
																			<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																				<NavigateNextIcon
																					style={{borderRadius:"50%",boxShadow:"1px 1px 5px #dbdddf"}}
																					onClick={()=>increaseCounter()}
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
																		{constructResponses(questionData[counter].responsesId)}
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



*/}


export default HighLightedQuestions;