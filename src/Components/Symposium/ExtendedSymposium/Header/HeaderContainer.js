import React,{useState,useEffect,useContext} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import {
		addSymposium,
		removeSymposium
} from "../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import SymposiumFeaturesModals from "../SymposiumFeatures/index.js";
import {Link} from "react-router-dom";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MobilePostOptionsPortal from "../Modals/MobileUI/PostOptionsPortal.js";
import {useSelector,useDispatch} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../../Actions/Tasks/index.js";
import { Icon } from '@iconify/react';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ShadowOverlay from "./ShadowOverlay.js";
import {SymposiumContext} from "../SymposiumContext.js"

import {
	SymposiumHeaderAnimation,
	Container,
	ActiveContainer,
	SymposiumTitle,
	ActiveProfilePictures,
	PopularContainer,
	ChatContainer,
	HighlightedQuestionsContainer,
	SymposiumTitlesAndVideosContainer,
	ActivePeopleAndFollowContainer,
	MobileOptions,
	PopularVideosContainer,
	PopularVideos,
	OligarchButtonContainer,
	HeaderContainerDiv
} from './HeaderContainerCSS.js';

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
	padding:"15px",
	width:"60%",
	borderStyle:"solid",
	borderColor:"white",
	borderWidth:"1px",
	display:"flex",
	justifyContent:"center",
	alignItems:"center",
	color:"white",
	cursor:"pointer"
}

const MobileRouteOptionCSS={
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	borderRadius:"50%",
	borderStyle:"none"
}

const PopularVideosCSS={
	marginRight:"20px",
	marginBottom:"10px",
	borderRadius:"5px",
	overflow:"hidden"
}

/*
	Idea down the road is to have it so that the videos automatically display and play and repeat 
	but that will be done later in a to do list
*/

const ShadowDivCSS={
	width:"100%",
	height:"100%",
	background:"rgba(0, 0, 0, 0.5)",
	zIndex:5
}

const SelectedSymposiumOptionCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	color:"#3898ec",
	cursor:"pointer"
}

const NonSelectedSymposiumOptionCSS={
	cursor:"pointer",
	color:"white",
	opacity:0.7
}

const NonSelectedSymposiumCommunityOptionCSS={
	...NonSelectedSymposiumOptionCSS,
	marginRight:"5%"
}
const SymposiumCommunitySelectedOptionCSS={
	...SelectedSymposiumOptionCSS,
	marginRight:"5%"
}

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
			symposiumId,
			triggerDisplayOligarchsModal,
			posts,
			postType,
			miscellaneousSymposiumInformation
		}=props;
	const SymposiumConsumer=useContext(SymposiumContext);
	const [hideChatButtonClicked,changeChatButtonHide]=useState(false);
	const [followSymposiumButtonClick,changeSymposiumFollow]=useState(true);
	const [displayMobilePostOptions,changeMobileDisplayPostOptions]=useState(false);
	const [selectedSymposiumFeature,changeSelectedSymposiumFeature]=useState("Community");

	const [displaySymposiumCommunityModal,changeDisplaySymposiumCommunityModal]=useState(true);
	const [displayBeaconModal,changeDisplayBeaconsModal]=useState(false);
	const [displayUniversityModal,changeDisplayUniversityModal]=useState(false);

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
													symposiumId
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

	const oligarchIcon=()=>{
		return(
			<OligarchButtonContainer style={{marginLeft:"5%",cursor:"pointer"}} onClick={()=>triggerDisplayOligarchsModal()}>
				<svg xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" 
					aria-hidden="true" role="img" width="30" height="30" preserveAspectRatio="xMidYMid meet" 
					viewBox="0 0 24 24">
					<path d="M12 1l9 4v6c0 5.55-3.84 10.74-9 12c-5.16-1.26-9-6.45-9-12V5l9-4m0 2.18L5 6.3v4.92C5 15.54 8.25 20 12 21c3.75-1 7-5.46 7-9.78V6.3l-7-3.12M16 14v1.59c-.04.22-.22.37-.47.41H8.47c-.25-.04-.43-.19-.47-.41V14h8m1-6l-1 5H8L7 8l2.67 2.67L12 8.34l2.33 2.33L17 8z" 
					fill="#FFFFFF"/>
				</svg>
			</OligarchButtonContainer>
		)
	}

	const popularVideoConstruct=()=>{
		const videos=[];
		for(var i=0;i<popularVideos.length;i++){
			let component;
			if(i==popularVideos.length-1){
				component=<div style={{...PopularVideosCSS,cursor:"pointer"}}>
								<div style={{...ShadowDivCSS,height:"60px",width:"70px",position:"absolute",zInde:10,color:"white",justifyContent:"center",alignItems:"center",display:"flex",borderRadius:"5px",opacity:0.9}}
									onClick={()=>displayPopularVideos()}>
									View All
								</div>
								<div style={{zIndex:5}}>
									<video id="smallVideo" key={uuidv4()} borderRadius="5px" 
										position="relative" height="60px" width="70px"
										style={{borderRadius:"5px"}}>
										<source src={popularVideos[i].videoUrl} type="video/mp4"/>
									</video>
								</div>
							</div>
			}else{
				component=<div style={PopularVideosCSS}>
								<video id="smallVideo" key={uuidv4()} borderRadius="5px" 
									position="relative" height="60px" width="70px"
									style={{borderRadius:"5px"}}>
									<source src={popularVideos[i].videoUrl} type="video/mp4"/>
								</video>
							</div>
			}
			videos.push(component)
		}
		return(
			<div style={{display:"flex",flexDirection:"row"}}>
				{videos.map(data=>
					<React.Fragment>
						{data}
					</React.Fragment>
				)}
			</div>
		)
	}

	const triggerDisplaySymposiumCommunityModal=()=>{
		changeDisplaySymposiumCommunityModal(true);
		changeDisplayBeaconsModal(false);
		changeDisplayUniversityModal(false);
		changeSelectedSymposiumFeature("Community");
	}

	const triggerDisplaySymposiumUniversityModal=()=>{
		changeDisplaySymposiumCommunityModal(false);
		changeDisplayBeaconsModal(false);
		changeDisplayUniversityModal(true);
		changeSelectedSymposiumFeature("University");
	}

	const triggerDisplaySymposiumBeaconsModal=()=>{
		changeDisplaySymposiumCommunityModal(false);
		changeDisplayBeaconsModal(true);
		changeDisplayUniversityModal(false);
		changeSelectedSymposiumFeature("Beacon");
	}

	const symposiumFeaturesEntrance=()=>{
		return(
			<Link to={{pathname:`/symposiumFeatures/${symposiumId}`}}>
				<MeetingRoomIcon
					style={{fontSize:30,color:"#FFFFFF",marginLeft:"20%"}}
				/>
			</Link>
		)
	}

	const shadowOverlay=()=>{
		return(
			<ShadowOverlay
				posts={posts}
				postType={postType}
			/>
		)
	}

	return(
		<React.Fragment>
			{headerAnimation==false ?
				<Container id="headerContents">
					{props.isLoading==false &&(
						<>
							<HeaderContainerDiv id="firstHeaderContentsContainer"  style={{background:backgroundColor}}>
								<div id="firstHeaderContentsDiv" 
									style={{padding:"30px",position:"absolute",marginTop:"22%",width:"90%",height:"100%",zIndex:10,marginLeft:"5%"}}>
									<div style={{marginBottom:"22%"}}>
										<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
											<p style={{color:"white",fontSize:"30px",fontFamily:"'Poppins'"}}>
												<b>{selectedSymposiumTitle}</b>
											</p>
											{oligarchIcon()}
											{symposiumFeaturesEntrance()}
										</div>
										<p style={{color:"white",opacity:0.7}}>{miscellaneousSymposiumInformation.symposiumIntroductionTitle}</p>
									</div>
									<div style={{display:"flex",flexDirection:"column"}}>
										<p style={{color:"white",opacity:0.7}}>Popular Videos</p>
										{popularVideoConstruct()}
									</div>
								</div>
								{shadowOverlay()}
							</HeaderContainerDiv>

							<HeaderContainerDiv style={{background:backgroundColor,width:"50%"}}>
								<div id="headerContentsDiv" style={{position:"absolute",marginTop:"12%",width:"100%",zIndex:10,padding:"30px",height:"72%"}}>
									<div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
										<p style={displaySymposiumCommunityModal==true?
											SymposiumCommunitySelectedOptionCSS:
											NonSelectedSymposiumCommunityOptionCSS}
											onClick={()=>triggerDisplaySymposiumCommunityModal()}>
											Symposium Community
										</p>
										
										{(selectedSymposiumTitle=="General"||
											selectedSymposiumTitle=="Religion"||
											selectedSymposiumTitle=="Gaming"||
											selectedSymposiumTitle=="Philosophy")==false &&(
											<p style={displayUniversityModal==true?SelectedSymposiumOptionCSS:
												NonSelectedSymposiumOptionCSS}
												onClick={()=>triggerDisplaySymposiumUniversityModal()}>
												Symposium University
											</p>
										)}


										<p style={displayBeaconModal==true?SelectedSymposiumOptionCSS:
											{...NonSelectedSymposiumOptionCSS,marginLeft:"5%"}}
											onClick={()=>triggerDisplaySymposiumBeaconsModal()}>
											Beacons
										</p>
									</div>

									<div style={{backgroundColor:"red",width:"100%",height:"100%",borderRadius:"5px"}}>
										{SymposiumConsumer.specificSymposiumFeaturesComponent(
											selectedSymposiumFeature,
											false)}
									</div>
								</div>
								{shadowOverlay()}
							</HeaderContainerDiv>

							<HeaderContainerDiv style={{background:backgroundColor,marginRight:"0%"}}>
								<div id="headerContentsDiv" style={{position:"absolute",marginTop:"30%",width:"100%",zIndex:10,marginLeft:"30%"}}>
									<div onClick={()=>handleFollowSymposium({isAccessTokenUpdated:false})}
										style={{...ButtonCSS,backgroundColor:"white",color:"#252525",marginBottom:"17%",boxShadow:"1px 1px 5px #6e6e6e"}}>
										<b>
										 	{followSymposiumButtonClick==false?
										 		<p>Follow {selectedSymposiumTitle} Symposium</p>:
										 		<p>Unfollow {selectedSymposiumTitle} Symposium</p>
										 	}
										</b>
									</div>
									<div style={{display:"flex",flexDirection:"column"}}>
										<p style={{color:"white",opacity:0.7}}>Active Users</p>
										<div style={{display:"flex",flexDirection:"row",marginBottom:"1%"}}>
							 				{activePeople.map(data=>
					 							<ActiveProfilePictures to={{pathname:`/profile/${data._id}`}}>
					 								<img src={data.profilePicture!=null?
					 											data.profilePicture:
					 											NoProfilePicture} 
					 								style={{backgroundColor:"red", width:"50px",height:"50px",borderRadius:"50%"}}/>
					 							</ActiveProfilePictures>
						 					)}
							 			</div>
							 			<p style={{color:"white",opacity:0.7}}>{activePeople.length} members</p>
									</div>
								</div>
								{shadowOverlay()}
							</HeaderContainerDiv>
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



