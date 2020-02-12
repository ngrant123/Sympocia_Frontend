import React,{useState,useEffect,Component} from "react";
import styled from "styled-components";
import SmallInvestorMediaContainer from "./InvestorMediaContainer.js";
import SmallInvestmentsContainer from "./Investments.js";
import Investments from "./Investments.js";

const InvestorModalContainer = styled.div`

	position:absolute;
	width:50%;
	height:65%;
	margin-left:20%;
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


const InvestorProfile=(props)=>{
	console.log(props);

	const [additionalInformation,changeAdditionalInformation]=useState("");
	const bio ="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
	const investments=[{},{},{}];

	const displayAdditionalInformation=()=>{

		if(additionalInformation=="bio"){
			return <p style={{marginLeft:"10%",marginRight:"7%",marginBottom:"10%"}}>{bio}</p>;
		}else if(additionalInformation=="investments"){
			return <ul style={{position:"relative",top:"-7%"}}>
					{investments.map(data=>
						<li style={{listStyle:"none",marginBottom:"10%"}}>
							<Investments
								data={data}
							/>
						</li>
					)}
				</ul>
			;
		}else
			return <React.Fragment></React.Fragment>;
	}


	return(
		<InvestorModalContainer id="modalcontainer">
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
			<InvestorProfilePicture>

			</InvestorProfilePicture>

			<p style={{marginLeft:"37%",fontSize:"20px"}}> Investor Name  </p>
			<p style={{marginLeft:"39%"}}>Sympocia Rating</p>
			<InvestorRating>
			</InvestorRating>
			<p style={{marginLeft:"20px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

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
					<InvestorAdditionalInformationButton>
						Message 
					</InvestorAdditionalInformationButton>
				</li>
			</ul>
			{displayAdditionalInformation()}
		</InvestorModalContainer>	
	)
}

export default InvestorProfile;