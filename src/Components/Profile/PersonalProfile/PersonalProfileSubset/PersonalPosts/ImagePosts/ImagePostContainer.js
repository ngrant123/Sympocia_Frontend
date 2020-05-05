import React,{Component} from "react";
import styled from "styled-components";
import NoPostsModal from "../NoPostsModal.js";
import {PostDisplayConsumer} from "../../../PostDisplayModalContext.js";
import EditIcon from '@material-ui/icons/Edit';
import {CompanyPostDisplayConsumer} from "../../../../CompanyProfile/CompanyProfilePostsDisplayContext.js";

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

const IndustryButtonCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	listStyle:"none",
	padding:"5px",
	borderRadius:"5px"
}


class ImagePostsContainer extends Component{

	constructor(props){
		super(props);
		console.log("Testing images requests");
		console.log(props);
		this.state={
		 	images:[]
		}
	}

	componentDidMount(){
		const profileImages=this.props.personalInformation.userProfile.imagePost;
		this.setState({
			images:profileImages
		})
	}

	constructDate=(date)=>{
		var convertedDate=new Date(parseInt(date));
		var dateToString=convertedDate.toString();
		var current=new Date();

		//work on this a little more
		return dateToString;

	}

	displayPostModal=(profileAction,companyAction,data)=>{
		if(profileAction==null)
			companyAction.handleImagePostModal(data);
		else
			profileAction.handleImagePostModal(data);
	}

	render(){
		return(
			<PostDisplayConsumer>
				{postDisplayModal=>(
					<CompanyPostDisplayConsumer>
						{companyPostDisplayModal=>(
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
														<li onClick={()=>this.displayPostModal(postDisplayModal,companyPostDisplayModal,data)} style={{listStyle:"none",display:"inline-block",marginRight:"5%",marginBottom:"9%"}}>
															<a href="javascript:;" style={{textDecoration:"none"}}>
																<ImageContainer>
								
																	<ul style={{padding:"0px"}}>	
																		<li style={{listStyle:"none"}}>
																			<Image>
																				<EditIcon
																					style={{position:"absolute",fontSize:35,color:"white"}}
																				/>
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
																				<li style={IndustryButtonCSS}>
																					{data.industriesUploaded[0].industry}					
																				</li>
																			</ul>
																		</li>
																	</ul>
																</ImageContainer>
															</a>
														</li>
													)}
												</ul>
										}
										</React.Fragment>
									}
							</Container>
							)
						}
					</CompanyPostDisplayConsumer>
				)}
				</PostDisplayConsumer>
		)
	}
}

export default ImagePostsContainer;