import React,{useState,useEffect} from "react";
import styled from "styled-components";
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

const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
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
	const [displayChatPage,changeDisplayChatPage]=useState(false);
	const [displayConfetti,changeDisplayConfetti]=useState(false);
	const [displayPreviousWinners,changeDisplayPreviousWinners]=useState(false);
	const [displayPost,changeDisplayPost]=useState(false);
	const [displayReactions,changeDisplayReactions]=useState(false);

	const [postData,changePostData]=useState();
	const [displayViewAll,changeDisplayViewAll]=useState(false);
	const [modalPostType,changePostType]=useState();


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
			<Container id="arenaContainer">
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
		</ArenaProvider>
	)
}

export default Arena;