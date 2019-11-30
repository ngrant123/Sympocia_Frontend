import React, {Component} from "react";
import styled from "styled-components";
import { MediumPosts } from "../../GeneralComponents/PostComponent/MediumPostComponent/MediumPosts.js";

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

		}
	}

	render(){

		return(

			<PostContainer>
				<ul>
					{Testerdata.map(data=>

						<li style={{position:"relative",listStyle:"none",marginBottom:"20px",marginTop:"20px",left:"-60px"}}>
							<MediumPosts 
								postdata={data.posttype}
							/>
						</li>

						)}
				</ul>

			</PostContainer>
		)
	}

}



export default PostComp;