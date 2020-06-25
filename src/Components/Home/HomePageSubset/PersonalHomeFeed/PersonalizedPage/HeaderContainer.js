import React from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const ActiveContainer =styled.div`
	position:relative;
	width:210%;
	height:50%;
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
			symposiumCounter
		}=props;

	const counter=symposiumCounter;
	  	var nextSymposiumTitle;
	  	var previousSymposiumTitle;
	  	if(symposiums.length==0){
	  		previousSymposiumTitle="";	
	  		nextSymposiumTitle="";
	  	}else{
	  		previousSymposiumTitle=counter>0?<p onClick={()=>props.previousButton()}>{symposiums[counter-1].industry}</p>:<React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>;
	  		nextSymposiumTitle=counter==symposiums.length-1?<React.Fragment></React.Fragment>:<p onClick={()=>props.nextButton()}>{symposiums[counter+1].industry}</p>;
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

	return(

			<div style={{position:"absolute",width:"100%",height:"100%",opacity:"0",transition:"opacity 2s linear"}} id="headerContents">
				<ul style={{paddingTop:"110px",paddingLeft:"150px"}}>
					<li style={{listStyle:"none",display:"inline-block"}}>
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

					<li style={{listStyle:"none",display:"inline-block",marginLeft:"15%",position:"relative",top:"-120px",width:"50%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
			  						<li style={{color:"white",listStyle:"none",display:"inline-block",fontSize:"40px",opacity:".5"}}><b>{previousSymposiumTitle}</b></li>
			  					</a>
			  					
			  					<li style={{color:"white",listStyle:"none",display:"inline-block",fontSize:"40px"}}>&nbsp;&nbsp;&nbsp;&nbsp;<b> {selectedSymposiumTitle} </b> &nbsp;&nbsp;&nbsp;&nbsp;</li>

			  					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
			  						<li style={{color:"white",listStyle:"none",display:"inline-block",fontSize:"40px",opacity:".5"}}><b>{nextSymposiumTitle}</b></li>
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
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li style={ButtonCSS}>
										<b>
											<AddCircleOutlineIcon style={{font:20}}/> Follow Symposium
										</b>
									</li>
								</a>

								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li style={ButtonCSS}>
										<b>
											<ExpandLessIcon style={{font:20}}/> Hide chat
										</b>
									</li>
								</a>
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