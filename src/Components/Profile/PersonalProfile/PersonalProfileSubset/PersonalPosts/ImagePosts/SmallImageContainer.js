import React,{useState,useEffect,memo} from "react";
import styled from "styled-components";
import EditIcon from '@material-ui/icons/Edit';

const ImageContainer=styled.div`
	position:relative;
	width:100%;
	height:30%;
	cursor:pointer;

	@media screen and (max-width:420px){
		#imageAudio{
			display:none
		}
		#postInformation{
			display:none;
		}
	}

	@media screen and (max-width:740px){
		#audio{
			width:150px !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px)  and (orientation: landscape){
		height:100% !important;
		width:100%;
	 	#imageAudio{
			display:none
		}
		#postInformation{
			display:none;
		}
    }
`;

const Image=styled.div`
	width:100%;
	height:75%;
	background-color:black;
	border-radius:5px;
	overflow:hidden;
`;

const VideoDesriptionContainer=styled.div`
	position:absolute;
	width:30%;
	height:30%;
	border-radius:50%;
	top:50%;
	left:2%;
	z-index:8;

	@media screen and (max-width:340px){
		height:30% !important;
    	width:20% !important;
    }
`;

const ColorPatchContainer=styled.div`
	position:absolute;
	width:30px;
	height:25px;
	border-radius:50%;
	top:55%;
	left:80%;
	z-index:8;

	${({colorCode})=>
		colorCode!=null &&
			`background-color:${colorCode};`
	}

	@media screen and (max-width:650px){
		height:17% !important;
    	width:20% !important;
    }
`;
const AudioDescriptionContainer=styled.div`
	width:20px;
`;

const ImageCaption=styled.div`
	width:100%;
	height:15%;
	overflow:hidden;
	color:#767677;
	@media screen and (max-width:420px){
		display:none;
    }
`;

const IndustryButtonCSS={
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	listStyle:"none",
	padding:"5px",
	borderRadius:"5px"
}

const SmallImageContainer=({images,displayPostModal,friendsColorNodesMap})=>{
	console.log(images);
	const constructDate=(date)=>{
		var convertedDate=new Date(parseInt(date));
		var dateToString=convertedDate.toString();
		var current=new Date();
		//work on this a little more
		return dateToString;
	}

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}
	//onClick={()=>displayPostModal(data)} 

	const image=(data)=>{
		debugger
		const colorCode=friendsColorNodesMap.get(data.levelNode);
		return <Image>
					<img id="img" src={data.imgUrl} style={{height:"100%",width:"100%"}}/>
					{data.videoDescription!=null &&(
						<VideoDesriptionContainer>
							<video key={videoDescriptionId} autoPlay loop autoBuffer muted playsInline 
								style={{borderRadius:"50%"}} width="50px" height="40px" borderRadius="50%">
								<source src={data.videoDescription} type="video/mp4"/>
							</video>
						</VideoDesriptionContainer>
					)}
					<ColorPatchContainer colorCode={colorCode}/>
				</Image>
	}

	let audioId=uuidv4();
	let videoDescriptionId=uuidv4();
	return(
		<li id="parentLISmallPostContainer" style={{listStyle:"none",marginTop:"3%"}}>
			{images.map(data=>
				<li id="smallPostLI" onClick={()=>displayPostModal(data)}
					style={{listStyle:"none",display:"inline-block",marginRight:"5%",marginBottom:"20%"}}>
							<ImageContainer>
								<ul style={{padding:"0px"}}>
									{data.audioDescription!=null?
										<li style={{listStyle:"none"}}>
											<audio id="audio" key={audioId} style={{width:"200px"}} controls>
											    <source src={data.audioDescription} type="audio/ogg"/>
											    <source src={data.audioDescription} type="audio/mp4"/>
												Your browser does not support the audio element.
											</audio>
										</li>:null
									}	
									{image(data)}

									{data.caption!=""?
										<li style={{listStyle:"none",marginBottom:"5%"}}>
											<ImageCaption>
												{data.caption}
											</ImageCaption>
										</li>:<React.Fragment></React.Fragment>
									}

									<li id="postInformation" style={{listStyle:"none"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",display:"inline-block",marginRight:"24%"}}>
												Comments
											</li>

											<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",color:"#C8B0F4"}}>
												{constructDate(data.datePosted)}
											</li>
											<li style={IndustryButtonCSS}>
												{data.industriesUploaded[0].industry}					
											</li>
										</ul>
									</li>
								</ul>
							</ImageContainer>
				</li>
			)}
		</li>
	)
}

export default memo(SmallImageContainer);