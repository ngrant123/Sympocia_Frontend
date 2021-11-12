import React,{useEffect,useState} from "react";
import styled from "styled-components";
import testImage from "../../../../designs/background/AiyanahFullInterview.png";
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {getAdStatistics} from "../../../../Actions/Requests/AdAxiosRequests/AdGetRequests.js";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import {Link} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import DeleteAd from "../../AdSet/Modals-Portals/Deletion.js";
import PauseAd from "../../AdSet/Modals-Portals/AlterAdStatusAd.js";
import PortalHOC from "../../AdSet/Modals-Portals/index.js";

const Container=styled.div`
	display:flex;
	flex-direction:column;
	padding-bottom:10%;
	width:100%;
`;

const PeopleContainer =styled(Link)`
	position:relative;
	width:100px;
	background-color:white;
	border-radius:5px;
	box-shadow: 1px 5px 5px 1px #d5d5d5;
	height:40%;
	cursor:pointer;
	margin-right:5%;
	margin-bottom:5%;
	display:flex;
	flex-direction:column;
	align-items:center;

	@media screen and (max-width:1370px){
		height:30%;
	}

	@media screen and (max-width:650px){
		height:40%;
		#profilePicture{
			width:50px !important;
			height:55px !important;
		}
	}

	@media screen and (min-width:400px) and (max-width:720px) and (min-height:1100px) and (max-height:1370px){
		height:20%;
		#profilePicture{
			width:60px !important;
			height:55px !important;
		}
	}


	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		height:75%;
		#profilePicture{
			width:50px !important;
			height:50px !important;
		}
	}
`;


const StatisDisplayButtonCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	color:"#3898ec",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	marginRight:"2%"
}

const BackButtonCSS={
	...StatisDisplayButtonCSS,
	width:"10%",
	marginBottom:"2%",
	cursor:"pointer"
}

const VerticalLineCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"30px",
 	marginRight:"5%",
 	marginLeft:"5%"
}

const ClearFeedPostOptions={
	borderColor:"#D0D0D0",
	borderStyle:"solid",
	borderWidth:"1px",
	borderRadius:"5px",
	padding:"10px",
	display:"flex",
	flexDirection:"row",
	justifyContent:"center",
	alignItems:"center",
	cursor:"pointer",
	backgroundColor:"white",
	color:"#000000",
	marginBottom:"2%",
	marginLeft:"15%"
}


const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0"
}


const ProfilePictureCSS={
	position:"relative",
	width:"60px",
	height:"60px",
	backgroundColor:"red",
	borderRadius:"50%",
	marginBottom:"10px",
	textAlign:"center"
}


const ShadowButtonCSS={
	display:"inline-block",
	listStyle:"none",
	padding:"10px",
	backgroundColor:"white",
	color:"#6e6e6e",
	boxShadow:"1px 1px 5px #6e6e6e",
	marginRight:"5px",
	borderRadius:"50%",
	borderStyle:"none",
	marginRight:"10%",
	marginBottom:"2%",
	cursor:"pointer"
}

const AdAnalysis=({postData,postDisplayType,closeAnalysis,userId})=>{
	console.log(postData);
	console.log(postDisplayType);

	const [adStatistics,changeAdStatistics]=useState();
	const [loading,changeLoading]=useState(true);
	const [displayDeleteAdPortal,changeDisplayDeleteAdPortal]=useState(false);
	const [displayPauseAdPortal,changeDisplayPauseAdPortal]=useState(false);

	useEffect(()=>{
		const fetchData=async()=>{
			const {confirmation,data}=await getAdStatistics(postData._id,userId);
			if(confirmation=="Success"){
				const {message}=data;
				changeAdStatistics(message);
			}else{
				alert("Unfortunately there has been an error when retrieving this ads statistics. Please try again");
			}
			changeLoading(false);
		}
		fetchData();
	},[]);

	const uuid=()=>{
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	const statistics=()=>{
		return(
			<div style={{display:"flex",flexDirection:"row"}}>
				<div style={{display:"flex",flexDirection:"column"}}>
					<div style={StatisDisplayButtonCSS}>
						Interactions
					</div>

					<p style={{fontSize:"36px"}}>
						<b>{adStatistics.profilesInteracted.length}</b>
					</p>
				</div>
				<div style={VerticalLineCSS}/>
				<div style={{display:"flex",flexDirection:"column"}}>
					<div style={StatisDisplayButtonCSS}>
						Clicks
					</div>

					<p style={{fontSize:"36px"}}>
						<b>{adStatistics.profilesClicked}</b>
					</p>
				</div>
			</div>
		)
	}

	const image=()=>{
		return(
			<React.Fragment>
				<img src={postData.imgUrl} style={{width:"400px",height:"350px",borderRadius:"5px"}}/>
				<div style={{display:"flex",flexDirection:"column",marginLeft:"5%",justifyContent:"space-between"}}>
					<div style={{display:"flex",flexDirection:"column"}}>
						<p style={{fontSize:"24px",marginBottom:"5%"}}>
							<b>{postData.caption}</b>
						</p>

						<p style={{fontSize:"18px"}}>{postData.description}</p>
					</div>
					{statistics()}
				</div>
			</React.Fragment>
		)
	}

	const blog=()=>{
		return(
			<React.Fragment>
				<img src={postData.blogImageUrl} style={{width:"400px",height:"350px",borderRadius:"5px"}}/>
				<div style={{display:"flex",flexDirection:"column",marginLeft:"5%",justifyContent:"space-between"}}>
					<div style={{display:"flex",flexDirection:"column"}}>
						<p style={{fontSize:"24px",marginBottom:"5%"}}>
							<b>{postData.title}</b>
						</p>

						<p style={{fontSize:"18px"}}>{postData.description}</p>
					</div>
					{statistics()}
				</div>
			</React.Fragment>
		)
	}

	const text=()=>{
		return(
			<div style={{display:"flex",flexDirection:"column"}}>
				{postData.isAudioPost==true?
					<audio key={uuid()} style={{width:"250px"}} controls>
								<source src={postData.post} type="audio/ogg"/>
								<source src={postData.post} type="audio/mp4"/>
								Your browser does not support the audio element.
					</audio>:
					<React.Fragment>
						<p id="post" style={{color:"#A4A4A4",width:"60%"}}>{postData.post}</p>
					</React.Fragment>
				}
				{statistics()}
			</div>
		)
	}

	const video=()=>{
		return(
			<React.Fragment>
				<video key={uuid()} autoPlay loop autoBuffer muted playsInline 
					width="40%" height="20%" style={{borderRadius:"5px",backgroundColor:"#151515"}}>
					<source src={postData.videoUrl} type="video/mp4"/>
				</video>

				<div style={{display:"flex",flexDirection:"column",marginLeft:"5%",justifyContent:"space-between"}}>
					<div style={{display:"flex",flexDirection:"column"}}>
						<p style={{fontSize:"24px",marginBottom:"5%"}}>
							<b>{postData.title}</b>
						</p>

						<p style={{fontSize:"18px"}}>{postData.description}</p>
					</div>
					{statistics()}
				</div>
			</React.Fragment>
		)
	}

	const post=()=>{
		switch(postDisplayType){
			case "Images":{
				return <>{image()}</>
			}

			case "Videos":{
				return <>{video()}</>
			}

			case "Blogs":{
				return <>{blog()}</>
			}

			case "Text":{
				return <>{text()}</>
			}
		}
	}

	const closeAdDeletionModal=()=>{
		changeDisplayDeleteAdPortal(false);
	}

	const deletePortal=()=>{
		return(
			<React.Fragment>
				{displayDeleteAdPortal==true &&(
					<PortalHOC
						component=<DeleteAd
										userId={userId}
										postId={postData._id}
										closeModal={closeAdDeletionModal}
										postType={postDisplayType}
									/>
						closeModal={closeAdDeletionModal}
					/>
				)}
			</React.Fragment>
		)
	}

	const closeAdPauseOrResumeModal=()=>{
		changeDisplayPauseAdPortal(false);
	}

	const pausePortal=()=>{
		return(
			<React.Fragment>
				{displayPauseAdPortal==true &&(
					<PortalHOC
						component=<PauseAd
										userId={userId}
										postId={postData._id}
										closeModal={closeAdPauseOrResumeModal}
										postType={postDisplayType}
										isAdPaused={!postData.isAdEnabled}
									/>
						closeModal={closeAdPauseOrResumeModal}
					/>
				)}
			</React.Fragment>
		)
	}
	return(
		<React.Fragment>

			{deletePortal()}
			{pausePortal()}

			<Container>
				<div style={BackButtonCSS} onClick={()=>closeAnalysis()}>
					Back
				</div>
				{loading==true?
					<p>Loading...</p>:
					<React.Fragment>
						<div style={{display:"flex",flexDirection:"row"}}>
							<div style={ShadowButtonCSS} onClick={()=>changeDisplayDeleteAdPortal(true)}>
								<DeleteIcon
									style={{fontSize:"24"}}
								/>
							</div>
							<div style={VerticalLineCSS}/>
							<div style={ShadowButtonCSS} onClick={()=>changeDisplayPauseAdPortal(true)}>
								{postData.isAdEnabled==false?
									<PlayArrowIcon
										style={{fontSize:"24"}}
									/>:
									<PauseIcon
										style={{fontSize:"24"}}
									/>
								}
							</div>

						</div>
						<div style={{display:"flex",flexDirection:"row"}}>
							{post()}
						</div>
						<hr style={HorizontalLineCSS}/>
						<div style={{display:"flex",flexDirection:"column"}}>
							<div style={{display:"flex",flexDirection:"row"}}>
								<div style={{display:"flex",flexDirection:"column"}}>
									<p style={{fontSize:"18px"}}>
										<b>Here are the people that have interacted with your ad</b>
									</p>
									<p>Interaction consists of comments,stamps,video comments etc</p>
								</div>
								{/*
									<div class="btn-group">
										<button class="btn btn-primary dropdown-toggle" type="button" 
											data-toggle="dropdown" style={ClearFeedPostOptions}>
											Sort By
											<ArrowDropDownCircleOutlinedIcon
												style={{fontSize:"15",color:"7C7C7C",marginLeft:"10px"}}
											/>
										</button>
										<ul class="dropdown-menu" style={{padding:"10px"}}>
											<li style={{cursor:"pointer"}}>
												Current Ads 
											</li>
											<hr/>	
											<li style={{cursor:"pointer"}}>
												Create
											</li>	
										</ul>
									</div>	
								*/}
							</div>

							<div style={{display:"flex",flexDirection:"row",flexWrap:"wrap",marginTop:"2%"}}>
								{adStatistics.profilesInteracted.map(data=>
									<PeopleContainer to={{pathname:`/profile/${data.id}`}}>
										<img id="profilePicture" src={data.profilePicture==null?
												NoProfilePicture:data.profilePicture}
										style={ProfilePictureCSS}/>
										<hr style={HorizontalLineCSS}/>
										<p style={{overflow:"hidden",color:"black"}}>
											<b>{data.firstName}</b>
										</p>
									</PeopleContainer>
								)}
							</div>
						</div>
					</React.Fragment>
				}
			</Container>
		</React.Fragment>
	)
}

export default AdAnalysis;