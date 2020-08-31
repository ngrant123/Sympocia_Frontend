import React,{useState,useEffect} from "react";
import styled from "styled-components";
import SYMPOSIUM_FEATURES from "../../../../../../Constants/featureSymposiumConstants.js";
import MiscellaneousIndexPortal from "../Modals/FeaturesIndex/MiscellaneousIndex.js";
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
/*
		MISCELLANEOUS_SYMPOSIUM:{
		ENTREPENEUR:["Entrepeneur"],
		RELIGION:["Religion"],
		ENTERTAINMENT:[
			"Tv Shows",
			"Movies"
		],
		COMEDY:["Comedy"],
		CARS_COOKING_DIY:[
			"Cars",
			"Cooking",
			"DIY"
		]
	},
*/
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
const MiscellaneousFeatures=({symposium})=>{
	const [displayMiscellaneousFeaturesPortal,changeMiscellaneousFeaturesDisplay]=useState(false);
	const [displayModalType,changeModalType]=useState();
	const [entrepeneurMap,changeEntrepeneurMap]=useState(new Map());
	const [religionMap,changeReligionMap]=useState(new Map());
	const [entertainmentMap,changeEntertainmentMap]=useState(new Map());
	const [comedyMap,changeComedyMap]=useState(new Map());
	const [carsCookingDiyMap,changeCarsCookingDIYMap]=useState(new Map());

	const [isLoadingFeatureSymposiums,changeLoadStatus]=useState(true);

	useEffect(()=>{
		const {MISCELLANEOUS_SYMPOSIUM}=SYMPOSIUM_FEATURES;
		const {
			ENTREPENEUR,
			RELIGION,
			ENTERTAINMENT,
			COMEDY,
			CARS_COOKING_DIY
		}=MISCELLANEOUS_SYMPOSIUM;

		for(var i=0;i<ENTREPENEUR.length;i++){
			entrepeneurMap.set(ENTREPENEUR[i],1);
		}

		for(var i=0;i<RELIGION.length;i++){
			religionMap.set(RELIGION[i],1);
		}

		for(var i=0;i<ENTERTAINMENT.length;i++){
			entertainmentMap.set(ENTERTAINMENT[i],1);
		}

		for(var i=0;i<COMEDY.length;i++){
			comedyMap.set(COMEDY[i],1);
		}

		for(var i=0;i<CARS_COOKING_DIY.length;i++){
			carsCookingDiyMap.set(CARS_COOKING_DIY[i],1);
		}
		changeLoadStatus(false);
	},[]);

	const displayVideoMiscellaneousModal=()=>{
		changeModalType("Video");
		changeMiscellaneousFeaturesDisplay(true);
	}

	const displayRegularPostMiscellaneousModal=(modalType)=>{
		changeModalType(modalType);
		changeMiscellaneousFeaturesDisplay(true);
	}

	const displayMusicTipsModal=()=>{
		changeModalType("Advisory");
		changeMiscellaneousFeaturesDisplay(true);
	}

	const handleCloseModal=()=>{
		changeMiscellaneousFeaturesDisplay(false);
	}

	const comedyFeatures=()=>{
		return(
			<ul>
				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>displayVideoMiscellaneousModal()} style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								Featured Sets
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								<ArrowDropDownCircleOutlinedIcon/>
							</li>
						</ul>
					</li>
				</a>
				<hr/>

				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>displayRegularPostMiscellaneousModal("Advisory")} style={OptionsCSS}>
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

				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>displayVideoMiscellaneousModal()} style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								Review my set
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								<ArrowDropDownCircleOutlinedIcon/>
							</li>
						</ul>
					</li>
				</a>
				<hr/>
			</ul>
		)
	}      

	const carsCookingDiyFeatures=()=>{
		return(
			<ul>
				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>displayRegularPostMiscellaneousModal("Regular")} style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								Selling {symposium}
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								<ArrowDropDownCircleOutlinedIcon/>
							</li>
						</ul>
					</li>
				</a>
				<hr/>

				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>displayRegularPostMiscellaneousModal("Regular")} style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								{symposium} Meetups
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								<ArrowDropDownCircleOutlinedIcon/>
							</li>
						</ul>
					</li>
				</a>
				<hr/>

				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>displayRegularPostMiscellaneousModal("Regular")} style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								{symposium} job section offers
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								<ArrowDropDownCircleOutlinedIcon/>
							</li>
						</ul>
					</li>
				</a>
				<hr/>

				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>displayRegularPostMiscellaneousModal("Advisory")} style={OptionsCSS}>
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
		)
	}

	const entertainmenetFeatures=()=>{
		return(
			<ul>
				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>displayVideoMiscellaneousModal()} style={OptionsCSS}>
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
					<li onClick={()=>displayRegularPostMiscellaneousModal("Regular")} style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								{symposium} jobs 
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								<ArrowDropDownCircleOutlinedIcon/>
							</li>
						</ul>
					</li>
				</a>
				<hr/>

				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>displayRegularPostMiscellaneousModal("Regular")} style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								Critique my script {symposium} script 
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								<ArrowDropDownCircleOutlinedIcon/>
							</li>
						</ul>
					</li>
				</a>
				<hr/>
			</ul>
		)
	}

	const religionFeatures=()=>{

	}

	const entrepeneurFeatures=()=>{
		return(
			<ul>
				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>displayRegularPostMiscellaneousModal("Advisory")} style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								Marketing tips
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								<ArrowDropDownCircleOutlinedIcon/>
							</li>
						</ul>
					</li>
				</a>
				<hr/>

				<a href="javascript:void(0);" style={{textDecoration:"none"}}>
					<li onClick={()=>displayRegularPostMiscellaneousModal("Regular")} style={OptionsCSS}>
						<ul style={{padding:"0px"}}>
							<li style={{listStyle:"none",display:"inline-block"}}>
								Showcase your startup
							</li>

							<li style={{listStyle:"none",display:"inline-block"}}>
								<ArrowDropDownCircleOutlinedIcon/>
							</li>
						</ul>
					</li>
				</a>
				<hr/>
			</ul>
		)
	}

	const modalDecider=()=>{
		debugger;
		if(entrepeneurMap.has(symposium)){

			entrepeneurFeatures();

		}else if(religionMap.has(symposium)){

			religionFeatures();

		}else if(entertainmentMap.has(symposium)){

			entertainmenetFeatures();

		}else if(comedyMap.has(symposium)){

			comedyFeatures();

		}else if(carsCookingDiyMap.has(symposium)){

			carsCookingDiyFeatures();
		}
	}
	return(
		<>
			{displayMiscellaneousFeaturesPortal==true?
					<MiscellaneousIndexPortal
						modalType={displayModalType}
						closeModal={handleCloseModal}
						symposium={symposium}
					/>
					:null
			}
			{modalDecider()}
		</>
	)
}

export default MiscellaneousFeatures;