import React, {Component} from "react";
import styled from "styled-components";
import { MediumPosts } from "../../../../GeneralComponents/PostComponent/MediumPostComponent/MediumPosts.js";

const PostContainer = styled.div`

	position:absolute;
	height:130%;
	width:90%;
`;

const CreatePost = styled.div`
	position:relative;
	background-color:red;
	width:70px;
	height:40px;
	top:4%;
	left:15%;
	border-radius:5px;
`;

const Post = styled.div`
	position:absolute;
	background-color:red;
	width:70%;
	height:40%;
	top:55%;
	left:15%;
	border-radius:5px;
`;


const PostDivider = styled.div`

	position:absolute;
	background-color:#4d5050;
	height:1%;
	width:90%;
	border-radius:5px;
	top:-5%;
	left:3%;

`;


const Testerdata=[
	{
		posttype:"regularpost"
	},
	{
		posttype:"image"

	},
	{
		posttype:"map"

	}
]


class PostComp extends Component{

	constructor(props){
		super(props);

		this.state={
			industries:[]

		}
	}

	render(){

		return(

			<React.Fragment>

			</React.Fragment>
		)
	}

}



export default PostComp;