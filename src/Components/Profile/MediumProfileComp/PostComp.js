import React, {Component} from "react";
import styled from "styled-components";


const PostContainer = styled.div`

	position:absolute;
	height:100%;
	width:100%;
`;

const CreatePost = styled.div`
	position:absolute;
	background-color:red;
	width:70%;
	height:40%;
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


class PostComp extends Component{



	render(){



		return(

			<PostContainer>
				<CreatePost>
		
				</CreatePost>

				<Post>

				</Post>

			</PostContainer>



		)
	}

}



export default PostComp;