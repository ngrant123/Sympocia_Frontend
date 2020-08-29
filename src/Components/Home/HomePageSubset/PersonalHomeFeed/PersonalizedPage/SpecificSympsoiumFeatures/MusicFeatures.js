
import React,{useState} from "react";
import styled from "styled-components";
import MusicIndexModal from "../Modals/FeaturesIndex/MusicIndex.js";
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

const MusicFeatures=({symposium})=>{
	const [displayMusicFeaturesPortal,changeDisplayMusicModal]=useState(false);
	const [displayModalType,changeModalType]=useState();

	const displayBeatsModal=()=>{
		changeModalType("Beats");
		changeDisplayMusicModal(true);
	}

	const displayReviewWorkModal=()=>{
		changeModalType("Review");
		changeDisplayMusicModal(true);
	}

	const displayMusicTipsModal=()=>{
		changeModalType("Advisory");
		changeDisplayMusicModal(true);
	}

	const handleCloseModal=()=>{
		changeDisplayMusicModal(false);
	}

	return(
		<>
			{displayMusicFeaturesPortal==true?
				<MusicIndexModal
					modalType={displayModalType}
					closeModal={handleCloseModal}
					symposium={symposium}
				/>
				:null
			}
			<ul>
				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>displayBeatsModal()} style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								Free beats
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								<ArrowDropDownCircleOutlinedIcon/>
							</li>
						</ul>
					</li>
				</a>
				<hr/>

				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>displayReviewWorkModal()} style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								Review my work
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								<ArrowDropDownCircleOutlinedIcon/>
							</li>
						</ul>
					</li>
				</a>
				<hr/>

				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>displayMusicTipsModal()} style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								Music tips
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

export default MusicFeatures;