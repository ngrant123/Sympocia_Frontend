import React,{Component} from "react";
import styled from "styled-components";
import CommentContainer from "../../../CommentsComponent/index.js";
import {ImageConsumer} from "./ImageContext.js";

const Container=styled.div`
	position:absolute;
	width:40%;
	height:82%;
	margin-top:13px;
	overflow-y:scroll;
	top:30px;
`;


const BackButtonCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	width:"15%"
}

const Comments=()=>{


		return (
			<ImageConsumer>
				{information=>{
					return <Container>
									<a href="javascript:;" style={{textDecoration:"none"}}>
										<p style={BackButtonCSS} onClick={()=>information.updateIndicator(true)}>
											Back
										</p>
									</a>
								<CommentContainer/>
						   </Container>
				}
			}
			</ImageConsumer>
		)
}

export default Comments;