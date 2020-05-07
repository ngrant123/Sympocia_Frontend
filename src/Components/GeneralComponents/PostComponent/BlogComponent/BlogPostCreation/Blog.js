import React,{Component} from "react";
import styled from "styled-components";
import {BlogConsumer} from "./BlogContext.js";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Container=styled.div`
	position:absolute;
	width:60%;
	min-height:40%;
	left:20%;
	top:17%;
	border-radius:5px;
	margin-bottom:5%;

`;

class Blog extends Component{


	constructor(props){
		super(props);

		this.state={
			firstTimeClick:true,
			blogPostContents:"Testing blog contents",
			firstEdit:true,
			editorState:""
		}
	}

	emptyTextArea=()=>{
		if(this.state.firstTimeClick==true){

			const textArea=document.getElementById("textArea");
			textArea.innerHTML="";
			textArea.style.color="#272626";
			textArea.style.fontSize="20px";

			this.setState({
				firstTimeClick:false
			})
		}
	}

	handleBlogTextAreaChange=(savePostInformationFunction)=>{
		if(!this.state.firstEdit){
			console.log(this.state.editorState.getCurrentContent().getPlainText('\u0001'));
			savePostInformationFunction.updateBlogPost(this.state.editorState);
			this.setState({
				firstEdit:true
			})
		}
	}

	onEditorStateChange=(editorState)=>{
		console.log(editorState);
		this.setState({
			editorState:editorState,
			firstEdit:false
		})
	}



	render(){
		return(
			//Needs to be fixed later but now this will work

			<BlogConsumer>
				{postInformation=>{
					return <Container>
								<Editor
									  editorState={this.state.editorState}
									  toolbarClassName="toolbarClassName"
									  wrapperClassName="wrapperClassName"
									  editorClassName="editorClassName"
									  onEditorStateChange={this.onEditorStateChange}
									  placeholder="Start typing to create your masterpiece"
								/>
								{this.handleBlogTextAreaChange(postInformation)}
							</Container>
				}}
			</BlogConsumer>

		)
	}
}

export default Blog;