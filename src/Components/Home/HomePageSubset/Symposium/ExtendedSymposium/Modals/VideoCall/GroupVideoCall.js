import React,{Component} from "react";
import styled from "styled-components";
import {connect} from "react-redux";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import MicIcon from '@material-ui/icons/Mic';

import DefaultImage1 from "../../../../../../../designs/img/VideoCallImage1.png";
import DefaultImage2 from "../../../../../../../designs/img/VideoCallImage2.png";
import DefaultImage3 from "../../../../../../../designs/img/VideoCallImage3.png";
import DefaultImage4 from "../../../../../../../designs/img/VideoCallImage4.png";
import DefaultImage5 from "../../../../../../../designs/img/VideoCallImage5.png";
import DefaultImage6 from "../../../../../../../designs/img/VideoCallImage6.png";
import DefaultImage7 from "../../../../../../../designs/img/VideoCallImage7.png";
import DefaultImage8 from "../../../../../../../designs/img/VideoCallImage8.png";

import io from 'socket.io-client';
import {connectRoom,sendMessage} from "../../../../../../../Actions/Requests/SocketIORequests";
import {getGroupVideoCallOwner} from "../../../../../../../Actions/Requests/HomePageAxiosRequests/HomePageGetRequests.js";
import {
	connectToRoom,
	sendGroupGeneralMessage,
	sendPrivateGroupMessage,
	sendNewAddition
} from "../../../../../../../Actions/Requests/SocketIORequests";
 

const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	background-color:#1C1C1C;
`;

const VideoContainer=styled.div`
	width:50px;
	height:50%;
	background-color:red;
`;

const VideoCallOptionsContainer=styled.div`
	position:absolute;
	left:90%;
	height:50%;
	width:5%;
	top:2%;
	padding:20px;
	border-radius:5px;
	background-color:#151515;
	overflow-y:auto;
`;

const UsersOptionsContainer=styled.div`
	position:absolute;
	top:5%;
	left:2%;
	width:35%;
	height:40%;
	background-color:white;
	border-radius:5px;
	padding:10px
`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	height:20%;
	width:80%;
	padding:5px;
`;

const ChatContainer=styled.div`
	height:65%;
	width:100%
	background-color:red;
	overflow-y:auto;
`;

const ChatImageContainer=styled.div`
	width:45px;
	height:20%;
	border-radius:50%;
	background-color:red;
`;

const MinimizeChatContainerButton=styled.div`
	position:absolute;
	left:90%
`;

const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:17;
	top:0px;
`;

const DisplayThreatreDecider=styled.div`
	position:absolute;
	width:30%;
	height:20%;
	border-radius:5px;
	background-color:white;
	left:40%;
	top:50%;
	z-index:18;
`;


const ThreatreChatContainer=styled.div`
	position:absolute;
	top:5%;
	left:5%;
	width:35%;
	height:40%;
	background-color:white;
	border-radius:5px;
	padding:10px
`;

const NewChatNotification=styled.div`
	position:relative;
	top:5%;
	background-color:red;
	width:60%;
	height:5%;
	border-radius:50%;
	color:white;
	text-align:center;
`;

const MemebersInformationContainer=styled.div`
	position:absolute;
	top:5%;
	left:5%;
	width:25%;
	height:60%;
	background-color:white;
	border-radius:5px;
	padding:10px
`;

const MemberOptionsProfileContainer=styled.div`
	width:50px;
	height:10%;
	border-radius:50%;
	background-color:red;
`;

const InitialSetupScreen=styled.div`
	position:absolute;
	width:40%;
	height:30%;
	border-radius:5px;
	background-color:white;
	left:30%;
	top:30%;
	z-index:18;
	overflow-y:auto;
`;



const SendButton={
position:"relative",
top:"-20px",
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginLeft:"-10%"

}

const ButtonCSS={
	position:"relative",
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"5px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginLeft:"10%"
}

const socket = io('http://localhost:4000');

class GroupVideoCall extends Component{

	constructor(props){
		super(props);
		this.state={
			isGroupCallOwner:false,
			maxParticipants:4,
			currentParticipants:[],
			displayVideo:false,
			oldMediaDevice:null,
			isRecording:false,
			firstDone:false,
			displayChatContainer:false,
			displayTheatreChatContainer:false,
			displayThreatreDecider:false,
			displayThreatreMemberOptionsContainer:false,
			displayTheatreMode:false,
			previousParticipantsLength:0,
			lastTimeCheckedChatCounter:0,
			displayInitialSetupScreen:true,
			chatMessage:[{},{},{},{},{},{},{},{},{}],
			defaultImageSelected:null,
			displayDefaultImageSelectionScreen:true,
			isStarted:false
		}

		connectToRoom(socket,this.props.match.params.groupCallId);
	}

	async componentDidMount(){
		
		if(this.props.location.state!=null){
			var isGroupCallOwner;
			if(this.props.location.state.ownerId==this.props.personalInformation.id)
				isGroupCallOwner=true;
		}else{
			
			const {confirmation,data}=await getGroupVideoCallOwner({
				symposiumId:this.props.match.params.symposiumId,
				groupCallId:this.props.match.params.groupCallId
			});

			if(confirmation=="Success"){
				if(data==this.props.personalInformation.id)
					isGroupCallOwner=true;
			}else{
				alert('Unfortunately there has been an error. Please reload the page again');
			}
		}

		socket.on('newMessage',this.handleNewGeneralMessage);
		socket.on('newAddition',this.handleNewAddition);
		socket.on('newPrivateMessage',this.handleNewPrivateMessage);
	}

	handleNewAddition=(data)=>{
		this.test(data)
	}

	handleNewGeneralMessage=(data)=>{
	}

	handleNewPrivateMessage=(data)=>{
	}

	componentDidUpdate(){
		var videoContainer=document.getElementById("videoContainer");
		if(videoContainer!=null && this.state.displayChatContainer!=true){
			
			for(var i=0;i<this.state.currentParticipants.length;i++){
				this.test(this.state.currentParticipants[i]);
			}
		}
	}

	pauseRecording=(stream)=>{
		this.state.oldMediaDevice.stop();
		this.setState({
			isRecording:false
		});
	}

	stopRecording=(stream)=>{
		if(this.state.isRecording!=false){
			this.state.oldMediaDevice.stop();
		}
		stream.getTracks().forEach(track => track.stop());
		this.setState({
			isRecording:false
		});
	}

	handleRecording=(stream)=>{
		var stoppedVideo;
		var data;
		 if(this.state.firstDone==true){
		 	
			  data=[];

			  this.state.oldMediaDevice.ondataavailable = event => data.push(event.data);
			  this.state.oldMediaDevice.start();

			  stoppedVideo=new Promise((resolve, reject) => {
			    this.state.oldMediaDevice.onstop = resolve;
			    this.state.oldMediaDevice.onerror = event => reject(event.name);
			  });
			  //changeRecordingState(true);
		 }else{
		 	
			  let recorder = new MediaRecorder(stream);
			  data=[];

			  recorder.ondataavailable = event => data.push(event.data);
			  recorder.start();

			  stoppedVideo=new Promise((resolve, reject) => {
			    recorder.onstop = resolve;
			    recorder.onerror = event => reject(event.name);
			  });

			  this.setState({
			  	oldMediaDevice:recorder,
			  	firstDone:true,
			  });
			  //changeRecordingState(true);
		 }
		  return Promise.all([stoppedVideo]).then(()=>data);
	}

	test=async({videoUrl,isVideoCall,imgUrl})=>{
		
		if(isVideoCall!=false){
			var video = document.createElement('video');
			var videoContainer=document.getElementById("videoContainer");

			video.srcObject=videoUrl;
			video.captureStream = video.captureStream || video.mozCaptureStream;
			video.height=400;
			video.width=700;
			video.setAttribute("controls","controls")  
			video.style.objectFit = "cover";
			video.style.marginRight="2%";
			video.style.marginBottom="2%";
			video.autoplay=true;

			videoContainer.appendChild(video);
		}else{
			if(imgUrl!=null){

			}else{
				var image=document.createElement("img");
				var videoContainer=document.getElementById("videoContainer");
				image.src=this.state.defaultImageSelected;
				image.height=400;
				image.width=700;
				videoContainer.appendChild(image);
			}
		}
		
		/*
		let recorder = new RecordRTCPromisesHandler(videoUrl, {
					    type: 'video'
					});
					recorder.startRecording();

					const sleep = m => new Promise(r => setTimeout(r, m));
					await sleep(3000);

					await recorder.stopRecording();
					let blob = await recorder.getBlob();
					invokeSaveAsDialog(blob);
		*/

		let recorder = new MediaRecorder(videoUrl);
		var userInformation={
			firstName:this.props.personalInformation.firstName,
			_id:this.props.personalInformation._id,
			isVideoCall:isVideoCall,
			videoUrl:recorder,
			imgUrl:this.state.defaultImageSelected
		}

		var socketPacket={
			room:this.props.match.params.groupCallId,
			user:userInformation
		}

		sendNewAddition(socket,socketPacket);
	}

	startScreenRecording=async()=>{
		this.setState({
			displayThreatreDecider:false,
			displayTheatreMode:true
		},async()=>{
			alert("You are now sharing your screen. Switch to the screen you want to share. If you want to stop then press the stop hand button on the right");

			var screenRecorder=document.getElementById("screenRecorder");
			screenRecorder.srcObject = await navigator.mediaDevices.getDisplayMedia({
				  video: {
				    cursor: "always"
				  },
				  audio:true
			}).catch(err=>{
			});
		})
	}

	stopScreenRecording=()=>{
		var screenRecorder=document.getElementById("screenRecorder");
		let tracks = screenRecorder.srcObject.getTracks();

		tracks.forEach(track => track.stop());
		screenRecorder.srcObject = null;
		this.setState({
			displayTheatreMode:false,
			displayThreatreDecider:false,
			displayTheatreChatContainer:false
		})
	}  

	removeDivChildern=(div)=>{
		while (div.hasChildNodes()) {
		    div.removeChild(div.lastChild);
		}
	}

	createVideoElementsThreatrePage=(data)=>{
		var video = document.createElement('video');
		var screenRecorderContainer=document.getElementById("screenRecorderDIV");
		this.removeDivChildern(screenRecorderContainer);

		video.srcObject=data.videoUrl;
		video.height=200;
		video.width=250;
		video.setAttribute("controls","controls")  
		video.style.objectFit = "cover";
		video.style.marginRight="2%";
		video.style.marginBottom="2%";
		video.autoplay=true;

		screenRecorderContainer.appendChild(video);
	} 

	displayChatContainer=()=>{
		if(this.state.displayTheatreMode==true){
			this.setState({
				displayTheatreChatContainer:!this.state.displayTheatreChatContainer,
				lastTimeCheckedChatCounter:this.state.chatMessage.length
			})
		}else{
			this.setState({
				displayChatContainer:!this.state.displayChatContainer,
				lastTimeCheckedChatCounter:this.state.chatMessage.length
			})
		}
	} 

	kickOutMemeberAction=()=>{

	}

	displayInitialVideoRecording=()=>{
		var video = document.createElement('video');
		video.height=50;
		video.width=100;

		if (navigator.mediaDevices.getUserMedia){
			  navigator.mediaDevices.getUserMedia({ 
			  		video: true,
			  		audio:false 
			  	}).then((stream)=> {
			  		
			      video.srcObject = stream;
			      video.captureStream = video.captureStream || video.mozCaptureStream;

			      var newVideo={
			      	videoUrl:stream,
			      	key:this.state.currentParticipants.length,
			      	isVideoCall:true
			      }
			      const currentParticipants=this.state.currentParticipants;
	  			  currentParticipants.splice(0,0,newVideo);
	  			  
	  			  this.setState({
	  			  	currentParticipants:currentParticipants,
	  			  	displayInitialSetupScreen:false
	  			  })
			    }).catch(function (error) {
		    });
		}	
	}

	setDefaultImage=(defaultImageComponent)=>{
		this.setState({
			defaultImageSelected:defaultImageComponent
		})
	}

	displayAudioAndDefaultImageScreen=()=>{
		var video = document.createElement('video');
		if (navigator.mediaDevices.getUserMedia){
			  navigator.mediaDevices.getUserMedia({ 
			  		video: false,
			  		audio:true 
			  	}).then((stream)=> {
			  		
			      video.srcObject = stream;
			      video.captureStream = video.captureStream || video.mozCaptureStream;

			      var newVideo={
			      	videoUrl:stream,
			      	key:this.state.currentParticipants.length,
			      	isVideoCall:false
			      }
			      const currentParticipants=this.state.currentParticipants;
	  			  currentParticipants.splice(0,0,newVideo);
	  			  
	  			  this.setState({
	  			  	currentParticipants:currentParticipants,
	  			  	displayInitialSetupScreen:false,
	  			  	displayDefaultImageSelectionScreen:false
	  			  })
			    }).catch(function (error) {
		    });
		}	
	}


	render(){
		return(
	<Container>
		{this.state.displayTheatreMode==false?
			<ul style={{padding:"20px"}}>
				{this.state.displayInitialSetupScreen==true?
					<>
						<ShadowContainer
						/>
						<InitialSetupScreen>
							{this.state.displayDefaultImageSelectionScreen!=false?
								<ul style={{padding:"20px"}}>
									<p> 
										Would you like to start you screen recording right now? If not then you can 
										pick a default image when you click no 
									</p>
									<li style={{listStyle:"none",display:"inline-block"}}>
										<ul style={{padding:"0px"}}>
											<li onClick={()=>this.displayInitialVideoRecording()} style={ButtonCSS}>
												Yes
											</li>

											<li onClick={()=>this.setState({displayDefaultImageSelectionScreen:false})} style={ButtonCSS}>
												No
											</li>
										</ul>
									</li>
								</ul>
								:
								<ul style={{padding:"20px"}}>
									<li style={{position:"fixed",listStyle:"none",backgroundColor:"white",width:"30%"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block"}}>
												<p> Pick one of the options below </p>
											</li>
											{this.state.defaultImageSelected!=null && (
												<li onClick={()=>this.displayAudioAndDefaultImageScreen()} style={ButtonCSS}>
													<p> Submit </p>
												</li>
											)}
										</ul>

									</li>
									<li style={{listStyle:"none",marginTop:"10%"}}>
										<ul style={{padding:"0px"}}>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<img  onClick={()=>this.setDefaultImage(DefaultImage1)} src={DefaultImage1} style={{width:"30%",height:"60%",marginRight:"5%",marginBottom:"2%"}}/>
											</a>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<img onClick={()=>this.setDefaultImage(DefaultImage2)} src={DefaultImage2} style={{width:"30%",height:"60%",marginRight:"5%",marginBottom:"2%"}}/>
											</a>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<img onClick={()=>this.setDefaultImage(DefaultImage3)} src={DefaultImage3} style={{width:"30%",height:"60%",marginRight:"5%",marginBottom:"2%"}}/>
											</a>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<img onClick={()=>this.setDefaultImage(DefaultImage4)} src={DefaultImage4} style={{width:"30%",height:"60%",marginRight:"5%",marginBottom:"2%"}}/>
											</a>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<img onClick={()=>this.setDefaultImage(DefaultImage5)} src={DefaultImage5} style={{width:"30%",height:"60%",marginRight:"5%",marginBottom:"2%"}}/>
											</a>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<img onClick={()=>this.setDefaultImage(DefaultImage6)} src={DefaultImage6} style={{width:"30%",height:"60%",marginRight:"5%",marginBottom:"2%"}}/>
											</a>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<img onClick={()=>this.setDefaultImage(DefaultImage7)} src={DefaultImage7} style={{width:"30%",height:"60%",marginRight:"5%",marginBottom:"2%"}}/>
											</a>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<img onClick={()=>this.setDefaultImage(DefaultImage8)} src={DefaultImage8} style={{width:"30%",height:"60%",marginRight:"5%",marginBottom:"2%"}}/>
											</a>
										</ul>
									</li>
								</ul>
							}
						</InitialSetupScreen>
					</>:null
				}

				<div style={{height:"40",width:"100%"}} id="videoContainer">
				{this.state.currentParticipants.map(data=>
					<li style={{marginRight:"5%",marginBottom:"2%",heigth:"50%",width:"90%",listStyle:"none",display:"inline-block"}}>
						{this.state.displayChatContainer && (
							<UsersOptionsContainer>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<MinimizeChatContainerButton>
										<NavigateBeforeIcon
											style={{borderRadius:"50%",boxShadow:"1px 1px 5px #dbdddf",fontSize:30}}
										/>
									</MinimizeChatContainerButton>
								</a>
								<ul style={{pading:"0px"}}>
									<li style={{listStyle:"none",overflowX:"scroll",overflowY:"scroll",height:"10%",marginBottom:"2%"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block"}}>
												Chats:
											</li>
											{this.state.currentParticipants.map(data=>
												<li style={ButtonCSS}>
													Test again
												</li>
											)}
										</ul>
									</li>
									<li style={{listStyle:"none"}}>
										<ChatContainer>
											{this.state.chatMessage.map(data=>
												<ul style={{padding:"0px"}}>
													<li style={{position:"relative",listStyle:"none",display:"inline-block",top:"-135px",marginRight:"2%"}}>
														<ChatImageContainer/>
													</li>
													<li style={{listStyle:"none",display:"inline-block",width:"75%"}}>
														<p style={{fontSize:"15px"}}> 
															<b> Nathan Grant </b>
														</p>
														<p>
															Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
															sed do eiusmod tempor incididunt ut labore et dolore magna 
															aliqua. Ut enim ad minim veniam, quis nostrud exercitation
															ullamco laboris nisi ut aliquip ex ea commodo consequat. 
															Duis aute irure dolor in reprehenderit in voluptate velit esse
															cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
															cupidatat non proident, sunt in culpa qui officia deserunt mollit
															anim id est laborum.
														</p>
													</li>
												</ul>
											)}
										</ChatContainer>
									</li>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li style={{listStyle:"none",width:"95%"}}>
											<ul style={{padding:"0px"}}>
												<li style={{width:"85%",listStyle:"none",display:"inline-block"}}>
													<InputContainer/>
												</li>
												<li style={SendButton}>
													Send
												</li>
											</ul>
										</li>
									</a>
								</ul>
							</UsersOptionsContainer>
						)}
					</li>
				)}
				</div>
			</ul>:
			<ul style={{padding:"20px"}}>
				{this.state.displayThreatreDecider==true?
					<>
						<DisplayThreatreDecider>
							<ul style={{padding:"20px"}}>
								<p> Would you like to share your screen right now? </p>
								<li style={{listStyle:"none",display:"inline-block"}}>
									<ul style={{padding:"0px"}}>
										<li onClick={()=>this.startScreenRecording()} style={ButtonCSS}>
											Yes
										</li>
										<li style={ButtonCSS}
											onClick={()=>this.setState({
												displayThreatreDecider:false,
												displayTheatreMode:false,
												displayTheatreChatContainer:false
											})}
										>
											No
										</li>
									</ul>
								</li>
							</ul>
						</DisplayThreatreDecider>
						<ShadowContainer
							onClick={()=>this.setState({
											displayThreatreDecider:false,
											displayTheatreMode:false,
											displayTheatreChatContainer:false
										})}
						/>
					</>:
					<ul>
						<li style={{listStyle:"none",marginBottom:"2%"}}>
							<video id="screenRecorder" width="90%" height="70%" autoplay="true" controls muted>
							</video>
							{this.state.displayTheatreChatContainer && (
								<ThreatreChatContainer>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<MinimizeChatContainerButton>
												<NavigateBeforeIcon
													style={{borderRadius:"50%",boxShadow:"1px 1px 5px #dbdddf",fontSize:30}}
												/>
											</MinimizeChatContainerButton>
										</a>
										<ul style={{pading:"0px"}}>
											<li style={{listStyle:"none",overflowX:"scroll",overflowY:"scroll",height:"10%",marginBottom:"2%"}}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block"}}>
														Chats:
													</li>
													{this.state.currentParticipants.map(data=>
														<li style={ButtonCSS}>
															Test again
														</li>
													)}
												</ul>
											</li>
											<li style={{listStyle:"none"}}>
												<ChatContainer>
													{this.state.chatMessage.map(data=>
														<ul style={{padding:"0px"}}>
															<li style={{position:"relative",listStyle:"none",display:"inline-block",top:"-135px",marginRight:"2%"}}>
																<ChatImageContainer/>
															</li>
															<li style={{listStyle:"none",display:"inline-block",width:"75%"}}>
																<p style={{fontSize:"15px"}}> 
																	<b> Nathan Grant </b>
																</p>
																<p>
																	Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
																	sed do eiusmod tempor incididunt ut labore et dolore magna 
																	aliqua. Ut enim ad minim veniam, quis nostrud exercitation
																	ullamco laboris nisi ut aliquip ex ea commodo consequat. 
																	Duis aute irure dolor in reprehenderit in voluptate velit esse
																	cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
																	cupidatat non proident, sunt in culpa qui officia deserunt mollit
																	anim id est laborum.
																</p>
															</li>
														</ul>
													)}
												</ChatContainer>
											</li>
											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li style={{listStyle:"none",width:"95%"}}>
													<ul style={{padding:"0px"}}>
														<li style={{width:"85%",listStyle:"none",display:"inline-block"}}>
															<InputContainer/>
														</li>
														<li style={SendButton}>
															Send
														</li>
													</ul>
												</li>
											</a>
										</ul>
								</ThreatreChatContainer>
							)}

							{this.state.displayThreatreMemberOptionsContainer && (
									<MemebersInformationContainer>
										<ul style={{padding:"20px"}}>
											<li style={{listStyle:"none"}}>
												<a href="javascript:void(0);" style={{textDecoration:"none"}}>
													<MinimizeChatContainerButton>
														<NavigateBeforeIcon
															style={{borderRadius:"50%",boxShadow:"1px 1px 5px #dbdddf",fontSize:30}}
														/>
													</MinimizeChatContainerButton>
												</a>
											</li>
											<li style={{listStyle:"none"}}>
												<ul style={{paddingg:"0px"}}>
													{this.state.currentParticipants.map(data=>
														<li style={{listStyle:"none"}}>
															<ul style={{padding:"0px"}}>
																<li style={{listStyle:"none",display:"inline-block"}}>
																	<MemberOptionsProfileContainer/>
																</li>
																<li style={{listStyle:"none",display:"inline-block",marginLeft:"10%"}}>
																	<ul style={{padding:"0px"}}>
																		<li style={{listStyle:"none"}}>
																			<b>Nathan</b>
																		</li>
																		<li style={{listStyle:"none"}}>
																			<ul style={{padding:"0px"}}>
																				{this.state.isGroupCallOwner &&(
																					<>
																						<li style={{listStyle:"none",display:"inline-block"}}>
																							<MicIcon
																								style={{fontSize:30}}
																							/>
																						</li>
																						<li style={{listStyle:"none",display:"inline-block"}}>
																							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																								<li onClick={()=>this.kickOutMemeberAction()} style={{listStyle:"none",marginBottom:"10%"}}>
																									<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-hand-stop" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
																									  <path stroke="none" d="M0 0h24v24H0z"/>
																									  <path d="M8 13.5v-8a1.5 1.5 0 0 1 3 0v6.5m0 -6.5v-2a1.5 1.5 0 0 1 3 0v8.5m0 -6.5a1.5 1.5 0 0 1 3 0v6.5m0 -4.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1 -6 6h-2a7 6 0 0 1 -5 -3l-2.7 -5.25a1.4 1.4 0 0 1 2.75 -2l.9 1.75" />
																									</svg>
																								</li>
																							</a>
																						</li>
																					</>
																				)}
																			</ul>
																		</li>
																	</ul>
																</li>
															</ul>
															<hr/>
														</li>
													)}
												</ul>
											</li>
										</ul>
									</MemebersInformationContainer>
							)}


							
						</li>

						<li style={{listStyle:"none"}}>
							<ul style={{padding:"0px"}}>
								<div id="screenRecorderDIV"> 
									{this.state.currentParticipants.map(data=>
										{this.createVideoElementsThreatrePage(data)}
									)}
								</div>
							</ul>
						</li>
					</ul>

				}
			</ul>

		}
		<VideoCallOptionsContainer>
			<ul style={{padding:"0px"}}>
				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li style={{listStyle:"none",marginBottom:"40%"}}>
						<p style={{fontSize:"30px",color:"#FFFFFF"}}>
							<b>x</b>
						</p>
					</li>
				</a>
				<hr/>

				{this.state.displayTheatreMode && (
					<>
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<li onClick={()=>this.stopScreenRecording()} style={{listStyle:"none",marginBottom:"10%"}}>
								<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-hand-stop" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
								  <path stroke="none" d="M0 0h24v24H0z"/>
								  <path d="M8 13.5v-8a1.5 1.5 0 0 1 3 0v6.5m0 -6.5v-2a1.5 1.5 0 0 1 3 0v8.5m0 -6.5a1.5 1.5 0 0 1 3 0v6.5m0 -4.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1 -6 6h-2a7 6 0 0 1 -5 -3l-2.7 -5.25a1.4 1.4 0 0 1 2.75 -2l.9 1.75" />
								</svg>
							</li>
						</a>
						<hr/>
					</>
				)}

				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>this.displayChatContainer()} style={{listStyle:"none",marginBottom:"10%"}}>
						{this.state.lastTimeCheckedChatCounter!=this.state.chatMessage.length && (
							<NewChatNotification>
								1 
							</NewChatNotification>
						)}
	
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
						  <path stroke="none" d="M0 0h24v24H0z"/>
						  <path d="M4 21v-13a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-9l-4 4" />
						  <line x1="8" y1="9" x2="16" y2="9" />
						  <line x1="8" y1="13" x2="14" y2="13" />
						</svg>
					</li>
				</a>
				<hr/>
				

				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>this.setState({
									displayThreatreDecider:true,
									displayTheatreMode:true	
								})} style={{listStyle:"none",marginBottom:"10%"}}>
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-tv" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
						  <path stroke="none" d="M0 0h24v24H0z"/>
						  <rect x="3" y="7" width="18" height="13" rx="2" />
						  <polyline points="16 3 12 7 8 3" />
						</svg>
					</li>
				</a>
				<hr/>
				

				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li style={{listStyle:"none",marginBottom:"10%"}}>
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-friends" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#FFFFFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
						  <path stroke="none" d="M0 0h24v24H0z"/>
						  <circle cx="7" cy="5" r="2" />
						  <path d="M5 22v-5l-1-1v-4a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4l-1 1v5" />
						  <circle cx="17" cy="5" r="2" />
						  <path d="M15 22v-4h-2l2 -6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1l2 6h-2v4" />
						</svg>
					</li>
				</a>
				<hr/>


			</ul>
		</VideoCallOptionsContainer>
	</Container>
		)
	}
}


const mapStateToProps=(state)=>{
	return{
		personalInformation:state.personalInformation
	}
}

export default connect(
	mapStateToProps,
	null
)(GroupVideoCall);