import React,{useState,useEffect} from "react";
import styled from "styled-components";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import COMPANY_INDUSTRIES from "../../../../../Constants/industryConstants.js";

const Container=styled.div`
	position:absolute;
	width:90%;
	height:100%;
	left:15%;
	border-radius:5px;
	box-shadow: 10px 10px 10px 1px #d5d5d5;

	@media screen and (max-width:1370px) and (max-height:900px) and (orientation: landscape) {
		#symposiumInformationLI{
			top:-50% !important;
		}

		#activePeopleTitleTextLI{

		}

		#popularVideoTitleTextLI{
			top:40% !important;
		}
    }

    @media screen and (max-width:900px) and (max-height:420px) and (orientation: landscape) {
    	margin-bottom:15% !important;
    }
`;

const MobileContainer=styled.div`
	position:absolute;
	width:90%;
	height:100%;
	left:10%;
	border-radius:5px;

	@media screen and (max-width:1370px){
		#mobileProfilePicture{
			width:70px !important;
		}
	}

	@media screen and (max-width:650px) {
		#mobileProfilePicture{
			width:40px !important;
		}
		#popularVideosLI{
			margin-left:10% !important;
		}
		#activePeopleLI{
			margin-left:10% !important;
		}
		#symposiumNameLI{
			margin-left:20% !important;
		}
	}
`;

const SymposiumStyleDivider=styled.div`
	position:relative;
	width:40%;
	height:7%;
	background-color:red;
	top:12%;
	z-index:1;
`;


const ActivePeopleContainer=styled.div`
	position:relative;
	width:40%;
	height:50%;
	border-radius:5px;
	background-color:white;
	overflow:hidden;
	padding-top:10px;

	@media screen and (max-width:960px) {
		width:100%;
		height:25%;
	}
`;


const PopularVideosContainer=styled.div`
	position:relative;
	width:40%;
	height:25%;
	border-radius:5px;
	background-color:white;
	overflow:hidden;
	padding-top:5px;

	@media screen and (max-width:960px) {
		width:100%;
		height:30%;
	}
`;


const ActivePeople=styled.div`
	position:"relative";
	width:45px;
	height:40%;
	background-color:white;
	border-radius:50%;
	border-style:solid;
	border-width:2px;
	border-color:#5298F8;
`;


const CommunityDetailsListCSS={
	listStyle:"none",
	marginBottom:"20px"
}

const ActivePeopleListCSS={
	listStyle:"none",
	display:"inline-block",
	marginRight:"20px",
	marginBottom:"10px"
}

const PopularVideosListCSS={
	listStyle:"none",
	display:"inline-block",
	marginRight:"20px",
	marginBottom:"10px"
}

const ProfilePictureCSS={
	position:"relative",
	width:"45px",
	height:"40%",
	backgroundColor:"white",
	borderRadius:"50%",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#5298F8"
}

const CommunityContainer=(props)=>{
	const  {
		activePeople,
		popularPosts,
		symposium,
	}=props.data;
	const {isMobileView}=props;
	const [backgroundColor,changeBackGroundColor]=useState();
	
	useEffect(()=>{
		var symposiums=PERSONAL_INDUSTRIES.INDUSTRIES;
		for(var i=0;i<symposiums.length;i++){
			const currentSymposium=symposiums[i].industry;
			if(currentSymposium==symposium){
				changeBackGroundColor(symposiums[i].backgroundColor);
				break;
			}
		}
	});

	const triggerDisplaySymposium=()=>{
		var symposium={
			...props.data,
			backgroundColor:backgroundColor
		}
		props.handleSymposiumClickHandler(symposium);
	}

	return(

		<React.Fragment>
			<a href="javascript:void(0);" style={{textDecoration:"none"}}>
				{isMobileView==true?
					<MobileContainer onClick={()=>triggerDisplaySymposium()}>
						<SymposiumStyleDivider 
							style={{background:backgroundColor}}
						/>
						<p id="symposiumNameLI"style={{marginBottom:"10%",position:"relative",fontSize:"40px",color:"black",fontFamily:"'Fredoka One', cursive",zIndex:5}}>
							{props.data.symposium}
						</p>
						<li id="popularVideosLI" style={{
							...CommunityDetailsListCSS,
							width:"150%",
							marginLeft:"-10%"
						}}>
							
							<p style={{marginLeft:"10%",color:"black",position:"relative"}}>
								<b>Popular Videos</b>
							</p>
							<PopularVideosContainer style={{background:backgroundColor}}>
								<ul  style={{marginLeft:"7%",width:"80%"}}>
									{popularPosts.map(data=>
										<li style={PopularVideosListCSS}>
											<video id="smallVideo" key={data.videoUrl} borderRadius="5px" position="relative" height="95%" width="60px">
												<source src={data.videoUrl} type="video/mp4"/>
											</video>
										</li>
									)}
								</ul>
							</PopularVideosContainer>
						</li>
						<li id="activePeopleLI" style={{
							...CommunityDetailsListCSS,
							width:"150%",
							marginLeft:"-10%"
						}}>
							<p style={{marginLeft:"10%",color:"black",position:"relative"}}>
								<b>Active People</b>
							</p>
							<ActivePeopleContainer style={{background:backgroundColor}}>
								<ul style={{marginLeft:"7%",width:"80%"}}>
									{activePeople.length!=0?
										<React.Fragment>
											{activePeople.map(data=>
												<li style={ActivePeopleListCSS}>
													<img id="mobileProfilePicture" src={data.profilePicture==null?
																					NoProfilePicture:data.profilePicture} 
													style={ProfilePictureCSS}/>
												</li>
											)}
										</React.Fragment>:<p> No active users right now :( </p>
									}
								</ul>
							</ActivePeopleContainer>
						</li>
					</MobileContainer>
					:
					<Container onClick={()=>triggerDisplaySymposium()} style={{background:backgroundColor}}>
						<p style={{position:"absolute",left:"-10%",top:"10%",fontSize:"90px",color:"#5298F8",fontFamily:"'Fredoka One', cursive"}}>
							{props.data.symposium}
						</p>

						<p id="activePeopleTitleTextLI" style={{color:"white",position:"relative",background:"rgba(0, 0, 0, 0.1)",left:"35%",width:"15%",top:"20%",padding:"10px",borderRadius:"5px"}}>
							Active People
						</p>

						<p id="popularVideoTitleTextLI" style={{color:"white",position:"relative",background:"rgba(0, 0, 0, 0.1)",left:"35%",width:"15%",top:"50%",padding:"10px",borderRadius:"5px"}}>
							Popular Videos
						</p>
						<ul id="symposiumInformationLI" style={{position:"relative",top:"-30%",left:"50%"}}>
							<li style={CommunityDetailsListCSS}>
								<ActivePeopleContainer>
									<ul>
										{activePeople.length!=0?
											<React.Fragment>
												{activePeople.map(data=>
													<li style={ActivePeopleListCSS}>
														{data.profilePicture!=null?
															<img src={data.profilePicture} style={ProfilePictureCSS}/>:
															<img src={NoProfilePicture} style={ProfilePictureCSS}/>
														}
													</li>
												)}
											</React.Fragment>:<p> No active users right now :( </p>
										}
									</ul>
								</ActivePeopleContainer>
							</li>
							<li style={CommunityDetailsListCSS}>
								<PopularVideosContainer>
									<ul>
										{popularPosts.map(data=>
											<li style={PopularVideosListCSS}>
												<video id="smallVideo" key={data.videoUrl} borderRadius="5px" position="relative" height="95%" width="60px">
													<source src={data.videoUrl} type="video/mp4"/>
												</video>
											</li>
										)}
									</ul>

								</PopularVideosContainer>
							</li>
						</ul>
					</Container>
				}
			</a>

		</React.Fragment>
	)
}

export default CommunityContainer;