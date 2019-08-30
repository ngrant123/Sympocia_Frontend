import React, { Component } from "react";
import styled from "styled-components";
import Images from "../SmallChatComponent/Images.js";

const ImageContainer = styled.div`
	
	position:absolute;
	top:5%;
	height:55%;
	width:90%;
	background-color:red;
	border-radius:5px;
	display:inline-block;

`;

const Container = styled.div`
	display:flex;
	flex-warp:wrap;
	flex-direction:column;
	align-items: stretch;

`;


const ImageTitleContainer = styled.div`
	position:absolute
	fontSize:110%;
	color:	#9eaabb;
	left:7%;


`;

const ViewAllImagesContainer = styled.div`

	position:absolute
	fontSize:105%;
	color:	#67a4f8;
	left:65%;

`;


const TesterData =[
	{	
		tester:1

	},
	{
		tester:2

	},
	{
		tester:3
	},
	{	
		tester:1

	},
	{
		tester:2

	},
	{
		tester:3
	},
	{	
		tester:1

	},
	{
		tester:2

	},
	{
		tester:3
	},
	{	
		tester:1

	},
	{
		tester:2

	},
	{
		tester:3
	}
]


class ImageDisplay extends Component {

	constructor(props){

		super(props);

		this.state={

		} 
	}

	render(){

		return(
			<React.Fragment>

					<ImageTitleContainer><b>Images</b></ImageTitleContainer>
					<ViewAllImagesContainer>View all</ViewAllImagesContainer>



					<ul  style={{position:"absolute",top:"50px", height:"90px",width:"145%"}}>
						 { TesterData.map(data=>
							<li style={{display:"inline-flex"}}>
						   
								<Images
									tester={data.tester}
								/>
						
							</li>
						)}
					</ul>


			</React.Fragment>
	
		)
	}
}

export default ImageDisplay;