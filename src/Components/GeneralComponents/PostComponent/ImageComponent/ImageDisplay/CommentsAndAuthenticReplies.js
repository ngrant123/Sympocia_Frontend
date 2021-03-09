import React from "react";
import styled from "styled-components";
import {PollingOptionsContainer} from "./ImageContainerCSS.js";
import Comments from "../../../CommentsComponent/index.js";
import {postCaptionAndDescription} from "./Post.js";


const ButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"4%",
  cursor:"pointer"
}


const PollingOptionsCSS={
	boxShadow:"1px 1px 5px #6e6e6e",
	padding:"40px",
	borderRadius:"5px",
	cursor:"pointer",
	marginBottom:"10%"
}



const CommentsAndAuthenticReplies=(props)=>{
	const {
		_id,
		hideComments,
		targetDom,
		isGuestProfile,
		changeDisplayPollingOptions,
		displayPollingOptionsTrigger,
		postType,
		displayPollingOptions,
		profileType,
		displayPostAdditionalInformation,
		caption,
		description,
		triggerDisplayPostDescriptionAndCaption
	}=props;

	return(
		<React.Fragment>
			{displayPostAdditionalInformation==true?
				<React.Fragment>
					<p onClick={()=>triggerDisplayPostDescriptionAndCaption(false)} style={{marginBottom:"10%",...ButtonCSS}}>Back</p>
					{postCaptionAndDescription(caption,description)}
				</React.Fragment>:
				<React.Fragment>
					{displayPollingOptions==false?
						<Comments
							postId={_id}
							postType={"Images"}
							hideComments={hideComments}
							targetDom={targetDom}
							isGuestProfile={isGuestProfile}
						/>:
						<PollingOptionsContainer>
							<p onClick={()=>changeDisplayPollingOptions(false)} style={{marginBottom:"10%",...ButtonCSS}}>Back</p>
							<p onClick={()=>displayPollingOptionsTrigger(true)} style={PollingOptionsCSS}>
								Approve Post
							</p>

							<p onClick={()=>displayPollingOptionsTrigger(false)} style={PollingOptionsCSS}>
								Disapprove Post
							</p>
						</PollingOptionsContainer>
					}
				</React.Fragment>
			}
		</React.Fragment>
	)
}

export default CommentsAndAuthenticReplies;