import React from "react";
import styled from "styled-components"
import ImageOrVideoContainer from "../../../../GeneralComponents/PostComponent/ImageAndVideoDisplay/PostContainer.js";
import RegularPostContainer from "../../../../GeneralComponents/PostComponent/RegularPostComponent/RegularPostDisplay/RegularPostContainer.js";
 
import {
	ImagePopupContainer,
	PostPopupContainer
} from "../PersonalProfileContainerCSS.js";

const PostDisplayDecider=({postData,postDisplayParams})=>{
	const {selectedDisplayPostType}=postData;
	const postDecider=()=>{
		switch(selectedDisplayPostType){
			case 'Images':{
				return <ImagePopupContainer>
							<ImageOrVideoContainer
								imageData={postData}
								{...postDisplayParams}
							/>
						</ImagePopupContainer>
			};
			case 'Videos':{
				return <PostPopupContainer>
					<ImageOrVideoContainer
						videoData={postData}
						{...postDisplayParams}
					/>
				</PostPopupContainer>
			};
			case 'Regular':{
				return <PostPopupContainer>
					<RegularPostContainer
						postData={postData}
						{...postDisplayParams}
					/>
				</PostPopupContainer>
			};
		}
	}
	return(
		<React.Fragment>
			{postDecider()}	
		</React.Fragment>
	)
}

export default PostDisplayDecider;