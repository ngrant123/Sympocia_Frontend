import React,{Component} from "react";
import styled from "styled-components";

const SympociaStampIconContainer=styled.div`
	position:relative;
	border-radius:50%;
	width:65%;
	height:25%;
	background-color:red;
`;

const CreatePostContainer=styled.div`
	padding:15px;
	width:60%;
	border-radius:5px;
	transition:.8s;

	&:hover{
		box-shadow:1px 1px 5px #9395a0;
	}
`;

const RecommendedImagesContainer=styled.div`
	position:relative;
	padding:15px;
	border-radius:5px;
	transition:.8s;
	&:hover{
		box-shadow:1px 1px 5px #9395a0;
	}
`;


const RecommendedImage=styled.div`
	 position:relative;
	 width:110px;
	 height:100px;
	 border-radius:5px;
	 background-color:red;
`;




class NoImagesModal extends Component{

	constructor(props){
		super(props);

		this.state={
			recommendedImage:[{},{},{},{},{},{},{},{},{}]
		}
	}

	render(){

		return(
			<React.Fragment>
				<p>Currently there are no videos available here</p>
				<ul style={{padding:"0px"}}>
					<li style={{listStyle:"none",display:"inline-block"}}>
						<CreatePostContainer>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",marginLeft:"20%",marginBottom:"2%"}}>
									<SympociaStampIconContainer/>
								</li>
								<p style={{fontSize:"20px",marginLeft:"10%"}}> Upload a picture of your own to get started</p>
								<p>Show people your story through images and start sharing your story to others </p>
								<li style={{marginLeft:"25%",listStyle:"none",display:"inline-block",padding:"5px",color:"white",backgroundColor:"#C8B0F4",borderRadius:"5px",padding:"5px"}}>
									Upload an image
								</li>
							</ul>
						</CreatePostContainer>
					</li>

					<li style={{position:"absolute",top:"0%",listStyle:"none",display:"inline-block",marginLeft:"-15%"}}>	
						<RecommendedImagesContainer>
							<ul style={{position:"relative",padding:"0px"}}>
									<p style={{fontSize:"20px"}}>
										<b>Recommended Image</b>
								    </p>
									<p style={{color:"#999999"}}>Since we noticed that this profile doesnt have any images here are 
										a list of recommended images that we could find 
									</p>

									<li style={{listStyle:"none"}}>
										<ul style={{padding:"0px"}}>
											{this.state.recommendedImage.map(data=>
												<li style={{listStyle:"none",display:"inline-block",marginRight:"3%",marginBottom:"2%"}}>
													<RecommendedImage>

													</RecommendedImage>
												</li>

											)}
										</ul>

									</li>
							</ul>
						</RecommendedImagesContainer>
						
					</li>
				</ul>

			</React.Fragment>
		)
	}
}

export default NoImagesModal;