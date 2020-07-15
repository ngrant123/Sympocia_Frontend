import React,{Component} from "react";
import styled from "styled-components";
import {ImageConsumer} from "./ImageContext.js";


const Container=styled.div`
	position:absolute;
		width:40%;
	height:82%;
	z-index:3;
	background-color:white;
	top:30px;
	overflow-y:scroll;
`;

const IndustryButton=styled.div`
	position:relative;
	background-color:#5298F8;
	text-align:center;
	width:120px;
	padding:5px;
	color:white;
	border-style:solid;
	border-width:1px;
	border-color:#0857c2;
	border-radius:5px;
	transition:.8s;

	&:hover{
		background-color:#0857c2;
	}
`;



const ImagePostsButtons=styled.div`
	position:relative;
	background-color:#5298F8;
	text-align:center;
	width:120px;
	padding:5px;
	color:white;
	border-style:solid;
	border-width:1px;
	border-color:#0857c2;
	border-radius:5px;
	transition:.8s;

	&:hover{
		background-color:#0857c2;
	}


`; 




//Could be turned into a functional component im a bot
const ImageInformation=(props)=>{
	debugger;
		return (
			<ImageConsumer>
				{information=>{
					return <Container>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block"}}>
												<audio style={{width:"200px"}} controls>
													<source src={props.imageInformation.audioDescription} type="audio/ogg"/>
													<source src={props.imageInformation.audioDescription} type="audio/mpeg"/>
													Your browser does not support the audio element.
												</audio>
											</li>

										</ul>
									</li>
									<hr/>
									<li style={{listStyle:"none",display:"inline-block",marginTop:"5%"}}>
										<p style={{fontSize:"20px"}}>{props.imageInformation.firstName}</p>
									</li>

									<li style={{listStyle:"none",display:"inline-block"}}>
										<IndustryButton>
											{props.imageInformation.industriesUploaded[0].industry}
										</IndustryButton>
									</li>

								</ul>

								<p style={{height:"30%",width:"90%",fontSize:"40px",overflow:"hidden"}}>
									<b>
										{props.imageInformation.caption}
									</b>
								</p>
								<p style={{height:"35%",overflow:"hidden"}}> 
									 {props.imageInformation.description}
								 </p>

								 <ul style={{padding:"0px",marginTop:"5px"}}>
								 	<li style={{listStyle:"none",display:"inline-block",marginRight:"10px"}}>
								 		 <ImagePostsButtons onClick={()=>information.updateIndicator(false)}>
								 			Comments
										 </ImagePostsButtons>
								 	</li>


								 </ul>
							</Container>

				}
			}
			</ImageConsumer>

		)
}

export default ImageInformation;