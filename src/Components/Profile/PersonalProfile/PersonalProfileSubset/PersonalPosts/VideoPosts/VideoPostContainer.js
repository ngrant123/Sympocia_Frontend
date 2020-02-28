import React,{Component} from "react";
import styled from "styled-components";

const Container=styled.div`
	position:absolute;
	width:95%;
	height:80%;
`;

const ThumbnailVideoComponent=styled.div`
	position:relative;
	width:100%;
	height:45%;
	overflow:hidden;
`;
const ThumbnailVideo=styled.div`
	position:relative;
	width:450px;
	height:100%;
	background-color:blue;
	border-radius:5px;
`;

const Description=styled.div`
	position:absolute;
	width:85%;
	height:240%;
	overflow:hidden;
	color:#767677;

`;
const SmallVideoComponent=styled.div`
	position:relative;
	width:250px;
	height:50%;
`;

const SmallVideo=styled.div`

	position:relative;
	height:65%;
	width:100%;
	background-color:red;
	border-radius:5px;
`;



class VideoPostsContainer extends Component{


	constructor(props){
		super(props);
		this.state={
			videos:[
				{},{},{},{},{},{}
			],
			firstVideo:{}
		}
	}

	componentDidMount(){


	}

	
	render(){
		return(

			<Container>
				<ul style={{padding:"0px"}}>
					<li style={{listStyle:"none"}}>
						<ThumbnailVideoComponent>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block",marginRight:"1%"}}>
									<ThumbnailVideo/>
								</li>

								<li style={{position:"absolute",top:"0%",listStyle:"none",display:"inline-block"}}>
									<ul style={{paddging:"0px"}}>
										<li style={{marginBottom:"5px",listStyle:"none",padding:"5px",width:"50%",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",color:"#5298F8",backgroundColor:"white",borderRadius:"5px"}}>
											Testing

										</li>
										<li style={{listStyle:"none",marginRight:"5%",marginBottom:"5px"}}>
											<b> Test main video description container with this components </b>
										</li>

										<li style={{listStyle:"none",marginBottom:"5px"}}>
											<ul style={{padding:"0px",color:"#a6a6a7"}}>
												<li style={{listStyle:"none",display:"inline-block",marginRight:"10%"}}>
													20,000 views
												</li>

												<li style={{listStyle:"none",display:"inline-block"}}>
													6 days ago
												</li>

											</ul>

										</li>

										<li style={{listStyle:"none"}}>
											<Description>
												Lorem ipsum dolor sit amet, consectetur adipiscing elit,
												 sed do eiusmod tempor incididunt ut labore et dolore 
												 magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
												  ullamco laboris nisi ut aliquip ex ea commodo consequat. 
												  Duis aute irure dolor in reprehenderit in voluptate velit 
												  esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
												   occaecat cupidatat non proident, sunt in culpa qui officia 
												   deserunt mollit anim id est laborum.

											</Description>

										</li>
									</ul>
								</li>
							</ul>

						</ThumbnailVideoComponent>
					</li>

					<li style={{listStyle:"none",marginTop:"5%"}}>	
						<ul style={{padding:"0px"}}>
							{this.state.videos.map(data=>
								<li style={{listStyle:"none",display:"inline-block",marginRight:"1%",marginBottom:"5%"}}>
									<SmallVideoComponent>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none"}}>
												<SmallVideo/>
											</li>

											<li style={{listStyle:"none",fontSize:"15px"}}>
												<b> Title of small video  Title of small video  </b>
											</li>

											<li style={{listStyle:"none"}}>
												Nathan Grant
											</li>

											<li style={{listStyle:"none"}}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block",marginRight:"10%"}}>
														127k views
													</li>

													<li style={{listStyle:"none",display:"inline-block"}}>
														6 days ago
													</li>
												</ul>
											</li>

											<li style={{listStyle:"none",padding:"5px",width:"50%",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",color:"#5298F8",backgroundColor:"white",borderRadius:"5px"}}>
												Industry Button
											</li>


									
										</ul>

									</SmallVideoComponent>
								</li>
							)}
						</ul>
					</li>
				</ul>

			</Container>


		)
	}
}

export default VideoPostsContainer;