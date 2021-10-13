import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {
	getSymposiumSpecialists,
	getProfileToSpecialistRankingInteractionStatus
} from "../../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import {
	incrementSpecialistRanking,
	decrementSymposiumSpecialistRanking
} from "../../../../../../Actions/Requests/SymposiumRequests/SymposiumAdapter.js";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";


const Container=styled.div`
	width:100%;
	height:100%;
	padding:10px;
`;


const InputContainer=styled.textarea`
	width:100%;
	resize:none;
	padding:5px;
	height:50px;
	padding-top:15px;
	border-style:solid;
	border-width:1px;
	border-color:#F1F0F0;
`;

const ButtonCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	color:"#3898ec",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	cursor:"pointer",
	width:"20%"
}


const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}


const SymposiumSpecialistsExtended=({closeModal,selectedSymposiumSpecialist,currentSymposiumId})=>{
	const [specialists,changeSpecialists]=useState([]);
	const [highlightedSpecialist,changeHighLightedSpecialist]=useState(selectedSymposiumSpecialist);

	useEffect(()=>{
		const fetchData=async()=>{
			if(highlightedSpecialist==null){
				const{confirmation,data}=await getSymposiumSpecialists(currentSymposiumId);
				if(confirmation=="Success"){
					const {message}=data;
					changeSpecialists([...message]);
				}else{	
					alert('Unfortunately there has been an error retrieving this symposims specialists. Please try again');
				}
			}
		}
		fetchData();
	},[]);	

	const triggerBackButton=()=>{
		if(selectedSymposiumSpecialist==null){
			changeHighLightedSpecialist(null);
		}else{
			closeModal();
		}
	}

	const updateReputationScore=async()=>{

		const reputationUpdateParams={
			reputationScore:highlightedSpecialist.ranking,
            specialistId:highlightedSpecialist._id,
            symposiumId:currentSymposiumId
		}
		
	}

	return(
		<Container>
			{highlightedSpecialist==null?
				<React.Fragment>
					<p style={{fontSize:"25px"}}>
						<b>Photography Specialists</b>
					</p>
					<hr/>
					<InputContainer
						placeholder="Search specialists here"
					/>
					<div style={{...ButtonCSS,marginTop:"2%",marginBottom:"5%"}}>
						Create
					</div>
					{specialists.map(data=>
						<React.Fragment>
							<div style={{display:"flex",flexDirection:"row",cursor:"pointer"}}
								onClick={()=>changeHighLightedSpecialist(data)}>
								<img src={data.profilePicture==null?NoProfilePicture:data.profilePicture}
									style={{width:"50px",height:"50px",borderRadius:"50%"}}
								/>
								<div style={{display:"flex",flexDirection:"column",marginLeft:"2%"}}>
									<div style={{display:"flex",flexDirection:"row"}}>
										<p>
											<b>{data.firstName}</b>
										</p>
										<p style={{marginLeft:"2%",color:"#B38AFF"}}>Rank: {data.ranking}</p>
									</div>
									<p style={{maxHeight:"40px",overflow:"hidden"}}>
										{/*{data.introduction}*/}
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
										 labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
										 laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
										 voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
										  non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
									</p>
								</div>
							</div>
							<hr/>
						</React.Fragment>
					)}
				</React.Fragment>:
				<React.Fragment>
					<div style={ButtonCSS} onClick={()=>triggerBackButton()}>
						Back
					</div>
					<div style={{display:"flex",flexDirection:"column",marginTop:"10%"}}>
						<div style={{display:"flex",flexDirection:"row"}}>
							<img src={highlightedSpecialist.profilePicture==null?NoProfilePicture:highlightedSpecialist.profilePicture}
								style={{width:"70px",height:"70px",borderRadius:"50%"}}
							/>
							<div style={{display:"flex",flexDirection:"column",marginLeft:"5%"}}>
								<p>
									<b>{highlightedSpecialist.firstName}</b>
								</p>
								<p style={{marginLeft:"2%",color:"#B38AFF"}}>Rank: {highlightedSpecialist.ranking}</p>
							</div>
						</div>
						<hr style={HorizontalLineCSS}/>
						<p style={{maxHeight:"40px",overflow:"hidden"}}>
							{/*{highlightedSpecialist.introduction}*/}
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							 labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
							 laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
							 voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
							  non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
					</div>

					<div style={ButtonCSS}>
						+ Reputation
					</div>
				</React.Fragment>
			}
		</Container>
	)
}


export default SymposiumSpecialistsExtended;