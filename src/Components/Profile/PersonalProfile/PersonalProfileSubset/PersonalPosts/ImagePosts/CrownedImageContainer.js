import React,{memo} from "react";
import styled from "styled-components";

import VolumeUpIcon from '@material-ui/icons/VolumeUp';


/*
	  @media screen and (min-width:250px) and (max-width:450px) 
	    and (min-height:800px) and (max-height:1200px){
	    width:87%;
	}

*/

const Container=styled.div`
	position:relative;
	z-index:25;
	width:100%;
	display:flex;
	margin-top:2%;
	margin-bottom:-5%;
	cursor:pointer;
	display:flex;
	flex-direction:row;

	@media screen and (min-width:2500px){
		margin-top:5%;
		margin-bottom:15px;
  	}

  	@media screen and (max-width:550px){
  		#postInformationLI{
  			display:none !important;
  		}
  	}
`;

const Image=styled.div`
	position:relative;
	width:320px;
	height:230px;
	border-radius:5px;
	overflow:hidden;
	margin-bottom:35px;

	@media screen and (min-width:2500px){
		width:500px;
		height:360px;
		margin-bottom:80px;
  	}

	@media screen and (max-width:1370px){
		width:300px !important;
		margin-bottom:60px;
		height:200px;
	}
	@media screen and (max-width:550px){
		height:290px !important;
		width:100% !important;
    }

    @media screen and (max-width:350px){
		width:100% !important;
		height:240px !important;
		margin-bottom:15px
    }


	@media screen and (min-width:490px) and (max-width:700px) 
	    and (min-height:1100px) and (max-height:1370px){
		
		height:355px !important;
	}

	@media screen and (min-width:600px) and (max-width:700px) 
	    and (min-height:700px) and (max-height:850px){
		
		height:200px !important;
	}

	@media screen and (min-width:600px) and (max-width:700px) 
	    and (min-height:700px) and (max-height:1030px){
		
		height:200px !important;
	}

	@media screen and (min-width:500px) and (max-width:570px) 
	    and (min-height:700px) and (max-height:860px){
	   	height:350px !important;
	}

	@media screen and (min-width:350px) and (max-width:560px) 
    	and (min-height:700px) and (max-height:1100px){
		height:200px !important;
	}


    @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape){
		height:180px !important;
		width:195px !important;
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

	@media screen and (max-width:550px){
		height:20px !important;
    	width:30px;
    	left:80%;
    }
`;


const VideoDesriptionContainer=styled.div`
	position:absolute;
	width:20%;
	height:30%;
	border-radius:50%;
	top:60%;
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

const CaptionCSS={
	listStyle:"none",
	marginRight:"5%",
	marginBottom:"15px",
	maxHeight:"50px",
	overflow:"hidden",
	fontSize:"18px",
	marginTop:"5%"
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
		const colorCode=friendsColorNodesMap.get(crownedImage.levelNode);
		return <Image>
					<img src={crownedImage.imgUrl} style={{width:"100%",height:"100%"}}/>
					<VideoDesriptionContainer>
						<VolumeUpIcon style={{color:"white",fontSize:"30"}}/>
						<video key={videoDescriptionId} autoPlay loop autoBuffer muted playsInline 
							style={{borderRadius:"50%"}} width="100%" height="100%" borderRadius="50%">
							<source src={crownedImage.videoDescription} type="video/mp4"/>
						</video>
					</VideoDesriptionContainer>
					<ColorPatchContainer colorCode={colorCode}/>
				</Image>
	}

	return(
		<Container id="parentContainer" style={{marginBottom:"-5%",cursor:"pointer"}} 
				onClick={()=>displayPostModal(
				 				crownedImage
							)}>
			{image()}
			<div id="postInformationLI" style={{top:"0%",width:"80%"}}>
				<ul style={{paddging:"0px"}}>
					<li style={CaptionCSS}>
						<b>{crownedImage.caption}</b>
					</li>

					<li style={{listStyle:"none"}}>
						<Description style={{maxHeight:"60px",overflow:"hidden"}}>
							{crownedImage.description}
						</Description>
					</li>
					<li id="crownedImageAudio" style={{listStyle:"none",marginTop:"2%"}}>
						<ul style={{padding:"0px"}}>
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
		</Container>
	)
}

export default memo(CrownedImageContainer);