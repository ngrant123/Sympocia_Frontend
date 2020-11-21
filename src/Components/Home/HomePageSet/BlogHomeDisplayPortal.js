import React,{useState,useEffect} from "react";
import styled,{keyframes} from "styled-components";
import {createPortal} from "react-dom";
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw,EditorState } from 'draft-js';
import { Icon, InlineIcon } from '@iconify/react';
import stampIcon from '@iconify/icons-fa-solid/stamp';
import StampIcon from "../../../designs/img/StampIcon.png";

import NoProfilePicture from "../../../designs/img/NoProfilePicture.png";
import {addStampPost,unStampPost} from "../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PollOptionPortal from "../../GeneralComponents/PostComponent/PollOptionPortal.js";

import PollIcon from '@material-ui/icons/Poll';
import {HomeConsumer} from "../HomeContext.js";
import {Link} from "react-router-dom";
import LoyaltyIcon from '@material-ui/icons/Loyalty';

const Container=styled.div`
	position:absolute;
	z-index:13;
	height:100%;
	width:80%;
	border-radius:5px;
	top:2%;
	left:10%;
	overflow-y:auto;
	background-color:white;
	padding:20px;

	@media screen and (max-width:1370px){
		top:10% !important;
		width:95% !important;
		margin-left:-10%;

		#smallImagePicture{
			height:30% !important;
			width:40% !important;
		}
	}

	@media screen and (min-width:740px) and (min-height:420px) and (orientation:landscape){
	 	#smallImagePicture{
			width:20% !important;
		}
    }
`;

const ShadowContainerBlog=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:11;
	top:0px;
`;

const PosterInformationModal=styled.div`
	position:fixed;
	width:30%;
	border-radius:5px;
	background-color:white;
	box-shadow: 1px 1px 10px #707070;
	top:10%;
	left:55%;
	padding:10px;
	height:60%;
	z-index:9;
	overflow:scroll;

	@media screen and (max-width:1370px){
		left:20% !important;
		width:70% !important;
	}
`;

const ProfilePicture=styled(Link)`
	position:relative;
	width:80px;
	height:80px;
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
	  position:relative;
	  animation:${keyFrame} 1s ease-in-out 0s forwards;
`;

const SmallPostInformationModal=styled.div`
	position:fixed;
	width:20%;
	border-radius:5px;
	background-color:white;
	box-shadow: 1px 1px 10px #707070;
	top:10%;
	left:65%;
	padding:10px;
	z-index:9;
`;

const ApproveDisapproveContainer=styled.div`
	position:fixed;
	background-color:#1C1C1C;
	width:30%;
	height:10%;
	border-radius:5px;
	left:15%;
	top:20%;
	height:25%;
	overflow:scroll;
	z-index:16;

	@media screen and (max-width:1370px){
		width:60% !important;
	}
`;


const ShadowContainer = styled.div`

	position:absolute;
	width:100%;
	height:100%;
	z-index:15;

`;


const StampButtonCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	backgroundColor:"white",
	boxShadow:"2px 10px 10px #b9d6ff",
	borderRadius:"5px",
	listStyle:"none",
	display:"inline-block",
	width:"30%",
	padding:"10px"
}


const authenticPostButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"2%"
}

const ShadowButtonCSS={
	display:"inline-block",
	listStyle:"none",
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	marginRight:"5px",
	borderRadius:"50%",
	borderStyle:"none",
	marginRight:"10%",
	marginBottom:"2%"
}


const BlogHomeDisplayPortal=(props)=>{
	console.log(props);
	const blog=props.selectedBlog.blog;
	var DBEditorState = convertFromRaw(JSON.parse(blog));
	var blogContentState=EditorState.createWithContent(DBEditorState);

	const [displayStampEffect,changeDisplayStampEffect]=useState(false);
	const [displayLargeModal,changeDisplayModal]=useState(true);
	const [displayDesktopUI,changeDisplayDesktopUI]=useState(false);
	const [displayPollingModal,changeDisplayPollingModal]=useState(false);
	const [displayApproveModal,changeDisplayApproveModal]=useState(false);
	const [displayApproveDisapproveIndicator,changeDisplayApproveDisapproveIndicator]=useState(false);

	const approvesPostNumber=props.selectedBlog.isPostAuthentic.numOfApprove!=null?
					   props.selectedBlog.isPostAuthentic.numOfApprove.length:0;
	const disapprovesPostNumber=props.selectedBlog.isPostAuthentic.numOfDisapprove!=null?
						  props.selectedBlog.isPostAuthentic.numOfDisapprove.length:0;


	const triggerUIChange=()=>{
		if(window.innerWidth<1370){
			changeDisplayDesktopUI(false);

		}else{
			changeDisplayDesktopUI(true);
		}
	}

	useEffect(()=>{
		triggerUIChange();
	},[]);

	window.addEventListener('resize',triggerUIChange)

	const createOrRemoveStampEffect=()=>{
		var isPersonalProfile=props.profileType=="personalProfile"?true:false;
		if(displayStampEffect==false){
			if(isPersonalProfile==true){
				//addStampPost(props.selectedBlog.owner,props.selectedBlog._id,"personal","BlogPost");
			}else{
				//addStampPost(props.selectedBlog.owner,props.selectedBlog._id,"company","BlogPost");
			}
			changeDisplayStampEffect(true);

		}else{
			if(isPersonalProfile==true){
				//unStampPost(props.selectedBlog.owner,props.selectedBlog._id,"personal","BlogPost");
			}else{
				//unStampPost(props.selectedBlog.owner,props.selectedBlog._id,"company","BlogPost");
			}
			changeDisplayStampEffect(false);
		}
	}

	const displayOrHideModal=()=>{
		changeDisplayModal(!displayLargeModal);
	}
	const closeModalPollModal=()=>{
		changeDisplayPollingModal(false);
	}

	const triggerApprovePollModal=()=>{
		changeDisplayApproveModal(true)
		changeDisplayPollingModal(true);
	}

	const triggerDisapprovePollModal=()=>{
		changeDisplayApproveModal(false);
		changeDisplayPollingModal(true);	
	}

	const displayApproveDisapproveModal=()=>{
		return <React.Fragment>
					{displayApproveDisapproveIndicator && (
						<>
							<ShadowContainer
								onClick={()=>changeDisplayApproveDisapproveIndicator(false)}
							/>
							<ApproveDisapproveContainer>
								<ul style={{padding:"20px"}}>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>triggerApprovePollModal()} style={authenticPostButtonCSS}>

											<p style={{color:"#01DF01"}}>{approvesPostNumber}</p> 
												approves post

										</li>
									</a>

									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>triggerDisapprovePollModal()} style={authenticPostButtonCSS}>

												<p style={{color:"#FE2E2E"}}>{disapprovesPostNumber}</p> 
												disapproves post
										</li>
									</a>
								</ul>
							</ApproveDisapproveContainer>
						</>
					)}
			   </React.Fragment>
	}

	const pollModal=()=>{
		return <React.Fragment>
					{displayPollingModal && (
						<PollOptionPortal
							closeModal={closeModalPollModal}
							displayApproveModal={displayApproveModal}
							postId={props.selectedBlog._id}
							postType="Blogs"
							targetDom={props.targetDom}
						/>
					)}
				</React.Fragment>
	}

	return createPortal(
		<React.Fragment>
			<ShadowContainerBlog onClick={()=>props.closeModal()}/>
			<Container>	
				{pollModal()}
				{displayApproveDisapproveModal()}
				<Editor
					editorState={blogContentState}
					toolbarClassName="toolbarClassName"
					wrapperClassName="wrapperClassName"
					editorClassName="editorClassName"
					placeholder="Start typing to create your masterpiece"
					readOnly={false}
					toolbarHidden={true}
				/>
				{displayLargeModal==true?
					<PosterInformationModal>
						<ul style={{padding:"0px"}}>

							<li onClick={()=>displayOrHideModal()} style={{listStyle:"none",marginRight:"70%"}}>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<ExpandMoreIcon
										style={{fontSize:25}}
									/>
								</a>
							</li>
							{displayStampEffect==true?
									<li style={{listStyle:"none"}}>
										<StampIconEffect
											id="stampEffect"
										>
											<img src={StampIcon} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
										</StampIconEffect>
									</li>
							:null}
		
							<li style={{listStyle:"none",marginBottom:"5%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
										<ProfilePicture to={{pathname:`/profile/${props.selectedBlog.owner._id}`}}>
											<img id="smallImagePicture" src={props.selectedBlog.owner.ownerImgUrl==null?
													NoProfilePicture:
													props.selectedBlog.owner.profilePicture
												} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
										</ProfilePicture>
									</li>
									<li style={{listStyle:"none"}}>
										<b>{props.selectedBlog.owner.firstName}</b>
									</li>

									<li style={{height:"90px",overflowY:"auto",listStyle:"none"}}>
										{props.selectedBlog.title}
									</li>
								</ul>
							</li>

							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									<a href="javascript:void(0);">
										<li onClick={()=>createOrRemoveStampEffect()} style={ShadowButtonCSS}>
											<LoyaltyIcon
												style={{fontSize:30}}
											/>
										</li>
									</a>

									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>changeDisplayApproveDisapproveIndicator(true)} 
											style={ShadowButtonCSS}>
											<PollIcon
												style={{fontSize:"30"}}
											/>
										</li>
									</a>
								</ul>
							</li>
						</ul>
					</PosterInformationModal>:
					<SmallPostInformationModal>
						{displayDesktopUI==false?
							<li onClick={()=>displayOrHideModal()} style={{listStyle:"none",display:"inline-block"}}>
								<ExpandLessIcon
									style={{fontSize:25}}
								/>
							</li>:
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block"}}>
									<ProfilePicture to={{pathname:`/profile/${props.selectedBlog.owner._id}`}}>
										<img id="smallImagePicture" src={props.ownerImgUrl==null?
													NoProfilePicture:
													props.ownerImgUrl
												} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
									</ProfilePicture>
								</li>

								<li style={{listStyle:"none",display:"inline-block",marginRight:"30%"}}>
									<b>{props.selectedBlog.owner.firstName}</b>
								</li>

								<li onClick={()=>displayOrHideModal()} style={{listStyle:"none",display:"inline-block"}}>
									<ExpandLessIcon
										style={{fontSize:25}}
									/>
								</li>
							</ul>
						}
					</SmallPostInformationModal>
					}
				</Container>
			</React.Fragment>
	,document.getElementById(props.targetDom));

}

export default BlogHomeDisplayPortal;