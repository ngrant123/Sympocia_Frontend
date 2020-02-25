import React,{Component} from "react";
import styled from "styled-components";
import ImageContainer from "../GeneralComponents/PostComponent/ImageComponent/ImageDisplay/ImageContainer.js";
import CommentsContainer from "../GeneralComponents/CommentsComponent/index.js";

const CommentsContainerTesting=styled.div`
	position:absolute;
	width:35%;
	height:45%;
	background-color:blue;
	border-radius:5px;
	overflow-y:scroll;
`;

const CSS={
	listStyle:"none",
	marginBottom:"20px"
}

const DemoContainer=()=>{


	return(
		<ul style={{padding:"10px"}}>
			<li style={CSS}>
				<ImageContainer/>
			</li>

			<li style={CSS}>
				<CommentsContainerTesting>
					<CommentsContainer/>
				</CommentsContainerTesting>
			</li>

			<li style={CSS}>
				
			</li>


			<li style={CSS}>
				
			</li>






		</ul>
	)
}

export default DemoContainer;