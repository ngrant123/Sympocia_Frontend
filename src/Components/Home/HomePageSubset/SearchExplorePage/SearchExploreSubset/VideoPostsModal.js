import React,{useState} from "react";
import styled from "styled-components";

const HeaderVideo=styled.div`
	width:120%;
	height:80%;
	border-radius:5px;
	background-color:red;
	border-radius:5px;
`;

const VideosContainer=styled.div`
	position:relative;
	width:580px;
	height:290px;
	border-radius:5px;
	background-color:red;
`;

const ShadowContainer= styled.div`
	position:absolute;
	width:580px;
	height:290px;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;
	z-index:1;
	transition:.8s;
	border-radius:5px;

	&:hover{
		background-color:transparent
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

const VideoPostModal=(props)=>{
	debugger;
	console.log(props);
	const headerVideo=props.posts[0];
	const videos=props.posts.slice(1,props.posts.length);
	console.log(videos);
	return(
		<React.Fragment>
			<li style={{listStyle:"none",display:"inline-block",width:"50%"}}>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",width:"90%",borderRadius:"5px"}}>
								<video id="smallVideo" key={headerVideo.videoUrl} position="relative" height="80%" width="120%" controls autoplay>
									<source src={headerVideo.videoUrl} type="video/mp4"/>
								</video>
						</li>
						<li style={{listStyle:"none",width:"80%"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",display:"inline-block",fontSize:"15px",marginRight:"2%",width:"130%"}}>
									<b> 
										{headerVideo.title}
									</b>
								</li>
								<li style={{listStyle:"none"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",marginRight:"10%"}}>
											Nathan
										</li>
										<li style={ImageLabelCSS}>
											{headerVideo.industriesUploaded[0].industry}
										</li>

										<li style={ImageLabelCSS}>
											Follow
										</li>
									</ul>
								</li>
							</ul>
						</li>
						<li style={{listStyle:"none",width:"90%",height:"10%",overflow:"hidden",color:"#A4A4A4"}}>
									{headerVideo.description}
						</li>
					</ul>
				</li>

				<li style={{width:"55%",position:"absolute",listStyle:"none",display:"inline-block",marginLeft:"10%",height:"80%",overflowY:"auto",marginBottom:"5%"}}>
					<ul style={{padding:"0px"}}>
						{videos.map(data=>
							<li style={{listStyle:"none",display:"inline-block",position:"relative",marginBottom:"8%",width:"45%",marginRight:"10%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",marginBottom:"1%"}}>
										<ShadowContainer/>
										<video id="smallVideo" position="relative" height="290px" width="580px" controls autoplay>
											<source src={data.videoUrl} type="video/mp4"/>
										</video>
									</li>
									<li style={{listStyle:"none",marginBottom:"1%"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",width:"150%"}}>
												<b> 
													{data.title}
												</b>
											</li>
											<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
												<b>Nathan</b>
											</li>

											<li style={ImageLabelCSS}>
												{data.industriesUploaded[0].industry}
											</li>
										</ul>
									</li>
								</ul>
							</li>
						)}
					</ul>
				</li>
		</React.Fragment>
	)
}

export default VideoPostModal;