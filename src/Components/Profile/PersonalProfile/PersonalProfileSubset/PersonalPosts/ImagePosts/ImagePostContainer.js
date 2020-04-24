import React,{Component} from "react";
import styled from "styled-components";
import NoPostsModal from "../NoPostsModal.js";

const Container=styled.div`
	position:absolute;
	width:95%;
	height:95%;
`;


const ImageContainer=styled.div`
	position:relative;
	width:230px;
	height:35%;
`;

const Image=styled.div`
	width:100%;
	height:75%;
	background-color:black;
	border-radius:5px;
	overflow:hidden;
`;

const ImageCaption=styled.div`
	width:100%;
	height:15%;
	overflow:hidden;
	color:#767677;
`;


class ImagePostsContainer extends Component{

	constructor(props){
		super(props);
		console.log("Testing images requests");
		this.state={
		 	images:[
		 		{},
		 		{},
		 		{},
		 		{}
		 	]
		}
	}

	constructDate=(date)=>{
		var convertedDate=new Date(parseInt(date));
		var dateToString=convertedDate.toString();
		var current=new Date();

		//work on this a little more
		return dateToString;

	}

	render(){
		return(
				<Container>
						{this.props.personalInformation.isLoading==true?
								<p>Give us a second we're getting your information</p>:
								<React.Fragment>
								{this.props.personalInformation.userProfile.imagePost.length==0 ||
									this.props.personalInformation.userProfile.imagePost.length==null?<NoPostsModal
																		postType={"image"}
																		profilePageType={this.props.profile}
																	  />:
										<ul style={{padding:"0px"}}>	
											{this.props.personalInformation.userProfile.imagePost.map(data=>
												<li style={{listStyle:"none",display:"inline-block",marginRight:"5%",marginBottom:"9%"}}>
													<ImageContainer>
														<ul style={{padding:"0px"}}>	
															<li style={{listStyle:"none"}}>
																<Image>
																	<img src={data.imgUrl} style={{height:"100%",width:"100%"}}/>
																</Image>
															</li>
															{data.caption!=""?
																<li style={{listStyle:"none",marginBottom:"5%"}}>
																
																	<ImageCaption>
																		{data.caption}
																	</ImageCaption>
																</li>:<React.Fragment></React.Fragment>
															}

															<li style={{listStyle:"none"}}>
																<ul style={{padding:"0px"}}>
																	<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
																		Likes 
																	</li>

																	<li style={{listStyle:"none",display:"inline-block",marginRight:"24%"}}>
																		Comments
																	</li>

																	<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",color:"#C8B0F4"}}>
																		{this.constructDate(data.datePosted)}
																	</li>
																</ul>
															</li>
														</ul>
													</ImageContainer>
												</li>
											)}
										</ul>
								}
								</React.Fragment>
							}
					</Container>
		)
	}
}

export default ImagePostsContainer;