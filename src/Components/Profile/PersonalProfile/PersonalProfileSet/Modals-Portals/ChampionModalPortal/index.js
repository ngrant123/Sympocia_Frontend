import React,{useEffect,useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import DescriptionModal from "./DescriptionModal.js";

const SponsorModal=styled.div`
	position:fixed;
	width:40%;
	height:60%;
	background-color:white;
	z-index:41;
	top:20%;
	border-radius:5px;
	left:30%;
	overflow:auto;

	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;

    }

    @media screen and (max-width:600px){
	    #sponsoreModalUL{
	    	margin-left:-20% !important;
	    }
    }
`;

const ShadowContainer= styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.4);
	z-index:40;
	top:0px;
`;

const UploadPicture=styled.div`
	position:relative;
	padding:10px;
	text-align:center;
	border-radius:5px;
	border-style:solid;
	border-color:#5298F8;
	left:25%;
	border-width:1px;
	transition:.8s;
	background-color:white;
	color:#5298F8;
	width:40%;

	&:hover{
		background-color:#0101DF;
	}

`;


const LocationStyle = {
	position:'relative',
	left:'5%',
	width:'50%',
	top:'35%',
	height:'10%',
	textAlign:'center',
	borderRadius:'5px',
	marginLeft:"15%",
	marginBottom:"7%"
}


const SponsorPortal=(props)=>{
	
	var parentDiv;
	if(props.profileType=="Company"){
		parentDiv=document.getElementById("companyProfileContainer");
	}else{
		parentDiv=document.getElementById("personalContainer");
	}
	const [imageData,changeImageData]=useState();
	const [displayDescriptionScreen,changeChangeDescriptionScreen]=useState(false);

	useEffect(()=>{

	});

	const handleDisplayImagePrompt=()=>{
		document.getElementById("imageFile").click();
	}

	const displayImage=()=>{
		
		var reader=new FileReader();
		var image=document.getElementById("imageFile").files[0];

		reader.onloadend=()=>{
			const imageData=reader.result;
			changeChangeDescriptionScreen(!displayDescriptionScreen);
			changeImageData(imageData);
		}

		if(image==null){
			alert("This image type is not supported ");
		}else{
			reader.readAsDataURL(image);
		}
	}

	const displayUploadImageSearchProfileScreen=()=>{
		changeChangeDescriptionScreen(!displayDescriptionScreen)
	}

	return createPortal(
		<React.Fragment>
			<SponsorModal>	
				{displayDescriptionScreen==false?
					<ul id="sponsoreModalUL" style={{paddingTop:"90px"}}>
						{/*
							<p style={{marginLeft:"30%",color:"#6E6E6E"}}><b>Search for someone through here</b></p>
							<input id="locations" list="locationcategories" style={LocationStyle} placeholder="Search for someone"/>
										<datalist id="locationcategories" style={{height:"40px"}}>
												<option value="Testing1"/>
												<option value="Testing2"/>
												<option value="Testin3"/>
										</datalist>	
							<hr/>
							<p style={{marginLeft:"45%",marginBottom:"7%"}}>Or</p>
						*/}
						<p style={{marginLeft:"20%",fontSize:"40px"}}><b>Champion someone</b></p>
						<p style={{color:"#A4A4A4",marginLeft:"13%",marginBottom:"5%"}}>Nows your chance to show your appreciation for someone</p>
						
						<p style={{marginLeft:"15%",color:"#6E6E6E"}}><b>Upload a picture of someone and describe why they're great</b></p>
						
						<a href="javascript:void(0)" style={{textDecoration:"none"}}>
							<UploadPicture onClick={()=>handleDisplayImagePrompt()}>
								Upload picture
							</UploadPicture>
						</a>
						
						<input type="file" name="img" id="imageFile" style={{opacity:"0"}} onChange={()=>displayImage()}  
					        accept="application/msword,image/gif,image/jpeg,application/pdf,image/png,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/zip,.doc,.gif,.jpeg,.jpg,.pdf,.png,.xls,.xlsx,.zip" 
					        name="attachments">
					    </input>					
					</ul>:
					<DescriptionModal
						imgData={imageData}
						backButton={displayUploadImageSearchProfileScreen}
						closeModal={props.closeModal}
						profileType={props.profileType}
					/>
				}
			</SponsorModal>
			<ShadowContainer onClick={()=>props.closeModal()}/>
		</React.Fragment>
	,document.getElementById("personalContainer"));
}

export default SponsorPortal;