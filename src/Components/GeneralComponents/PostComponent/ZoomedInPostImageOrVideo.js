import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {getVideoUrl,getImgUrl} from "../../../Actions/Requests/PostAxiosRequests/PostPageGetRequests.js";

/*
		@media screen and (max-width:650px){
		#postDisplay{
			height:60% !important;
		}
	}
*/

const Container=styled.div`
	position:fixed;
	width:60%;
	height:80%;
	background-color:white;
	z-index:55;
	top:10%;
	border-radius:5px;
	left:25%;
	display:flex;
	flex-direction: column;
	padding:30px;
	overflow:scroll;

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
		overflow:scroll !important;
	}
	@media screen and (max-width:650px){
		height:100%;
		top:0%;
		width:100% !important;
		left:0% !important;
		#postDisplay{
			${({imageWidth,imageHeight})=>
				imageWidth<imageHeight?
				`
					width:105% !important;
					height:500px !important;
				`:
				`
					margin-left:-5%;
					width:110% !important;
				`
			}
		}
	}
`;

const ShadowContainer= styled.div`
	position:fixed;
	width:110%;
	height:100%;
	background-color: rgba(0,0,0,0.9);
	z-index:55;
	top:0px;
	left:-5%;
`;

const ZoomedPostDisplayPortal=({postUrl,targetDom,closeModal,postType,unCompressedId,imageWidth,imageHeight})=>{
	const [isLoadingUnCompressedPost,changeIsLoadingUnCompressedPost]=useState(false);
	const [selectedPostUrl,changeSelectedPostUrl]=useState(postUrl);

	useEffect(()=>{
		const fetchData=async()=>{
			if(unCompressedId!=null){
				let postData;
				changeIsLoadingUnCompressedPost(true);
				if(postType=="Videos"){
					postData=await getVideoUrl(unCompressedId);
				}else{
					postData=await getImgUrl(unCompressedId);
				}
				const {confirmation,data}=postData;
				if(confirmation=="Success"){
					const {message}=data;
					changeSelectedPostUrl(message);
				}else{
					alert('An error has occured when trying to retrieve this post');
				}
				changeIsLoadingUnCompressedPost(false);
			}
		}

		fetchData();
	},[]);

	//width:imageWidth,height:imageHeight

	const postDisplay=()=>{
		return(
			<React.Fragment>
				{postType=="Images"?
					<img id="postDisplay" src={selectedPostUrl} style={{width:imageWidth,imageHeight}}/>
					:<video id="postDisplay" controls width="100%" height="100%">
						<source  type="video/mp4" src={selectedPostUrl}/>
						<p>This is fallback content to display for user agents that do not support the video tag.</p>
					</video>
				}
			</React.Fragment>
		)
	}
	return createPortal(
		<React.Fragment>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container imageWidth={imageWidth} imageHeight={imageHeight}>
				<div onClick={()=>closeModal()} style={{cursor:"pointer",marginBottom:"5%"}}>
					<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
					 width="44" height="44" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
					 stroke-linecap="round" stroke-linejoin="round">
					  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					  <circle cx="12" cy="12" r="9" />
					  <path d="M10 10l4 4m0 -4l-4 4" />
					</svg>
				</div>
				{isLoadingUnCompressedPost==false?
					<React.Fragment>
						<hr/>
						{postDisplay()}
					</React.Fragment>:
					<p>Loading...</p>
				}
			</Container>
		</React.Fragment>
	,document.getElementById(targetDom))
}

export default ZoomedPostDisplayPortal;