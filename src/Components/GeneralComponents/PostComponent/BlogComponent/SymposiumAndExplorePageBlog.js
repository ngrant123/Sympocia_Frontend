import React,{useState,useEffect} from "react";
import styled,{keyframes,css} from "styled-components";
import {SmallProfilePictureAndVideoDescription} from "../../../ExplorePage/ExplorePageSubset/PostsDisplay/PostDisplayGeneralComp.js";
import {useSelector} from "react-redux";
import BlogHomeDisplayPortal from "../../../ExplorePage/ExplorePageSet/BlogHomeDisplayPortal.js";

const glowing=keyframes`
      0% { border-color: #D6C5F4; box-shadow: 0 0 10px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0px 0px 10px 5px #FFF52C; }
      100% { border-color: #B693F7; box-shadow: 0 0 10px #C8B0F4; }
`;

const Container=styled.div`
	${({swimmingStatus})=>
		swimmingStatus==true &&(
			css`
				animation: ${glowing} 1300ms infinite;
			`
		)
	}
`;


const BlogImageContainerCSS={
	position:"relative",
	width:"100%",
	height:"100%",
	borderRadius:"5px"
}

const SmallBlogImageCSS={
	position:"relative",
	width:"160px",
	height:"123px",
	borderRadius:"5px",
	marginBottom:"5%"
}


const SymposiumAndExplorePageDisplay=({blogPostInformation,targetDom})=>{
	const [selectedBlog,changeSelectedBlog]=useState();
	const [displayBlogDisplayPortal,changeBlogDisplay]=useState(false);
	const personalInformationRedux=useSelector(state=>state.personalInformation);
	const [swimmingStatus,changeSwimmingStatus]=useState(false);

	useEffect(()=>{
		const {industriesUploaded}=blogPostInformation;
		for(var i=0;i<industriesUploaded.length;i++){
			if(industriesUploaded[i].isSwimmingTriggeredForPost==true){
				console.log("True")
				changeSwimmingStatus(true);
				break;
			}
		}
	},[]);

	const closeModal=()=>{
		changeBlogDisplay(false)
	}

	const displayBlogModal=(data)=>{
		changeSelectedBlog(data);
		changeBlogDisplay(true);
	}

	return(
		<React.Fragment>
			{displayBlogDisplayPortal==true &&(
				<BlogHomeDisplayPortal
					closeModal={closeModal}
					selectedBlog={selectedBlog}
					recommendedBlogs={[]}
					targetDom={targetDom}
					personalId={personalInformationRedux.id}
				/>
			)}
			<div onClick={()=>displayBlogModal(blogPostInformation)} id="smallImageAndOwnerContainer" 
				style={{marginRight:"3%",display:"flex",flexDirection:"column"}}>
				<Container swimmingStatus={swimmingStatus} id="smallImageContainer" style={SmallBlogImageCSS}>
					<img id="image" src={blogPostInformation.blogImageUrl} style={BlogImageContainerCSS}/>
				</Container>
				<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
					<SmallProfilePictureAndVideoDescription
						postData={blogPostInformation}
					/>
					<p style={{marginLeft:"2%",maxWidth:"90px",overflow:"hidden",maxHeight:"20px"}}>
						{blogPostInformation.owner.firstName}
					</p>
				</div>
			</div>
			<div onClick={()=>displayBlogModal(blogPostInformation)} id="smallPostTitleAndDescription"
			 	style={{display:"flex",flexDirection:"column"}}>
				<p id="smallPostTitle" style={{fontSize:"20px",height:"60px",overflowY:"hidden",marginBottom:"2%"}}>
					<b>
						{blogPostInformation.title}
					</b>
				</p>

				<p id="smallPostDescription" style={{fontSize:"13px",color:"#8c8c8c",height:"50px",overflowY:"hidden"}}>
					{blogPostInformation.description}
				</p>
			</div>
		</React.Fragment>
	)
}


export default SymposiumAndExplorePageDisplay;