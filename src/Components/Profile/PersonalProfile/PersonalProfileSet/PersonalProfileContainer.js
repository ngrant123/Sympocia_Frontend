import React, {Component } from 'react'
import { GeneralNavBar } from "../../../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import {PersonalInformation} from "../PersonalProfileSubset/PersonalDetails/PersonalInformation.js";
import {connect} from 'react-redux';
import { 
	getProfile,
	retrieveProfileTokenInformation
} from "../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";

import { UserProvider } from "../UserContext.js";
//import BIRDS from '../../../../../vanta/src/vanta.birds.js'
import { withRouter } from "react-router-dom";
import {PostDisplayProvider} from "../PostDisplayModalContext.js";

import {SponsorDisplayModal} from "./Modals-Portals/ChampionModalPortal/ChampionDisplayModal.js";
import Confetti from 'react-confetti';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import OnboardingPersonalPage from "../../../OnBoarding/PersonalProfileOnboarding.js";
import GuestOnboardingModal from "../../../OnBoarding/GuestOnboarding.js";
import PromotePortal from "./Modals-Portals/PromotePortal.js";
import SocialMediaUrlContainer from "./Modals-Portals/SocialMediaUrlModal.js";
import {refreshTokenApiCallHandle} from "../../../../Actions/Tasks/index.js";

import {
		setPersonalProfileAccessToken,
		setPersonalProfileRefreshToken
	} from "../../../../Actions/Redux/Actions/PersonalProfile.js"; 
import CONSTANTS from "../../../../Constants/constants.js";
import {
	MobileProfileOptions,
	MobileChampionsDisplay
} from "./MobileUI.js";
import ProfilePicturesDefaultOptionsModal from "./Modals-Portals/ProfilePicturesDefaultOptions/index.js";
import ProfilePicture from "../PersonalProfileSubset/PersonalDetails/ProfilePictureContainer.js";
import FriendsGauge from "./FriendsGaugeMemo.js";
import PostDisplay from "./PostsDisplay/index.js";
import PersonalPostsIndexContainer from "./PersonalPostsIndexContainer";
import TokenLevelDetails from "../../../GeneralComponents/TokenComponent/Modals/TokenLevelDetails/index.js";
import TokenPortalHOC from "../../../GeneralComponents/TokenComponent/Modals/index.js";
import {enableScrolling} from "../../../../Actions/Tasks/DisableScrolling.js";


import {
	Container,
	HeaderContainer,
	ProfileContainer,
	PersonalProfileInformationContainer,
	PostInformationContainer,
	ShadowContainer,
	CreatePostButton,
	MobilePersonalInformationContainer,
	MobileShadowContainer
} from "./PersonalProfileContainerCSS.js";

const ChampionAndCreateButtonCSS={
	position:"fixed",
	padding:"0px",
	left:"85%",
	zIndex:"7",
	top:"75%",
	width:"10%"
}


//Guest HOC is no longer needed 

class LProfile extends Component{


	constructor(props){
		super(props);
		this.state={
			displayImages:false,
		    displayVideos:false,
		    videoData:{},
		    displayBlogs:false,
		    isOwnProfile:false,
		    profileId:0,
		    userProfile:{},
		    isLoading:true,
		    displayShadowBackground:false,
		    displayChampion:false,
		    champion:{},
		    displayCreationPortal:false,
		    displayPromotePortal:false,
		    displayChampionModal:(championData)=>{
		    	
		    	this.setState({
		    		...this.state,
		    		championModalData:championData,
		    		displayChampion:true
		    	})
		    },
		    deleteChampionModal:(championData)=>{
		    	this.setState({
		    		...this.state,
		    		championModalData:championData,
		    		displayChampion:false
		    	})
		    },
		    displayConfetti:false,
		    displayOnboarding:false,
		    displaySocialMediaUrlContainer:false,
		    displayPhoneUI:false,
			displayIpadUI:false,
			displayDesktopUI:true,
			displayMobileUIPersonalInformation:false,
			displayMobileUIProfileOptions:false,
			triggerPostReload:false,
			endOfPostsDBIndicator:false,
			isLoadingReloadedPosts:false,
			displayGuestOnboarding:false,
			isGuestProfile:false,
			selectedDisplayPostType:"Images",
			displayProfilePictureOptionsModal:false,
			currentRequestedFriendsGaugeNodeId:null,
			displayConfettiHandle:()=>{
				this.displayConfetti()
			},
			remoteChampionsMobileDisplayTrigger:false,
			displayTokenLevelDetails:false,
			componentMountedStatus:false
		};
	}

	shouldComponentUpdate(nextProps, nextState){
		if(this.state==nextState){
			return false;
		}
	   return true; // equals() is your implementation
	}

	triggerUIChange=()=>{
		debugger;
		if(window.innerWidth<650){

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
		this.triggerUIChange();
		this.getProfileApiTriggerCall({isAccessTokenUpdated:false});
		window.addEventListener('resize', this.triggerUIChange());
	}

	// componentDidUpdate(prevProps){
	// 	if (prevProps.window.innerWidth !== this.window.innerWidth) {
	// 		this.triggerUIChange();
	// 	}
	// }

	getProfileApiTriggerCall=async({isAccessTokenUpdated})=>{
		window.addEventListener('resize',this.triggerUIChange)
		const {id}=this.props.match.params;
		let confirmationResponse;
		let dataResponse;
		let visitorId=this.props.personalId
		const {isGuestProfile}=this.props.personalState;
		if((id==this.props.personalId && isGuestProfile)){
			const {GUEST_PROFILE}=CONSTANTS;
			this.setState({
				isLoading:false,
				userProfile:GUEST_PROFILE,
				isOwnProfile:true,
				displayChampion:false,
				champion:{},
				isLoading:false,
				displayOnboarding:false,
				isGuestProfile:true,
				componentMountedStatus:true
			})

		}else{
			let isGuestProfileIndicator=false;
			if(id==this.props.personalId){
				const profileIds={
					userId:this.props.personalId,
					accessToken:this.props.personalInformation.accessToken
				}
				const {confirmation,data}=await getProfile(profileIds);
				confirmationResponse=confirmation;
				dataResponse=data;
			}else{
				const isGuestProfile=this.props.personalInformation.isGuestProfile;
				var profileId=this.props.personalInformation.id;
				if(profileId==0 || isGuestProfile){
					isGuestProfileIndicator=true;
				}
				const profileIds={
					userId:id,
					visitorId,
					accessToken:this.props.personalInformation.accessToken,
					isGuestProfileIndicator
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
					displayOnboarding:message.firstTimeLoggedIn.personalPage,
					visitorId,
					isGuestVisitorProfile:isGuestProfileIndicator,
					componentMountedStatus:true
				}));
			}else{
				
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
		}
	}


	 handleChangeProfilePicture=()=>{
	 	if(!this.state.isGuestProfile){
	 		this.setState({
				displayProfilePictureOptionsModal:true
			})
		}
	}

	displayImages=()=>{

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
	

		this.setState(prevState=>({

			...prevState,
			displayImages:false,
		    displayVideos:true,
		    displayBlogs:false
		}))
	}

	displayBlogs=()=>{
		this.setState(prevState=>({
			...prevState,
			displayImages:false,
		    displayVideos:false,
		    displayBlogs:true
		}))
	}


	handleImageModal=(imgData)=>{
		this.setState(prevState=>({
			...prevState,
			displayImageModal:true,
			imgUrl:imgData

		}))
	}

	handleVideoModal=(videoData)=>{
		this.setState(prevState=>({
			...prevState,
			displayVideoModal:true,
			videoData:videoData
		}));
	}


	handleBlogsModal=()=>{
	}

	displayShadow=()=>{
		this.setState({
			displayShadowBackground:true
		})
	}

	disappearShadow=()=>{
		this.setState({
			displayShadowBackground:false
		})
	}

	PostModal=()=>{
		let newRegularPostObject;
		let displayParams;

		if(this.state.displayPostData==true){
			newRegularPostObject={
				...this.state.postData,
				firstName:this.state.userProfile.firstName,
				profilePicture:this.state.userProfile.profilePicture,
				lastName:this.state.userProfile.lastName,
				contextLocation:this.state.contextLocation,
				selectedDisplayPostType:this.state.selectedDisplayPostType

			}

			displayParams={
				profileType:"personalProfile",
				targetDom:"personalContainer",
				triggerPromoteModal:this.triggerPromoteModal,
				history:this.props.history,
				isOwnProfile:this.state.isOwnProfile,
				closePostModal:this.closePostsModal,
			}
		}
		return <React.Fragment>
					{this.state.displayPostData==true &&(
						<PostDisplay
							postData={{...newRegularPostObject}}
							postDisplayParams={{...displayParams}}
						/>
					)}
				</React.Fragment>
			
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
		enableScrolling("personalContainer");
		this.setState({
			displayCreationPortal:false,
			displayShadowBackground:false,
			displayPostData:false
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
			displayOnboarding:false,
			displayGuestOnboarding:false
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

	displayMobileProfileOptions=()=>{
		return <>
					{this.state.displayMobileUIProfileOptions==true &&(
						<MobileProfileOptions
							closeModal={this.closeMobileProfileOptions}
							displayPersonalInformation={this.displayPersonalInformationMobile}
							displayChampionsModalMobileRemoteTrigger={this.state.remoteChampionsMobileDisplayTrigger}
							championModalData={this.state.championModalData}
							isOwner={this.state.isOwnProfile}
							isGuestProfile={this.state.isGuestProfile}
						/>
					)}
				</>
	}

	displayMobileProfileOptionsTrigger=()=>{
		this.setState({
			displayMobileUIProfileOptions:true
		})
	}

	displayPersonalInformationComponent=()=>{
		return(
			<>
				{this.state.displayMobileUIPersonalInformation==true &&(
					<>
						<MobileShadowContainer
							onClick={()=>this.closeMobileProfileInformation()}
						/>
						<MobilePersonalInformationContainer>
							{this.personalInformation(true)}
						</MobilePersonalInformationContainer>
					</>
				)}
			</>
		)
	}

	displayPersonalInformationMobile=()=>{
		this.setState({
			displayMobileUIPersonalInformation:true
		})
	}
	closeMobileProfileOptions=()=>{
		this.setState({
			displayMobileUIProfileOptions:false,
			remoteChampionsMobileDisplayTrigger:false
		})
	}

	closeMobileProfileInformation=()=>{
		this.setState({
			displayMobileUIPersonalInformation:false
		})
	}

	closeMobilePersonalInformation=()=>{
		this.setState({
			displayMobileUIPersonalInformation:false
		})
	}

	displayMobileDisplayViaRemote=()=>{
		this.setState({
			remoteChampionsMobileDisplayTrigger:true,
			displayMobileUIProfileOptions:true
		})
	}

	diplayMobileChampionTrigger=()=>{
		return(
			<React.Fragment>
				{(this.state.displayChampion==true && this.state.displayDesktopUI==false)==true &&(
					<MobileChampionsDisplay
						championProfilePicture={this.state.championModalData.imgUrl}
						displayChampionsExtendedMobileDisplay={this.displayMobileDisplayViaRemote}
						isOwner={this.state.isOwnProfile}
					/>
				)}
			</React.Fragment>
		)
	}


	displayCreatePostOptionTrigger=()=>{
		return  <li id="createPostIcon" onClick={()=>this.setState({displayCreationPortal:true})} 
					style={{listStyle:"none",marginLeft:"50px",marginBottom:"5%",cursor:"pointer"}}>
					<CreatePostButton>
						<BorderColorIcon
							id="postCreationIcon"
							style={{fontSize:"30",color:"#C8B0F4"}}
						/>
					</CreatePostButton>
				</li>
	}

	displayChampionModalTrigger=()=>{
		return  <li style={{listStyle:"none",marginLeft:"-165%"}}>
					{this.state.displayChampion==true &&(
						<SponsorDisplayModal
							championData={this.state.championModalData}
							isOwnProfile={this.state.isOwnProfile}
							isMobile={this.state.displayPhoneUI}
							pageTypeParamsId={this.props.match.params.id}
							profileIdAccessingDiv={this.props.personalInformation.id}
						/>
					)}
				</li>
	}

	closePostsModal=()=>{
		this.setState(prevState=>{
			return{
				...prevState,
				displayShadowBackground:false,
				displayPostData:false
			}
		})
	}

	closeProfilePicturesOptionsModal=()=>{
		this.setState({
			displayProfilePictureOptionsModal:false
		})
	}

	updateProfilePicture=(profileUrl)=>{
		this.setState({
			userProfile:{
				...this.state.userProfile,
				profilePicture:profileUrl
			},
			displayProfilePictureOptionsModal:false
		});
	}

	displayProfilePictureOptionsTrigger=()=>{
		return <React.Fragment>
					{this.state.displayProfilePictureOptionsModal==true &&(
						<ProfilePicturesDefaultOptionsModal
							userId={this.state.userProfile._id}
							targetDom={"personalContainer"}
							closeModal={this.closeProfilePicturesOptionsModal}
							accessToken={this.props.personalInformation.accessToken}
							refreshToken={this.props.personalInformation.refreshToken}
							updateProfilePicture={this.updateProfilePicture}
						/>
					)}
			   </React.Fragment>
	}

	triggerRetrieveFriendsGaugeSpecificPosts=(selectedPostId)=>{
		this.setState({
			currentRequestedFriendsGaugeNodeId:selectedPostId
		})
	}
	friendsGauge=()=>{
		return(
			<FriendsGauge
				personalInformation={{
					isOwnProfile:this.state.isOwnProfile,
					_id:this.state.userProfile._id,
					friendsGauge:this.state.userProfile.friendsGauge,
					friendsGaugeNodes:this.state.userProfile.friendsGaugeNodes,
					isGuestVisitorProfile:this.state.isGuestVisitorProfile
				}}
				pageTypeParamsId={this.props.match.params.id}
				retrieveFriendsGaugePosts={this.triggerRetrieveFriendsGaugeSpecificPosts}
				mobileUIStatus={{
				    displayPhoneUI:this.state.displayPhoneUI,
					displayIpadUI:this.state.displayIpadUI,
					displayDesktopUI:this.state.displayDesktopUI,
				}}
			/>
		)
	}
	desktopIpadFriendsGauge=()=>{
		return(
			<React.Fragment>
				{this.state.displayPhoneUI==false &&(
					<React.Fragment>
						{this.friendsGauge()}
					</React.Fragment>
				)}
			</React.Fragment>
		)
	}

	displayMobileFriendsGaugeComponent=()=>{
		return(
			<React.Fragment>
				{(this.state.isLoading==false && this.state.displayPhoneUI==true)==true &&(
					<React.Fragment>
						{this.friendsGauge()}
					</React.Fragment>
				)}
			</React.Fragment>
		)
	}

	personalInformation=(isMobileInformation)=>{
		return <PersonalInformation
					displayConfetti={this.displayConfetti}
					personalInformation={{
						_id:this.state.userProfile._id,
						isGuestProfile:this.state.isGuestProfile,
						isOwnProfile:this.state.isOwnProfile,
						firstName:this.state.userProfile.firstName,
						socialMediaUrls:{
							instagramUrl:"",
							tikTokUrl:""
						},
						isGuestVisitorProfile:this.state.isGuestVisitorProfile,
						recruits:this.state.userProfile.recruits,
						profilePicture:this.state.userProfile.profilePicture,
						isOligarch:this.state.userProfile.isOligarch
					}}
					displayDesktopUI={isMobileInformation==true?true:this.state.displayDesktopUI}
					displaySocialMediaModal={this.displaySocialMediaModal}
					displayMobileProfileOptionsTrigger={this.displayMobileProfileOptionsTrigger}
					userId={this.props.personalId}
					isLoading={this.state.isLoading}
					pageTypeParamsId={this.props.match.params.id}
					profileIdAccessingDiv={this.props.personalInformation.id}
				/>
	}

	profilePicture=()=>{
		return(
			<ProfilePicture
				state={{
					displayDesktopUI:this.state.displayDesktopUI,
					isOwnProfile:this.state.isOwnProfile,
					isGuestProfile:this.state.isGuestProfile,
					profilePicture:this.state.userProfile.profilePicture,
					isLoading:this.state.isLoading,
					displayPhoneUI:this.state.displayPhoneUI,
					displayIpadUI:this.state.displayIpadUI
				}}
				diplayMobileChampionTrigger={this.diplayMobileChampionTrigger}
				displayCreatePostOptionTrigger={this.displayCreatePostOptionTrigger}
				handleChangeProfilePicture={this.handleChangeProfilePicture}
			/>
		)
	}

	phoneProfilePicture=()=>{
		return(
			<React.Fragment>
				{this.state.displayPhoneUI==true &&(
					<>{this.profilePicture()}</>
				)}
			</React.Fragment>
		)
	}

	desktopProfilePicture=()=>{
		return(
			<React.Fragment>
				{(this.state.displayDesktopUI==true || this.state.displayIpadUI==true)==true &&(
					<>{this.profilePicture()}</>
				)}
			</React.Fragment>
		)
	}

	hideTokenLevelDetails=()=>{

		this.setState({
			displayTokenLevelDetails:false
		})
	}

	displayTokenLevelDetails=async()=>{
		const {confirmation,data}=await retrieveProfileTokenInformation(this.state.userProfile._id);
			if(confirmation=="Success"){
				const {message}=data;
				const {
					tokenScore,
					maxLevelScore,
					tokenLevel,
					ascensionStatus
				}=message;
				this.setState({
					displayTokenLevelDetails:true,
					tokenScore,
					tokenLevel
				});
			}else{
				alert("Unfortunately there has been an error when retrieving your token information. Please try again");
			}
	}

	handleTokenLevelDetailsDisplay=()=>{
		return(
			<React.Fragment>
				{this.state.displayTokenLevelDetails==true &&(
					<TokenPortalHOC
						targetDom={"personalContainer"}
						closeModal={this.hideTokenLevelDetails}
						component={<TokenLevelDetails
									tokenScore={this.state.tokenScore}
									tokenLevel={this.state.tokenLevel}
									closeModal={this.hideTokenLevelDetails}
								  />}
					/>
				)}
			</React.Fragment>
		)
	}



	render(){
		return(

			<UserProvider value={{
					...this.state,
					profilePicture:this.state.userProfile.profilePicture,
					mobilePhoneUIParameters:{
						displayPersonalInformation:this.displayPersonalInformationMobile,
						displayChampionsModal:this.displayChampionModalTrigger,
						championData:this.state.champion
					},
					updateFirstName:(firstName)=>{
						this.setState({
							userProfile:{
								...this.state.userProfile,
								firstName
							}
						})
					},
					displayTokenLevelDetails:()=>{
						this.displayTokenLevelDetails();
					}
				}}>
				<PostDisplayProvider
					value={{
						handleImagePostModal:(imagePostData,contextLocation)=>{
							this.setState({
								postData:imagePostData,
								contextLocation:contextLocation,
								displayPostData:true,
								displayShadowBackground:true,
								selectedDisplayPostType:"Images"
							})
						},
						handleVideoPostModal:(videoPostData,contextLocation)=>{
							this.setState({
								postData:videoPostData,
								contextLocation:contextLocation,
								displayPostData:true,
								displayShadowBackground:true,
								selectedDisplayPostType:"Videos"
							})
						},
						handleBlogPostModal:(blogPostData,contextLocation)=>{
							this.setState({
								postData:blogPostData,
								displayPostData:true,
								displayShadowBackground:true,
								selectedDisplayPostType:"Blogs"
							})
						},
						handleRegularPostModal:(regularPostData,contextLocation)=>{
							this.setState({
								postData:regularPostData,
								displayPostData:true,
								displayShadowBackground:true,
								contextLocation:contextLocation,
								selectedDisplayPostType:"Regular"
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
						<HeaderContainer>
							<GeneralNavBar
								page={"Profile"}
								routerHistory={this.props.history}
								targetDom={"personalContainer"}
								componentMountedStatus={this.state.componentMountedStatus}
								paramsPageId={this.props.match.params.id}
							/>
						</HeaderContainer>

						{this.state.displayShadowBackground==true &&(
							<ShadowContainer
								onClick={()=>this.closePostsModal()}
							/>
						)}
						{this.handleTokenLevelDetailsDisplay()}
						{this.displayProfilePictureOptionsTrigger()}
						{this.displayMobileProfileOptions()}
						{this.PostModal()}
						{this.socialMediaModal(this.state.userProfile.socialMediaUrls)}
						{this.displayPersonalInformationComponent()}


						<ProfileContainer>
							{this.state.isLoading==true && this.state.displayPhoneUI==false?
								<p>Please wait</p>:
								<>
									{this.desktopProfilePicture()}
									{this.displayMobileFriendsGaugeComponent()}
									<PersonalProfileInformationContainer>
										{this.personalInformation()}
									</PersonalProfileInformationContainer>
								</>
							}
							
						</ProfileContainer>
						{this.phoneProfilePicture()}
						
						{this.state.isLoading==true?null:
							<>
								{this.promotePortal()}
								{(this.state.displayOnboarding==true && this.state.isOwnProfile==true) &&(
									<OnboardingPersonalPage
										closeModal={this.closeOnboardingModal}
									/>
								)}
								
								{this.state.displayGuestOnboarding==true &&(
									<GuestOnboardingModal
										targetDom="personalContainer"
										closeModal={this.closeOnboardingModal}
									/>
								)}

								<PostInformationContainer>
									{this.desktopIpadFriendsGauge()}	

									<PersonalPostsIndexContainer
										id="postsContainer"
										displayShadowOverlay={this.displayShadow}
										disappearShadow={this.disappearShadow}
										displayCreationPortal={this.state.displayCreationPortal}
										closeModal={this.closeModal}
										personalInformation={{
											_id:this.state.userProfile._id,
											isGuestProfile:this.state.isGuestProfile,
											isOwnProfile:this.state.isOwnProfile,
											firstName:this.state.userProfile.firstName,
											socialMediaUrls:{
												instagramUrl:"",
												tikTokUrl:""
											},
											profilePicture:this.state.userProfile.profilePicture,
											crownedPost:this.state.userProfile.crownedPost,
											imagePost:this.state.userProfile.imagePost,
											isGuestVisitorProfile:this.state.isGuestVisitorProfile,
											recruits:this.state.userProfile.recruits,
											friendsGauge:this.state.userProfile.friendsGauge,
											friendsGaugeNodes:this.state.userProfile.friendsGaugeNodes
										}}
										uiStatus={{
										    displayPhoneUI:this.state.displayPhoneUI,
											displayIpadUI:this.state.displayIpadUI,
											displayDesktopUI:this.state.displayDesktopUI,
										}}
										history={this.props.history}
										visitorId={this.state.isOwnProfile==true?null:this.state.visitorId}
										displayConfetti={this.displayConfetti}
										isGuestProfile={this.state.isGuestProfile}
										isGuestVisitorProfile={this.state.isGuestVisitorProfile}
										updateEndOfPostsDBIndicator={this.updateEndOfPostsDBIndicator}
										handleVideoPostModal={this.handleVideoPostModal}
										currentRequestedFriendsGaugeNodeId={this.state.currentRequestedFriendsGaugeNodeId}
										pageTypeParamsId={this.props.match.params.id}
										profileIdAccessingDiv={this.props.personalInformation.id}
									/>
								</PostInformationContainer>
							</>
						}

						{this.state.displayDesktopUI==true && (
							<ul style={ChampionAndCreateButtonCSS}>
								{(this.state.isOwnProfile==true && this.state.isGuestProfile==false)==true && (
									<>{this.displayCreatePostOptionTrigger()}</>
								)}
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
		personalState:state.personalInformation,
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
