import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";


const ThumbnailBlogComponent=styled(Link)`
	position:relative;
	width:100%;
	height:45%;
	overflow:hidden;
	padding-bottom:10px;
	background-color:red;

	@media screen and (max-width:700px){
		width:70%;
		#headerImageLI{
			display:block !important;
			#headerImage{
				width:250px !important;
			}
		}
		#headerDescriptionLI{
			margin-left:-20% !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		#headerDescriptionLI{
			margin-left:-5% !important;
		}
	 	#headerImageLI{
			#headerImage{
				height:60% !important;
			}
		}
    }
`;
const ThumbnailBlog=styled.div`
	position:relative;
	width:450px;
	height:100%;
	background-color:blue;
	border-radius:5px;
`;

const Description=styled.div`
	position:absolute;
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


const CrownedBlogContainer=(props)=>{

	const constructDate=(date)=>{
		var convertedDate=new Date(parseInt(date));
		var dateToString=convertedDate.toString();
		var current=new Date();

		//work on this a little more
		return dateToString;
	}


	return(
		<ThumbnailBlogComponent to={{pathname:props.isOwnProfile==true?`/createBlog`
										:`/blog/${props.headerBlog._id}`,
											state:{
													...props.headerBlog,
													profileType:props.profileType,
													friendsNodes:props.friendsNodes
											}}}>
			<ul style={{padding:"0px"}}>
				<li style={{listStyle:"none"}}>
					<li style={{listStyle:"none",display:"inline-block"}}>
						{props.headerBlog.audioDescription!=null &&(
							<audio id="headerAudioLI" controls style={{width:"200px"}} >
							  <source src={props.headerBlog.audioDescription} type="audio/ogg"/>
							  <source src={props.headerBlog.audioDescription} type="audio/mp4"/>
							  Your browser does not support the audio element.
							</audio>
						)}
					</li>
					<li style={{width:"20%",listStyle:"none",display:"inline-block"}}>
						<HeaderVideoDesriptionContainer>
							{props.headerBlog.videoDescription!=null &&(
								<video id="headerVideo" style={{borderRadius:"50%"}} autoPlay loop autoBuffer muted playsInline
									width="100%" height="100%" borderRadius="50%" autoplay="true">
									<source src={props.headerBlog.videoDescription} type="video/mp4"/>
								</video>
							)}
						</HeaderVideoDesriptionContainer>
					</li>
				</li>

				<li id="headerImageLI" style={{listStyle:"none",display:"inline-block",marginRight:"1%"}}>
					<img  id="headerImage" src={props.headerBlog.blogImageUrl} style={{width:"450px",height:"40%"}}/>
				</li>

				<li id="headerDescriptionLI" style={{position:"absolute",top:"0%",listStyle:"none",display:"inline-block",width:"300px",overflow:"hidden"}}>
					<ul style={{paddging:"0px"}}>
						<li id="headerSymposiumsLI" style={{marginBottom:"5px",listStyle:"none",padding:"5px",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",color:"#5298F8",backgroundColor:"white",borderRadius:"5px"}}>
							{props.headerBlog.industriesUploaded[0].industry}
						</li>
						<li style={{listStyle:"none",marginRight:"5%",marginBottom:"5px",maxWidth:"80%",maxHeight:"50px",overflow:"hidden"}}>
							<b>{props.headerBlog.title}</b>
						</li>

						<li id="headerConstructedDateLI" style={{listStyle:"none",marginBottom:"5px"}}>
							<ul style={{padding:"0px",color:"#a6a6a7"}}>
								<li style={{listStyle:"none",display:"inline-block"}}>
									{constructDate(props.headerBlog.datePosted)}
								</li>
							</ul>
						</li>

						<li style={{listStyle:"none"}}>
							<Description style={{maxWidth:"60%",maxHeight:"50px",overflow:"hidden"}}>
								{props.headerBlog.description}
							</Description>

						</li>
					</ul>
				</li>
			</ul>
		</ThumbnailBlogComponent>
	)
}


export default CrownedBlogContainer;