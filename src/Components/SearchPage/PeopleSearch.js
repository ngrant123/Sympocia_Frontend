import React,{useState,useEffect} from "react";
import styled from "styled-components";

import NoSearchResultDisplay from "../../designs/img/FirstSectionLandingPAgeImage.png";
import {getProfilesFromSearch} from "../../Actions/Requests/SearchPageAxiosRequests/index.js";
import NoProfilePicture from "../../designs/img/NoProfilePicture.png";
import LoadingScreen from "../../LoadingAnimation.js";

const ProfileFilterButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec"
}

const ProfileCardCSS={
	listStyle:"none",
	display:"inline-block",
	marginRight:"5%",
	height:"320px",
	overflowY:"auto",
	width:"25%",
	marginBottom:"5%",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#efefef",
	borderRadius:"5px"
}

const SymposiumCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginLeft:"5%"
}

const PeopleSearch=({searchQuery,userId,displayProfile})=>{
	const [profiles,changeProfiles]=useState([]);
	const [isLoading,changeLoadingScreen]=useState(true);
	useEffect(()=>{

		const getProfiles=async()=>{
			const {confirmation,data}=await getProfilesFromSearch(searchQuery);
			if(confirmation=="Success"){
				console.log(data);
				changeProfiles([...data]);
				changeLoadingScreen(false);
			}else{
				alert('Unfortunately there has been an error trying to get the profiles. Please try again');
			}
		}
		getProfiles()
		;
	},[])

	const displaySelectedProfile=(selectedId)=>{
		displayProfile(selectedId);
	}
	return(
		<>
			{isLoading==true?
				<LoadingScreen/>:
				<ul style={{padding:"20px"}}>
					{/*
						<li style={{listStyle:"none",marginLeft:"5%"}}>
							<ul style={{padding:"0px"}}>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li style={ProfileFilterButton}>
										Filter by interested symposiums
									</li>
								</a>
							</ul>
						</li>
					*/}
					<hr/>
					{profiles.length==0?
						<li style={{listStyle:"none",marginLeft:"5%"}}>	
							<ul style={{padding:"20px"}}>
								<li style={{listStyle:"none",display:"inline-block",width:"50%"}}>
									<img src={NoSearchResultDisplay} style={{borderRadius:"50%",width:"80%",height:"400px"}}/>
								</li>
								<li style={{width:"30%",fontSize:"30px",listStyle:"none",display:"inline-block"}}>
									<b>
										No results unfortunately :( Maybe search something else?
									</b>
								</li>
							</ul>
						</li>:
						<li style={{listStyle:"none",marginLeft:"5%"}}>
							<ul style={{padding:"20px"}}>
								{profiles.map(data=>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li onClick={()=>displaySelectedProfile(data._id)} style={ProfileCardCSS}>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none",marginLeft:"20%",marginTop:"2%",marginBottom:"2%"}}>
													<img src={data.profilePicture!=null?
																data.profilePicture:
																NoProfilePicture
															} style={{borderRadius:"50%",width:"70%",height:"180px"}}/>
												</li>
												<li style={{listStyle:"none",display:"inline-block",width:"80%"}}>
													<ul style={{padding:"0px"}}>
														<li style={{listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
															<p style={{marginLeft:"5%"}}>{data.firstName} </p>
														</li>
														{data.interestedSymposiums.length>0?
															<li style={SymposiumCSS}>
																{data.interestedSymposiums[0].symposium}
															</li>
															:<p>No interested symposiums :(</p>
														}
													</ul>
												</li>
												<hr/>

												<li style={{listStyle:"none"}}>
													<ul style={{padding:"0px"}}>
														{data.imagePost.map(posts=>
															<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",marginBottom:"2%"}}>
																<img src={posts.imgUrl} style={{borderRadius:"5px",width:"75px",height:"70px",borderRadius:"5px"}}/>
															</li>
														)}
													</ul>
												</li>
											</ul>
										</li>
									</a>
								)}
							</ul>
						</li>
					}
				</ul>
			}
			
		</>
	)
}

export default PeopleSearch;