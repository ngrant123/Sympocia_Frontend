import React,{Component} from "react";
import styled from "styled-components";
import CommentContainer from "../../../CommentsComponent/index.js";

const Container=styled.div`
	position:absolute;
	width:50%;
	height:82%;
	background-color:red;
	margin-top:13px;
	overflow-y:scroll;

`;


class Comments extends Component{



	render(){


		return (
			<Container>
				<CommentContainer/>



			</Container>

		)
	}
}

export default Comments;