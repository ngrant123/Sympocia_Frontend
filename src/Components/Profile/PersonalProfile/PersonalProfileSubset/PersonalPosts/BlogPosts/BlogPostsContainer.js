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

const Container=styled.div`
	position:absolute;
	width:95%;
	height:125%;
	padding:10px;
	padding-right:10px;

	@media screen and (max-width:1370px){
		width:120% !important;
		#headerImageLI{
			display:block !important;
			#headerImage{
				width:350px !important;
				height:30% !important;
			}
		}
		#headerDescriptionLI{
			margin-left:10% !important;
			display:block !important;
			margin-top:10% !important;
			position:relative !important;
			margin-bottom:5% !important;
		}
		#smallBlogLI{
			width:25% !important;
			margin-right:20% !important;
		}
		#smallPostsContainerLI{
			width:120%;
		}
	}

	@media screen and (max-width:840px){

		#searchSymposiumPostLI{
			display:none;
		}
		#datePostedLI{
			display:none;
		}
		#symposiumsLI{
			display:none;
		}
		#headerImage{
			width:100% !important;
			height:150px !important;
		}

		#headerConstructedDateLI{
			display:none;
		}
		#headerAudioLI{
			width:150px !important;
		}

		#smallAudio{
			width:250px !important;
		}

		#smallBlogLI{
			margin-bottom:15% !important;
			margin-right:40% !important;
		}
    }
    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	margin-left:10% !important;
		#headerDescriptionLI{
			margin-left:10% !important;
		}
		#smallBlogLI{
			margin-bottom:40% !important;
		}
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

	const constructDate=(date)=>{
		var convertedDate=new Date(parseInt(date));
		var dateToString=convertedDate.toString();
		var current=new Date();

		//work on this a little more
		return dateToString;
	}

	const crownPostRender=useMemo(()=>{
		return(
			<CrownedBlogContainer
				headerBlog={props.blogData.headerBlog}
				isOwnProfile={UserContextValues.isOwnProfile}
				profileType={props.profileType}
			/>
		)
	},[props.blogData.headerBlog]);

	const blogPostRender=useMemo(()=>{
		return(
			<ul style={{padding:"0px"}}>
				{props.blogData.blogs.map(data=>
					<SmallBlogContainer
						data={data}
						isOwnProfile={UserContextValues.isOwnProfile}
						profileType={props.profileType}
					/>
				)}
			</ul>
		)
	},[props.blogData.blogs]);

	return(
		 <Container>
			{props.isLoadingIndicatorBlogPost==true?<p>Currently loading blog posts</p>:
				<React.Fragment>
					{props.blogData.blogs.length==0&&props.blogData.headerBlog==null?
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
									{crownPostRender}
									<hr/>
								</React.Fragment>
							}
						</li>

						<li id="smallPostsContainerLI" style={{listStyle:"none",marginTop:"5%"}}>	
								{blogPostRender}
								{PostContextValues.endOfPostsDBIndicator==false
								 && PostContextValues.isSearchFilterActivated==false 
								 && PostContextValues.isFilteredPostsActivated==false  && (
									<React.Fragment>
										{PostContextValues.isLoadingReloadedPosts==true?
											 <Typed 
							                    strings={['Loading...']} 
							                    typeSpeed={60} 
							                    backSpeed={30} 
					                		  />:
											<p onClick={()=>PostContextValues.fetchNextPosts()} style={NextPostLabelCSS}>
												Next
											</p>
										}
									</React.Fragment>
								)}
							</li>
						</ul>
					}	
				</React.Fragment>
			}
		</Container>
	)
}

export default BlogsPostsContainer;



