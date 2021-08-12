import React,{useEffect,useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import DescriptionModal from "./DescriptionModal.js";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import {getProfilesFromSearch} from "../../../../../../Actions/Requests/SearchPageAxiosRequests/index.js";
import {SympociaProfileSearchTextArea} from "./DescriptionModalCSS.js";
import NoProfilePicture from "../../../../../../designs/img/NoProfilePicture.png";

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

	@media screen and (min-width:2500px){
		height:50%;
		width:50%;
		left:25%;
		padding:20px;

		#profilePicture{
			height:200px !important;
		}

		#profileFirstName{
			margin-top:5%;
			font-size:30px !important;
		}
	}


	@media screen and (max-width:1370px){
		width:90% !important;
		left:5% !important;
		height:70%;
		top:15%;
		justify-content:center;

		#profilePicture{
			width:65px !important;
			height:60px !important;
		}
    }

    @media screen and (max-width:650px){
    	top:0%;
    	left:0% !important;
    	width:100% !important;
    	height:100%;	
   		#profilePicture{
			width:45px !important;
			height:40px !important;
		}

		#mobileCloseButton{
			display:block !important;
		}
    }

    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	#profilePicture{
			width:65px !important;
			height:60px !important;
		}
    }
`;
const SponsorModal=styled.div`
	display:flex;
	flex-direction:column;
	align-items:center;
	margin-left:-5%;

	padding:10%;

	@media screen and (min-width:2500px){
	    #championTitleName{
	    	font-size:48px !important;
	    	width:100% !important;
	    }

	    #secondaryDescription{
	    	font-size:24px !important;
	    }
	}


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

	@media screen and (min-width:2500px){
		font-size:36px !important;
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

const BackButtonCSS={
	listStyle:"none",
	borderRadius:"5px",
	borderStyle:"solid",
	borderColor:"#5298F8",
	borderWidth:"1px",
	color:"#5298F8",
	width:"30%",
	padding:"10px",
	marginBottom:"5%",
	cursor:"pointer"
}


const SearchProfileContainerCSS={
	display:"flex",
	flexDirection:"column",
	width:"90px",
	marginRight:"3%",
	borderRadius:"5px",
	boxShadow:"1px 1px 10px #d5d5d5",
	padding:"10px"
}

const SelectedProfileButtonCSS={
	listStyle:"none",
	color:"#5298F8",
	borderRadius:"5px",
	borderColor:"#5298F8",
	borderStyle:"solid",
	borderWidth:"1px",
	padding:"10px",
	textAlign:"center",
	cursor:"pointer"
}

const ProfilePictureCSS={
	width:"80%",
	height:"55px",
	borderRadius:"50%",
	borderType:"solid",
	borderColor:"#5298F8",
	borderWidth:"1px"
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
	const [displayProfileTagModal,changeProfileTagModalDisplay]=useState(false);
	const [searchedProfiles,changeSearchedProfiles]=useState([]);
	const [loadingProfilesPrompt,changeLoadingProfilesPrompt]=useState(false);
	const [searchedProfile,changeSearchedProfile]=useState();

	const fetchProfileFromSearchUrl=async()=>{
		changeLoadingProfilesPrompt(true);
		const searchedProfile=document.getElementById("sympociaProfilesSearchUrl").value;
		const {confirmation,data}=await getProfilesFromSearch(searchedProfile);
		if(confirmation=="Success"){
			console.log(data);
			changeSearchedProfiles([...data]);
			changeLoadingProfilesPrompt(false);
		}else{
			alert('Unfortunately there has been an error trying to get the profiles. Please try again');
		}
	}


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

	const displayInitialScreen=()=>{
		changeProfileTagModalDisplay(false);
	}

	const selectPerson=(data)=>{
		const {
			firstName,
			profilePicture,
			_id
		}=data;
		changeImageData(profilePicture);
		changeSearchedProfile({
			firstName,
			profilePicture,
			_id
		});
		changeChangeDescriptionScreen(!displayDescriptionScreen);
	}
	const mobileCloseButton=()=>{
		return(
			<div id="mobileCloseButton" onClick={()=>props.closeModal()} style={{display:"none"}}>
				<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
				 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
				 stroke-linecap="round" stroke-linejoin="round">
				  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
				  <circle cx="12" cy="12" r="9" />
				  <path d="M10 10l4 4m0 -4l-4 4" />
				</svg>
			</div>
		)
	}


	const analyzeKeyInput=(event)=>{
		if(event.key=="Enter"){
			event.preventDefault();
			fetchProfileFromSearchUrl();
		}
	}

	return createPortal(
		<React.Fragment>
			<Container>
				{mobileCloseButton()}
				{displayDescriptionScreen==false?
					<SponsorModal displayDescriptionScreen={displayDescriptionScreen}>
						{displayProfileTagModal==true?
							<div style={{padding:"10px"}}>
								<div id="backButton" style={BackButtonCSS} 
									onClick={()=>displayInitialScreen()}>
									Back
								</div>
								<p>Search for the Sympocia profile here and we will handle the rest</p>
								<hr/>
								<div style={{justifyContent:"center",display:"flex",flexDirection:"row"}}>
									<SympociaProfileSearchTextArea
										id="sympociaProfilesSearchUrl"
										onKeyPress={e=>analyzeKeyInput(e)}
									/>
									<SearchIcon
										style={{fontSize:"30",cursor:"pointer"}}
										onClick={()=>fetchProfileFromSearchUrl()}
									/>
								</div>
								{loadingProfilesPrompt==true?
									<p>Loading...</p>:
									<div style={{display:"flex",flexDirection:"row"}}>
										{searchedProfiles.map(data=>
											<div style={SearchProfileContainerCSS}>
												<img id="profilePicture" src={
													data.profilePicture==null?
													NoProfilePicture:
													data.profilePicture} style={ProfilePictureCSS}
												/>
												<p id="profileFirstName" style={{listStyle:"none"}}>
													{data.firstName}
												</p>
												<div onClick={()=>selectPerson(data)} 
													style={SelectedProfileButtonCSS}>
													Add 
												</div>
											</div>
										)}
									</div>
								}
							</div>:
							<React.Fragment>
								<div style={{display:"flex",alignItem:"center"}}>
									<p id="championTitleName" style={{fontSize:"24px"}}>
										<b>Champion someone</b>
									</p>
								</div>
								<p id="secondaryDescription" style={{color:"#A4A4A4",marginBottom:"5%"}}>
									Nows your chance to show your appreciation for someone
								</p>
								
								<hr id="mobileHorizontalLine" style={HorizontalLineCSS}/>
								<div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
									<UploadPicture onClick={()=>handleDisplayImagePrompt()}>
										Upload picture
									</UploadPicture>
									<p style={{marginTop:"5%"}}>Or</p>
									<AccountCircleIcon
										style={{fontSize:"40",cursor:"pointer"}}
										onClick={()=>changeProfileTagModalDisplay(true)}
									/>
								</div>
								<input type="file" name="img" id="imageFile" style={{width:"5%",opacity:"0"}} onChange={()=>displayImage()}  
							        accept="application/msword,image/gif,image/jpeg,application/pdf,image/png,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/zip,.doc,.gif,.jpeg,.jpg,.pdf,.png,.xls,.xlsx,.zip" 
							        name="attachments">
							    </input>		
							</React.Fragment>
						}
					</SponsorModal>:
					<DescriptionModal
						imgData={imageData}
						selectedSympociaProfile={searchedProfile}
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