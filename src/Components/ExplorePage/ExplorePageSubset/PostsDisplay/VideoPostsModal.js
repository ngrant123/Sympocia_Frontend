import React,{useState,useMemo} from "react";
import styled from "styled-components";
import VideoPostDisplayPortal from "../../ExplorePageSet/VideoHomeDisplayPortal.js";
import {useSelector} from "react-redux";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import {Link} from "react-router-dom";
import {
	ConstructSuggestedSymposium
} from "./ConstructSuggestedSymposium.js";
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {HeaderOwnerAndSymposiumInformation} from "./PostDisplayGeneralComp.js";

const Container=styled.div`
	display:flex;
	top:5%;
	flex-direction:row;

	@media screen and (max-width:1370px){
		width:100%;
		flex-direction:column;
		margin-left:-5% !important;

		#symposiumText{
			display:none !important;
		}
		#headerVideoLI{
			height:600px !important;
			width:750px !important;
		}
		#smallPostLI{
			width:95% !important;
			margin-left:-5% !important;
		}
		#horizontalSeperator{
			display:block !important;
		}
	}

	@media screen and (max-width:650px){
		#headerAudio{
			height:20px !important;
		}
		
		#headerVideoLI{
			height:200px !important;
			width:300px !important;
		}
	}
	@media screen and (max-width:450px){
		margin-left:-5% !important;
	}
`;

const HeaderVideo=styled.div`
	width:120%;
	height:80%;
	border-radius:5px;
	background-color:red;
	border-radius:5px;
`;

const VideosContainer=styled.div`
	position:relative;
	width:580px;
	height:290px;
	border-radius:5px;
	background-color:red;
`;

const ShadowContainer= styled.div`
	position:absolute;
	width:580px;
	height:290px;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;
	z-index:1;
	transition:.8s;
	border-radius:5px;

	&:hover{
		background-color:transparent
	}
	@media screen and (max-width:1300px){
		width:330px !important;
			height:370px !important;
	}
	@media screen and (max-width:450px){
					width:230px !important;
			height:160px !important;
	}
`;



const ProfilePictureLink=styled(Link)`
	position:relative;
	margin-bottom:1%;
`;


const VideoDesriptionContainer=styled.div`
	position:relative;
	width:60px;
	height:60px;
	border-radius:50%;
	top:70%;
	left:2%;
	z-index:8;
`;

const HeaderContainer=styled.div`
	display:flex;
	width:60%;
	flex-direction:column;

	@media screen and (max-width:1370px){
		margin-top:30px !important;
		width:90%;
		#headerPostProfilePictureLIInformation{
			top:60% !important;
		}
		#videoDescriptionContainer{
			top:25% !important;
			left:0% !important;
		}
	}


	@media screen and (max-width:650px){
		#headerPostProfilePictureLIInformation{
			top:-30% !important;
		}
		#videoDescriptionContainer{
			top:80% !important;
			left:0% !important;
			width:50px !important;
			height:20% !important;
		}
	}


	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	margin-top:60px !important;
    	#headerPostProfilePictureLIInformation{
			top:160% !important;
		}
		#headerVideoLI{
			height:400px !important;
			width:500px !important;
		}
		#videoDescriptionContainer{
			top:20% !important;
			width:60px !important;
			height:15% !important;
		}
		#headerVideoContainer{
			position:relative !important;
		}
    }
`;

const HeaderDescriptionContainer=styled.div`
	display:flex;
	flex-direction:column;
	margin-top:1%;

	@media screen and (max-width:650px){
		#headerDescriptionParagraph{
			max-width:100% !important;
		}
		#heaerCaptionParagraph{
			width:100% !important;
		}
	}
`;

const HeaderTextsContainer=styled.div`
	display:flex;
	flex-direction:column;
	margin-left:2%;
`;

const SmallPostContainer=styled.div`
	display:flex;
	flex-direction:row; 
	width:80%;
	height:600px;
	margin-left:5%;
	overflow:scroll;
	flex-wrap:wrap;



	@media screen and (max-width:1370px){
		overflow:visible !important;
		width:100%;
		flex-direction:column;
		flex-wrap:nowrap;

		#video{
			width:100% !important;
			height:150px !important;
		}
	}

	@media screen and (max-width:650px){
		margin-top:10%;
		margin-left:0%;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	#video{
			width:450px !important;
		}
    }

`;

const HeaderOwnerInformation=styled.div`
	display:flex;
	flex-direction:row;

	@media screen and (max-width:1370px){
		#ownerInformationDiv{
			width:100% !important;
		}
	}
	@media screen and (max-width:650px){
		flex-direction:column;
		#headerOwnerName{
			font-size:15px !important;
			max-width:90% !important;
		}
	}
`;

const DescriptionContainer=styled.div`
	display:flex;
	flex-direction:row;
	width:100%;
`;

const PostContainer=styled.div`
	margin-bottom:8%;
	width:35%;
	margin-right:15%;

	@media screen and (max-width:1370px){
		margin-right:8%;
		width:90%;
		#smallVideoDescriptionContainer{
			margin-left:5%;
		}
	}

	@media screen and (max-width:650px){
		#smallVideoDescriptionContainer{
			width:100px !important;
			height:40% !important;
			margin-left:5%;
			top:25% !important;
			left:0% !important;
		}
	}
`;
const PostUserAndSymposiumInformation=styled.div`
	display:flex;
	flex-direction:row;
	margin-bottom:5%;
	@media screen and (max-width:1370px){
		flex-direction:row;
		#postOwner{
			font-size:15px !important;
			margin-right:2% !important;
		}
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    		flex-direction:row;
		#postOwner{
			font-size:15px !important;
			margin-right:2% !important;
		}
    }
`;

const HeaderArrowDownCSS={
	borderRadius:"50%",
	display:"flex",
	justifyContent:"center",
	padding:"5px",
	width:"30px",
	marginLeft:"40%",
	height:"25px",
	marginTop:"2%",
	boxShadow:"1px 1px 10px #707070"
}
const ImageLabelCSS={
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
	  cursor:"pointer",
	  width:"90%"
}

const NextButtonCSS={
	color:"#3898ec",
	height:"70px",
	width:"30%",
	padding:"10px",
	borderRadius:"5px",
	cursor:"pointer"
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	display:"none"
}

const SmallImageArrowDownCSS={
	borderRadius:"50%",
	display:"flex",
	justifyContent:"center",
	backgroundColor:"#7A7A7A",
	padding:"5px",
	width:"30px",
	height:"25px",
	marginTop:"15%",
	marginLeft:"15%"
}

const ProfileProfileCSS={
	height:"40px",
	width:"45px",
	borderRadius:"50%",
	borderStyle:"solid",
	borderColor:"white",
	borderWidth:"5px"
}

const PostsHorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}


const VideoPostModal=(props)=>{
	const headerVideo=props.posts[0];
	const videos=props.posts.slice(1,props.posts.length);
	const isMobileUI=props.isMobileUI;

	const personalInformationRedux=useSelector(state=>state.personalInformation);
	const companyInformationRedux=useSelector(state=>state.companyInformation);

	const [displayVideoDisplayPortal,changeVideoDisplay]=useState(false);
	const [selectedVideo,changeSelectedVideo]=useState();
	const [displayRecommendedVideos,changeRecommendedVideos]=useState();


	const closeModal=()=>{
		changeVideoDisplay(false)
	}

	const handleDisplayHeaderVideo=()=>{
		changeSelectedVideo(headerVideo);
		changeRecommendedVideos(videos);
		changeVideoDisplay(true);
	}

	const displayVideoModal=(data)=>{
		changeSelectedVideo(data);
		changeRecommendedVideos(videos);
		changeVideoDisplay(true);
	}

	const smallVideoComponent=(data)=>{
		return(
			<React.Fragment>
				{data.owner==null?
					<ConstructSuggestedSymposium
						personalInformation={personalInformationRedux}
						previousProps={props}
						currentHeight={"30%"}
					/>:
					<PostContainer>
						<div id="video" style={{height:"185px",width:"263px",position:"relative"}}>
							<video onClick={()=>displayVideoModal(data)} 
								style={{borderRadius:"5px",backgroundColor:"#151515",position:"absolute",cursor:"pointer"}}
								 position="relative" height="90%" width="100%" borderRadius="50%"
							 	key={data.videoUrl} autoPlay loop autoBuffer muted playsInline>
								<source src={data.videoUrl} type="video/mp4"/>
							</video>
							<div style={{position:"absolute",display:"flex",flexDirection:"column",top:"5%",left:"75%"}}>
								<ProfilePictureLink to={{pathname:`/profile/${data.owner._id}`}}>
									<img id="smallProfilePicture" src={data.owner.profilePicture==null?
											NoProfilePicture:data.owner.profilePicture}
										 	style={ProfileProfileCSS}
									/>
								</ProfilePictureLink>
								<div id="smallImageArrowDownCSS" style={SmallImageArrowDownCSS}>
									<KeyboardArrowDownIcon
										style={{color:"#FFFFFF"}}
									/>
								</div>
							</div>
						</div>
						<p style={{fontSize:"15px",maxWidth:"100%",maxHeight:"60px",overflow:"hidden"}}>
							<b>
								{data.title}
							</b>
						</p>
						{/*
							<div id="video" style={{height:"185px",width:"263px",position:"relative"}}>
								<video onClick={()=>displayVideoModal(data)} 
									style={{borderRadius:"5px",backgroundColor:"#151515",position:"absolute",cursor:"pointer"}}
									 position="relative" height="90%" width="100%" borderRadius="50%"
								 	key={data.videoUrl} autoPlay loop autoBuffer muted playsInline>
									<source src={data.videoUrl} type="video/mp4"/>
								</video>
								{data.videoDescription!=null &&(
									<video id="smallVideoDescriptionContainer" autoPlay loop autoBuffer muted playsInline 
										style={{position:"absolute",top:"50%",left:"5%"}} width="100px" height="40%">
										<source src={data.videoDescription} type="video/mp4"/>
									</video>
								)}
							</div>
							{data.audioDescription!=null &&(
									<li id="smallAudioDescription" style={{listStyle:"none"}}>
										<audio style={{width:"150px",height:"25px"}} controls muted>
										  	<source src={data.audioDescription} type="audio/ogg"/>
										  	<source src={data.audioDescription} type="audio/mp4"/>
											Your browser does not support the audio element.
										</audio>
									</li>
								)}
							<p style={{fontSize:"20px",maxWidth:"100%",maxHeight:"60px",overflow:"hidden"}}>
								<b>
									{data.title}
								</b>
							</p>
							<DescriptionContainer>
								<ProfilePictureLink to={{pathname:`/profile/${data.owner._id}`}}>
									<img src={data.owner.profilePicture==null?NoProfilePicture:data.owner.profilePicture}
										 style={{height:"30px",width:"35px",borderRadius:"50%"}}
									/>
								</ProfilePictureLink>
								<HeaderTextsContainer>
									<p style={{fontSize:"15px",width:"100%",maxWidth:"100%",height:"60px",overflow:"hidden"}}>
										{data.owner.firstName}
									</p>
								</HeaderTextsContainer>
							</DescriptionContainer>
						*/}
					</PostContainer>
				}
			</React.Fragment>
		)
	}

	const postDisplaySystem=()=>{
		debugger;
		const components=[];
		let counter=0;

		while(counter<videos.length){
			if(counter%2==0 && counter>0 && isMobileUI==false){
				const horizontalLine=<hr style={PostsHorizontalLineCSS}/>;
				components.push(horizontalLine);
			}
			const component=smallVideoComponent(videos[counter]);
			components.push(component)
			counter++;
		}
		return(
			<React.Fragment>
				{components.map(data=>
					<>{data}</>
				)}
			</React.Fragment>
		)
	}

	const posts=useMemo(()=>{
		return(
			<React.Fragment>
				{headerVideo==null?
					<p> No video posts yet </p>:
						<React.Fragment>
							<HeaderContainer>
								<HeaderOwnerAndSymposiumInformation
									headerPost={headerVideo}
								/>
								<div id="headerVideoLI" style={{height:"264px",width:"464px",position:"relative"}}>
									<video id="headerVideoContainer" style={{borderRadius:"5px",backgroundColor:"#151515",cursor:"pointer",position:"absolute"}} height="100%" width="90%" borderRadius="50%"
									 key={headerVideo.videoUrl} autoPlay loop autoBuffer muted playsInline onClick={()=>handleDisplayHeaderVideo()}>
										<source src={headerVideo.videoUrl} type="video/mp4"/>
									</video>
									{headerVideo.videoDescription!=null &&(
										<video id="videoDescriptionContainer" autoPlay loop autoBuffer muted playsInline 
											style={{position:"absolute",top:"72%",left:"0%",borderRadius:"50%",width:"90px",height:"80px",
													backgroundColor:"#151515",
													borderStyle:"solid",
													borderColor:"white",
													borderWidth:"5px"}} width="200px" height="60%">
											<source src={headerVideo.videoDescription} type="video/mp4"/>
										</video>
									)}
								</div>

								<HeaderDescriptionContainer>
									<p id="headerDescriptionParagraph" style={{fontSize:"20px",maxWidth:"70%",maxHeight:"60px",overflow:"hidden"}}>
										<b>
											{headerVideo.title}
										</b>
									</p>
									<p id="heaerCaptionParagraph" style={{width:"70%",maxHeight:"60px",overflow:"hidden"}}>
										{headerVideo.description}
									</p>
								</HeaderDescriptionContainer>
							</HeaderContainer>

							<hr id="horizontalSeperator" style={HorizontalLineCSS}/>

							<SmallPostContainer>
								{postDisplaySystem()}
								{props.endOfPostsDBIndicator==false && (
									<React.Fragment>
										{props.isLoadingReloadedPosts==true?
											<p>Loading please wait...</p>:
											<p onClick={()=>props.triggerReloadingPostsHandle("Videos")} style={NextButtonCSS}>
												Next 
											</p>
										}
									</React.Fragment>
								)}
							</SmallPostContainer>
						</React.Fragment>
				}
			</React.Fragment>
		)
	},[props.posts.length,props.isLoadingReloadedPosts,props.endOfPostsDBIndicator]);

	return(
	<Container>
		{posts}
		{displayVideoDisplayPortal==false?
			null:
			<VideoPostDisplayPortal
				closeModal={closeModal}
				selectedVideo={selectedVideo}
				recommendedVideos={displayRecommendedVideos}
				targetDom={props.targetDom}
			/>
		}
	</Container>
	)
}

export default VideoPostModal;