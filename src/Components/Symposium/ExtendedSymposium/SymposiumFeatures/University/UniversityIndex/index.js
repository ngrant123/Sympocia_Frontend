import React,{useState,useContext} from "react";
import styled from "styled-components";
import ModalDecider from "./FeaturePostsMiddleMan.js";
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {FeatureConsumer} from "../FeatureContext.js";

const OptionsCSS={
  listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec"
}


const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}


const Container=styled.div`
	${({isSimplified})=>
		isSimplified==true &&(
			`
				display:flex !important;
				flex-direction:column;
				justify-content:center !important;
				align-items:center !important;
				padding:5%;

				#questionDiv{
					border-style:none !important;
				}
			`
		)
	}
`;



const QuestionsIndex=({symposium,questions,isGuestProfile,symposiumId})=>{
	if(questions!=null){
		var {
			audioQuestion,
			imageQuestion,
			regularPostQuestion,
			videoQuestion
		}=questions;
	}
	const {isSimplified}=useContext(FeatureConsumer);
	const [displayFeaturesPostsModal,changeDisplayFeaturesPostModal]=useState(false);
	const [displayModalType,changeModalType]=useState();
	const [selectedQuestion,changeSelectedQuestion]=useState();


	const displayPostModal=(postType,selectedQuestion,isGuestProfile)=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free');
		}else{
			changeModalType(postType);
			changeDisplayFeaturesPostModal(true);
			changeSelectedQuestion(selectedQuestion);
		}
	}

	const handleCloseModal=()=>{
		changeDisplayFeaturesPostModal(false);
	}

	const questionsDisplay=(currentQuestion)=>{
		const {questionType}=currentQuestion;
		switch(questionType){
			case "Image":{
				return(
					<React.Fragment>
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<li id="questionDiv" onClick={()=>displayPostModal(
																"Image",
																currentQuestion,
																isGuestProfile)}
								style={OptionsCSS}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
										{currentQuestion.question}
									</li>

									<li style={{listStyle:"none",display:"inline-block"}}>
										<ArrowDropDownCircleOutlinedIcon/>
									</li>
								</ul>
							</li>
						</a>
						<hr style={HorizontalLineCSS}/>
					</React.Fragment>
				)
			}

			case "Video":{
				return(
					<React.Fragment>
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<li id="questionDiv" onClick={()=>displayPostModal(
																"Video",
																currentQuestion,
																isGuestProfile)}
							style={OptionsCSS}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
										{currentQuestion.question}
									</li>

									<li style={{listStyle:"none",display:"inline-block"}}>
										<ArrowDropDownCircleOutlinedIcon/>
									</li>
								</ul>
							</li>
						</a>
						<hr style={HorizontalLineCSS}/>
					</React.Fragment>
				)
			}

			case "Text":{
				return(
					<React.Fragment>
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<li id="questionDiv" onClick={()=>displayPostModal(
																"RegularPost",
																currentQuestion,
																isGuestProfile)} 
								style={OptionsCSS}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
										{currentQuestion.question}
									</li>

									<li style={{listStyle:"none",display:"inline-block"}}>
										<ArrowDropDownCircleOutlinedIcon/>
									</li>
								</ul>
							</li>
						</a>
						<hr style={HorizontalLineCSS}/>
					</React.Fragment>
				)
			}

			case "Audio":{
				return(
					<React.Fragment>
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<li id="questionDiv" onClick={()=>displayPostModal(
																"Audio",
																currentQuestion,
																isGuestProfile)} 
								style={OptionsCSS}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
										{currentQuestion.question}
									</li>

									<li style={{listStyle:"none",display:"inline-block"}}>
										<ArrowDropDownCircleOutlinedIcon/>
									</li>
								</ul>
							</li>
						</a>
						<hr style={HorizontalLineCSS}/>
					</React.Fragment>
				)
			}
		}
	}

	return(
		<Container isSimplified={isSimplified}>
			{displayFeaturesPostsModal==true &&(
				<ModalDecider	
					modalType={displayModalType}
					closeModal={handleCloseModal}
					symposium={symposium}
					symposiumId={symposiumId}
					selectedQuestion={selectedQuestion}
				/>
			)}
			{questions.map(data=>
				<React.Fragment>
					{questionsDisplay(data)}
				</React.Fragment>
			)}
		</Container>
	)
}


export default QuestionsIndex;
