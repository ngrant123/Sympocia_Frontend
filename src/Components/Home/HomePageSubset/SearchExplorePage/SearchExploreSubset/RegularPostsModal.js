import React,{useState} from "react";
import styled from "styled-components";
import PersonalIndustry from "../../../../../Constants/personalIndustryConstants.js";
import CompanyIndustry from "../../../../../Constants/industryConstants.js";
import {useSelector} from "react-redux";
import {
		displayPersonalIndustryFeed,
		displayRecruitButton
	} from "./ImagePostsModal.js";
import {HomeConsumer} from "../../../HomeContext.js";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import PERSONAL_INDUSTRIES from "../../../../../Constants/personalIndustryConstants.js";
import COMPANY_INDUSTRIES from "../../../../../Constants/industryConstants.js";



const Container=styled.div`
	position:absolute;
	width:95%;
	height:97%;
	margin-top:1%;
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

const ShadowContainer= styled.div`
	position:absolute;
	width:320px;
	height:230px;
	background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	display:block;
	z-index:1;
	transition:.8s;
	border-radius:5px;

	&:hover{
		background-color:transparent
	}
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

const RegularPostModal=(props)=>{
	console.log(props);
	const headerRegularPost=props.posts[0];
	const regularPosts=props.posts.slice(1,props.posts.length);
	const personalInformationRedux=useSelector(state=>state.personalInformation);

	const constructSuggestedSymposium=(personalInformation,previousProps)=>{
		debugger;
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
							<a href="javascript:void(0);">
								<li onClick={()=>displayPersonalIndustryFeed(personalInformation,data,selectedSymposiums,previousProps)} 
									style={{fontSize:"15px",color:"white",background:data.backgroundColor,padding:"20px",listStyle:"none",borderRadius:"5px",marginBottom:"5%"}}>
									<b>{data.industry}</b>
								</li>
							</a>
						)}
				   </ul>
	}

	return(
		<React.Fragment>
			<li style={{position:"relative",top:"-220px",listStyle:"none",display:"inline-block",width:"50%"}}>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none"}}>
							<ul style={{padding:"0px"}}>
								<li style={{dispaly:"inline-block",listStyle:"none",width:"20%",borderRadius:"5px",overflow:"hidden"}}>
									 {headerRegularPost.owner.profilePicture!=null?
										<img src={headerRegularPost.owner.profilePicture} style={{height:"20%",width:"90%",borderRadius:"50%"}}/>:
										<img src={NoProfilePicture} style={{height:"20%",width:"90%",borderRadius:"50%"}}/>
									 }
								</li>
								<li style={{listStyle:"none",display:"inline-block",width:"90%",overflow:"hidden"}}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",fontSize:"30px",marginRight:"2%"}}>
											<b>{headerRegularPost.owner.firstName}</b>
										</li>

										<li  onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,null,headerRegularPost.industriesUploaded,props)} style={RegularPostLabelCSS}>
											{headerRegularPost.industriesUploaded[0].industry}
										</li>
										{displayRecruitButton(headerRegularPost,props)}
									</ul>
								</li>
							</ul>
						</li>
						<li style={{listStyle:"none",height:"30%",overflowY:"scroll",display:"inline-block",width:"80%",fontSize:"15px"}}>
							{headerRegularPost.post}
						</li>
					</ul>
				</li>

				<li style={{width:"55%",position:"absolute",listStyle:"none",display:"inline-block",marginLeft:"2%",height:"80%",overflowY:"auto",marginBottom:"5%"}}>
					<ul style={{padding:"0px"}}>
						{regularPosts.map(data=>
							<React.Fragment>
								{data=="suggestedSymposium"?
									<li style={{listStyle:"none",display:"inline-block",position:"relative",top:"0px",marginBottom:"8%",width:"70%",marginRight:"4%"}}>
										{constructSuggestedSymposium(personalInformationRedux,props)}
									</li>
									:
									<li style={{listStyle:"none",display:"inline-block",position:"relative",marginBottom:"8%",width:"90%",marginRight:"2%"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none"}}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block"}}>
														{data.owner.profilePicture!=null?
															<img src={data.owner.profilePicture} style={{height:"15%",width:"50px",borderRadius:"50%"}}/>:
															<img src={NoProfilePicture} style={{height:"15%",width:"50px",borderRadius:"50%"}}/>
														}
													</li>
													<li style={{listStyle:"none",display:"inline-block",fontSize:"20px"}}>
														<b>{data.owner.firstName} </b>
													</li>
												</ul>
											</li>

											<li style={{listStyle:"none"}}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",marginBottom:"1%",height:"20%",overflowY:"scroll",color:"#BDBDBD"}}>
														<b> 
															{data.isAudioPost==true?
																<audio controls>
																 	<source src={data.audioDescription} type="audio/ogg"/>
																  	<source src={data.audioDescription} type="audio/mpeg"/>
																	Your browser does not support the audio element.
																</audio>
																:
																<>{data.post}</>
															}
															
														 </b>
													</li>

													<li onClick={()=>displayPersonalIndustryFeed(personalInformationRedux,null,data.industriesUploaded,props)} style={RegularPostLabelCSS}>
														{data.industriesUploaded[0].industry}
													</li>
													{displayRecruitButton(data,props)}

												</ul>
											</li>
										</ul>
									</li>
								}
							</React.Fragment>
						)}
					</ul>
				</li>
		</React.Fragment>
	)
}

export default RegularPostModal;