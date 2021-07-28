import React,{useState,useMemo,memo,useContext,useCallback} from "react";
import styled from "styled-components";
import NoPostsModal from "../NoPostsModal.js";
import {PostDisplayConsumer,PostDisplayContext} from "../../../PostDisplayModalContext.js";
import EditIcon from '@material-ui/icons/Edit';
import {CompanyPostDisplayConsumer} from "../../../../CompanyProfile/CompanyProfilePostsDisplayContext.js";
import CrownedImageContainer from "./CrownedImageContainer.js";
import SmallImageContainer from "./SmallImageContainer.js";
import {PostConsumer,PostContext} from "../PostsContext.js";
import Typed from "react-typed";

const Container=styled.div`
	position:absolute;
	width:100%;
	height:95%;
	display:flex;
	flex-wrap:wrap;

    #smallPostLI{
		width:200px !important;
		margin-right:7% !important;
	}

	@media screen and (min-width:2500px){
	   #smallPostLI{
			width:300px !important;
		}
  	}
	@media screen and (max-width:1370px){
		width:150%;
		#parentLISmallPostContainer{
			width:190% !important;
		}
		#smallPostLI{
			margin-right:10% !important;
		}
    }
	@media screen and (max-width:650px){
		justify-content:center;
		margin-left:-5% !important;
		#smallImageDiv{
			height:110px !important;
		}
		#smallPostLI{
			width:37% !important;
			margin-right:10% !important;
			margin-bottom:5% !important;
		}
		#parentLISmallPostContainer{
			width:190% !important;
		}
    }
    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	#parentLISmallPostContainer{
			width:190% !important;
		}

    	#smallPostLI{
			margin-bottom:35% !important;
		}
    }

    @media screen and (max-width:840px) and (max-height:420px)  and (orientation: landscape){
    	margin-left:-5% !important;
    	#parentLISmallPostContainer{
			width:150% !important;
		}
		#smallImageDiv{
			height:170px !important;
		}
		#smallPostLI{
			width:35% !important;
			margin-left:3% !important;
			margin-bottom:0% !important;
		}
    }


`;

const ImageContainer=styled.div`
	position:relative;
	width:190px;
	height:30%;
`;

const Image=styled.div`
	width:100%;
	height:75%;
	background-color:black;
	border-radius:5px;
	overflow:hidden;
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

const AudioDescriptionContainer=styled.div`
	width:20px;
`;

const ImageCaption=styled.div`
	width:100%;
	height:15%;
	overflow:hidden;
	color:#767677;
`;

const IndustryButtonCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	listStyle:"none",
	padding:"5px",
	borderRadius:"5px"
}

const ImageLabelCSS={
	listStyle:"none",
	  display:"inline-block",
	  backgroundColor:"white",
	  borderRadius:"5px",
	  padding:"10px",
	  color:"#3898ec",
	  borderStyle:"solid",
	  borderWidth:"2px",
	  borderColor:"#3898ec",
	  maxWidth:"30%",
	  maxHeight:"50px",
	  overflow:"hidden",
	  cursor:"pointer"
}

const ImagePostsContainer=(props)=>{
	const PostContextValues=useContext(PostContext);
	const PostDisplay=useContext(PostDisplayContext);
	const displayPostModalCallback=useCallback((data)=>displayPostModal(data),[props.imageData.images]);

	const constructDate=(date)=>{
		var convertedDate=new Date(parseInt(date));
		var dateToString=convertedDate.toString();
		var current=new Date();

		//work on this a little more
		return dateToString;
	}

	const displayPostModal=(data)=>{
		PostDisplay.handleImagePostModal(data,PostContextValues);
	}
	return(
		<Container>
			{props.isLoading==true?
					<p>Give us a second we're getting your information</p>:
					<React.Fragment>
					{props.imageData.images.length==0 &&
						props.imageData.crownedImage==null?
						<NoPostsModal
							id="noPostsModalContainer"
							postType={"image"}
							profilePageType={props.profile}
							isSearchFilterActivated={PostContextValues.isSearchFilterActivated}
						 />:
						<ul style={{padding:"0px",width:"100%"}}>
							{props.imageData.crownedImage==null?
								null:
								<React.Fragment>
									<CrownedImageContainer
										crownedImage={props.imageData.crownedImage}
										displayPostModal={displayPostModalCallback}
										friendsColorNodesMap={props.friendsColorNodesMap}
									/>
									<hr/>
								</React.Fragment>
							}	
							<SmallImageContainer
								images={props.imageData.images}
								displayPostModal={displayPostModalCallback}
								friendsColorNodesMap={props.friendsColorNodesMap}
								PostContextValues={PostContextValues}
							/>
						</ul>
					}
					</React.Fragment>
				}
		</Container>
	)
}

export default memo(ImagePostsContainer);