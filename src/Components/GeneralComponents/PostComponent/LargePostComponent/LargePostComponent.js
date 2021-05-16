import React,{Component} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import RegularPostCreation from "../RegularPostComponent/RegularPostCreation/index.js";
import VideoPostCreation from "../VideoComponent/VideoCreation/index.js";
import ImagePostCreation from "../ImageComponent/ImageCreation/index.js";
import BlogPostCreation from "../BlogComponent/BlogPostCreation/index.js";
import PERSONAL_INDUSTRIES from "../../../../Constants/personalIndustryConstants.js";
import COMPANY_INDUSTRIES from "../../../../Constants/industryConstants.js";

import {PostProvider} from "../PostContext.js";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";

const Container=styled.div`
	position:fixed;
	z-index:35;
	background-color:white;
	border-radius:5px;
	top:20%;
	width:50%;
	left:30%;
	height:60%;
	padding:30px;
	overflow:hidden;

   @media screen and (max-width:1030px) and (max-height:1370px){
    	top:20% !important;
    	width:90% !important;
    	height:60% !important;
    	left:5% !important; 
    }

     @media screen and (max-width:740px) and (max-height:420px){
	 	#postOptionLI{
    		margin-bottom:5% !important;
    	}
    }

    @media screen and (max-width:770px){
    	top:20% !important;
    	width:100% !important;
		left:1% !important; 
		height:70% !important;
		overflow:scroll;
    }

    @media screen and (max-width:420px){
    	#postOptionLI{
    		display:block !important;
    		margin-bottom:5% !important;
    		height:20% !important;
    	}
    }
    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	#blogCreationButton{
    		margin-top:-15px !important;
    	}
    }

`;

const IndustryTypeContainer = styled.div`
	position:absolute;
	width:100%
	height:20%;
	overflow:hidden;

`;

const PostOptionsContainer = styled.div`
	position:absolute;
	width:100%;
	height:15%;
	top:85%;
	overflow:scroll;

	@media screen and (max-width:1030px){
 		top:65% !important;
 	}

	 @media screen and (max-width:420px){
    	top:10% !important;
    	height:90%;
    }

	@media screen and (max-width:740px) and (max-height:420px){
	 	margin-left:-10% !important;
	 	margin-bottom:10% !important;
	 	height:40% !important;
	 	top:20% !important;
    }
    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	top:30% !important;
    }


`;

 const PostContainer = styled.div`

 	position:absolute;
 	left:5%;
 	width:90%;
 	height:65%;
 	top:20%;
 	background-color:#f7f8ff;
 	border-style:solid;
 	border-width:2px 0px 2px 0px;
 	border-color:#e0e0e0;
 	z-index:6;

 	@media screen and (max-width:740px) and (max-height:420px){
	 	display:none !important;
    }

 	@media screen and (max-width:1030px){
 		height:40% !important;
 	}

 	@media screen and (max-width:420px){
    	display:none !important;
    	height:10% !important;
    }
    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	display:none;
    }
 `;

 const PostTextarea = styled.textarea`
 
 	position:absolute;
 	height:100%;
 	width:70%;
 	left:10px;
 	overflow:hidden;
 	resize:none;
 	padding:20px;
 	font-size:120%;
 	background-color:#f7f8ff;
 	border-style:none;
 	color:	#55557a;

 	@media screen and (max-width:1030){
 		height:60% !important;
 	}

 `;

 const ProfileContainer = styled.div`
 	position:absolute;
 	background-color:#f7f8ff;
 	height:90%;
 	width:25%;
 	top:2%;
 	border-radius:5px;
	transition:.8s;

 	&:hover{
 		background-color:#e3dced;

 	}
 `;

 const ViewProfileButton = styled.div`

 	position:absolute;
 	width:10%;
 	height:14%;
 	background-color:#5298F8;
 	top:15%;
 	z-index:2;
 	left:11%;
 	border-radius:5px;
 	text-align:center;
 	padding-top:1%;
 	color:white;
 	font-size:105%;
 	border-style:solid;
 	border-color:#1674f4;


 `;


 const PostOptionButton = styled.div`
 	position:relative;
 	height:70%;
 	width:100px;
 	background-color:#C8B0F4;
 	left:7%;
 	top:5%;
 	border-radius:5px;
 	color:	#f7f4f8;
 	text-align:center;
 	
 	@media screen and (max-width:1030px){
 		height:30% !important;
 	}

 	@media screen and (max-width:740px){
 		${({isPhoneUIEnabled})=>
 			isPhoneUIEnabled==true &&(
 				`background-color:white;
 				color:#C8B0F4;`
 			)
 		}
 	}
 	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	height:70% !important;
    	background-color:white;
 		color:#C8B0F4;
    }
 `;


const BlogOptionButton=styled(Link)`
	position:relative;
 	background-color:#C8B0F4;
 	left:7%;
 	top:5%;
 	border-radius:5px;
 	color:	#f7f4f8;
 	text-align:center;
 	padding:15px;
 	margin-top:2px;
 	top:15px;
 	text-decoration:none;

 	&:hover{
 		color:white;
 		border-style:none;
 		text-decoration:none;
 	}
 	@media screen and (max-width:740px){
 		${({isPhoneUIEnabled})=>
 			isPhoneUIEnabled==true &&(
 				`background-color:white;
 				color:#C8B0F4;`
 			)
 		}
 	}
 	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	height:70% !important;
    	background-color:white;
 		color:#C8B0F4;
 		top:0px;
    }
`;

  const ImageOptionButton = styled.div`

 	position:absolute;
 	height:70%;
 	width:15%;
 	background-color:#C8B0F4;
 	left:30%;
 	top:5%;
 	border-radius:5px;
 	color:	#f7f4f8;
 	text-align:center;

 `;


  const LocationOptionButton = styled.div`

 	position:absolute;
 	height:70%;
 	width:15%;
 	background-color:#C8B0F4;
 	left:53%;
 	top:5%;
 	border-radius:5px;
 	color:	#f7f4f8;
 	text-align:center;

 `;


  const SubmitOptionButton = styled.div`

 	position:absolute;
 	height:70%;
 	width:15%;
 	background-color:#C8B0F4;
 	left:75%;
 	top:5%;
 	border-radius:5px;
 	text-align:center;
 	color:	#f7f4f8;

 `;

 const ProfileImageContainer = styled.div`

 	position:absolute;
 	left:20%;
 	height:55%;
 	width:60%;
 	top:6%;
 	border-radius:50%;
 	background-color:blue;
 	border-style:solid;
	border-color:	#af9ad5;
 	z-index:2;
 `;

 const CompanyIconContainer = styled.div`

 	position:absolute;
 	left:12%;
 	height:60%;
 	width:80%;
 	border-radius:5px;
 	background-color:black;
 	z-index:2;
 	top:15%;


 `;

 const EmployeeTitleContainer = styled.div`

 	position:absolute;
 	width:50%;
 	height:17%;
 	top:65%;
 	left:25%;
 	color:	#af9ad5;
 	text-align:center;
 	font-size:135%;
 	border-style:solid;
 	border-color:	#dcdde8;
 	border-width:1px 0px 0px 0px;

 `;


const CompanyTitleContainer = styled.div`
	position:absolute;
 	width:50%;
 	height:17%;
 	top:85%;
 	left:25%;
 	border-radius:5px;
 	color:	#af9ad5;
 	text-align:center;
 	font-size:105%;
`;

const PostOptionCSS={
	listStyle:"none",
	display:"inline-block",
	padding:"0px",
	marginRight:"10%"
}

const BlogPostOptionCSS={
	listStyle:"none",
	display:"inline-block",
	padding:"0px",
	marginTop:"-10px",
	marginLeft:"5%"
}


/*
    Plz refactor this before I end my life u fuck
*/
class LargePostComponent extends Component{


	constructor(props){
		super(props);
		this.state={
			companyTitle:"CEO",
			companyName:"Razu",
			industries:PERSONAL_INDUSTRIES.INDUSTRIES,
			indicatorForPersonalOrCompanyPost:"profile",
			id:"",
			displayGeneralCreationModal:false
		};
	}
	
	componentDidMount(){
		if(this.props.postOption=="post"){
			
			this.setState({
				displayElement:<RegularPostCreation 
									displayProps={this.displayPostOptions}
									closeModal={this.props.closeModal}
                                    isPhoneUIEnabled={this.props.isPhoneUIEnabled}
								/>,
				id:this.props._id
			})
		}else if(this.props.postOption=="image"){
			
			this.setState({
				displayElement:<ImagePostCreation
									displayProps={this.displayPostOptions}
									closeModal={this.props.closeModal}
                                    isPhoneUIEnabled={this.props.isPhoneUIEnabled}
								/>,
				id:this.props._id
			})

		}else if(this.props.postOption=="video"){
			
			this.setState({
				displayElement:<VideoPostCreation 
									displayProps={this.displayPostOptions}
									closeModal={this.props.closeModal}
                                    isPhoneUIEnabled={this.props.isPhoneUIEnabled}
								/>,
				id:this.props._id
			})
		}else{
			this.setState({
				displayElement:this.originalScreen(),
				id:this.props._id
			})
		}
	}

	handleTextareaClick(){
		document.getElementById("posttextarea").value="";
	}

	handleChange(props){
		var industryValue=document.getElementById(props).innerHTML;
	}

	displayPostOptions=(props)=>{
		if(props=="RegularPost"){
			
			this.setState({
					displayElement:<RegularPostCreation 
										displayProps={this.displayPostOptions}
										closeModal={this.props.closeModal}
                                        isPhoneUIEnabled={this.props.isPhoneUIEnabled}
									/>
			})
		}else if(props=="ImagePosts"){
			
			this.setState({
					displayElement:<ImagePostCreation
										displayProps={this.displayPostOptions}
										closeModal={this.props.closeModal}
                                        isPhoneUIEnabled={this.props.isPhoneUIEnabled}
									/>
			})
		}else if(props=="VideoPosts"){
			
			this.setState({
					displayElement:<VideoPostCreation 
										displayProps={this.displayPostOptions}
										closeModal={this.props.closeModal}
                                        isPhoneUIEnabled={this.props.isPhoneUIEnabled}
									/>})

		}
	}

	originalScreen=()=>{
		this.setState({
			displayGeneralCreationModal:true	
		})
		return (
				<React.Fragment>
					<PostContainer>
						<PostTextarea id="posttextarea" onClick={()=>this.displayPostOptions("RegularPost")}>
							Order the post in according to recent, popular?
						</PostTextarea>
					</PostContainer>

					<PostOptionsContainer>
						<ul style={{padding:"0px",marginLeft:"10%",marginTop:"5px"}}>
							<li onClick={()=>this.setState({
											displayElement:<RegularPostCreation
																displayProps={this.displayPostOptions}
																closeModal={this.props.closeModal}
                                                                isPhoneUIEnabled={this.props.isPhoneUIEnabled}
															  />,
											displayGeneralCreationModal:false
										 })} 
								id="postOptionLI" style={PostOptionCSS}>
								<a href="javascript:void(0)" style={{textDecoration:"none"}}>
									<PostOptionButton isPhoneUIEnabled={this.props.isPhoneUIEnabled}>
										Post
									</PostOptionButton>
								</a>
							</li>
							{this.props.isPhoneUIEnabled==true &&(
								<hr/>
							)}

							<li  onClick={()=>this.setState({
														displayElement:<ImagePostCreation
																		displayProps={this.displayPostOptions}
																		closeModal={this.props.closeModal}
                                                                        isPhoneUIEnabled={this.props.isPhoneUIEnabled}
																		/>,
														displayGeneralCreationModal:false
													})} 
								id="postOptionLI" style={PostOptionCSS}>
								<a href="javascript:void(0)" style={{textDecoration:"none"}}>
									<PostOptionButton isPhoneUIEnabled={this.props.isPhoneUIEnabled}>
										Image
									</PostOptionButton>
								</a>
							</li>
							{this.props.isPhoneUIEnabled==true &&(
								<hr/>
							)}

							<li onClick={()=>this.setState({
                                    displayElement:<VideoPostCreation
                                                        displayProps={this.displayPostOptions}
                                                        closeModal={this.props.closeModal}
                                                        isPhoneUIEnabled={this.props.isPhoneUIEnabled}
                                                    />,
                                    displayGeneralCreationModal:false
                                })}
								id="postOptionLI" style={PostOptionCSS}>
								<a href="javascript:void(0)" style={{textDecoration:"none"}}>
									<PostOptionButton isPhoneUIEnabled={this.props.isPhoneUIEnabled}>
										Video
									</PostOptionButton>
								</a>
							</li>
							{this.props.isPhoneUIEnabled==true &&(
								<hr/>
							)}

							<li id="postOptionLI" style={BlogPostOptionCSS}>
								<a href="javascript:void(0)" style={{textDecoration:"none"}}>
									<BlogOptionButton isPhoneUIEnabled={this.props.isPhoneUIEnabled} 
									id="blogCreationButton" to={{pathname:`/createBlog`,state:{postType:"Creation"}}}>
										Blog
									</BlogOptionButton>
								</a>
							</li>
						</ul>
					</PostOptionsContainer>
				</React.Fragment>
		)
	}


	render(){



		return(
			<PostProvider
				value={{
					userProfileId:this.state.id,
					isPhoneUIEnabled:this.props.isPhoneUIEnabled,
					profileType:this.props.profileType,
					closeModal:()=>{
						this.props.closeModal();
					}
				}}
			>
				<React.Fragment>
					{this.state.displayGeneralCreationModal==true?
						<Container>
							{this.state.displayElement}
						</Container>:
						<>{this.state.displayElement}</>
					}
				</React.Fragment>
			</PostProvider>
		)
	}
}


const mapStateToProps=(state)=>{
	return{
		firstName:state.personalInformation.firstName,
		lastName:state.personalInformation.lastName,
		name:state.companyInformation.companyName,
		companyPosition:state.companyInformation.companyPosition,
		_id:state.personalInformation.id
	}
}



export default connect(
		mapStateToProps,
		null)
		(LargePostComponent);