import React,{useState,useEffect,Component} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import SmallInvestorMediaContainer from "./InvestorMediaContainer.js";
import SmallInvestmentsContainer from "./Investments.js";
import Investments from "./Investments.js";
import NoProfileIcon from "../../../../designs/img/NoProfilePicture.png";


const InvestorModalContainer = styled.div`

	position:absolute;
	width:40%;
	height:50%;
	margin-left:35%;
	margin-top:10%;
	background-color:white; 
	z-index:5;
	border-radius:5px;
	overflow-y:scroll;
`;


const InvestorProfilePicture=styled.div`
	postition:absolute;
	width:30%;
	height:35%;
	border-radius:50%;
	border-style:solid;
	border-width:2px;
	border-color:#5298F8;
	margin-left:35%;
	margin-top:5%;
`;

const InvestorRating =styled.div`
	position:relative;
	width:40%;
	height:10%;
	border-radius:5px;
	background-color:white;
	margin-left:30%;
	box-shadow: 1px 1px 5px 5px #d8d9df;
	margin-bottom:20px;
	padding:10px;
`;

const InvestorAdditionalInformationButton=styled.div`
	position:relative;
	width:100px;
	height:10%;
	background-color:#5298F8;
	text-align:center;
	padding:10px;
	border-radius:5px;
	color:white;
	margin-right:20px;
`;

const ViewProfileButton=styled(Link)`
	position:relative;
	width:100px;
	height:10%;
	background-color:#5298F8;
	text-align:center;
	padding:10px;
	border-radius:5px;
	color:white;
	margin-right:20px;
`;

const SocialMediaContainer=styled.div`
	position:absolute;
	width:15%;
	height:40%;
	margin-top:5%;
	margin-left:80%;
	border-radius:5px;
	background-color:white;
	box-shadow: 1px 1px 5px 5px #d8d9df;


`;

const InvestorProfileCSS={
	postition:"absolute",
	width:"30%",
	height:"35%",
	borderRadius:"50%",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#5298F8",
	marginLeft:"35%",
	marginTop:"5%"
}


const InvestorProfile=(props)=>{
	const [additionalInformation,changeAdditionalInformation]=useState("");
	const bio ="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
	const investments=[{},{},{}];

	const displayAdditionalInformation=()=>{
		if(additionalInformation=="bio"){
			return <React.Fragment>
						{props.investorData.bio!=""?<p style={{marginLeft:"10%",marginRight:"7%",marginBottom:"10%"}}>{props.investorData.bio}</p>:
							<p style={{marginLeft:"10%",marginRight:"7%",marginBottom:"10%"}}>This user has no bio. Message them instead to learn more</p>
						}
				   </React.Fragment>;
		}else if(additionalInformation=="investments"){
			return <React.Fragment>
						{props.investorData.investments.length==0?
							<p style={{marginLeft:"10%",marginRight:"7%",marginBottom:"10%"}}>This user has no investments. Message them instead to learn more</p>:
							<ul style={{position:"relative",top:"-7%"}}>
								{props.investorData.investments.map(data=>
									<li style={{listStyle:"none",marginBottom:"10%"}}>
										<Investments
											investorData={data}
										/>
									</li>
								)}
							</ul>
						}
					</React.Fragment>
			;
		}else
			return <React.Fragment></React.Fragment>;
	}


	return(
		<InvestorModalContainer id="modalcontainer">
			{/*
				<SocialMediaContainer>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none"}}>
							Tester

						</li>
						<li style={{listStyle:"none"}}>
							Tester

						</li>

						<li style={{listStyle:"none"}}>
							Tester

						</li>
					</ul>
				</SocialMediaContainer>
			*/}
			
			{props.investorData.profilePicture==null?
				<img src={NoProfileIcon} style={InvestorProfileCSS}/>:
				<img src={props.investorData.profilePicture} style={InvestorProfileCSS}/>
			}

			<p style={{marginLeft:"37%",fontSize:"20px"}}>
				{props.investorData.name}
				{props.investorData.firstName}
			</p>
			<p style={{marginLeft:"39%"}}>Sympocia Rating</p>
			<InvestorRating>
				<p> No rating so far :(</p>
			</InvestorRating>
			<p style={{marginLeft:"20px"}}>
				{props.investorData.bio}
			</p>

			<ul style={{marginLeft:"10%"}}>
				<li style={{listStyle:"none",display:"inline-block"}}>
					<InvestorAdditionalInformationButton onClick={()=>changeAdditionalInformation("investments")}>
						Investments
					</InvestorAdditionalInformationButton>
				</li>
				<li style={{listStyle:"none",display:"inline-block"}}>
					<InvestorAdditionalInformationButton onClick={()=>changeAdditionalInformation("bio")}>
						Bio
					</InvestorAdditionalInformationButton>
				</li>
				<li style={{listStyle:"none",display:"inline-block"}}>
					<ViewProfileButton to={{pathname:`/profile/${props.investorData._id}`}}>
						View Profile
					</ViewProfileButton>
				</li>
			</ul>
			{displayAdditionalInformation()}
		</InvestorModalContainer>	
	)
}

export default InvestorProfile;