import React from "react";
import styled from "styled-components"
import ImageOrVideoContainer from "../../../../GeneralComponents/PostComponent/ImageAndVideoDisplay/PostContainer.js";
import RegularPostContainer from "../../../../GeneralComponents/PostComponent/RegularPostComponent/RegularPostDisplay/RegularPostContainer.js";
import BlogHomeDisplayPortal from "../../../../ExplorePage/ExplorePageSet/Modals-Portals/BlogHomeDisplayPortal.js";
import {ImageDisplayContainer} from "../../../../GeneralComponents/PostComponent/ImageComponent/indexCSS.js";
import {VideoDisplayContainer} from "../../../../GeneralComponents/PostComponent/VideoComponent/indexCSS.js";
import {RegularPostDisplayContainer} from "../../../../GeneralComponents/PostComponent/RegularPostComponent/indexCSS.js";


const PostDisplayDecider=({postData,postDisplayParams})=>{
	const {selectedDisplayPostType}=postData;
	const postDecider=()=>{
		switch(selectedDisplayPostType){
			case 'Images':{
				return <ImageDisplayContainer>
							<ImageOrVideoContainer
								imageData={postData}
								{...postDisplayParams}
							/>
						</ImageDisplayContainer>
			};
			case 'Videos':{
				return <VideoDisplayContainer>
							<ImageOrVideoContainer
								videoData={postData}
								{...postDisplayParams}
							/>
						</VideoDisplayContainer>
			};
			case 'Regular':{
				return <RegularPostDisplayContainer>
							<RegularPostContainer
								postData={postData}
								{...postDisplayParams}
							/>
						</RegularPostDisplayContainer>
			};

			case 'Blogs':{
				return <BlogHomeDisplayPortal
							selectedBlog={postData}
							recommendedBlogs={[]}
							{...postDisplayParams}
						/>
			}
		}
	}
	return(
		<React.Fragment>
			{postDecider()}	
		</React.Fragment>
	)
}

export default PostDisplayDecider;