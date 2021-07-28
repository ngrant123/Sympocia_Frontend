import React,{useState,useEffect,memo,useContext} from "react";
import styled from "styled-components";
import EditIcon from '@material-ui/icons/Edit';
import Typed from "react-typed";

const Container=styled.div`
	display:flex;

	@media screen and (min-width:2500px){
		#smallImageDiv{
			height:270px !important;
		}
  	}

	@media screen and (max-width:1370px){
		#videoAndAudioDescriptionLI{
		}
	}

	@media screen and (max-width:650px){
		width:100% !important;
		margin-left:5% !important;
		justify-content:center !important;
		#videoAndAudioDescriptionLI{
			display:none !important;
		}
	}
	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		#videoAndAudioDescriptionLI{
			display:none !important;
		}
    }

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape){
	 	justify-content:start !important;
	 	margin-left:0% !important;
    }
`;

const ImageContainer=styled.div`
	position:relative;
	width:100%;
	height:100%;
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
		height:270px !important;
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
	height:20%;
	background-color:black;
	border-radius:5px;
	overflow:hidden;

	@media screen and (max-width:650px){
		height:140px;
	}
`;

const VideoDesriptionContainer=styled.div`
	position:absolute;
	background-color:red;
	width:50px;
	border-radius:50%;
	display:flex;
	flex-direction:column;
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
	z-index:15;
	margin-top:-28px;

	${({colorCode})=>
		colorCode!=null &&
			`background-color:${colorCode};`
	}

	@media screen and (max-width:650px){
		height:17px !important;
    	width:20px !important;
    	margin-left:2%;
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
	borderRadius:"5px",
	marginTop:"2%"
}

const ImageLabelCSS={
	listStyle:"none",
	  display:"inline-block",
	  backgroundColor:"white",
	  borderRadius:"5px",
	  padding:"10px",
	  color:"#3898ec",
	  borderStyle:"solid",
	  borderWidth:"2px",
	  borderColor:"#3898ec",
	  maxWidth:"30%",
	  maxHeight:"50px",
	  overflow:"hidden",
	  cursor:"pointer"
}

const VideoAndAudioDescriptionCSS={
	position:"absolute",
	padding:"0px",
	marginTop:"-165px",
	display:"flex",
	flexDirection:"column-reverse"
}

const SmallImageContainer=({images,displayPostModal,friendsColorNodesMap,PostContextValues})=>{
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
		debugger;
		console.log(data);
		console.log(data.audioDescription);
		console.log(data.videoDescription);

		const colorCode=friendsColorNodesMap.get(data.levelNode);
		return 	<div>
					<img id="img" src={data.imgUrl} 
						style={{cursor:"pointer",borderRadius:"5px",height:"100%",width:"100%"}}
					/>
					<ul id="videoAndAudioDescriptionLI" style={VideoAndAudioDescriptionCSS}>
						{data.videoDescription!=null &&(
							<video key={uuidv4()} autoPlay loop autoBuffer muted playsInline 
								width="90px" height="40px" borderRadius="5px">
								<source src={data.videoDescription} type="video/mp4"/>
							</video>
						)}
						
						{data.audioDescription!=null &&(
							<audio id="audioLI" key={uuidv4()} 
								style={{width:"200px",height:"40px",marginBottom:"2%"}} controls>
								<source src={data.audioDescription} type="audio/ogg"/>
								<source src={data.audioDescription} type="audio/mp4"/>
								Your browser does not support the audio element.
							</audio>
						)}
					</ul>
					<ColorPatchContainer colorCode={colorCode}/>
				</div>
	}

	let audioId=uuidv4();
	let videoDescriptionId=uuidv4();
	return(
		<Container style={{marginTop:"5%",width:"90%",display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
			{images.map(data=>
				<div id="smallPostLI" style={{marginBottom:"5%"}} onClick={()=>displayPostModal(data)}>
					<div id="smallImageDiv" style={{height:"170px",marginBottom:"5%"}}>
						{image(data)}
					</div>
					<div id="postInformation">
						{data.caption!=""?
							<li style={{listStyle:"none",marginBottom:"5%"}}>
								<ImageCaption>
									{data.caption}
								</ImageCaption>
							</li>:<React.Fragment></React.Fragment>
						}
					</div>
				</div>
			)}
			{ PostContextValues.endOfPostsDBIndicator==false
			 && PostContextValues.isSearchFilterActivated==false 
			 && PostContextValues.isFilteredPostsActivated==false  && (
				<React.Fragment>
					{PostContextValues.isLoadingReloadedPosts==true?
						 <Typed 
		                    strings={['Loading...']} 
		                    typeSpeed={60} 
		                    backSpeed={30} 
                		  />:
						<p onClick={()=>PostContextValues.fetchNextPosts()} style={ImageLabelCSS}>
							Next
						</p>
					}
				</React.Fragment>
			)}
		</Container>
	)
}

export default memo(SmallImageContainer);



