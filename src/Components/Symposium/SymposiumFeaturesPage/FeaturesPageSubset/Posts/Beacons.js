import React,{useState,useContext,useEffect} from "react";
import styled from "styled-components";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import {PostsHeader} from "./index.js";
import {FeaturesContext} from "../../FeaturesPageSet/FeaturesPageContext.js";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Images from "./PostDisplay/Images.js";
import Videos from "./PostDisplay/Videos.js";
import RegularPosts from "./PostDisplay/RegularPosts.js";
import BeaconPostExtended from "../../../../Symposium/ExtendedSymposium/SymposiumFeatures/Beacons/BeaconPostExtended/index.js";
import {useSelector} from "react-redux";
import PortalHoc from "../../FeaturesPageSet/Modals-Portals/PortalsHOC.js";
import {BeaconProgressBar} from "../SideBar/Beacons.js";
import NextButton from "./NextButton.js";

const Container=styled.div`
	display:flex;
	flex-direction:column;
	width:100%;
	@media screen and (max-width:650px){
		#currentSelectedPostOption{
			display:none !important;
		}
		#beaconsPostOptions{
			margin-right:10px !important;
			margin-left:-20px !important;
		}

		#beaconDropDownMenu{
			margin-left:-50px !important;
		}
	}
`;

const PostsContainer=styled.div`
	margin-top:2%;
	width:100%;
`;

const DropDownCSS={
	borderRadius:"50%",
	boxShadow:"1px 1px 5px #dbdddf",
	marginLeft:"2%",
	cursor:"pointer",
	marginLeft:"10%"
}

const PostTypeCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderRadius:"5px",
	borderColor:"#D8D8D8",
	display:"flex",
	alignItems:"center",
	flexDirection:"row",
	justifyContent:"center",
	padding:"10px",
	backgroundColor:"white",
	color:"#000000",
}

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%",
	height:"1px"
}

const SelectedPostTypeCSS={
	display:"flex",
	alignItems:"center",
	flexDirection:"row",
	justifyContent:"center",
	padding:"10px",
	backgroundColor:"#5298F8",
	color:"white",
	borderRadius:"5px",
	minWidth:"70%",
	marginLeft:"10%"
}

const NextButtonCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	color:"#3898ec",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	cursor:"pointer"
}


const Posts=({
	posts,
	postType,
	currentSymposiumId,
	isOligarchStatus,
	updatePrimaryPosts,
	featuresPageSecondaryInformation,
	updateSecondaryInformation})=>{

	const [selectedBeaconPost,changeSelectedBeaconPost]=useState();
	const [displaySelectedBeaconPost,changeSelectedBeaconPostDisplay]=useState(false);
	const personalInformation=useSelector(state=>state.personalInformation);
	const [selectedPostIndex,changeSelectedPostIndex]=useState();

	const triggerDisplaySelectedPost=(selectedPost,index)=>{
		changeSelectedPostIndex(index);
		changeSelectedBeaconPost(selectedPost);
		changeSelectedBeaconPostDisplay(true);
	}
	const postsDisplayFunctionality=()=>{
		const postDisplayFunctions={
			posts,
			triggerDisplaySelectedPost,
			isBeaconParentComponent:true,
			featurePageType:"Beacons"
		}
		switch(postType){
			case "Images":{
				return <Images {...postDisplayFunctions}/>
			}
			case "Videos":{
				return <Videos {...postDisplayFunctions}/>
			}

			case "Regular":{
				return <RegularPosts {...postDisplayFunctions}/>
			}
		}
	}


	const closeModal=()=>{
		changeSelectedBeaconPostDisplay(false);
	}

	const updateBeaconUpdatedStatus=(beaconId,beaconUpdateAcceptStatus)=>{
		
		let beaconPrimaryInformationPosts=posts;
		for(var i=0;i<beaconPrimaryInformationPosts.length;i++){

			if(beaconPrimaryInformationPosts[i].beaconId==beaconId){
				beaconPrimaryInformationPosts[i]={
					...beaconPrimaryInformationPosts[i],
					acceptedAnswerStatus:beaconUpdateAcceptStatus
				}
				break;
			}
		}

		updatePrimaryPosts(beaconPrimaryInformationPosts,false);
	}

	const updateBeaconAnsweredStatus=()=>{
		let beaconSecondaryInformation=featuresPageSecondaryInformation;
		let {
			progressBarInformation:{
				answeredBeacons
			}
		}=beaconSecondaryInformation;

		beaconSecondaryInformation={
			...beaconSecondaryInformation,
			progressBarInformation:{
				...beaconSecondaryInformation.progressBarInformation,
				answeredBeacons:answeredBeacons+1
			}
		}
		updateSecondaryInformation(beaconSecondaryInformation);

	}
	const deletedBeacon=()=>{
		posts.splice(selectedPostIndex,1);
		updatePrimaryPosts(posts);
	}


	const displaySelectedBeaconPostModal=()=>{
		return(
			<React.Fragment>
				{displaySelectedBeaconPost==true &&(
					<PortalHoc
						closeModal={closeModal}
						component={
							<BeaconPostExtended
								closeExtendedBeaconModal={closeModal}
								postData={selectedBeaconPost}
								postType={postType}
								symposiumId={currentSymposiumId}
								ownerId={personalInformation.id}
								isGuestProfile={personalInformation.isGuestProfile}
								isOligarch={isOligarchStatus}
								deletedBeacon={deletedBeacon}
								targetDom={"symposiumFeaturesPage"}
								updateBeaconAnsweredStatus={updateBeaconAnsweredStatus}
								updateBeaconUpdatedStatus={updateBeaconUpdatedStatus}
							/>
						}
					/>
				)}
			</React.Fragment>
		)
	}


	return(
		<React.Fragment>
			{displaySelectedBeaconPostModal()}
			{postsDisplayFunctionality()}
		</React.Fragment>
	)
}


const BeaconPosts=({featuresType,isLoading})=>{
	const [postType,changePostType]=useState("Images");
	const featuresPageConsumer=useContext(FeaturesContext);
	const {
		featuresPagePrimaryInformation:{
			posts
		},
		featuresPageSecondaryInformation,
		fetchPosts,
		isOligarchStatus,
		updateSecondaryInformation,
		currentSymposiumId,
		endOfPostIndicator,
		loadingNewPostsIndicator,
		updatePrimaryPosts,
		isDesktop,
		isGuestProfile
	}=featuresPageConsumer;

	const{ progressBarInformation }=featuresPageSecondaryInformation;
	const [displayMobileProgressBar,changeDisplayMobileProgressBar]=useState(!isDesktop);

	const displaySpecificBeaconPostType=(selectedPostType)=>{
		
		changePostType(selectedPostType);
		triggerFetchPostsNewPostType(selectedPostType);
	}




	const triggerFetchNextPosts=()=>{
		
		const beaconFetchParams={
			postType,
			isNextPostsRequest:true
		}
		fetchPosts("Beacons",beaconFetchParams);
	}

	const triggerFetchPostsNewPostType=(selectedPostType)=>{
		const beaconFetchParams={
			postType:selectedPostType,
			isNextPostsRequest:false
		}
		fetchPosts("Beacons",beaconFetchParams)
	}
	const mobileProgressBar=()=>{
		return(
			<React.Fragment>
				{displayMobileProgressBar==true &&(
					<BeaconProgressBar
						{...progressBarInformation}
						currentSymposiumId={currentSymposiumId}
						isGuestProfile={isGuestProfile}
					/>
				)}
			</React.Fragment>
		)
	}


	return(
		<Container>
			{mobileProgressBar()}
			<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
				<PostsHeader
					featuresType={featuresType}
					triggerPostTypeChange={displaySpecificBeaconPostType}
				/>
				<div id="beaconsPostOptions"
					style={{display:"flex",flexDirection:"row",alignItems:"center",marginRight:"165px"}}>
					<div class="dropdown">
						<button class="btn btn-primary dropdown-toggle" id="text"
							type="button" data-toggle="dropdown" style={PostTypeCSS}>
							<p>Post Type</p>
							<ArrowDropDownIcon
								style={{marginTop:"-10"}}
							/>
						</button>
						<ul id="beaconDropDownMenu"
							class="dropdown-menu" style={{padding:"5px",height:"250px",overflowY:"auto",overflowX:"hidden"}}>
							<li style={{listStyle:"none",cursor:"pointer"}}
								onClick={()=>displaySpecificBeaconPostType("Images")}>
								Images
							</li>
							<hr/>

							<li style={{listStyle:"none",cursor:"pointer"}}
								onClick={()=>displaySpecificBeaconPostType("Videos")}>
								Videos
							</li>
							<hr/>

							<li style={{listStyle:"none",cursor:"pointer"}}
								onClick={()=>displaySpecificBeaconPostType("Regular")}>
								Text/Audio
							</li>
							<hr/>
						</ul>
				  	</div>
				  	<div id="currentSelectedPostOption" style={SelectedPostTypeCSS}>
				  		<p>{postType}</p>
				  		<HighlightOffIcon
				  			style={{marginLeft:"5%",marginTop:"-5px"}}
				  		/>
				  	</div>
				</div>
			</div>
			<hr style={HorizontalLineCSS}/>
			<PostsContainer>
				{loadingNewPostsIndicator==true?
					<p>Loading...</p>:
					<React.Fragment>
						<Posts
							posts={posts}
							postType={postType}
							currentSymposiumId={currentSymposiumId}
							isOligarch={isOligarchStatus}
							updatePrimaryPosts={updatePrimaryPosts}
							updateSecondaryInformation={updateSecondaryInformation}
							featuresPageSecondaryInformation={featuresPageSecondaryInformation}
						/>

						<NextButton
							isLoading={isLoading}
							endOfPostIndicator={endOfPostIndicator}
							fetchNextPosts={triggerFetchNextPosts}
							postsLength={posts.length}
						/>

					</React.Fragment>
				}
			</PostsContainer>
		</Container>
	)
}


export{
	BeaconPosts,
	Posts
};