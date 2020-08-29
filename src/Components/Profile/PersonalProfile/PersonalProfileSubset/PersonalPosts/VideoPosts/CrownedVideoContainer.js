import React from "react";
import styled from "styled-components";


const ThumbnailVideoComponent=styled.div`
	position:relative;
	width:100%;
	height:45%;
	overflow:hidden;
`;

const ThumbnailVideo=styled.div`
	position:relative;
	width:450px;
	height:100%;
	border-radius:5px;
`;

const Description=styled.div`
	position:absolute;
	width:85%;
	height:240%;
	overflow:hidden;
	color:#767677;
`;

const CrownedVideoContainer=({headerVideo})=>{
	console.log(headerVideo);
	return(
		<ThumbnailVideoComponent>
			<ul style={{padding:"0px"}}>
				<li style={{listStyle:"none",display:"inline-block",marginRight:"1%"}}>
					<ThumbnailVideo>
						<video key={headerVideo.key} width="100%" height="100%" controls autoplay>
							<source src={headerVideo.videoUrl} type="video/mp4"/>
						</video>
					</ThumbnailVideo>
				</li>

				<li style={{position:"absolute",top:"0%",listStyle:"none",display:"inline-block"}}>
					<ul style={{paddging:"0px"}}>
						<li style={{marginBottom:"5%",listStyle:"none",padding:"5px",width:"50%",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",color:"#5298F8",backgroundColor:"white",borderRadius:"5px"}}>
							{headerVideo.industriesUploaded[0].industry}
						</li>
						<li style={{listStyle:"none",marginRight:"5%",marginBottom:"5px"}}>
							<b>{headerVideo.title}</b>
						</li>

						<li style={{listStyle:"none",marginBottom:"5px"}}>
							<ul style={{padding:"0px",color:"#a6a6a7"}}>
								<li style={{listStyle:"none",display:"inline-block",marginRight:"10%"}}>
									{headerVideo.views} views
								</li>

								<li style={{listStyle:"none",display:"inline-block"}}>
									{headerVideo.datePosted} days ago
								</li>
							</ul>

						</li>

						<li style={{listStyle:"none"}}>
							<Description>
								{headerVideo.description}
							</Description>
						</li>
					</ul>
				</li>
			</ul>
		</ThumbnailVideoComponent>
	)
}

export default CrownedVideoContainer;