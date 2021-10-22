import React from "react";
import styled from "styled-components";
import {
	alterProfileToSymposiumRelationship
} from "../../../../../Actions/Requests/ExplorePageRequests/ExplorePageAdapter.js";
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;
	margin-bottom:2%;
	margin-right:2%;


	@media screen and (min-width:1900px){
		padding:10px !important;
		font-size:20px !important;
    }

    @media screen and (min-width:2500px){
		padding:50px !important;
		font-size:40px !important;
    }

    @media screen and (max-width:1370px) {
    	margin-left:5% !important;
	}

	@media screen and (max-width:650px){
		width:95% !important;
		margin-left:0% !important;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		width:70% !important;
		margin-left:17% !important;
    }

    @media screen and (max-width:700px) and (max-height:650px) and (orientation:landscape){
		margin-left:15% !important;
    }


    @media screen and (max-width:600px) and (max-height:380px) and (orientation:landscape){
		width:95% !important;
		margin-left:0% !important;
    }

`;

const Container=styled.div`
	display:flex;
	flex-direction:column;

	@media screen and (max-width:650px){
		#submitButton{
			width:35% !important;
		}
	}
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
	marginBottom:"2%",
	width:"20%"
}

const HelpIconOptionsCSS={
	borderStyle:"none",
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

const EditRelationshipValue=({closeModal,symposiumData,userId,updateRelationShipValue})=>{
	const {
		symposiumName,
		symposiumId,
		relationshipValue
	}=symposiumData;

	const editRelationshipValue=async()=>{
		let updatedRelationshipValue=parseInt(document.getElementById("relationshipValue").value);
		if(updatedRelationshipValue.toString()!='NaN'){
			const {confirmation,data}=await alterProfileToSymposiumRelationship(
				userId,
				symposiumId,
				updatedRelationshipValue
			);
			if(confirmation=="Success"){
				alert('Value updated');
				updateRelationShipValue(symposiumId,updatedRelationshipValue);
				closeModal();
			}else{
				alert('Unfortunately there has been an error when updating this relationship value. Please try again');
			}
		}else{
			alert("Please enter a number");
		}
	}
	return(
		<Container>
			<div style={ButtonCSS} onClick={()=>closeModal()}>
				Back
			</div>
			<div style={{display:"flex",flexDirection:"row"}}>
				<p style={{width:"80%"}}>
					Edit the relationship value between your user feed and this symposium.
					Click on the question mark to learn more
				</p>
				<div class="btn-group">
					<button class="btn btn-primary dropdown-toggle" type="button" 
						data-toggle="dropdown" style={HelpIconOptionsCSS}>
						<HelpOutlineOutlinedIcon style={{fontSize:"25"}}/>
					</button>
					<ul class="dropdown-menu" style={{marginLeft:"-100px",padding:"10px"}}>
						<li style={{cursor:"pointer"}}>
							<p>
								If your relationship value is high then you will be recommended posts
								by people with high relationship values also (presumably ensuring higher quality
								posts). If you relationship value is low then you will be recommended more posts 
								by people who just started posting in that symposium (presumably ensuring lower 
								quality). Quantity over quality is the issue here
							</p>
						</li>
					</ul>
				</div>	
			</div>
			<hr/>
			<p>Symposium name:<b>{symposiumName}</b></p>
			<InputContainer id="relationshipValue" placeholder="Please enter a relationship value here"/>
			<div id="submitButton" style={ButtonCSS} onClick={()=>editRelationshipValue()}>
				Submit
			</div>
		</Container>
	)
}

export default EditRelationshipValue;