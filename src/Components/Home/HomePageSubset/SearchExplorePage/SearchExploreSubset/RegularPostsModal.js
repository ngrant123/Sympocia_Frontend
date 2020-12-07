import React,{useState} from "react";
import styled from "styled-components";
import PersonalIndustry from "../../../../../Constants/personalIndustryConstants.js";
import CompanyIndustry from "../../../../../Constants/industryConstants.js";
import {useSelector} from "react-redux";
import {
		displayPersonalIndustryFeed,
		DisplayRecruitButton
	} from "./ImagePostsModal.js";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import COMPANY_INDUSTRIES from "../../../../../Constants/industryConstants.js";
import RegularPostDisplayPortal from "../../../HomePageSet/RegularPostHomeDisplayPortal.js";
import {Link} from "react-router-dom";


const Container=styled.div`
	position:absolute;
	width:95%;
	height:97%;
	margin-top:1%;


	@media screen and (max-width:740px) and (max-height:420px){
    	#headerLI{
			height:180% !important;
		}
		#headerPostLI{
			height:95% !important;
		}
    }


	@media screen and (max-width:1300px){
		width:120%;
		margin-left:-5% !important;
		#headerLI{
			display:block !important;
			margin-top:10% !important;
			width:95% !important;
			margin-left:-10% !important;
		}
		#smallPostLI{
			width:95% !important;
		}
		#post{
			width:120px !important;
			height:120px !important;
			margin-right:2%;
		}
		#suggestedSymposiumLI{
			top:-15% !important;
		}
		#postLI{
			margin-right:2% !important;
		}
	}
	@media screen and (max-width:450px){
		margin-left:-5% !important;
		#headerLI{
			margin-top:-50% !important;
			margin-bottom:20% !important;
		}
	}
`;



const ProfileHeaderImage=styled.div`
	position:relative;
	width:20%;
	height:20%;
	border-radius:5px;
	background-color:red;
	border-radius:50%;
`;

const ImagesContainer=styled.div`
	position:relative;
	width:320px;
	height:230px;
	border-radius:5px;
	background-color:red;
`;

const ProfilePicture=styled.div`
	position:relative;
	width:50px;
	height:50px;
	background-color:red;
	border-radius:50%;
`;


const ProfilePictureLink=styled(Link)`
	position:relative;
`;


const RegularPostLabelCSS={
	listStyle:"none",
	display:"inline-block",
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	color:"#5298F8",
	backgroundColor:"white",
	padding:"5px",
	borderRadius:"5px",
	marginRight:"2%"
}

const BorderCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#D8D8D8",
	padding:"10px"
}
const RegularPostModal=(props)=>{
	
	console.log(props);
	const headerRegularPost=props.posts[0];
	const regularPosts=props.posts.slice(1,props.posts.length);
	const personalInformationRedux=useSelector(state=>state.personalInformation);

	const [displayRegualrPostDisplayPortal,changeRegularPostDisplay]=useState(false);
	const [selectedRegularPost,changeSelectedRegularPost]=useState();
	const [displayRecommendedPosts,changeRecommendedPosts]=useState();

	const closeModal=()=>{
		changeRegularPostDisplay(false)
	}

	const handleDisplayHeaderPost=()=>{
		changeSelectedRegularPost(headerRegularPost);
		changeRecommendedPosts(regularPosts);
		changeRegularPostDisplay(true);
	}

	const displayPostModal=(data)=>{
		changeSelectedRegularPost(data);
		changeRecommendedPosts(regularPosts);
		changeRegularPostDisplay(true);
	}

	const constructSuggestedSymposium=(personalInformation,previousProps)=>{
		
		console.log(personalInformation);
		const {personalInformationState}=personalInformation;
		var symposiumContainer=new Map();
		var selectedSymposiums=[];
			var counter=0;
			while(counter<3){   
				if(previousProps.isPersonalProfile==true){
					const randomNum=Math.floor(Math.random() * ((PERSONAL_INDUSTRIES.INDUSTRIES.length-1) - 0 + 1)) + 0;
					const randomlySelected=PERSONAL_INDUSTRIES.INDUSTRIES[randomNum];
					if(!symposiumContainer.has(randomlySelected.industry)){
						symposiumContainer.set(randomlySelected.industry,1);
						selectedSymposiums.push(randomlySelected);
					}
				}else{
					const randomNum=Math.floor(Math.random() * ((COMPANY_INDUSTRIES.INDUSTRIES.length-1) - 0 + 1)) + 0;
					const randomlySelected=PERSONAL_INDUSTRIES.INDUSTRIES[randomNum];
					if(!symposiumContainer.has(randomlySelected.industry)){
						symposiumContainer.set(randomlySelected.industry,1);
						selectedSymposiums.push(randomlySelected);
					}
				}
				counter++;
			}

			return <ul style={{padding:"0px",position:"relative"}}>
						{selectedSymposiums.map(data=>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li onClick={()=>displayPersonalIndustryFeed(personalInformation,data,selectedSymposiums,previousProps)} 
									style={{fontSize:"15px",color:"white",background:data.backgroundColor,padding:"20px",listStyle:"none",borderRadius:"5px",marginBottom:"5%"}}>
									<b>{data.industry}</b>
								</li>
							</a>
						)}
				   </ul>
	}

	return(
		<Container>
			{headerRegularPost!=null?
				<ul>
					<li id="headerLI" style={{overflow:"scroll",position:"relative",listStyle:"none",display:"inline-block",width:"50%",...BorderCSS}}>
						<ul style={{padding:"0px"}}>

							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li style={{position:"relative",display:"inline-block",listStyle:"none",width:"20%",borderRadius:"5px",overflow:"hidden"}}>
									<ProfilePictureLink to={{pathname:`/profile/${headerRegularPost.owner._id}`}}>
										<img src={headerRegularPost.owner.profilePicture!=null?
												  headerRegularPost.owner.profilePicture:
												  NoProfilePicture} 
										style={{height:"20%",width:"90%",borderRadius:"50%"}}/>
									</ProfilePictureLink>
								</li>
							</a>

							<li style={{position:"relative",top:"70px",listStyle:"none",display:"inline-block",width:"70%",overflow:"hidden",marginLeft:"5%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",marginBottom:"2%"}}>
										<ul style={{padding:"0px"}}>
											<li style={{display:"inline-block",listStyle:"none",fontSize:"30px",marginRight:"2%"}}>
												<b>{headerRegularPost.owner.firstName}</b>
											</li>

											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li  onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,null,headerRegularPost.industriesUploaded,props)} style={RegularPostLabelCSS}>
													{headerRegularPost.industriesUploaded[0].industry}
												</li>
											</a>

											<a href="javascript:void(0);" style={{textDecoration:"none"}}>
												<li style={{display:"inline-block",listStyle:"none"}}>
													<DisplayRecruitButton
														post={headerRegularPost}
														previousProps={props}
													/>
												</li>
											</a>
										</ul>
									</li>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li id="headerPostLI" onClick={()=>handleDisplayHeaderPost()} style={{listStyle:"none",height:"30%",overflowY:"scroll",display:"inline-block",width:"80%",fontSize:"20px"}}>
												{headerRegularPost.isAudioPost==true?
													<audio controls>
													 	<source src={headerRegularPost.post} type="audio/ogg"/>
													  	<source src={headerRegularPost.post} type="audio/mpeg"/>
														Your browser does not support the audio element.
													</audio>
													:
													<>{headerRegularPost.post}</>
												}
										</li>
									</a>
								</ul>
							</li>
						</ul>
					</li>
					<li id="smallPostLI" style={{width:"55%",position:"absolute",listStyle:"none",display:"inline-block",marginLeft:"2%",height:"80%",overflowY:"auto",marginBottom:"5%",...BorderCSS}}>
						<ul style={{padding:"0px"}}>
							{regularPosts.map(data=>
								<React.Fragment>
									{data=="suggestedSymposium"?
										<li id="suggestedSymposiumLI" style={{listStyle:"none",display:"inline-block",position:"relative",top:"0px",marginBottom:"8%",width:"70%",marginRight:"4%"}}>
											{constructSuggestedSymposium(personalInformationRedux,props)}
										</li>
										:
										<li style={{listStyle:"none",display:"inline-block",position:"relative",marginBottom:"8%",width:"90%",marginRight:"2%"}}>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none"}}>
													<ul style={{padding:"0px"}}>
														<li style={{listStyle:"none",display:"inline-block"}}>
															<ProfilePictureLink to={{pathname:`/profile/${data.owner._id}`}}>
																<img src={data.owner.profilePicture!=null?
																		data.owner.profilePicture:
																		NoProfilePicture} 
																style={{height:"15%",width:"50px",borderRadius:"50%"}}/>
															</ProfilePictureLink>
														</li>
														<li style={{listStyle:"none",display:"inline-block",fontSize:"20px"}}>
															<b>{data.owner.firstName} </b>
														</li>
													</ul>
												</li>

												<li iid="postLI" style={{listStyle:"none"}}>
													<ul style={{padding:"0px"}}>
														<a href="javascript:void(0);" style={{textDecoration:"none"}}>
															<li  id="post" onClick={()=>displayPostModal(data)}
																 style={{listStyle:"none",marginBottom:"1%",height:"20%",overflowY:"scroll",color:"#BDBDBD"}}>
																<b> 
																	{data.isAudioPost==true?
																		<audio controls>
																		 	<source src={data.post} type="audio/ogg"/>
																		  	<source src={data.post} type="audio/mpeg"/>
																			Your browser does not support the audio element.
																		</audio>
																		:
																		<>{data.post}</>
																	}
																	
																 </b>
															</li>
														</a>
														<a href="javascript:void(0);" style={{textDecoration:"none"}}>
															<li onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,null,data.industriesUploaded,props)} style={RegularPostLabelCSS}>
																{data.industriesUploaded[0].industry}
															</li>
														</a>
														<DisplayRecruitButton
															post={data}
															previousProps={props}
														/>
													</ul>
												</li>
											</ul>
										</li>
									}
									<hr/>
								</React.Fragment>
							)}
						</ul>
					</li>
				</ul>:
				<p> No posts yet </p>
			}
			{displayRegualrPostDisplayPortal==false?
				null:
				<RegularPostDisplayPortal
					closeModal={closeModal}
					selectedPost={selectedRegularPost}
					recommendedPosts={displayRecommendedPosts}
					targetDom={props.targetDom}
				/>
			}
		</Container>
	)
}

export default RegularPostModal;