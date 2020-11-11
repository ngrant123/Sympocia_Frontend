import React,{useState,useEffect} from "react";
import styled from "styled-components";
import SYMPOSIUM_FEATURES from "../../../../../../Constants/featureSymposiumConstants.js";
import MiscellaneousIndexPortal from "../Modals/FeaturesIndex/MiscellaneousIndex.js";
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import {FeatureConsumer} from "./FeatureContext.js";
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
const MiscellaneousFeatures=({symposium,questions})=>{
	const [displayMiscellaneousFeaturesPortal,changeMiscellaneousFeaturesDisplay]=useState(false);
	const [displayModalType,changeModalType]=useState();
	const [entrepeneurMap,changeEntrepeneurMap]=useState(new Map());
	const [religionMap,changeReligionMap]=useState(new Map());
	const [entertainmentMap,changeEntertainmentMap]=useState(new Map());
	const [comedyMap,changeComedyMap]=useState(new Map());
	const [carsCookingDiyMap,changeCarsCookingDIYMap]=useState(new Map());
	const [questionIndex,changeQuestionIndex]=useState();
	const [selectedPostId,changeSelectedPostId]=useState();
	const [selectedQuestion,changeSelectedQuestion]=useState();

	const [isLoadingFeatureSymposiums,changeLoadStatus]=useState(true);
	if(questions!=null){
		var {
			audioQuestion,
			imageQuestion,
			regularPostQuestion,
			videoQuestion
		}=questions;
	}

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

	const displayMiscellaneousFeatures=(featureType,index)=>{
		changeModalType(featureType);
		changeMiscellaneousFeaturesDisplay(true);
		changeQuestionIndex(index);
	}

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
					<li onClick={()=>displayMiscellaneousFeatures("Video",0)} style={OptionsCSS}>
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
					<li onClick={()=>displayMiscellaneousFeatures("Advisory",1)} style={OptionsCSS}>
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
					<li onClick={()=>displayMiscellaneousFeatures("Video",2)} style={OptionsCSS}>
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
					<li onClick={()=>displayMiscellaneousFeatures("Images",0)} style={OptionsCSS}>
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
					<li onClick={()=>displayMiscellaneousFeatures("Regular",1)} style={OptionsCSS}>
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
					<li onClick={()=>displayMiscellaneousFeatures("Regular",2)} style={OptionsCSS}>
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
					<li onClick={()=>displayMiscellaneousFeatures("Advisory",3)} style={OptionsCSS}>
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
					<li onClick={()=>displayMiscellaneousFeatures("Advisory",0)} style={OptionsCSS}>
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
					<li onClick={()=>displayMiscellaneousFeatures("Regular",1)} style={OptionsCSS}>
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
					<li onClick={()=>displayMiscellaneousFeatures("Regular",2)} style={OptionsCSS}>
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
					<li onClick={()=>displayMiscellaneousFeatures("Advisory",0)} style={OptionsCSS}>
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
					<li onClick={()=>displayMiscellaneousFeatures("Regular",1)} style={OptionsCSS}>
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

		if(entrepeneurMap.has(symposium)){

			return entrepeneurFeatures();

		}else if(religionMap.has(symposium)){

			return religionFeatures();

		}else if(entertainmentMap.has(symposium)){

			return entertainmenetFeatures();

		}else if(comedyMap.has(symposium)){

			return comedyFeatures();

		}else if(carsCookingDiyMap.has(symposium)){

			return carsCookingDiyFeatures();
		}
	}

	const displayPostModal=(posts,postType,selectedPost)=>{

		var indexOfStevie = posts.findIndex(i => i._id === selectedPost._id);
		changeModalType(postType);
		changeMiscellaneousFeaturesDisplay(true);
		changeQuestionIndex(indexOfStevie);
		changeSelectedQuestion(selectedPost.question);
		changeSelectedPostId(selectedPost._id);
	}
	return(
		<FeatureConsumer>
			{symposiumInformation=>{
				return <>
						{questions!=null && (
							<>
								{displayMiscellaneousFeaturesPortal==true?
									<MiscellaneousIndexPortal
										modalType={displayModalType}
										closeModal={handleCloseModal}
										symposium={symposium}
										questionIndex={questionIndex}
										symposiumId={symposiumInformation.symposiumId}
										selectedPostId={selectedPostId}
										question={selectedQuestion}
									/>
									:null
								}
								<ul>
									{audioQuestion.map(data=>
										<>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>displayPostModal(audioQuestion,"Audio",data)} style={OptionsCSS}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block"}}>
														{data.question}
													</li>

													<li style={{listStyle:"none",display:"inline-block"}}>
														<ArrowDropDownCircleOutlinedIcon/>
													</li>
												</ul>
											</li>
										</a>
										<hr/>
										</>
									)}
									{imageQuestion.map(data=>
										<>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>displayPostModal(imageQuestion,"Image",data)} style={OptionsCSS}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block"}}>
														{data.question}
													</li>

													<li style={{listStyle:"none",display:"inline-block"}}>
														<ArrowDropDownCircleOutlinedIcon/>
													</li>
												</ul>
											</li>
										</a>
										<hr/>
										</>
									)}

									{regularPostQuestion.map(data=>
										<>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>displayPostModal(regularPostQuestion,"RegularPost",data)} style={OptionsCSS}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block"}}>
														{data.question}
													</li>

													<li style={{listStyle:"none",display:"inline-block"}}>
														<ArrowDropDownCircleOutlinedIcon/>
													</li>
												</ul>
											</li>
										</a>
										<hr/>
										</>
									)}
									{videoQuestion.map(data=>
										<>
										<a href="javascript:void(0);" style={{textDecoration:"none"}}>
											<li onClick={()=>displayPostModal(videoQuestion,"Video",data)} style={OptionsCSS}>
												<ul style={{padding:"0px"}}>
													<li style={{listStyle:"none",display:"inline-block"}}>
														{data.question}
													</li>

													<li style={{listStyle:"none",display:"inline-block"}}>
														<ArrowDropDownCircleOutlinedIcon/>
													</li>
												</ul>
											</li>
										</a>
										<hr/>
										</>
									)}
								</ul>
							</>
						)}
					   </>
			}}
		</FeatureConsumer>
	)
}

export default MiscellaneousFeatures;