import React,{useState,useEffect,useRef,useContext} from "react";
import styled from "styled-components";
import testImage from "../../../../designs/background/AiyanahFullInterview.png";
import AdAnalysis from "./AdAnalysis.js";
import PostDisplay from "../PostDisplay/index.js";
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {getAds} from "../../../../Actions/Requests/AdAxiosRequests/AdGetRequests.js";
import {AdContext} from "../../AdSet/AdContext.js";
import {PostAdsProvider} from "./PostAdsContext.js";


const Container=styled.div`
	position:relative;
	width:35%;
	@media screen and (max-width:1370px){
		width:100% !important;
	}

	@media screen and (max-width:650px){
		#postOptions{
			flex-wrap:wrap;
		}

		#adStatusDropDown{
			margin-top:2% !important;
		}

		#adStatusDropDown{
			margin-left:-70px !important;
		}
	}

`;

const ButtonCSS={
	listStyle:"none",
	display:"inline-block",
	borderRadius:"5px",
	padding:"10px",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	cursor:"pointer",
	marginRight:"2%"
}

const SelectedButtonCSS={
	...ButtonCSS,
	backgroundColor:"#3898ec",
	color:"white"
}

const UnSelectedButtonCSS={
	...ButtonCSS,
	backgroundColor:"white",
	color:"#3898ec"
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


const PostOptionsCSS={
	display:"flex",
	flexDirection:"row",
	marginBottom:"2%",
	alignItems:"center",
	justifyContent:"space-between",
	marginBottom:"5%"
}

const Ads=()=>{
	const [postDisplay,changePostDisplay]=useState("Images");
	const [posts,changePosts]=useState([]);
	const [postsComponent,changePostsComponent]=useState();
	const [displayAdAnaylsis,changeDisplayAnalysis]=useState(false);
	const [selectedPostAd,changeSelectedPostAd]=useState();
	const [currentAdStatus,changeCurrentAdStatus]=useState("Active");
	const [isLoading,changeIsLoading]=useState(true);
	const {
		userId,
		updateDisplayAdOptionType
	}=useContext(AdContext);

	const generatePostManagmentId=()=>{
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	useEffect(()=>{
		const fetchData=async()=>{
			const {confirmation,data}=await getAds({
				profileId:userId,
				adStatus:currentAdStatus,
				postType:postDisplay,
				postSessionManagmentToken:generatePostManagmentId()
			});

			debugger;
			if(confirmation=="Success"){
				const {message}=data;
				changePosts([...message]);
				changeIsLoading(false);
			}else{	
				alert('Unfortunately an error has occured when retrieving your ads. Please try again');
			}
		}
		fetchData();
	},[postDisplay,currentAdStatus]);
	const triggerDisplayAdAnalysis=(postData)=>{
		changeSelectedPostAd(postData);
		changeDisplayAnalysis(true);
	}

	const closeAnalysis=()=>{
		changeDisplayAnalysis(false);
	}

	const adCreationRequest=()=>{
		updateDisplayAdOptionType("Creation");
	}

	const triggerFetchNewPosts=(requestedPostType)=>{
		changeIsLoading(true);
		changePosts([]);
		changePostDisplay(requestedPostType);
	}

	const triggerFetchSpecifiedAdStatusPosts=(requestedAdStatus)=>{
		changeIsLoading(true);
		changePosts([]);
		changeCurrentAdStatus(requestedAdStatus);
	}

	const triggerRemovePost=(postId)=>{
		debugger;
		let currentPosts=posts;
		for(let i=0;i<currentPosts.length;i++){
			if(currentPosts[i]._id==postId){
				currentPosts.splice(i,1);
				break;
			}
		}
		changePosts([...currentPosts]);
		changeDisplayAnalysis(false);
	}

	return(
		<PostAdsProvider
			value={{
				removePost:(postId)=>{
					triggerRemovePost(postId);
				}			
			}}
		>
			{displayAdAnaylsis==true?
				<div>
					<AdAnalysis
						postData={selectedPostAd}
						postDisplayType={postDisplay}
						closeAnalysis={closeAnalysis}
						userId={userId}
					/>
				</div>:
				<Container>
					<div>
						<p style={{marginBottom:"2%",fontSize:"18px"}}>
							<b>Select which of your current ad you want to analyze</b>
						</p>
						<div id="postOptions" style={PostOptionsCSS}>
							<div style={postDisplay=="Images"?SelectedButtonCSS:UnSelectedButtonCSS} 
								onClick={()=>triggerFetchNewPosts("Images")}>
								Images
							</div>
							<div style={postDisplay=="Videos"?SelectedButtonCSS:UnSelectedButtonCSS}
							 	onClick={()=>triggerFetchNewPosts("Videos")}>
								Videos
							</div>
							<div style={postDisplay=="Blogs"?SelectedButtonCSS:UnSelectedButtonCSS}
								onClick={()=>triggerFetchNewPosts("Blogs")}>
								Blogs
							</div>
							<div style={postDisplay=="Text"?SelectedButtonCSS:UnSelectedButtonCSS} 
								onClick={()=>triggerFetchNewPosts("Text")}>
								Text
							</div>

							<div class="btn-group" id="adStatusDropDown">
								<button class="btn btn-primary dropdown-toggle" type="button" 
									data-toggle="dropdown" style={ClearFeedPostOptions}>
									{currentAdStatus}
									<ArrowDropDownCircleOutlinedIcon
										style={{fontSize:"15",color:"7C7C7C",marginLeft:"10px"}}
									/>
								</button>
								<ul id="adStatusDropDown" class="dropdown-menu" style={{padding:"10px"}}>
									<li style={{cursor:"pointer"}} 
										onClick={()=>triggerFetchSpecifiedAdStatusPosts("Active")}>
										Active
									</li>
									<hr/>	
									<li style={{cursor:"pointer"}}
										onClick={()=>triggerFetchSpecifiedAdStatusPosts("Paused")}>
										Paused
									</li>
									<hr/>	
									{/*
										<li style={{cursor:"pointer"}}
											onClick={()=>triggerFetchSpecifiedAdStatusPosts("Terminated")}>
											Terminated
										</li>	
									*/}
								</ul>
							</div>	
						</div>
						{isLoading==true?
							<p>Loading...</p>:
							<PostDisplay
								postDisplay={postDisplay}
								posts={posts}
								postClickTrigger={triggerDisplayAdAnalysis}
								creationRequest={adCreationRequest}
								isAdCreationParent={false}
								userId={userId}
								currentAdStatus={currentAdStatus}
							/>
						}
					</div>
				</Container>
			}
		</PostAdsProvider>
	)
}


export default Ads;