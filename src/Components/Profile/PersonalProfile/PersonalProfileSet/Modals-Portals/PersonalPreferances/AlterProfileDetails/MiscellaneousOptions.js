import React,{useEffect} from "react";
import styled from "styled-components";
import {
	retrieveAirPlaneEnabledStatus
} from "../../../../../../../Actions/Requests/ProfileAxiosRequests/ProfileGetRequests.js";
import {
	alterAirPlaneEnabledStatus
} from "../../../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {useSelector} from "react-redux";

const Container=styled.div`
	position:absolute;
	@media screen and (min-width:2500px){
		margin-left:-5%;
	}
`;

const BackButton={
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

const MiscellaneousOptions=({closeModal})=>{
	const {id}=useSelector(state=>state.personalInformation);
	useEffect(()=>{
		const fetchData=async()=>{
			const {confirmation,data}=await retrieveAirPlaneEnabledStatus(id);
			if(confirmation=="Success"){
				const {message}=data;
				document.getElementById("checkBox").checked=message;
			}
		}
		fetchData();
	},[]);

	const updateEnabledStatus=async()=>{
		const updatedCheckBoxStatus=document.getElementById("checkBox").checked;
		const {confirmation,data}=await alterAirPlaneEnabledStatus(id,updatedCheckBoxStatus);
		if(confirmation=="Success"){
			alert('AirPlane status updated');
			closeModal();
		}else{
			alert('Unfortunately an error has occured when updating airplane status. Please try again');
		}
	}
	return(
		<Container>	
			<div style={BackButton} onClick={()=>closeModal()}>
				Back
			</div>
			<div style={{display:"flex",flexDirection:"row",marginTop:"10%",width:"150%"}}>
				<input id="checkBox" type="checkbox"
					onChange={()=>updateEnabledStatus()}/>
				<p style={{marginLeft:"10%"}}>
					<b>Enable people to see your airplanes</b>
				</p>
			</div>
		</Container>
	)
}


export default MiscellaneousOptions;