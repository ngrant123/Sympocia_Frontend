import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {removeSymposium} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {getSymposiumsFollowedPersonal} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {refreshTokenApiCallHandle} from "../../../../../Actions/Tasks/index.js";
import {useSelector,useDispatch} from "react-redux";

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:40;
	top:0px;
`;

const Container=styled.div`
	position:fixed;
	width:25%;
	height:50%;
	background-color:white;
	z-index:40;
	top:20%;
	border-radius:5px;
	left:40%;
	overflow-y:auto;
	@media screen and (max-width:1030px){
		width:40% !important;
		left:30% !important;
    }
    @media screen and (max-width:600px){
		width:90% !important;
		left:5% !important;
    }
`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	width:90%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;

const SymposiumsOptionsCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"3%"
}

const FollowedSymposiumsModal=({isOwner,closeModal,userId})=>{
	const [symposiums,changeSymposiums]=useState([]);
	const [displayRemoveSymposiumVerification,changeDisplayRemoveSymposiumModal]=useState(false);
	const [selectedSymposium,changeSelectedSymposium]=useState();
	const personalInformation=useSelector(state=>state.personalInformation);
	const [isLoadingData,changeIsLoadingStatus]=useState(false);
	const dispatch=useDispatch();

	useEffect(()=>{
		const getSymposiums=async()=>{
			changeIsLoadingStatus(true);
			const {confirmation,data}=await getSymposiumsFollowedPersonal(userId);
			if(confirmation=="Success"){
				changeSymposiums(data);
			}else{
				alert('Unfortunately there has been an error trying to get your symposiums. Please try again');
			}
			changeIsLoadingStatus(false);
		}
		getSymposiums();
	},[]);
	const displayRemoveSymposiumModal=(data)=>{
		changeSelectedSymposium(data);
		changeDisplayRemoveSymposiumModal(true);
	}

	const removeSymposiumTrigger=async({isAccessTokenUpdated,updatedAccessToken})=>{
		const {confirmation,data}=await removeSymposium({
			profileId:userId,
			symposium:selectedSymposium.symposium,
			accessToken:isAccessTokenUpdated==true?updatedAccessToken:
						personalInformation.accessToken
		});

		if(confirmation=="Success"){
			for(var i=0;i<symposiums.length;i++){
				if(selectedSymposium.symposium==symposiums[i].symposium){
					symposiums.splice(i,1);
					 break;
				}
			}
			changeSymposiums([...symposiums]);
			changeDisplayRemoveSymposiumModal(false);
		}else{
			debugger;
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						removeSymposiumTrigger,
						dispatch,
						{},
						false
					);
			}else{
				alert('Unfortunately there has been an error with removing this symposium. Please try again');
			}
		}
	}

	return createPortal(
			<>	
				<ShadowContainer
					onClick={()=>closeModal()}
				/>
				<Container>
					{displayRemoveSymposiumVerification==false?
						<ul style={{padding:"20px"}}>
							{isLoadingData==true?
								<p>Loading please wait...</p>:
								<React.Fragment>
									{/*
										<InputContainer
											placeholder="Search through your symposiums"
										/>
										<hr/>
										<li style={{listStyle:"none",display:"inline-block",width:"100%",marginBottom:"5%"}}>
											<ul style={{padding:"0px"}}>
												<a href="javascript:void(0);" style={{textDecoration:"none"}}>
													<li style={SymposiumsOptionsCSS}>
														Best Recruits
													</li>
												</a>

												<a href="javascript:void(0);" style={{textDecoration:"none"}}>
													<li style={SymposiumsOptionsCSS}>
														Newest
													</li>
												</a>
											</ul>
										</li>
									*/}
									<li style={{listStyle:"none"}}>
										<ul style={{padding:"0px"}}>
											{symposiums.map(data=>	
												<>
													<li style={{listStyle:"none",width:"100%"}}>
														<ul style={{padding:"0px",width:"100%"}}>
															<li style={SymposiumsOptionsCSS}>
																{data.symposium}
															</li>

															{isOwner==true &&(
																<a href="javascript:void(0);" style={{textDecoration:"none"}}>
																	<li onClick={()=>displayRemoveSymposiumModal(data)} style={{listStyle:"none",display:"inline-block",width:"10%"}}>
																		<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler
																			 icon-tabler-circle-x" width="44" height="44" viewBox="0 0 24 24" 
																			 stroke-width="1.5" stroke="#F44336" fill="none" stroke-linecap="round"
																			 stroke-linejoin="round">
																		  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
																		  <circle cx="12" cy="12" r="9" />
																		  <path d="M10 10l4 4m0 -4l-4 4" />
																		</svg>
																	</li>
																</a>
															)}
														</ul>
													</li>
													<hr/>
												</>
											)}
										</ul>
									</li>
								</React.Fragment>
							}
						</ul>
						:
						<ul style={{padding:"20px"}}>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li onClick={()=>changeDisplayRemoveSymposiumModal(false)} style={SymposiumsOptionsCSS}>
									Back
								</li>
							</a>
							<p style={{marginTop:"15%"}}> Are you sure you want to remove {selectedSymposium.symposium}? </p>

							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li onClick={()=>removeSymposiumTrigger({isAccessTokenUpdated:false})} style={SymposiumsOptionsCSS}>
									Yes
								</li>
							</a>

							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<li onClick={()=>changeDisplayRemoveSymposiumModal(false)} style={SymposiumsOptionsCSS}>
									No
								</li>
							</a>

						</ul>
					}
				</Container>
			</>
	,document.getElementById("personalContainer"));
}

export default FollowedSymposiumsModal;