import React,{useState,useEffect} from "react";
import styled, {keyframes} from "styled-components";
import {GeneralNavBar} from "../../../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import ImageSection from "./ImageSection.js";
import VideoSection from "./VideoSection.js";
import BlogSection from "./BlogSection.js";
import RegularPostSection from "./RegularPostSection.js";
import Confetti from "react-confetti";
import PreviousWinnersModal from "./Modals/PreviousWinners.js";
import PostModal from "./Modals/Post.js";

import ViewAll from "./Modals/ViewAll.js";
import {ArenaProvider} from "./ArenaContext.js";
import Reaction from "./Modals/Reactions.js";
import StampIcon from "../../../../designs/img/StampIcon.png";
import OnboardingModal from "../../../OnBoarding/ArenaPageOnboarding.js";
import {useSelector} from "react-redux";
import {
	addTextReaction,
	addVideoReaction,
	addBoost,
	addStampToTextReaction,
	addStampToVideoReaction,
	removeVideoReaction,
	removeTextReaction
} from "../../../../Actions/Requests/ArenaPageAxiosRequests/ArenaPageSetRequests.js";  


 import {
 	getCurrentArenaPosts,
	fetchArenaInformation,
	getVideoReactions,
	getTextComments,
	getPreviousWinners
} from "../../../../Actions/Requests/ArenaPageAxiosRequests/ArenaPageGetRequests.js";   
import WinnersDisplay from "./Modals/WinnersDisplay.js";
import {changeHasViewedArenaWinnersIndicator} from "../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";

const keyFrameLeft=keyframes`
0% {
	left:0%;
  }
  100% {
    left:-50%;
  }

`;


const keyFrameRight=keyframes`
	  0%{
	   	left:50%;
	  }
	  100%{
	  	left:100%;
	  }

`;

const Container=styled.div`
	position:absolute;
	transition:opacity 1s linear;
	opacity:1;
	min-width:100%;
	min-height:100%;
	width:100%;
	height:100%;
	@media screen and (max-width:1370px) and (max-height:1030px){
		top:10% !important;
    }
    @media screen and (max-width:1365px){
    	top:0% !important;
    }

`;


const CurtainContainer=styled.div`
	position:absolute;
	min-width:100%;
	min-height:100%;
`;

const CurtainContainerTransition=styled.div`
	position:absolute;
	width:100%;
	height:100%;
`;
const StampIconContainer=styled.div`
	position:absolute;
	left:45%;
	top:30%;
	@media screen and (max-width:1370px){
		left:10% !important;
		#stampIcon{
			width:10px !important;
			height:10px !important
		}
	}
`;

const LeftStampIcon=styled.div`
	position:absolute;
	left:87%;
	top:30%;
`;

const RightStampIcon=styled.div`
	position:absolute;
	left:-13%;
	top:30%;
`;

const LeftContainer=styled.div`
	position:absolute;
	height:100%;
	width:50%;
	background-color:white;
	transition: transform 300ms ease-in-out;
	animation-timing-function: linear;
	animation:${keyFrameLeft} 1s ease-in-out 0s forwards;
	overflow:hidden;
	z-index:20;
`;


const RightContainer=styled.div`
	position:absolute;
	left:50%;
	height:100%;
	width:50%;
	background-color:white;
	animation-timing-function: linear;
	animation:${keyFrameRight} 1s ease-in-out 0s forwards;
	overflow:hidden;
	z-index:20;
`;


const PostContainer=styled.div`
	position:absolute;
	top:12%; 
	width:100%%;
	height:100%;
	left:10%;
	padding:20px;

	@media screen and (max-width:1365px){
    	top:12% !important;
    }

	@media screen and (max-width:1370px) and (max-height:1030px){
		top:20% !important;
    }
`;


const Arena=()=>{
	const [displayTransitionContainer,changeDisplayTransisitionContainer]=useState(false);
	const [displayArena,changeDisplayArenaPage]=useState(false)

	const [displayChatPage,changeDisplayChatPage]=useState(false);
	const [displayConfetti,changeDisplayConfetti]=useState(false);
	const [displayPreviousWinners,changeDisplayPreviousWinners]=useState(false);
	const [displayPost,changeDisplayPost]=useState(false);
	const [displayReactions,changeDisplayReactions]=useState(false);

	const [postData,changePostData]=useState();
	const [displayViewAll,changeDisplayViewAll]=useState(false);
	const [modalPostType,changePostType]=useState();
	const [displayOnboardingModal,changeDisplayOnboardingModal]=useState(false);


	const [secondaryModalPosts,changeSecondaryModalPosts]=useState([]);
	const [arenaId,changeArenaId]=useState();
	const [boostedPost,changeBoostedPost]=useState();

	const [arenaImages,changeArenaImages]=useState([]);
	const [arenaVideos,changeArenaVideos]=useState([]);
	const [arenaBlogs,changeArenaBlogs]=useState([]);
	const [postArenaId,changePostArenaId]=useState();

	const [arenaRegularPosts,changeArenaRegularPosts]=useState();
	const personalId=useSelector(state=>state.personalInformation.id);

	const [displayWinnersModal,changeDisplayWinnersModal]=useState(false);
	const [winnersInformation,changeWinnersInformation]=useState();
	const [displayDesktopUI,changeDesktopUI]=useState(false);


	useEffect(()=>{
		const fetchInformation=async()=>{
				const {confirmation,data}=await fetchArenaInformation(personalId);
				
				if(confirmation=="Success"){
					const {
						Images,
						Blogs,
						RegularPosts,
						Videos,
						isCompetitionWinnersAvailable,
						displayWinnerModal
					}=data;

					
					if(isCompetitionWinnersAvailable==true && displayWinnerModal==true){
						changeWinnersInformation(data);
						changeDisplayWinnersModal(true);
					}

					changeArenaImages(Images);
					changeArenaVideos(Videos);
					changeArenaBlogs(Blogs);
					changeArenaRegularPosts(RegularPosts);

					setTimeout(()=>{
						changeDisplayTransisitionContainer(true);
						setTimeout(()=>{
							changeDisplayArenaPage(true);
							document.getElementById("leftStampContainer").style.display="none";
							document.getElementById("rightStampContainer").style.display="none";
						},2000);
					},2000);
				}else{
					alert('Unfortunately there has been an error when getting the arena information. Please try again')
				}
		}
		fetchInformation();
		triggerUIChange();
	},[]);

	window.addEventListener('resize',triggerUIChange)

	const triggerUIChange=()=>{
		if(window.innerWidth<1370){
			changeDesktopUI(false);
		}else{
			changeDesktopUI(true);
		}
	}


	const displayChatPageHandle=(pageIndicator)=>{
		changeDisplayChatPage(true);

		/*
			this.setState(prevState=>({

				...prevState,
				displayChatPage:true,
				chatPageIndicator:pageIndicator
			}))
		*/
	}

	const closeOnboardingModal=()=>{
		changeDisplayOnboardingModal(false);
	}

	const onboardingModal=()=>{
		return <>
					{displayOnboardingModal==true &&(
						<OnboardingModal
							closeModal={closeOnboardingModal}
						/>
					)}
			   </>
	}
	const handleBoost=async(boostInformation)=>{
		
		const{
			postType,
			postId
		}=boostInformation;

		const {confirmation,data}=await addBoost({
			...boostInformation,
			userId:personalId
		});

		let arenaPosts;
		let postParameter;
		let stateUpdate;

		switch(postType){
			case 'Images':{
				arenaPosts=arenaImages;
				postParameter='image';
				stateUpdate=changeArenaImages;
				break;
			}
			case 'Videos':{
				arenaPosts=arenaVideos;
				postParameter='video';
				stateUpdate=changeArenaVideos;
				break;
			}
			case 'Blogs':{
				arenaPosts=arenaBlogs;
				postParameter='blog';
				stateUpdate=changeArenaBlogs;
				break;
			}
			case 'RegularPosts':{
				arenaPosts=arenaRegularPosts;
				postParameter='regularPost';
				stateUpdate=changeArenaRegularPosts;
				break;
			}
		}

		const {posts}=arenaPosts;
		if(confirmation=="Success"){
			for(var i=0;i<posts.length;i++){
				const {_id}=posts[i];
				const {score}=posts[i];
				if(_id==postId){
					posts[i]={
						...posts[i],
						score:score+1,
						[postParameter]:{
							...posts[i][postParameter],
							hasProfileVoted:true
						}
					}
				}
			}
			posts.sort((a,b)=>(a.score<b.score)?1:-1)
			stateUpdate({
				...arenaPosts,
				posts
			});
			changeDisplayConfetti(true)
			setTimeout(()=>{
				changeDisplayConfetti(false);
			},5000);

		}else{
			alert('Unfortunately there has been an error with boosting this post. Please try again');
		}
	}

	const closeWinnersModal=()=>{
		changeHasViewedArenaWinnersIndicator(personalId);
		changeDisplayWinnersModal(false);
	}

	const displayConfettiHandle=()=>{
		changeDisplayConfetti(true)
		setTimeout(()=>{
			changeDisplayConfetti(false);
		},5000);
	}

	const handleDisplayWinnersModal=()=>{
		return <>
					{displayWinnersModal==true &&(
						<WinnersDisplay
							closeModal={closeWinnersModal}
							displayConfetti={displayConfettiHandle}
							winnersData={winnersInformation}
						/>
					)}
			   </>
	}

	const ArenaCurtain=()=>{
		return <>
					<LeftContainer id="leftStampContainer">
						<LeftStampIcon>
							<img src={StampIcon} style={{borderRadius:"50%",width:"200px",height:"200px"}}/>
						</LeftStampIcon>
					</LeftContainer>

					<RightContainer id="rightStampContainer">
						<RightStampIcon>
							<img src={StampIcon} style={{borderRadius:"50%",width:"200px",height:"200px"}}/>
						</RightStampIcon>
					</RightContainer>
			   </>
	}
	return(
		<ArenaProvider
			value={{
					arenaId:arenaId,
					displayPreviousWinners:async(postType)=>{
						const {confirmation,data}=await getPreviousWinners({
							previousWinnerPageCounter:2,
							postType
						});
						if(confirmation=="Success"){
							changeSecondaryModalPosts(data);
							changePostType(postType);
							changeDisplayPreviousWinners(true);
						}else{
							alert('Unfortunately there has been an error with getting the previous winners. Please try again');
						}
					},
					triggerBoostCall:(boostInformation)=>{
						handleBoost(boostInformation);
					},
					displayPostModal:(postType,postData)=>{
						changePostType(postType);
						changePostData(postData);
						changeDisplayPost(true);
					},
					displayViewAllModal:async(postPageCounter,postType)=>{
	 					
						const {confirmation,data}=await getCurrentArenaPosts({
															postPageCounter,
															postType
														});
						
						if(confirmation=="Success"){
							const {
								currentContestants
							}=data;
							changeSecondaryModalPosts(currentContestants);
							changePostType(postType);
							changeDisplayViewAll(true);
						}else{
							alert('Unfortunately there has been an error trying to get the arena posts. Please try again');
						}
					},
					displayReactionModal:(postType,postArenaId)=>{
						changePostArenaId(postArenaId);
						changePostType(postType);
						changeDisplayReactions(true);
					}
				}}
			>
					{displayTransitionContainer==false?
						<CurtainContainer>
								<StampIconContainer>
									<img src={StampIcon} style={{borderRadius:"50%",width:"200px",height:"200px"}}/>
								</StampIconContainer>
						</CurtainContainer>:
						<Container id="arenaContainer">
							<LeftContainer id="leftStampContainer">
								<LeftStampIcon>
									<img src={StampIcon} style={{borderRadius:"50%",width:"200px",height:"200px"}}/>
								</LeftStampIcon>
							</LeftContainer>

							<RightContainer id="rightStampContainer">
								<RightStampIcon>
									<img src={StampIcon} style={{borderRadius:"50%",width:"200px",height:"200px"}}/>
								</RightStampIcon>
							</RightContainer>
								<GeneralNavBar
									displayChatPage={displayChatPageHandle}
									page={"Home"}
									targetDom={"arenaContainer"}
								/>
								{onboardingModal()}
								{displayConfetti==true?
									<Confetti
										style={{position:"fixed",width:"100%",height:"100%",zIndex:"20"}}
										run={true}
									/>:null
								}
								{displayPreviousWinners==true?
										<PreviousWinnersModal
											currentPosts={secondaryModalPosts}
											closeModal={()=>changeDisplayPreviousWinners(false)}
											postType={modalPostType}
										/>:null
								}
								{displayPost==true?
									<PostModal
										closeModal={()=>changeDisplayPost(false)}
										postType={modalPostType}
										postData={postData}
									/>:null
								}
								{displayViewAll==true?
									<ViewAll
										currentPosts={secondaryModalPosts}
										closeModal={()=>changeDisplayViewAll(false)}
										postType={modalPostType}
									/>:null
								}
								{displayReactions==true?
									<Reaction
										currentPosts={secondaryModalPosts}
										closeModal={()=>changeDisplayReactions(false)}
										postType={modalPostType}
										arenaId={postArenaId}
									/>
									:null
								}
								{handleDisplayWinnersModal()}
								<PostContainer>
										<p style={{fontSize:"20px"}}>
											<b>Welcome to the Arena</b>
										</p>
										<p> Here only the best content wins. No clout. Only talent. Let the games begins </p>
										<hr/>
										<ImageSection
											posts={arenaImages}
											isDesktop={displayDesktopUI}
										/>

										<hr/>
										<VideoSection
											posts={arenaVideos}
											isDesktop={displayDesktopUI}
										/>

										<hr/>
										<BlogSection
											posts={arenaBlogs}
											isDesktop={displayDesktopUI}
										/>

										<hr/>
										<RegularPostSection
											posts={arenaRegularPosts}
											isDesktop={displayDesktopUI}
										/>
								</PostContainer>
						</Container>
					}
		

		
		</ArenaProvider>
	)
}

export default Arena;