import React,{Component} from "react";
import styled from "styled-components";
import NoPostsModal from "../NoPostsModal.js";
import {PostDisplayConsumer} from "../../../PostDisplayModalContext.js";
import EditIcon from '@material-ui/icons/Edit';
import {CompanyPostDisplayConsumer} from "../../../../CompanyProfile/CompanyProfilePostsDisplayContext.js";
import CrownedImageContainer from "./CrownedImageContainer.js";
import SmallImageContainer from "./SmallImageContainer.js";
import {PostConsumer} from "../PostsContext.js";
const Container=styled.div`
	position:absolute;
	width:95%;
	height:95%;
`;

const ImageContainer=styled.div`
	position:relative;
	width:190px;
	height:30%;
`;

const Image=styled.div`
	width:100%;
	height:75%;
	background-color:black;
	border-radius:5px;
	overflow:hidden;
`;

const VideoDesriptionContainer=styled.div`
	position:absolute;
	width:30%;
	height:30%;
	border-radius:50%;
	top:70%;
	left:2%;
	z-index:8;
`;

const AudioDescriptionContainer=styled.div`
	width:20px;
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
		console.log(this.props);
		const profileImages=this.props.imageData;
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

	displayPostModal=(profileAction,companyAction,postsConsumer,data)=>{
		console.log(data);
		if(profileAction==null)
			companyAction.handleImagePostModal(data,postsConsumer);
		else
			profileAction.handleImagePostModal(data,postsConsumer);
	}

	render(){
		return(
			<PostConsumer>
				{postsConsumer=>(
					<PostDisplayConsumer>
						{postDisplayModal=>(
							<CompanyPostDisplayConsumer>
								{companyPostDisplayModal=>(
									<Container>
										{this.props.isLoading==true?
												<p>Give us a second we're getting your information</p>:
												<React.Fragment>
												{this.props.imageData.images.length==0 &&
													this.props.imageData.crownedImage==null?
													<NoPostsModal
														postType={"image"}
														profilePageType={this.props.profile}
													  />:
														<ul style={{padding:"0px"}}>
															{this.props.imageData.crownedImage==null?
																null:
																<React.Fragment>
																	<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																		<li onClick={()=>this.displayPostModal(	postDisplayModal,
																												companyPostDisplayModal,
																												postsConsumer,
																												this.props.imageData.crownedImage)}  
																												style={{listStyle:"none",marginBottom:"-5%"}}>
																			<CrownedImageContainer
																				imageData={this.props.imageData.crownedImage}
																			/>
																		</li>
																	</a>
																	<hr/>
																</React.Fragment>
															}	
															<li style={{listStyle:"none"}}>
																{this.props.imageData.images.map(data=>
																	<li onClick={()=>this.displayPostModal(	postDisplayModal,
																											companyPostDisplayModal,
																											postsConsumer,
																											data)} style={{listStyle:"none",display:"inline-block",marginRight:"5%",marginBottom:"20%"}}>
																		<a href="javascript:;" style={{textDecoration:"none"}}>
																			<SmallImageContainer
																				data={data}
																			/>
																		</a>
																	</li>
																)}
															</li>
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
					)}
			</PostConsumer>
		)
	}
}

export default ImagePostsContainer;