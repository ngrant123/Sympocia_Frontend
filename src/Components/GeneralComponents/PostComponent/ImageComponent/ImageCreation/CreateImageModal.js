import React,{Component} from "react";
import styled from "styled-components";
import {
		displayCamera,
		stopRecording,
		photo
	} from "../../CameraModal/Images/index.js";
import AddAlarmIcon from '@material-ui/icons/AddAlarm';
import CachedIcon from '@material-ui/icons/Cached';
import ForwardIcon from '@material-ui/icons/Forward';

const TakePicutreButton=styled.div`
	width:70px;
	height:70px;
	background-color:white;
	border-radius:50%;
	border-style:solid;
	border-width:2px;
	border-color:#5298F8;
`;

class CreateImageMdoal extends Component{
	constructor(props){
		super(props);
		this.state={
			displayContinueModal:false,
			imgData:"",
			firstTimeCameraUsage:true
		}
	}

	componentDidMount(){
		const video=document.getElementById("camera");
		displayCamera(video);
	}

	componentDidUpdate(){
		if(this.state.displayContinueModal==false){
			const video=document.getElementById("camera");
			displayCamera(video);
		}
	}

	displayCamera=(divElement)=>{
		debugger;
				const video=document.getElementById("camera");
				if (navigator.mediaDevices.getUserMedia) {
					  navigator.mediaDevices.getUserMedia({ video: true })
					    .then(function (stream) {
					      video.srcObject = stream;
					    })
				    .catch(function (error) {
				    });
				}	
	}

	handleTakeAPhoto=()=>{
		debugger;
		const videoCamera=document.getElementById("camera");
		const height=videoCamera.offsetHeight;
		const width=videoCamera.offsetWidth;
		this.setState({
			displayContinueModal:true,
			videoHeight:height,
			videoWidth:width,
			firstTimeCameraUsage:false
		},function(){
			debugger;
			const canvas=document.getElementById("canvas");
			photo(canvas,videoCamera,height,width);
			videoCamera.srcObject=null;
		})
	}

	handleContinueButton=()=>{
		debugger;
		const canvasElement=document.getElementById("canvas");
		const canvasData=canvasElement.toDataURL("image/png");
		this.props.handleNewlyCreatedImage(canvasData);
	}




	render(){
		return(
			<React.Fragment>
				{this.state.displayContinueModal==false?
					<React.Fragment>
						<video id="camera" height="100%" width="100%" autoplay="true">
													
						</video>
						<ul style={{marginLeft:"45%",padding:"10px",position:"absolute",top:"80%",width:"200px"}}>
							<li style={{listStyle:"none",display:"inline-block",marginRight:"10%"}}>
								<TakePicutreButton onClick={()=>this.handleTakeAPhoto()}/>
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								<AddAlarmIcon
									style={{fontSize:40,color:"#5298F8"}}
								/>
							</li>
						</ul>
					</React.Fragment>:
					<ul style={{padding:"0px"}}>
						<li style={{width:"60%",listStyle:"none",display:"inline-block",marginLeft:"2%",marginTop:"10%",marginRight:"2%"}}>
							<canvas id="canvas"  style={{width:"100%",height:"60%",border:"1px solid #d3d3d3",borderRadius:"5px"}}>

							</canvas>
						</li>

						<li style={{listStyle:"none",display:"inline-block"}}>
							<ul style={{padding:"0px",position:"absolute",top:"110px"}}>
								<li onClick={()=>this.setState({displayContinueModal:false})} style={{listStyle:"none",borderColor:"#5298F8",padding:"15px",marginBottom:"10%",borderRadius:"5px",
																																				borderStyle:"solid",
																																				borderWidth:"1px",
																																				color:"#5298F8",
																																				backgroundColor:"white"}}>
									<a style={{textDecoration:"none"}} href="javascript:;">	
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block"}}>
												<CachedIcon
													style={{fontSize:25}}
												/>
											</li>

											<li style={{listStyle:"none",display:"inline-block"}}>
												Retake
											</li>
										</ul>
									</a>
								</li>
								<li onClick={()=>this.handleContinueButton()}style={{listStyle:"none",borderColor:"#5298F8",padding:"15px",borderRadius:"5px",
																																				borderStyle:"solid",
																																				borderWidth:"1px",
																																				color:"#5298F8",
																																				backgroundColor:"white"}}>
									<a style={{textDecoration:"none"}} href="javascript:;">
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block"}}>
												<ForwardIcon
													style={{fontSize:25}}
												/>
											</li>

											<li style={{listStyle:"none",display:"inline-block"}}>
												Continue
											</li>
										</ul>
									</a>
								</li>
							</ul>
						</li>
					</ul>
				}
			</React.Fragment>
		)
	}
}

export default CreateImageMdoal;