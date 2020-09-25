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

const ActiveContainer =styled.div`
	position:relative;
	width:210%;
	height:20%;
	background-color:white;
	padding:5px;
	padding-top:10px;
	overflow:auto;
	-ms-overflow-style: none;  /* IE 10+ */
    scrollbar-width: none;
    border-radius:5px;
`;

const ActiveProfilePictures=styled.div`
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
	width:560%;
	height:50%;
	background-color:white;
	padding:5px;
	padding-top:10px;
	overflow:auto;
	-ms-overflow-style: none;  /* IE 10+ */
    scrollbar-width: none;
`;

const ButtonCSS={
	listStyle:"none",
	borderRadius:"5px",
	padding:"20px",
	width:"140%",
	marginBottom:"30%",
	borderStyle:"solid",
	borderColor:"white",
	borderWidth:"1px",
	color:"white"
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
			changeFollowIndicator
		}=props;

	console.log(props.popularQuestionObject);
	const [hideChatButtonClicked,changeChatButtonHide]=useState(false);
	const [followSymposiumButtonClick,changeSymposiumFollow]=useState(true);

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
  		previousSymposiumTitle=counter>0?<p onClick={()=>props.previousButton()}><b>{symposiums[counter-1].symposium}</b></p>:<React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>;
  		nextSymposiumTitle=counter==symposiums.length-1?<React.Fragment></React.Fragment>:<p onClick={()=>props.nextButton()}><b>{symposiums[counter+1].symposium}</b></p>;
  	}
	 

	const popularVideosHandle=(video)=>{
		const {videoUrl,key}=video;
		var lengthOfReplay=0;
		const videoElement=<video id={"video"+key} onLoadStart={()=>replayVideo(key)} onEnded={()=>replayVideo(key)} position="relative" height="100%" width="100%" autoplay="autoplay" muted>
			 					<source src={videoUrl} type="video/mp4"/>
			 				</video>;
		
		return <li style={{listStyle:"none",display:"inline-block",marginRight:"30px"}}> 
			 			<PopularVideos>
			 				{videoElement}
			 			</PopularVideos>
			 	</li>
	}

	const replayVideo=(key)=>{
	   		debugger;
	   		const video=document.getElementById("video"+key);
	   		var startTime=0;
	   		
	   		const videoDuration=video.duration;
			var endTime;
			if(videoDuration>10)
				endTime=10;
			else
				endTime=videoDuration;

	   		if(this.state.headerAnimation==false){
		   		const video=document.getElementById("video"+key);
		   		if(video!=null){
		   			video.play();
			   		video.currentTime=startTime;
			   		const videoDuration=endTime-startTime;

			   		setTimeout(()=>{
			   			video.currentTime=startTime;
			   			replayVideo(startTime,endTime,key);
			   		},videoDuration*1000);
		   		}
	   		}
	   }

	const handleFollowSymposium=async()=>{
		debugger;
		if(followSymposiumButtonClick==false){
			await addSymposium(profileId,selectedSymposiumTitle,null);
		}else{
			await removeSymposium(profileId,selectedSymposiumTitle,null);
		}
		
		var newFollowIndicator=followSymposiumButtonClick==true?false:true;
		changeFollowIndicator(newFollowIndicator);
	}

	return(
			<div style={{position:"absolute",width:"100%",height:"100%",opacity:"0",transition:"opacity 2s linear"}} id="headerContents">
				<ul style={{paddingTop:"110px",paddingLeft:"150px"}}>
					{props.popularQuestionObject.questionInformation.length==0?
							null
						:<li style={{listStyle:"none",display:"inline-block"}}>
							<HightLightedQuestions
								questionInformation={props.popularQuestionObject.questionInformation}
								isSimplified={props.popularQuestionObject.isSimplified}
								selectedSymposium={props.popularQuestionObject.selectedSymposium}
							/>
						</li>
					}
					<li style={{listStyle:"none",display:"inline-block",marginLeft:"-10%",position:"relative",top:"-120px",width:"50%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
			  						<li style={{color:"white",listStyle:"none",display:"inline-block",fontSize:"40px",opacity:".5"}}>
			  							{previousSymposiumTitle}
			  						</li>
			  					</a>
			  					
			  					<li style={{color:"white",listStyle:"none",display:"inline-block",fontSize:"40px"}}>
			  						&nbsp;&nbsp;&nbsp;&nbsp;<b> {selectedSymposiumTitle} </b> &nbsp;&nbsp;&nbsp;&nbsp;
			  					</li>

			  					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
			  						<li style={{color:"white",listStyle:"none",display:"inline-block",fontSize:"40px",opacity:".5"}}>
			  							{nextSymposiumTitle}
			  						</li>
			  					</a>
							</li>

							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",marginRight:"60%",color:"white",fontSize:"20px"}}>
										Popular Videos
									</li>
									<li style={{listStyle:"none",display:"inline-block",color:"white",fontSize:"20px"}}>
										See All
									</li>
								</ul>							

								<PopularVideos>

								</PopularVideos>
							</li>
						</ul>
					</li>

					<li style={{listStyle:"none",display:"inline-block",marginLeft:"2%",top:"-20px",position:"relative"}}>
						<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block",marginBottom:"30%"}}>
									<ul style={{padding:"0px"}}>
											<p style={{color:"white",fontSize:"20px"}}>
												Active People
											</p>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<ActiveContainer>
													<ul>
										 				{activePeople.map(data=>

										 						<li  style={{listStyle:"none",display:"inline-block",marginRight:"30px",marginBottom:"10px"}}>
										 							<ActiveProfilePictures>
										 								{data.profilePicture==null?
										 									<img src={NoProfilePicture} style={{backgroundColor:"red", width:"100%",height:"100%",borderRadius:"50%"}}/>:
										 									<img src={data.profilePicture} style={{backgroundColor:"red", width:"100%",height:"100%",borderRadius:"50%"}}/>
										 								}
										 							</ActiveProfilePictures>
										 						</li>
										 					)}
										 			</ul>
												</ActiveContainer>
											</a>
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
					</li>

				</ul>
			</div>
			)
		}

const SimpliedHeaderContainer=(props)=>{


	return(
		<div>
		</div>
	)
}


export {
	HeaderContainer,
	SimpliedHeaderContainer
}