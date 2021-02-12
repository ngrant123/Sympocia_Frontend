import React,{useState} from "react";
import styled from "styled-components";
import STEMIndexModal from "../Modals/FeaturesIndex/STEMIndex.js";
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {FeatureConsumer} from "./FeatureContext.js";


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

const STEMRelatedFeatures=({symposium,questions})=>{
	if(questions!=null){
		var {
			audioQuestion,
			imageQuestion,
			regularPostQuestion,
			videoQuestion
		}=questions;
	}
	const [displaySTEMFeaturesPortal,changeDisplaySTEMModal]=useState(false);
	const [displayModalType,changeModalType]=useState();
	const [questionIndex,changeQuestionIndex]=useState();
	const [selectedQuestion,changeSelectedQuestion]=useState();
	const [selectedPostId,changeSelectedPostId]=useState();

	const displayTutoringModal=(index)=>{
		changeModalType("Tutoring");
		changeDisplaySTEMModal(true);
		changeQuestionIndex(index);
	}

	const displayRecommendedBooksModal=(index)=>{
		changeModalType("Books");
		changeDisplaySTEMModal(true);
		changeQuestionIndex(index);
	}

	const displayAchievementsModal=(index)=>{
		changeModalType("Achievement");
		changeDisplaySTEMModal(true);
		changeQuestionIndex(index);
	}

	const handleCloseModal=()=>{
		changeDisplaySTEMModal(false);
	}

	const displayPostModal=(posts,postType,selectedPost,isGuestProfile)=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free')
		}else{
			var indexOfStevie = posts.findIndex(i => i._id === selectedPost._id);
			changeModalType(postType);
			changeDisplaySTEMModal(true);
			changeQuestionIndex(indexOfStevie);
			changeSelectedQuestion(selectedPost.question);
			changeSelectedPostId(selectedPost._id);
		}
	}

	return(

		<FeatureConsumer>
			{symposiumInformation=>{
				return <>
					{questions!=null && (
						<>
						{displaySTEMFeaturesPortal==true?
								<STEMIndexModal
									modalType={displayModalType}
									closeModal={handleCloseModal}
									symposium={symposium}
									questionIndex={questionIndex}
									symposiumId={symposiumInformation.symposiumId}
									question={selectedQuestion}
									selectedPostId={selectedPostId}
								/>
								:null
							}
							<ul>
								{audioQuestion.map(data=>
									<>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>displayPostModal(audioQuestion,"Audio",data,symposiumInformation.isGuestProfile)} style={OptionsCSS}>
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
									<hr/>
									</>
								)}
								{imageQuestion.map(data=>
									<>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>displayPostModal(imageQuestion,"Image",data,symposiumInformation.isGuestProfile)} style={OptionsCSS}>
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
									<hr/>
									</>
								)}

								{regularPostQuestion.map(data=>
									<>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>displayPostModal(regularPostQuestion,"RegularPost",data,symposiumInformation.isGuestProfile)} style={OptionsCSS}>
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
									<hr/>
									</>
								)}
								{videoQuestion.map(data=>
									<>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>displayPostModal(videoQuestion,"Video",data,symposiumInformation.isGuestProfile)} style={OptionsCSS}>
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
									<hr/>
									</>
								)}

							</ul>
						</>

					)}
				</>		
			}}
		</FeatureConsumer>
	)
}

export default STEMRelatedFeatures;