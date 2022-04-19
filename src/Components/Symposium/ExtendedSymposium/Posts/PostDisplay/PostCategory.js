import React,{useEffect,useState,useRef,useMemo,useContext} from "react";
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
import {SymposiumContext} from "../../SymposiumContext.js";
import {useSelector} from "react-redux";
import ArrowForwardIosIcon from '@material-ui/icons/KeyboardArrowDown';


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
		width:100%;
		margin-left:-5%;
		margin-top:5%;
		box-shadow:none;
	}
	@media screen and (max-width:650px){
		margin-left:-5%;
		width:100% !important;
		${({isSimplified})=>
			isSimplified==true?
			`
				margin-top:90px;
			`:
			`
				margin-top:-5px;
			`
		}
	}

	@media screen and (max-width:650px){
		margin-left:-5%;
		width:100% !important;
		${({isSimplified})=>
			isSimplified==true?
			`
				margin-top:90px;
			`:
			`
				margin-top:-5px;
			`
		}
	}

	@media screen and (min-width:500px) and (max-width:600px) 
		and (min-height:750px) and (max-height:850px){
		${({isSimplified})=>
			isSimplified==true &&(
			`margin-top:20px;`	
		)}
	}

	@media screen and (min-width:500px) and (max-width:520px) and (min-height:1100px) and (max-height:1370px){
		margin-top:-5px !important;
	}
	@media screen and (min-width:600px) and (max-width:720px) and (min-height:1100px) and (max-height:1370px){
		${({isSimplified})=>
			isSimplified==true?
			`
				margin-top:-300px !important;
			`:
			`
				margin-top:-500px !important;
			`
		}
	}


	@media screen and (min-width:1000px) and (max-width:1030px) and (min-height:1300px) and (max-height:1390px){
		margin-top:-5px;
	}


	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {

		${({isSimplified})=>
			isSimplified==true?
			`
				margin-top:10%;
			`:
			`
				margin-top:-5% !important;
			`
		}
    }


    @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		box-shadow:none;
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

const NextButtonCSS={
	display:"flex",
	cursor:"pointer",
	flexDirection:"row",
	alignItems:"center",
	color:"#303030",
	justifyContent:"center"
}
const PostsHorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
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
		selectedSymposiumTitle,
		selectedDivId
	}=props;

	const symposiumContext=useContext(SymposiumContext);
	const {isSimplified}=symposiumContext;

	const [postCategoryPosts,changePostCategoryPosts]=useState([]);
	const loadingIndicatorRef=useRef();
	const arrowDisplayRef=useRef();

	const [displayCategoryUpload,changeDisplayCategoryUpload]=useState(false);
	const [displayOligarchPostSettings,changeOligarchPostSettingsDisplay]=useState(false);
	const [selectedpostId,changeSelectedpostId]=useState();
	const [selectedSymposiumCategory,changeSelectedSymposiumCategory]=useState();
	const personalInformation=useSelector(state=>state.personalInformation);
	const [displayPostLoadingIndicator,changeDisplayPostLoadingIndicator]=useState(false);

	useEffect(()=>{
		changePostCategoryPosts([...props.posts])
	},[posts]);

	useEffect(()=>{

	},[loadingIndicatorRef]);

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
			<Container isSimplified={isSimplified} id={selectedDivId}
				onClick={()=>symposiumContext.triggerGenerateAirPlane(selectedDivId)}>
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
				<hr style={HorizontalLineCSS}/>
				<div style={{display:"flex",flexDirection:"row",width:"100%",flexWrap:"wrap"}}>
					{postCategoryPosts.length==0?
						<p>No posts</p>:
						<React.Fragment>
							{memoizedPostsDisplay}
						</React.Fragment>
					}
				</div>

				<div style={{width:"100%"}}>
					<hr style={PostsHorizontalLineCSS}/>
					{postCategoryPosts.length!=0 &&(
	            		<div style={NextButtonCSS}>
	            			{displayPostLoadingIndicator==true?
	            				<p>Loading...</p>:
	            				<React.Fragment>
									<p id="nextButton" 
										onClick={()=>triggerReloadingPostsHandle(headers.title,loadingIndicatorRef,arrowDisplayRef)} 
											style={{fontSize:"18px"}}>
										<b ref={loadingIndicatorRef}>Next</b>
									</p>
									<div ref={arrowDisplayRef}>
				            			<ArrowForwardIosIcon
				            				style={{fontSize:24,marginTop:"-10px"}}
				            			/>
									</div>
	            				</React.Fragment>
	            			}
	            		</div>
	            	)}
				</div>

			</Container>
		</PostDisplayProvider>
	)	
}

export default PostCategory;