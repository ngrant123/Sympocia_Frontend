import React,{useState,useEffect} from "react";
import LandingImage from '../../../../designs/img/FirstSectionLandingPAgeImage.png'
import {getInterestedProfiles} from "../../../../Actions/Requests/MarketingRequests.js";
import {MobileLoginUI} from "../../NavBar/LoginImplementation.js";
import {Container} from "./indexCSS.js";
import NoProfilePicture from "../../../../designs/img/NoProfilePicture.png";
import {Link} from "react-router-dom";


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

		// const getInterestedApi=async()=>{
		// 	const {confirmation,data}=await getInterestedProfiles(1);
		// 	const {
		// 		numberOfPeopleInterested,
		// 		responses
		// 	}=data;

		// 	changeTotalAmountInterested(numberOfPeopleInterested);
		// 	changeUsersInterested([...responses]);
		// }
		// getInterestedApi();

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

					<div id="exploreButton" style={ExploreButton} onClick={()=>history.push({
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
				<p id="totalUsersText">
					So far <b>{numberOfUserInTotalInterested}</b> users have signed up. What are you waiting for? :)
				</p>

				<div id="interestedProfilesDiv"
					style={{padding:"5px",width:"450px",height:"70px",borderRadius:"5px",overflowX:"auto",boxShadow:"1px 5px 5px 5px #d5d5d5"}}>
	                {usersInterested.map(data=>
						<li style={{listStyle:"none",display:"inline-block",marginRight:"2%",marginBottom:"2%"}}>
		                	<Link to={{pathname:`/profile/${data._id}`}}>
						  		<img id="profilePicture" src={data.profilePicture==null?NoProfilePicture:data.profilePicture}
									style={{borderRadius:"50%",width:"55px",height:"50px"}}
								/>
		                	</Link>
		                </li>
	                )}
				</div>
			</div>
		</Container>
	)
}


export default FirstSection;