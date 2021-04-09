import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";


const SmallBlogComponent=styled.div`
	position:relative;
	width:250px;
	height:50%;

	@media screen and (max-width:1370px){
		width:350px !important;
		margin-bottom:40%;
	}

	@media screen and (max-width:700px){
		width:290px !important;
		#smallAudio{
			width:170px !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	width:300px !important;
    	margin-bottom:50%;
    }
`;

const SmallBlog=styled.div`

	position:relative;
	height:50%;
	width:100%;
	border-radius:5px;
	background-color:red;
	overflow:hidden;

	@media screen and (max-width:840px){
		width:90% !important;
		height:80% !important;
		#smallImage{
			height:100% !important;
		}
    }

    @media screen  and (max-width:840px) and (max-height:420px) 
	  and (orientation: landscape) 
	  and (-webkit-min-device-pixel-ratio: 1){
	  	width:90% !important;
		height:110% !important;
    }
`;


const Container=styled(Link)`

`;

const VideoDesriptionContainer=styled.div`
	position:absolute;
	top:5%;
	width:30%;
	height:30%;
	border-radius:50%;
	z-index:40;


	@media screen and (max-width:600px){
		height:60px !important;
		width:60px !important;
    }
`;


const BlogContainer=(props)=>{

	const constructDate=(date)=>{
		var convertedDate=new Date(parseInt(date));
		var dateToString=convertedDate.toString();
		var current=new Date();

		//work on this a little more
		return dateToString;
	}

	return(
		<Container to={{pathname:props.isOwnProfile==true?`/createBlog`:`/blog/${props.data._id}`,
										state:{
												...props.data,
												profileType:props.profileType,
												friendsNodes:props.friendsNodes
										}}}>
										
			<li id="smallBlogLI" style={{listStyle:"none",display:"inline-block",marginRight:"8%",marginBottom:"7%"}}>
				<SmallBlogComponent>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none"}}>
							{props.data.audioDescription!=null &&(
								<audio id="smallAudio" controls>
								  <source src={props.data.audioDescription} type="audio/ogg"/>
								  <source src={props.data.audioDescription} type="audio/mp4"/>
								  Your browser does not support the audio element.
								</audio>
							)}
						</li>

						<li style={{listStyle:"none"}}>
							<SmallBlog>
								<img id="smallImage" src={props.data.blogImageUrl} width="100%" height="100%"/>
								<VideoDesriptionContainer>
									{props.data.videoDescription!=null &&(
										<video style={{borderRadius:"50%"}} autoPlay loop autoBuffer muted playsInline 
											width="100%" height="100%" borderRadius="50%" autoplay="true" >
											<source src={props.data.videoDescription} type="video/mp4"/>
										</video>
									)}
								</VideoDesriptionContainer>

							</SmallBlog>
						</li>

						<li style={{listStyle:"none",fontSize:"20px",maxWidth:"60%",maxHeight:"50px",overflow:"hidden",marginBottom:"2%"}}>
							<b> {props.data.title} </b>
						</li>
						<li style={{listStyle:"none",fontSize:"15px",maxWidth:"60%",maxHeight:"50px",overflow:"hidden"}}>
							{props.data.description}
						</li>
						{/*
							<li id="datePostedLI" style={{listStyle:"none",color:"#8c8c8c"}}>
								<ul style={{padding:"0px"}}>

									<li style={{listStyle:"none",display:"inline-block"}}>
										{constructDate(props.data.datePosted)}
									</li>
								</ul>
							</li>
						*/}

						<li id="symposiumsLI" style={{listStyle:"none",padding:"5px",width:"50%",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",color:"#5298F8",backgroundColor:"white",borderRadius:"5px"}}>
							{props.data.industriesUploaded[0].industry}
						</li>
					</ul>

				</SmallBlogComponent>
			</li>
		</Container>
	)
}

export default BlogContainer;