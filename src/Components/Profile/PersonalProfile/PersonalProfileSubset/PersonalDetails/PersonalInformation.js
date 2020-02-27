import React,{useState,Component} from "react";
import styled from "styled-components";
import {UserConsumer} from "../../UserContext.js";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import FriendsAndIndustryInformation from "./FriendsAndIndustryInformation.js";


const BioContainer=styled.div`
	position:realtive;
	width:80%;
	margin-left:7%;
	background-color:white;
	margin-bottom:10px;
	color:#848484;

`;


const FriendsAndIndustryDisplayButton=styled.div`
	padding:10px;
	text-align:center;
	border-radius:5px;
	border-style:solid;
	border-color:#5298F8;
	border-width:1px;
	color:#5298F8;
	transition:.8s;


	&:hover{
		background-color:#5298F8;
		color:white;
	}

`;

const BackButton=styled.div`
	padding:10px;
	text-align:center;
	border-radius:5px;
	border-style:solid;
	border-color:#5298F8;
	border-width:1px;
	color:#5298F8;
	transition:.8s;


	&:hover{
		background-color:#5298F8;
		color:white;
	}


`;

const PersonalInformation=()=>{

	const [displayFriendsAndIndustryContainer,changeIndicator]=useState(false);


	return(
		<UserConsumer>
			{personalInformation=>{
				return <React.Fragment>
							{displayFriendsAndIndustryContainer==false?
								<React.Fragment>
									<p style={{position:"relative",left:"20%",fontSize:"30px",color:"#C8B0F4"}}><b>Nathan Grant</b></p>
									<BioContainer>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
										sed do eiusmod tempor incididunt ut labore et dolore magna 
										aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
										ullamco laboris nisi ut aliquip ex ea commodo consequat.
										Duis aute irure dolor in reprehenderit in voluptate velit
										esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
										occaecat cupidatat non proident, sunt in culpa qui officia 
										deserunt mollit anim id est laborum.
									</BioContainer>

									<ul style={{padding:"0px"}}>
										<li style={{listStyle:"none",marginLeft:"35%",marginBottom:"10px"}}>
											Social Media

										</li>
										<li style={{listStyle:"none",display:"inline-block",marginLeft:"30%",marginRight:"10%"}}>
											<ControlPointIcon
												style={{fontSize:40,color:"#5298F8"}}
											 />
										</li>

										<li style={{listStyle:"none",display:"inline-block",marginBottom:"15px"}}>
											<ControlPointIcon
												style={{fontSize:40,color:"#5298F8"}}
											/>
										</li>

										<li style={{listStyle:"none",marginBottom:"20px"}}>
											<FriendsAndIndustryDisplayButton onClick={()=>changeIndicator(true)}>
												Views Friends
											</FriendsAndIndustryDisplayButton>

										</li>

										<li style={{listStyle:"none"}}>
											<FriendsAndIndustryDisplayButton onClick={()=>changeIndicator(true)}>
												View Interested Industries
											</FriendsAndIndustryDisplayButton>

										</li>
									</ul>
								</React.Fragment>
								:<React.Fragment>
									<BackButton onClick={()=>changeIndicator(false)}>
										Back
									</BackButton>
									<FriendsAndIndustryInformation/>

								 </React.Fragment>

							}

							

						</React.Fragment>
				}}
		</UserConsumer>
	)
}

export default PersonalInformation;