import React,{memo} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const Container=styled.div`
	position:relative;
	background-color:white;
	width:90%;
	height:100%;
	margin-right:20%;
	border-radius:5px;

	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	padding:10px;
	overflow:hidden;

	@media screen and (min-width:2500px){
		height:50% !important;
	}

	@media screen and (max-width:1370px){
		width:350% !important;
		height:60%;
		#smallRegularPostProfilePicture{
			height:80px !important;
			width:90px !important;
			margin-bottom:2% !important;
		}

		#post{
			font-size:24px !important;
		}
		#postLI{
			font-size:18px !important;
		}
		#commentLI{
			display:none !important;
		}
	}

	@media screen and (max-width:600px){
		width:200% !important;
		#postOwnerInformation{
			display:none !important;
		}
		#postLI{
			height:60% !important;
		}

		#commentLI{
			display:none !important;
		}
	}

	 @media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
	 	width:350% !important;
		height:60% !important;
    }

    @media screen  and (max-width:840px) and (max-height:420px) 
	  and (orientation: landscape) 
	  and (-webkit-min-device-pixel-ratio: 1){
    	width:350% !important;
		height:60% !important;
    }
    @media screen  and (max-width:570px) and (max-height:320px) 
		  and (orientation: landscape) 
		  and (-webkit-min-device-pixel-ratio: 1){
			width:200% !important;
    }
`;

const ProfilePicture=styled.div`
	position:relative;
	border-radius:50%;
	height:50px;
	width:55px;
	margin-top:2%;
	overflow:hidden;
	border-radius:50%;
	border-style:solid;
	border-width:2px;
	border-color:#5298F8;
`;

const SmallProfileCommentPicture=styled.div`
	position:relative;
	width:40px;
	height:15%;
	background-color:red;
	border-radius:50%;
	margin-top:2%;
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
    }
`;

const RegularPostCSS={
	cursor:"pointer",
	width:"30%",
	height:"30%",
	listStyle:"none",
	display:"inline-block",
	marginBottom:"3%"
}

const ProfilePictureCSS={
	position:"relative",
	borderRadius:"50%",
	height:"50px",
	width:"55px",
	marginTop:"2%",
	overflow:"hidden",
	borderRadius:"50%",
	marginBottom:"15%"
}

const CommentButtonCSS={
	textAlign:"center",
	listStyle:"none",
	padding:"5px",
	width:"60%",
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	borderRadius:"5px"	
}

const SmallRegularPosts=({posts,profilePicture,displayPostModal,friendsColorNodesMap})=>{
	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const regularPost=(data)=>{
		const colorCode=friendsColorNodesMap.get(data.levelNode);
		return 	<Container>
					<ColorPatchContainer colorCode={colorCode}/>
					<div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
						<img id="smallRegularPostProfilePicture" 
							src={profilePicture==null?
									NoProfilePicture:profilePicture} 
							style={ProfilePictureCSS}
						/>
						{data.isAudioPost==true?
							<audio key={uuidv4()} style={{width:"150px"}} controls>
										<source src={data.post} type="audio/ogg"/>
										<source src={data.post} type="audio/mp4"/>
										Your browser does not support the audio element.
							</audio>:
							<React.Fragment>
								<p id="post" style={{color:"#A4A4A4"}}>{data.post}</p>
							</React.Fragment>
						}
					</div>
				</Container>
	}
	
	return(
		<li style={{listStyle:"none"}}>
			<ul style={{padding:"0px"}}>
				{posts.map(data=>
					<React.Fragment>
						<li id="smallContainerLI"  onClick={()=>displayPostModal(data)}
						 	style={RegularPostCSS}>
								{regularPost(data)}
						</li>
						<hr id="regularPostHorizontalLine" style={{display:"none",width:"90%"}}/>
					</React.Fragment>
				)}
			</ul>
		</li>
	)
}

export default memo(SmallRegularPosts);