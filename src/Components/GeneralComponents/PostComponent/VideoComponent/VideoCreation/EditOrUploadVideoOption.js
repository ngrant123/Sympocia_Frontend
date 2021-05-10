import React,{Component} from "react";
import styled from "styled-components";
import PublishIcon from '@material-ui/icons/Publish';
import CameraFrontIcon from '@material-ui/icons/CameraFront';
import EditVideoModal from "./EditVideoModal.js";


const VideoContainer=styled.div`
	@media screen and (max-width:1370px){
		width:80%;
		#videoElement{
			margin-left:10% !important;
			height:50% !important;
		}
		#videoUploadOption{
			margin-left:20% !important;
		}
	}
	@media screen and (max-width:650px){
		#editOrUploadOptionDiv{
			margin-left:15% !important;
		}

		#videoOptionsContainer{
			margin-top:10% !important;
		}
		#videoElement{
			margin-left:0% !important;
			height:50% !important;
		}
		#videoUploadOption{
			display:block !important;
			margin-bottom:10% !important;
		}
		#sideInformation{
			display:none !important;
		}
	}

	@media screen and (max-width:740px) and (max-height:420px){
	 	#sideInformation{
			display:none !important;
		}
    }
`;


class EditOrUploadVideoOption extends Component{


	constructor(props){
		super(props);
		this.state={
			displayEditVideoModal:false
		}
	}

	redoVideo=()=>{
		this.props.parentRedoVideo()
	}

	checkVideoLength=()=>{
		const video=document.getElementById("videoElement");
		let duration=video.duration;
		duration=Math.ceil(duration);
		if(duration>30){
			alert('The video is too long. As of right now we only support 30 sec videos that are below 50MB. Sorry for the inconvience.'+
			'We will redirect you to the upload screen after you close this window');
			this.props.closeAndRedoVideo();
		}else{
			this.setState({
				displayEditVideoModal:true
			})
		}
	}



	render(){
		return(
			<VideoContainer>
				{this.state.displayEditVideoModal==false?
					<ul id="editOrUploadOptionDiv" style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<video id="videoElement" width="100%" height="90%" controls autoplay>
									<source src={this.props.videoSrc} type="video/mp4"/>
								</video>
							</li>
							<li id="videoOptionsContainer" style={{listStyle:"none",marginTop:"-5%",marginBottom:"2%"}}>
									<ul style={{padding:"0px",marginTop:"5%"}}>
										{/*
											<li id="videoUploadOption" style={{position:"relative",listStyle:"none",display:"inline-block",marginRight:"5%",marginLeft:"25%"}}>
														<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																																			borderColor:"#5298F8",
																																			borderStyle:"solid",
																																			borderWidth:"1px",
																																			color:"white",
																																			backgroundColor:"#5298F8",
																																			boxShadow:"2px 10px 10px #b9d6ff"}}>
																<ul style={{padding:"0px"}}>
																	<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
																		<PublishIcon/>
																	</li>

																	<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"20px"}}>
																		Upload video
																	</li>
																</ul>	
														</button>
											</li>
										*/}

										<li id="videoUploadOption" style={{position:"relative",listStyle:"none",display:"inline-block"}} onClick={()=>this.checkVideoLength()}>
											<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={{	
																															borderColor:"#5298F8",
																															borderStyle:"solid",
																															borderWidth:"1px",
																															color:"white",
																															backgroundColor:"#5298F8",
																															boxShadow:"2px 10px 10px #b9d6ff"}}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
														<CameraFrontIcon/>
													</li>

													<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",fontSize:"20px"}}>
														Edit video
													</li>
												</ul>	
											</button>
										</li>
									</ul>
							</li>
						</ul>:
						<EditVideoModal
							videoSrc={this.props.videoSrc}
							redoVideo={this.redoVideo}
							isPhoneUIEnabled={this.props.isPhoneUIEnabled}
						/>
				}

			</VideoContainer>
		)
	}
}

export default EditOrUploadVideoOption;