import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import {Link} from "react-router-dom";
import {getRecruits} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {removeRecruitProfileIsFollowing} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
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
	@media screen and (min-width:2500px){
		height:50%;
		width:50%;
		left:25%;

		#profilePicture{
			width:190px !important;
			height:190px !important;
		}
		#recruitsFirstName{
			font-size:48px !important;
		}
		#backButton{
			font-size:24px !important;
		}
		#removeRecruitTextOption{
			margin-top:5% !important;
			font-size:48px !important;
		}
		#removeRecruitOptions{
			margin-top:5%;
			font-size:36px !important;
		}
	}


	@media screen and (max-width:1370px){
		width:60% !important;
		left:20% !important;
		height:60%;
    }

    @media screen and (max-width:700px){
		width:90% !important;
		left:5% !important;
		height:60%;
    }

     @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	height:60%;
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
const ViewProfile=styled(Link)`
	width:25%;
    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
	  #profilePicture{
	  	height:50px !important;
	  }
    }
`;


const RecruitsOptionsCSS={
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


const RecruitsNameCSS={
	listStyle:"none",
	display:"inline-block",
	fontSize:"20px",
	maxWidth:"40%",
	maxHeight:"50px",
	overflow:"hidden"
}

/*
	So right now I was planning on going with the idea that if someone either recruits
	you or you recruit them it doesnt matter they automatically are considered "recruits".
	Then the user can either remove people who recruited you or you recruited but right now 
	ill just focus on the people who you recruited yourself
*/
const RecruitsPortal=({isOwner,closeModal,userId})=>{
	const [recruits,changeRecruits]=useState([]);
	const [recruitsProfileFollows,changeRecruitsFollowing]=useState([]);
	const [recruitsThatFollowProfile,changeRecruitsNotFollowing]=useState([]);
	const [displayRemoveRecruitsVerification,changeDisplayRemoveRecruitsModal]=useState(false);
	const [selectedRecruit,changeSelectedRecruit]=useState();
	const [isLoadingData,changeIsLoadingStatus]=useState(false);
	const [processingSubmittion,changeIsSubmittionProcessing]=useState(false);
	const dispatch=useDispatch();
	const personalInformation=useSelector(state=>state.personalInformation);

	useEffect(()=>{
		const getRecruitsFromDB=async()=>{
			changeIsLoadingStatus(true);
			const {confirmation,data}=await getRecruits(userId);
			if(confirmation=="Success"){
				const {message}=data;
				const {
					recruits,
					recruitsFollowing
				}=message;
				changeRecruits(recruitsFollowing);
				//recruitsProfileFollows(recruits);

			}else{
				alert('Unfortunately there has been an error trying to get your recruits. Please try again');
			}
			changeIsLoadingStatus(false);
		}
		getRecruitsFromDB();
	},[]);

	const displayRemoveRecruitModal=(selectedData)=>{
		changeSelectedRecruit(selectedData);
		changeDisplayRemoveRecruitsModal(true);
	}

	const removeRecruit=async({isAccessTokenUpdated,updatedAccessToken})=>{
		const {_id}=selectedRecruit;
		changeIsSubmittionProcessing(true);
		const {confirmation,data}=await removeRecruitProfileIsFollowing({
				personalProfileId:userId,
				targetProfile:_id,
				accessToken:isAccessTokenUpdated==true?updatedAccessToken:
				personalInformation.accessToken
			});
		if(confirmation=="Success"){
			for(var i=0;i<recruits.length;i++){
				if(recruits[i]._id==_id){
					recruits.splice(i,1);
				}
			}
			changeDisplayRemoveRecruitsModal(false);
			changeRecruits([...recruits]);
		}else{
			const {statusCode}=data;
			if(statusCode==401){
				await refreshTokenApiCallHandle(
						personalInformation.refreshToken,
						personalInformation.id,
						removeRecruit,
						dispatch,
						{},
						false
					);
			}else{
				alert('Unfortunately an error has occurred when tryin to delete this recruit. Please try again');
			}
		}
		changeIsSubmittionProcessing(false);
	}

	return createPortal(
		<>
			<ShadowContainer
				onClick={()=>closeModal()}
			/>
			<Container>
				{displayRemoveRecruitsVerification==false?
					<ul style={{padding:"20px"}}>
						{/*
							<InputContainer
								placeholder="Search through you recruits"
							/>
						*/}
						<hr/>
						{isLoadingData==true?
							<p>Please wait... </p>:
							<li style={{listStyle:"none"}}>
								{recruits.length==0?
									<p>No recruits</p>:
									<div style={{display:"flex",flexDirection:"column"}}>
										{recruits.map(data=>	
											<>
												<div style={{display:"flex",flexDirection:"row",alignItems:"center"}}>
													<ViewProfile to={{pathname:`/profile/${data._id}`}}>
														<img id="profilePicture" src={data.profilePicture==null?NoProfilePicture:data.profilePicture}
															style={{borderRadius:"50%",width:"55px",height:"50px"}}
														/>
													</ViewProfile>
													<li id="recruitsFirstName" style={RecruitsNameCSS}>
														{data.firstName}
													</li>
													{isOwner==true &&(
														<li onClick={()=>displayRemoveRecruitModal(data)} 
															style={{listStyle:"none",display:"inline-block",width:"10%",cursor:"pointer"}}>
															<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler
																 icon-tabler-circle-x" width="44" height="44" viewBox="0 0 24 24" 
																 stroke-width="1.5" stroke="#F44336" fill="none" stroke-linecap="round"
																 stroke-linejoin="round">
															  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
															  <circle cx="12" cy="12" r="9" />
															  <path d="M10 10l4 4m0 -4l-4 4" />
															</svg>
														</li>
													)}
												</div>
												<hr/>
											</>
										)}
									</div>
								}
							</li>
						}
						{/*
							<li style={{listStyle:"none",display:"inline-block",width:"100%",marginBottom:"5%"}}>
								<ul style={{padding:"0px"}}>
									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li style={RecruitsOptionsCSS}>
											Best Recruits
										</li>
									</a>

									<a href="javascript:void(0);" style={{textDecoration:"none"}}>
										<li style={RecruitsOptionsCSS}>
											Newest
										</li>
									</a>
								</ul>
							</li>
						*/}
					</ul>
					:
					<ul style={{padding:"20px"}}>
						{processingSubmittion==true?
							<p>Please wait... </p>:
							<>
								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li id="backButton"
										onClick={()=>changeDisplayRemoveRecruitsModal(false)} style={RecruitsOptionsCSS}>
										Back
									</li>
								</a>
								<p id="removeRecruitTextOption" style={{marginTop:"15%"}}> 
									Are you sure you want to remove {selectedRecruit.firstName}? 
								</p>

								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li id="removeRecruitOptions"
										onClick={()=>removeRecruit({isAccessTokenUpdated:false})} style={RecruitsOptionsCSS}>
										Yes
									</li>
								</a>

								<a href="javascript:void(0);" style={{textDecoration:"none"}}>
									<li id="removeRecruitOptions"
										onClick={()=>changeDisplayRemoveRecruitsModal(false)} style={RecruitsOptionsCSS}>
										No
									</li>
								</a>
							</>
						}
					</ul>
				}
			</Container>
		</>
	,document.getElementById("personalContainer"))
}

export default RecruitsPortal;