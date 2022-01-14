import React from "react";
import styled from "styled-components";
import {PollingOptionsContainer} from "./PostContainerCSS.js";
import Comments from "../../CommentsComponent/index.js";
import {postCaptionAndDescription} from "./Post.js";

const Container=styled.div`
	@media screen and (max-width:650px){
		#backButton{
			width:30% !important;
		}
	}
`;


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
  cursor:"pointer",
  width:"10%",
  marginBottom:"5%"
}


const PollingOptionsCSS={
	boxShadow:"1px 1px 5px #6e6e6e",
	padding:"20px",
	borderRadius:"5px",
	cursor:"pointer",
	marginBottom:"10%"
}


const VerticalLineCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"60px",
 	marginRight:"5%",
 	marginLeft:"5%"
}


const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
}



const CommentsAndAuthenticReplies=(props)=>{
	const {
		_id,
		hideComments,
		targetDom,
		isGuestProfile,
		displayPollingOptionsTrigger,
		postType,
		displayPollingOptions,
		profileType,
		displayPostAdditionalInformation,
		headlineText,
		secondaryText,
		triggerDisplayPostDescriptionAndCaption,
		ownerId,
		selectedCommentPools,
		isOwnProfile
	}=props;
	return(
		<Container>
			{displayPostAdditionalInformation==true?
				<React.Fragment>
					<div id="backButton" onClick={()=>triggerDisplayPostDescriptionAndCaption(false)} 
						style={{marginBottom:"10%",...ButtonCSS}}>
						Back
					</div>
					{postCaptionAndDescription(headlineText,secondaryText)}
				</React.Fragment>:
				<React.Fragment>
					{displayPollingOptions==false?
						<Comments
							postId={_id}
							postType={postType}
							hideComments={hideComments}
							targetDom={targetDom}
							isGuestProfile={isGuestProfile}
							ownerId={ownerId}
							selectedCommentPools={selectedCommentPools}
							isOwnProfile={isOwnProfile}
						/>:
						<PollingOptionsContainer>
							<p id="backButton" onClick={()=>triggerDisplayPostDescriptionAndCaption(false)}
								style={ButtonCSS}>
								Back
							</p>

							<p style={{fontSize:"18px"}}>
								Create a comment about why you think this post is authentic or.... tell everyone 
								why you think this post is fake
							</p>
							<hr style={HorizontalLineCSS}/>

							<div style={{display:"flex",flexDirection:"row"}}>
								<p onClick={()=>displayPollingOptionsTrigger(true)} style={PollingOptionsCSS}>
									Approve Post
								</p>

								<div style={VerticalLineCSS}/>

								<p onClick={()=>displayPollingOptionsTrigger(false)} style={PollingOptionsCSS}>
									Disapprove Post
								</p>
							</div>

						</PollingOptionsContainer>
					}
				</React.Fragment>
			}
		</Container>
	)
}

export default CommentsAndAuthenticReplies;