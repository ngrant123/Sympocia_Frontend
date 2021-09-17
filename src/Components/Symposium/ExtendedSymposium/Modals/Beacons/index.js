import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {BackgroundModalContainer} from "../../indexCSS.js";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import BeaconPosts from "./BeaconPosts.js";
import Creation from "./Creation.js";
import BeaconPostExtended from "./BeaconPostExtended/index.js";
import {retrieveBeacons} from "../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import {useSelector} from "react-redux";

const Container=styled.div`
	position:fixed;
	background-color:white;
	border-radius:5px;
	width:40%;
	height:70%;
	z-index:41;
	left:30%;
	top:15%;
	padding:10px;
	display:flex;
	flex-direction:column;
	overflow-y:auto;
	overflow-x:auto;

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
	}

	@media screen and (max-width:650px){
		width:100% !important;
		left:0% !important;;
		top:0% !important;;
		height:100% !important;

		#mobileBeaconCloseIcon{
			display:block !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		top:20%;
		width:65%;
		left:15%;
	}
`;

const TitleAndCreationHeader=styled.div`
	display:flex;
	flex-direction:row;
`;

const BeaconContent=styled.div`
	display:flex;
	flex-direction:column;
`;

const PostTypes=styled.div`
	display:flex;
	flex-direction:row;
`;

const CreatePostButton=styled.div`
	width:50px;
	height:50px;
	border-radius:50%;
	background-color:white;
	border-color:white;
	border-style:solid;
	padding-top:10px;
	border-width:5px;
	animation: glowing 1300ms infinite;
	display:flex;
	align-item:center;
	justify-content:center;
	cursor:pointer;

	@keyframes glowing {
      0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
  }
`;



const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0"
}

const ButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  cursor:"pointer",
  marginRight:"2%",
  overflow:"hidden"
}



const Beacon=({closeModal,symposiumId,isGuestProfile,isDesktop,isOligarch})=>{
	const [displayCreationModal,changeDisplayCreationModal]=useState(false);
	const [displayExtendedModal,changeDisplayExtendedModal]=useState(false);
	const [displayPostDisplay,changePostDisplayModal]=useState(true);
	const [postType,changePostType]=useState("Images");
	const [posts,changePosts]=useState([]);
	const [selectedPost,changeSelectedPost]=useState();
	const [currentBeaconCounter,changeBeaconCounter]=useState(0);
	const [isLoading,changeIsLoading]=useState(false);
	const userInformation=useSelector(state=>state.personalInformation);
	const [endOfNewPosts,changeIsEndOfNewPosts]=useState(false);
	const [isFetchingNextPosts,changeIsFetchingNextPosts]=useState(false);
	const [selectedExtendedPostIndex,changeSelectedPostIndex]=useState();

	useEffect(()=>{
		fetchData(postType,currentBeaconCounter);
	},[]);

	const fetchData=async(selectedPostType,beaconCounter)=>{
		if(beaconCounter==0)
			changeIsLoading(true);
		else
			changeIsFetchingNextPosts(true);

		const {confirmation,data}=await retrieveBeacons(
											symposiumId,
											selectedPostType,
											beaconCounter
										);
		if(confirmation=="Success"){
			const {message}=data;
			let newPosts;
			if(beaconCounter>0){
				if(message.length==0){
					changeIsEndOfNewPosts(true);
				}
				newPosts=posts.concat(message)
			}else{
				newPosts=message;
			}
			changePosts([...newPosts])
			changePostType(selectedPostType);
			changeBeaconCounter(beaconCounter);
		}else{
			alert('An error has occured when retrieving the beacons.')
			closeModal();
		}
		changeIsLoading(false);
		changeIsFetchingNextPosts(false);
	}


	const targetElement=document.getElementById("extendedSymposiumContainer");
	const displayCreationModalTrigger=()=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free')
		}else{
			changeDisplayCreationModal(true);
			changePostDisplayModal(false);
		}
	}

	const updateBeaconPosts=(beaconPostType,beacon)=>{
		const currentBeaconPosts=posts;
		if(beaconPostType==postType){
			posts.splice(0,0,beacon);
			changePosts([...posts]);
			
		}
		changePostDisplayModal(true);
	}

	const triggerAlterPosts=(selectedPostType)=>{
		let counter;
		if(postType!=selectedPostType){
			counter=0;
			changeIsEndOfNewPosts(false);
		}else{
			counter=currentBeaconCounter+1;
		}
		fetchData(selectedPostType,counter);
	}

	const displayExtendedPostModal=(postData,selectedIndex)=>{
		changeSelectedPostIndex(selectedIndex);
		changePostDisplayModal(false);
		changeSelectedPost(postData);
		changeDisplayCreationModal(false);
		changeDisplayExtendedModal(true);
	}

	const deletedBeacon=()=>{
		posts.splice(selectedExtendedPostIndex,1);
		changePosts([...posts]);
	}
	const beaconDecider=()=>{
		if(displayPostDisplay==true){
			return(
				<React.Fragment>
					<div id="mobileBeaconCloseIcon" style={{display:"none"}} onClick={()=>closeModal()}>
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
						 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
						 stroke-linecap="round" stroke-linejoin="round">
						  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						  <circle cx="12" cy="12" r="9" />
						  <path d="M10 10l4 4m0 -4l-4 4" />
						</svg>
					</div>
					<TitleAndCreationHeader>
						<p style={{fontSize:"35px",marginRight:"10%"}}>
							<b>Beacons</b>
						</p>
						<CreatePostButton onClick={()=>displayCreationModalTrigger()}>
							<BorderColorIcon
								style={{fontSize:"20",color:"#C8B0F4"}}
							/>
						</CreatePostButton>
					</TitleAndCreationHeader>
					<p>Ask and you shall recieve </p>
					<hr style={HorizontalLineCSS}/>
					<BeaconContent>
						<PostTypes>
							<div onClick={()=>triggerAlterPosts("Images")} style={ButtonCSS}>
								Images
							</div>
							<div onClick={()=>triggerAlterPosts("Videos")} style={ButtonCSS}>
								Videos
							</div>
							<div onClick={()=>triggerAlterPosts("Regular")} style={ButtonCSS}>
								Regular Posts
							</div>
						</PostTypes>
						{isLoading==true?
							<p>Loading...</p>:
							<BeaconPosts
								posts={posts}
								postType={postType}
								displayExtendedPostModal={displayExtendedPostModal}
								triggerAlterPosts={triggerAlterPosts}
								endOfNewPosts={endOfNewPosts}
								isFetchingNextPosts={isFetchingNextPosts}
								targetDom={"extendedSymposiumContainer"}
							/>
						}
					</BeaconContent>
				</React.Fragment>
			)
		}else if(displayCreationModal==true){
			return(
				<Creation
					postType={postType}
					closeCreationModal={closeCreationModal}
					updateBeaconPosts={updateBeaconPosts}
					symposiumId={symposiumId}
					ownerId={userInformation.id}
					isDesktop={isDesktop}
				/>
			)
		}else{
			return(
				<BeaconPostExtended
					closeExtendedBeaconModal={closeExtendedBeaconModal}
					postData={selectedPost}
					postType={postType}
					symposiumId={symposiumId}
					ownerId={userInformation.id}
					isGuestProfile={isGuestProfile}
					isOligarch={isOligarch}
					deletedBeacon={deletedBeacon}
				/>
			)
		}
	}
	const closeExtendedBeaconModal=()=>{
		changeDisplayCreationModal(false);
		changePostDisplayModal(true);
	}


	const closeCreationModal=()=>{
		changeDisplayExtendedModal(false);
		changePostDisplayModal(true);
	}
	return createPortal(
		<React.Fragment>
			<Container>
				{beaconDecider()}
			</Container>

			<BackgroundModalContainer 
				onClick={()=>closeModal()}
			/>
		</React.Fragment>
	,targetElement)
}

export default Beacon;