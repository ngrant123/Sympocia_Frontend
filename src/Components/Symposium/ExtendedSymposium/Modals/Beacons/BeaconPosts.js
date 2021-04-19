import React from "react";
import styled from "styled-components";
import TestImage from "../../../../../designs/postimages/Notcameraactivated.png";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";

const Container=styled.div`
	margin-top:5%;
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;
`;

const ProfileInformation=styled.div`
	display:flex;
	flex-direction:row;
	margin-top:2%;
	justify-content:cetner;
	align-items:center;
`;

const OwnerNameCSS={
	marginLeft:"2%",
	color:"#ADADAD",
	maxHeight:"20px",
	maxWidth:"30%",
	overflow:"hidden"
}
const BeaconPosts=({postType,posts})=>{

	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const postsDecider=()=>{
		switch(postType){
			case "Images":{
				return(
					<React.Fragment>
						{posts.map(data=>
							<div style={{cursor:"pointer",marginRight:"3%",width:"30%",marginBottom:"10%"}}>	
								<img src={TestImage} style={{width:"140px",height:"130px",borderRadius:"5px"}}/>
								<ProfileInformation>
									<img src={NoProfilePicture} style={{
																width:"50px",
																height:"40px",
																borderRadius:"50%"
															}}/>
									<p style={OwnerNameCSS}>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
										sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
									</p>
								</ProfileInformation>
								<p style={{width:"100%",height:"40px",overflow:"hidden",marginTop:"5%"}}>
									<b>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
										sed do eiusmod tempor incididunt ut labore et dolore magna 
										aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
										laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
										in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
										Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
									</b>
								</p>
							</div>
						)}
					</React.Fragment>
				)
				break;
			}
			case "Videos":{
				return(
					<React.Fragment>
						{posts.map(data=>
							<div style={{cursor:"pointer",marginRight:"3%",width:"30%",marginBottom:"5%"}}>
								<video id="uploadVideoUrl" key={uuidv4()} width="100%" height="40%" 
									borderRadius="5px" controls autoplay>
									<source type="video/mp4"/>
								</video>	
								<ProfileInformation>
									<img src={NoProfilePicture} style={{
																width:"50px",
																height:"40px",
																borderRadius:"50%"
															}}/>
									<p style={OwnerNameCSS}>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
										sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
									</p>
								</ProfileInformation>
								<p style={{width:"100%",height:"40px",overflow:"hidden",marginTop:"5%"}}>
									<b>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
										sed do eiusmod tempor incididunt ut labore et dolore magna 
										aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
										laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
										in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
										Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
									</b>
								</p>
							</div>
						)}
					</React.Fragment>
				)
				break;
			}
			case "Regular":{
				return(
					<React.Fragment>
						{posts.map(data=>
							<div style={{cursor:"pointer",marginRight:"3%",width:"100%",marginBottom:"5%"}}>
								<p style={{width:"100%",height:"80px",overflow:"hidden",marginTop:"5%"}}>
									<b>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
										sed do eiusmod tempor incididunt ut labore et dolore magna 
										aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
										laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
										in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
										Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
									</b>
								</p>
								<ProfileInformation>
									<img src={NoProfilePicture} style={{
																width:"50px",
																height:"40px",
																borderRadius:"50%"
															}}/>
									<p style={OwnerNameCSS}>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
										sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
									</p>
								</ProfileInformation>
							</div>
						)}
					</React.Fragment>
				)
				break;
			}
		}

	}
	return(
		<Container>
			{postsDecider()}
		</Container>
	)
}

export default BeaconPosts;