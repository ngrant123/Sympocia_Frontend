import React,{Component} from "react";
import styled from "styled-components";
import {UserConsumer} from "../../../UserContext.js";


const SmallVideoComponent=styled.div`
	position:relative;
	width:250px;
	height:50%;
`;


const SmallVideo=styled.div`

	position:relative;
	height:50%;
	width:100%;
	background-color:white;
	border-radius:5px;
`;

const IndustryButtonCSS={
	listStyle:"none",
	padding:"5px",
	width:"50%",
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	borderRadius:"5px"
}

const SmallVideoContainer=(videoData)=>{
	console.log(videoData);
	const displayIndustries=()=>{
		debugger;
		const {industriesUploaded}=videoData.video;
		if(industriesUploaded.length>=1){
			const industry=industriesUploaded[0].industry;
			console.log("Small video industry");
			console.log(industry);
			return <ul style={{padding:"0px"}}>
						<li style={IndustryButtonCSS}>
							{industry}
						</li>
						<li style={{listStyle:"none",display:"inline-block"}}>
							(View more...)
						</li>
					</ul>
		}else{
			return <ul style={{padding:"0px"}}>
						<li style={IndustryButtonCSS}>
							{industriesUploaded.industry}
						</li>
					</ul>
			}
	}


	const constructDate=()=>{
		const date=videoData.video.datePosted;
		var convertedDate=new Date(parseInt(date));
		var dateToString=convertedDate.toString();
		var current=new Date();

		//work on this a little more
		return dateToString;

	}

	return(
		<UserConsumer>
			{personalInformation=>{
				return <SmallVideoComponent>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none"}}>
													<SmallVideo>
														<video width="100%" height="100%" controls autoplay muted>
																<source src={videoData.video.videoUrl} type="video/mp4"/>
														</video>
													</SmallVideo>
												</li>

												<li style={{listStyle:"none",fontSize:"15px"}}>
													<b>{videoData.video.title} </b>
												</li>

												<li style={{listStyle:"none"}}>

													{/*{personalInformation.userProfile.firstName}*/}
												</li>

												<li style={{listStyle:"none"}}>
													<ul style={{padding:"0px"}}>
														<li style={{listStyle:"none",display:"inline-block",marginRight:"10%"}}>
															{videoData.video.views} views
														</li>

														<li style={{listStyle:"none",display:"inline-block"}}>
															{constructDate()}
														</li>
													</ul>
												</li>

												<li style={{listStyle:"none"}}>
													{displayIndustries()}
												</li>
											</ul>

						</SmallVideoComponent>
			}}
		</UserConsumer>

	)
}

export default SmallVideoContainer;