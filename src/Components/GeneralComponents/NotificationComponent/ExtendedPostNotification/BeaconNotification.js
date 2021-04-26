import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {getPostById} from "../../../../Actions/Requests/PostAxiosRequests/PostPageGetRequests.js";
import ZoomedPostImageOrVideoPortal from "../../PostComponent/ZoomedInPostImageOrVideo.js";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import {Link} from "react-router-dom";

const Container=styled.div`
	margin-left:5%;
	display:flex;
	flex-direction:row;

	@media screen and (max-width:1370px){
		flex-direction:column;
		#beaconResponseDiv{
			margin-left:0% !important;
			margin-top:6% !important;
		}
	}

	@media screen and (max-width:650px){
		#beaconImage{
			width:100% !important;
			height:150px !important;
		}
		#beaconVideo{
			width:100% !important;
			height:200px !important;	
		}
		#beaconResponseDiv{
			margin-top:15% !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		#beaconImage{
			height:250px !important;
		}
    }
`;

const PostCSS={
	cursor:"pointer",
	display:"flex",
	flexDirection:"column"
}
const BeaconNotifications=({postData,targetDom})=>{
	console.log(postData);
	let {replyId,postType,commentID,owner,notificationOwnerId}=postData;
	const {firstName,profilePicture}=owner;
	const [selectedBeaconReplyData,changeSelectedBeaconReplyData]=useState();
	const [originalSelectedBeaconData,changeOriginalBeaconData]=useState();
	const [isLoading,changeIsLoading]=useState(true);
	const [displayZoomedInPostDisplay,changeZoomedInPostDisplay]=useState(false);
	const [selectedZoomedInUrl,changeSelectedZoomedInUrl]=useState();


	useEffect(()=>{
		const fetchData=async()=>{
			//commentId
				debugger;
				const promise=[];
				postType=postType=="Regular"?"RegularPosts":postType;
				const parentBeacon=getPostById({
					postId:commentID,
					postType
				})

				const replyBeacon=getPostById({
					postId:replyId,
					postType
				})
				promise.push(parentBeacon);
				promise.push(replyBeacon);

				await Promise.all(promise).then(result=>{
					debugger;
					console.log(result);
					const originalBeacon=result[0];
					const replyBeacon=result[1];

					const originalBeaconConfirmation=originalBeacon.confirmation;
					const originalBeaconData=originalBeacon.data.message;

					const replyBeaconConfirmation=replyBeacon.confirmation;
					const replyBeaconData=replyBeacon.data.message;

					if(originalBeaconConfirmation=="Success" && replyBeaconConfirmation=="Success"){
						changeOriginalBeaconData(originalBeaconData)
						changeSelectedBeaconReplyData(replyBeaconData);
					}else{
						alert('There was an error when retrieving this beacon response. Please try again');	
					}
				})	
			changeIsLoading(false);
		}

		fetchData();
	},[]);

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const triggerDisplayUrlPortal=(post,isImagePost)=>{
		debugger;
		const selectedPost={
			postUrl:isImagePost==false?post.videoUrl:post.imgUrl,
			uncompressedPostId:isImagePost==false?post.videoUrlKey:post.uncompressedImageId
		}
		changeSelectedZoomedInUrl({...selectedPost});
		changeZoomedInPostDisplay(true);
	}

	const beaconConstruction=(parentBeaconIndicator)=>{
		console.log(selectedBeaconReplyData);
		const post=parentBeaconIndicator==true?
					originalSelectedBeaconData:
					selectedBeaconReplyData
		debugger;
		if(postType=="Images"){
			const imgUrl=parentBeaconIndicator==true?
						originalSelectedBeaconData.imgUrl:
						selectedBeaconReplyData.imgUrl

			const caption=parentBeaconIndicator==true?
						originalSelectedBeaconData.caption:
						selectedBeaconReplyData.caption
			return(
				<div onClick={()=>triggerDisplayUrlPortal(post,true)} style={PostCSS}>
					<img id="beaconImage" src={imgUrl} style={{width:"350px",height:"300px",borderRadius:"5px"}}/>
					<p style={{marginTop:"3%"}}>{caption}</p>
				</div>
			)
		}else if(postType=="Videos"){
			const videoUrl=parentBeaconIndicator==true?
							originalSelectedBeaconData.videoUrl:
							selectedBeaconReplyData.videoUrl
			const title=parentBeaconIndicator==true?
						originalSelectedBeaconData.title:
						selectedBeaconReplyData.title
			return(
				<div onClick={()=>triggerDisplayUrlPortal(post,false)} style={PostCSS}>
					<video id="beaconVideo" key={uuidv4()} autoPlay loop autoBuffer muted playsInline 
						style={{borderRadius:"5px",backgroundColor:"#151515",cursor:"pointer"}}
						width="350px" height="300px" borderRadius="50%" controls>
						<source src={videoUrl} type="video/mp4"/>
					</video>
					<p style={{marginTop:"3%"}}>{title}</p>
				</div>
			)
		}else{
			const originalPost=parentBeaconIndicator==true?
							originalSelectedBeaconData.post:
							selectedBeaconReplyData.post
			return(
				<p>{originalPost}</p>
			)
		}
	}

	const closeModal=()=>{
		changeZoomedInPostDisplay(false);
	}
	
	return(
		<Container>
			{displayZoomedInPostDisplay==true &&(
				<ZoomedPostImageOrVideoPortal
					targetDom={targetDom}
					closeModal={closeModal}
					postUrl={selectedZoomedInUrl.postUrl}
					unCompressedId={selectedZoomedInUrl.uncompressedPostId}
					postType={postType}
				/>
			)}
			{isLoading==true?
				<p>Please wait...</p>:
				<React.Fragment>
					{beaconConstruction(true)}
					<div id="beaconResponseDiv" style={{display:"flex",flexDirection:"column",marginLeft:"5%"}}>
						<p>
							<b>Beacon response:</b>
						</p>
						{beaconConstruction()}
						<div style={{display:"flex",flexDirection:"row"}}>
							<Link to={{pathname:`/profile/${notificationOwnerId}`}}>
								<img src={profilePicture==null?
									NoProfilePicture:profilePicture}
									style={{width:"50px",height:"40px",borderRadius:"50%"}}/>
							</Link>
							<p>{firstName}</p>
						</div>
					</div>
				</React.Fragment>
			}
		</Container>
	)
}

export default BeaconNotifications;