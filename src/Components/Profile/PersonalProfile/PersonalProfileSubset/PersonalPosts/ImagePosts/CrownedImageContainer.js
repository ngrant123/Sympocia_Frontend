import React from "react";
import styled from "styled-components";

const Container=styled.div`
	position:relative;
	z-index:25;
	width:140%;

	@media screen and (max-width:770px){
		width:200%;
		#postInformationLI{
    		width:30% !important;
    		margin-left:-5%;
    	}
    }

    @media screen and (max-width:420px){
    	width:160% !important;
    	#postInformationLI{
    		display:none !important;
    	}
	}

	@media screen and (max-width:340px){
		#crownedImageContainer{
			width:210px !important;
		}
    }

    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	#parentContainer{
			height:60% !important;
		}
    }


    @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape){
	 	#crownedImageContainer{
			width:180px !important;
		}
		#parentContainer{
			height:100% !important;
		}
    }
    @media screen and (max-width:670px) and (max-height:380px){
	 	#crownedImageContainer{
			width:160px !important;
		}
		#postInformationLI{
			display:none !important;
		}
		#parentContainer{
			margin-left:2% !important;
		}
    }
`;

const Image=styled.div`
	position:relative;
	width:100%;
	height:90%;
	background-color:blue;
	border-radius:5px;
	overflow:hidden;

	@media screen and (max-width:770px){
		width:90% !important;
    }
	

	@media screen and (max-width:340px){
		width:90% !important;
    }

     @media screen and (max-width:740px) and (max-height:420px){
	 	width:80% !important;
    }
`;

const Description=styled.div`
	position:relative;
	height:150%;
	overflow:hidden;
	color:#767677;
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

const CrownedImageContainer=(props)=>{
	const {imageData}=props;
	console.log(imageData);

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	let audioId=uuidv4();
	let videoDescriptionId=uuidv4();

	return(
		<Container>
			<ul id="parentContainer" style={{padding:"0px",height:"45%",overflow:"hidden"}}>
				<li style={{listStyle:"none",display:"inline-block",marginRight:"1%"}}>
					<Image>
						<img src={imageData.imgUrl} style={{width:"100%",height:"100%"}}/>
						<VideoDesriptionContainer>
						   <video key={videoDescriptionId} style={{borderRadius:"50%"}}
						   		width="100%" height="100%" borderRadius="50%" autoplay="false" muted>
								<source src={imageData.videoDescription} type="video/mp4"/>
							</video>
						</VideoDesriptionContainer>
					</Image>
				</li>

				<li id="postInformationLI" style={{position:"absolute",top:"0%",listStyle:"none",display:"inline-block",width:"50%"}}>
					<ul style={{paddging:"0px"}}>
						<li style={IndustryButtonCSS}>
							{imageData.industriesUploaded[0].industry}
						</li>
						<li style={{listStyle:"none",marginRight:"5%",marginBottom:"5px",maxWidth:"60%",maxHeight:"50px",overflow:"hidden"}}>
							<b>{imageData.caption}</b>
						</li>

						{/*
							<li style={{listStyle:"none",marginBottom:"5px"}}>
								2 days ago
							</li>
						*/}

						<li style={{listStyle:"none"}}>
							<Description style={{maxWidth:"60%",maxHeight:"60px",overflow:"hidden"}}>
								{imageData.description}
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
								{imageData.audioDescription!=null?
									<li style={{listStyle:"none"}}>
											<audio key={audioId} style={{width:"200px"}} controls>
											  <source src={imageData.audioDescription} type="audio/ogg"/>
											  <source src={imageData.audioDescription} type="audio/mpeg"/>
											Your browser does not support the audio element.
											</audio>
									</li>:null
								}	
							</ul>
						</li>
					</ul>
				</li>
			</ul>
		</Container>
	)
}

export default CrownedImageContainer;