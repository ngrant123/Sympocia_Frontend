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
	const [questionIndex,changeQuestionIndex]=useState();
	const [selectedQuestion,changeSelectedQuestion]=useState();
	const [selectedPostId,changeSelectedPostId]=useState();


	const displayPostModal=(posts,postType,selectedPost,isGuestProfile)=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free');
		}else{
			var indexOfStevie = posts.findIndex(i => i._id === selectedPost._id);
			changeModalType(postType);
			changeDisplayFeaturesPostModal(true);
			changeQuestionIndex(indexOfStevie);
			changeSelectedQuestion(selectedPost.question);
			changeSelectedPostId(selectedPost._id);
		}
	}

	const handleCloseModal=()=>{
		changeDisplayFeaturesPostModal(false);
	}
	return(
		<Container isSimplified={isSimplified}>
			{displayFeaturesPostsModal==true &&(
				<ModalDecider	
					modalType={displayModalType}
					closeModal={handleCloseModal}
					symposium={symposium}
					questionIndex={questionIndex}
					symposiumId={symposiumId}
					question={selectedQuestion}
					selectedPostId={selectedPostId}
				/>
			)}
			{audioQuestion.map(data=>
				<>
				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li id="questionDiv" onClick={()=>displayPostModal(audioQuestion,"Audio",data,isGuestProfile)} 
						style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								{data.question}
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								<ArrowDropDownCircleOutlinedIcon/>
							</li>
						</ul>
					</li>
				</a>
				<hr style={HorizontalLineCSS}/>
				</>
			)}
			{imageQuestion.map(data=>
				<>
				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li id="questionDiv" onClick={()=>displayPostModal(imageQuestion,"Image",data,isGuestProfile)}
						style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								{data.question}
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								<ArrowDropDownCircleOutlinedIcon/>
							</li>
						</ul>
					</li>
				</a>
				<hr style={HorizontalLineCSS}/>
				</>
			)}
			{regularPostQuestion.map(data=>
				<>
				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li id="questionDiv" onClick={()=>displayPostModal(
										regularPostQuestion,"RegularPost",data,isGuestProfile
									)} style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								{data.question}
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								<ArrowDropDownCircleOutlinedIcon/>
							</li>
						</ul>
					</li>
				</a>
				<hr style={HorizontalLineCSS}/>
				</>
			)}
			{videoQuestion.map(data=>
				<>
				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li id="questionDiv" onClick={()=>displayPostModal(videoQuestion,"Video",data,isGuestProfile)}
					style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								{data.question}
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								<ArrowDropDownCircleOutlinedIcon/>
							</li>
						</ul>
					</li>
				</a>
				<hr style={HorizontalLineCSS}/>
				</>
			)}
		</Container>
	)
}


export default QuestionsIndex;
