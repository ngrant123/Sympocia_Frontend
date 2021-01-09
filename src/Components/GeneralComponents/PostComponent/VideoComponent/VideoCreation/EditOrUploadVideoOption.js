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
	@media screen and (max-width:420px){
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


	render(){
		return(
			<VideoContainer>
				{this.state.displayEditVideoModal==false?
					<ul style={{padding:"0px"}}>
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

										<li id="videoUploadOption" style={{position:"relative",listStyle:"none",display:"inline-block"}} onClick={()=>this.setState({displayEditVideoModal:true})}>

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
							{/*
								<li id="sideInformation" style={{listStyle:"none",marginLeft:"20%"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",width:"30%",marginRight:"10%",color:"#a6a6a6"}}>
											Already finished with your video? Thats great. 
											Upload it so that people can finall see it and appreciate your talent
										</li>

										<li style={{listStyle:"none",display:"inline-block",width:"30%",color:"#a6a6a6"}}>
											We understand that your video might not be ready yet. Click here to add a caption,
											description, or even edit your video. Lets make it perfect

										</li>
									</ul>

								</li>
							*/}
						</ul>:
						<EditVideoModal
							videoSrc={this.props.videoSrc}
							redoVideo={this.redoVideo}
						/>
				}

			</VideoContainer>
		)
	}
}

export default EditOrUploadVideoOption;