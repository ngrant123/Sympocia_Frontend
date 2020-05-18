import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw,EditorState } from 'draft-js';

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


const BlogHomeDisplayPortal=(props)=>{
	console.log(props);
	const blog=props.selectedBlog.blog;
	var DBEditorState = convertFromRaw(JSON.parse(blog));
	var blogContentState=EditorState.createWithContent(DBEditorState);

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

			</Container>
		</React.Fragment>
	,document.getElementById("homePageContainer"));
}

export default BlogHomeDisplayPortal;