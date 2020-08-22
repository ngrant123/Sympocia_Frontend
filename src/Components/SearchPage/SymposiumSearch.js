import React,{useState,useEffect} from "react";
import styled from "styled-components";

import TestProfilePicture from "../../designs/img/FirstSectionLandingPAgeImage.png";
import NoProfilePicture from "../../designs/img/NoProfilePicture.png";

const SymposiumOptionButton={
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

const FollowSymposiumButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  width:"10%",
  marginRight:"2%"
}
const SymposiumSearch=(props)=>{
	const [symposiums,changeSymposiums]=useState([{symposiumTitle:"Engineering",posts:[{},{},{},{},{},{},{}],profiles:[{},{},{},{},{},{},{}]},
		{symposiumTitle:"Engineering",posts:[{},{},{},{},{},{},{}],profiles:[{},{},{},{},{},{},{}]},
		{symposiumTitle:"Accounting",posts:[{},{},{},{},{},{},{}],profiles:[{},{},{},{},{},{},{}]},
		{symposiumTitle:"Testein",posts:[{},{},{},{},{},{},{}],profiles:[{},{},{},{},{},{},{}]},
		{symposiumTitle:"Math",posts:[{},{},{},{},{},{},{}],profiles:[{},{},{},{},{},{},{}]},
		{symposiumTitle:"Gaming",posts:[{},{},{},{},{},{},{}],profiles:[{},{},{},{},{},{},{}]}]);

	useEffect(()=>{
		const getSymposiums=async()=>{

		}
		getSymposiums();
	});

	return(
		<>
		<ul style={{padding:"0px"}}>
			<a href="javascript:void(0);" style={{textDecoration:"none"}}>
				<li style={SymposiumOptionButton}>
					Most Popular
				</li>
			</a>
			<hr/>
			{symposiums.map(data=>
				<>
					<li style={{listStyle:"none",marginBottom:"5%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",marginLeft:"5%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",fontSize:"45px",marginRight:"2%"}}>
										<b>{data.symposiumTitle}</b>
									</li>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li style={FollowSymposiumButton}>
											Follow
										</li>
									</a>

									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li style={FollowSymposiumButton}>
											View Symposium
										</li>
									</a>
								</ul>
							</li>

							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",width:"40%",height:"210px",overflowY:"auto",marginRight:"2%"}}>
										<ul style={{padding:"0px"}}>
											{data.posts.map(posts=>
												<li style={{marginRight:"5%",listStyle:"none",display:"inline-block",width:"30%",marginRight:"2%",marginTop:"2%"}}>
													<img src={TestProfilePicture} style={{width:"120%",height:"140px",borderRadius:"5px"}}/>
												</li>
											)}
										</ul>
									</li>

									<li style={{listStyle:"none",display:"inline-block",width:"40%",height:"150px",overflowY:"auto"}}>
										<ul style={{padding:"0px"}}>
											{data.profiles.map(profiles=>
												<li style={{listStyle:"none",display:"inline-block",width:"20%",marginBottom:"2%"}}>
													<img src={profiles.imgSrc==null?NoProfilePicture:profiles.imgSrc}
														style={{borderRadius:"50%",width:"80%",height:"80px"}}
													/>
												</li>
											)}
										</ul>
									</li>
								</ul>
							</li>
						</ul>
					</li>
					<hr/>
				</>
			)}
		</ul>
		</>
	)
}

export default SymposiumSearch;