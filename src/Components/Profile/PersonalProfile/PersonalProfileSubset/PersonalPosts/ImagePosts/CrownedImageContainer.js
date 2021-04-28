import React,{memo} from "react";
import styled from "styled-components";


const Container=styled.div`
	position:relative;
	z-index:25;
	width:140%;

	@media screen and (max-width:770px){
		width:180%;
		#postInformationLI{
    		width:30% !important;
    		margin-left:-5%;
    	}
    	#postInformationLI{
    		display:none !important;
    	}
    }

    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	#parentContainer{
			height:60% !important;
		}
    }


    @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape){
	 	
		#parentContainer{
			height:100% !important;
		}
    }
`;

const Image=styled.div`
	position:relative;
	width:30%;
	height:90%;
	background-color:blue;
	border-radius:5px;
	overflow:hidden;

	@media screen and (max-width:1370px){
		width:60% !important;
	}
	@media screen and (max-width:650px){
		width:80% !important;
    }

     @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape){
	 	width:70% !important;
    }
`;


const Description=styled.div`
	position:relative;
	height:150%;
	overflow:hidden;
	color:#767677;
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
		height:20px !important;
    	width:30px;
    	left:80%;
    }
`;


const VideoDesriptionContainer=styled.div`
	position:absolute;
	width:30%;
	height:30%;
	border-radius:50%;
	top:70%;
	left:2%;
	z-index:8;
`;


const IndustryButtonCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	listStyle:"none",
	padding:"5px",
	display:"inline-block",
	borderRadius:"5px",
	marginRight:"2%"
}

const CrownedImageContainer=({crownedImage,displayPostModal,friendsColorNodesMap})=>{
	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	let audioId=uuidv4();
	let videoDescriptionId=uuidv4();

	const image=()=>{
		debugger
		const colorCode=friendsColorNodesMap.get(crownedImage.levelNode);
		return <Image>
					<img src={crownedImage.imgUrl} style={{width:"100%",height:"100%"}}/>
					<VideoDesriptionContainer>
						<video key={videoDescriptionId} autoPlay loop autoBuffer muted playsInline 
							style={{borderRadius:"50%"}} width="100%" height="100%" borderRadius="50%">
							<source src={crownedImage.videoDescription} type="video/mp4"/>
						</video>
					</VideoDesriptionContainer>
					<ColorPatchContainer colorCode={colorCode}/>
				</Image>
	}

	return(
		<li style={{listStyle:"none",marginBottom:"-5%",cursor:"pointer"}}
					 onClick={()=>displayPostModal(
					 				crownedImage
								)}>

			<Container>
				<div id="parentContainer" style={{display:"flex",flexDirection:"row",padding:"0px",height:"45%",overflow:"hidden"}}>
					{image()}

					<div id="postInformationLI" style={{top:"0%",width:"50%"}}>
						<ul style={{paddging:"0px"}}>
							<li style={IndustryButtonCSS}>
								{crownedImage.industriesUploaded[0].industry}
							</li>
							<li style={{listStyle:"none",marginRight:"5%",marginBottom:"5px",maxWidth:"60%",maxHeight:"50px",overflow:"hidden"}}>
								<b>{crownedImage.caption}</b>
							</li>

							{/*
								<li style={{listStyle:"none",marginBottom:"5px"}}>
									2 days ago
								</li>
							*/}

							<li style={{listStyle:"none"}}>
								<Description style={{maxWidth:"60%",maxHeight:"60px",overflow:"hidden"}}>
									{crownedImage.description}
								</Description>
							</li>
							<li style={{listStyle:"none",marginTop:"2%"}}>
								<ul style={{padding:"0px"}}>
									{/*	
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li style={IndustryButtonCSS}>
												Stamp
											</li>
										</a>

										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li style={IndustryButtonCSS}>
												Comment
											</li>
										</a>
									*/}
									{crownedImage.audioDescription!=null?
										<li style={{listStyle:"none"}}>
												<audio key={audioId} style={{width:"200px"}} controls>
												  <source src={crownedImage.audioDescription} type="audio/ogg"/>
												  <source src={crownedImage.audioDescription} type="audio/mp4"/>
												Your browser does not support the audio element.
												</audio>
										</li>:null
									}	
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</Container>
		</li>
	)
}

export default memo(CrownedImageContainer);