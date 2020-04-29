import React,{useState,useEffect,Component} from "react";
import styled from "styled-components";
import ImageInformation from "./ImageInformation.js";
import Comments from "./Comments.js";
import {ImageProvider} from "./ImageContext.js";

const Container=styled.div`
	position:relative;
	width:90%;
	height:50%;
	z-index:9;
	border-radius:5px;
	background-color:white;
	border-radius:5px;
	padding:5px;
	box-shadow: 1px 1px 50px #d5d5d5;
`;

const Image=styled.div`
	position:relative;
	width:460px;
	height:85%;
	background-color:blue;
	border-radius:20px;
	margin-bottom:5px;
`;

const ImageButtons=styled.div`
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

const ImageContainer=(props)=>{
	console.log("Image Modal data");
	console.log(props);
	debugger;
	const [commentImageIndicator,changeIndicator]=useState(true);

	return(
	
		
		<ImageProvider value={{
			updateIndicator:(indicator)=>{
				changeIndicator(indicator);
			}
		}}>
			<Container>

				<ul style={{padding:"0px"}}>
					<li style={{listStyle:"none",display:"inline-block",marginRight:"70px"}}>
						<ul>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",marginBottom:"5px",marginRight:"5px"}}>
										<ImageButtons>
											Promote
										</ImageButtons>
									</li>

									<li style={{listStyle:"none",display:"inline-block"}}>
										<ImageButtons>
											Stamp
										</ImageButtons> 

									</li>
								</ul>


							</li>
							<li style={{listStyle:"none"}}>
								<Image>	
									<img src={props.imageData.imgUrl} style={{width:"100%",height:"100%"}}/>
								</Image>
							</li>
						</ul>
					</li>

					<li style={{listStyle:"none",display:"inline-block",padding:"0px"}}>
						{
							commentImageIndicator==true?
								<ImageInformation
									imageInformation={props.imageData}
								/>
								:<Comments
									imageComments={props.imageData}
								/>
						}

					</li>

				</ul>

			</Container>
		</ImageProvider>

	)
}

export default ImageContainer;