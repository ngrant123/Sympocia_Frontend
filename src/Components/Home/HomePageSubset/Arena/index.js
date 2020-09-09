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
	width:100%;
	transition:opacity 1s linear;
	opacity:1;
	height:100%;
`;


const CurtainContainer=styled.div`
	position:absolute;
	width:100%;
	height:100%;
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
	width:85%;
	height:85%;
	left:10%;
	padding:20px;
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

	useEffect(()=>{
		setTimeout(()=>{
			changeDisplayTransisitionContainer(true);

			setTimeout(()=>{
				changeDisplayArenaPage(true);
			},2000);
		},2000);
	},[]);


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
	return(
		<ArenaProvider
			value={{
				displayPreviousWinners:(postType)=>{
					changePostType(postType);
					changeDisplayPreviousWinners(true);
				},
				handleBoost:()=>{
					changeDisplayConfetti(true)
					setTimeout(()=>{
						changeDisplayConfetti(false);
					},5000);
				},
				displayPostModal:(postType,postData)=>{
					changePostType(postType);
					changePostData(postData);
					changeDisplayPost(true);
				},
				displayViewAllModal:(postType)=>{
					changePostType(postType);
					changeDisplayViewAll(true);
				},
				displayReactionModal:(postType)=>{
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
							<LeftContainer>
								<LeftStampIcon>
									<img src={StampIcon} style={{borderRadius:"50%",width:"200px",height:"200px"}}/>
								</LeftStampIcon>
							</LeftContainer>

							<RightContainer>
								<RightStampIcon>
									<img src={StampIcon} style={{borderRadius:"50%",width:"200px",height:"200px"}}/>
								</RightStampIcon>
							</RightContainer>
								<GeneralNavBar
									displayChatPage={displayChatPageHandle}
									page={"Home"}
								/>
								{displayConfetti==true?
									<Confetti
										style={{position:"fixed",width:"100%",height:"100%",zIndex:"20"}}
										run={true}
									/>:null
								}
								{displayPreviousWinners==true?
										<PreviousWinnersModal
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
										closeModal={()=>changeDisplayViewAll(false)}
										postType={modalPostType}
									/>:null
								}
								{displayReactions==true?
									<Reaction
										closeModal={()=>changeDisplayReactions(false)}
										postType={modalPostType}
									/>
									:null
								}
								<PostContainer>
									<p style={{fontSize:"20px"}}>
										<b>Welcome to the Arena</b>
									</p>
									<p> Here only the best content wins. No clout. Only talent. Let the games begins </p>
									<hr/>
									<ImageSection/>

									<hr/>
									<VideoSection/>

									<hr/>
									<BlogSection/>

									<hr/>
									<RegularPostSection/>
								</PostContainer>
						</Container>
					}
		

		
		</ArenaProvider>
	)
}

export default Arena;