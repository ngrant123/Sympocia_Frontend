import React,{Component} from "react";
import styled from "styled-components";
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import DescriptionIcon from '@material-ui/icons/Description';

const TextContainerDescription=styled.textarea`
	height:30%;
	resize:none;
	border-style:none;
	color:#e4e9eb;
	border-style:solid;
	border-radius:5px;
	border-width:1px;
	border-color:#d7dadb;
	width:120%;
`;

const TextContainerCaption=styled.textarea`
	height:20%;
	resize:none;
	border-style:none;
	color:#e4e9eb;
	border-style:solid;
	border-radius:5px;
	border-width:1px;
	border-color:#d7dadb;
	width:120%;
`;

class EditVideoModal extends Component{


	constructor(props){
		super(props);

		this.state={

		}
	}

	render(){

		return(
			<React.Fragment>
				<ul style={{padding:"0px"}}>
					<li style={{listStyle:"none",display:"inline-block",marginRight:"15%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",marginBottom:"4%"}}>
										<ul style={{padding:"0px",width:"110%"}}>
											<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
												<img src="" style={{borderRadius:"50%",width:"90px",height:"100px"}}/>
											</li>

											<li style={{listStyle:"none",display:"inline-block",fontSize:"25px",color:"#5e5e5e"}}>
												<b>Edit Video</b>
											</li>
										</ul>		
							</li>

							<li style={{listStyle:"none",paddingTop:"3%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{position:"relative",listStyle:"none",display:"inline-block"}}>
										<SubtitlesIcon
											style={{ fontSize: 20 }}
										/>
									</li>

									<li style={{listStyle:"none",display:"inline-block",fontSize:"15px"}}>
										Title for video (optional)
									</li>

								</ul>

							</li>

							<li style={{listStyle:"none"}}>
								<TextContainerCaption
											placeholder="Write a title for your video"
									/>

							</li>
							<li style={{color:"#5298F8"}}>
								You will be able to edit this title at any point later
							</li>

							<li style={{listStyle:"none",paddingTop:"3%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{position:"relative",listStyle:"none",display:"inline-block"}}>
										<DescriptionIcon
											style={{ fontSize: 20 }}
										/>
									</li>

									<li style={{listStyle:"none",display:"inline-block",fontSize:"15px"}}>
										Enter a description for your video (optional)
									</li>
								</ul>
							</li>

							<li style={{listStyle:"none",fontSize:"15px"}}>
										<TextContainerDescription
											placeholder="Write a description about your video"
										/>
							</li>
							<li style={{listStyle:"none",color:"#5298F8"}}>
								You will be able to edit this description at any point later
							</li>
						</ul>
					</li>
		
					<li style={{position:"relative",listStyle:"none",display:"inline-block",width:"30%",top:"-280px"}}>
						
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none"}}>
									<video width="100%" height="50%" controls autoplay>
										<source src={this.props.videoSrc} type="video/mp4"/>
									</video>
								</li>
						</ul>
						
					</li>
				</ul>

			</React.Fragment>

		)
	}
}

export default EditVideoModal;