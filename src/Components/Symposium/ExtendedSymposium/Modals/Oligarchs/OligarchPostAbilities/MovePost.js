import React,{useState,useEffect} from "react";
import styled from "styled-components";
import PERSONAL_INDUSTRIES from "../../../../../../Constants/personalIndustryConstants.js";
import {editPost} from "../../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import {useSelector,useDispatch} from "react-redux";
import {refreshTokenApiCallHandle} from "../../../../../../Actions/Tasks/index.js";
import {PostConsumer} from "../../../Posts/PostsContext.js";

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
  marginRight:"4%",
  cursor:"pointer",
  width:"30%"
}

const SymposiumCategoryOptionsCSS={
	fontSize:"18px",
	color:"#C8B0F4",
	cursor:"pointer"
}

const MovePost=({closeModal,postId,postType,selectedSymposiumCategory,triggerCloseModalCompletely})=>{
	const [symposiums,changeSymposiums]=useState([]);
	const [selectedSymposium,changeSelectedSymposiums]=useState();
	const [isProcessing,changeIsProcessing]=useState(false);
	const dispatch=useDispatch();
	const personalInformation=useSelector(state=>state.personalInformation);
	const [displayTargetSymposiumCategoryModal,changeDisplayTargetSymposiumCategory]=useState(false);
	const [targetSymposiumCategory,changeTargetSymposiumCategory]=useState();

	useEffect(()=>{
		console.log(PERSONAL_INDUSTRIES);
		changeSymposiums([...PERSONAL_INDUSTRIES.INDUSTRIES]); 
	},[]);

	const displayVerificationModal=(targetSymposium)=>{
		changeDisplayTargetSymposiumCategory(true);
		changeSelectedSymposiums(targetSymposium);
	}

	const triggerEditPost=async({isAccessTokenUpdated,updatedAccessToken,swapPost})=>{
		debugger;
		changeIsProcessing(true);
		const editedPost={
			postType,
			postId,
			isPhoneUIEnabled:false,
			post:{
				industriesUploaded:[{
					industry:selectedSymposium,
					subIndustry:[]
				}],
				symposiumUploadCategory:targetSymposiumCategory
			},
			postS3:[],
			ownerId:personalInformation.id,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
						personalInformation.accessToken
		}

		const {confirmation,data}=await editPost(editedPost);
		if(confirmation=="Success"){
			alert('Your post has been edited. Please reload your profile to see your updated post.')
			swapPost(
			   	postId,
		        selectedSymposiumCategory,
		        targetSymposiumCategory,
		        selectedSymposium)
			triggerCloseModalCompletely();
		}else{
			
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						triggerEditPost,
						dispatch,
						{
							swapPost
						},
						false
					);
			}else{
				alert('Unfortunately there has been an error deleting this post. Please try again');
			}
		}
		changeIsProcessing(false);
	}

	const displayFinalScreen=(symposiumCategoryType)=>{
		changeTargetSymposiumCategory(symposiumCategoryType);
		changeDisplayTargetSymposiumCategory(false);

	}

	return(
		<PostConsumer>
			{symposiumPostInformation=>{
				return(
					<React.Fragment>
						{selectedSymposium==null?
							<React.Fragment>
								<div onClick={()=>closeModal()} style={ButtonCSS}>
									Back
								</div>
								<div style={{marginTop:"5%"}}>
									{symposiums.map(data=>
										<React.Fragment>
											<p onClick={()=>displayVerificationModal(data.industry)}
												style={{fontSize:"18px",cursor:"pointer",color:"#C8B0F4"}}>
												{data.industry}
											</p>
											<hr/>
										</React.Fragment>
									)}
								</div>
							</React.Fragment>:
							<React.Fragment>
								{displayTargetSymposiumCategoryModal==true?
									<React.Fragment>
										<div onClick={()=>changeSelectedSymposiums(null)} style={ButtonCSS}>
											Back
										</div>
										<p style={{fontSize:"18px"}}>
											What symposium category do you want to upload it to?
										</p>
										<hr/>
										<div>
											<p onClick={()=>displayFinalScreen("The Grind")}
												style={SymposiumCategoryOptionsCSS}>
												The Grind
											</p>
											<hr/>
											<p onClick={()=>displayFinalScreen("Work In Progress")} 
												style={SymposiumCategoryOptionsCSS}>
												Work In Progress
											</p>
											<hr/>
											<p onClick={()=>displayFinalScreen("Achievements")} 
												style={SymposiumCategoryOptionsCSS}>
												Achievements
											</p>
										</div>
									</React.Fragment>:
									<React.Fragment>
										<p style={{fontSize:"18px"}}>
											Are you sure you want to move this post to the <b>{selectedSymposium}</b> symposium with 
											symposium category <b>{targetSymposiumCategory}</b>?
										</p>
										<hr/>
										{isProcessing==true?
											<p>Processing...</p>:
											<div style={{display:"flex",flexDirection:"row"}}>
												<div onClick={()=>triggerEditPost({
																	isAccessTokenUpdated:false,
																	swapPost:symposiumPostInformation.swapPostFromStack
																})} style={ButtonCSS}>
													Yes
												</div>
												<div onClick={()=>changeSelectedSymposiums(null)} style={ButtonCSS}>
													No
												</div>
											</div>
										}
									</React.Fragment>
								}
							</React.Fragment>
						}
					</React.Fragment>
				)
			}}
		</PostConsumer>
	)
}


export default MovePost;