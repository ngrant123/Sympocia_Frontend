import React, { useState, useEffect, useRef,Component } from 'react'
import styled from "styled-components";
import { GeneralNavBar } from "../../../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import PostsContainer from "../PersonalProfileSubset/PostSection/PostContainer.js";
import {PersonalInformation} from "../PersonalProfileSubset/PersonalDetails/PersonalInformation.js";
import ProfileStatue from "../../../../designs/background/ProfileStatue.png";
import Typed from "react-typed";
import {useSelector,useDispatch, connect} from 'react-redux';
import { getProfile } from "../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {
	setBio,
	setProfilePicture
} from "../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";

import { UserProvider } from "../UserContext.js";
import Button from 'react-bootstrap/Button';
import PersonalPostsIndex from "../PersonalProfileSubset/PersonalPosts/index.js";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
//import BIRDS from '../../../../../vanta/src/vanta.birds.js'
import { withRouter } from "react-router-dom";
import {PostDisplayProvider} from "../PostDisplayModalContext.js";
import ImageContainer from "../../../GeneralComponents/PostComponent/ImageComponent/ImageDisplay/ImageContainer.js";
import VideoContainer from "../../../GeneralComponents/PostComponent/VideoComponent/VideoDisplay/VideoContainer.js";
import RegularPostContainer from "../../../GeneralComponents/PostComponent/RegularPostComponent/RegularPostDisplay/RegularPostContainer.js";
import {SponsorDisplayModal} from "./Modals-Portals/ChampionModalPortal/ChampionDisplayModal.js";
import Confetti from 'react-confetti';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CreationPortal from "./Modals-Portals/PostCreationPortal.js";
import OnboardingPersonalPage from "../../../OnBoarding/PersonalProfileOnboarding.js";
import PromotePortal from "../PersonalProfileSubset/PersonalPosts/PromotePortal.js";
import SocialMediaUrlContainer from "./Modals-Portals/SocialMediaUrlModal.js";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import {refreshTokenApiCallHandle} from "../../../../Actions/Tasks/index.js";

import {
		setPersonalProfileAccessToken,
		setPersonalProfileRefreshToken
	} from "../../../../Actions/Redux/Actions/PersonalProfile.js"; 

import {
	MobilePersonalInformation,
	MobileProfileOptionsIpad
} from "./MobileUI.js";


import {
	Container,
	ProfilePictureContainer,
	HeaderContainer,
	ProfileContainer,
	PersonalProfileInformationContainer,
	PersonalProfileContentContainer,
	ChangePictureButton,
	BackgroundModalContainer,
	ImageModal,
	SelectedImage,
	ImagePortfolioContainer,
	VideoModal,
	Video,
	PostInformationContainer,
	PostInformationContainerShadowOverlay,
	ShadowContainer,
	ImagePopupContainer,
	PostPopupContainer,
	CreatePostButton,
	RegularPostContainerParent
} from "./PersonalProfileContainerCSS.js";

const MediumMobileScreenUserInformation=styled.div`
	display:flex;
	flex-direction:row;
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

const ChampionAndCreateButtonCSS={
	position:"fixed",
	padding:"0px",
	left:"68%",
	zIndex:"7",
	top:"75%"
}

const ShadowButtonCSS={
	display:"inline-block",
	listStyle:"none",
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	marginRight:"5px",
	borderRadius:"5px",
	borderStyle:"none"
}

class LProfile extends Component{


	constructor(props){
		super(props);
		console.log(props);

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
		    displayChampion:false,
		    champion:{},
		    displayCreationPortal:false,
		    displayPromotePortal:false,
		    displayChampionModal:(championData)=>{
		    	
		    	this.setState({
		    		...this.state,
		    		champion:championData,
		    		displayChampion:true
		    	})
		    },
		    deleteChampionModal:(championData)=>{
		    	this.setState({
		    		...this.state,
		    		champion:championData,
		    		displayChampion:false
		    	})
		    },
		    displayConfetti:false,
		    hideOnboarding:false,
		    displaySocialMediaUrlContainer:false,
		    displayPhoneUI:false,
			displayIpadUI:false,
			displayDesktopUI:false,
			displayMobileUIPersonalInformation:false,
			displayMobileUIProfileOptions:false,
			triggerPostReload:false,
			endOfPostsDBIndicator:false,
			isLoadingReloadedPosts:false,
			displayConfettiHandle:()=>{
				this.displayConfetti()
			}
		};
	}

	triggerUIChange=()=>{
		if(window.innerWidth<700){

			this.setState({
				displayPhoneUI:true,
				displayIpadUI:false,
				displayDesktopUI:false
			})
		}else if(window.innerWidth<1400){
			this.setState({
				displayPhoneUI:false,
				displayIpadUI:true,
				displayDesktopUI:false
			})

		}else{
			this.setState({
				displayPhoneUI:false,
				displayIpadUI:false,
				displayDesktopUI:true
			})
		}
	}

/*
	The code below could be structured in a better way in the future
*/
	async componentDidMount(){

		const verification=this.props.isLoggedIn;
		if(verification==false){
			this.props.history.push({
				pathname:'/'
			})
		}else{
			this.getProfileApiTriggerCall({isAccessTokenUpdated:false});
		}
	}

	getProfileApiTriggerCall=async({isAccessTokenUpdated})=>{
		window.addEventListener('resize',this.triggerUIChange)
			const {id}=this.props.match.params;
			let confirmationResponse;
			let dataResponse;
			let visitorId=this.props.personalId

			if(id==this.props.personalId){
				const profileIds={
					userId:this.props.personalId,
					accessToken:this.props.personalInformation.accessToken
				}
				const {confirmation,data}=await getProfile(profileIds);
				confirmationResponse=confirmation;
				dataResponse=data;
			}
			else{
				const profileIds={
					userId:id,
					visitorId,
					accessToken:this.props.personalInformation.accessToken
				}
				const {confirmation,data}=await getProfile(profileIds);
				confirmationResponse=confirmation;
				dataResponse=data;
			}

			if(confirmationResponse=="Success"){
				var containsChampion=false;
				const {message}=dataResponse;
				if(message.championData!=null)
					containsChampion=message.championData.name!=""?true:false;

				this.setState(prevState=>({
					...prevState,
					userProfile:message,
					isOwnProfile:id==this.props.personalId?true:false,
					displayChampion:containsChampion,
					championModalData:message.championData,
					isLoading:false,
					hideOnboarding:true,
					visitorId
				}));
			}else{
				debugger;
				const {statusCode}=dataResponse;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
							this.props.personalInformation.refreshToken,
							this.props.personalInformation.id,
							this.getProfileApiTriggerCall,
							this.props,
							{},
							true
						);
				}else{
					alert('Unfortunately there has been an error getting this page. Please try again');
				}
			}

			this.triggerUIChange();
	}

	 handleChangeProfilePicture=()=>{
	 	document.getElementById("profilePicutreImageFile").click();
		console.log('Change pic button clicked');
	}


	changeProfilePicture=async()=>{
		debugger;
		let profileContainer=document.getElementById("profilePicture");
		let image=document.getElementById("profilePicutreImageFile").files[0];
		let reader= new FileReader();

		reader.onloadend=async()=>{
			profileContainer.src=reader.result;
			const profileUrl=profileContainer.src;

			console.log(reader.result);
			const {confirmation,data}=await setProfilePicture(
												this.state.userProfile._id,
												profileUrl,
												this.props.personalInformation.accessToken
											);
			
			if(confirmation=="Success"){
				this.setState({
					userProfile:{
						...this.state.userProfile,
						profilePicture:profileUrl
					}
				});
			}else{
				const {statusCode}=data;
				if(statusCode==401){
					await refreshTokenApiCallHandle(
						this.props.personalInformation.refreshToken,
						this.props.personalInformation.id,
						this.changeProfilePicture,
						this.props,
						{},
						true
					);
				}else{
					alert('Unfortunately there has been an error with changing your profile picture. Please try again');
				}
			}
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
					targetDom={"personalContainer"}
					triggerPromoteModal={this.triggerPromoteModal}
					history={this.props.history}
					isOwnProfile={this.state.isOwnProfile}
					closePostModal={this.closePostsModal}
				/>
			</ImagePopupContainer>:
			<React.Fragment></React.Fragment>
	}

	VideoModal=()=>{
		
		var newVideoObject={};
		debugger;
		if(this.state.isLoading!=true){
			newVideoObject={
				...this.state.videoModalData,
				firstName:this.state.userProfile.firstName,
				lastName:this.state.userProfile.lastName,
				contextLocation:this.state.contextLocation
			}
		}
		return this.state.displayVideoPostModal?
			<PostPopupContainer>
				<VideoContainer
					videoData={newVideoObject}
					profileType="personalProfile"
					targetDom={"personalContainer"}
					history={this.props.history}
					triggerPromoteModal={this.triggerPromoteModal}
					isOwnProfile={this.state.isOwnProfile}
					closePostModal={this.closePostsModal}
				/>
			</PostPopupContainer>:
			<React.Fragment></React.Fragment>
	}

	RegularPostModal=()=>{
		
		var newRegularPostObject={};
		if(this.state.isLoading!=true){
			newRegularPostObject={
				...this.state.regularModalData,
				firstName:this.state.userProfile.firstName,
				profilePicture:this.state.userProfile.profilePicture,
				lastName:this.state.userProfile.lastName,
				contextLocation:this.state.contextLocation

			}
		}
		return this.state.displayRegularPostModal?
			<RegularPostContainerParent>
				<RegularPostContainer
					postData={newRegularPostObject}
					profileType="personalProfile"
					targetDom={"personalContainer"}
					triggerPromoteModal={this.triggerPromoteModal}
					history={this.props.history}
					isOwnProfile={this.state.isOwnProfile}
					closePostModal={this.closePostsModal}
				/>
			</RegularPostContainerParent>:
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

	closeModal=()=>{
		this.setState({
			displayCreationPortal:false,
			displayShadowBackground:false,
			displayRegularPostModal:false,
			displayBlogPostModal:false,
			displayVideoPostModal:false,
			displayImagePostModal:false
		})
	}
	updateProfileSocialUrls=(data)=>{
		const{
			tikTokUrl,
			instagramUrl
		}=data;
		this.setState(prevState=>{
			return{
				...prevState,
				displaySocialMediaUrlContainer:false,
				userProfile:{
					...prevState.userProfile,
					socialMediaUrls:{
						instagramUrl,
						tikTokUrl
					}
				}
			}
		})
	}
	socialMediaModal=(socialMediaURLS)=>{
		if(socialMediaURLS!=null){
			console.log(socialMediaURLS);
			return <>
					{this.state.displaySocialMediaUrlContainer==true?
						<SocialMediaUrlContainer
							closeModal={this.closeSocialMediaModal}
							socialMediaUrls={socialMediaURLS}
							profileId={this.state.userProfile._id}
							updateProfileSocialUrls={this.updateProfileSocialUrls}
						/>:
						null
					}
				</>
		}
	}

	displaySocialMediaModal=()=>{
		this.setState({
			displaySocialMediaUrlContainer:true
		})
	}

	closeSocialMediaModal=()=>{
		this.setState({
			displaySocialMediaUrlContainer:false
		})
	}


	closeOnboardingModal=()=>{
		this.setState({
			hideOnboarding:true
		})
	}

	closePromotePortal=()=>{
		this.setState({
			displayPromotePortal:false
		})
	}

	triggerPromoteModal=(postId,postType)=>{
		
		this.setState({
			promotePostId:postId,
			promotePostType:postType,
			displayPromotePortal:true
		})
	}

	promotePortal=()=>{
		return <>
					{this.state.displayPromotePortal && (
						<PromotePortal
							closePromotePortal={this.closePromotePortal}
							nodes={this.state.userProfile.friendsGaugeNodes}
							postId={this.state.promotePostId}
							postType={this.state.promotePostType}
							targetDom={"personalContainer"}
						/>
					)}
			    </>
	}

	displayIpadUserInformationModal=()=>{
		return <ul style={{position:"relative",padding:"0px",top:"80%",marginTop:"2%"}}>
					<MediumMobileScreenUserInformation>
						<p style={{maxWidth:"90%",maxHeight:"20px",overflow:"hidden"}}>
							{this.state.userProfile.firstName}
						</p>
						<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" 
							style={ShadowButtonCSS}
							onClick={()=>this.setState({displayMobileUIProfileOptions:true})}
							>
						   		<span class="caret"></span>
						</button>
					</MediumMobileScreenUserInformation>
			   </ul>
	}
	displayMobilePersonalInformation=()=>{
		return  <>
					{this.state.displayMobileUIPersonalInformation==true &&(
							<MobilePersonalInformation
								displayConfetti={this.displayConfetti}
								personalInformation={this.state}
								displaySocialMediaModal={this.displaySocialMediaModal}	
								closeModal={this.closeMobilePersonalInformation}
								userId={this.props.personalId}
							/>
					)}
				</>
	}

	displayMobileProfileOptions=()=>{
		return <>
					{this.state.displayMobileUIProfileOptions==true &&(
						<MobileProfileOptionsIpad
							closeModal={this.closeMobileProfileOptions}
							displayPersonalInformation={this.displayPersonalInformationMobile}
							displayChampionsModal={this.displayChampionModalTrigger}
							championData={this.state.champion}
							isOwner={this.state.isOwnProfile}
						/>
					)}
				</>
	}
	displayPersonalInformationMobile=()=>{
		this.setState({
			displayMobileUIPersonalInformation:true
		})
	}
	closeMobileProfileOptions=()=>{
		this.setState({
			displayMobileUIProfileOptions:false
		})
	}
	closeMobilePersonalInformation=()=>{
		this.setState({
			displayMobileUIPersonalInformation:false
		})
	}

	displayCreatePostOptionTrigger=()=>{
		return <a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li id="createPostIcon" onClick={()=>this.setState({displayCreationPortal:true})} style={{listStyle:"none",marginLeft:"400px",marginBottom:"5%"}}>
						<CreatePostButton>
							<BorderColorIcon
								style={{fontSize:"30",color:"#C8B0F4"}}
							/>
						</CreatePostButton>
					</li>
				</a>

	}

	displayChampionModalTrigger=()=>{
		return <a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li style={{listStyle:"none"}}>
						{this.state.displayChampion==true &&(
							<SponsorDisplayModal
								championData={this.state.champion}
								isOwnProfile={this.state.isOwnProfile}
							/>
						)}
					</li>
				</a>
	}

	closePostsModal=()=>{
		this.setState({
			displayShadowBackground:false,
			displayRegularPostModal:false,
			displayBlogPostModal:false,
			displayVideoPostModal:false,
			displayImagePostModal:false
		})
	}

	detectEndOfPostContainer=(divElement)=>{
		if(	divElement.scrollHeight - divElement.scrollTop - divElement.clientHeight < 1
			 && this.state.endOfPostsDBIndicator==false && this.state.isLoadingReloadedPosts==false){
			this.setState({
				triggerPostReload:true,
				isLoadingReloadedPosts:true
			})
		}
	}

	isPostReloading=(indicator)=>{
		this.setState({
			isLoadingReloadedPosts:indicator
		})
	}

	unTriggerReload=()=>{
		this.setState({
			triggerPostReload:false,
			isLoadingReloadedPosts:false
		})
	}

	finalPostRecieved=()=>{
		this.setState({
			endOfPostsDBIndicator:true,
			isLoadingReloadedPosts:false
		})
	}

	render(){
		return(

			<UserProvider value={{
								...this.state,
								mobilePhoneUIParameters:{
									displayPersonalInformation:this.displayPersonalInformationMobile,
									displayChampionsModal:this.displayChampionModalTrigger,
									championData:this.state.champion
								}
							}}>
				<PostDisplayProvider
					value={{
						isLoadingReloadedPosts:this.state.isLoadingReloadedPosts,
						handleImagePostModal:(imagePostData,contextLocation)=>{
							console.log(imagePostData);
							
							this.setState({
								imageModalData:imagePostData,
								contextLocation:contextLocation,
								displayImagePostModal:true,
								displayShadowBackground:true
							})
						},
						handleVideoPostModal:(videoPostData,contextLocation)=>{
							this.setState({
								videoModalData:videoPostData,
								contextLocation:contextLocation,
								displayVideoPostModal:true,
								displayShadowBackground:true
							})
						},
						handleBlogPostModal:(blogPostData,contextLocation)=>{
							this.setState({
								blogModalData:blogPostData,
								displayBlogPostModal:true,
								displayShadowBackground:true
							})
						},
						handleRegularPostModal:(regularPostData,contextLocation)=>{
							this.setState({
								regularModalData:regularPostData,
								displayRegularPostModal:true,
								displayShadowBackground:true,
								contextLocation:contextLocation
							})
						}
					}}
				>
					<Container id="personalContainer"  onScroll={element=>this.detectEndOfPostContainer(element.target)}>
						{this.state.displayConfetti==true?
							<Confetti
								style={{position:"fixed",width:"100%",height:"100%",zIndex:"20"}}
								 run={true}
							/>
						:<React.Fragment></React.Fragment>}

						{this.state.displayShadowBackground==true?
								<ShadowContainer
									onClick={()=>this.closePostsModal()}
								/>:
								<React.Fragment></React.Fragment>
						}
						{this.displayMobilePersonalInformation()}
						{this.displayMobileProfileOptions()}
						{this.ImageModal()}
						{this.VideoModal()}
						{this.BlogModal()}
						{this.RegularPostModal()}
						{this.socialMediaModal(this.state.userProfile.socialMediaUrls)}

						<HeaderContainer>
							<GeneralNavBar
								page={"PersonalProfile"}
								routerHistory={this.props.history}
								targetDom={"personalContainer"}
							/>
						</HeaderContainer>


						<ProfileContainer>
							<ProfilePictureContainer>
								{(this.state.displayDesktopUI==false && this.state.isOwnProfile==true)? 
									<>
										{this.displayCreatePostOptionTrigger()}
										<input type="file" name="img" id="profilePicutreImageFile" style={{opacity:"0"}} 
											accept="application/msword,image/gif,image/jpeg,application/pdf,image/png,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/zip,.doc,.gif,.jpeg,.jpg,.pdf,.png,.xls,.xlsx,.zip" 
								        	name="attachments"
											onChange={()=>this.changeProfilePicture()}>
										</input>
										<img id="profilePicture" 
											onClick={()=>this.handleChangeProfilePicture()}
											src={this.state.userProfile.profilePicture==null?
													NoProfilePicture:
													this.state.userProfile.profilePicture
												} style={{position:"absolute",width:"100%",height:"100%",borderRadius:"50%"}}
										/>
									</>:
									<img id="profilePicture" 
										src={this.state.userProfile.profilePicture==null?
												NoProfilePicture:
												this.state.userProfile.profilePicture
											} style={{position:"absolute",width:"70%",height:"80%",borderRadius:"50%"}}
									/>
								}
								

								{this.state.displayPhoneUI==false &&(
									<>
										{this.state.displayIpadUI==true?
											<>{this.displayIpadUserInformationModal()}</>:
											<>
												{this.state.isOwnProfile==true?
													<React.Fragment>
														<input type="file" name="img" id="profilePicutreImageFile" style={{opacity:"0"}} 
															accept="image/x-png,image/gif,image/jpeg" 
															onChange={()=>this.changeProfilePicture()}>
														</input>
														<a href="javascript:void(0);" style={{textDecoration:"none"}}>
															<ChangePictureButton onClick={()=>this.handleChangeProfilePicture()}>
																Change Profile Picture
															</ChangePictureButton>
														</a>
													</React.Fragment>:
													<React.Fragment></React.Fragment>
												}
											</>
										}
									</>
								)}
							</ProfilePictureContainer>

							{this.state.displayDesktopUI==true &&(
								<>
									<PersonalProfileInformationContainer>
										<PersonalInformation
											displayConfetti={this.displayConfetti}
											personalInformation={this.state}
											displaySocialMediaModal={this.displaySocialMediaModal}
											userId={this.props.personalId}
										/>

									</PersonalProfileInformationContainer>
								</>
							)}
							
						</ProfileContainer>
						
						{this.state.isLoading==true?null:
							<>
								{this.promotePortal()}
								{(this.state.hideOnboarding==false && this.state.isOwnProfile==true) &&(
									<OnboardingPersonalPage
										closeModal={this.closeOnboardingModal}
									/>
								)}
								
								<PostInformationContainer>
									<PersonalPostsIndex
										displayShadowOverlay={this.displayShadow}
										disappearShadow={this.disappearShadow}
										displayCreationPortal={this.state.displayCreationPortal}
										closeModal={this.closeModal}
										personalInformation={this.state}
										uiStatus={{
										    displayPhoneUI:this.state.displayPhoneUI,
											displayIpadUI:this.state.displayIpadUI,
											displayDesktopUI:this.state.displayDesktopUI,
										}}
										visitorId={this.state.isOwnProfile==true?null:this.state.visitorId}
										displayConfetti={this.displayConfetti}
										triggerPostReload={this.state.triggerPostReload}
										isPostReloading={this.isPostReloading}
										unTriggerReload={this.unTriggerReload}
										finalPostRecieved={this.finalPostRecieved}
									/>
								</PostInformationContainer>
							</>
						}

						{(this.state.displayDesktopUI==true && this.state.isOwnProfile==true)==true &&(
							<ul style={ChampionAndCreateButtonCSS}>
								{this.displayCreatePostOptionTrigger()}
								{this.displayChampionModalTrigger()}
							</ul>
						)}
					
					</Container>
			</PostDisplayProvider>
		</UserProvider>
		)
	}
}

const mapStateToProps=(state)=>{
	return{
		personalInformation:state.personalInformation,
		personalId:state.personalInformation.id,
		isLoggedIn:state.personalInformation.loggedIn
	}
}

const mapDispatchToProps=dispatch=>{
	return{
		setPersonalProfileAccessToken:(accessToken)=>dispatch(setPersonalProfileAccessToken(accessToken)),
		setPersonalProfileRefreshToken:(refreshToken)=>dispatch(setPersonalProfileRefreshToken(refreshToken))
	}
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(LProfile));
