import React from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import ImageDisplayContainer from "../../GeneralComponents/PostComponent/ImageComponent/ImageDisplay/ImageContainer.js";

const Container=styled.div`
	position:fixed;
	background-color:red;
	z-index:40;
	height:90%;
	width:70%;
	border-radius:5px;
	top:5%;
	left:20%;
	background-color:white;
	padding:20px;
	overflow-y:scroll;

	@media screen and (max-width:1370px){
		left:5%;
		width:90%;
	}
	@media screen and (max-width:700px){
		width:100% !important;
		height:100% !important;
		margin-right:-10% !important;
		top:5% !important;
		margin-left:-5% !important;
	}


`;

const ShadowContainer= styled.div`
	position:fixed;
	width:110%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:40;
	left:-5%;
	top:0px;
`;


const ShadowContainerRecommenedImages=styled.div`
	position:absolute;
	width:280px;
	height:230px;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;
	z-index:1;
	transition:.8s;
	border-radius:5px;

	&:hover{
		background-color:transparent
	}
`;

const ImageContainer=styled.div`
	position:relative;
	height:80%;

	@media screen and (max-width:1370px){
		margin-left:1% !important;
    	width:100% !important;
    	height:90% !important;
    	border-radius:5px !important;
    }

     @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		width:95% !important;
    	height:80% !important;
    }
`;

const ImageLabelCSS={
	listStyle:"none",
	display:"inline-block",
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	padding:"5px",
	borderRadius:"5px",
	marginRight:"2%"
}

const ImageCSS={
	position:"relative",
	width:"280px",
	height:"230px",
	borderRadius:"5px",
	backgroundColor:"red"
}


const ImageHomeDisplayPortal=(props)=>{
	const closeModal=()=>{
		props.closeModal()
	}
	return createPortal(
		<React.Fragment>
			<ShadowContainer onClick={()=>closeModal()}/>
			<Container>
				<ImageContainer>
					<ImageDisplayContainer
						imageData={props.selectedImage}
						targetDom={props.targetDom}
						closePostModal={closeModal}
					/>
				</ImageContainer>
				{/*
						<ul style={{padding:"10px",marginTop:"2%"}}>
							<li style={{fontSize:"20px",listStyle:"none",marginBottom:"5%"}}>
								<p> 
									<b>Recommended Posts</b>
								</p>
							</li>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									{props.recommendedImages.map(data=>
										<React.Fragment>
											{data=="suggestedSymposium"?null:
												<li style={{listStyle:"none",display:"inline-block",position:"relative",marginBottom:"8%",width:"45%",marginRight:"-10%"}}>
														<ul style={{padding:"0px"}}>
															<li style={{listStyle:"none",display:"inline-block",marginBottom:"1%"}}>
																<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																	<ShadowContainerRecommenedImages/>
																	<img src={data.imgUrl} style={ImageCSS}/>
																</a>
															</li>
															<li style={{listStyle:"none",marginBottom:"1%"}}>
																<ul style={{padding:"0px"}}>
																	<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>	
																		<b>{data.firstName}</b>
																	</li>

																	<li style={ImageLabelCSS}>
																		{data.industriesUploaded[0].industry}
																	</li>
																</ul>
															</li>
															<li style={{listStyle:"none",width:"100%",height:"20%",overflow:"hidden"}}>
																  <p>{data.description}</p>
															</li>
											 			</ul>
												</li>
											}
										</React.Fragment>
									)}
								</ul>
							</li>
						</ul>
						<hr/>
				*/}

			</Container>
		</React.Fragment>,
	document.getElementById(props.targetDom)
	);
}
export default ImageHomeDisplayPortal;