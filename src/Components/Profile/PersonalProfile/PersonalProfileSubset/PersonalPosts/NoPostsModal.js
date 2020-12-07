import React,{useState,useEffect,useContext} from "react";
import styled from "styled-components";
import {PostContext} from "./PostsContext.js";
import {UserContext} from "../../UserContext.js";
import {CompanyPostsContext} from "../../../CompanyProfile/CompanyPostsContext.js";
import {CompanyContext} from "../../../CompanyProfile/CompanyContext.js";
import SympociaIcon from "../../../../../designs/img/SympociaIcon.jpg";
import {useSelector} from "react-redux";
import {
		getImagesPosts,
		getVideosPosts,
		getBlogPosts
} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageGetRequests.js";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const SympociaStampIconContainer=styled.div`
	position:relative;
	border-radius:50%;
	width:65%;
	height:40%;
	background-color:red;
`;

const CreatePostContainer=styled.div`
	position:relative;
	padding:15px;
	width:500px;
	border-radius:5px;
	transition:.8s;
	box-shadow:1px 1px 5px #9395a0;
	padding-top:20px;
	height:60%;

	&:hover{
		box-shadow:5px 5px 5px 5px #9395a0;
	}
`;

const RecommendedContainer=styled.div`
	position:relative;
	padding:15px;
	border-radius:5px;
	transition:.8s;

	&:hover{
		box-shadow:1px 1px 5px #9395a0;
	}
`;


const RecommendedImage=styled.div`
	 position:relative;
	 width:150px;
	 height:120px;
	 border-radius:5px;
	 background-color:red;
`;

const RecommnededBlogImage=styled.div`
	position:relative;
	 width:350px;
	 height:200px;
	 border-radius:5px;
	 background-color:red;

`;

const RecommnededVideo=styled.div`
	 position:relative;
	 width:350px;
	 height:200px;
	 border-radius:5px;
	 background-color:red;
`;

const IndustryButtonCSS={
	listStyle:"none",
	display:"inline-block",
	padding:"10px",
	color:"white",
	backgroundColor:"#5298F8",
	borderRadius:"5px",
	padding:"5px"
}

const RecommendedImageCSS={
	 position:"relative",
	 width:"150px",
	 height:"120px",
	 borderRadius:"5px",
	 backgroundColor:"red"
}

const RecommendedVideoCSS={
	 position:"relative",
	 width:"350px",
	 height:"200px",
	 borderRadius:"5px"
}

const RecommendedBlogCSS={
	position:"relative",
	width:"350px",
	height:"250px",
	borderRadius:"5px",
	backgroundColor:"red"
}

const BlogCreationButton=styled(Link)`
	position:relative;

`;

const NoPostsModal=(props)=>{
	const [recommendedPosts,changeRecommendedPosts]=useState([]);
	const postContext=useContext(PostContext);
	const profileContext=useContext(UserContext);

	const createPostModal=()=>{
		console.log(props);
		if(props!=null){
			var displayCreatePostIndicator;
			if(props.profilePageType=="Company"){
				displayCreatePostIndicator=profileContext.state.isOwnProfile;
			}else{
				displayCreatePostIndicator=profileContext.isOwnProfile
			}
			return	<React.Fragment>
						{displayCreatePostIndicator==true?
							 <li style={{marginRight:"5%",listStyle:"none",display:"inline-block"}}>
									<CreatePostContainer id="createPostContainer">
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",marginLeft:"20%",marginBottom:"2%"}}>
												<SympociaStampIconContainer>
													<img position="relative" src={SympociaIcon} width="100%" height="100%"/>
												</SympociaStampIconContainer>
											</li>
											<p style={{fontSize:"20px",marginLeft:"10%"}}><b>Upload a {props.postType} of your own to get started</b></p>
											<p>Show people your story through {props.postType}s and start sharing your story to others </p>

											<a href="javascript:void(0);" style={{textDecoration:"none",color:"white"}}>
												<li onClick={()=>postContext.updatePostComponent(props.postType)}style={{marginLeft:"33%",listStyle:"none",display:"inline-block",padding:"5px",color:"white",backgroundColor:"#C8B0F4",borderRadius:"5px",padding:"10px",fontSize:"15px"}}>
													{props.postType=="blog"?
														<BlogCreationButton style={{textDecoration:"none",color:"white"}} to={{pathname:`/blog/${props._id}`,state:{postType:"Creation"}}}>
															<p>
																Upload a {props.postType}
															</p>
														</BlogCreationButton>
														:
														<p> Upload a {props.postType} </p>
													}
												</li>
											</a>
											</ul>
									</CreatePostContainer>
									<hr/>
								</li>:null
						}
					</React.Fragment>
				}
	}

	return(
			<React.Fragment>
				<p>Currently there are no posts available here</p>
				{createPostModal()}
			</React.Fragment>
	)
}

const mapStateToProps=state=>{
	return {
		_id:state.personalInformation.id
	}
}

export default connect(
	mapStateToProps,
	null
)(NoPostsModal);