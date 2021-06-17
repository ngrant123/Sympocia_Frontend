import React,{useState} from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import RegularPostDisplayPortal from "../../ExplorePageSet/RegularPostHomeDisplayPortal.js";
import {Link} from "react-router-dom";
import {
	ConstructSuggestedSymposium
} from "./ConstructSuggestedSymposium.js";
import ExplorePageRegularPost from "../../../GeneralComponents/PostComponent/RegularPostComponent/SymposiumAndExplorePageRegularPost.js";


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
		margin-top:5%;
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
		margin-top:5%;
	}

	@media screen and (max-width:650px){
		width:100%;
		height:200px;
		margin-bottom:5%;
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
	color:"#3898ec",
	height:"70px",
	width:"30%",
	padding:"10px",
	borderRadius:"5px",
	cursor:"pointer"
}

const RegularPostModal=(props)=>{
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
							currentHeight={"30%"}
						/>:
						<PostsContainer style={BorderCSS}>
							<ExplorePageRegularPost
								regularPostInformation={data}
								targetDom={props.targetDom}
							/>
						</PostsContainer>
					}
				</React.Fragment>
			)}
			{props.endOfPostsDBIndicator==false && (
				<React.Fragment>
					{props.isLoadingReloadedPosts==true?
						<p>Loading please wait...</p>:
						<p onClick={()=>props.triggerReloadingPostsHandle("RegularPosts")} style={{...NextButtonCSS,marginLeft:"2%",marginTop:"20%"}}>
							Next
						</p>
					}
				</React.Fragment>
			)}
		</Container>
	)
}

export default RegularPostModal;