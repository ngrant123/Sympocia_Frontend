import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { GeneralNavBar } from "../../GeneralComponents/NavBarComponent/LargeNavBarComponent/LargeNavBarComponent.js";
import AdContent from "../AdSubset/index.js";
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {
	getProfilePicture,
	adPageVerification
} from "../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {useSelector} from "react-redux";
import {AdProvider} from "./AdContext.js";
import NoProfilePicture from "../../../designs/img/NoProfilePicture.png";
import {Link} from "react-router-dom";

const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
`;

const AdsContainer=styled.div`
	position:relative;
	width:100%;
	margin-top:5%;
	padding:5%;
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;

	@media screen and (max-width:1370px){
		justify-content:flex-start;
		align-items:start;
		margin-top:10%;
	}

	@media screen and (max-width:650px){
		margin-top:25%;
	}
`;


const ButtonCSS={
	borderColor:"#D0D0D0",
	borderStyle:"solid",
	borderWidth:"1px",
	borderRadius:"5px",
	padding:"10px",
	display:"flex",
	flexDirection:"row",
	justifyContent:"center",
	alignItems:"center",
	cursor:"pointer",
	backgroundColor:"white",
	color:"#000000",
	marginBottom:"2%"
}

const VerticalLineCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#EBEBEB",
	borderLeft:"2px",
 	height:"30px",
 	marginRight:"5%",
 	marginLeft:"5%"
}

const HorizontalLineCSS={
	position:"relative",
	width:"90%",
	height:"2px",
	borderRadius:"5px",
	borderRadius:"5px"
}

const Ads=(props)=>{
	const [adDisplayOptionType,changeDisplayAdOptionType]=useState("Ads");
	const [userProfilePicture,changeUserProfilePicture]=useState();
	const [adCreationVerificationLoading,changeAdVerificationLoading]=useState(true);
	const [isAdCreationAllowed,changeIsAdCreationAllowed]=useState(false);
	const {
		id,
		firstName,
		accessToken,
		refreshToken
	}=useSelector(state=>state.personalInformation);

	useEffect(()=>{
		const fetchProfilePicture=async()=>{
			const {confirmation,data}=await getProfilePicture(id);
			if(confirmation=="Success"){
				changeUserProfilePicture(data);
			}
		}

		const isProfileVerifiedForAd=async()=>{
			const {confirmation,data}=await adPageVerification(id);
			if(confirmation=="Success"){
				const {message}=data;
				console.log(data);
				if(message){
					changeIsAdCreationAllowed(true);
				}
			}

			changeAdVerificationLoading(false);
		}

		isProfileVerifiedForAd();
		fetchProfilePicture();
	},[]);


	const userInformation=()=>{
		return(
			<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
				<img src={userProfilePicture==null?
					NoProfilePicture:userProfilePicture} 
					style={{width:"60px",height:"50px",borderRadius:"50%",marginRight:"1%"}}
				/>
				<p>
					<b>{firstName}</b>
				</p>
				<div style={VerticalLineCSS}/>
				<div class="btn-group">
					<button class="btn btn-primary dropdown-toggle" type="button" 
						data-toggle="dropdown" style={ButtonCSS}>
						{adDisplayOptionType=="Ads"?
							<>Current Ads </>:
							<>Create</>
						}
						<ArrowDropDownCircleOutlinedIcon
							style={{fontSize:"15",color:"7C7C7C",marginLeft:"10px"}}
						/>
					</button>
					<ul class="dropdown-menu" style={{padding:"10px"}}>
						<li style={{cursor:"pointer"}} onClick={()=>changeDisplayAdOptionType("Ads")}>
							Current Ads 
						</li>
						{adCreationVerificationLoading==true?
							<p> Loading...</p>:
							<React.Fragment>
								{isAdCreationAllowed==true &&(
									<React.Fragment>
										<hr/>	
										<li style={{cursor:"pointer"}} onClick={()=>changeDisplayAdOptionType("Creation")}>
											Create
										</li>	
									</React.Fragment>
								)}
							</React.Fragment>
						}
					</ul>
				</div>	
			</div>
		)
	}
	return(
		<AdProvider
			value={{
				userId:id,
				accessToken,
				refreshToken,
				updateDisplayAdOptionType:(userSpecifiedOptionType)=>{
					changeDisplayAdOptionType(userSpecifiedOptionType)
				}
			}}
		>
			<Container id="adsContainer">
				<GeneralNavBar
					page={"AdsPage"}
					routerHistory={props.history}
					targetDom={"AdsPage"}
				/>

				<AdsContainer>
					{isAdCreationAllowed==false?
						<div>
							<p>
								Unfortunately you have not unlocked the option to create an ad. 
								You can access this option through the payment page.
							</p>
							<div style={ButtonCSS}>
								<Link to={{pathname:"/payment"}}>
									<p>Proceed to payment page</p>
								</Link>
							</div>
						</div>:
						<React.Fragment>
							{userInformation()}
							<hr style={HorizontalLineCSS}/>
							<AdContent
								adDisplayOptionType={adDisplayOptionType}
							/>
						</React.Fragment>
					}
				</AdsContainer>
			</Container>
		</AdProvider>
	)
}


export default Ads;