import React,{useState,useEffect} from "react";
import styled from "styled-components";
import LandingImage from '../../../../designs/img/FirstSectionLandingPAgeImage.png'
import {getInterestedProfiles} from "../../../../Actions/Requests/MarketingRequests.js";
import {MobileLoginUI} from "../../NavBar/LoginImplementation.js";

const Container=styled.div`
	display:flex;
	flex-direction:row;
	width:100%;
	justify-content:center;
	opacity:0;
    transition:.8s;

	@media screen and (max-width:1370px){
		#mainIntroductionDiv{
			width:90% !important;
			margin-left:5% !important;
		}
		#headerText{
			font-size:24px !important;
		}
		#secondaryFirstSectionText{
			font-size:18px !important;
		}
		#headerImage{
			width:300px !important;
			height:300px !important;
		}

		#interestedProfilesDiv{
			width:90% !important;
		}
		#firstSectionImageDiv{
			margin-top:-5%;
		}
	}

	@media screen and (max-width:650px){
		flex-direction:column;
		#mainIntroductionDiv{
			width:90% !important;
			margin-left:5% !important;
		}
		#headerText{
			font-size:24px !important;
		}
		#secondaryFirstSectionText{
			font-size:18px !important;
		}
		#headerImage{
			width:200px !important;
			height:200px !important;
		}
		#firstSectionImageDiv{
			margin-top:0%;
			margin-left:0% !important;
			padding:10px !important;
			justify-content:center !important;
			align-items:center !important;
		}

		#signUpButton{
			display:none !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		margin-top:2%;
		#mainIntroductionDiv{
			width:40% !important;
		}
		#interestedProfilesDiv{
			width:70% !important;
		}
    }


	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		margin-top:0%;
		flex-direction:column;
		#mainIntroductionDiv{
			width:100% !important;
			margin-left:0% !important;
		}
		#headerText{
			font-size:24px !important;
		}
		#secondaryFirstSectionText{
			font-size:18px !important;
		}
		#headerImage{
			width:200px !important;
			height:200px !important;
		}

		#interestedProfilesDiv{
			width:90% !important;
		}
		#firstSectionImageDiv{
			margin-left:0% !important;
			padding:10px !important;
			justify-content:center !important;
			align-items:center !important;
			margin-top:5% !important;
		}
    }
`;

const SignUpButton={
    listStyle:"none",
    display:"inline-block",
    backgroundColor:"#3898ec",
    borderRadius:"5px",
    padding:"10px",
    color:"white",
    marginRight:"2%",
    cursor:"pointer"
}

const ExploreButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  cursor:"pointer"
}

const FirstSection=({history})=>{
	const [usersInterested,changeUsersInterested]=useState([]);
	const [numberOfUserInTotalInterested,changeTotalAmountInterested]=useState(0);

	useEffect(()=>{
		setTimeout(()=>{
			const container=document.getElementById("firstContainer");
			container.style.opacity="1";
		},200);

		const getInterestedApi=async()=>{
			const {confirmation,data}=await getInterestedProfiles(1);
			const {
				numberOfPeopleInterested,
				responses
			}=data;

			changeTotalAmountInterested(numberOfPeopleInterested);
			changeUsersInterested([...responses]);
		}
		getInterestedApi();

	},[]);

	const profilePersonaIcon=()=>{
		return(
			<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user"  
				width="80px" height="95%" viewBox="0 0 24 24" stroke-width="1.5" stroke="#03A9F4" 
				fill="none" stroke-linecap="round" stroke-linejoin="round">
				<path stroke="none" d="M0 0h24v24H0z"/>
				<circle cx="12" cy="7" r="4" />
				<path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
			</svg>
		)
	}
	return(
		<Container id="firstContainer">
			<div id="mainIntroductionDiv" style={{width:"40%"}}>
				<p id="headerText" style={{fontSize:"48px",marginBottom:"10%",textAlign:"center"}}>
					<b>Finally.... a platform where you can just be yourself</b>
				</p>
				<p id="secondaryFirstSectionText" style={{fontSize:"24px",textAlign:"center"}}>
					Introducing the first social entertainment platform focused on 
					you expressing yourself regardless of whether people like it or not
				</p>
				<div style={{display:"flex",flexDirection:"row",justifyContent:"center",marginTop:"10%"}}>
					<div id="signUpButton" style={SignUpButton} onClick={()=>history.push({
                      pathname:'/signup'
                    })}>
                    	Sign Up
					</div>

					<div style={ExploreButton} onClick={()=>history.push({
                      pathname:'/home'
                    })}>
						Enter as Guest
					</div>
				</div>
			</div>

			<div id="firstSectionImageDiv" style={{display:"flex",flexDirection:"column",marginLeft:"5%",marginBottom:"2%"}}>
				<img id="headerImage" src={LandingImage} 
					style={{borderRadius:"50%",width:"427px",height:"435px"}}
				/>
				<p>
					So far <b>{numberOfUserInTotalInterested}</b> users have signed up. What are you waiting for? :)
				</p>

				<div id="interestedProfilesDiv"
					style={{padding:"5px",width:"450px",height:"70px",borderRadius:"5px",overflowX:"auto",boxShadow:"1px 5px 5px 5px #d5d5d5"}}>
	                {usersInterested.map(data=>
						<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",marginBottom:"2%"}}>
						  {profilePersonaIcon()}
						</li>
	                )}
				</div>
			</div>
		</Container>
	)
}


export default FirstSection;