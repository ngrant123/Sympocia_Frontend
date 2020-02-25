import React,{Component} from "react";
import styled from "styled-components";
import CommentContainer from "./CommentContainer.js";
import VideoResponseContainer from "./VideosResponseContainer.js";


class CommentsContainer extends Component{

	constructor(props){

		super(props);
		this.state={
			comments:[
			{
				originalComment:"Testing out comment system",
				response:[
						{
							owner:"Nathan",
							response:"This is just a tester response"
						},
						{
							owner:"Nathan",
							response:"This is just a tester response"
						}
					]
			},
			{
				originalComment:"Testing out comment system",
				response:[
						{
							owner:"Nathan",
							response:"This is just a tester response"
						}
					]
			},
			{
				originalComment:"Testing out comment system",
				response:[
						{
							owner:"Nathan",
							response:"This is just a tester response"
						},
						{
							owner:"Nathan",
							response:"This is just a tester response"
						},
						{
							owner:"Nathan",
							response:"This is just a tester response"
						},
						{
							owner:"Nathan",
							response:"This is just a tester response"
						}
					]
			},
			{
				originalComment:"Testing out comment system",
				response:[]
			}
			],
			displayResponses:false,
			displayCommentsOrVideoResponses:true
		}
	}
	componentDidMount(){


	}
	displayCommentsOrVideoResponses=()=>{

		return this.state.displayCommentsOrVideoResponses==true?
			<CommentContainer/>:
			<VideoResponseContainer/>
	}


	render(){

		return(
			<React.Fragment>
				<ul style={{padding:"0px",backgroundColor:"red"}}>
					<li>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								Comments
							</li>

							<li  style={{listStyle:"none",display:"inline-block"}}>
								Video Responses

							</li>
						</ul>
					</li>
					{this.displayCommentsOrVideoResponses()}
					
				</ul>

			</React.Fragment>

		)
	}
}

export default CommentsContainer;