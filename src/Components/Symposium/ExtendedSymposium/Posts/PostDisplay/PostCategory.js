import React,{useEffect,useState,useRef,useMemo} from "react";
import styled from "styled-components";
import CreateIcon from '@material-ui/icons/Create';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import Image from "./Image.js";
import Video from "./Video.js";
import RegularPost from "./RegularPosts.js";
import Blog from "./Blogs.js";
import SymposiumCategoryUpload from "../../Modals/SymposiumCategoryUpload/index.js";
import {PostDisplayProvider} from "./PostDisplayContext.js";
import OligarchPostSettings from "../../Modals/Oligarchs/OligarchPostAbilities/OligarchDeleteOrMovePost.js";
import {useSelector} from "react-redux";

const Container=styled.div`
	width:90%;
	height:550px;
	margin-right:1%;
	padding:5px;
	overflow-x:hidden;
	overflow-y:auto;
	background-color:white;
	border-radius:5px;
	box-shadow: -5px 20px 20px #C4C4C4;
	padding:20px;

	@media screen and (max-width:1370px){
		overflow:visible !important;
		width:590px;
	}
	@media screen and (max-width:650px){
		margin-left:-5%;
		width:650px;
	}
`;

const MobileCategoryOptions=styled.div`
	visibility:none;

	@media screen and (max-width:650px){
		visibility:visible
	}
`;
const MobileCaretDropDownCSS={
	boxShadow:"1px 1px 5px #6e6e6e",
	borderStyle:"none",
	color:"#5298F8",
	backgroundColor:"white",
	borderRadius:"50%",
	padding:"10px"
}
const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const CreateIconCSS={
	fontSize:"35",
	color:"#C8B0F4",
	marginLeft:"20%",
	cursor:"pointer"
}

const PostCategory=(props)=>{
	const {
		headers,
		postType,
		defaultPostCategoryInformation,
		triggerChangeCategoryType,
		displayDesktopUI,
		triggerNewPostsFetch,
		triggerReloadingPostsHandle,
		isLoadingReloadedPosts,
		posts,
		endOfPostsDBIndicator,
		isOligarch,
		selectedSymposiumTitle
	}=props;
	const [postCategoryPosts,changePostCategoryPosts]=useState([]);
	const loadingIndicatorRef=useRef();
	const [displayCategoryUpload,changeDisplayCategoryUpload]=useState(false);
	const [displayOligarchPostSettings,changeOligarchPostSettingsDisplay]=useState(false);
	const [selectedpostId,changeSelectedpostId]=useState();
	const [selectedSymposiumCategory,changeSelectedSymposiumCategory]=useState();
	const personalInformation=useSelector(state=>state.personalInformation);

	useEffect(()=>{
		changePostCategoryPosts([...props.posts])
	},[posts]);

	const postsDisplay=(data)=>{
		switch(postType){
			case "Image":{
				return(
					<Image
						imageInformation={data}
					/>
				)
			}
			case "Video":{
				return(
					<Video
						videoInformation={data}
					/>
				)
			}
			case "Regular":{
				return(
					<RegularPost
						regularPostInformation={data}
						displayDesktopUI={displayDesktopUI}
					/>
				)
			}
			case "Blog":{
				return(
					<Blog
						blogInformation={data}
					/>	
				)
			}
		}
	}

	const mobileCategoryOptions=()=>{
		return(
			<MobileCategoryOptions>
				<div class="dropdown">
					<button class="btn btn-primary dropdown-toggle" 
						type="button" data-toggle="dropdown" style={MobileCaretDropDownCSS}>
					   	<span class="caret"></span>
					</button>

					<ul class="dropdown-menu" style={{height:"170px",overflow:"auto"}}>
						{defaultPostCategoryInformation.map(data=>
							<React.Fragment>
								<li onClick={()=>triggerChangeCategoryType(data.headers.title)} 
									style={{listStyle:"none"}}>
									<a>{data.headers.title}</a>
								</li>
								<hr/>
							</React.Fragment>
						)} 
					</ul>
			  	</div>
			</MobileCategoryOptions>
		)
	}
	const closeSymposiumUploadCategoryPortal=()=>{
		changeDisplayCategoryUpload(false);
	}

	const categoryUploadDisplay=()=>{
		return(
			<React.Fragment>
				{displayCategoryUpload==true &&(
					<SymposiumCategoryUpload
						closeModal={closeSymposiumUploadCategoryPortal}
						categoryType={headers.title}
						postType={postType}
					/>
				)}
			</React.Fragment>
		)
	}
	const memoizedPostsDisplay=useMemo(()=>{
		return(
			<React.Fragment>
				{postCategoryPosts.map(data=>
					<>{postsDisplay(data)}</>
				)}
			</React.Fragment>
		)
	},[postCategoryPosts]);

	const closeOligarchPostSettingsModal=()=>{
		changeOligarchPostSettingsDisplay(false);
	}

	const oligarchSettingsPortal=()=>{
		return(
			<React.Fragment>
				{displayOligarchPostSettings==true &&(
					<OligarchPostSettings
						closeModal={closeOligarchPostSettingsModal}
						postId={selectedpostId}
						postType={postType}
						selectedSymposiumCategory={selectedSymposiumCategory}
						selectedSymposiumTitle={selectedSymposiumTitle}
					/>
				)}
			</React.Fragment>
		)
	}

	const triggerCreateQuickCategoryUpload=()=>{
		if(personalInformation.isGuestProfile==false){
			changeDisplayCategoryUpload(true)
		}else{
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free');
		}
	}

	return(
		<PostDisplayProvider
			value={{
				isOligarch,
				displayOligarchPostSettings:(postId,selectedSymposiumCategory)=>{
					changeSelectedSymposiumCategory(selectedSymposiumCategory);
					changeSelectedpostId(postId);
					changeOligarchPostSettingsDisplay(true);
				}
			}}
		>
			<Container>
				{oligarchSettingsPortal()}
				{categoryUploadDisplay()}
				<div style={{display:"flex",flexDirection:"column"}}>
					<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
						<div style={{display:"flex",flexDirection:"row",width:"70%"}}>
							{displayDesktopUI==false &&(
								<>{mobileCategoryOptions()}</>
							)}
						
							<p style={{fontSize:"18px",fontFamily:"'Poppins'"}}>
								<b>{headers.title}</b>
							</p>
						</div>
						<AddCircleIcon
							style={CreateIconCSS}
							onClick={()=>triggerCreateQuickCategoryUpload()}
						/>
					</div>
					<p>{headers.secondaryTitle}</p>
				</div>
				{displayDesktopUI==false &&(
					<hr style={HorizontalLineCSS}/>
				)}
				<div style={{display:"flex",flexDirection:"row",width:"100%",flexWrap:"wrap"}}>
					{postCategoryPosts.length==0?
						<p>No posts</p>:
						<React.Fragment>
							{memoizedPostsDisplay}
							<p ref={loadingIndicatorRef} onClick={()=>triggerReloadingPostsHandle(headers.title,loadingIndicatorRef)}
								style={{color:"#5298F8",cursor:"pointer",marginTop:"15%"}}>
								Next Posts
							</p>
						</React.Fragment>
					}
				</div>
			</Container>
		</PostDisplayProvider>
	)	
}

export default PostCategory;