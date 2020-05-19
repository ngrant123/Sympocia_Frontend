import React,{Component} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {
	BlogConsumer,
	BlogProvider
} from "./BlogContext.js";
import {GeneralNavBar} from "../../../NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import AdditionalInformation from "./AdditionalInformation.js";
import TextOptions from "./TextOptions.js";
import Blog from "./Blog.js";
import BlogEditSubmitModal from "./BlogEditSubmitModal.js";
import { convertFromRaw,EditorState } from 'draft-js';

const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
	background-color:#FFFFFF;
`;

const ShadowContainer = styled.div`

	position:absolute;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;
	z-index:4;

`;


class BlogPostCreation extends Component{


	constructor(props){
		super(props);
		console.log(props);
		console.log("Teste");
		this.state={
			userInformation:{},
			displayEditButtonSubmitModal:false,
			blog:""
		}
	}

	componentDidMount=()=>{
		debugger;
		var isOwner=false;
		if(this.props.personalInformation.id==this.props.match.params.id){
			isOwner=true;
		}
		var blogContentState;
		if(this.props.location.state.postType=="Creation"){
			blogContentState="";
		}else{
			var DBEditorState = convertFromRaw(JSON.parse(this.props.location.state.blog));
			blogContentState=EditorState.createWithContent(DBEditorState);
		}
		this.setState({
			userInformation:this.props.personalInformation,
			isOwner:isOwner,
			blogContent:blogContentState
		})
	}

	editBlogSubmitModal=()=>{
		return this.state.displayEditButtonSubmitModal==false?<React.Fragment></React.Fragment>:
		<React.Fragment>
			<ShadowContainer onClick={()=>this.setState({displayEditButtonSubmitModal:false})}/>
			<BlogEditSubmitModal/>
		</React.Fragment>
	}

	displayOrHideSubmitModal=()=>{
		this.setState({
			displayEditButtonSubmitModal:!this.state.displayEditButtonSubmitModal
		})
	}

	render(){
		return(
			<BlogProvider value={{
				blog:this.state.blogContent,
				isOwner:this.state.isOwner,
				personInformation:this.state.userInformation,
				blogPostState:this.state.blog,
				updateBlogPost:(blogPost)=>{
					this.setState({
						blog:blogPost
					})
				}
			}}>
				<Container>
					<GeneralNavBar/>
					<AdditionalInformation
						blogData={this.props.location.state}
					/>
					<TextOptions
						displayEditBlogSubmitModal={this.displayOrHideSubmitModal}
				/>
				<Blog/>
				{this.editBlogSubmitModal()}
				</Container>
			</BlogProvider>
		)
	}
}

const mapStateToProps=(state)=>{

	return{
		personalInformation:state.personalInformation
	}
}


export default connect(
		mapStateToProps,
		null
	)(BlogPostCreation);
