import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:45;
	top:0px;
	left:0%;
`;

const Container=styled.div`
	position:fixed;
	width:40%;
	height:75%;
	background-color:white;
	z-index:50;
	top:10%;
	border-radius:5px;
	left:30%;
	overflow-y:auto;
	padding:2%;

	@media screen and (min-width:2500px){
		height:50%;
		width:50%;
		left:25%;
	}


	@media screen and (max-width:1370px){
		width:60% !important;
		left:20% !important;
    }
    @media screen and (max-width:650px){
		width:100% !important;
		left:0% !important;
		top:0% !important;
		height:100% !important;

		#closeModalButton{
			display:block !important;
		}


    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	height:65%;
    }
`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	width:80%;
	height:50px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;

const ButtonCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	color:"#3898ec",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	cursor:"pointer",
	marginLeft:"2%"
}

const HorizontalLineCSS={
	position:"relative",
	width:"100%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
}


const VerticalLineCSS={
	borderStyle:"solid",
	position:"relative",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"400%",
 	marginRight:"5%",
 	marginLeft:"5%"
}


const BadgePortal=({closeModal})=>{
	const [displayEditModal,changeDisplayEditModal]=useState(false);
	const [currentBadgeType,changeBadgeType]=useState("Images");
	const [badgesPosts,changeBadgesPosts]=useState([]);
	const [badgeDescription,changeBadgeDescription]=useState();
	useEffect(()=>{

	},[]);

	const postsDecider=(data)=>{
		switch(currentBadgeType){
			case "Images":{
				return(
					<img src={data.imgUrl} 
						style={{position:"relative",width:"120px",height:"120px",borderRadius:"5px"}}
					/>
				)
			}
			case "Videos":{
				return(
					<video id="videoElement"
						style={{borderRadius:"5px",backgroundColor:"#151515",cursor:"pointer"}}
						 position="relative" width="100%" height="100%"
					 	key={data.videoUrl} autoPlay loop autoBuffer muted playsInline>
						<source src={data.videoUrl} type="video/mp4"/>
					</video>
				)
			}
			case "Text":{
				return(
					<>
						{data.isAudioPost==true?
							<audio id="audio" controls>
							 	<source src={data.post} type="audio/ogg"/>
							  	<source src={data.post} type="audio/mp4"/>
								Your browser does not support the audio element.
							</audio>
							:
							<>{data.post}</>
						}
					</>
				)
			}

			case "Blog":{
				return(
					<img id="headerBlogLI"
						src={data.blogImageUrl} style={{borderRadius:"5px",position:"relative",width:"100%",height:"100%"}}
					/>
				)
			}
		}

	}

	return createPortal(
		<React.Fragment>
			<ShadowContainer onClick={()=>closeModal()}/>
			<Container>
				<p style={{fontSize:"24px"}}>
					<b>Friends Gauge Badge Settings</b>
				</p>
				<hr style={HorizontalLineCSS}/>
				<div>
					<p>
						<b>Badge Caption:</b>
					</p>
					<div style={{display:"flex",flexDirection:"row"}}>
						<InputContainer placeholder="Enter Badge Caption here"/>
						<div style={ButtonCSS}>
							Edit
						</div>
					</div>
				</div>

				<div style={{marginTop:"10%"}}>
					<p>
						<b>Posts:</b>
					</p>
					<div style={{display:"flex",flexDirection:"row"}}>
						{badgesPosts.map(data=>
							<>{postsDecider()}</>
						)}
					</div>
				</div>
			</Container>
		</React.Fragment>
	,document.getElementById("personalContainer"))
}



export default BadgePortal;