import React,{useEffect} from "react";
import styled from "styled-components";
import EditIcon from '@material-ui/icons/Edit';


const ImageContainer=styled.div`
	position:relative;
	width:190px;
	height:30%;
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
	top:70%;
	left:2%;
	z-index:8;
`;

const AudioDescriptionContainer=styled.div`
	width:20px;
`;

const ImageCaption=styled.div`
	width:100%;
	height:15%;
	overflow:hidden;
	color:#767677;
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


const SmallImageContainer=(props)=>{
	const {data}=props;
	console.log(props);
	let videoDescriptionId=1;
	useEffect(()=>{
		videoDescriptionId=uuidv4;
	})
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

	return(
		<ImageContainer>
			<ul style={{padding:"0px"}}>
				{data.audioDescription!=null?
					<li style={{listStyle:"none"}}>
							<audio style={{width:"200px"}} controls>
							  <source src={data.audioDescription} type="audio/ogg"/>
							  <source src={data.audioDescription} type="audio/mpeg"/>
							Your browser does not support the audio element.
							</audio>
					</li>:null
				}	
				
				<li style={{listStyle:"none"}}>
					<Image>
						<EditIcon
							style={{position:"absolute",fontSize:35,color:"white"}}
						/>
						<img src={data.imgUrl} style={{height:"100%",width:"100%"}}/>
						<VideoDesriptionContainer>
							   <video key={videoDescriptionId} style={{borderRadius:"50%"}} width="100%" height="100%" borderRadius="50%" autoplay="false">
									<source src={data.videoDescription} type="video/mp4"/>
								</video>
						</VideoDesriptionContainer>
					</Image>
				</li>

				{data.caption!=""?
					<li style={{listStyle:"none",marginBottom:"5%"}}>
					
						<ImageCaption>
							{data.caption}
						</ImageCaption>
					</li>:<React.Fragment></React.Fragment>
				}

				<li style={{listStyle:"none"}}>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",display:"inline-block",marginRight:"2%"}}>
							Likes 
						</li>

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
	)
}

export default SmallImageContainer;