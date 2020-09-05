import React from "react";
import styled from "styled-components";
import {createGroupVideoCall} from "../../../../../../../Actions/Requests/HomePageAxiosRequests/HomePagePostRequests.js";
import {useSelector} from "react-redux";

const Container=styled.div`
	position:fixed;
	width:65%;
	height:70%;
	background-color:white;
	border-radius:5px;
	z-index:31;
	top:10%;
	left:20%;
	overflow-y:auto;
`;

const TitleInputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	height:10%;
	width:90%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	margin-bottom:5%;
`;

const DescriptionTitleContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	height:25%;
	width:90%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
`;


const SubmitButton={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  top:"-50px"
}
const CreationModal=({closeModal,symposiumId,routerHistory})=>{
	const personalId=useSelector(state=>state.personalInformation.id);
	debugger;
	const submitModal=async()=>{
		const videoCall={
			title:document.getElementById("title").value,
			owner:personalId,
			description:document.getElementById("description").value,
			_id:symposiumId
		}
		const {confirmation,data}=await createGroupVideoCall(videoCall);
		if(confirmation=="Failure"){
			alert('Unfortunately and error has occured. Please try again');
		}else{
			routerHistory.push({
				pathname:`/groupVideoCall/${symposiumId}/${data}`,
				state:{
					ownerId:personalId
				}
			})
		}
	}

	return(
		<ul style={{padding:"30px"}}>
			<li style={{listStyle:"none"}}>
				<ul style={{padding:"0px"}}>
					<li style={{listStyle:"none",display:"inline-block",fontSize:"40px"}}>
						<b>
							Create a group video call
						</b>
					</li>
					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						<li onClick={()=>closeModal()} style={{listStyle:"none",display:"inline-block",marginLeft:"40%"}}>
							<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
								 width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2196F3" fill="none"
								  stroke-linecap="round" stroke-linejoin="round">
								  <path stroke="none" d="M0 0h24v24H0z"/>
								  <circle cx="12" cy="12" r="9" />
								  <path d="M10 10l4 4m0 -4l-4 4" />
							</svg>
						</li>
					</a>
				</ul>
			</li>
			<p>Please enter a title and description. After that we can get started</p>
			<hr/>

			<li style={{listStyle:"none"}}>
				<ul style={{padding:"25px"}}>
					<li style={{listStyle:"none",display:"inline-block",width:"70%"}}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none"}}>
								<TitleInputContainer id="title" placeholder="Please enter title here"/>
							</li>
							<li style={{listStyle:"none"}}>
								<DescriptionTitleContainer id="description" placeholder="Please enter description here"/>
							</li>
						</ul>
					</li>
					<a href="javascript:void(0);" style={{textDecoration:"none"}}>
						<li onClick={()=>submitModal()} style={SubmitButton}>
							Submit
						</li>
					</a>
				</ul>
			</li>
		</ul>
	)
}

export default CreationModal;

