import React,{useContext,useMemo} from "react";
import styled from "styled-components";
import {getBlogFromUser} from "../../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {getCompanyBlogs} from "../../../../../../Actions/Requests/CompanyPageAxiosRequests/CompanyPageGetRequests.js";
import NoPostsModal from "../NoPostsModal.js";
import {UserConsumer,UserContext} from "../../../UserContext.js";
import {Link} from "react-router-dom";
import {PostConsumer,PostContext} from "../PostsContext.js";
import Typed from "react-typed";
import {refreshTokenApiCallHandle} from "../../../../../../Actions/Tasks/index.js";
import {
	setPersonalProfileAccessToken,
	setPersonalProfileRefreshToken
} from "../../../../../../Actions/Redux/Actions/PersonalProfile.js"; 
import {connect} from "react-redux";
import CrownedBlogContainer from "./CrownedBlogContainer.js";
import SmallBlogContainer from "./SmallBlogContainer.js";
import NextButton from "../NextButton.js";
import {PostDisplayContext} from "../../../PostDisplayModalContext.js";

const Container=styled.div`
	position:absolute;
	width:95%;
	height:95%;

	padding:10px;
	padding-right:10px;
	#nextButton{
		margin-top:10% !important;
	}

	@media screen and (max-width:1370px){
		width:130% !important;
	}

	@media screen and (max-width:550px){
		margin-left:15% !important;
		#smallPostsContainer{
			flex-direction:column !important;
		}
	}

	@media screen and (max-width:340px){
		margin-left:1% !important;
	}

	@media screen and (min-width:400px) and (max-width:650px) 
	    and (min-height:740px) and (max-height:850px){
		margin-left:15% !important;
	}


	@media screen and (min-width:400px) and (max-width:650px) 
	    and (min-height:1000px) and (max-height:1370px){
	    #nextButton{
			margin-left:10% !important;
		}
	}

	@media screen and (min-width:620px) and (max-width:650px) 
	    and (min-height:1300px) and (max-height:1370px){
	   	margin-left:30% !important;
	    #nextButton{
			margin-left:15% !important;
		}
	}

	@media screen and (min-width:400px) and (max-width:450px) 
	    and (min-height:1000px) and (max-height:1100px){
	   	margin-left:3% !important;
	}

	@media screen and (min-width:500px) and (max-width:670px) 
	    and (min-height:1100px) and (max-height:1370px){
	   	margin-left:3% !important;
	    margin-top:5%;
	}

	@media screen and (min-width:500px) and (max-width:570px) 
	    and (min-height:800px) and (max-height:860px){
	   	margin-left:25% !important;
	}


	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		#nextButton{
			margin-top:20% !important;
		}
    }
	@media screen and (min-width:500px) and (max-width:570px) 
	    and (min-height:700px) and (max-height:800px){
	    margin-top:5%;
	}
`;



const NextPostLabelCSS={
	listStyle:"none",
	  display:"inline-block",
	  backgroundColor:"white",
	  borderRadius:"5px",
	  padding:"10px",
	  color:"#3898ec",
	  borderStyle:"solid",
	  borderWidth:"2px",
	  borderColor:"#3898ec",
	  maxWidth:"30%",
	  maxHeight:"50px",
	  overflow:"hidden",
	  cursor:"pointer"
}

const BlogsPostsContainer=(props)=>{
	const PostContextValues=useContext(PostContext);
	const UserContextValues=useContext(UserContext);
	const PostDisplay=useContext(PostDisplayContext);

	console.log(PostContextValues);

	const displayPostModal=(data)=>{
		debugger;
		if(UserContextValues.isOwnProfile){
			const {isPhoneUIEnabled}=props;
			if(isPhoneUIEnabled){
				alert('Unfortunately, editing blog posts is not allowed on mobile. You can check out comments and everything now though');
			}
			PostContextValues.history.push({
				pathname:UserContextValues.isOwnProfile==true?`/createBlog`:`/blog/${data._id}`,
				state:{
						...data,
						profileType:props.profileType,
						friendsNodes:props.friendsNodes
				}
			});
		}else{
			PostDisplay.handleBlogPostModal(data,PostContextValues);
		}
	}

	const blogPostsRender=useMemo(()=>{
		return(
			<React.Fragment>
				{props.isLoadingIndicatorBlogPost==true?<p>Currently loading blog posts</p>:
					<React.Fragment>
						{props.blogData.blogs.length==0 && props.blogData.headerBlog==null?
							<NoPostsModal
								id="noPostsModalContainer"
								postType={"blog"}
								profilePageType={props.profile}
								isSearchFilterActivated={PostContextValues.isSearchFilterActivated}
							/>:
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none"}}>
									{props.blogData.headerBlog==null?<React.Fragment></React.Fragment>:
										<React.Fragment>
											<CrownedBlogContainer
												headerBlog={props.blogData.headerBlog}
												isOwnProfile={UserContextValues.isOwnProfile}
												profileType={props.profileType}
												friendsColorNodesMap={props.friendsColorNodesMap}
												friendsNodes={props.friendsNodes}
												displayPostModal={displayPostModal}
											/>
											<hr/>
										</React.Fragment>
									}
								</li>

								<li style={{listStyle:"none",marginTop:"5%"}}>	
									<div id="smallPostsContainer" style={{flexWrap:"wrap",display:"flex",flexDirection:"row"}}>
										{props.blogData.blogs.map(data=>
											<SmallBlogContainer
												data={data}
												isOwnProfile={UserContextValues.isOwnProfile}
												profileType={props.profileType}
												friendsColorNodesMap={props.friendsColorNodesMap}
												friendsNodes={props.friendsNodes}
												displayPostModal={displayPostModal}
											/>
										)}
									</div>
									<NextButton/>
								</li>
							</ul>
						}
					</React.Fragment>
				}
			</React.Fragment>
		)
	},[
		props.blogData,
		props.isLoadingIndicatorBlogPost
	])

	return(
		<Container>
			{blogPostsRender}	
		</Container>
	)
}

export default BlogsPostsContainer;



