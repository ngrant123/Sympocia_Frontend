import React,{useState,useEffect,Component} from "react";
import styled,{keyframes} from "styled-components";
import ImageInformation from "./ImageInformation.js";
import Comments from "../../../CommentsComponent/index.js";
import {ImageProvider} from "./ImageContext.js";
import EditImageCreation from "../ImageCreation/EditImageCreation.js";
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {
		addStampPost,
		unStampPost,
		fakeNewsPostResponse,
		markPostAsAuthentic 
	} from "../../../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";

import StampIcon from "../../../../../designs/img/StampIcon.png";

import { Icon, InlineIcon } from '@iconify/react';
import crownIcon from '@iconify/icons-mdi/crown';


const Container=styled.div`
	position:relative;
	width:90%;
	height:50%;
	z-index:11;
	border-radius:5px;
	background-color:white;
	border-radius:5px;
	padding:5px;
	box-shadow: 1px 1px 50px #d5d5d5;
	overflow-y:auto;
`;


const Image=styled.div`
	position:relative;
	width:460px;
	height:85%;
	background-color:blue;
	border-radius:20px;
	margin-bottom:5px;
`;

const ImageButtons=styled.div`
	position:relative;
	background-color:#5298F8;
	text-align:center;
	width:120px;
	padding:5px;
	color:white;
	border-style:solid;
	border-width:1px;
	border-color:#0857c2;
	border-radius:5px;
	transition:.8s;

	&:hover{
		background-color:#0857c2;
	}
`;
const keyFrame=keyframes`
	  0%{
	    opacity: 0;
	  }
	  10%{
	    opacity:.50;
	    transform-origin: 50% 50%;
	    transform: scale(5);
	    transition: all .3s cubic-bezier(0.6, 0.04, 0.98, 0.335);
	  }
	  100%{
	    opacity:1;
	    transform: scale(1);
	  }

`;
const StampIconEffect=styled.div`
	  height:100px;
	  width:100px;
	  border-radius:5px;
	  position:absolute;
	  animation:${keyFrame} 1s ease-in-out 0s forwards;
`;
const VideoDesriptionContainer=styled.div`
	position:absolute;
	width:30%;
	height:30%;
	border-radius:50%;
	top:70%;
	left:2%;
	z-index:8;
`;

const CrownIconContainer=styled.div`
	position:relative;
	border-style:solid;
	border-width:2px;
	width:100%;
	animation: glowing 1300ms infinite;
	border-radius:50%;


	@keyframes glowing {
      0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
  }
`;

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	z-index:11;
	top:0px;
`;

const CrownPostModal=styled.div`
	position:fixed;
	width:30%;
	height:20%;
	background-color:white;
	z-index:11;
	left:40%;
	top:40%;
	border-radius:5px;
	box-shadow: 1px 1px 50px #d5d5d5;
`;

const CommentContainer=styled.div`
	position:absolute;
	width:40%;
	height:82%;
	margin-top:13px;
	overflow-y:scroll;
	top:30px;
`;

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
  marginRight:"4%"
}


/*
	For some reason when you click the edit button it switches to the edit screen 
	but the old screen for the display image is still underneath it. Can reproduce 
	if you just change the height for editImageCreation 

*/

const ImageContainer=(props)=>{
	console.log("Image Modal data");
	console.log(props);
	debugger;

	const [commentImageIndicator,changeIndicator]=useState(true);
	const [displayImageModal,changeDisplayImage]=useState(false);
	const [displayStampEffect,changeDisplayStampEffect]=useState(false);
	const [displayCrownModalIndicator,changeDisplayCrownModalIndicator]=useState(false);

	const handleRemoveImagePost=()=>{

	}

	const createOrRemoveStampEffect=()=>{
		var isPersonalProfile=props.profileType=="personalProfile"?true:false;
		debugger;
		//(userId,postId,profileType,postType)
		if(displayStampEffect==false){
			if(isPersonalProfile==true){
				addStampPost(props.imageData.owner,props.imageData._id,"personal","ImagePost");
			}else{
				addStampPost(props.imageData.owner,props.imageData._id,"company","ImagePost");
			}
			changeDisplayStampEffect(true);
		}else{
			if(isPersonalProfile==true){
				unStampPost(props.imageData.owner,props.imageData._id,"personal","ImagePost");
			}else{
				unStampPost(props.imageData.owner,props.imageData._id,"company","ImagePost");
			}
			changeDisplayStampEffect(false);
		}
	}

	const hideComments=()=>{
		changeIndicator(true);
	}


	return(
		<ImageProvider value={{
			updateIndicator:(indicator)=>{
				changeIndicator(indicator);
			}
		}}>
			<React.Fragment>
				{displayImageModal==true?
					<EditImageCreation
						imageSrcUrl={props.imageData.imgUrl}
						previousData={props.imageData}
					/>:
					<React.Fragment>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block",marginRight:"70px"}}>
								<ul>
									<li style={{listStyle:"none",marginBottom:"2%"}}>
										<ul style={{padding:"0px"}}>
											{props.imageData.isCrownedPost==true?
												<a style={{textDecoration:"none"}}href="javascript:void(0);">
													<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
														<CrownIconContainer>
															<Icon 
																id="crownIcon"
																icon={crownIcon}
																style={{borderRadius:"50%",zIndex:"8",backgroundColor:"white",fontSize:"40px",color:"#C8B0F4"}}
															/>
														</CrownIconContainer>
													</li>
												</a>:null
											}
											

											<a style={{textDecoration:"none"}} href="javascript:void(0);">
												<li style={ButtonCSS}>
														Promote
												</li>
											</a>

											<a style={{textDecoration:"none"}}href="javascript:void(0);">
												<li onClick={()=>createOrRemoveStampEffect()} style={ButtonCSS}>
														Stamp
												</li>
											</a>
											<li onClick={()=>changeDisplayImage(!displayImageModal)} style={{listStyle:"none",display:"inline-block",marginRight:"3%"}}>
												<a style={{textDecoration:"none"}}href="javascript:void(0);">
													<EditIcon/> 
													Edit image
												</a>
											</li>

											<li onClick={()=>handleRemoveImagePost()} style={{listStyle:"none",display:"inline-block"}}>
												<a style={{textDecoration:"none"}}href="javascript:;">
													<HighlightOffIcon/> 
													Remove image
												</a>
											</li>
										</ul>
									</li>
									<li style={{listStyle:"none"}}>
										<Image>	
											{displayStampEffect==true?
													<React.Fragment>
														<StampIconEffect
															id="stampEffect"
														>
															<img src={StampIcon} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
														</StampIconEffect>
													</React.Fragment>:
											null}
											<img src={props.imageData.imgUrl} style={{width:"100%",height:"100%",borderRadius:"5px"}}/>
											{props.imageData.videoDescription==null?null:
												<VideoDesriptionContainer>
													<video style={{borderRadius:"50%"}} width="100%" height="100%" borderRadius="50%" autoplay="true" controls>
															<source src={props.imageData.videoDescription} type="video/mp4"/>
													 </video>
												</VideoDesriptionContainer>
											}
										</Image>
									</li>
								</ul>
							</li>

							<li style={{listStyle:"none",display:"inline-block",padding:"0px"}}>
								{
									commentImageIndicator==true?
										<ImageInformation
											imageInformation={props.imageData}
											targetDom={props.targetDom}
										/>
										:
										<CommentContainer>
											<Comments
												postId={props.imageData._id}
												postType={"Image"}
												hideComments={hideComments}
												targetDom={props.targetDom}
											/>
										</CommentContainer>
								}

							</li>
						</ul>
					</React.Fragment>
				}
			</React.Fragment>
		</ImageProvider>

	)
}

export default ImageContainer;