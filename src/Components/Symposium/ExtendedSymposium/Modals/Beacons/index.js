import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {BackgroundModalContainer} from "../../indexCSS.js";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import BeaconPosts from "./BeaconPosts.js";
import Creation from "./Creation.js";
import BeaconPostExtended from "./BeaconPostExtended/index.js";

const Container=styled.div`
	position:fixed;
	background-color:white;
	border-radius:5px;
	width:40%;
	height:70%;
	z-index:46;
	left:30%;
	top:15%;
	padding:10px;
	display:flex;
	flex-direction:column;
	overflow:scroll;

	@media screen and (max-width:640px){
		width:90% !important;
		left:5% !important;
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
  marginRight:"2%"
}



const Beacon=({closeModal})=>{
	
	const [displayCreationModal,changeDisplayCreationModal]=useState(false);
	const [displayExtendedModal,changeDisplayExtendedModal]=useState(false);
	const [displayPostDisplay,changePostDisplayModal]=useState(true);
	const [postType,changePostType]=useState("Images");
	const [posts,changePosts]=useState([]);
	const [selectedPost,changeSelectedPost]=useState();



	const targetElement=document.getElementById("extendedSymposiumContainer");
	const displayCreationModalTrigger=()=>{
		changeDisplayCreationModal(true);
		changePostDisplayModal(false);
	}

	const updateBeaconPosts=(beaconPostType,beacon)=>{
		debugger;
		const currentBeaconPosts=posts;
		if(beaconPostType==postType){
			posts.splice(0,1,beacon);
			changePosts([...posts]);
			
		}
		changePostDisplayModal(true);
	}

	const triggerChangePostType=(postType)=>{
		changePosts([]);
	}
	const displayExtendedPostModal=(postData)=>{
		changeSelectedPost(postData);
		changeDisplayExtendedModal(true);
		changeDisplayCreationModal(false);
		changePostDisplayModal(false);
	}
	const beaconDecider=()=>{
		if(displayPostDisplay==true){
			return(
				<React.Fragment>
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
					<hr style={HorizontalLineCSS}/>
					<BeaconContent>
						<PostTypes>
							<div onClick={()=>triggerChangePostType("Images")} style={ButtonCSS}>
								Images
							</div>
							<div onClick={()=>triggerChangePostType("Videos")} style={ButtonCSS}>
								Videos
							</div>
							<div onClick={()=>triggerChangePostType("Regular")} style={ButtonCSS}>
								Regular Posts
							</div>
						</PostTypes>
						<BeaconPosts
							posts={posts}
							postType={postType}
							displayExtendedPostModal={displayExtendedPostModal}
						/>
					</BeaconContent>
				</React.Fragment>
			)
		}else if(displayCreationModal==true){
			return(
				<Creation
					postType={postType}
					closeCreationModal={closeCreationModal}
					updateBeaconPosts={updateBeaconPosts}
				/>
			)
		}else{
			return(
				<BeaconPostExtended
					closeExtendedBeaconModal={closeExtendedBeaconModal}
					postData={selectedPost}
					postType={postType}
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