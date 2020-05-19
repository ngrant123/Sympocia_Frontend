import React,{useState} from "react";
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


const Container=styled.div`
	position:absolute;
	z-index:9;
	height:95%;
	width:80%;
	border-radius:5px;
	top:2%;
	left:10%;
	overflow-y:auto;
	background-color:white;
	padding:20px;
`;

const ShadowContainerBlog=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:8;
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
	z-index:9;

`;

const ProfilePicture=styled.div`
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



const StampButtonCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	backgroundColor:"white",
	boxShadow:"2px 10px 10px #b9d6ff",
	borderRadius:"5px",
	listStyle:"none",
	width:"30%",
	padding:"10px"

}

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

const BlogHomeDisplayPortal=(props)=>{
	console.log(props);
	const blog=props.selectedBlog.blog;
	var DBEditorState = convertFromRaw(JSON.parse(blog));
	var blogContentState=EditorState.createWithContent(DBEditorState);

	const [displayStampEffect,changeDisplayStampEffect]=useState(false);
	const [displayLargeModal,changeDisplayModal]=useState(true);

	const createOrRemoveStampEffect=()=>{
		var isPersonalProfile=props.profileType=="personalProfile"?true:false;
		debugger;
		//(userId,postId,profileType,postType)
		if(displayStampEffect==false){
			if(isPersonalProfile==true){
				addStampPost(props.selectedBlog.owner,props.selectedBlog._id,"personal","BlogPost");
			}else{
				addStampPost(props.selectedBlog.owner,props.selectedBlog._id,"company","BlogPost");
			}
			changeDisplayStampEffect(true);

		}else{
			if(isPersonalProfile==true){
				unStampPost(props.selectedBlog.owner,props.selectedBlog._id,"personal","BlogPost");
			}else{
				unStampPost(props.selectedBlog.owner,props.selectedBlog._id,"company","BlogPost");
			}
			changeDisplayStampEffect(false);
		}
	}

	const displayOrHideModal=()=>{
		changeDisplayModal(!displayLargeModal);
	}

	return createPortal(
		<React.Fragment>
			<ShadowContainerBlog onClick={()=>props.closeModal()}/>
	
				<Container>	
					<Editor
						editorState={blogContentState}
						toolbarClassName="toolbarClassName"
						wrapperClassName="wrapperClassName"
						editorClassName="editorClassName"
						placeholder="Start typing to create your masterpiece"
						readOnly={false}
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
											<ProfilePicture>
												{props.ownerImgUrl==null?
													<img src={NoProfilePicture} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>:
													<img src={props.ownerImgUrl} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
												}
											</ProfilePicture>
										</li>
										<li style={{listStyle:"none",display:"inline-block"}}>
											<b>Nathan</b>
										</li>

										<li style={{height:"90px",overflowY:"auto",listStyle:"none",display:"inline-block"}}>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
											 incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
											 nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
											  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
											  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
											  in culpa qui officia deserunt mollit anim id est laborum.
										</li>
									</ul>
								</li>

								<li style={StampButtonCSS}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",marginRight:"10%"}}> 
											<Icon 
												icon={stampIcon}
												style={{fontSize:30,color:"#5298F8"}}
											/>
										</li>
										<li style={{listStyle:"none",display:"inline-block",color:"#5298F8"}}> 
											Stamp
										</li>
									</ul>
								</li>
							</ul>
						</PosterInformationModal>:
						<SmallPostInformationModal>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								<ProfilePicture>
									{props.ownerImgUrl==null?
										<img src={NoProfilePicture} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>:
										<img src={props.ownerImgUrl} style={{width:"100%",height:"100%",borderRadius:"50%"}}/>
									}
								</ProfilePicture>
							</li>

							<li style={{listStyle:"none",display:"inline-block",marginRight:"30%"}}>
								<b> Nathan </b>
							</li>

							<li onClick={()=>displayOrHideModal()} style={{listStyle:"none",display:"inline-block"}}>
								<ExpandLessIcon
									style={{fontSize:25}}
								/>
							</li>
						</ul>
					</SmallPostInformationModal>
				}

				</Container>
		</React.Fragment>
	,document.getElementById("homePageContainer"));
}

export default BlogHomeDisplayPortal;