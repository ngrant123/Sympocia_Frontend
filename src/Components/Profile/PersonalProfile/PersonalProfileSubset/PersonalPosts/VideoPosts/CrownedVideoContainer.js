import React,{memo} from "react";
import styled from "styled-components";


const ThumbnailVideoComponent=styled.div`
	position:relative;
	width:100%;
	height:350px;
	overflow:hidden;
	display:flex;
	flex-direction:row;

	@media screen and (min-width:2500px){
		height:450px;
		margin-top:2%;
	}

	@media screen and (max-width:1370px){
		height:300px;
		#videoDescriptionLI{
			display:block !important;
		}
		#videoLI{
			display:block !important;
		}
	}

	@media screen and (max-width:740px){
		height:250px;
		#description{
			display:none !important;
		}
		#postInformation{
			display:none !important;
		}
		#videoDescriptionLI{
			display:none !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
	 	margin-top:5% !important;
    }

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		width:100% !important;
		margin-top:5% !important;
		height:100% !important;
		#description{
			display:none !important;
		}
		margin-left:0% !important;
		#videoDescriptionLI{
			display:none !important;
		}
    }

    @media screen and (max-width:570px) and (max-height:330px) and (orientation: landscape){
		width:100% !important;
		margin-left:0% !important;
    }

`;

const ThumbnailVideo=styled.div`
	position:relative;
	width:60%;
	height:320px;
	border-radius:5px;
	display:flex;
	flex-direction:column;
	margin-right:2%;

	@media screen and (min-width:2500px){
		height:450px;
	}


	@media screen and (max-width:1370px){
		height:300px;
	}

	@media screen and (max-width:550px){
		width:100% !important;
		height:80% !important;
		margin-right:-5% !important;
	}

	@media screen and (min-width:600px) and (max-width:700px) 
	    and (min-height:900px) and (max-height:1050px){
	    height:250px;
	    width:100%;
	} 

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		width:100%;
		height:80%;
		margin-left:0%;
    }

    @media screen and (max-width:570px) and (max-height:330px) and (orientation: landscape){
		margin-top:0px;
		margin-left:0%;
		height:90%;
    }
`;

const Description=styled.div`
	width:85%;
	height:240%;
	overflow:hidden;
	color:#767677;
`;

const VideoDescriptionContainer=styled.div`
	position:relative;
	width:70px;
	height:60px;
	border-radius:50%;

	@media screen and (min-width:2500px){
		width:80px;
		height:70px;
	}

`;

const DescriptionContainer=styled.div`
	display:flex;
	flex-direction:column;
	width:50%;


	@media screen and (max-width:700px){
		display:none !important;

		#videoDescriptionLI{
			display:none !important;
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

	@media screen and (max-width:1370px){
		top:70%;
	}
	@media screen and (max-width:550px){
		left:80%;
    }
`;

const CrownedVideoContainer=({headerVideo,displayPostModal,friendsColorNodesMap})=>{
	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const constructDate=(date)=>{
		var convertedDate=new Date(parseInt(date));
		var dateToString=convertedDate.toString();
		var current=new Date();
		return dateToString;
	}

	const video=()=>{
		const colorCode=friendsColorNodesMap.get(headerVideo.levelNode);
		return 	<ThumbnailVideo>
					<video key={uuidv4()} autoPlay loop autoBuffer muted playsInline width="100%" height="100%"
						style={{borderRadius:"10px",backgroundColor:"#151515"}}>
						<source src={headerVideo.videoUrl} type="video/mp4"/>
					</video>
					<ColorPatchContainer colorCode={colorCode}/>
				</ThumbnailVideo>
	}
	return(
		<li onClick={()=>displayPostModal(headerVideo)} 
				style={{listStyle:"none",cursor:"pointer"}}>
			<ThumbnailVideoComponent>
					{video()}
					<DescriptionContainer id="videoDescriptionLI">
							<div id="postInformation">
								<li style={{marginBottom:"5%",listStyle:"none",padding:"5px",width:"50%",borderColor:"#5298F8",borderStyle:"solid",borderWidth:"1px",color:"#5298F8",backgroundColor:"white",borderRadius:"5px"}}>
									{headerVideo.industriesUploaded[0].industry}
								</li>
								<li style={{listStyle:"none",marginRight:"5%",marginBottom:"5px",maxWidth:"60%",maxHeight:"50px",overflow:"hidden"}}>
									<b>{headerVideo.title}</b>
								</li>
								<li id="description" style={{listStyle:"none"}}>
									<Description style={{maxWidth:"80%",maxHeight:"50px",overflow:"hidden"}}>
										{headerVideo.description}
									</Description>
								</li>
							</div>
							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									{headerVideo.videoDescription==null?null:
										<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
											<VideoDescriptionContainer>
												<video key={uuidv4()} autoPlay loop autoBuffer muted playsInline width="100%" height="100%"
													style={{borderRadius:"10px"}}>
													<source src={headerVideo.videoDescription} type="video/mp4"/>
												</video>
											</VideoDescriptionContainer>
										</li>
									}
									
									{headerVideo.audioDescription==null ?null:
										<li style={{listStyle:"none",display:"inline-block"}}>
											<audio key={uuidv4()} style={{width:"150px"}} controls>
												<source src={headerVideo.audioDescription} type="audio/ogg"/>
												<source src={headerVideo.audioDescription} type="audio/mp4"/>
												Your browser does not support the audio element.
											</audio>
										</li>
									}
								</ul>
							</li>
						</DescriptionContainer>

			</ThumbnailVideoComponent>
		</li>
	)
}

export default memo(CrownedVideoContainer);