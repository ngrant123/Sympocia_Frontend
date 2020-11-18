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

	@media screen and (max-width:1020px), screen and (max-height:1370px){
        #smallPostLI{
			width:200px !important;
			margin-right:10% !important;
		}
    }

	@media screen and (max-width:770px){
		#smallPostLI{
			width:200px !important;
			margin-right:10% !important;
		}
		#parentLISmallPostContainer{
				width:150% !important;
		}
    }

	@media screen and (max-width:420px){
		#smallPostLI{
			width:300px !important;
		}
	}

	@media screen and (max-width:380px){
		#smallPostLI{
			width:40% !important;
		}
	}

	@media screen and (max-width:340px){
		#smallPostLI{
			width:37% !important;
			margin-right:5% !important;
		}
		#parentLISmallPostContainer{
			width:190% !important;

		}
    }

    @media screen and (max-width:740px) and (max-height:420px){
		#smallPostLI{
			width:35% !important;
			margin-left:3% !important;
		}
    }

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
														id="noPostsModalContainer"
														postType={"image"}
														profilePageType={this.props.profile}
													  />:
														<ul style={{padding:"0px"}}>
															{this.props.imageData.crownedImage==null?
																null:
																<React.Fragment>
																	<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																		<li style={{listStyle:"none",marginBottom:"-5%"}}
																				 onClick={()=>this.displayPostModal(	
																				 			postDisplayModal,
																							companyPostDisplayModal,
																							postsConsumer,
																							this.props.imageData.crownedImage)}>
																			<CrownedImageContainer
																				imageData={this.props.imageData.crownedImage}
																			/>
																		</li>
																	</a>
																	<hr/>
																</React.Fragment>
															}	
															<li id="parentLISmallPostContainer" style={{listStyle:"none",marginTop:"3%"}}>
																{this.props.imageData.images.map(data=>
																	<li id="smallPostLI" onClick={()=>this.displayPostModal(	
																											postDisplayModal,
																											companyPostDisplayModal,
																											postsConsumer,
																											data)} 
																		style={{listStyle:"none",display:"inline-block",marginRight:"5%",marginBottom:"20%"}}>
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