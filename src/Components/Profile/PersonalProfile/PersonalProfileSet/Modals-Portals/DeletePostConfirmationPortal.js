import React from "react";
import styled from "styled-components";
import {useSelector} from "react-redux";
import {createPortal} from "react-dom";
import {deleteChampion} from "../../../../../Actions/Requests/ProfileAxiosRequests/ProfilePostRequests.js";
import {UserConsumer} from "../../UserContext.js";


const Container=styled.div`
	position:fixed;
	width:25%;
	height:50%;
	background-color:white;
	z-index:45;
	top:20%;
	border-radius:5px;
	left:40%;
	display:flex;
	flex-direction: column;
	padding:30px;
`;

const ConfirmationContainer=styled.div`
	display:flex;
	flex-direction:row;
`;

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:40;
	top:0px;
`;

const ConfirmationButtonCSS={
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"10px",
	color:"#3898ec",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	marginBottom:"2%",
	cursor:"pointer",
	marginRight:"2%"
}

const DeletePostConfirmationPortal=({postType,content,closeModal})=>{
	const userId=useSelector(state=>state.personalInformation.id);
	const handleDelete=(personalInformation)=>{
		if(postType=="Champion")
			handleDeleteChampion(personalInformation);
		else
			handleDeletePost(personalInformation);
	}

	const handleDeleteChampion=async(personalInformation)=>{
		const {confirmation,data}=await deleteChampion({userId});
		if(confirmation=="Success"){
			personalInformation.deleteChampionModal({
				name:"",
				description:""
			})
			closeModal();
		}else{
			alert('There was an error deleting your champion. Please try again');
		}
	}

	const handleDeletePost=async()=>{

	}

	return createPortal(
		<UserConsumer>
			{personalInformation=>{
				return <>
						<Container>
							<p style={{fontSize:"20px"}}>
								<b>Are you sure you want to delete this {postType=="Champion"?"champion":"post"}? </b>
							</p>
							<hr/>
							<ConfirmationContainer>
								<p onClick={()=>handleDelete(personalInformation)} style={ConfirmationButtonCSS}> Yes </p>
								<p onClick={()=>closeModal()} style={ConfirmationButtonCSS}> No </p>
							</ConfirmationContainer>
						</Container>
						<ShadowContainer
							onClick={()=>closeModal()}
						/>
					</>
			}}
		</UserConsumer>
		,document.getElementById("personalContainer"))
}

export default DeletePostConfirmationPortal;