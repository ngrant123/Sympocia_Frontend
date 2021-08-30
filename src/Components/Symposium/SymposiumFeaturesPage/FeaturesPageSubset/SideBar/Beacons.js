import React,{useState,useContext} from "react";
import "react-step-progress-bar/styles.css";

import styled from "styled-components";
import { ProgressBar, Step } from "react-step-progress-bar";
import StampIcon from "../../../../../designs/img/StampIcon.png";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {FeaturesContext} from "../../FeaturesPageSet/FeaturesPageContext.js";
import ProgressBarExtendedModal from "../../FeaturesPageSet/Modals-Portals/Beacons/ProgressBarBeaconsExtended.js";
import TagsPortal from "../../FeaturesPageSet/Modals-Portals/DropDowns/TagsPortal.js";

const Container=styled.div`
	@media screen and (max-width:1370px){
		#beaconCreation{
			display:none !important;
		}
		#tagsOptions{
			display:none !important;
		}
	}

	@media screen and (max-width:650px){
		#progressBar{
			width:95% !important;
		}
	}
`;

const ProgressBarOutLineCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#ECECEC",
	borderRadius:"10px",
	width:"90%"
}

const TagsContainerCSS={
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#ECECEC",
	borderRadius:"5px",
	display:"flex",
	flexDirection:"column"
}

const DropDownCSS={
	borderRadius:"50%",
	boxShadow:"1px 1px 5px #dbdddf",
	marginLeft:"2%",
	cursor:"pointer"
}


const HorizontalLineCSS={
	marginLeft:"0",
	marginRight:"0",
	width:"100%"
}

const TagOptionsCSS={
	backgroundColor:"white",
	borderRadius:"5px",
	padding:"5px",
	color:"#3898ec",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#3898ec",
	cursor:"pointer",
	display:"flex",
	flexDirection:"row",
	marginBottom:"2%",
	marginRight:"2%"
}

const TagHeaderCSS={
	paddingLeft:"10px",
	paddingRight:"10px", 
	paddingTop:"10px",
	display:"flex",
	flexDirection:"row",
	justifyContent:"space-between",
	alignItems:"center"
}

const TagNumCSS={
	width:"25px",
	display:"flex",
	padding:"2px",
	alignItems:"center",
	justifyContent:"center",
	marginLeft:"20px",
	borderRadius:"50%",
	backgroundColor:"#3898ec",
	fontSize:"10px",
	color:"white"
}

const CreateButtonCSS={
	backgroundColor:"#C8B0F4",
	padding:"10px",
	display:"flex",
	alignItems:"center",
	justifyContent:"center",
	borderRadius:"5px",
	borderStyle:"solid",
	borderWidth:"2px",
	borderColor:"#B38AFF",
	color:"white",
	cursor:"pointer",
	width:"100%"
}

const BeaconSideBar=()=>{
	const featuresPageConsumer=useContext(FeaturesContext);
	const {
		featuresPageSecondaryInformation:{
			progressBarValue,
			tags
		},
		displayCreationModal
	}=featuresPageConsumer;

	let [currentPercentage,changeCurrentPercentage]=useState(0);
	const [selectedTags,changeSelectedTags]=useState([]);
	const [displayProgressBarExtended,changeDisplayProgressParExtended]=useState(false);
	const [displayTagOptions,changeDisplayTagOptions]=useState(false);

	useState(()=>{
		debugger;
		setTimeout(()=>{
	        while(currentPercentage<progressBarValue){
	        	changeCurrentPercentage(currentPercentage);
	          	currentPercentage++;
        	}
      	},1000);
	},[progressBarValue]);

	const constructNodeElements=()=>{
		debugger;
	    const ProgressBarSteps=[];
	    for(var i=0;i<2;i++){
	    	if(i==0){
	    		ProgressBarSteps.push(<div></div>);  
	    	}else{    		
				const StepElement= 	<Step transition="scale"
					                        index={0}>
					                    {({ accomplished,index }) => (
					                      <img
					                      	style={{ filter: `grayscale(0%)`,borderRadius:"50%",cursor:"pointer"}}
					                      	onClick={()=>changeDisplayProgressParExtended(true)}
			                                width="40"
			                                src={StampIcon}
			                              />
					                    )}
					                </Step>;
				ProgressBarSteps.push(StepElement);    	
	    	}
	    }
	    return ProgressBarSteps;
	}

	const addTag=(tagData)=>{
		const currentTags=selectedTags;
		selectedTags.push(tagData);
		changeSelectedTags([...selectedTags]);
	}

	const constructTags=()=>{
		return(
			<React.Fragment>
				{tags.map(data=>
					<div onClick={()=>addTag(data)} style={TagOptionsCSS}>
						<p>
							{data.tagName}
						</p>
						<div style={TagNumCSS}>
							{data.currentNumOfTag2}
						</div>
					</div>
				)}
			</React.Fragment>
		)
	}

	const removeSelectedTag=(selectedTagId)=>{
		for(var i=0;i<selectedTags.length;i++){
			if(selectedTags[i]._id==selectedTagId){
				selectedTags.splice(i,1);
				break;
			}
		}
		changeSelectedTags([...selectedTags]);
	}

	const seletectedTags=()=>{
		return(
			<React.Fragment>
				{selectedTags.length!=0 &&(
					<div style={{width:"100%",display:"flex",flexDirection:"row"}}>
						{selectedTags.map(data=>
							<div style={{marginLeft:"2%",display:"flex",flexDirection:"row"}}>
								<p>
									{data.tagName}
								</p>
								<HighlightOffIcon
									onClick={()=>removeSelectedTag(data._id)}
									style={{cursor:"pointer"}}
								/>
							</div>	
						)}
					</div>
				)}
			</React.Fragment>
		)
	}

	const closeProgressBarExtendedModal=()=>{
		changeDisplayProgressParExtended(false);
	}

	const closeTagOptionsModal=()=>{
		changeDisplayTagOptions(false);
	}
	return(
		<Container>
			{displayTagOptions==true &&(
				<TagsPortal
					closeModal={closeTagOptionsModal}
				/>
			)}
			{displayProgressBarExtended==true &&(
				<ProgressBarExtendedModal
					closeModal={closeProgressBarExtendedModal}
				/>
			)}
			<div>
				<p style={{fontSize:"18px"}}>
					<b>Your Progress</b>
				</p>
				<div id="progressBar" style={ProgressBarOutLineCSS}>
					<ProgressBar
		              percent={currentPercentage}
		              filledBackground="linear-gradient(to right, #F6F4FA, #C8B0F4)"
		              height={20}
		            >
		            	{constructNodeElements()}
		            </ProgressBar>
				</div>
                <p style={{marginTop:"5%"}}>8/13 Answered</p>
			</div>
			<div style={{padding:"30px"}} id="tagsOptions">
				<div style={TagsContainerCSS}>
					<div style={TagHeaderCSS}>
						<p>
							<b>Tags</b>
						</p>
						<div style={DropDownCSS} onClick={()=>changeDisplayTagOptions(true)}>
							<ExpandMoreIcon
								style={{fontSize:"24"}}
							/>
						</div>
					</div>
					<hr style={HorizontalLineCSS}/>

					{seletectedTags()}

					<div style={{display:"flex",flexDirection:"row",flexWrap:"wrap",height:"200px",overflowY:"auto",padding:"10px"}}>
						{constructTags()}
					</div>
				</div>
			</div>
			<div class="dropdown" id="beaconCreation">
				<button class="btn btn-primary dropdown-toggle" type="button" 
					data-toggle="dropdown" style={CreateButtonCSS}>
					
					Create Beacon
				</button>

				<ul class="dropdown-menu" 	
					style={{padding:"20px",height:"170px",marginTop:"-220px",width:"90%",overflow:"auto"}}>
					<li style={{listStyle:"none",cursor:"pointer"}}
						onClick={()=>displayCreationModal({postType:"Images"})}>
						Images
					</li>
					<hr/>

					<li style={{listStyle:"none",cursor:"pointer"}}
						onClick={()=>displayCreationModal({postType:"Videos"})}>
						Videos
					</li>
					<hr/>

					<li style={{listStyle:"none",cursor:"pointer"}}
						onClick={()=>displayCreationModal({postType:"Regular"})}>
						Regular
					</li>
					<hr/>
				</ul>
		  	</div>
		</Container>
	)
}


export default BeaconSideBar;