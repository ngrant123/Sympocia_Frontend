import React,{useState,useEffect} from "react";
import styled from "styled-components";
import TestProfilePicture from "../../designs/img/FirstSectionLandingPAgeImage.png";

import NoProfilePicture from "../../designs/img/NoProfilePicture.png";

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
const PeopleSearch=(props)=>{
	const [profiles,changeProfiles]=useState([{firstName:"Bob",posts:[{},{},{},{},{}]},
		{firstName:"Derrick",posts:[{},{},{},{}]},
		{firstName:"TEst",posts:[{},{},{},{}]},
		{firstName:"Yessir",posts:[{},{},{}]}
		]);

	useEffect(()=>{

		const getProfiles=async()=>{

		}
		getProfiles();
	})
	return(
		<>
			<ul style={{padding:"0px"}}>
				<li style={{listStyle:"none",marginLeft:"5%"}}>
					<ul style={{padding:"0px"}}>
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<li style={ProfileFilterButton}>
								Filter by interested symposiums
							</li>
						</a>
					</ul>
				</li>
				<hr/>

				<li style={{listStyle:"none",marginLeft:"5%"}}>
					<ul style={{padding:"20px"}}>
						{profiles.map(data=>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li style={ProfileCardCSS}>
									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",marginLeft:"20%"}}>
											<img src={TestProfilePicture} style={{borderRadius:"50%",width:"70%",height:"180px"}}/>
										</li>
										<li style={{listStyle:"none",display:"inline-block"}}>
											<ul style={{padding:"0px"}}>
												<li style={{listStyle:"none",display:"inline-block",width:"20%"}}>
													<img src={data.profilePicture==null?NoProfilePicture:data.profilePicture}
														style={{borderRadius:"50%",width:"90%",height:"20%"}}/>
												</li>
												<li style={{listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
													<p style={{marginLeft:"5%"}}>{data.firstName} </p>
												</li>

											</ul>
										</li>
										<hr/>

										<li style={{listStyle:"none"}}>
											<ul style={{padding:"0px"}}>
												{data.posts.map(posts=>
													<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",marginBottom:"2%"}}>
														<img src={TestProfilePicture} style={{borderRadius:"5px",width:"75px",height:"70px",borderRadius:"5px"}}/>
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
			</ul>
		</>
	)
}

export default PeopleSearch;