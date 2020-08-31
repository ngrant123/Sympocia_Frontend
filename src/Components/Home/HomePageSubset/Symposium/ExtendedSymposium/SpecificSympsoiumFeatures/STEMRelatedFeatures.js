import React,{useState} from "react";
import styled from "styled-components";
import STEMIndexModal from "../Modals/FeaturesIndex/STEMIndex.js";
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';

const OptionsCSS={
  listStyle:"none",
  backgroundColor:"white",
  borderRadius:"5px",
  padding:"10px",
  color:"#3898ec",
  borderStyle:"solid",
  borderWidth:"2px",
  borderColor:"#3898ec"
}

const STEMRelatedFeatures=({symposium})=>{
	const [displaySTEMFeaturesPortal,changeDisplaySTEMModal]=useState(false);
	const [displayModalType,changeModalType]=useState();

	const displayTutoringModal=()=>{
		changeModalType("Tutoring");
		changeDisplaySTEMModal(true);
	}

	const displayRecommendedBooksModal=()=>{
		console.log("Supplies");
		changeModalType("Books");
		changeDisplaySTEMModal(true);
	}

	const displayAchievementsModal=()=>{
		changeModalType("Achievement");
		changeDisplaySTEMModal(true);
	}

	const handleCloseModal=()=>{
		changeDisplaySTEMModal(false);
	}

	return(
		<>
			{displaySTEMFeaturesPortal==true?
				<STEMIndexModal
					modalType={displayModalType}
					closeModal={handleCloseModal}
					symposium={symposium}
				/>
				:null
			}
			<ul>
				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>displayTutoringModal()} style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								{symposium} tutoring services
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								<ArrowDropDownCircleOutlinedIcon/>
							</li>
						</ul>
					</li>
				</a>
				<hr/>

				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>displayRecommendedBooksModal()} style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								Recommeneded books
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								<ArrowDropDownCircleOutlinedIcon/>
							</li>
						</ul>
					</li>
				</a>
				<hr/>

				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>displayAchievementsModal()} style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								{symposium} achievement 
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								<ArrowDropDownCircleOutlinedIcon/>
							</li>
						</ul>
					</li>
				</a>
				<hr/>
			</ul>
		</>
	)
}

export default STEMRelatedFeatures;