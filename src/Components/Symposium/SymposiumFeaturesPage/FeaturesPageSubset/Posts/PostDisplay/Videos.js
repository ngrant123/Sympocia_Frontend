import React from "react";
import styled from "styled-components";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";

const Container=styled.div`
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;

	#horizontalLine{
		display:none !important;
	}

	@media screen and (max-width:1370px){
		margin-top:5%;
		#videoDiv{
			width:90% !important;
			height:320px !important;
			margin-bottom:10% !important;
		}
		#video{
			height:90% !important;
		}
	}


	@media screen and (max-width:650px){
		#videoDiv{
			height:300px !important;
			margin-bottom:5% !important;
		}	
		#horizontalLine{
			display:block !important;
		}
	}
	@media screen and (max-width:700px) and (max-height:1040px){
		#videoDiv{
			width:90% !important;
			height:200px !important;
		}
	}


`;

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

//height:"200px",
const VideosContainerCSS={
	display:"flex",
	flexDirection:"column",
	marginRight:"8%",
	marginBottom:"5%",
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


const Videos=({posts,triggerDisplaySelectedPost,featurePageType})=>{
	console.log(posts);
	return(
		<Container>
			{posts.map((data,index)=>
				<React.Fragment>
					<div id="videoDiv" style={VideosContainerCSS} onClick={()=>triggerDisplaySelectedPost(data,index)}>
						<div id="video"style={{position:"relative"}}>
							<div style={{position:"absolute",display:"flex",flexDirection:"column",top:"5%",left:"75%"}}>
								{data.acceptedAnswerStatus==true &&(
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
							<img src={data.owner.profilePicture==null?
										NoProfilePicture:
										data.owner.profilePicture
									}
								style={{height:"40px",width:"46px",borderRadius:"50%"}}
							/>
							{featurePageType=="Beacons"?
								<div id="beaconInformation" style={{display:"flex",flexDirection:"column",marginLeft:"5%"}}>
									<p>
										<b>
											<span style={{color:"#43D351",marginRight:"5%"}}>
												{data.beaconRepliesCount}
											</span>
											beacon replies
										</b>
									</p>
									<hr style={HorizontalLineCSS}/>
									{/*
										<p>asked 1 min ago</p>
									*/}
								</div>:
								<p style={{marginLeft:"5%"}}>
									<b>{data.owner.firstName}</b>
								</p>
							}
						</div>
					</div>
					<hr id="horizontalLine" style={HorizontalLineCSS}/>
				</React.Fragment>
			)}
		</Container>
	)
}


export default Videos;