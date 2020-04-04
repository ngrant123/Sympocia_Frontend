import React,{Component} from "react";
import styled from "styled-components";
import {UserConsumer} from "../../../UserContext.js";
import NoImagesModal from "./NoImagesModal.js";

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

	render(){
		return(
			<UserConsumer>
				{personalInformation=>{
					return <Container>
						{personalInformation.isLoading==true?
								<p>Give us a second we're getting your information</p>:
								<React.Fragment>
								{personalInformation.images.length==0?<NoImagesModal/>:
										<ul style={{padding:"0px"}}>	
											{personalInformation.images.map(data=>
												<li style={{listStyle:"none",display:"inline-block",marginRight:"5%",marginBottom:"5%"}}>
													<ImageContainer>
														<ul style={{padding:"0px"}}>	
															<li style={{listStyle:"none"}}>
																<Image>
																	<img src={data.imgUrl} style={{height:"100%",width:"100%"}}/>
																</Image>
															</li>

															<li style={{listStyle:"none",marginBottom:"5%"}}>
																
																<ImageCaption>
																	{data.caption}
																</ImageCaption>
															</li>

															<li style={{listStyle:"none"}}>
																<ul style={{padding:"0px"}}>
																	<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
																		Likes 
																	</li>

																	<li style={{listStyle:"none",display:"inline-block",marginRight:"24%"}}>
																		Comments
																	</li>

																	<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",color:"#C8B0F4"}}>
																		{data.datePosted}
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
				}}
			</UserConsumer>
		)
	}
}

export default ImagePostsContainer;