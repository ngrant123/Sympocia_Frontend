import React,{useState,useContext} from "react";
import "react-step-progress-bar/styles.css";

import styled from "styled-components";
import { ProgressBar, Step } from "react-step-progress-bar";
import StampIcon from "../../../../../designs/img/StampIcon.png";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {FeaturesContext} from "../../FeaturesPageSet/FeaturesPageContext.js";
import ProgressBarExtendedModal from "../../FeaturesPageSet/Modals-Portals/Beacons/ProgressBarBeaconsExtended.js";
import TagsDropDownPortal from "../../FeaturesPageSet/Modals-Portals/DropDowns/TagsPortal.js";
import PortalsHOC from "../../FeaturesPageSet/Modals-Portals/PortalsHOC.js";
import CreationBeaconPortal from "../../FeaturesPageSet/Modals-Portals/Beacons/CreateBeaconPortal.js";
import {useSelector} from "react-redux";

const Container=styled.div`
	@media screen and (max-width:650px){
		#progressBar{
			width:95% !important;
		}
	}
`;

const ProgressBarOutLineCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#ECECEC",
	borderRadius:"10px",
	width:"90%"
}

const TagsContainerCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#ECECEC",
	borderRadius:"5px",
	display:"flex",
	flexDirection:"column"
}

const DropDownCSS={
	borderRadius:"50%",
	boxShadow:"1px 1px 5px #dbdddf",
	marginLeft:"2%",
	cursor:"pointer"
}


const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const TagOptionsCSS={
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"5px",
	color:"#3898ec",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	cursor:"pointer",
	display:"flex",
	flexDirection:"row",
	alignItems:"center",
	marginBottom:"2%",
	marginRight:"2%",
	height:"50px",
	overflow:"hidden"
}

const TagHeaderCSS={
	paddingLeft:"10px",
	paddingRight:"10px", 
	paddingTop:"10px",
	display:"flex",
	flexDirection:"row",
	justifyContent:"space-between",
	alignItems:"center"
}

const TagNumCSS={
	width:"25px",
	height:"25px",
	display:"flex",
	padding:"2px",
	alignItems:"center",
	justifyContent:"center",
	marginLeft:"15px",
	borderRadius:"50%",
	backgroundColor:"#3898ec",
	fontSize:"10px",
	color:"white"
}

const CreateButtonCSS={
	backgroundColor:"#C8B0F4",
	padding:"10px",
	display:"flex",
	alignItems:"center",
	justifyContent:"center",
	borderRadius:"5px",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#B38AFF",
	color:"white",
	cursor:"pointer",
	width:"100%"
}

const BeaconPostCreation=({
	featuresPagePrimaryInformation,
	featuresPageSecondaryInformation,
	updatePrimaryPosts,
	closeFeaturesPageCreationModal,
	selectedPostType,
	currentSymposiumId,
	personalInformation,
	isDesktop})=>{
	const featuresPageConsumer=useContext(FeaturesContext);
	const {
		currentBeaconSelectedPostType,
		updateSecondaryInformation
	}=featuresPageConsumer;

	const updateTagPostCount=(beaconTagName)=>{
		const{
			tags:{
				symposiumTags
			}
		}=featuresPageSecondaryInformation;

		for(var i=0;symposiumTags.length;i++){
			if(symposiumTags[i].name==beaconTagName){
				let symposiumTagPostCount=symposiumTags[i].postCountUsingTag;
				symposiumTagPostCount++;
				symposiumTags[i]={
					...symposiumTags[i],
					postCountUsingTag:symposiumTagPostCount
				}
				break;
			}
		}
		updateSecondaryInformation({
			...featuresPageSecondaryInformation,
			tags:{
				...featuresPageSecondaryInformation.tags,
				symposiumTags
			}
		})
	}	

	const updateCurrentBeaconPosts=(beaconPostType,beacon)=>{
		if(beaconPostType==currentBeaconSelectedPostType){
			let currentBeaconPrimaryInformation=featuresPagePrimaryInformation;
			const {posts}=currentBeaconPrimaryInformation;
			posts.splice(0,0,beacon);
			updatePrimaryPosts(posts,false);
			updateTagPostCount(beacon.tags[0].name);
		}
		closeFeaturesPageCreationModal();
	}

	const beaconCreationModals=()=>{
		return(
			<PortalsHOC
				closeModal={closeFeaturesPageCreationModal}
				component={
					<CreationBeaconPortal
						preSelectedPostType={selectedPostType}
						closeCreationModal={closeFeaturesPageCreationModal}
						updateBeaconPosts={updateCurrentBeaconPosts}
						symposiumId={currentSymposiumId}
						ownerId={personalInformation.id}
						isDesktop={isDesktop}
					/>
				}
			/>
		)
	}
	return(
		<React.Fragment>
			{beaconCreationModals()}
		</React.Fragment>
	)
}

const BeaconProgressBar=({
	currentSymposiumId,
	answeredBeacons,
	acceptedBeacons,
	totalBeacon,
	isProgressBarInExtendedModal,
	isGuestProfile})=>{

	const [displayProgressBarExtended,changeDisplayProgressParExtended]=useState(false);
	let [currentPercentage,changeCurrentPercentage]=useState(0);
	const beaconInteractedWith=answeredBeacons+acceptedBeacons;

	useState(()=>{
		let progressBarCompletion;
		let completedBeaconsAnsweredPercentage=(beaconInteractedWith)/totalBeacon;
		if(completedBeaconsAnsweredPercentage==1)
			progressBarCompletion=100;
		else{
			completedBeaconsAnsweredPercentage*=100;
			Math.floor(completedBeaconsAnsweredPercentage);
			progressBarCompletion=completedBeaconsAnsweredPercentage;
		}
		setTimeout(()=>{
	        while(currentPercentage<progressBarCompletion){
	        	changeCurrentPercentage(currentPercentage);
	          	currentPercentage++;
        	}
      	},1000);
	},[answeredBeacons]);

	const closeProgressBarExtendedModal=()=>{
		changeDisplayProgressParExtended(false);
	}

	const displayExtendedProgressBarModal=()=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free');
		}else{
			if(isProgressBarInExtendedModal!=true){
				changeDisplayProgressParExtended(true);
			}
		}
	}

	const constructNodeElements=()=>{
		
	    const ProgressBarSteps=[];
	    for(var i=0;i<2;i++){
	    	if(i==0){
	    		ProgressBarSteps.push(<div></div>);  
	    	}else{    		
				const StepElement= 	<Step transition="scale"
					                        index={0}>
					                    {({ accomplished,index }) => (
					                      <img
					                      	style={{ filter: `grayscale(0%)`,borderRadius:"50%",cursor:"pointer"}}
					                      	onClick={()=>displayExtendedProgressBarModal()}
			                                width="40"
			                                src={StampIcon}
			                              />
					                    )}
					                </Step>;
				ProgressBarSteps.push(StepElement);    	
	    	}
	    }
	    return ProgressBarSteps;
	}

	const progressBarModal=()=>{
		return(
			<React.Fragment>
				{displayProgressBarExtended==true &&(
					<PortalsHOC
						closeModal={closeProgressBarExtendedModal}
						component={
							<ProgressBarExtendedModal
								answeredBeacons={answeredBeacons}
								acceptedBeacons={acceptedBeacons}
								totalBeacon={totalBeacon}
								currentSymposiumId={currentSymposiumId}
								closeModal={closeProgressBarExtendedModal}
							/>
						}
					/>
				)}
			</React.Fragment>
		)
	}

	return(
		<React.Fragment>
			{progressBarModal()}
			<div>
				<p style={{fontSize:"18px"}}>
					<b>Your Progress</b>
				</p>
				<div id="progressBar" style={ProgressBarOutLineCSS}>
					<ProgressBar
		              percent={currentPercentage}
		              filledBackground="linear-gradient(to right, #F6F4FA, #C8B0F4)"
		              height={20}
		            >
		            	{constructNodeElements()}
		            </ProgressBar>
				</div>
	            <p style={{marginTop:"5%"}}>
	            	{beaconInteractedWith}/{totalBeacon} Answered
	            </p>
			</div>
		</React.Fragment>
	)
}

const BeaconSideBar=()=>{
	const featuresPageConsumer=useContext(FeaturesContext);
	const {
		featuresPageSecondaryInformation,
		featuresPagePrimaryInformation,
		updatePrimaryPosts,
		fetchPosts,
		currentPostType,
		currentSymposiumId,
		displayCreationModal,
		isGuestProfile,
		isDesktop,
		triggerGenerateAirPlane
	}=featuresPageConsumer;

	const {
		progressBarInformation,
		tags:{
			symposiumTags,
			ownerCreationTagStatus
		}
	}=featuresPageSecondaryInformation;

	const personalInformation=useSelector(state=>state.personalInformation);
	const [selectedTags,changeSelectedTags]=useState([]);
	const [displayTagOptions,changeDisplayTagOptions]=useState(false);
	const [displayBeaconCreation,changeDisplayBeaconCreation]=useState(false);
	const [selectedPostType,changeSelectedPostType]=useState();

	const constructTags=()=>{
		return(
			<React.Fragment>
				{symposiumTags.length==0?
					<p>No tags</p>:
					<React.Fragment>
						{symposiumTags.map(data=>
							<div onClick={()=>addTag(data)} style={TagOptionsCSS}>
								<p>
									{data.name}
								</p>
								<div style={TagNumCSS}>
									{data.postCountUsingTag}
								</div>
							</div>
						)}
					</React.Fragment>
				}
			</React.Fragment>
		)
	}

	const addTag=(tagData)=>{
		const currentTags=selectedTags;
		let isProspectiveTagAlreadyPicked=false;

		for(var i=0;i<currentTags.length;i++){
			if(currentTags[i]._id==tagData._id){
				isProspectiveTagAlreadyPicked=true;
				break;
			}
		}
		if(isProspectiveTagAlreadyPicked==false){
			selectedTags.push(tagData);
			changeSelectedTags([...selectedTags]);
			const beaconFetchParams={
				postType:currentPostType,
				tags:selectedTags,
				isNextPostsRequest:false
			}
			fetchPosts("Beacons",beaconFetchParams);
		}
	}

	const removeSelectedTag=(selectedTagId)=>{
		for(var i=0;i<selectedTags.length;i++){
			if(selectedTags[i]._id==selectedTagId){
				selectedTags.splice(i,1);
				break;
			}
		}
		changeSelectedTags([...selectedTags]);
		const beaconFetchParams={
			postType:currentPostType,
			tags:selectedTags,
			isNextPostsRequest:false
		}
		fetchPosts("Beacons",beaconFetchParams);
	}

	const seletectedTags=()=>{
		return(
			<React.Fragment>
				{selectedTags.length!=0 &&(
					<div style={{width:"100%",display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
						{selectedTags.map(data=>
							<div style={{marginLeft:"2%",marginRight:"5%",display:"flex",flexDirection:"row"}}>
								<p>
									{data.name}
								</p>
								<HighlightOffIcon
									onClick={()=>removeSelectedTag(data._id)}
									style={{cursor:"pointer"}}
								/>
							</div>	
						)}
					</div>
				)}
			</React.Fragment>
		)
	}

	const closeTagOptionsModal=()=>{
		changeDisplayTagOptions(false);
	}

	const closeFeaturesPageCreationModal=()=>{
		changeDisplayBeaconCreation(false);
	}

	const triggerDisplayCreationModal=(selectedPostType)=>{
		if(isGuestProfile==true){
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free');
		}else{
			changeSelectedPostType(selectedPostType);
			changeDisplayBeaconCreation(true);
		}
	}

	return(
		<Container>
			{displayBeaconCreation==true &&(
				<BeaconPostCreation
					featuresPagePrimaryInformation={featuresPagePrimaryInformation}
					featuresPageSecondaryInformation={featuresPageSecondaryInformation}
					updatePrimaryPosts={updatePrimaryPosts}
					closeFeaturesPageCreationModal={closeFeaturesPageCreationModal}
					selectedPostType={selectedPostType}
					currentSymposiumId={currentSymposiumId}
					personalInformation={personalInformation}
					isDesktop={isDesktop}
				/>
			)}
			{displayTagOptions==true &&(
				<TagsDropDownPortal
					closeModal={closeTagOptionsModal}
					ownerCreationTagStatus={ownerCreationTagStatus}
					symposiumId={currentSymposiumId}
					isGuestProfile={isGuestProfile}
				/>
			)}
			<BeaconProgressBar
				{...progressBarInformation}
				currentSymposiumId={currentSymposiumId}
				isGuestProfile={isGuestProfile}
			/>


			<div style={{padding:"30px"}} id="tagsOptions" onClick={()=>triggerGenerateAirPlane("tagsOptions")}>
				<div style={TagsContainerCSS}>
					<div style={TagHeaderCSS}>
						<p>
							<b>Tags</b>
						</p>
						<div style={DropDownCSS} onClick={()=>changeDisplayTagOptions(true)}>
							<ExpandMoreIcon
								style={{fontSize:"24"}}
							/>
						</div>
					</div>
					<hr style={HorizontalLineCSS}/>

					{seletectedTags()}

					<div style={{display:"flex",flexDirection:"row",flexWrap:"wrap",height:"200px",overflowY:"auto",padding:"10px"}}>
						{constructTags()}
					</div>
				</div>
			</div>
			<div class="dropdown" id="beaconCreation">
				<button class="btn btn-primary dropdown-toggle" type="button" 
					data-toggle="dropdown" style={CreateButtonCSS}>
					
					Create Beacon
				</button>

				<ul class="dropdown-menu" 	
					style={{padding:"20px",height:"170px",marginTop:"-220px",width:"90%",overflow:"auto"}}>
					<li style={{listStyle:"none",cursor:"pointer"}}
						onClick={()=>triggerDisplayCreationModal("Images")}>
						Images
					</li>
					<hr/>

					<li style={{listStyle:"none",cursor:"pointer"}}
						onClick={()=>triggerDisplayCreationModal("Videos")}>
						Videos
					</li>
					<hr/>

					<li style={{listStyle:"none",cursor:"pointer"}}
						onClick={()=>triggerDisplayCreationModal("Regular")}>
						Regular
					</li>
					<hr/>
				</ul>
		  	</div>
		</Container>
	)
}


export{
	BeaconSideBar,
	BeaconProgressBar,
	BeaconPostCreation
}