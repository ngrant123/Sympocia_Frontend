import React,{useState,useEffect,useContext} from "react";
import styled from "styled-components";
import PostDisplay from "../PostDisplay/index.js";
import testImage from "../../../../designs/background/AiyanahFullInterview.png";
import {AdContext} from "../../AdSet/AdContext.js";
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {
	getRegularPostFromUser,
	getVideosFromUser,
	getUserImages,
	getBlogFromUser
} from "../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {refreshTokenApiCallHandle} from "../../../../Actions/Tasks/index.js";
import {useDispatch} from "react-redux";
import {createAd} from "../../../../Actions/Requests/AdAxiosRequests/AdSetRequests.js";
import {
	retrieveTotalAdsAllocatedPerProfile,
	getCurrentAdCountPerProfile
} from "../../../../Actions/Requests/AdAxiosRequests/AdGetRequests.js";
import {Link} from "react-router-dom";

const Container=styled.div`
	width:50%;
	display:flex;
	justify-content:space-between;
	flex-direction:column;
	align-items:center;
	
	@media screen and (max-width:1370px){
		width:100% !important;
	}

`;

const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
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

const ClearFeedPostOptions={
	borderColor:"#D0D0D0",
	borderStyle:"solid",
	borderWidth:"1px",
	borderRadius:"5px",
	padding:"10px",
	display:"flex",
	flexDirection:"row",
	justifyContent:"center",
	alignItems:"center",
	cursor:"pointer",
	backgroundColor:"white",
	color:"#000000",
	marginBottom:"2%"
}

const Creation=()=>{
	const [postDisplay,changePostDisplay]=useState("Images");
	const [displayAdCreationScreen,changeDisplayAdScreen]=useState(false);
	const [selectedPost,changeSelectedPost]=useState();
	const [loadingIndicator,changeLoadingIndicator]=useState(true);
	const {
		userId,
		accessToken,
		refreshToken
	}=useContext(AdContext);
	const dispatch=useDispatch();
	const [userUploadedPosts,changeUserUploadedPosts]=useState([]);
	let [postCounter,changePostCounter]=useState(0);
	const [submittingStatus,changeSubmittingStatus]=useState(false);
	const [endOfPostIndicator,changeEndOfPostIndicator]=useState(false);
	const [loadingNextPostsIndicator,changeLoadingNextPostsIndicator]=useState(false);
	const [displayMaxAdCountAchievedText,changeDisplayMaxAdCountAchieved]=useState(false);

	const postsFetch=async(isAccessTokenUpdated,updatedAccessToken)=>{
		let response;
		const postFetchRequest={
			userId,
			visitorId:null,
			postCount:postCounter==null?0:postCounter,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
			accessToken,
			isGuestProfile:false,
			requestedFriendsGaugeNodeId:null
		}
		

		switch(postDisplay){
			case "Images":{
				response=await getUserImages(postFetchRequest);
				break;
			}

			case "Videos":{
				response=await getVideosFromUser(postFetchRequest);
				break;
			}

			case "Blogs":{
				response=await getBlogFromUser(postFetchRequest);
				break;
			}

			case "Text":{
				response=await getRegularPostFromUser(postFetchRequest);
				break;
			}
		}
		return response;
	}


	const triggerAdCreation=async()=>{
		changeSubmittingStatus(true);
		const {confirmation,data}=await createAd(selectedPost._id,postDisplay,userId);
		if(confirmation=="Success"){
			alert("Success");
			changeDisplayAdScreen(false);
		}else{
			alert("Unfortunately there has been and error when converting this post to an ad. Please try again");
		}
		changeSubmittingStatus(false);
	}

	useEffect(()=>{
		
		if(postCounter==0)
			changeLoadingIndicator(true);
		fetchData(false,null);
	},[postDisplay,postCounter]);

	useEffect(()=>{
		const fetchUserAdTotalAllocation=async()=>{
			
			const promise=[];
			promise.push(getCurrentAdCountPerProfile(userId));
			promise.push(retrieveTotalAdsAllocatedPerProfile(userId));

			await Promise.all(promise).then(result=>{
				
				if(result[0].confirmation=="Success" && result[1].confirmation=="Success"){
					const currentAdCount=result[0].data.message;
					const totalAdAllocated=result[1].data.message;
					if(currentAdCount>=totalAdAllocated){
						changeDisplayMaxAdCountAchieved(true);
					}
				}else{
					alert('Unfortunately an error has occured. Please try again later');
				}
			});
		}
		fetchUserAdTotalAllocation();
	},[]);

	const fetchData=async(isAccessTokenUpdated,updatedAccessToken)=>{
		const {confirmation,data}=await postsFetch();
		if(confirmation=="Success"){
			
			let currentPosts=userUploadedPosts;
			let {crownedPost,posts}=data;
			if(posts.length==0 && crownedPost==null){
				changeEndOfPostIndicator(true);
			}else{
				if(crownedPost!=null){
					posts.splice(0,0,crownedPost);
				}
				currentPosts=currentPosts.concat(posts);
				changeUserUploadedPosts([...currentPosts]);
			}
		}else{	
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						refreshToken,
						userId,
						fetchData,
						dispatch,
						{},
						false
					);
			}else{
				alert('Unfortunately there has been an error when retrieving your posts. Please try again');
			}
		}	
		changeLoadingIndicator(false);
		changeLoadingNextPostsIndicator(false);
	}

	const triggerCreationDisplay=(postData)=>{
		changeSelectedPost(postData);
		changeDisplayAdScreen(true);
	}


	const triggerFetchNewPosts=(postType)=>{
		changeLoadingIndicator(true);
		changeUserUploadedPosts([]);
		changeEndOfPostIndicator(false);
		changePostCounter(0);
		changePostDisplay(postType);
	}

	const triggerFetchNextPosts=()=>{
		changeLoadingNextPostsIndicator(true);
		const nextCounter=postCounter+1;
		changePostCounter(nextCounter);
	}

	const uuid=()=>{
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	const finalAdCreationComponent=()=>{
		switch(postDisplay){
			case "Images":{
				return <img src={selectedPost.imgUrl} 
							style={{width:"180px",height:"180px",borderRadius:"5px"}}
						/>;
			}

			case "Videos":{
				return 	<video key={uuid()} autoPlay loop autoBuffer muted playsInline 
							width="100%" height="70%" style={{borderRadius:"5px",backgroundColor:"#151515"}}>
							<source src={selectedPost.videoUrl} type="video/mp4"/>
						</video>
			}

			case "Blogs":{
				return <img src={selectedPost.blogImageUrl} style={{width:"180px",height:"170px",borderRadius:"5px"}}/>
			}

			case "Text":{
				return(
					<React.Fragment>
						{selectedPost.isAudioPost==true?
							<audio key={uuid()} style={{width:"250px"}} controls>
										<source src={selectedPost.post} type="audio/ogg"/>
										<source src={selectedPost.post} type="audio/mp4"/>
										Your browser does not support the audio element.
							</audio>:
							<React.Fragment>
								<p id="post" style={{color:"#A4A4A4"}}>{selectedPost.post}</p>
							</React.Fragment>
						}
					</React.Fragment>
				)
			}
		}
	}

	return(
		<Container>
			{displayAdCreationScreen==true?
				<>
						{finalAdCreationComponent()}
						<hr style={HorizontalLineCSS}/>
						<div style={{display:"flex",flexDirection:"row"}}>
							{submittingStatus==true?
								<p>Submitting...</p>:
								<React.Fragment>
									<div style={ButtonCSS} onClick={()=>changeDisplayAdScreen(false)}>
										Back
									</div>
									
									<div style={{...ButtonCSS,width:"150px"}} onClick={()=>triggerAdCreation()}>
										Create Ad
									</div>
								</React.Fragment>
							}
						</div>
				</>:
				<div>
					{displayMaxAdCountAchievedText==true?
						<div>
							<p>
								You have reached the maximum amount of ads allocated for your profile. To create more 
								you can either delete some ads or you can purchase some more here
							</p>
							<Link to={{pathname:`/payment`}}>
								<div style={ButtonCSS}>
									Payment
								</div>
							</Link>
						</div>:
						<React.Fragment>
							<p style={{fontSize:"24px"}}>
								<b>Step 1:</b>
							</p>
							<p>Select the post you would like to convert into an ad</p>
							<hr/>
								<p>
									<b>Selected post-type:</b>
								</p>
								<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
									<div class="btn-group">
										<button class="btn btn-primary dropdown-toggle" type="button" 
											data-toggle="dropdown" style={ClearFeedPostOptions}>
											<p>{postDisplay}</p>
											<ArrowDropDownCircleOutlinedIcon
												style={{fontSize:"15",color:"7C7C7C",marginLeft:"10px"}}
											/>
										</button>
										<ul class="dropdown-menu" style={{padding:"10px"}}>
											<li style={{listStyle:"none",cursor:"pointer"}}
												onClick={()=>triggerFetchNewPosts("Images")}>
												Images
											</li>
											<hr/>
											<li style={{listStyle:"none",cursor:"pointer"}}
												onClick={()=>triggerFetchNewPosts("Videos")}>
												Videos
											</li>
											<hr/>
											<li style={{listStyle:"none",cursor:"pointer"}}
												onClick={()=>triggerFetchNewPosts("Blogs")}>
												Blogs
											</li>
											<hr/>
											<li style={{listStyle:"none",cursor:"pointer"}}
												onClick={()=>triggerFetchNewPosts("Text")}>
												Text
											</li>
										</ul>
									</div>

								</div>
							<hr/>

							{loadingIndicator==true?
								<p>Loading...</p>:
								<React.Fragment>
									<PostDisplay
										postDisplay={postDisplay}
										posts={userUploadedPosts}
										postClickTrigger={triggerCreationDisplay}
										isAdCreationParent={true}
										userId={userId}
									/>
									{endOfPostIndicator==false &&(
										<React.Fragment>
											{loadingNextPostsIndicator==true?
												<p>Loading...</p>:
												<div style={ButtonCSS} onClick={()=>triggerFetchNextPosts()}>
													Next
												</div>
											}
										</React.Fragment>
									)}
								</React.Fragment>
							}
						</React.Fragment>
					}
				</div>
			}

		</Container>
	)
}

export default Creation;