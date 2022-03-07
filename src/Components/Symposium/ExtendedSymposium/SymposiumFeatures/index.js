import React,{useState,useContext,useEffect,useMemo} from "react";
import {SymposiumContext} from "../SymposiumContext.js";
import styled from "styled-components";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ImagePostDisplayPortal from "../../../ExplorePage/ExplorePageSet/Modals-Portals/ImageHomeDisplayPortal.js";
import VideoPostDisplayPortal from "../../../ExplorePage/ExplorePageSet/Modals-Portals/VideoHomeDisplayPortal.js";
import RegularPostDisplayPortal from "../../../ExplorePage/ExplorePageSet/Modals-Portals/RegularPostHomeDisplayPortal.js";
import {QuestionsPortal} from "./Community/SymposiumCommunityPortal.js";
import {
	getSymposiumUniversityPostsApi,
	getBeacons,
	retrieveCommunityPosts
} from "../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import SymposiumUniversityPortalDisplay from "./University/UniversityIndex/FeaturePostsMiddleMan.js";
import {useSelector} from "react-redux";
import VideoLoadingPrompt from "../../../GeneralComponents/PostComponent/VideoLoadingPrompt.js";



const BackgroundModalContainer= styled.div`
	position:fixed;
	width:100%;
	height:140%;
	background: rgba(0, 0, 0, 0.5);
	z-index:40;
	top:0%;
`;

const SymposiumFeatureContainer=styled.div`
	position:relative;
	width:100%;
	height:100%;
	padding:20px;
	z-index:40;
	border-radius:5px;
	background-color:white;
	display:flex;
	flex-direction:column;

	${({isPortalHocComponent})=>
		isPortalHocComponent==true ?
		`overflow-y:none;`:
		`overflow-y:auto;`
	}

	${({isSimplified})=>
		isSimplified==false?
		`
			border-style:solid;
			border-color:#E4E4E4;
			border-width:1px;
		`:
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
			#answerButton{
				top:65% !important;
			}
		`
	}

	@media screen and (max-width:1370px){
		#postLI{
			width:40% !important;
		}

		#imageHighlightedQuestion{
			width:80% !important;
		}

		#answerButton{
			top:67% !important;
			left:70% !important;
			width:15% !important;
		}
	}
	@media screen and (max-width:800px){
		#imageHighlightedQuestion{
			width:90% !important;
		}
	}

	@media screen and (max-width:650px){
		#postLI{
			width:40% !important;
		}
		#imageHighlightedQuestion{
			height:95px !important;
			width:95px !important;
		}

		#answerButton{
			position:fixed !important;
			left:65% !important;
			top:80% !important;
			width:30% !important;
		}
	}



	@media screen and (min-width:500px) and (max-width:600px) 
		and (min-height:750px) and (max-height:850px){
		#imageHighlightedQuestion{
			height:150px !important;
		}
	}

	@media screen and (min-width:1110px) and (max-width:1380px) and (min-height:800px) and (max-height:1100px){
		#imageHighlightedQuestion{
			height:280px !important;
		}
	}




	@media screen and (min-width:400px) and (max-width:600px) 
		and (min-height:900px) and (max-height:1200px){
		#imageHighlightedQuestion{
			height:130px !important;
			width:140px !important;
		}
	}


	@media screen and (min-width:550px) and (max-width:700px) 
		and (min-height:550px) and (max-height:800px){
		#imageHighlightedQuestion{
			height:130px !important;
			width:140px !important;
		}
	}


	@media screen and (min-width:400px) and (max-width:700px) 
		and (min-height:650px) and (max-height:1150px){
		#imageHighlightedQuestion{
			height:160px !important;
			width:170px !important;
		}
	}

	@media screen and (min-width:400px) and (max-width:700px) 
		and (min-height:1000px) and (max-height:1300px){
		#imageHighlightedQuestion{
			height:160px !important;
			width:170px !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:800px) and (orientation: landscape) {
		width:100% !important;
		#imageHighlightedQuestion{
			width:250px !important;
			height:200px !important;
		}

		#answerButton{
			top:90% !important;
		}
    }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		#imageHighlightedQuestion{
			width:200px !important;
			height:150px !important;
		}

		#answerButton{
			top:80% !important;
		}
	}

`;

const VideoQuestionContainer=styled.div`
	position:relative;
	width:120px;
	height:60px;


	@media screen and (max-width:1370px){
		width:200px !important;
		height:218px !important;
	}

	@media screen and (max-width:650px){
		height:150px !important;
		width:110% !important;
	}

	@media screen and (min-width:1110px) and (max-width:1380px) and (min-height:800px) and (max-height:1100px){
		width:400px !important;
	}

	@media screen and (max-width:1370px) and (max-height:800px) and (orientation: landscape) {
		height:300px !important;
		width:400px !important;
    }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		height:210px !important;
		width:200px !important;
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
	position:"fixed",
	width:"10%",
	height:"50px",
	borderRadius:"5px",
	color:"white",
	backgroundColor:"#272727",
	top:"37%",
	left:"56%",
	display:"flex",
	zIndex:20,
	alignItems:"center",
	justifyContent:"center",
	fontSize:"18px",
	cursor:"pointer",
	boxShadow:"1px 1px 5px #6e6e6e"
}

const SymposiumFeatures=(props)=>{
	console.log(props);
	const {
		selectedSymposiumFeature,
		isPortalHocComponent
	}=props;
	const symposiumConsumers=useContext(SymposiumContext);
	const {
		symposiumId,
		handleDisplayBeacons,
		symposiumUniversityQuestions,
		communityQuestions
	}=symposiumConsumers;
	console.log(communityQuestions);

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

	const beaconScrollQuestionsType=[
		{
			question:"Images",
			questionType:"Image"
		},
		{
			question:"Videos",
			questionType:"Video"
		},
		{
			question:"Regular",
			questionType:"Text"
		}
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
	        postType:beaconScrollQuestionsType[counter].question,
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

	const constructResponses=useMemo(()=>{
		var element;
		if(responses.length==0){
			return <p> No responses yet :(. Click on the question to make a post </p>
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
							{responses.map((data,index)=>
								<div id="postLI" onClick={()=>setVideoPost(data)} 
									style={{marginRight:"10%",marginBottom:"5%"}}>
									<VideoQuestionContainer>
										<VideoLoadingPrompt
											videoElement={
												<video id={"videoQuestionAnswers"+index}
													style={{borderRadius:"5px",backgroundColor:"#151515",cursor:"pointer"}}
													 position="relative" width="100%" height="100%"
												 	key={data.videoUrl} autoPlay loop autoBuffer muted playsInline>
													<source src={data.videoUrl} type="video/mp4"/>
												</video>
											}
											videoId={"videoQuestionAnswers"+index}
										/>
									</VideoQuestionContainer>
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
	})

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
		
		var currentCounter=counter;
		currentCounter=counter+1;
		triggerPostsDisplay(currentCounter);
	}

	const triggerRetrieveCommunityPosts=async(currentCounter)=>{
		alterIsLoading(true);
		debugger;
		const communityGetParams={
			symposiumId:props.symposiumId,
            parentQuestionId:communityQuestions.questions[currentCounter]._id,
            ownerId:props.ownerId,
            currentPostManagmentToken:uuidv4(),
            postType:communityQuestions.questions[currentCounter].questionType
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
			<SymposiumFeatureContainer isSimplified={props.isSimplified} isPortalHocComponent={isPortalHocComponent}>
				{isLoading==true?
					<p> Loading...</p>:
					<div style={{position:"relative"}}>
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
						{constructResponses}
						<div id="answerButton" style={AnswerButtonCSS}
							onClick={()=>expandQuestion()}>
							Answer
						</div>
					</div>
				}
			</SymposiumFeatureContainer>
		</React.Fragment>
	)
}


export default SymposiumFeatures;