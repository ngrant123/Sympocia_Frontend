import React,{useState} from "react";
import styled from "styled-components";
import NewsAndTravelIndexModal from "../Modals/FeaturesIndex/NewsAndTravelIndex.js";
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

const NewsAndTravelFeatures=({symposium})=>{
	const [displayNewsAndTravelFeaturesPortal,changeDisplayNewsAndTravelModal]=useState(false);
	const [displayModalType,changeModalType]=useState();

	const displayMapModal=()=>{
		changeModalType("Map");
		changeDisplayNewsAndTravelModal(true);
	}

	const displayAdvisoryModal=()=>{
		changeModalType("Advisory");
		changeDisplayNewsAndTravelModal(true);
	}

	const handleCloseModal=()=>{
		changeDisplayNewsAndTravelModal(false);
	}

	return(
		<>
			{displayNewsAndTravelFeaturesPortal==true?
				<NewsAndTravelIndexModal
					modalType={displayModalType}
					closeModal={handleCloseModal}
					symposium={symposium}
				/>
				:null
			}
			<ul>
				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>displayMapModal()} style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								Upload to the {symposium} map
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								<ArrowDropDownCircleOutlinedIcon/>
							</li>
						</ul>
					</li>
				</a>
				<hr/>

				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>displayAdvisoryModal()} style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								{symposium} Advisory
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

export default NewsAndTravelFeatures;

