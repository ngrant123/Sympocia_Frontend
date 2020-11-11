
import React,{useState} from "react";
import styled from "styled-components";
import MusicIndexModal from "../Modals/FeaturesIndex/MusicIndex.js";
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

const MusicFeatures=({symposium,questions})=>{

	if(questions!=null){
		var {
			audioQuestion,
			imageQuestion,
			regularPostQuestion,
			videoQuestion
		}=questions;
	}

	const [displayMusicFeaturesPortal,changeDisplayMusicModal]=useState(false);
	const [displayModalType,changeModalType]=useState();
	const [questionIndex,changeQuestionIndex]=useState();
	const [selectedQuestion,changeSelectedQuestion]=useState();
	const [selectedPostId,changeSelectedPostId]=useState();

	const displayBeatsModal=(index)=>{
		changeModalType("Beats");
		changeDisplayMusicModal(true);
		changeQuestionIndex(index);
	}

	const displayReviewWorkModal=(index)=>{
		changeModalType("Review");
		changeDisplayMusicModal(true);
		changeQuestionIndex(index);
	}

	const displayMusicTipsModal=(index)=>{
		changeModalType("Advisory");
		changeDisplayMusicModal(true);
		changeQuestionIndex(index);
	}

	const displayPostModal=(posts,postType,selectedPost)=>{
		var indexOfStevie = posts.findIndex(i => i._id === selectedPost._id);
		changeModalType(postType);
		changeDisplayMusicModal(true);
		changeQuestionIndex(indexOfStevie);
		changeSelectedQuestion(selectedPost.question);
		changeSelectedPostId(selectedPost._id);
	}

	const handleCloseModal=()=>{
		changeDisplayMusicModal(false);
	}

	return(
		<FeatureConsumer>
			{symposiumInformation=>{
				return <>
				{questions!=null && (
						<>
							{displayMusicFeaturesPortal==true?
								<MusicIndexModal
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
										<li onClick={()=>displayPostModal(audioQuestion,"Audio",data)} style={OptionsCSS}>
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
										<li onClick={()=>displayPostModal(imageQuestion,"Image",data)} style={OptionsCSS}>
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
										<li onClick={()=>displayPostModal(regularPostQuestion,"RegularPost",data)} style={OptionsCSS}>
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
										<li onClick={()=>displayPostModal(videoQuestion,"Video",data)} style={OptionsCSS}>
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

export default MusicFeatures;