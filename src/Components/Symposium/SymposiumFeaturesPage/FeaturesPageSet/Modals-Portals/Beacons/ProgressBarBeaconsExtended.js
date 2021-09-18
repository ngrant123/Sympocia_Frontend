import React,{useState,useContext} from "react";
import styled from "styled-components";
import {BeaconProgressBar} from "../../../FeaturesPageSubset/SideBar/Beacons.js";
import {
	getBeaconsTargetIdInteractedWith,
    getTargetIdAcceptedBeacons
} from "../../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import {useSelector} from "react-redux";
import {Posts} from "../../../FeaturesPageSubset/Posts/Beacons.js";
import {FeaturesContext} from "../../../FeaturesPageSet/FeaturesPageContext.js";

const Container=styled.div`
	width:100%;
	height:100%;
`;

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
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
	marginLeft:"10%"
}
const ProgressBarBeaconsExtended=({currentSymposiumId,answeredBeacons,acceptedBeacons,totalBeacon})=>{

	const [displayBeaconPosts,changeDisplayBeaconPosts]=useState(false);
	const [selectedPostType,changeSelectedPostType]=useState();
	const [currentPostTokenManagement,changePostTokenManagement]=useState();
	const [posts,changePosts]=useState([]);
	const personalInformation=useSelector(state=>state.personalInformation);
	const [isLoading,changeIsLoading]=useState(false);
	const featuresPageConsumer=useContext(FeaturesContext);


	const {
		featuresPageSecondaryInformation,
		isOligarch,
		updateSecondaryInformation,
		updatePrimaryPosts
	}=featuresPageConsumer;

	const mobileCloseIcon=()=>{
		return(
			<div id="mobileCloseModalIcon" style={{cursor:"pointer",display:"none"}} >
				<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
					 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
					 stroke-linecap="round" stroke-linejoin="round">
					  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					  <circle cx="12" cy="12" r="9" />
					  <path d="M10 10l4 4m0 -4l-4 4" />
				</svg>
			</div>
		)
	}

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const fetchBeaconsInteracted=async(postType,currentPostTokenManagement)=>{
		const {confirmation,data}=await getBeaconsTargetIdInteractedWith({
			ownerId:personalInformation.id,
            symposiumId:currentSymposiumId,
            beaconType:postType,
            currentPostSessionManagment:currentPostTokenManagement
		});

		if(confirmation=="Success"){
			const {message}=data;
			if(posts.length==0){
				changePosts([...message]);
			}else{
				posts.concat(message);
				changePosts([...posts]);
			}
		}else{
			alert('Unfortunately there was an error when retrieving the answered beacons');
		}
		return;
	}


	const fetchBeaconsAccepted=async(postType,currentPostTokenManagement)=>{
		debugger;
		const {confirmation,data}=await getTargetIdAcceptedBeacons({
			ownerId:personalInformation.id,
            symposiumId:currentSymposiumId,
            beaconType:postType,
            currentPostSessionManagment:currentPostTokenManagement
		});


		if(confirmation=="Success"){
			const {message}=data;
			if(posts.length==0){
				changePosts([...message]);
			}else{
				posts.concat(message);
				changePosts([...posts]);
			}
		}else{
			alert('Unfortunately there was an error when retrieving the accepted beacons');
		}
		return;
	}

	const triggerDisplayPosts=async(retrievalType,postType)=>{
		debugger;
		let currentPostToken=currentPostTokenManagement;
		if(postType!=selectedPostType){
			currentPostToken=uuidv4();
			changePostTokenManagement(currentPostToken);
			changePosts([]);
			changeSelectedPostType(postType);
		}
		changeDisplayBeaconPosts(true);
		changeIsLoading(true);
		if(retrievalType=="accepted"){
			await fetchBeaconsAccepted(
				postType,
				currentPostToken);
		}else{
			await fetchBeaconsInteracted(
				postType,
				currentPostToken);
		}
		changeIsLoading(false);
	}

	const triggerViewPosts=(beaconReviewType)=>{
		return(
			<div class="dropdown">
				<button class="btn btn-primary dropdown-toggle" id="text"
					type="button" data-toggle="dropdown" style={ButtonCSS}>
					<p>View Posts</p>
				</button>
				<ul class="dropdown-menu" style={{padding:"5px",height:"170px",overflowY:"auto",overflowX:"hidden"}}>
					<li style={{listStyle:"none",cursor:"pointer"}}
						onClick={()=>triggerDisplayPosts(beaconReviewType,"Images")}>
						Images
					</li>
					<hr/>

					<li style={{listStyle:"none",cursor:"pointer"}}
						onClick={()=>triggerDisplayPosts(beaconReviewType,"Videos")}>
						Videos
					</li>
					<hr/>

					<li style={{listStyle:"none",cursor:"pointer"}}
						onClick={()=>triggerDisplayPosts(beaconReviewType,"Text")}>
						Regular Posts
					</li>
					<hr/>
				</ul>
		  	</div>
		)
	}

	return(
		<Container>
			{mobileCloseIcon()}
			{displayBeaconPosts==true?
				<div>
					{isLoading==true?
						<p>Loading...</p>:
						<React.Fragment>
							<div style={{...ButtonCSS,marginLeft:"0%",marginBottom:"5%"}} 
								onClick={()=>changeDisplayBeaconPosts(false)}>
								Back
							</div>
							<Posts
								posts={posts}
								postType={selectedPostType}
								currentSymposiumId={currentSymposiumId}
								isOligarch={isOligarch}
								updatePrimaryPosts={updatePrimaryPosts}
								updateSecondaryInformation={updateSecondaryInformation}
								featuresPageSecondaryInformation={featuresPageSecondaryInformation}
							/>
						</React.Fragment>
					}
				</div>:
				<React.Fragment>
					<p style={{fontSize:"24px"}}>
						<b>Progress Bar</b>
					</p>
					<hr style={HorizontalLineCSS}/>
					<BeaconProgressBar
						acceptedBeacons={acceptedBeacons}
						answeredBeacons={answeredBeacons}
						totalBeacon={totalBeacon}
						isProgressBarInExtendedModal={true}
					/>

					<div style={{display:"flex",flexBox:"row",marginTop:"5%",alignItems:"center"}}>
						<p>
							<b>Beacons answered:</b>
						</p>
						<p style={{marginLeft:"5%",color:"#43D351"}}>{answeredBeacons}</p>
						{triggerViewPosts("answered")}
					</div>

					<hr style={HorizontalLineCSS}/>

					<div style={{display:"flex",flexBox:"row",marginTop:"5%",alignItems:"center"}}>
						<p>
							<b>Beacons accepted:</b>
						</p>
						<p style={{marginLeft:"5%",color:"#43D351"}}>{answeredBeacons}</p>
						{triggerViewPosts("accepted")}
					</div>
				</React.Fragment>
			}
		</Container>
	)
}


export default ProgressBarBeaconsExtended;