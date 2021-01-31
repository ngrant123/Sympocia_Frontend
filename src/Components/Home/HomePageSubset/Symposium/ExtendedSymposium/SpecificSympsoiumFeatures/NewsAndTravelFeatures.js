import React,{useState} from "react";
import styled from "styled-components";
import NewsAndTravelIndexModal from "../Modals/FeaturesIndex/NewsAndTravelIndex.js";
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

const NewsAndTravelFeatures=({symposium,questions})=>{

	if(questions!=null){
		var {
			audioQuestion,
			imageQuestion,
			regularPostQuestion,
			videoQuestion
		}=questions;
	}

	const [displayNewsAndTravelFeaturesPortal,changeDisplayNewsAndTravelModal]=useState(false);
	const [displayModalType,changeModalType]=useState();
	const [questionIndex,changeQuestionIndex]=useState();
	const [selectedQuestion,changeSelectedQuestion]=useState();
	const [selectedPostId,changeSelectedPostId]=useState();

	const displayMapModal=()=>{
		changeModalType("Map");
		changeDisplayNewsAndTravelModal(true);
	}

	const displayAdvisoryModal=(index)=>{
		changeModalType("Advisory");
		changeDisplayNewsAndTravelModal(true);
		changeQuestionIndex(index);
	}

	const displayPostModal=(posts,postType,selectedPost,isGuestProfile)=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free')
		}else{
			var indexOfStevie = posts.findIndex(i => i._id === selectedPost._id);
			changeModalType(postType);
			changeDisplayNewsAndTravelModal(true);
			changeQuestionIndex(indexOfStevie);
			changeSelectedQuestion(selectedPost.question);
			changeSelectedPostId(selectedPost._id);
		}
	}

	const handleCloseModal=()=>{
		changeDisplayNewsAndTravelModal(false);
	}

	return(
		<FeatureConsumer>
			{symposiumInformation=>{
				return <>
					{questions!=null && (
						<>
							{displayNewsAndTravelFeaturesPortal==true?
								<NewsAndTravelIndexModal
									modalType={displayModalType}
									closeModal={handleCloseModal}
									symposium={symposium}
									questionIndex={questionIndex}
									symposiumId={symposiumInformation.symposiumId}
									question={selectedQuestion}
									selectedPostId={selectedPostId}
								/>:null
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

export default NewsAndTravelFeatures;

