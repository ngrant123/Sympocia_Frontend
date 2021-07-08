import React,{useEffect,useState} from "react";
import styled from "styled-components";
import {getOligarchPerSymposium} from "../../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import NoProfilePicture from "../../../../../designs/img/NoProfilePicture.png";
import {Link} from "react-router-dom";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const OligarchsContainer=styled(Link)`
	display:flex;
	flex-direction:row;

	@media screen and (max-width:650px){
		#oligarchName{
			font-size:18px !important;
		}
	}
`;


const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%",
	marginTop:"5%",
	marginBottom:"5%",
	backgroundColor:"#EAEAEA",
	height:"1px"
}


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
  marginRight:"4%",
  cursor:"pointer",
  width:"30%",
  marginBottom:"5%",
  display:"none"
}


const CurrentOligarchs=({symposiumId,closeModal})=>{
	const [isLoading,changeIsLoading]=useState(false);
	const [oligarchs,changeOligarchs]=useState([]);
	useEffect(()=>{
		const fetchOligarchsResults=async()=>{
			changeIsLoading(true);
			const {confirmation,data}=await getOligarchPerSymposium(symposiumId);
			if(confirmation=="Success"){
				const {message}=data;
				changeOligarchs(message);
			}else{
				alert('Unfortunately there has been an error retrieving oligarchs for this symposiums. Please try again');
			}
			changeIsLoading(false);
		}
		fetchOligarchsResults();
	},[]);

	const oligarchDisplay=(data)=>{
		return(
			<OligarchsContainer to={{pathname:`/profile/${data.profileId}`}}>
				<img id="oligarchsProfilePicture" src={data.profilePicture==null?
							NoProfilePicture:data.profilePicture}
					style={{marginLeft:"5%",width:"50px",height:"50px",borderRadius:"50%"}}
				/>
				<p id="oligarchName" style={{marginLeft:"20%",fontSize:"24px"}}>
					<b>{data.firstName}</b>
				</p>
			</OligarchsContainer>
		)
	}


	return(
		<React.Fragment>
			<div id="backButtonCurrentOligarchs" style={ButtonCSS} onClick={()=>closeModal()}>
				Back
			</div>
			<p style={{fontSize:"20px"}}>
				<b>Current Oligarchs</b>
			</p>
			<div style={HorizontalLineCSS}/>
			<div style={{marginTop:"2%"}}>
				{isLoading==true?
					<p>Loading...</p>:
					<React.Fragment>
						{oligarchs.length==0?
							<p>No oligarchs</p>:
							<React.Fragment>
								{oligarchs.map(data=>
									<React.Fragment>
										{oligarchDisplay(data)}
									</React.Fragment>
								)}
							</React.Fragment>
						}
					</React.Fragment>
				}
			</div>
		</React.Fragment>
	)
}

export default CurrentOligarchs;