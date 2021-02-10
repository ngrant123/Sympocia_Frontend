import React,{useState} from "react";
import styled from "styled-components";
import PersonalIndustry from "../../../../../Constants/personalIndustryConstants.js";
import CompanyIndustry from "../../../../../Constants/industryConstants.js";
import {useSelector} from "react-redux";
import {DisplayRecruitButton} from "./ImagePostsModal.js";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import COMPANY_INDUSTRIES from "../../../../../Constants/industryConstants.js";
import RegularPostDisplayPortal from "../../../HomePageSet/RegularPostHomeDisplayPortal.js";
import {Link} from "react-router-dom";
import {
	ConstructSuggestedSymposium,
	displayPersonalIndustryFeed
} from "./ConstructSuggestedSymposium.js";


const Container=styled.div`
	display:flex;
	top:5%;
	flex-direction:row;

	@media screen and (max-width:740px) and (max-height:420px){
    	#headerLI{
			height:180% !important;
		}
		#headerPostLI{
			height:95% !important;
		}
    }


	@media screen and (max-width:1370px){
		flex-direction:column;
		width:110%;
		margin-left:-5% !important;
		#headerLI{
			display:block !important;
			margin-top:0% !important;
			width:95% !important;
			margin-left:-7% !important;
			margin-bottom:2% !important;
		}
		#smallPostLI{
			width:95% !important;
			height:100% !important;
			margin-left:-10% !important;
			overflow-y:visible;
		}
		#post{
			width:120px !important;
			height:120px !important;
			margin-right:2%;
		}
		#suggestedSymposiumLI{
			top:-15% !important;
		}
		#postLI{
			margin-right:2% !important;
		}
	}
	@media screen and (max-width:450px){
		margin-left:-5% !important;
		#headerLI{
			margin-top:-50% !important;
			margin-bottom:20% !important;
		}
	}
`;

const HeaderContainer=styled.div`
	display:flex;
	flex-direction:column;
	width:50%;

	@media screen and (max-width:1370px){
		width:90%;
		overflow-y:scroll;
	}

	@media screen and (max-width:700px){
		margin-top:-150px !important;
		height:300px;

		#headerOwnerNameLI{
			max-width:100% !important;
		}
		#headerPostTextOrAudioContainerLI{
			top:20px !important;
		}
	}

	@media screen and (max-width:740px) and (max-height:420px) and (orientation: landscape) {
    	margin-top:45px !important;
    }
`;


const PostsContainer=styled.div`
	display:flex;
	flex-direction:column;
	width:50%;
	height:600px;
	overflow-y:scroll;
	margin-left:2%;

	@media screen and (max-width:1370px){
		width:90%;
		margin-left:0%;
		margin-top:5%;
		height:100%;
		overflow:visible !important;
	}
`;

const Post=styled.div`
	display:flex;
	flex-direction:column;
`;

const ProfileHeaderImage=styled.div`
	position:relative;
	width:20%;
	height:20%;
	border-radius:5px;
	background-color:red;
	border-radius:50%;
`;

const ImagesContainer=styled.div`
	position:relative;
	width:320px;
	height:230px;
	border-radius:5px;
	background-color:red;
`;

const ProfilePicture=styled.div`
	position:relative;
	width:50px;
	height:50px;
	background-color:red;
	border-radius:50%;
`;


const ProfilePictureLink=styled(Link)`
	position:relative;
`;


const RegularPostLabelCSS={
	listStyle:"none",
	display:"inline-block",
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	padding:"5px",
	borderRadius:"5px",
	marginRight:"2%"
}

const BorderCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#D8D8D8",
	padding:"10px"
}

const NextButtonCSS={
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	color:"#3898ec",
	height:"70px",
	width:"30%",
	padding:"10px",
	borderRadius:"5px",
	cursor:"pointer"
}

const RegularPostModal=(props)=>{
	
	console.log(props);
	const headerRegularPost=props.posts[0];
	const regularPosts=props.posts.slice(1,props.posts.length);
	const personalInformationRedux=useSelector(state=>state.personalInformation);

	const [displayRegualrPostDisplayPortal,changeRegularPostDisplay]=useState(false);
	const [selectedRegularPost,changeSelectedRegularPost]=useState();
	const [displayRecommendedPosts,changeRecommendedPosts]=useState();

	const closeModal=()=>{
		changeRegularPostDisplay(false)
	}

	const handleDisplayHeaderPost=()=>{
		changeSelectedRegularPost(headerRegularPost);
		changeRecommendedPosts(regularPosts);
		changeRegularPostDisplay(true);
	}

	const displayPostModal=(data)=>{
		changeSelectedRegularPost(data);
		changeRecommendedPosts(regularPosts);
		changeRegularPostDisplay(true);
	}
	const detectEndOfPostContainer=(divElement)=>{
		if(	divElement.scrollHeight - divElement.scrollTop - divElement.clientHeight < 1
			 && props.endOfPostsDBIndicator==false && props.isLoadingReloadedPosts==false){
			props.triggerReloadingPostsHandle();
		}
	}

	return(
		<Container>
			{headerRegularPost!=null?
				<>
					<HeaderContainer onClick={()=>handleDisplayHeaderPost()} style={BorderCSS}>
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<li style={{position:"relative",display:"inline-block",listStyle:"none",width:"20%",borderRadius:"5px"}}>
								<ProfilePictureLink to={{pathname:`/profile/${headerRegularPost.owner._id}`}}>
									<img src={headerRegularPost.owner.profilePicture!=null?
											  headerRegularPost.owner.profilePicture:
											  NoProfilePicture} 
									style={{height:"50px",width:"60px",borderRadius:"50%"}}/>
								</ProfilePictureLink>
							</li>
						</a>

						<li id="headerPostTextOrAudioContainerLI" style={{position:"relative",top:"70px",listStyle:"none",display:"inline-block",width:"70%",overflow:"hidden",marginLeft:"5%"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",marginBottom:"2%"}}>
									<ul style={{padding:"0px"}}>
										<li id="headerOwnerNameLI" style={{display:"inline-block",fontSize:"20px",maxWidth:"60%",maxHeight:"50px",overflow:"hidden",marginRight:"5%"}}>
											<b>{headerRegularPost.owner.firstName}</b>
										</li>

										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li  onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,null,headerRegularPost.industriesUploaded,props)} style={RegularPostLabelCSS}>
												{headerRegularPost.industriesUploaded[0].industry}
											</li>
										</a>
										{props.isGuestProfileIndicator==false &&(
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li style={{display:"inline-block",listStyle:"none"}}>
													<DisplayRecruitButton
														post={headerRegularPost}
														previousProps={props}
													/>
												</li>
											</a>
										)}
									</ul>
								</li>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li id="headerPostLI" style={{listStyle:"none",height:"30%",display:"inline-block",fontSize:"20px"}}>
											{headerRegularPost.isAudioPost==true?
												<audio controls>
												 	<source src={headerRegularPost.post} type="audio/ogg"/>
												  	<source src={headerRegularPost.post} type="audio/mpeg"/>
													Your browser does not support the audio element.
												</audio>
												:
												<>{headerRegularPost.post}</>
											}
									</li>
								</a>
							</ul>
						</li>
					</HeaderContainer>

					<PostsContainer style={BorderCSS}>
						<ul style={{padding:"0px"}}>
							{regularPosts.map(data=>
								<React.Fragment>
									{data=="suggestedSymposium"?
										<ConstructSuggestedSymposium
											personalInformation={personalInformationRedux}
											previousProps={props}
										/>
										:
										<Post onClick={()=>displayPostModal(data)}>
											<li style={{listStyle:"none"}}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block"}}>
														<ProfilePictureLink to={{pathname:`/profile/${data.owner._id}`}}>
															<img src={data.owner.profilePicture!=null?
																	data.owner.profilePicture:
																	NoProfilePicture} 
															style={{height:"50px",width:"50px",borderRadius:"50%"}}/>
														</ProfilePictureLink>
													</li>
													<li style={{display:"inline-block",fontSize:"20px",maxWidth:"60%",maxHeight:"50px",overflow:"hidden",marginRight:"5%"}}>
														<b>{data.owner.firstName}</b>
													</li>
												</ul>
											</li>
											<p>
												<b> 
													{data.isAudioPost==true?
														<audio controls>
														 	<source src={data.post} type="audio/ogg"/>
														  	<source src={data.post} type="audio/mpeg"/>
															Your browser does not support the audio element.
														</audio>
														:
														<>{data.post}</>
													}
												 </b>

											</p>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,null,data.industriesUploaded,props)} style={RegularPostLabelCSS}>
													{data.industriesUploaded[0].industry}
												</li>
											</a>
											{/*
												<DisplayRecruitButton
													post={data}
													previousProps={props}
												/>
											*/}
										</Post>
									}
									<hr/>
								</React.Fragment>
							)}	
						{props.endOfPostsDBIndicator==false && (
							<React.Fragment>
								{props.isLoadingReloadedPosts==true?
									<p>Loading please wait...</p>:
									<p onClick={()=>props.triggerReloadingPostsHandle("RegularPosts")} style={NextButtonCSS}>
										Next
									</p>
								}
							</React.Fragment>
						)}
						</ul>
					</PostsContainer>
				</>:
				<p> No posts yet </p>
			}
			{displayRegualrPostDisplayPortal==false?
				null:
				<RegularPostDisplayPortal
					closeModal={closeModal}
					selectedPost={selectedRegularPost}
					recommendedPosts={displayRecommendedPosts}
					targetDom={props.targetDom}
				/>
			}
		</Container>
	)
}

export default RegularPostModal;