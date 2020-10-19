import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import RegularPostDisplay from "../../GeneralComponents/PostComponent/RegularPostComponent/RegularPostDisplay/RegularPostContainer.js";


const ShadowContainerVideos=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:35;
	top:0px;
`;

const Container=styled.div`
	position:fixed;
	z-index:36;
	height:85%;
	width:80%;
	border-radius:5px;
	top:5%;
	left:5%;
	overflow-y:auto;
	background-color:white;
`;

const RegularPostDisplayContainer=styled.div`
	position:relative;
	z-index:13;
	height:40%;
	top:5%; 
	width:60%;
	border-radius:5px;
	left:20%;
	overflow-y:auto;
	background-color:white;
	padding:20px;
	box-shadow: 1px 1px 5px #707070; 
`;

const RegularPostHomeDisplayPortal=(props)=>{
	debugger;
	return createPortal(
		<React.Fragment>
			<ShadowContainerVideos onClick={()=>props.closeModal()}/>
			<Container>
				<RegularPostDisplayContainer>
					<RegularPostDisplay
						postData={props.selectedPost}
					/>
				</RegularPostDisplayContainer>
				<hr/>
				<ul style={{padding:"10px",marginTop:"2%"}}>
					<li style={{fontSize:"20px",listStyle:"none",marginBottom:"5%"}}>
						<p> 
							<b>Recommended Posts</b>
						</p>
					</li>
					{/*
						<li style={{listStyle:"none"}}>
							<ul style={{padding:"0px"}}>
								{props.recommendedPosts.map(data=>
									<React.Fragment>
										{data=="suggestedSymposium"?null:
											<li style={{listStyle:"none",display:"inline-block",position:"relative",marginBottom:"8%",width:"45%",marginRight:"-10%"}}>
												<SmallRegularPost

												/>
											</li>
										}
									</React.Fragment>
								)}
							</ul>
						</li>
					*/}
				</ul>
			</Container>
		</React.Fragment>
	,document.getElementById(props.targetDom));
}
export default RegularPostHomeDisplayPortal;