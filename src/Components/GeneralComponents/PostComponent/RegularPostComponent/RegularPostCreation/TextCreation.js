import React,{useState,useEffect} from "react";
import styled from "styled-components";
import SendIcon from '@material-ui/icons/Send';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Icon, InlineIcon } from '@iconify/react';
import crownIcon from '@iconify/icons-mdi/crown';


const Container=styled.div`
	@media screen and (max-width:700px){
		width:120% !important;
		margin-left:-15% !important;
		#submitLI{
			width:100% !important;
		}
	}
    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	width:160% !important;
    	margin-left:0% !important;
    	#submitLI{
			width:30% !important;
		}
    }
`;

const CrownIconContainer=styled.div`
	border-style:solid;
	border-width:2px;
	border-color:red;
	animation: glowing 1300ms infinite;
	border-radius:50%;
	margin-bottom:5%;

	@keyframes glowing {
      0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
  }
`;

const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	width:60%;
	height:150px;

	border-style:solid;
	border-width:1px;
	border-color:#F0F0F0;

	resize:none;
	padding:5px;

	@media screen and (max-width:1370px){
		width:90% !important;
		height:250px;
	}

	@media screen and (max-width:650px){
		width:113% !important;
		margin-left:-2% !important;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	width:60% !important;
    }
`;

const RegularPostBackButtonCSS={
  listStyle:"none",
  display:"inline-block",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec",
  marginRight:"5%"
}

const TextCreation=({isSubmittedAndProcessing,isPostCrowned,displayTextOrAudioScreen,sendDataToParent,displayCrownPostModal,previousPost})=>{
	const [crownPostColor,changeCrownPostColor]=useState("#D6C5F4");
	const [crownPostBackgroundColor,changeCrownPostBackgroundColor]=useState("white");

	useEffect(()=>{
		if(previousPost!=null){
			document.getElementById("textContainer").value=previousPost;
		}
		if(isPostCrowned==true){
			changeCrownPostBackgroundColor("#D6C5F4");
			changeCrownPostColor("white");
		}
	})

	const sendData=()=>{
		if(document.getElementById("textContainer").value!=""){
			sendDataToParent(document.getElementById("textContainer").value);
		}else{
			alert('Please enter a post')
		}	
	}

	return(
		<Container>
			<ul style={{padding:"0px"}}>
				<li style={{listStyle:"none"}}>
					<ul style={{padding:"0px"}}>

						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								<CrownIconContainer onClick={()=>displayCrownPostModal()}>
									<Icon 
										id="crownIcon"
										icon={crownIcon}
										style={{borderRadius:"50%",zIndex:"8",backgroundColor:crownPostBackgroundColor,
										fontSize:"40px",color:crownPostColor}}
									/>
								</CrownIconContainer>
							</li>
						</a>
					</ul>
				</li>
			
				<li style={{marginTop:"3%",listStyle:"none"}}>
					<InputContainer id="textContainer" placeholder="Create your post here"/>
				</li>

				{isSubmittedAndProcessing==false?
					<li  id="submitLI" onClick={()=>sendData()} style={{marginTop:"5%",listStyle:"none",backgroundColor:"#C8B0F4",width:"20%",textAlign:"center",fontSize:"15px",borderRadius:"5px"}}>
						<a href="javascript:void(0);" style={{textDecoration:"none"}}>
							<ul style={{padding:"0px"}}>
								{previousPost==null?
									<React.Fragment>
										<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
											<SendIcon
												style={{fontSize:20,color:"white"}}
											/>
										</li>

										<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",color:"white"}}>
											Send
										</li>
									</React.Fragment>:
									<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",color:"white"}}>
										Edit
									</li>
								}
							</ul>
						</a>
					</li>:
					<p>Please wait...</p>
				}
			</ul>
		</Container>
	)
}

export default TextCreation;