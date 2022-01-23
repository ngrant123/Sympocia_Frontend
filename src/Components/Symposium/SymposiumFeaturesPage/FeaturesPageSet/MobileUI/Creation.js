import React,{useState} from "react";
import styled from "styled-components";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import PostCreation from "./PostCreation/index.js";
import {MobileUIProvider} from "./MobileUIContext.js";

const CreatePostButton=styled.div`	
	width:70px;
	height:70px;
	border-radius:50%;
	background-color:white;
	border-color:white;
	border-style:solid;
	border-width:5px;
	animation: glowing 1300ms infinite;
	margin-left:280px;
	display:none;

	margin-top:530px;
	position:fixed;
	z-index:10;


	@keyframes glowing {
      0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
  	}

  	@media screen and (min-width:2500px){
  		width:120px;
		height:120px;
		#postCreationIcon{
			font-size:50px !important;
			margin-left:15%; 
			margin-top:15%;
		}
  	}
  	@media screen and (max-width:1370px){
  		display:block;
		width:60px !important;
		height:60px !important;
		margin-left:85%;
		margin-top:120%;
    }


    @media screen and (max-width:1080px){
			width:50px !important;
			height:50px !important;
    }
     @media screen and (max-width:1080px){
			width:70px !important;
			height:70px !important;
    }

    @media screen and (max-width:650px){
    	margin-top:155%;
    	margin-left:75%;
    }

    @media screen and (min-width:650px) and (max-width:720px) 
		and (min-height:1150px) and (max-height:1200px){
		margin-top:260%;
	}

	@media screen and (min-width:300px) and (max-width:350px) 
		and (min-height:850px) and (max-height:900px){
		margin-top:215%;
	}

	@media screen and (min-width:300px) and (max-width:330px) 
		and (min-height:1000px) and (max-height:1200px){
		margin-top:270%;
	}

	@media screen and (min-width:400px) and (max-width:520px) 
		and (min-height:1000px) and (max-height:1200px){
		margin-top:190%;
	}



	@media screen and (min-width:400px) and (max-width:700px) 
		and (min-height:900px) and (max-height:1370px){
		margin-top:190%;
	}



	@media screen and (min-width:300px) and (max-width:390px) 
		and (min-height:700px) and (max-height:1100px){
		margin-top:120%;
	}

	@media screen and (min-width:450px) and (max-width:650px) 
		and (min-height:700px) and (max-height:1100px){
		margin-top:130%;
	}

	@media screen and (min-width:200px) and (max-width:400px) 
		and (min-height:800px) and (max-height:1370px){
		margin-top:290%;
	}

	@media screen and (min-width:300px) and (max-width:400px) 
		and (min-height:700px) and (max-height:1050px){
		margin-top:210%;
	}

	@media screen and (min-width:350px) and (max-width:400px) 
		and (min-height:800px) and (max-height:950px){
		margin-top:190%;
	}

    @media screen and (max-width:1370px) and (max-height:800px) and (orientation: landscape) {
		margin-left:85%;
		margin-top:65%;
    }
`;

const CreateButtonCSS={
	backgroundColor:"white",
	display:"flex",
	alignItems:"center",
	justifyContent:"center",
	borderRadius:"50%",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"white",
	color:"white",
	cursor:"pointer",
	width:"100%",
	marginTop:"5px"
}

const DropDownCSS={
	padding:"20px",
	height:"170px",
	marginTop:"-220px",
	width:"90%",
	overflow:"auto",
	marginLeft:"-100px"
}

const MobileCreation=({featurePageType,isGuestProfile})=>{
	const [creationButtonClick,changeCreationButtonStatus]=useState(false);
	const [hideDropDownMenu,changeHideChangeDownMenu]=useState(false);

	const triggerDisplayCreationModal=(e)=>{
		
		if(isGuestProfile==true){
			changeHideChangeDownMenu(true);
			alert('Unfortunately this feature is not available for guests. Please create a profile :) Its free');
		}else{
			changeCreationButtonStatus(true)
		}
	}

	return(
		<MobileUIProvider
			value={{
				unDoButtonClickedStatus:()=>{
					changeCreationButtonStatus(false);
				}
			}}
		>
			<CreatePostButton>
				<div class="dropdown" id="beaconCreation">
					<button class="btn btn-primary dropdown-toggle" type="button" 
						data-toggle="dropdown" style={CreateButtonCSS} onClick={e=>triggerDisplayCreationModal(e)}>
						
							<BorderColorIcon
								id="postCreationIcon"
								style={{fontSize:"30",color:"#C8B0F4"}}
							/>
					</button>
					{hideDropDownMenu==false &&(
						<ul class="dropdown-menu" style={DropDownCSS}>
							<PostCreation
								featurePageType={featurePageType}
								creationButtonClick={creationButtonClick}
								isGuestProfile={isGuestProfile}
							/>
						</ul>
					)}
			  	</div>
			</CreatePostButton>
		</MobileUIProvider>
	)
}

export default MobileCreation;