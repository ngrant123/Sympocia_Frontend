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
import {
	Container,
	IndustryTypeContainer,
	PostOptionsContainer,
	PostContainer,
	PostTextarea,
	ProfileContainer,
	ViewProfileButton,
	PostOptionButton,
	BlogOptionButton,
	ImageOptionButton,
	LocationOptionButton,
	SubmitOptionButton,
	ProfileImageContainer,
	CompanyIconContainer,
	EmployeeTitleContainer,
	CompanyTitleContainer
} from "./LargePostComponentCSS.js";

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

const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
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

	mobileCloseIcon=()=>{
		return(
			<div id="closeModalButton" 
				onClick={()=>this.props.closeModal()} 
				style={{marginTop:"0%",cursor:"pointer",display:"none"}}>
				<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
				 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
				 stroke-linecap="round" stroke-linejoin="round">
				  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				  <circle cx="12" cy="12" r="9" />
				  <path d="M10 10l4 4m0 -4l-4 4" />
				</svg>
			</div>
		)
	}

	routeToBlogCreation=()=>{
		if(this.props.isPhoneUIEnabled==true){
			alert('Unfortunately this isnt supported for you mobile device. Please switch to desktop to continue');
		}else{
			this.props.history.push({
				pathname:`/createBlog`,
				state:{postType:"Creation"}
			})
		}
	}

	originalScreen=()=>{
		this.setState({
			displayGeneralCreationModal:true	
		})
		return (
				<React.Fragment>
					{this.mobileCloseIcon()}
					<PostContainer>
						<PostTextarea id="posttextarea" 
									onClick={()=>this.setState({
										displayElement:<RegularPostCreation
															displayProps={this.displayPostOptions}
															closeModal={this.props.closeModal}
                                                            isPhoneUIEnabled={this.props.isPhoneUIEnabled}
														  />,
										displayGeneralCreationModal:false
									 })}>
							Order the post in according to recent, popular?
						</PostTextarea>
					</PostContainer>

					<PostOptionsContainer>
						<PostOptionButton isDesktopEnabled={this.props.isDesktopEnabled}
							onClick={()=>this.setState({displayElement:<RegularPostCreation
															displayProps={this.displayPostOptions}
															closeModal={this.props.closeModal}
                                                            isPhoneUIEnabled={this.props.isPhoneUIEnabled}
														  />,
										displayGeneralCreationModal:false
									 })} 
							id="postOptionLI">
							<p>Text/Audio</p>
						</PostOptionButton>
						{this.props.isDesktopEnabled==false &&(
							<hr style={HorizontalLineCSS}/>
						)}

						<PostOptionButton isDesktopEnabled={this.props.isDesktopEnabled}
							onClick={()=>this.setState({
								displayElement:<ImagePostCreation
												displayProps={this.displayPostOptions}
												closeModal={this.props.closeModal}
                                                isPhoneUIEnabled={this.props.isPhoneUIEnabled}
												/>,
								displayGeneralCreationModal:false
							})} 
							id="postOptionLI">
							<p>Image</p>
						</PostOptionButton>
						{this.props.isDesktopEnabled==false &&(
							<hr style={HorizontalLineCSS}/>
						)}

						<PostOptionButton isDesktopEnabled={this.props.isDesktopEnabled}
							onClick={()=>this.setState({
                                displayElement:<VideoPostCreation
                                                    displayProps={this.displayPostOptions}
                                                    closeModal={this.props.closeModal}
                                                    isPhoneUIEnabled={this.props.isPhoneUIEnabled}
                                                />,
                                displayGeneralCreationModal:false
                            })}
							id="postOptionLI">
								Video
						</PostOptionButton>
						{this.props.isDesktopEnabled==false &&(
							<hr style={HorizontalLineCSS}/>
						)}

						<PostOptionButton isDesktopEnabled={this.props.isDesktopEnabled}
							id="blogPostOptionLI"
							onClick={()=>this.routeToBlogCreation()}>
								Blog
						</PostOptionButton>
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