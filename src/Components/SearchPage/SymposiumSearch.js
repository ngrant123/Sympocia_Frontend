import React,{useState,useEffect} from "react";
import styled,{keyframes} from "styled-components";

import SymposiumContainer from "../Symposium/SymposiumList/CommunityContainer.js";
import {getSymposiumsFromSearch} from "../../Actions/Requests/SearchPageAxiosRequests/index.js";
import LoadingScreen from "../../LoadingAnimation.js";
import NoResultsModal from "./NoResultsModal.js";

const Container=styled.div`
	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
		#symposiumsLI{
			margin-bottom:30% !important;
		}
    }
`;
const CommunityContainerAnimationFollowed=styled.div`

	position:relative;
	width:80%;
	height:300px;
	transition: transform 300ms ease-in-out;
	border-radius:5px;

	@media screen and (max-width:1370px){
		height:35ss0px;
		width:200% !important;
		margin-top:25% !important;
	}

	@media screen and (max-width:800px){
		margin-top:10% !important;
		width:80% !important;
	}

	@media screen and (max-width:740px){
		width:80% !important;
		margin-left:-15% !important;
	}
	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
	 	width:100% !important;
	 	margin-top:10% !important;
    }
    @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	margin-left:-5% !important;
    }

`;
 const keyFrame= keyframes`
  0% {
	left:110%;
  }
  100% {
    left:20%;

  }
`;

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

const SymposiumSearch=({searchQuery,userId,history})=>{
	const [symposiums,changeSymposiums]=useState([]);
	const [selectedSymposium,changeSelectedSymposium]=useState();
	const [isLoading,changeIsLoading]=useState(true);
	const [displayMobileUI,changeUIStatus]=useState(false);

	useEffect(()=>{
		const getSymposiums=async()=>{
			const {confirmation,data}=await getSymposiumsFromSearch(searchQuery);
			if(confirmation=="Success"){
				changeSymposiums(data);
				changeIsLoading(false);
			}else{
				alert('Unfortunately there has been an error trying to get the profiles. Please try again');
			}
		}
		getSymposiums();
	},[]);

	useEffect(()=>{
		triggerUIChange();
	},[]);
	window.addEventListener('resize',triggerUIChange)

	const triggerUIChange=()=>{
		if(window.innerWidth<960){
			changeUIStatus(true);

		}else{
			changeUIStatus(false);
		}
	}

	const handleSymposiumClick=(data)=>{
		var symposiums=[];

		for(var i=0;i<symposiums.length;i++){
			const currentSymposium=symposiums[i];
			if(currentSymposium.symposium!=data.symposium){
				symposiums.push(currentSymposium);
			}
		}

		history.push({
		  pathname:`/symposium/${data.symposium}`,
		  state: {
		  	selectedSymposium:data,
			symposiums:symposiums,
			profileId:userId
		  }
		});
	}

	return(
		<>
			{isLoading==true?
				<LoadingScreen/>
				:<Container>
					<ul style={{padding:"0px"}}>
						{/*
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li style={SymposiumOptionButton}>
									Most Popular
								</li>
							</a>
						*/}
						<hr/>
						{symposiums.length==0?
							<NoResultsModal/>:
							<li style={{listStyle:"none"}}>
								<ul style={{padding:"0px"}}>
									{symposiums.map(data=>
										<>
											<li id="symposiumsLI" style={{listStyle:"none",marginBottom:"5%"}}>
												<CommunityContainerAnimationFollowed>
													<SymposiumContainer
														data={data}
														isPersonalProfile={true}
														handleSymposiumClickHandler={handleSymposiumClick}
														isMobileView={displayMobileUI}
													/>
												</CommunityContainerAnimationFollowed>
											</li>
											<hr/>
										</>
									)}
								</ul>
							</li>
						}
					</ul>
				</Container>
			}
		</>
	)
}

export default SymposiumSearch;