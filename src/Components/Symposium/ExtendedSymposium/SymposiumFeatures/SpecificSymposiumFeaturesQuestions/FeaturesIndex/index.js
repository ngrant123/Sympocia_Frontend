import React,{useState} from "react";
import ModalDecider from "./FeaturePostsMiddleMan.js";
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';

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



const QuestionsIndex=({symposium,questions,isGuestProfile,symposiumId})=>{
	if(questions!=null){
		var {
			audioQuestion,
			imageQuestion,
			regularPostQuestion,
			videoQuestion
		}=questions;
	}
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
		<React.Fragment>
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
			<ul>
				{audioQuestion.map(data=>
					<>
					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						<li onClick={()=>displayPostModal(audioQuestion,"Audio",data,isGuestProfile)} 
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
					<hr/>
					</>
				)}
				{imageQuestion.map(data=>
					<>
					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						<li onClick={()=>displayPostModal(imageQuestion,"Image",data,isGuestProfile)}
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
					<hr/>
					</>
				)}

				{regularPostQuestion.map(data=>
					<>
					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						<li onClick={()=>displayPostModal(
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
					<hr/>
					</>
				)}
				{videoQuestion.map(data=>
					<>
					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						<li onClick={()=>displayPostModal(videoQuestion,"Video",data,isGuestProfile)}
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
					<hr/>
					</>
				)}
			</ul>
		</React.Fragment>
	)
}


export default QuestionsIndex;
