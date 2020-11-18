import React,{useState} from "react";
import styled from "styled-components";
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import ArtIndexModal from "../Modals/FeaturesIndex/ArtIndex.js";
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
const ArtRelatedFeatures=({symposium,questions})=>{
	console.log(questions);
	if(questions!=null){
		var {
			audioQuestion,
			imageQuestion,
			regularPostQuestion,
			videoQuestion
		}=questions;
	}
	

	const [displayArtFeaturesPortal,changeDisplayArtModal]=useState(false);
	const [displayModalType,changeModalType]=useState();
	const [questionIndex,changeQuestionIndex]=useState();
	const [selectedQuestion,changeSelectedQuestion]=useState();
	const [selectedPostId,changeSelectedPostId]=useState();

	const displaySubmitModal=(index)=>{
		changeModalType("Submit");
		changeDisplayArtModal(true);
		changeQuestionIndex(index);
	}

	const displayPostModal=(posts,postType,selectedPost)=>{
		
		var indexOfStevie = posts.findIndex(i => i._id === selectedPost._id);
		changeModalType(postType);
		changeDisplayArtModal(true);
		changeQuestionIndex(indexOfStevie);
		changeSelectedQuestion(selectedPost.question);
		changeSelectedPostId(selectedPost._id);
	}

	const handleCloseModal=()=>{
		changeDisplayArtModal(false);
	}

	return(
		<FeatureConsumer>
			{symposiumInformation=>{
				return <>
					{questions!=null && (
						<>
							{displayArtFeaturesPortal==true?
								<ArtIndexModal
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

export default ArtRelatedFeatures;