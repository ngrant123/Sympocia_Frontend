import React,{useState} from "react";
import styled from "styled-components";
import {
		updateCrownedImage,
		updateCrownedVideo,
		updateCrownedBlog,
		updateCrownedRegularPost
} from "../../../Actions/Requests/PostAxiosRequests/PostPageSetRequests.js";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


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

	@media screen and (max-width:740px){
		left:5% !important;
		width:90% !important;
		height:35% !important;
	}
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

const CrownPost=({closeModal,parentCrownPost,parentUnCrownPost,previousData,isPostCrowned})=>{
	const unCrownPost=async()=>{
		

		const crownElement=document.getElementById("crownIcon");
		crownElement.style.backgroundColor="white";
		crownElement.style.color="#C8B0F4";
		/*
		if(previousData!=null){
			const headerObject={
				isCrownedImage:true,
				image:null
			}
			previousData.contextLocation.updateImagePost(headerObject);
			const crownedImageResponse= await updateCrownedImage(previousData.owner,false,previousData._id);
		}
		*/
		parentUnCrownPost();
	}

	const crownPost=async()=>{
		
		const crownElement=document.getElementById("crownIcon");
		crownElement.style.backgroundColor="#D6C5F4";
		crownElement.style.color="white";
		/*
		if(previousData!=null){
			const headerObject={
				isCrownedImage:true,
				image:previousData
			}
			previousData.contextLocation.updateImagePost(headerObject);
			const crownedImageResponse= await updateCrownedImage(previousData.owner,true,previousData._id);
		}
		*/
		alert('Your post is now crowned');
		parentCrownPost();
	}
	return(
		<React.Fragment>
			<ShadowContainer onClick={()=>closeModal()} />
			<CrownPostModal>
				<ul style={{padding:"20px"}}>
					<a href="javascript:void(0);">
						<li onClick={()=>closeModal()} style={{listStyle:"none",marginLeft:"90%"}}>
							<HighlightOffIcon
								style={{fontSize:"20"}}
							/>
						</li>
					</a>
					{isPostCrowned==true?
						<React.Fragment>
							<p> 
								Are you sure you want to uncrown this post?
							</p>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>unCrownPost()} style={ButtonCSS}>
											Yes
										</li>
									</a>

									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li style={ButtonCSS} onClick={()=>closeModal()}>
											No
										</li>
									</a>
								</ul>
							</li>
						</React.Fragment>:
						<React.Fragment>
							<p> 
								Are you sure you want to crown this post? You're current crowned 
								post will be replace.
							</p>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>crownPost()} style={ButtonCSS}>
											Yes
										</li>
									</a>

									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li style={ButtonCSS} onClick={()=>closeModal()}>
											No
										</li>
									</a>
								</ul>
							</li>
						</React.Fragment>
					}
				</ul>

			</CrownPostModal>
		</React.Fragment>
	)
}
export default CrownPost;

