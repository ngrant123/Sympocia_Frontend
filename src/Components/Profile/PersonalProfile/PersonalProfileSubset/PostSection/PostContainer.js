import React, { Component } from "react";
import styled from "styled-components";
import PostCreationComponent from "../../../../GeneralComponents/PostComponent/LargePostComponent/LargePostComponent.js";

const ImageOrVideosContainer=styled.div`
	
	position:absolute;
	background-color:#fbfdff;
	width:95%;
	left:1%;
	top:2%;
	height:30%;
	border-radius:5px;
	box-shadow: 2px 2px 2px 2px #acbed9;
	transition:.8s;
	overflow-x: hidden; 
	overflow-y:hidden;
	padding:10px;
	color:#5298F8;

	&:hover{
		box-shadow: 5px 5px 5px 5px #d5d5d5;

	}
`;

const PostCreationContainer=styled.div`
	position:absolute;
	background-color:blue;
	height:65%;
	top:35%;
	left:1%;
	width:85%;
	box-shadow: 10px 10px 20px 	#dbdddf;
	transition:.8s;		
	border-radius:5px;
	overflow:hidden;

	&:hover{
		box-shadow: 10px 10px 20px 	#9395a0;

	}
`;

const BlogsContainer=styled.div`
	position:absolute;
	background-color:black;
	left:73%;
	height:60%;
	width:30%;
	top:35%;
	border-radius:5px;

`;


const ImageContainers=[
	{
	},
	{
	},
	{
	}
	
]


class MediumProfileContentsContainer extends Component{


	constructor(props){

		super(props);
		this.state={
			imageVidoesBlogsContainer:[]

		}
	}

	componentDidMount(){

		this.setState({
			imageVidoesBlogsContainer:ImageContainers
		})
	}


	handleDisplayProps=()=>{

		if(this.state.imageVidoesBlogsContainer.length==0)
			return <p style={{position:"relative",fontSize:"150%",left:"20%"}}> Add some images to get started</p>;
		else{
			return(
				<ul >
						<p style={{position:"absolute",left:"92%"}}> See all </p>
						{this.state.imageVidoesBlogsContainer.map(data=>

							<li style={{display:"inline-block",listStyle:"none",marginRight:"20px"}}>

								<div style={{position:"relative",backgroundColor:"red",width:"160px",height:"140px",borderRadius:"5px"}}>

								</div>
							</li>
						)}
					</ul>
			)
		}
	}


	render(){

		return(
			<React.Fragment>

				<ImageOrVideosContainer>

					{this.handleDisplayProps()}


				</ImageOrVideosContainer>

				<PostCreationContainer>
					<PostCreationComponent/>
				</PostCreationContainer>

			</React.Fragment>
		)
	}
}

export default MediumProfileContentsContainer;
