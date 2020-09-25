import React,{Component} from "react";
import styled from "styled-components";
import PublishIcon from '@material-ui/icons/Publish';
import CameraFrontIcon from '@material-ui/icons/CameraFront';
import EditVideoModal from "./EditVideoModal.js";


const VideoContainer=styled.div`
	
`;

class EditOrUploadVideoOption extends Component{


	constructor(props){
		super(props);
		console.log(this.props.videoSrc);
		this.state={
			displayEditVideoModal:false
		}
	}

	redoVideo=()=>{
		this.props.parentRedoVideo()
	}


	render(){
		return(
			<React.Fragment>
				{this.state.displayEditVideoModal==false?
					<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<video width="100%" height="90%" controls autoplay>
									<source src={this.props.videoSrc} type="video/mp4"/>
								</video>
							</li>
							<li style={{listStyle:"none",marginTop:"-5%",marginBottom:"2%"}}>
									<ul style={{padding:"0px",marginTop:"5%"}}>
										<li style={{position:"relative",listStyle:"none",display:"inline-block",marginRight:"5%",marginLeft:"25%"}}>
							
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

										<li style={{position:"relative",listStyle:"none",display:"inline-block"}} onClick={()=>this.setState({displayEditVideoModal:true})}>
										
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
							<li style={{listStyle:"none",marginLeft:"20%"}}>
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
						</ul>:
						<EditVideoModal
							videoSrc={this.props.videoSrc}
							redoVideo={this.redoVideo}
						/>
				}

			</React.Fragment>
		)
	}
}

export default EditOrUploadVideoOption;