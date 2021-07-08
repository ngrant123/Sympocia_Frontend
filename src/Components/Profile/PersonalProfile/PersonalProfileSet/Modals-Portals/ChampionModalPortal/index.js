import React,{useEffect,useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import DescriptionModal from "./DescriptionModal.js";


const Container=styled.div`
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
		height:70%;
		top:15%;
		justify-content:center;
    }
`;
const SponsorModal=styled.div`
	display:flex;
	flex-direction:column;
	align-items:center;
	margin-left:-5%;

	padding:10%;

    @media screen and (max-width:650px){
    	padding:5%;
	    #sponsoreModalUL{
	    	margin-left:-20% !important;
	    }
	    #championTitleName{
	    	font-size:18px !important;
	    	width:100% !important;
	    }
	    #secondaryDescription{
	    	display:none !important;
	    }
	    #tertianryDescription{
	    	display:none !important;
	    }

	    #mobileHorizontalLine{
	    	display:block !important;
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
	border-width:1px;
	transition:.8s;
	background-color:white;
	color:#5298F8;
	cursor:pointer;

	&:hover{
		background-color:#0101DF;
	}

	@media screen and (max-width:1370px){
		margin-left:-5% !important;
	}

	@media screen and (max-width:650px){
		margin-left:0% !important;
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

const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
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
		
		const maxFileSize=7000*1024;
		if(image.size>maxFileSize){
			alert('Your file is too large. We only accept images that have a size of 250KB. You can go to preview (Mac) and lower the resolution there.');
		}else{
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
	}

	const displayUploadImageSearchProfileScreen=()=>{
		changeChangeDescriptionScreen(!displayDescriptionScreen)
	}

	return createPortal(
		<React.Fragment>
			<Container>
				{displayDescriptionScreen==false?
					<SponsorModal displayDescriptionScreen={displayDescriptionScreen}>
						<div style={{display:"flex",alignItem:"center"}}>
							<p id="championTitleName" style={{fontSize:"24px"}}>
								<b>Champion someone</b>
							</p>
						</div>
						<p id="secondaryDescription" style={{color:"#A4A4A4",marginBottom:"5%"}}>
							Nows your chance to show your appreciation for someone
						</p>
						
						<hr id="mobileHorizontalLine" style={HorizontalLineCSS}/>
						<UploadPicture onClick={()=>handleDisplayImagePrompt()}>
							Upload picture
						</UploadPicture>
						
						<input type="file" name="img" id="imageFile" style={{width:"5%",opacity:"0"}} onChange={()=>displayImage()}  
					        accept="application/msword,image/gif,image/jpeg,application/pdf,image/png,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/zip,.doc,.gif,.jpeg,.jpg,.pdf,.png,.xls,.xlsx,.zip" 
					        name="attachments">
					    </input>		
					</SponsorModal>:
					<DescriptionModal
						imgData={imageData}
						backButton={displayUploadImageSearchProfileScreen}
						closeModal={props.closeModal}
						profileType={props.profileType}
					/>
				}
			</Container>
			<ShadowContainer onClick={()=>props.closeModal()}/>
		</React.Fragment>
	,document.getElementById("personalContainer"));
}

export default SponsorPortal;