import React,{useState,useEffect} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {
		addSymposium,
		removeSymposium
} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import HightLightedQuestions from "./HighLightedQuestions.js";
import {Link} from "react-router-dom";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MobilePostOptionsPortal from "./Modals/MobileUI/PostOptionsPortal.js";

const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	opacity:0;
	z-index:10;
	transition:opacity 2s linear
	@media screen and (max-width:1370px){
		left:90% !important;
    	#nextButtonIcon{
    		height:5px !important;
    		width:5px !important;
		}
    }
	
`;

const ActiveContainer =styled.div`
	position:relative;
	width:300%;
	height:50%;
	background-color:white;
	padding:5px;
	padding-top:10px;
	overflow:auto;
	-ms-overflow-style: none;  /* IE 10+ */
    scrollbar-width: none;
    border-radius:5px;
`;

const ActiveProfilePictures=styled(Link)`
	position:relative;
	width:50px;
	height:25%;
	border-radius:50%;
	background-color:red;

`;

const PopularContainer=styled.div`

	position:relative;
	width:40%;
	background-color:white;
	height:25%;
	border-radius:5px;
	padding:10px;

`;

const PopularVideos=styled.div`
	position:relative;
	width:95%;
	height:30%;
	background-color:white;
	border-radius:5px;
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
	top:35%;
	border-radius:5px;
	background-color:white;

	@media screen and (max-width:1370px){
    	display:none !important;
    }
`;

const PopularVideosContainer=styled.div`
	position:absolute;
	left:32%;
	width:40%;
	height:40%;
	border-radius:5px;
	top:40%;

	@media screen and (max-width:1370px){
		left:5% !important;
    	top:55% !important;
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
`;

const ActivePeopleAndFollowContainer=styled.div`
	position:absolute;
	height:55%;
	width:20%;
	left:75%;
	top:30%;
	border-radius:5px;

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
	marginTop:"-25%"
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
			displayDesktopUI
		}=props;
	const [hideChatButtonClicked,changeChatButtonHide]=useState(false);
	const [followSymposiumButtonClick,changeSymposiumFollow]=useState(true);
	const [displayMobilePostOptions,changeMobileDisplayPostOptions]=useState(false);

	useEffect(()=>{
		changeSymposiumFollow(isProfileFollowingSymposium);
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
	 

	const popularVideosHandle=(video)=>{
		const {videoUrl,key}=video;
		var lengthOfReplay=0;
		const videoElement=<video id={"video"+key} onLoadStart={()=>replayVideo(this)} onEnded={()=>replayVideo(this)} position="relative" height="100%" width="100%" autoplay="autoplay" muted>
			 					<source src={videoUrl} type="video/mp4"/>
			 				</video>;
		
		return <li style={{listStyle:"none",display:"inline-block",marginRight:"30px"}}> 
			 			<PopularVideos>
			 				{videoElement}
			 			</PopularVideos>
			 	</li>
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

	const handleFollowSymposium=async()=>{

		if(followSymposiumButtonClick==false){
			await addSymposium(profileId,selectedSymposiumTitle,null);
		}else{
			const {confirmation,data}=await removeSymposium(profileId,selectedSymposiumTitle,null);
			if(confirmation=="Failure"){
				alert('Unfortunately there has been an error with unfollowing this symposium. Please try again');
			}
		}
		
		var newFollowIndicator=followSymposiumButtonClick==true?false:true;
		changeFollowIndicator(newFollowIndicator);
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

	return(
			<Container id="headerContents">
				<HighlightedQuestionsContainer>
					{props.popularQuestionObject.questionInformation.length==0?
							null
						:<HightLightedQuestions
							questionInformation={props.popularQuestionObject.questionInformation}
							isSimplified={props.popularQuestionObject.isSimplified}
							selectedSymposium={props.popularQuestionObject.selectedSymposium}
						/>
					}
				</HighlightedQuestionsContainer>
				{mobileArrowDownOptions()}
				{triggerDisplayMobilePostOptions()}

				<PopularVideosContainer>
					<ul id="popularVideoContainerLI" style={{padding:"0px"}}>
						<li id="titleContainer" style={{listStyle:"none",position:"relative"}}>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
		  						<li id="previousTitleLI" style={{color:"white",listStyle:"none",display:"inline-block",fontSize:"40px",opacity:".5"}}>
		  							{previousSymposiumTitle}
		  						</li>
		  					</a>
		  					
		  					<li id="selectedSymposiumTitle" style={{width:displayDesktopUI==true?"40%":"60%",overflow:"hidden",color:"white",listStyle:"none",display:"inline-block",fontSize:"40px"}}>
		  						{displayDesktopUI==true?<><b>{selectedSymposiumTitle}</b></>:<>{selectedSymposiumTitle}</>}
		  					</li>

		  					<a href="javascript:void(0);" style={{textDecoration:"none",marginRight:"5%"}}>
		  						<li id="nextTitleLI" style={{width:"5%",color:"white",listStyle:"none",display:"inline-block",fontSize:"40px",opacity:".5"}}>
		  							{nextSymposiumTitle}
		  						</li>
		  					</a>
						</li>

						<li style={{listStyle:"none"}}>
							<ul style={{padding:"0px",position:"relative"}}>
								<li id="popularVideosTitle" style={{listStyle:"none",display:"inline-block",marginRight:"60%",color:"white",fontSize:"20px"}}>
									Popular Videos
								</li>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li id="seeAllTitle" onClick={()=>displayPopularVideos()} style={{listStyle:"none",display:"inline-block",color:"white",fontSize:"20px"}}>
										See All
									</li>
								</a>
							</ul>							

							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<ul id="popularVideosUL" style={{padding:"5px",backgroundColor:"white",height:props.isIpadView==true?"90%":"65%",borderRadius:"5px"}}>
										{popularVideos.map(data=>
											<>
												{data!=null &&(
													<li style={PopularVideosListCSS}>
														<video id="smallVideo" key={uuidv4()} borderRadius="5px" position="relative" height="95%" width="60px">
															<source src={data.videoUrl} type="video/mp4"/>
														</video>
													</li>
												)}
											</>
										)}
									</ul>
							</a>
						</li>
					</ul>
				</PopularVideosContainer>

				<ActivePeopleAndFollowContainer>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",display:"inline-block",marginBottom:"30%"}}>
							<ul style={{padding:"0px"}}>
									<p style={{color:"white",fontSize:"20px"}}>
										Active People
									</p>
									<li style={{listStyle:"none",width:"90%"}}>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<ActiveContainer>
												<ul>
									 				{activePeople.map(data=>
								 						<li  style={{listStyle:"none",display:"inline-block",marginRight:"30px",marginBottom:"10px"}}>
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
										</a>
									</li>
							</ul>
						</li>

						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<li onClick={()=>handleFollowSymposium()} style={ButtonCSS}>
								<b>
									<AddCircleOutlineIcon style={{font:20}}/>
									 	{followSymposiumButtonClick==false?
									 		<p>Follow Symposium</p>:
									 		<p>Unfollow Symposium</p>
									 	}
								</b>
							</li>
						</a>
							{/*
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li onClick={()=>props.hideChat()} style={ButtonCSS}>
										<b>
											<ExpandLessIcon style={{font:20}}/> 
												{hideChatButtonClicked==false?
													<p>Hide chat </p>:
													<p> Unhide Chat </p>
												}
										</b>
									</li>
								</a>
							*/}
					</ul>
				</ActivePeopleAndFollowContainer>
			</Container>
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