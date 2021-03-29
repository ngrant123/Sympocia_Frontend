import React,{useState,useEffect,useContext} from "react";
import styled from "styled-components";
import {PostContext} from "./PostsContext.js";
import {UserContext} from "../../UserContext.js";
import {CompanyPostsContext} from "../../../CompanyProfile/CompanyPostsContext.js";
import {CompanyContext} from "../../../CompanyProfile/CompanyContext.js";
import SympociaIcon from "../../../../../designs/img/SympociaIcon.jpg";
import {useSelector} from "react-redux";

import {connect} from "react-redux";
import GuestLockScreenHOC from "../../../../GeneralComponents/PostComponent/GuestLockScreenHOC.js";
import {Link} from "react-router-dom";

const Container=styled.div`
	@media screen and (max-width:740px) and (max-height:420px) and (orientation:landscape){
		margin-left:10% !important;
    }
`;

const SympociaStampIconContainer=styled.div`
	position:relative;
	border-radius:50%;
	width:65%;
	height:40%;

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		height:100%;
		width:60%;
    }
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
    @media screen and (max-width:1370px) and (max-height:600px) and (orientation: landscape) {
		box-shadow:none;
		&:hover{
			box-shadow:none;
		}
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

	const uploadButtonComponent=()=>{
		return <a href="javascript:void(0);" style={{textDecoration:"none",color:"white"}}>
				<li onClick={()=>postContext.updatePostComponent(props.postType)}style={{listStyle:"none",display:"inline-block",padding:"5px",color:"white",backgroundColor:"#C8B0F4",borderRadius:"5px",padding:"10px",fontSize:"15px"}}>
					{props.postType=="blog"?
						<BlogCreationButton style={{textDecoration:"none",color:"white"}} to={{pathname:`/createBlog`,state:{postType:"Creation"}}}>
							<p>
								Upload a {props.postType}
							</p>
						</BlogCreationButton>
						:
						<p> Upload a {props.postType} </p>
					}
				</li>
			</a>
	}
	const createPostModal=()=>{
		if(props!=null){
			var displayCreatePostIndicator;
			if(props.profilePageType=="Company"){
				displayCreatePostIndicator=profileContext.state.isOwnProfile;
			}else{
				displayCreatePostIndicator=profileContext.isOwnProfile
			}
			return	<React.Fragment>
						{displayCreatePostIndicator==true && props.isSearchFilterActivated==false?
							 <li style={{marginRight:"5%",listStyle:"none",display:"inline-block"}}>
									<CreatePostContainer id="createPostContainer">
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",marginLeft:"20%",marginBottom:"2%"}}>
												<SympociaStampIconContainer>
													<img position="relative" src={SympociaIcon} width="100%" height="100%"/>
												</SympociaStampIconContainer>
											</li>
											<p style={{fontSize:"20px"}}><b>Upload a {props.postType} of your own to get started</b></p>
											<p>Show people your story through {props.postType}s and start sharing your story to others </p>

											{profileContext.isGuestProfile==true? 
												<GuestLockScreenHOC
													component={uploadButtonComponent()}
												/>
												:<>{uploadButtonComponent()}</>
											}
											</ul>
									</CreatePostContainer>
									<hr/>
								</li>:null
						}
					</React.Fragment>
				}
	}

	return(
			<Container>
				<p>Currently there are no posts available here</p>
				{createPostModal()}
			</Container>
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