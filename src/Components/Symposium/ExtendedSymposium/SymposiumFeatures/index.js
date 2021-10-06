import React,{useState,useContext,useEffect} from "react";
import {SymposiumContext} from "../SymposiumContext.js";
import styled from "styled-components";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ImagePostDisplayPortal from "../../../ExplorePage/ExplorePageSet/ImageHomeDisplayPortal.js";
import VideoPostDisplayPortal from "../../../ExplorePage/ExplorePageSet/VideoHomeDisplayPortal.js";
import RegularPostDisplayPortal from "../../../ExplorePage/ExplorePageSet/RegularPostHomeDisplayPortal.js";
import {QuestionsPortal} from "./SymposiumCommunityPortal.js";
import {
	getSymposiumUniversityPostsApi,
	getBeacons,
	retrieveCommunityPosts
} from "../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import SymposiumUniversityPortalDisplay from "./University/UniversityIndex/FeaturePostsMiddleMan.js";
import {useSelector} from "react-redux";



const BackgroundModalContainer= styled.div`
	position:fixed;
	width:100%;
	height:140%;
	background: rgba(0, 0, 0, 0.5);
	z-index:40;
	top:0%;
`;

const HightLightedQuestionsContainerModal=styled.div`
	position:relative;
	width:100%;
	height:100%;
	padding:20px;
	z-index:40;
	border-radius:5px;
	background-color:white;

	border-style:solid;
	border-color:#E4E4E4;
	border-width:1px;
	display:flex;
	flex-direction:column;
	overflow-y:auto;

	${({isSimplified})=>
		isSimplified==true &&(
			`
				#videoQuestionAnswers{
					height:210px !important;
					width:200px !important;
				}

				#imageHighlightedQuestion{
					width:200px !important;
					height:190px !important;
				}

				#postLI{
					margin-right:10% !important
				}
			`
		)
	}

	@media screen and (max-width:1370px){
		#postLI{
			width:40% !important;
		}
		#videoQuestionAnswers{
			width:200px !important;
			height:218px !important;
		}

		#imageHighlightedQuestion{
			width:90% !important;
		}
	}

	@media screen and (max-width:650px){
		#postLI{
			width:40% !important;
		}
		#videoQuestionAnswers{
			height:150px !important;
			width:110% !important;
		}
		#imageHighlightedQuestion{
			height:95px !important;
			width:90% !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:800px) and (orientation: landscape) {
		#imageHighlightedQuestion{
			width:40% !important;
			height:40% !important;
		}
    }

`;



const QuestionCSS={
	fontSize:"15px",
	color:"#000000",
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


const AnswerButtonCSS={
	position:"absolute",
	width:"25%",
	height:"15%",
	borderRadius:"5px",
	color:"white",
	backgroundColor:"#272727",
	top:"75%",
	left:"70%",
	display:"flex",
	alignItems:"center",
	justifyContent:"center",
	fontSize:"18px",
	cursor:"pointer",
	boxShadow:"1px 1px 5px #6e6e6e"
}

const SymposiumFeatures=(props)=>{
	const {selectedSymposiumFeature}=props;
	const symposiumConsumers=useContext(SymposiumContext);
	const {
		symposiumId,
		handleDisplayBeacons,
		symposiumUniversityQuestions,
		communityQuestions
	}=symposiumConsumers;
	console.log(symposiumConsumers);

	const {id}=useSelector(state=>state.personalInformation);
	const [questions,changeQuestions]=useState(props.questionInformation.questions);
	const [responses,changeResponses]=useState(props.questionInformation.responses);
	const [displayImagePortal,changeDisplayImagePortal]=useState(false);
	const [displayVideoPortal,changeVideoDisplayPortal]=useState(false);
	const [displayRegularPortal,changeDisplayRegularPortal]=useState(false);
	const [selectedPost,changeSelectedPost]=useState();
	const [displayExpandedCommunityModal,changeDisplayExpandedQuestionModal]=useState(false);
	const [counter,changeCounter]=useState(0);
	const [isLoading,changeIsLoading]=useState(false);
	const [displayExtendedUniversityModal,changeDisplayExtendeUniversityModal]=useState(false);

	const [beaconType,changeBeaconType]=useState("Images");
	const beaconScrollQuestionsType=[
		{question:"Images"},
		{question:"Videos"},
		{question:"Regular"}
	]

	useEffect(()=>{
		const fetchData=async()=>{
			debugger;
			changeIsLoading(true);
			if(selectedSymposiumFeature=="University"){
				await retrieveUniversityPosts(0);
			}else if(selectedSymposiumFeature=="Beacon"){
				await triggerRetrieveBeacons(0);
			}else{
				await triggerRetrieveCommunityPosts(0);
			}
			changeIsLoading(false);
		}

		fetchData();
	},[selectedSymposiumFeature]);

	const triggerRetrieveBeacons=async(counter)=>{
		const featuresPageGetParams={
			symposiumId,
	        postType:beaconType,
	        currentPostSessionManagment:uuidv4(),
	        ownerId:id,
	        tags:null
		}
		const {confirmation,data}=await getBeacons(featuresPageGetParams);
		if(confirmation=="Success"){
			const {message}=data;
			changeCounter(counter)
			changeResponses([...message]);
			if(counter==0)
				changeQuestions([...beaconScrollQuestionsType])
		}else{
			alert('Unfortunately there has been an error retrieving these beacon posts. Please try again');
		}
	}



	const retrieveUniversityPosts=async(counter)=>{
		debugger;
		const symposiumFetchParams={
			questionId:symposiumUniversityQuestions[counter].questionId,
            questionType:symposiumUniversityQuestions[counter].questionType,
            questionLevel:symposiumUniversityQuestions[counter].questionType!="Text"?null:"Beginner",
            currentPostSessionManagmentToken:uuidv4(),
            ownerId:id
		}

		const {confirmation,data}=await getSymposiumUniversityPostsApi(symposiumFetchParams);
		if(confirmation=="Success"){
			const {message}=data;
			changeCounter(counter)
			changeResponses([...message]);
			if(counter==0)
				changeQuestions([...symposiumUniversityQuestions]);
		}else{	
			alert('Unfortunately, there has been an error retrieving these symposium university questions. Please try again');
		}
	}

	const setImagePost=(data)=>{
		changeSelectedPost(data);
		changeDisplayImagePortal(!displayImagePortal)
	}

	const setVideoPost=(data)=>{
		changeSelectedPost(data);
		changeVideoDisplayPortal(!displayVideoPortal);
	}

	const setRegularPost=(data)=>{
		changeSelectedPost(data);
		changeDisplayRegularPortal(!displayRegularPortal);
	}

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const constructResponses=(question)=>{
		var element;
		if(responses.length==0){
			return <p> No responses yet :(. Click on the question and click the pencil icon to make a post </p>
		}else{
			if(questions[counter].questionType=="Image"){
				return <div style={{display:"flex",flexDirection:"row",width:"100%",flexWrap:"wrap"}}>
							{responses.map(data=>
								<div id="postLI" onClick={()=>setImagePost(data)} style={{marginRight:"2%"}}>
									<img id="imageHighlightedQuestion" src={data.imgUrl}
									 style={{borderRadius:"5px",width:"90px",height:"80px",marginBottom:"5%",cursor:"pointer"}}
									/>
								</div>
							)}
						</div>;
			}else if(questions[counter].questionType=="Video"){
				return <div style={{display:"flex",flexDirection:"row",width:"100%",flexWrap:"wrap"}}>
							{responses.map(data=>
								<div id="postLI" onClick={()=>setVideoPost(data)} 
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
							{responses.map(data=>
								<React.Fragment>
									<p onClick={()=>setRegularPost(data)} style={{cursor:"pointer",width:"100%",marginBottom:"5%"}}>
										{data.post}	
									</p>
									<hr/>
								</React.Fragment>
							)}
						</div>;
			}
		}
	}

	const expandQuestion=()=>{
		if(props.isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free')
		}else{
			switch(selectedSymposiumFeature){
				case "Community":{
					changeDisplayExpandedQuestionModal(true);
					break;
				}

				case "University":{
					changeDisplayExtendeUniversityModal(true);
					break;
				}

				case "Beacon":{
					handleDisplayBeacons();
					break;
				}
			}
		}
	}

	const closeModal=()=>{
		changeDisplayImagePortal(false);
		changeVideoDisplayPortal(false);
		changeDisplayRegularPortal(false);
		changeDisplayExpandedQuestionModal(false);
	}

	const closeModalAndDisplayData=({data,currentQuestionType})=>{
		if(currentQuestionType==questions[counter].questionType){
			var replies=responses;
			replies.splice(0,0,data);
			changeDisplayExpandedQuestionModal(true);
			changeResponses([...responses]);
		}
	}

	const alterIsLoading=(loadingIndicator)=>{
		changeIsLoading(loadingIndicator);
	}


	const increaseCounter=()=>{
		debugger;
		var currentCounter=counter;
		currentCounter=counter+1;
		triggerPostsDisplay(currentCounter);
	}

	const triggerRetrieveCommunityPosts=async(currentCounter)=>{
		alterIsLoading(true);
		const communityGetParams={
			symposiumId:props.symposiumId,
            parentQuestionId:questions[currentCounter]._id,
            ownerId:props.ownerId,
            currentPostManagmentToken:uuidv4(),
            postType:questions[currentCounter].questionType
		}

		const {confirmation,data}=await retrieveCommunityPosts(communityGetParams);
		if(confirmation=="Success"){
			const {message}=data;
			changeCounter(currentCounter);
			changeResponses([...message]);
			if(currentCounter==0)
				changeQuestions([...communityQuestions.questions]);
		}else{
			alert('Unfortunately an error has occured when trying to get this question. Please try again');
		}
		alterIsLoading(false);
	}

	const triggerPostsDisplay=(currentCounter)=>{
		switch(selectedSymposiumFeature){
			case "Community":{
				triggerRetrieveCommunityPosts(currentCounter);
				break;
			}
			case "University":{
				retrieveUniversityPosts(currentCounter);
				break;
			}
			case "Beacon":{
				triggerRetrieveBeacons(currentCounter);
				break;
			}
		}

	}

	const decreaseCounter=()=>{
		var currentCounter=counter;
		currentCounter=counter-1;
		triggerPostsDisplay(currentCounter);
	}

	const closeSymposiumUniversityModal=()=>{
		changeDisplayExtendeUniversityModal(false);
	}


	return(
		<React.Fragment>
			{displayExpandedCommunityModal==true &&(
				<QuestionsPortal
					questionType={questions[counter].questionType}													
					closeModalAndDisplayData={closeModalAndDisplayData}
					closeModal={closeModal}
					counter={counter}
					questions={questions}
					responses={responses}
					selectedSymposium={props.selectedSymposium}
					triggerImagePortal={setImagePost}
					triggerVideoPortal={setVideoPost}
					triggerRegularPostPortal={setRegularPost}
					isOligarch={props.isOligarch}
					isMobile={props.isMobile}
				/>
			)}

			{displayExtendedUniversityModal==true &&(
				<SymposiumUniversityPortalDisplay
					modalType={questions[counter].questionType}
					closeModal={closeSymposiumUniversityModal}
					symposiumId={symposiumId}
					selectedQuestion={questions[counter]}
				/>
			)}



			{displayImagePortal==true?
				<ImagePostDisplayPortal
					closeModal={closeModal}
					selectedImage={selectedPost}
					recommendedImages={[]}
					targetDom="extendedSymposiumContainer"
				/>:
				<React.Fragment></React.Fragment>
			}

			{displayVideoPortal==true?
				<VideoPostDisplayPortal
					closeModal={closeModal}
					selectedVideo={selectedPost}
					recommendedVideos={[]}
					targetDom="extendedSymposiumContainer"
				/>
				:<React.Fragment></React.Fragment>
			}

			{displayRegularPortal==true?
				<RegularPostDisplayPortal
					closeModal={closeModal}
					selectedPost={selectedPost}
					recommendedRegularPosts={[]}
					targetDom="extendedSymposiumContainer"
				/>
				:<React.Fragment></React.Fragment>
			}
			<HightLightedQuestionsContainerModal isSimplified={props.isSimplified}>
				{isLoading==true?
					<p> Loading...</p>:
					<div>
						<div style={{display:"flex",flexDirection:"row"}}>
							{counter!=0 &&(
								<NavigateBeforeIcon
									style={{borderRadius:"50%",boxShadow:"1px 1px 5px #dbdddf",marginLeft:"2%",cursor:"pointer"}}
									onClick={()=>decreaseCounter()}
								/>
							)}
							<p onClick={()=>expandQuestion()} style={QuestionCSS}>			
								<b>{questions[counter].question}</b>
							</p>
							{counter!=(questions.length-1) &&(
								<NavigateNextIcon
									style={{borderRadius:"50%",boxShadow:"1px 1px 5px #dbdddf",cursor:"pointer"}}
									onClick={()=>increaseCounter()}
								/>
							)}
						</div>
						<hr style={HorizontalLineCSS}/>
						{constructResponses(responses)}
						<div style={AnswerButtonCSS}
							onClick={()=>expandQuestion()}>
							Answer
						</div>
					</div>
				}
			</HightLightedQuestionsContainerModal>
		</React.Fragment>
	)
}





// class HighLightedQuestions extends Component{
// 	constructor(props){
// 		super(props);
// 		const {
// 			questions,
// 			responses
// 		}=props.questionInformation;

// 		this.state={
// 			questions,
// 			responses,
// 			displayImagePortal:false,
// 			displayVideoPortal:false,
// 			displayRegularPortal:false,
// 			selectedPost:{},
// 			displayExpandedQuestionModal:false,
// 			counter:0,
// 			isLoading:false
// 		}
// 	}

// 	setImagePost=(data)=>{
// 		this.setState({
// 			selectedPost:data,
// 			displayImagePortal:!this.state.displayImagePortal
// 		})
// 	}

// 	setVideoPost=(data)=>{
// 		this.setState({
// 			selectedPost:data,
// 			displayVideoPortal:!this.state.displayVideoPortal
// 		})
// 	}

// 	setRegularPost=(data)=>{
// 		this.setState({
// 			selectedPost:data,
// 			displayRegularPortal:!this.state.displayRegularPortal
// 		})
// 	}

// 	uuidv4=()=>{
// 	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
// 	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
// 	    return v.toString(16);
// 	  });
// 	}


// 	constructResponses=(question)=>{
// 		var element;
// 		if(this.state.responses.length==0){
// 			return <p> No responses yet :(. Click on the question and click the pencil icon to make a post </p>
// 		}else{
// 			if(this.state.questions[this.state.counter].questionType=="Image"){
// 				return <div style={{display:"flex",flexDirection:"row",width:"100%",flexWrap:"wrap"}}>
// 							{this.state.responses.map(data=>
// 								<div id="postLI" onClick={()=>this.setImagePost(data)} style={{marginRight:"2%"}}>
// 									<img id="imageHighlightedQuestion" src={data.imgUrl}
// 									 style={{borderRadius:"5px",width:"90px",height:"80px",marginBottom:"5%",cursor:"pointer"}}
// 									/>
// 								</div>
// 							)}
// 						</div>;
// 			}else if(this.state.questions[this.state.counter].questionType=="Video"){
// 				return <div style={{display:"flex",flexDirection:"row",width:"100%",flexWrap:"wrap"}}>
// 							{this.state.responses.map(data=>
// 								<div id="postLI" onClick={()=>this.setVideoPost(data)} 
// 									style={{marginRight:"10%",marginBottom:"5%",width:"30%"}}>
// 									<video id="videoQuestionAnswers"
// 										style={{borderRadius:"5px",cursor:"pointer"}}
// 										 position="relative" width="120" height="60"
// 									 	key={data.videoUrl} autoPlay loop autoBuffer muted playsInline>
// 										<source src={data.videoUrl} type="video/mp4"/>
// 									</video>
// 								</div>
// 							)}
// 						</div>;
// 			}else{
// 				return <div style={{display:"flex",flexDirection:"column"}}>
// 							{this.state.responses.map(data=>
// 								<React.Fragment>
// 									<p onClick={()=>this.setRegularPost(data)} style={{cursor:"pointer",width:"100%",marginBottom:"5%"}}>
// 										{data.post}	
// 									</p>
// 									<hr/>
// 								</React.Fragment>
// 							)}
// 						</div>;
// 			}
// 		}
// 	}

// 	expandQuestion=()=>{
// 		if(this.props.isGuestProfile==true){
// 			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free')
// 		}else{
// 			this.setState({
// 				displayExpandedQuestionModal:true
// 			});
// 		}
// 	}

// 	addComment=(data)=>{}

// 	closeModal=()=>{
// 		this.setState({
// 			displayImagePortal:false,
// 			displayVideoPortal:false,
// 			displayRegularPortal:false,
// 			displayExpandedQuestionModal:false
// 		})
// 	}

// 	closeModalAndDisplayData=({data,currentQuestionType})=>{
// 		if(currentQuestionType==this.state.questions[this.state.counter].questionType){
			
// 			var replies=this.state.responses;

// 			replies.splice(0,0,data);
// 			this.setState(prevState=>({
// 				...prevState,
// 				displayExpandedQuestionModal:false,
// 				responses:replies
// 			}))
// 		}
// 	}

// 	alterIsLoading=(loadingIndicator)=>{
// 		this.setState({
// 			isLoading:loadingIndicator
// 		})
// 	}


// 	increaseCounter=()=>{
// 		var currentCounter=this.state.counter;
// 		currentCounter=this.state.counter+1;
// 		this.triggerRetrieveCommunityPosts(currentCounter);
// 	}

// 	triggerRetrieveCommunityPosts=async(currentCounter)=>{
// 		this.alterIsLoading(true);
// 		const communityGetParams={
// 			symposiumId:this.props.symposiumId,
//             parentQuestionId:this.state.questions[currentCounter]._id,
//             ownerId:this.props.ownerId,
//             currentPostManagmentToken:this.uuidv4(),
//             postType:this.state.questions[currentCounter].questionType
// 		}

// 		const {confirmation,data}=await retrieveCommunityPosts(communityGetParams);
// 		if(confirmation=="Success"){
// 			const {message}=data;
// 			this.setState({
// 				counter:currentCounter,
// 				responses:message
// 			})
// 		}else{
// 			alert('Unfortunately an error has occured when trying to get this question. Please try again');
// 		}
// 		this.alterIsLoading(false);
// 	}

// 	decreaseCounter=()=>{
// 		var currentCounter=this.state.counter;
// 		currentCounter=this.state.counter-1;
// 		this.triggerRetrieveCommunityPosts(currentCounter);
// 	}

// 	render(){
// 		return(
// 			<React.Fragment>
// 				{this.state.displayExpandedQuestionModal==true &&(
// 					<QuestionsPortal
// 						questionType={this.state.questions[this.state.counter].questionType}													
// 						closeModalAndDisplayData={this.closeModalAndDisplayData}
// 						closeModal={this.closeModal}
// 						counter={this.state.counter}
// 						questions={this.state.questions}
// 						responses={this.state.responses}
// 						selectedSymposium={this.props.selectedSymposium}
// 						triggerImagePortal={this.setImagePost}
// 						triggerVideoPortal={this.setVideoPost}
// 						triggerRegularPostPortal={this.setRegularPost}
// 						addComment={this.addComment}
// 						isOligarch={this.props.isOligarch}
// 						isMobile={this.props.isMobile}
// 					/>
// 				)}

// 				{this.state.displayImagePortal==true?
// 					<ImagePostDisplayPortal
// 						closeModal={this.closeModal}
// 						selectedImage={this.state.selectedPost}
// 						recommendedImages={[]}
// 						targetDom="extendedSymposiumContainer"
// 					/>:
// 					<React.Fragment></React.Fragment>
// 				}

// 				{this.state.displayVideoPortal==true?
// 					<VideoPostDisplayPortal
// 						closeModal={this.closeModal}
// 						selectedVideo={this.state.selectedPost}
// 						recommendedVideos={[]}
// 						targetDom="extendedSymposiumContainer"
// 					/>
// 					:<React.Fragment></React.Fragment>
// 				}

// 				{this.state.displayRegularPortal==true?
// 					<RegularPostDisplayPortal
// 						closeModal={this.closeModal}
// 						selectedPost={this.state.selectedPost}
// 						recommendedRegularPosts={[]}
// 						targetDom="extendedSymposiumContainer"
// 					/>
// 					:<React.Fragment></React.Fragment>
// 				}
// 				<HightLightedQuestionsContainerModal isSimplified={this.props.isSimplified}>
// 					{this.state.isLoading==true?
// 						<p> Loading...</p>:
// 						<div>
// 							<div style={{display:"flex",flexDirection:"row"}}>
// 								{this.state.counter!=0 &&(
// 									<NavigateBeforeIcon
// 										style={{borderRadius:"50%",boxShadow:"1px 1px 5px #dbdddf",marginLeft:"2%",cursor:"pointer"}}
// 										onClick={()=>this.decreaseCounter()}
// 									/>
// 								)}
// 								<p onClick={()=>this.expandQuestion()} style={QuestionCSS}>			
// 									<b>{this.state.questions[this.state.counter].question}</b>
// 								</p>
// 								{this.state.counter!=(this.state.questions.length-1) &&(
// 									<NavigateNextIcon
// 										style={{borderRadius:"50%",boxShadow:"1px 1px 5px #dbdddf",cursor:"pointer"}}
// 										onClick={()=>this.increaseCounter()}
// 									/>
// 								)}
// 							</div>
// 							<hr style={HorizontalLineCSS}/>
// 							{this.constructResponses(this.state.responses)}
// 							<div style={AnswerButtonCSS}
// 								onClick={()=>this.expandQuestion()}>
// 								Answer
// 							</div>
// 						</div>
// 					}
// 				</HightLightedQuestionsContainerModal>
// 			</React.Fragment>
// 		)
// 	}
// }


export default SymposiumFeatures;