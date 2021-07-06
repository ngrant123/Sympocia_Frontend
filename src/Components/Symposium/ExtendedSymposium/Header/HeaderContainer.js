import React,{useState,useEffect} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {
		addSymposium,
		removeSymposium
} from "../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import HightLightedQuestions from "../Modals/HighLightedQuestions.js";
import {Link} from "react-router-dom";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MobilePostOptionsPortal from "../Modals/MobileUI/PostOptionsPortal.js";
import {useSelector,useDispatch} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../../Actions/Tasks/index.js";

import {
	SymposiumHeaderAnimation,
	Container
} from '../indexCSS.js';

const ActiveContainer =styled.div`
	position:relative;
	width:300px;
	height:50%;
	background-color:white;
	padding:5px;
	padding-top:10px;
	overflow:auto;
	-ms-overflow-style: none;  /* IE 10+ */
    scrollbar-width: none;
    border-radius:5px;

    border-style:solid;
	border-color:#E4E4E4;
	border-width:1px;
`;

const SymposiumTitle=styled.div`
	position:relative;
	border-style:solid;
	border-color:#E4E4E4;
	border-width:1px;
	border-radius:5px;
	

	@media screen and (max-width:1370px){
		margin-top:10%;
		#symposiumTitleText{
			font-size:24px !important;
		}
	}
	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
		margin-top:5%;
    }
`;

const ActiveProfilePictures=styled(Link)`
	position:relative;
	width:50px;
	height:25%;
	border-radius:50%;
	background-color:red;
	cursor:pointer;
`;

const PopularContainer=styled.div`

	position:relative;
	width:40%;
	background-color:white;
	height:25%;
	border-radius:5px;
	padding:10px;

`;

const ChatContainer =styled.div`
	position:relative;
	width:100%;
	height:50%;
	background-color:white;
	padding:5px;
	padding-top:10px;
	overflow:auto;
	-ms-overflow-style: none;  /* IE 10+ */
    scrollbar-width: none;
`;


const HighlightedQuestionsContainer=styled.div`
	position:absolute;
	height:55%;
	width:20%;
	left:10%;
	top:30%;
	border-radius:5px;

	@media screen and (max-width:1370px){
    	display:none !important;
    }
`;

const SymposiumTitlesAndVideosContainer=styled.div`
	position:absolute;
	left:35%;
	width:35%;
	height:55%;
	border-radius:5px;
	top:40%;
	display:flex;
	flex-direction:column;

	@media screen and (max-width:1370px){
		left:5% !important;
    	top:40px !important;
    	width:80% !important;
		height:20% !important;
		#titleContainer{
			font-size:10px !important;
		}

		#selectedSymposiumTitle{
			font-size:20px !important;
			color:red;
		}
		#popularVideosTitle{
			display:none !important;
		}
		#seeAllTitle{
			display:none !important;
		}
		#previousTitleLI{
			margin-top:-5% !important;
		}
		#nextTitleLI{
			margin-top:-5% !important;
		}
		#popularVideosUL{
			height:120% !important;
		}
    }

    @media screen and (max-width:640px){
    	display:none !important;
    }
`;

const ActivePeopleAndFollowContainer=styled.div`
	position:absolute;
	height:55%;
	width:20%;
	left:75%;
	top:33%;
	border-radius:5px;
	display:flex;
	flex-direction:column;

	@media screen and (max-width:1370px){
    	display:none !important;
    }
`;

const MobileOptions=styled.div`
	position:absolute;
	top:40%;
	left:90%;
	z-index:40;
	border-radius:50%;
	box-shadow:1px 1px 5px #6e6e6e;
	background-color:white;

	@media screen and (max-width:730px) and (max-height:420px){
    	top:40% !important;
    }
`;

const PopularVideosContainer=styled.div`
	position:relative;
	margin-top:5%;

	@media screen and (max-width:1370px){
		visibility: hidden;
	}

	@media screen and (max-width:1370px) and (max-height:800px) and (orientation: landscape) {
		visibility:visible;
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		visibility: hidden;
	}
`;

const PopularVideos=styled.div`
	display:flex;
	flex-direction:row;
	border-style:solid;
	border-color:#E4E4E4;
	border-width:1px;
	border-radius:5px;
	padding:5px;
`;

const BeaconDivCSS={
	width:"20%",
	display:"flex",
	alignItems:"center",
	justifyContent:"center",
	cursor:"pointer"
}


const ButtonCSS={
	listStyle:"none",
	borderRadius:"5px",
	padding:"20px",
	width:"100%",
	marginBottom:"30%",
	borderStyle:"solid",
	borderColor:"white",
	borderWidth:"1px",
	color:"white",
	marginTop:"-25%",
	cursor:"pointer"
}

const MobileRouteOptionCSS={
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	borderRadius:"50%",
	borderStyle:"none"
}

const PopularVideosListCSS={
	listStyle:"none",
	display:"inline-block",
	marginRight:"20px",
	marginBottom:"10px"
}

/*
	Idea down the road is to have it so that the videos automatically display and play and repeat 
	but that will be done later in a to do list


	linear-gradient(to left, #9933ff 0%, #ff99ff 100%)
	linear-gradient(to right,#E44D26 0%,#F16529 100%)

*/


const HeaderContainer=(props)=>{
	const {
			activePeople,
			popularVideos,
			selectedSymposiumTitle,
			symposiums,
			symposiumCounter,
			isProfileFollowingSymposium,
			profileId,
			changeFollowIndicator,
			displayPopularVideos,
			displayDesktopUI,
			isGuestProfile,
			headerAnimation,
			backgroundColor,
			displayBeacon,
			roomId
		}=props;
	const [hideChatButtonClicked,changeChatButtonHide]=useState(false);
	const [followSymposiumButtonClick,changeSymposiumFollow]=useState(true);
	const [displayMobilePostOptions,changeMobileDisplayPostOptions]=useState(false);

	const personalInformation=useSelector(state=>state.personalInformation);
	const dispatch=useDispatch();

	useEffect(()=>{
		changeSymposiumFollow(isProfileFollowingSymposium);
		if(headerAnimation==false){
			const headerContentsContainerElement=document.getElementById("headerContents");
		  	setTimeout(function(){
				headerContentsContainerElement.style.opacity="1";
		  	},500);	
		}
	});

	const counter=symposiumCounter;
  	var nextSymposiumTitle;
  	var previousSymposiumTitle;
  	if(symposiums.length==0){
  		previousSymposiumTitle="";	
  		nextSymposiumTitle="";
  	}else{
  		previousSymposiumTitle=counter>-1?
  			<a onClick={()=>props.previousButton()} href="javascript:void(0);" style={{textDecoration:"none"}}>
  				<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left-circle" 
  					width={displayDesktopUI==true?44:30} height={displayDesktopUI==true?44:30} viewBox="0 0 24 24" stroke-width="2" stroke="#FFFFFF" fill="none" 
  					stroke-linecap="round" stroke-linejoin="round">
				  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				  <circle cx="12" cy="12" r="9" />
				  <line x1="8" y1="12" x2="16" y2="12" />
				  <line x1="8" y1="12" x2="12" y2="16" />
				  <line x1="8" y1="12" x2="12" y2="8" />
				</svg>
			</a>:
  			<React.Fragment>{displayDesktopUI==true &&(<>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>)}</React.Fragment>;

  		nextSymposiumTitle=counter==symposiums.length-1?
  			<React.Fragment></React.Fragment>:
  			<a href="javascript:void(0);" onClick={()=>props.nextButton()} style={{textDecoration:"none"}}>
  				<svg id="nextButtonIcon" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-right-circle"
  					 width={displayDesktopUI==true?44:30} height={displayDesktopUI==true?44:30} viewBox="0 0 24 24" stroke-width="2" stroke="#FFFFFF" fill="none" 
  					 stroke-linecap="round" stroke-linejoin="round">
				  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				  <circle cx="12" cy="12" r="9" />
				  <line x1="16" y1="12" x2="8" y2="12" />
				  <line x1="16" y1="12" x2="12" y2="16" />
				  <line x1="16" y1="12" x2="12" y2="8" />
				</svg>
			</a>;
  	}

  	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const replayVideo=(startTime,endTime)=>{
	   		var startTime=0;
	   		const video=this
	   		const videoDuration=video.duration;
			var endTime;
			if(videoDuration>10)
				endTime=10;
			else
				endTime=videoDuration;

	   		if(this.state.headerAnimation==false){
		   		if(video!=null){
		   			video.play();
			   		video.currentTime=startTime;
			   		const videoDuration=endTime-startTime;

			   		setTimeout(()=>{
			   			video.currentTime=startTime;
			   			replayVideo(startTime,endTime,video);
			   		},videoDuration*1000);
		   		}
	   		}
	   }

	const handleFollowSymposium=async({isAccessTokenUpdated,updatedAccessToken})=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free')
		}else{
			if(followSymposiumButtonClick==false){
				const {confirmation,data}=await addSymposium(
													profileId,
													selectedSymposiumTitle,
													null,
													isAccessTokenUpdated==true?updatedAccessToken:
													personalInformation.accessToken,
													roomId
												);
				if(confirmation=="Failure"){
					const {statusCode}=data;
					if(statusCode==401){
						await refreshTokenApiCallHandle(
								personalInformation.refreshToken,
								personalInformation.id,
								handleFollowSymposium,
								dispatch,
								{},
								false
							);
					}else{
						alert('Unfortunately there has been an error in retrieving you data. Please try again');
					}
				}
			}else{
				const {confirmation,data}=await removeSymposium({
													profileId,
													symposium:selectedSymposiumTitle,
													accessToken:isAccessTokenUpdated==true?updatedAccessToken:
													personalInformation.accessToken
												});
				if(confirmation=="Failure"){
					
					const {statusCode}=data;
					if(statusCode==401){
						await refreshTokenApiCallHandle(
								personalInformation.refreshToken,
								personalInformation.id,
								handleFollowSymposium,
								dispatch,
								{},
								false
							);
					}else{
						alert('Unfortunately there has been an error with unfollowing this symposium. Please try again');
					}
				}
			}
			
			var newFollowIndicator=followSymposiumButtonClick==true?false:true;
			changeFollowIndicator(newFollowIndicator);
		}
	}

	const mobileArrowDownOptions=()=>{
		return 	<>
					{displayDesktopUI==false && (
						<MobileOptions>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<ExpandMoreIcon
									style={{fontSize:20}}
									onClick={()=>changeMobileDisplayPostOptions(true)}
								/>
							</a>
						</MobileOptions>
					)}
				</>
	}
	const triggerDisplayMobilePostOptions=()=>{
		return <>
					{displayMobilePostOptions==true &&(
						<MobilePostOptionsPortal
							closeModal={closeMobilePostOptions}
							isSymposiumFollowed={followSymposiumButtonClick}
							followUnfollowSymposium={handleFollowSymposium}
							{...props}
						/>
					)}
				</>
	}

	const closeMobilePostOptions=()=>{
		changeMobileDisplayPostOptions(false);
	}

	const beaconElement=()=>{
		return(
			<svg style={{cursor:"pointer",marginLeft:"5%"}}
				onClick={()=>displayBeacon()}
				xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-flare" width="44" 
				height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffec00" fill="none" stroke-linecap="round"
				stroke-linejoin="round"
			>
			  <path stroke="none" d="M 0 0h24v24H0z" fill="none"/>
			  <circle cx="12" cy="12" r="2" />
			  <path d="M3 12h4m5 -9v4m5 5h4m-9 5v4m-4.5 -13.5l1 1m8 -1l-1 1m0 7l1 1m-8 -1l-1 1" />
			</svg>
		)
	}

	return(
		<React.Fragment>
			{headerAnimation==false ?
				<Container id="headerContents" style={{background:backgroundColor}}>
					{props.isLoading==false &&(
						<>
							<HighlightedQuestionsContainer>
								<p style={{fontSize:"18px",color:"white"}}>
									<b>HighLighted Question</b>
								</p>
								{props.popularQuestionObject.questionInformation.length!=0 &&(
									<HightLightedQuestions
										questionInformation={props.popularQuestionObject.questionInformation}
										isSimplified={props.popularQuestionObject.isSimplified}
										selectedSymposium={props.popularQuestionObject.selectedSymposium}
										isGuestProfile={isGuestProfile}
										isOligarch={props.isOligarch}
									/>
								)}
							</HighlightedQuestionsContainer>
							<SymposiumTitlesAndVideosContainer>
								<SymposiumTitle>
									<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
										<p id="symposiumTitleText"
											style={{color:"white",marginLeft:"2%",fontSize:"36px"}}>
											{displayDesktopUI==true?
												<><b>{selectedSymposiumTitle}</b></>:
												<>{selectedSymposiumTitle}</>
											}
										</p>
										<div style={{...BeaconDivCSS,background:backgroundColor}}>
											{beaconElement()}
										</div>
									</div>
								</SymposiumTitle>
								<PopularVideosContainer>
									<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
										<p style={{color:"white",fontSize:"18px"}}>Popular Videos </p>
										<p style={{color:"white",fontSize:"18px",cursor:"pointer"}}
											onClick={()=>displayPopularVideos()}
										> See All </p>
									</div>
									<PopularVideos>
										{popularVideos.map(data=>
											<>
												{data!=null &&(
													<li style={PopularVideosListCSS}>
														<video id="smallVideo" key={uuidv4()} borderRadius="5px" 
															position="relative" height="50px" width="60px">
															<source src={data.videoUrl} type="video/mp4"/>
														</video>
													</li>
												)}
											</>
										)}
									</PopularVideos>
								</PopularVideosContainer>
							</SymposiumTitlesAndVideosContainer>
							<ActivePeopleAndFollowContainer>
								<li style={{listStyle:"none",display:"inline-block",marginBottom:"30%"}}>
									<ul style={{padding:"0px"}}>
											<p style={{color:"white",fontSize:"18px"}}>
												<b>Active People</b>
											</p>
											<li style={{listStyle:"none",width:"90%"}}>
												<ActiveContainer>
													<ul>
										 				{activePeople.map(data=>
									 						<li  style={{listStyle:"none",display:"inline-block",marginRight:"20px",marginBottom:"10px"}}>
									 							<ActiveProfilePictures to={{pathname:`/profile/${data._id}`}}>
									 								<img src={data.profilePicture!=null?
									 											data.profilePicture:
									 											NoProfilePicture} 
									 								style={{backgroundColor:"red", width:"50px",height:"50px",borderRadius:"50%"}}/>
									 							</ActiveProfilePictures>
									 						</li>
									 					)}
										 			</ul>
												</ActiveContainer>
											</li>
									</ul>
								</li>
								<div onClick={()=>handleFollowSymposium({isAccessTokenUpdated:false})}
									style={{...ButtonCSS,background:backgroundColor}}>
									<b>
										<AddCircleOutlineIcon style={{font:20}}/>
										 	{followSymposiumButtonClick==false?
										 		<p>Follow {selectedSymposiumTitle} Symposium</p>:
										 		<p>Unfollow {selectedSymposiumTitle} Symposium</p>
										 	}
									</b>
								</div>
							</ActivePeopleAndFollowContainer>
						</>
					)}
				</Container>:
				<SymposiumHeaderAnimation id="animatedHeaderAnimatedContainer" style={{background:backgroundColor}}/>
			}
		</React.Fragment>
			)
		}

const SimpliedHeaderContainer=(props)=>{


	return(
		<div>
			Testr
		</div>
	)
}


export {
	HeaderContainer,
	SimpliedHeaderContainer
}