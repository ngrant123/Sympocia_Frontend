import React from "react";
import styled from "styled-components";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";

const Container=styled.div`
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;

	@media screen and (max-width:1370px){
		margin-top:5%;
		#videoDiv{
			height:270px !important;
		}
		#video{
			height:90% !important;
		}
	}
`;


const VideosContainerCSS={
	display:"flex",
	flexDirection:"column",
	marginRight:"8%",
	marginBottom:"5%",
	height:"200px",
	width:"310px",
	position:"relative"
}

const DropDownCSS={
	borderRadius:"50%",
	boxShadow:"1px 1px 5px #dbdddf",
	marginLeft:"2%",
	cursor:"pointer",
	backgroundColor:"white",
	marginLeft:"10%"
}


const Videos=({posts})=>{
	return(
		<Container>
			{posts.map(data=>
				<div id="videoDiv" style={VideosContainerCSS}>
					<div id="video"style={{position:"relative"}}>
						<div style={{position:"absolute",display:"flex",flexDirection:"column",top:"5%",left:"75%"}}>
							{data.correctAnswerStatus==true &&(
								<CheckCircleIcon
									style={{color:"#43D351",fontSize:"36"}}
								/>
							)}
							<div style={DropDownCSS}>
								<ExpandMoreIcon
									style={{color:"#2B2B2B",fontSize:"36"}}
								/>
							</div>
						</div>
						<video
							style={{borderRadius:"5px",backgroundColor:"#151515",cursor:"pointer"}}
							 position="relative" height="90%" width="100%" borderRadius="50%"
						 	key={data.videoUrl} autoPlay loop autoBuffer muted playsInline>
							<source src={data.videoUrl} type="video/mp4"/>
						</video>
					</div>
					<div style={{display:"flex",flexDirection:"row",marginTop:"1%"}}>
						<img src={NoProfilePicture}
							style={{height:"40px",width:"46px",borderRadius:"50%"}}
						/>
						<p>
							<b><span style={{color:"#43D351"}}>1000000</span> beacon replies</b>
						</p>
					</div>
				</div>
			)}
		</Container>
	)
}


export default Videos;