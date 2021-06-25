import React,{useEffect,useState,useRef,useMemo} from "react";
import styled from "styled-components";
import CreateIcon from '@material-ui/icons/Create';
import Image from "./Image.js";
import Video from "./Video.js";
import RegularPost from "./RegularPosts.js";
import Blog from "./Blogs.js";
import SymposiumCategoryUpload from "../../Modals/SymposiumCategoryUpload/index.js";


const Container=styled.div`
	width:650px;
	height:600px;
	margin-right:2%;
	padding:5px;
	overflow:scroll;

	@media screen and (max-width:1370px){
		overflow:visible !important;
	}
	@media screen and (max-width:650px){
		margin-left:-5%;
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
		endOfPostsDBIndicator
	}=props;
	console.log(props);
	const [postCategoryPosts,changePostCategoryPosts]=useState([]);
	console.log(props.posts);
	console.log(postCategoryPosts);
	const loadingIndicatorRef=useRef();
	const [displayCategoryUpload,changeDisplayCategoryUpload]=useState(false);

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

	const pushDummyPlaceholderPostToStack=(postInformation)=>{
		console.log("Placeholder called");
		changeDisplayCategoryUpload(false);
		const currentPosts=postCategoryPosts;
		currentPosts.splice(0,0,postInformation);
		changePostCategoryPosts([...currentPosts]);
	}
	const categoryUploadDisplay=()=>{
		return(
			<React.Fragment>
				{displayCategoryUpload==true &&(
					<SymposiumCategoryUpload
						closeModal={closeSymposiumUploadCategoryPortal}
						categoryType={headers.title}
						postType={postType}
						pushDummyPlaceholderPostToStack={pushDummyPlaceholderPostToStack}
					/>
				)}
			</React.Fragment>
		)
	}
	const memoizedPostsDisplay=useMemo(()=>{
		return(
			<div style={{display:"flex",flexDirection:"row",width:"100%",flexWrap:"wrap"}}>
				{postCategoryPosts.length==0?
					<p>No posts</p>:
					<React.Fragment>
						{postCategoryPosts.map(data=>
							<>{postsDisplay(data)}</>
						)}
						<p ref={loadingIndicatorRef} onClick={()=>triggerReloadingPostsHandle(headers.title,loadingIndicatorRef)}
							style={{color:"#5298F8",cursor:"pointer"}}>
							Next Posts
						</p>
					</React.Fragment>
				}
			</div>
		)
	},[postCategoryPosts]);

	return(
		<Container>
			{categoryUploadDisplay()}
			<div style={{display:"flex",flexDirection:"column"}}>
				<div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
					<div style={{display:"flex",flexDirection:"row",width:"70%"}}>
						{displayDesktopUI==false &&(
							<>{mobileCategoryOptions()}</>
						)}
					
						<p style={{marginLeft:"5%",fontSize:"24px"}}>
							<b>{headers.title}</b>
						</p>
					</div>
					<CreateIcon
						style={{
							fontSize:"25",
							color:"#C8B0F4",
							marginLeft:"20%"
						}}
						onClick={()=>changeDisplayCategoryUpload(true)}
					/>
				</div>
				<p>{headers.secondaryTitle}</p>
			</div>
			{displayDesktopUI==false &&(
				<hr style={HorizontalLineCSS}/>
			)}
			{memoizedPostsDisplay}
		</Container>
	)	
}

export default PostCategory;