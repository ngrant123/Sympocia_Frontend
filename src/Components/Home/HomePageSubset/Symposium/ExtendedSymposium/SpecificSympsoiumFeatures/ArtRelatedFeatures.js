import React,{useState} from "react";
import styled from "styled-components";
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import ArtIndexModal from "../Modals/FeaturesIndex/ArtIndex.js";

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
const ArtRelatedFeatures=({symposium})=>{
	const [displayArtFeaturesPortal,changeDisplayArtModal]=useState(false);
	const [displayModalType,changeModalType]=useState();

	const displaySubmitModal=()=>{
		changeModalType("Submit");
		changeDisplayArtModal(true);
	}

	const displayCritiqueModal=()=>{
		changeModalType("Critique");
		changeDisplayArtModal(true);
	}

	const displaySuppliesModal=()=>{
		console.log("Supplies");
		changeModalType("Supplies");
		changeDisplayArtModal(true);
	}

	const displayResourcesModal=()=>{
		changeModalType("Resources");
		changeDisplayArtModal(true);
	}

	const handleCloseModal=()=>{
		changeDisplayArtModal(false);
	}

	return(
		<>
			{displayArtFeaturesPortal==true?
				<ArtIndexModal
					modalType={displayModalType}
					closeModal={handleCloseModal}
					symposium={symposium}
				/>
				:null
			}
			<ul>
				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>displayCritiqueModal()} style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								Critique my {symposium}
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								<ArrowDropDownCircleOutlinedIcon/>
							</li>
						</ul>
					</li>
				</a>
				<hr/>

				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>displaySuppliesModal()} style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								{symposium} supplies
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								<ArrowDropDownCircleOutlinedIcon/>
							</li>
						</ul>
					</li>
				</a>
				<hr/>

				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>displayResourcesModal()} style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								{symposium} resources
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

export default ArtRelatedFeatures;