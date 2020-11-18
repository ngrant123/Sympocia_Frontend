import React,{Component} from "react";
import styled from "styled-components";

const Container=styled.div`
	position:relative;
	width:100%;
	height:40%;

`;

const PlayListContainer=styled.div`
	position:relative;
	width:90%;
	height:90%;
	background-color:white;
	padding:10px;
	border-radius:5px;
`;

const Video=styled.div`
	position:relative;
	width:300px;
	height:90%;
	background-color:blue;
	border-radius:5px;
`;

const VideoDescriptionContainer=styled.div`
	width:80%;

`;

class PlayListContents extends Component{



	constructor(props){
		super(props);

		this.state={
			tempVideos:[{},{},{}]
		}
	}




	render(){

		return(
			<Container>

				<ul style={{position:"relative",left:"13%",width:"80%"}}>
					{this.state.tempVideos.map(data=>

						<li style={{listStyle:"none",marginBottom:"5%"}}>
							<PlayListContainer>
								<ul style={{padding:"0px"}}>	
									<li style={{listStyle:"none",display:"inline-block"}}>
										<Video/>

									</li>

									<li style={{listStyle:"none",display:"inline-block"}}>
										<ul style={{position:"absolute",top:"5%"}}>
											<li style={{listStyle:"none",marginBottom:"10px"}}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block",fontSize:"35px",marginRight:"10%",marginBottom:"20px"}}>
											
															Enjoy my video you plebians
													</li>

													<li style={{listStyle:"none",padding:"0px"}}>
														<ul style={{padding:"0px"}}>
															<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",color:"#a0a0a0",marginRight:"10px"}}>
																128,154 views 
															</li>

															<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",color:"#a0a0a0"}}>
																3 days ago
															</li>

														</ul>
													</li>

												</ul>
											</li>

											<li style={{listStyle:"none"}}>
												<VideoDescriptionContainer>
													Lorem ipsum dolor sit amet, consectetur adipiscing elit, s
													ed do eiusmod tempor incididunt ut labore et dolore magna 
													aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
													ullamco laboris nisi ut aliquip ex ea commodo consequat.
												</VideoDescriptionContainer>
											</li>

										</ul>
									</li>
								</ul>


							</PlayListContainer>
						</li>

						)
					}
				</ul>




			</Container>


		)
	}
}


export default PlayListContents;