import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";


const SmallBlogComponent=styled.div`
	position:relative;
	width:200px;
	height:40%;

	@media screen and (max-width:1370px){
		margin-bottom:40%;
		height:20%;
		margin-right:20px !important;
	}

	@media screen and (max-width:640px){
		width:250px !important;
		height:40%;
		margin-right:0px !important;
		#smallAudio{
			width:170px !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	width:300px !important;
    	margin-bottom:50%;
    }
     @media screen  and (max-width:840px) and (max-height:420px) 
	  and (orientation: landscape) 
	  and (-webkit-min-device-pixel-ratio: 1){
		height:60%;
    }
`;

const SmallBlog=styled.div`

	position:relative;
	height:60%;
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
    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	height:170% !important;
    }

    @media screen  and (max-width:840px) and (max-height:420px) 
	  and (orientation: landscape) 
	  and (-webkit-min-device-pixel-ratio: 1){
	  	width:90% !important;
		height:140% !important;

    }
`;

const ColorPatchContainer=styled.div`
	position:absolute;
	width:30px;
	height:25px;
	border-radius:50%;
	top:80%;
	left:80%;
	z-index:8;

	${({colorCode})=>
		colorCode!=null &&
			`background-color:${colorCode};`
	}

	@media screen and (max-width:650px){
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

	const blogImage=()=>{
		const colorCode=props.friendsColorNodesMap.get(props.data.levelNode);
		return(
			<SmallBlog>
				<img id="smallImage" src={props.data.blogImageUrl}
					style={{borderRadius:"10px"}}
				 	width="100%" height="100%"
				 />
				<VideoDesriptionContainer>
					{props.data.videoDescription!=null &&(
						<video style={{borderRadius:"50%"}} autoPlay loop autoBuffer muted playsInline 
							width="100%" height="100%" borderRadius="50%" autoplay="true" >
							<source src={props.data.videoDescription} type="video/mp4"/>
						</video>
					)}
				</VideoDesriptionContainer>
				<ColorPatchContainer colorCode={colorCode}/>
			</SmallBlog>
		)
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
								<audio id="smallAudio" controls style={{width:"120px",height:"20px"}}>
								  <source src={props.data.audioDescription} type="audio/ogg"/>
								  <source src={props.data.audioDescription} type="audio/mp4"/>
								  Your browser does not support the audio element.
								</audio>
							)}
						</li>

						<li style={{listStyle:"none"}}>
							{blogImage()}
						</li>

						<li style={{listStyle:"none",fontSize:"18px",maxWidth:"60%",maxHeight:"50px",overflow:"hidden",marginBottom:"2%"}}>
							<b> {props.data.title} </b>
						</li>
						<li style={{listStyle:"none",fontSize:"12px",maxWidth:"60%",maxHeight:"50px",overflow:"hidden"}}>
							{props.data.description}
						</li>

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