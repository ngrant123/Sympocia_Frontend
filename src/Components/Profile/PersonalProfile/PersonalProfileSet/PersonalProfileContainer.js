import React, { useState, useEffect, useRef,Component } from 'react'
import styled from "styled-components";
import { GeneralNavBar } from "../../../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import PostsContainer from "../PersonalProfileSubset/PostSection/PostContainer.js";
import PersonalInformation from "../PersonalProfileSubset/PersonalDetails/PersonalInformation.js";
import ProfileStatue from "../../../../designs/background/ProfileStatue.png";
import Typed from "react-typed";
import {useSelector,useDispatch, connect} from 'react-redux';
import { 
			getProfile,
			getVideos,
			getImages,
			getBlogs
		 } from "../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";

import {
	setBio,
	setProfilePicture
} from "../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";

import { UserProvider } from "../UserContext.js";
import Button from 'react-bootstrap/Button';
import { Player } from 'video-react';
import PersonalPostsIndex from "../PersonalProfileSubset/PersonalPosts/index.js";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
//import BIRDS from '../../../../../vanta/src/vanta.birds.js'
import { withRouter } from "react-router-dom";
import {PostDisplayProvider} from "../PostDisplayModalContext.js";
import ImageContainer from "../../../GeneralComponents/PostComponent/ImageComponent/ImageDisplay/ImageContainer.js";
import VideoContainer from "../../../GeneralComponents/PostComponent/VideoComponent/VideoDisplay/VideoContainer.js";
import RegularPostContainer from "../../../GeneralComponents/PostComponent/RegularPostComponent/RegularPostDisplay/RegularPostContainer.js";
import ChampionModal from "./ChampionModalPortal/ChampionDisplayModal.js";
import Confetti from 'react-confetti';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CreationPortal from "./PostCreationPortal.js";


const Container=styled.div`

	position:absolute;
	width:100%;
	height:100%;
	overflow-x:hidden;

`;

const ProfilePictureContainer=styled.div`
	position:absolute;
	width:25%;
	height:35%;
	top:15%;
	left:2%;
	background-color:white;
	border-style:solid;
	border-color:white;
	border-width:7px;
	border-radius:5px;
	z-index:3;
	box-shadow: 1px 1px 10px #d5d5d5;
`;

const HeaderContainer=styled.div`

	width:100%;
	height:30%;
	background-color:white;

`;

const ProfileContainer=styled.div`
	width:30%;
	height:70%;
	background-color:white;
`;

const PersonalProfileInformationContainer= styled.div`
	position:absolute;
	top:52%;
	width:25%;
	left:3%;
	background-color:#fbfdff;
	border-radius:5px;
	transition:.8s;
	padding:10px;

	&:hover{
		box-shadow: 5px 5px 5px 5px #d5d5d5;
	}
`;

const PersonalProfileContentContainer= styled.div`

	position:relative;
	top:0%;
	width:64%;
	height:80%;
	left:30%;
	background-color:white;
	border-radius:5px;
`;



const ChangePictureButton=styled.div`	
	position:absolute;
	top:85%;
	background-color:#5298F8;
	padding:5px;
	border-radius:5px;
	color:white;
	left:5%;



`;

const BackgroundModalContainer= styled.div`
	position:absolute;
	width:100%;
	height:100%;
	background: rgba(0, 0, 0, 0.5);
	z-index:3;
	display: block;

`;


const ImageModal=styled.div`
	position:absolute;
	width:65%;
	height:60%;
	top:20%;
	background-color:white;
	z-index:4;
	left:20%;
	border-radius:5px;

`;

const SelectedImage=styled.div`
	position:absolute;
	top:10%;
	width:40%;
	height:70%;

	left:5%;
	border-radius:5px;
	box-shadow: 5px 5px 5px 5px #d5d5d5;

`;


const ImagePortfolioContainer=styled.div`
	position:relative;
	top:10%;
	width:50%;
	height:70%;
	left:50%;
	border-radius:5px;
	padding:5px;
	overflow-y:scroll;
`;

const VideoModal=styled.div`
	position:absolute;
	width:80%;
	height:90%;
	top:5%;
	background-color:white;
	z-index:4;
	left:10%;
	border-radius:5px;
`;

const Video=styled.div`
	position:relative;
	height:70%;
	left:5%;
	top:5%;
	width:90%;
	border-radius:5px;
	margin-bottom:50px;
`;

const PostInformationContainer=styled.div`
	position:absolute;
	background-color:white;
	width:60%;
	height:83%;
	left:33%;
	z-index:7;
	top:15%;
`;

const PostInformationContainerShadowOverlay=styled.div`
	position:absolute;
	background-color:white;
	width:60%;
	height:83%;
	left:33%;
	z-index:8;
	top:15%;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */

`;

const ImageListCSS={
	display:"inline-block",
	listStyle:"none",
	marginRight:"30px"

}

const ImageCSS={
	position:"relative",
	width:"100px",
	height:"30%",
	backgroundColor:"black",
	borderRadius:"5px"

}

const SelectedImageCss={
	position:"absolute",
	width:"100%",
	height:"100%",
	borderRadius:"5px"
	
}

const VideoThumbNailCSS={
	position:"relative",
	width:"160px",
	height:"20%",
	backgroundColor:"black",
	borderRadius:"5px"

}

const ShadowContainer= styled.div`

	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;
	z-index:9;

`;

const ImagePopupContainer=styled.div`
	margin-left:20%;
	margin-top:10%;
	position:fixed;
	width:70%;
	height:60%;
	background-color:white;
	padding:20px;
	z-index:9;
	border-radius:5px;
`;

const PostPopupContainer=styled.div`
	position:fixed;
	margin-left:10%;
	z-index:12;
	margin-top:5%;

`;

const CreatePostButton=styled.div`
	width:70px;
	height:70px;
	border-radius:50%;
	background-color:white;
	border-color:white;
	border-style:solid;
	padding:15px;
	border-width:5px;
	animation: glowing 1300ms infinite;


	@keyframes glowing {
      0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
  }
`;


const ChampionAndCreateButtonCSS={
	position:"fixed",
	padding:"0px",
	left:"68%",
	zIndex:"7",
	top:"75%"
}

class LProfile extends Component{


	constructor(props){
		super(props);
		console.log(props.location.state);

		this.state={
			images:[],
			videos:[],
			blogs:[],
			imgUrl:{},
			displayImages:false,
			displayImageModal:false,
		    displayVideos:false,
		    videoData:{},
		    displayBlogs:false,
		    isOwnProfile:false,
		    profileId:0,
		    userProfile:{},
		    isLoading:true,
		    displayShadowBackground:false,
		    displayImageModal:false,
		    imageModalData:{},
		    displayVideoModal:false,
		    videoModalData:{},
		    displayBlogModal:false,
		    blogModalData:{},
		    displayRegularPostModal:false,
		    regularModalData:{},
		    displayChampionModal:false,
		    champion:{},
		    displayCreationPortal:false,
		    displayChampionModal:(championData)=>{
		    	debugger;
		    	this.setState({
		    		...this.state,
		    		champion:championData,
		    		displayChampionModal:true
		    	})
		    },
		    displayConfetti:false
		};
	}


	async componentDidMount(){
		const {id}=this.props.match.params;
		const firstTimeIndicator=this.props.firstTimeIndicator;

		if(firstTimeIndicator==true){
			//Start tutorial mode

		 }else{
				if(id==this.props.personalId){
					const profile=await getProfile(this.props.personalId);
					debugger;
					console.log(profile);
					var containsChampion=false;
					if(profile.championData!=null)
						containsChampion=profile.championData.name!=""?true:false;

					this.setState(prevState=>({
						...prevState,
						isLoading:false,
						userProfile:profile,
						isOwnProfile:true,
						displayChampion:containsChampion,
						champion:profile.championData,
						isLoading:false
					}));
				}
				else{
					const profile=await getProfile(id);
					var containsChampion=false;
					if(profile.championData!=null)
						containsChampion=profile.championData.name!=""?true:false;

					this.setState(prevState=>({
						...prevState,
						isLoading:false,
						userProfile:profile,
						displayChampion:containsChampion,
						championModalData:profile.championData,
						isLoading:false
					}));
			}	
		}
	}

	 handleChangeProfilePicture=()=>{

	 	document.getElementById("profilePicutreImageFile").click();
		console.log('Change pic button clicked');
	}


	changeProfilePicture=()=>{

		console.log("Change picture button clicked");
		let profileContainer=document.getElementById("profilePicture");
		let image=document.getElementById("profilePicutreImageFile").files[0];
		let reader= new FileReader();
		reader.onloadend=()=>{
			profileContainer.src=reader.result;
			const profileUrl=profileContainer.src;
			this.setState({
				userProfile:{
					...this.state.userProfile,
					profilePicture:profileUrl
				}
			});

			//send profile picture to database
			console.log(reader.result);
			setProfilePicture(this.state.userProfile._id,profileUrl);
		}

		if(image!=null){
			reader.readAsDataURL(image);
		}
		else{
			alert("Sorry but this type of image is not currently allowed. Change it to either jpeg,png to continue");
		}
	}
	/*
		Could be done in such a better way nigga
	*/

	displayImages=()=>{

		this.changeButtonsColor("images");
		this.setState(prevState => ({
		    ...prevState,  
		    //images                   
		    displayImages:true,
		    displayVideos:false,
		    displayBlogs:false
		    }
		))
	}


	displayVideos=()=>{
	

		this.changeButtonsColor("videos");

		this.setState(prevState=>({

			...prevState,
			displayImages:false,
		    displayVideos:true,
		    displayBlogs:false
		}))
	}

	changeButtonsColor=(button)=>{

		if(button=="images"){

			document.getElementById("imageButton").style.backgroundColor="#3386f6";
			document.getElementById("imageButton").style.color="white";



			document.getElementById("videoButton").style.backgroundColor="white";
			document.getElementById("videoButton").style.color="#3386f6";

			document.getElementById("blogsButton").style.backgroundColor="white";
			document.getElementById("blogsButton").style.color="#3386f6";
		}else if(button=="videos"){

			document.getElementById("videoButton").style.backgroundColor="#d3a7dd";
			document.getElementById("videoButton").style.color="white";


			document.getElementById("imageButton").style.backgroundColor="white";
			document.getElementById("imageButton").style.color="#3386f6";

			document.getElementById("blogsButton").style.backgroundColor="white";
			document.getElementById("blogsButton").style.color="#3386f6";



		}else{

			document.getElementById("blogsButton").style.backgroundColor="#189318";
			document.getElementById("blogsButton").style.color="white";

			document.getElementById("imageButton").style.backgroundColor="white";
			document.getElementById("imageButton").style.color="#3386f6";

			document.getElementById("videoButton").style.backgroundColor="white";
			document.getElementById("videoButton").style.color="#3386f6";
		}
	}


	displayBlogs=()=>{

		this.changeButtonsColor("blog");

		this.setState(prevState=>({
			...prevState,
			displayImages:false,
		    displayVideos:false,
		    displayBlogs:true
		}))
	}


	handleImageModal=(imgData)=>{

		console.log(imgData);
		this.setState(prevState=>({
			...prevState,
			displayImageModal:true,
			imgUrl:imgData

		}))
	}

	handleVideoModal=(videoData)=>{
		console.log("Video modal button clicked");
		this.setState(prevState=>({
			...prevState,
			displayVideoModal:true,
			videoData:videoData
		}));
	}


	handleBlogsModal=()=>{
		console.log("Blog modal button clicked");
	}

	displayShadow=()=>{
		console.log("Testing display shafow");
		this.setState({
			displayShadowBackground:true
		})
	}

	disappearShadow=()=>{
		this.setState({
			displayShadowBackground:false
		})
	}

	ImageModal=()=>{
		var newImageObject={};
		if(this.state.isLoading!=true){
			newImageObject={
				...this.state.imageModalData,
				firstName:this.state.userProfile.firstName,
				lastName:this.state.userProfile.lastName,
				contextLocation:this.state.contextLocation
			}
		}
		return this.state.displayImagePostModal?
			<ImagePopupContainer>
				<ImageContainer
					imageData={newImageObject}
					profileType="personalProfile"
					closeModal={this.closeModal}
				/>
			</ImagePopupContainer>:
			<React.Fragment></React.Fragment>
	}

	VideoModal=()=>{
		debugger;
		var newVideoObject={};
		if(this.state.isLoading!=true){
			newVideoObject={
				...this.state.videoModalData,
				firstName:this.state.userProfile.firstName,
				lastName:this.state.userProfile.lastName
			}
		}
		return this.state.displayVideoPostModal?
			<PostPopupContainer>
				<VideoContainer
					videoData={newVideoObject}
					profileType="personalProfile"
				/>
			</PostPopupContainer>:
			<React.Fragment></React.Fragment>
	}

	RegularPostModal=()=>{
		debugger;
		var newRegularPostObject={};
		if(this.state.isLoading!=true){
			newRegularPostObject={
				...this.state.regularModalData,
				firstName:this.state.userProfile.firstName,
				profilePicture:this.state.userProfile.profilePicture,
				lastName:this.state.userProfile.lastName
			}
		}
		return this.state.displayRegularPostModal?
			<PostPopupContainer>
				<RegularPostContainer
					postData={newRegularPostObject}
					profileType="personalProfile"
				/>
			</PostPopupContainer>:
			<React.Fragment></React.Fragment>
	}

	BlogModal=()=>{

	}

	displayConfetti=()=>{
		this.setState({
			displayConfetti:true
		})

		setTimeout(()=>{
			this.setState({
				displayConfetti:false
			})
		},5000);
	}

	closeCreationPortal=()=>{
		this.setState({
			displayCreationPortal:false
		})
	}



	render(){
		return(

			<UserProvider value={this.state}>
				<PostDisplayProvider
					value={{
						handleImagePostModal:(imagePostData,contextLocation)=>{
							console.log(imagePostData);
							debugger;
							this.setState({
								imageModalData:imagePostData,
								contextLocation:contextLocation,
								displayImagePostModal:true,
								displayShadowBackground:true
							})
						},
						handleVideoPostModal:(videoPostData)=>{
							this.setState({
								videoModalData:videoPostData,
								displayVideoPostModal:true,
								displayShadowBackground:true
							})
						},
						handleBlogPostModal:(blogPostData)=>{
							this.setState({
								blogModalData:blogPostData,
								displayBlogPostModal:true,
								displayShadowBackground:true
							})
						},
						handleRegularPostModal:(regularPostData)=>{
							this.setState({
								regularModalData:regularPostData,
								displayRegularPostModal:true,
								displayShadowBackground:true
							})
						}
					}}
				>
					<Container id="personalContainer">
						{this.state.displayConfetti==true?
							<Confetti
								style={{position:"fixed",width:"100%",height:"100%",zIndex:"20"}}
								 run={true}
							/>
						:<React.Fragment></React.Fragment>}

						{this.state.displayShadowBackground==true?
								<ShadowContainer
									onClick={()=>this.setState({
										displayShadowBackground:false,
										displayRegularPostModal:false,
										displayBlogPostModal:false,
										displayVideoPostModal:false,
										displayImagePostModal:false
									})}
								/>:
								<React.Fragment></React.Fragment>}

						{this.ImageModal()}
						{this.VideoModal()}
						{this.BlogModal()}
						{this.RegularPostModal()}

						<HeaderContainer>
							<GeneralNavBar/>
						</HeaderContainer>

						<ProfileContainer>

							<ProfilePictureContainer>
								{this.state.userProfile.profilePicture==null?
									<img id="profilePicture" src={NoProfilePicture} style={{position:"absolute",width:"100%",height:"100%"}}/>:
									<img id="profilePicture" src={this.state.userProfile.profilePicture} style={{position:"absolute",width:"100%",height:"100%"}}/>
								}

								{this.state.isOwnProfile==true?
									<React.Fragment>
										<input type="file" name="img" id="profilePicutreImageFile" style={{opacity:"0"}} onChange={()=>this.changeProfilePicture()}></input>
										<ChangePictureButton onClick={()=>this.handleChangeProfilePicture()}>
											Change Profile Picture
										</ChangePictureButton>
									</React.Fragment>:
									<React.Fragment></React.Fragment>
								}

							</ProfilePictureContainer>

							<PersonalProfileInformationContainer>
								<PersonalInformation
									displayConfetti={this.displayConfetti}
								/>

							</PersonalProfileInformationContainer>
						</ProfileContainer>

						{/*
							{
								this.state.displayVideoPostModal==true||this.state.displayImagePostModal==true ||
								this.state.displayBlogPostModal==true || this.state.displayRegularPostModal==true?
								<PostInformationContainerShadowOverlay
									onClick={()=>this.setState({
											displayShadowBackground:false,
											displayRegularPostModal:false,
											displayBlogPostModal:false,
											displayVideoPostModal:false,
											displayImagePostModal:false
										})}
								/>:
								<React.Fragment></React.Fragment>
							}
						*/}
						
						<PostInformationContainer>
							<PersonalPostsIndex
								displayShadowOverlay={this.displayShadow}
								disappearShadow={this.disappearShadow}
								displayCreationPortal={this.state.displayCreationPortal}
								closeModal={this.closeCreationPortal}
							/>
						</PostInformationContainer>

						<ul style={ChampionAndCreateButtonCSS}>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li onClick={()=>this.setState({displayCreationPortal:true})} style={{listStyle:"none",marginLeft:"400px",marginBottom:"5%"}}>
									<CreatePostButton>
										<BorderColorIcon
											style={{fontSize:"30",color:"#C8B0F4"}}
										/>
									</CreatePostButton>
								</li>
							</a>

							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li style={{listStyle:"none"}}>
									{this.state.displayChampion==false?
										<React.Fragment>
										</React.Fragment>:
										<ChampionModal
											championData={this.state.champion}
										/>
									}
								</li>
							</a>
						</ul>
					</Container>
			</PostDisplayProvider>
		</UserProvider>
		)
	}
}

const mapStateToProps=(state)=>{
	return{
		personalId:state.personalInformation.id
	}
}

export default withRouter(connect(
	mapStateToProps,
	null)(LProfile));
