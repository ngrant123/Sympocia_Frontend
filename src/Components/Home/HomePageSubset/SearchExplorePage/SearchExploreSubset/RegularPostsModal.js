import React,{useState} from "react";
import styled from "styled-components";
import PersonalIndustry from "../../../../../Constants/personalIndustryConstants.js";
import CompanyIndustry from "../../../../../Constants/industryConstants.js";
import {useSelector} from "react-redux";
import {displayPersonalIndustryFeed} from "./ImagePostsModal.js";
import {HomeConsumer} from "../../../HomeContext.js";


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

const RegularPostModal=()=>{
	const [regularPosts,changeRegularPosts]=useState([{},{},{}]);
	return(
		<React.Fragment>
			<li style={{position:"relative",top:"-220px",listStyle:"none",display:"inline-block",width:"50%"}}>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",width:"90%",borderRadius:"5px",marginLeft:"40%",marginBottom:"10%",marginTop:"5%"}}>
							 <ProfileHeaderImage>
							 </ProfileHeaderImage>
						</li>
						<li style={{position:"relative",top:"-50px",listStyle:"none",display:"inline-block",width:"30%"}}>
							<ul style={{padding:"0px"}}>
								<li style={{listStyle:"none",fontSize:"30px",marginRight:"2%"}}>
									<b>Nathan</b>
								</li>

								<li style={RegularPostLabelCSS}>
									Engineering
								</li>

								<li style={RegularPostLabelCSS}>
									Follow
								</li>
							</ul>
						</li>
						<li style={{listStyle:"none",display:"inline-block",width:"60%",fontSize:"15px"}}>
							  Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
							  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
							  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
							  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
							  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
							  qui officia deserunt mollit anim id est laborum.
						</li>
					</ul>
				</li>

				<li style={{width:"55%",position:"absolute",listStyle:"none",display:"inline-block",marginLeft:"2%",height:"80%",overflowY:"auto",marginBottom:"5%"}}>
					<ul style={{padding:"0px"}}>
						{regularPosts.map(data=>
							<li style={{listStyle:"none",display:"inline-block",position:"relative",marginBottom:"8%",width:"90%",marginRight:"2%"}}>
								<ul style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block"}}>
										<ProfilePicture>
										</ProfilePicture>
									</li>

									<li style={{listStyle:"none",display:"inline-block"}}>
										<ul style={{padding:"0px"}}>
											<li style={{listStyle:"none",marginBottom:"1%",color:"#BDBDBD"}}>
												<b>  Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
												  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
												  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
												  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
												  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
												  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
												  qui officia deserunt mollit anim id est laborum.
												 </b>
											</li>

											<li style={RegularPostLabelCSS}>
												Engineering
											</li>

										</ul>
									</li>
								</ul>
							</li>
						)}
					</ul>
				</li>
		</React.Fragment>
	)
}

export default RegularPostModal;