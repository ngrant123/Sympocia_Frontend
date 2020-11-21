import React,{useState,useEffect} from "react";
import styled from "styled-components";
import VoiceDescriptionPortal from "../../VoiceDescriptionPortal.js";
import SendIcon from '@material-ui/icons/Send';
import { Icon, InlineIcon } from '@iconify/react';
import crownIcon from '@iconify/icons-mdi/crown';

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
  marginRight:"5%"
}


const CrownIconContainer=styled.div`
	border-style:solid;
	border-width:2px;
	border-color:red;
	animation: glowing 1300ms infinite;
	border-radius:50%;

	@keyframes glowing {
      0% { border-color: #D6C5F4; box-shadow: 0 0 5px #C8B0F4; }
      50% { border-color: #C8B0F4; box-shadow: 0 0 20px #C8B0F4; }
      100% { border-color: #B693F7; box-shadow: 0 0 5px #C8B0F4; }
  }
`;


const AudioCreation=({sendDataToParent,isPostCrowned,displayCrownPostModal,displayTextOrAudioScreen})=>{
	const [displayAudioCreation,changeDisplayAudioCreation]=useState(false);
	const [audioDescription,changeAudioDescription]=useState();
	const [crownPostColor,changeCrownPostColor]=useState("#D6C5F4");
	const [crownPostBackgroundColor,changeCrownPostBackgroundColor]=useState("white");

	useEffect(()=>{
		if(isPostCrowned==true){
			changeCrownPostBackgroundColor("#D6C5F4");
			changeCrownPostColor("white");
		}
	},[]);

	const handleCreateAudioDescription=(audioDescriptionSrc)=>{
		changeAudioDescription(audioDescriptionSrc);
		changeDisplayAudioCreation(false);
	}
	const uuidv4=()=>{
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}

	const closeModal=()=>{
		changeDisplayAudioCreation(true);	
		displayTextOrAudioScreen();
	}

	return(
		<>
			{displayAudioCreation==false?
				<VoiceDescriptionPortal
					closeModal={closeModal}
					createAudioDescription={handleCreateAudioDescription}
				/>:
				<React.Fragment>
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none"}}>
							<ul style={{padding:"0px"}}>
								<li onClick={()=>displayTextOrAudioScreen()} style={ButtonCSS}>
									Back
								</li>

								<li onClick={()=>changeDisplayAudioCreation(false)} style={ButtonCSS}>
									Redo
								</li>
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
						<li style={{listStyle:"none",display:"inline-block",marginLeft:"5%"}}>
							<audio key={uuidv4()} controls>
								<source src={audioDescription} type="audio/ogg"/>
								<source src={audioDescription} type="audio/mpeg"/>
								Your browser does not support the audio element.
							</audio>
						</li>
			
						<li style={{marginTop:"5%",listStyle:"none",backgroundColor:"#C8B0F4",width:"20%",textAlign:"center",fontSize:"15px",borderRadius:"5px"}}>
							<a href="javascript:void(0);" style={{textDecoration:"none"}}>
								<ul onClick={()=>sendDataToParent(audioDescription)} style={{padding:"0px"}}>
									<li style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
										<SendIcon
											style={{fontSize:20,color:"white"}}
										/>
									</li>

									<li style={{listStyle:"none",display:"inline-block",fontSize:"20px",color:"white"}}>
										Send
									</li>
								</ul>
							</a>
						</li>
					</ul>
				</React.Fragment>
			}
		</>
	)
}

export default AudioCreation;