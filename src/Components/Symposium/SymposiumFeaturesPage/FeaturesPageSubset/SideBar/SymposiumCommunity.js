import React,{useState,useEffect,useContext} from "react";
import styled from "styled-components";
import {FeaturesContext} from "../../FeaturesPageSet/FeaturesPageContext.js";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CurrentSubmissions from "../../FeaturesPageSet/Modals-Portals/SymposiumCommunity/QuestionStandings/CurrentSubmissions.js";
import ExtendedSubmission from "../../FeaturesPageSet/Modals-Portals/SymposiumCommunity/QuestionStandings/ExtendedSubmission.js";
import PortalsHOC from "../../FeaturesPageSet/Modals-Portals/PortalsHOC.js";
import SymposiumCommunityQuestionStandingDropDown from "../../FeaturesPageSet/Modals-Portals/DropDowns/SymposiumCommunityQuestionStandingOptions.js";
import CompetitionEndModal from "../../FeaturesPageSet/Modals-Portals/SymposiumCommunity/CompetitionEnd.js";
import SymposiumCommunityCreationPortal from "../../FeaturesPageSet/Modals-Portals/SymposiumCommunity/QuestionStandings/CreationModal.js";
import {useSelector} from "react-redux";
import {
	retrieveOwnerSpecificSubmittedQuestions
} from "../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";


const SubmissionsCSS={
	padding:"15px",
	borderRadius:"5px",
	color:"#A878FF",
	backgroundColor:"white",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#A878FF",
	display:"flex",
	justifyContent:"center",
	alignItems:"center",
	marginLeft:"2%",
	cursor:"pointer"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const TagsContainerCSS={
	boxShadow:"1px 1px 5px #dbdddf",
	display:"flex",
	flexDirection:"column",
	width:"95%",
	borderRadius:"5px",
	padding:"10px",
	maxHeight:"290px",
	overflowY:"auto"
}

const DropDownCSS={
	borderRadius:"50%",
	boxShadow:"1px 1px 5px #dbdddf",
	marginLeft:"2%",
	cursor:"pointer"
}

const VotesCSS={
	padding:"10px",
	color:"white",
	backgroundColor:"#43D351",
	width:"30%",
	borderRadius:"5px",
	display:"flex",
	justifyContent:"center",
	alignItems:"center"
}


const CreateButtonCSS={
	backgroundColor:"#C8B0F4",
	padding:"10px",
	display:"flex",
	alignItems:"center",
	justifyContent:"center",
	borderRadius:"5px",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#B38AFF",
	color:"white",
	cursor:"pointer",
	width:"100%",
	marginTop:"10%"
}

const CountDownTimer=({countDownDateMilliSeconds,triggerDisplayCompetitionEndModal})=>{
	const [timerCountDown,changeTimeCounterDowm]=useState();

	useEffect(()=>{
		constructTimer(countDownDateMilliSeconds);
	},[]);

	const constructTimer=(countDownDateMilliSeconds)=>{
		let countDownId=setInterval(()=>{
			
			var now = new Date().getTime();
			var distance = countDownDateMilliSeconds - (now-3000);

			var days = Math.floor(distance / (1000 * 60 * 60 * 24));
			var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((distance % (1000 * 60)) / 1000);

			const countDown = days + ":" + hours + ":" + minutes + ":" + seconds + "";
			changeTimeCounterDowm(countDown);

			if (distance < 0) {
				
				clearInterval(countDownId);
				changeTimeCounterDowm("Finished")
				if(triggerDisplayCompetitionEndModal!=null)
					triggerDisplayCompetitionEndModal();
			}
		},100);
	}

	return(
		<p style={{fontSize:"36px",color:"#C8B0F4"}}>
			<b>{timerCountDown}</b>
		</p>
	)
};




const SymposiumCommunity=()=>{

	const featuresPageConsumer=useContext(FeaturesContext);
	const [displayCurrentSubmission,changeDisplayCurrentSubmissions]=useState(false);
	const [displaySelectedSubmission,changeSelectedSubmission]=useState(false);
	const [selectedSubmissionQuestion,changeSelectedSubmissionQuestion]=useState();
	const [displayCommunityOptionsDropDown,changeCommunityOptionsDropDownDisplay]=useState(false);
	const [displayCompetitionEndModal,changeDisplayCompetitionEndModal]=useState(false);
	const [displaySymposiumQuestionCreationModal,changeSymposiumQuestionCreationModal]=useState(false);
	const userId=useSelector(state=>state.personalInformation.id);

	const{
		featuresPageSecondaryInformation,
		featuresPagePrimaryInformation:{
			competitionEndDate
		},
		currentSymposiumId,
		updateSecondaryInformation,
		isGuestProfile,
		triggerGenerateAirPlane
	}=featuresPageConsumer;

	const{
		submissionCount,
		currentQuestionsStandings
	}=featuresPageSecondaryInformation;

	const [questionStandings,changeQuestionStandings]=useState(currentQuestionsStandings);
	
	var date = new Date(competitionEndDate);
	var options = {
        year: 'numeric', month: 'numeric', day: 'numeric',
    };


	const triggerDisplayEditSubmission=async()=>{
		const {confirmation,data}=await retrieveOwnerSpecificSubmittedQuestions(userId,currentSymposiumId);
		if(confirmation=="Success"){
			const {message}=data;
			changeQuestionStandings([...message]);
			triggerDisplaySubmission();
		}else{
			alert('Unfortunately, there has been an error when retrieving your submissions. Please try again');
		}
	}

	var competitionEndDateText = date.toLocaleDateString('en', options);

	const triggerSelectedSubmissionDisplay=(data)=>{
		changeSelectedSubmissionQuestion(data);
		changeSelectedSubmission(true);
	}

	const constructQuestionStandings=()=>{
		return(
			<React.Fragment>
				{questionStandings.length==0?
					<p>No questions</p>:
					<React.Fragment>
						{questionStandings.map(data=>
							<div style={{display:"flex",flexDirection:"column",cursor:"pointer"}} 
								onClick={()=>triggerSelectedSubmissionDisplay(data)}>
								<p>{data.question}</p>
								<div style={VotesCSS}>
									{data.votes.length} votes
								</div>
								<hr style={HorizontalLineCSS}/>
							</div>
						)}
					</React.Fragment>
				}
			</React.Fragment>
		)
	}

	const changeCurrentSubmissionsDisplay=()=>{
		changeDisplayCurrentSubmissions(false);
		changeSelectedSubmission(false);
		changeCommunityOptionsDropDownDisplay(false);
		changeDisplayCompetitionEndModal(false);
		changeQuestionStandings([...currentQuestionsStandings])
	}

	const currentSubmissionsModal=()=>{
		return(
			<React.Fragment>
				{displayCurrentSubmission==true &&(
					<PortalsHOC
						closeModal={changeCurrentSubmissionsDisplay}
						component={
							<CurrentSubmissions
								currentQuestions={questionStandings}
								currentSymposiumId={currentSymposiumId}
								isGuestProfile={isGuestProfile}
							/>
						}
					/>
				)}
			</React.Fragment>
		)
	}

	const closeExtendedSubmissionModal=()=>{
		changeSelectedSubmission(false);
	}

	const extendedSubmissionModal=()=>{
		return(
			<React.Fragment>
				{displaySelectedSubmission==true &&(
					<PortalsHOC
						closeModal={changeCurrentSubmissionsDisplay}
						component={
							<ExtendedSubmission
								submissionData={selectedSubmissionQuestion}
								currentSymposiumId={currentSymposiumId}
								isGuestProfile={isGuestProfile}
								closeModal={closeExtendedSubmissionModal}
							/>
						}
					/>
				)}
			</React.Fragment>
		)
	}

	const triggerDisplaySubmission=()=>{
		changeDisplayCurrentSubmissions(true)
	}

	const displayCommunityQuestionOptions=()=>{
		return(
			<React.Fragment>
				{displayCommunityOptionsDropDown==true &&(
					<SymposiumCommunityQuestionStandingDropDown
						closeModal={changeCurrentSubmissionsDisplay}
						displaySubmission={triggerDisplaySubmission}
						currentSymposiumId={currentSymposiumId}
						displayEditSubmissionsModal={triggerDisplayEditSubmission}
					/>
				)}
			</React.Fragment>
		)
	}

	const competitionEndModal=()=>{
		return(
			<React.Fragment>
				{displayCompetitionEndModal==true &&(
					<PortalsHOC
						closeModal={changeCurrentSubmissionsDisplay}
						component={
							<CompetitionEndModal/>
						}
					/>
				)}
			</React.Fragment>
		)
	}

	const triggerDisplayCompetitionEndModal=()=>{
		changeDisplayCompetitionEndModal(true);
	}

	const closeQuestionCreationModal=()=>{
		changeSymposiumQuestionCreationModal(false);
	}

	const updateSymposiumCommunityQuestionStandings=(userSubmittedQuestion)=>{
		let communitySecondaryInformation=featuresPageSecondaryInformation;
		let {
			questionStandings,
			submissionCount
		}=communitySecondaryInformation;

		questionStandings.splice(0,0,userSubmittedQuestion);
		submissionCount+=1;

		communitySecondaryInformation={
			...communitySecondaryInformation,
			questionStandings,
			submissionCount,
			ownerQuestionCreationStatus:true
		}
		updateSecondaryInformation(communitySecondaryInformation);
		changeSymposiumQuestionCreationModal(false);
	}



	const symposiumCommunityQuestionCreationModal=()=>{
		return(
			<React.Fragment>
				{displaySymposiumQuestionCreationModal==true &&(
					<PortalsHOC
						closeModal={closeQuestionCreationModal}
						component={
							<SymposiumCommunityCreationPortal
								closeModal={closeQuestionCreationModal}
								updateStandings={updateSymposiumCommunityQuestionStandings}
								symposiumId={currentSymposiumId}
							/>
						}
					/>
				)}
			</React.Fragment>
		)
	}

	const triggerSymposiumQuestionCreationModal=()=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free');
		}else{
			changeSymposiumQuestionCreationModal(true);
		}
	}


	return(
		<React.Fragment>
			{symposiumCommunityQuestionCreationModal()}
			{competitionEndModal()}
			{displayCommunityQuestionOptions()}
			{extendedSubmissionModal()}
			{currentSubmissionsModal()}
			<div style={{display:"flex",flexDirection:"column"}}>
				<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginBottom:"5%"}}>
					<CountDownTimer
						countDownDateMilliSeconds={competitionEndDate}
						triggerDisplayCompetitionEndModal={triggerDisplayCompetitionEndModal}
					/>

					<div style={SubmissionsCSS} onClick={()=>changeDisplayCurrentSubmissions(true)}>
						{submissionCount} submissions
					</div>
				</div>
				<p style={{color:"#B38AFF"}}>
					Competition Ends: {competitionEndDateText}
				</p>
			</div>
			<hr style={HorizontalLineCSS}/>

			<div style={TagsContainerCSS} id="communityQuestionStandings"
				onClick={()=>triggerGenerateAirPlane("communityQuestionStandings")}>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
					<p>
						<b>Current questions standings:</b>
					</p>
					<div style={DropDownCSS} onClick={()=>changeCommunityOptionsDropDownDisplay(true)}>
						<ExpandMoreIcon
							style={{fontSize:"24"}}
						/>
					</div>
				</div>
				<hr style={HorizontalLineCSS}/>
				{constructQuestionStandings()}
			</div>
			<div style={CreateButtonCSS} onClick={()=>triggerSymposiumQuestionCreationModal()}>
				Create Community Question
			</div>
		</React.Fragment>
	)
}



export{
	SymposiumCommunity,
	CountDownTimer
}


