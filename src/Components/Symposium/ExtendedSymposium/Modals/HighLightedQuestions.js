import React,{Component} from "react";
import styled from "styled-components";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ImagePostDisplayPortal from "../../../ExplorePage/ExplorePageSet/ImageHomeDisplayPortal.js";
import VideoPostDisplayPortal from "../../../ExplorePage/ExplorePageSet/VideoHomeDisplayPortal.js";
import RegularPostDisplayPortal from "../../../ExplorePage/ExplorePageSet/RegularPostHomeDisplayPortal.js";
import QuestionsPortal from "./QuestionsPortal.js";
import {getPopularQuestionReplies} from "../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";

import {
	HightLightedQuestionsContainerModal,
	BackgroundModalContainer
} from "../indexCSS.js";


const QuestionCSS={
	fontSize:"15px",
	color:"#3898ec",
	listStyle:"none",
	display:"inline-block",
	width:"70%",
	marginLeft:"2%",
	marginRight:"2%",
	cursor:"pointer"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}



class HighLightedQuestions extends Component{
	constructor(props){
		super(props);
		this.state={
			questionData:props.questionInformation,
			displayImagePortal:false,
			displayVideoPortal:false,
			displayRegularPortal:false,
			selectedPost:{},
			displayExpandedQuestionModal:false,
			counter:0,
			isLoading:false
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

	uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}


	constructResponses=(question)=>{
		const {questionType}=question;
		var replies=question.responsesId;
		var element;
		if(replies.length==0){
			return <p> No replies yet :(. Click on the question and click the pencil icon to make a post </p>
		}else{
			if(questionType=="Image"){
				return <div style={{display:"flex",flexDirection:"row",width:"100%",flexWrap:"wrap"}}>
							{replies.map(data=>
								<div id="postLI" onClick={()=>this.setImagePost(data)} style={{marginRight:"2%"}}>
									<img id="imageHighlightedQuestion" src={data.imgUrl}
									 style={{borderRadius:"5px",width:"90px",height:"80px",marginBottom:"5%",cursor:"pointer"}}
									/>
								</div>
							)}
						</div>;
			}else if(questionType=="Video"){
				return <div style={{display:"flex",flexDirection:"row",width:"100%",flexWrap:"wrap"}}>
							{replies.map(data=>
								<div id="postLI" onClick={()=>this.setVideoPost(data)} 
									style={{marginRight:"10%",marginBottom:"5%",width:"30%"}}>
									<video id="videoQuestionAnswers"
										style={{borderRadius:"5px",cursor:"pointer"}}
										 position="relative" width="120" height="60"
									 	key={data.videoUrl} autoPlay loop autoBuffer muted playsInline>
										<source src={data.videoUrl} type="video/mp4"/>
									</video>
								</div>
							)}
						</div>;
			}else{
				return <div style={{display:"flex",flexDirection:"column"}}>
							{replies.map(data=>
								<React.Fragment>
									<p onClick={()=>this.setRegularPost(data)} style={{cursor:"pointer",width:"100%",marginBottom:"5%"}}>
										{data.post}	
									</p>
									<hr/>
								</React.Fragment>
							)}
						</div>;
			}
		}
	}

	expandQuestion=()=>{
		if(this.props.isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free')
		}else{
			this.setState({
				displayExpandedQuestionModal:true
			});
		}
	}

	addComment=(data)=>{}

	closeModal=()=>{
		this.setState({
			displayImagePortal:false,
			displayVideoPortal:false,
			displayRegularPortal:false,
			displayExpandedQuestionModal:false
		})
	}

	closeModalAndDisplayData=({data,currentQuestionType})=>{
		const {
				question,
				questionType,
				responsesId
			}=this.state.questionData[this.state.counter];

		if(currentQuestionType==questionType){
			
			var replies=responsesId;

			replies.splice(0,0,data);
			this.setState(prevState=>({
				...prevState,
				displayExpandedQuestionModal:false,
				[question]:{
					...[question],
					responsesId:[...replies]
				}
			}))
		}
	}

	alterIsLoading=(loadingIndicator)=>{
		this.setState({
			isLoading:loadingIndicator
		})
	}


	increaseCounter=async()=>{
		this.alterIsLoading(true);
		var currentCounter=this.state.counter;
		currentCounter=this.state.counter+1;

		const {confirmation,data}=await getPopularQuestionReplies(this.props.selectedSymposium,currentCounter);
		
		if(confirmation=="Success"){
			this.setState({
				counter:currentCounter,
				questionData:data
			})
		}else{
			alert('Unfortunately an error has occured when trying to get the next question. Please try again');
		}
		this.alterIsLoading(false);
	}

	decreaseCounter=async()=>{
		this.alterIsLoading(true);
		var currentCounter=this.state.counter;
		currentCounter=this.state.counter-1;

		const {confirmation,data}=await getPopularQuestionReplies(this.props.selectedSymposium,currentCounter);
		if(confirmation=="Success"){
			this.setState({
				counter:currentCounter,
				questionData:data
			})
		}else{
			alert('Unfortunately an error has occured when trying to get the next question. Please try again');
		}
		this.alterIsLoading(false);
	}

	render(){
		return(
			<React.Fragment>
				{this.state.questionData.length>0?
					<React.Fragment>
						{this.state.displayExpandedQuestionModal==true?
							<QuestionsPortal
								questionType={this.state.questionData[this.state.counter].questionType}													
								closeModalAndDisplayData={this.closeModalAndDisplayData}
								closeModal={this.closeModal}
								counter={this.state.counter}
								questions={this.state.questionData}
								selectedSymposium={this.props.selectedSymposium}
								triggerImagePortal={this.setImagePost}
								triggerVideoPortal={this.setVideoPost}
								triggerRegularPostPortal={this.setRegularPost}
								addComment={this.addComment}
								isOligarch={this.props.isOligarch}
								isMobile={this.props.isMobile}
							/>:<React.Fragment></React.Fragment>
						}
						{this.state.displayImagePortal==true?
							<ImagePostDisplayPortal
								closeModal={this.closeModal}
								selectedImage={this.state.selectedPost}
								recommendedImages={[]}
								targetDom="extendedSymposiumContainer"
							/>:
							<React.Fragment></React.Fragment>
						}
	
						{this.state.displayVideoPortal==true?
							<VideoPostDisplayPortal
								closeModal={this.closeModal}
								selectedVideo={this.state.selectedPost}
								recommendedVideos={[]}
								targetDom="extendedSymposiumContainer"
							/>
							:<React.Fragment></React.Fragment>
						}
	
						{this.state.displayRegularPortal==true?
							<RegularPostDisplayPortal
								closeModal={this.closeModal}
								selectedPost={this.state.selectedPost}
								recommendedRegularPosts={[]}
								targetDom="extendedSymposiumContainer"
							/>
							:<React.Fragment></React.Fragment>
						}
							<HightLightedQuestionsContainerModal isSimplified={this.props.isSimplified}>
								{this.state.isLoading==true?
									<p> Loading...</p>:
									<>
										<div style={{display:"flex",flexDirection:"row"}}>
											{this.state.counter!=0 &&(
												<NavigateBeforeIcon
													style={{borderRadius:"50%",boxShadow:"1px 1px 5px #dbdddf",marginLeft:"2%",cursor:"pointer"}}
													onClick={()=>this.decreaseCounter()}
												/>
											)}
											<p onClick={()=>this.expandQuestion()} style={QuestionCSS}>			
												{this.state.questionData[this.state.counter].question}
											</p>
											{this.state.counter!=(this.state.questionData.length-1) &&(
												<NavigateNextIcon
													style={{borderRadius:"50%",boxShadow:"1px 1px 5px #dbdddf",cursor:"pointer"}}
													onClick={()=>this.increaseCounter()}
												/>
											)}
										</div>
										<hr style={HorizontalLineCSS}/>
										{this.constructResponses(this.state.questionData[this.state.counter])}
									</>
								}
							</HightLightedQuestionsContainerModal>
					</React.Fragment>:null
				}
			</React.Fragment>
		)
	}
}


export default HighLightedQuestions;