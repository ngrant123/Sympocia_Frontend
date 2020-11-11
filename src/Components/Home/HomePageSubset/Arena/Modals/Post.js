import React,{useState} from "react";
import styled from "styled-components";
import TestProfilePicture from "../../../../../designs/img/FirstSectionLandingPAgeImage.png";
import { convertFromRaw,EditorState,ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

const Container=styled.div`
	position:fixed;
	z-index:14;
	height:90%;
	width:60%;
	border-radius:5px;
	top:5%;
	left:20%;
	overflow-y:auto;
	background-color:white;
	padding:20px;

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;

		#postLI{
			height:70% !important;
			width:90% !important;
		}
	}

	@media screen and (max-width:780px){
		width:110% !important;
		left:-10% !important;

		#postLI{
			height:70% !important;
			width:120% !important;
		}
	}
`;


const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	width:180%;
	height:5%;
`;


const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:300%;
	background-color: rgba(0,0,0,0.4);
	z-index:14;
	top:0px;
`;

const FilterButton={
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

const DateCaption={
	listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"2%"
}

const BoostButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"5px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec"
}


/*
Sample api call
	imageData:{
			owner:{
				firstName:"Bob"
			}
		},
		arenaScore:20,
		winnerDate:1597939577235

Could later on add a search bar

Was going to allow the user the option of boosting a post from here 
but its just a hassle right now. Will implement later
*/

const PostModal=({closeModal,postType,postData})=>{
	console.log(postType);
	console.log(postData);

	const constructDate=(dateMilliseconds)=>{
		const newDate=new Date(dateMilliseconds).toLocaleDateString();
		return newDate;
	}



	const image=()=>{
		return(
			<ul style={{padding:"0px"}}>
				<li id="postLI" style={{listStyle:"none",display:"inline-block",width:"70%"}}>
					<img src={postData.imgUrl} style={{width:"90%",height:"90%"}}/>
				</li>
				<hr/>
				<p style={{fontSize:"30px"}}>
					<b>{postData.caption}</b>
				</p>
				<p>{postData.description}</p>
				{/*
					<li style={BoostButton}>
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bolt" width="25" height="25" viewBox="0 0 24 24"
						  stroke-width="1" stroke="#FFC107" fill="none" stroke-linecap="round" stroke-linejoin="round">
						  <path stroke="none" d="M0 0h24v24H0z"/>
						  <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3" />
						</svg>

						Boost
					</li>
				*/}
			</ul>
		);
	}

	const video=()=>{
		return(
			<ul style={{padding:"0px"}}>
				<li id="postLI" style={{listStyle:"none",display:"inline-block"}}>
					<video style={{borderRadius:"5px"}} width="100%" height="80%" autoplay="true" controls>
						<source src={postData.videoUrl} type="video/mp4"/>
					</video>
				</li>
				<hr/>
				<p style={{fontSize:"30px"}}>
					<b>{postData.caption}</b>
				</p>
				<p>{postData.description}</p>
				{/*
					<li style={BoostButton}>
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bolt" width="25" height="25" viewBox="0 0 24 24"
						  stroke-width="1" stroke="#FFC107" fill="none" stroke-linecap="round" stroke-linejoin="round">
						  <path stroke="none" d="M0 0h24v24H0z"/>
						  <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3" />
						</svg>

						Boost
					</li>

				*/}
			</ul>
		);
	}

	const blog=()=>{
		var DBEditorState = convertFromRaw(JSON.parse(postData.blog));
		var blogContentState=EditorState.createWithContent(DBEditorState);

		return <ul>
					{/*
					<li style={BoostButton}>
						<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bolt" width="25" height="25" viewBox="0 0 24 24"
						  stroke-width="1" stroke="#FFC107" fill="none" stroke-linecap="round" stroke-linejoin="round">
						  <path stroke="none" d="M0 0h24v24H0z"/>
						  <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3" />
						</svg>

						Boost
					</li>

				*/}

					<li id="postLI" style={{listStyle:"none"}}>
						<Editor
							editorState={blogContentState}
							toolbarClassName="toolbarClassName"
							wrapperClassName="wrapperClassName"
							editorClassName="editorClassName"
							placeholder="Start typing to create your masterpiece"
							readOnly={false}
							toolbarHidden={true}
						/>
					</li>
			   </ul>;
	}

	const regularPost=()=>{
		return  <>
					
				</>;
	}

	const renderPost=()=>{
		switch(postType){
			case 'Images':
				return image();
				break;

			case 'Blogs':
				return blog();
				break;

			case 'Videos':
				return video();
				break;

			case 'RegularPosts':
				return regularPost();
				break;

			default:
			break;
		}
	}

	return(
		<>
			<ShadowContainer onClick={()=>closeModal()}/>
			<Container>
				<ul>
					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						<li onClick={()=>closeModal()} style={{marginLeft:"90%",listStyle:"none"}}>
							<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#03A9F4" fill="none" stroke-linecap="round" stroke-linejoin="round">
							  <path stroke="none" d="M0 0h24v24H0z"/>
							  <circle cx="12" cy="12" r="9" />
							  <path d="M10 10l4 4m0 -4l-4 4" />
							</svg>
						</li>
					</a>

					<li style={{listStyle:"none"}}>
						{renderPost()}
					</li>
				</ul>
			</Container>
		</>
	)
}

export default PostModal;