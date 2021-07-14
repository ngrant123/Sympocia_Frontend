import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";


const ThumbnailBlogComponent=styled(Link)`
	position:relative;
	width:100%;
	overflow:hidden;
	display:flex;
	flex-direction:row;

	@media screen and (max-width:1370px){
		width:100%;
		#headerImage{
			height:300px !important;
		}
		#imageContainer{
			width:95% !important;
		}
		#headerImageLI{
			display:block !important;
			width:60% !important;
		}
		#headerDescriptionLI{
			margin-left:0% !important;
			display:block !important;
			margin-top:10% !important;
			position:relative !important;
			margin-bottom:5% !important;
		}
	}

	@media screen and (max-width:700px){
		flex-direction:column;
		width:100% !important;
		#imageContainer{
			width:100% !important;
		}
		#headerImage{
			height:200px !important;
		}


		#headerDescriptionLI{
			margin-left:0% !important;
			width:250px !important;
		}
		#headerImageLI{
			width:150% !important;
		}
	}
	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
	 	#headerImage{
			height:400px !important;
		}
    }


	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		flex-direction:column;
		#headerDescriptionLI{
			margin-left:-5% !important;
		}
    }
`;
const ThumbnailBlog=styled.div`
	position:relative;
	width:450px;
	height:100%;
	border-radius:5px;
`;

const Description=styled.div`
	width:85%;
	height:240%;
	overflow:hidden;
	color:#767677;

	@media screen and (max-width:700px){
		display:none;
	}

`;

const HeaderVideoDesriptionContainer=styled.div`
	width:30%;
	height:5%;
	border-radius:50%;
	z-index:30;

	@media screen and (max-width:1370px){
		#headerVideo{
			height:80px !important;
			width:80px !important;
		}
    }

	@media screen and (max-width:840px){
		height:10% !important;
		width:30% !important;
		#headerVideo{
			height:60px !important;
			width:60px !important;
		}
    }
`;


const ColorPatchContainer=styled.div`
	position:absolute;
	width:30px;
	height:25px;
	border-radius:50%;
	top:85%;
	left:90%;
	z-index:8;

	${({colorCode})=>
		colorCode!=null &&
			`background-color:${colorCode};`
	}

	@media screen and (max-width:650px){
		left:85%;
    }
`;

const CrownedBlogContainer=(props)=>{

	const constructDate=(date)=>{
		var convertedDate=new Date(parseInt(date));
		var dateToString=convertedDate.toString();
		var current=new Date();

		//work on this a little more
		return dateToString;
	}

	const blogImage=()=>{
		const colorCode=props.friendsColorNodesMap.get(props.headerBlog.levelNode);
		return(
			<div>
				<img  id="headerImage" src={props.headerBlog.blogImageUrl} 
					style={{borderRadius:"10px",marginBottom:"5%",width:"100%",height:"300px"}}
				/>
				<ColorPatchContainer colorCode={colorCode}/>
			</div>
		)
	}


	return(
		<ThumbnailBlogComponent to={{pathname:props.isOwnProfile==true?`/createBlog`
										:`/blog/${props.headerBlog._id}`,
											state:{
													...props.headerBlog,
													profileType:props.profileType,
													friendsNodes:props.friendsNodes
											}}} style={{textDecoration:"none"}}>
			<div id="imageContainer" style={{display:"flex",flexDirection:"column",width:"50%",marginRight:"2%"}}>
				<div style={{display:"flex",flexDirection:"row",marginBottom:"2%"}}>
					{props.headerBlog.audioDescription!=null &&(
						<audio id="headerAudioLI" controls style={{width:"200px"}} >
						  <source src={props.headerBlog.audioDescription} type="audio/ogg"/>
						  <source src={props.headerBlog.audioDescription} type="audio/mp4"/>
						  Your browser does not support the audio element.
						</audio>
					)}
					{props.headerBlog.videoDescription!=null &&(
						<video id="headerVideo" style={{height:"40px",backgroundColor:"black",borderRadius:"5px",marginLeft:"2%"}}
							autoPlay loop autoBuffer muted playsInline
							width="20%" height="60%" borderRadius="5px" autoplay="true">
							<source src={props.headerBlog.videoDescription} type="video/mp4"/>
						</video>
					)}
				</div>
				{blogImage()}
			</div>

			<div style={{position:"relative",display:"flex",flexDirection:"column",width:"60%"}}>
				<li id="headerSymposiumsLI" style={{marginBottom:"5px",listStyle:"none",padding:"5px",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",color:"#5298F8",backgroundColor:"white",borderRadius:"5px"}}>
					{props.headerBlog.industriesUploaded[0].industry}
				</li>
				<li style={{listStyle:"none",marginRight:"5%",marginBottom:"5px",maxWidth:"80%",maxHeight:"50px",overflow:"hidden"}}>
					<b>{props.headerBlog.title}</b>
				</li>

				<li style={{listStyle:"none"}}>
					<Description style={{maxWidth:"60%",maxHeight:"50px",overflow:"hidden"}}>
						{props.headerBlog.description}
					</Description>

				</li>
			</div>
		</ThumbnailBlogComponent>
	)
}


export default CrownedBlogContainer;