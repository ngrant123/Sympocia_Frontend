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
	flex-wrap:wrap;
	overflow:scroll;
	width:100%;
	height:600px;
	@media screen and (max-width:1370px){
		flex-direction:column;
		overflow:visible;
		flex-wrap:nowrap;
	}
	@media screen and (max-width:650px){
		margin-left:-10%;
		padding-bottom:10px;
		margin-top:-40%;
		#headerImageLI{
			width:220px !important;
			height:180px !important;
		}
		#headerAudioLI{
			width:200px !important;
		}
		#image{
			width:100px !important;
			height:100px !important;
			margin-bottom:10%;
		}
		#smallPersonalInformation{
			display:none !important;
		}
		#descriptionLI{
			display:none !important;
		}
		#postLI{
			top:-80px;
			margin-bottom:20% !important;
		}
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	top:10px;
    	margin-top:0%;
    }
`;


const PostsContainer=styled.div`
	display:flex;
	flex-direction:column;
	height:350px;
	flex-shrink: 0;

	width:30%;
	background-color:red;
	cursor:pointer;
	overflow:hidden;
	border-radius:5px;
	background-color:white;
	margin-right:2%;
	margin-bottom:2%;
	@media screen and (max-width:1370px){
		width:90%;
	}

	@media screen and (max-width:650px){
		width:100%;
		height:300px;
		#headerOwnerNameLI{
			max-width:100% !important;
			margin-left:20% !important;
		}
		#headerPostTextOrAudioContainerLI{
			top:20px !important;
			width:100% !important;
		}
		#audio{
			width:190px;
		}
	}
	@media screen and (max-width:740px) and (max-height:420px) and (orientation: landscape) {
    	margin-top:45px !important;
    }
`;


const Post=styled.div`
	display:flex;
	flex-direction:column;
	cursor:pointer;
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


const PostUserInformation=styled.div`
	display:flex;
	flex-direction:row;
	padding:10px;
	margin-right:10%;
	@media screen and (max-width:1370px){
		margin-left:0% !important;
	}
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
	const regularPosts=props.posts;
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
			{regularPosts.map(data=>
				<React.Fragment>
					{data=="suggestedSymposium"?
						<ConstructSuggestedSymposium
							personalInformation={personalInformationRedux}
							previousProps={props}
						/>:
						<PostsContainer onClick={()=>displayPostModal(data)} style={BorderCSS}>
							<PostUserInformation>
								<ProfilePictureLink to={{pathname:`/profile/${data.owner._id}`}}
									style={{position:"relative",display:"inline-block",listStyle:"none",width:"20%",borderRadius:"5px"}}>
									<img src={data.owner.profilePicture!=null?
											  data.owner.profilePicture:
											  NoProfilePicture} 
									style={{height:"50px",width:"60px",borderRadius:"50%"}}/>
								</ProfilePictureLink>
								<p id="headerOwnerNameLI" style={{display:"inline-block",fontSize:"20px",maxWidth:"60%",maxHeight:"50px",overflow:"hidden",marginLeft:"5%"}}>
									<b>{data.owner.firstName}</b>
								</p>
							</PostUserInformation>

							<p id="headerPostTextOrAudioContainerLI" style={{padding:"5px",fontSize:"20px",position:"relative",top:"70px",listStyle:"none",display:"inline-block",width:"100%",overflow:"hidden",marginLeft:"5%"}}>
								{data.isAudioPost==true?
									<audio id="audio" controls>
									 	<source src={data.post} type="audio/ogg"/>
									  	<source src={data.post} type="audio/mp4"/>
										Your browser does not support the audio element.
									</audio>
									:
									<>{data.post}</>
								}
							</p>
						</PostsContainer>
					}
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