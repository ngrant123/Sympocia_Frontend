import React,{useState} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import {Link} from "react-router-dom";
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import SimpleImageUpload from "./SimpleImageUpload.js";
import SimpleVideoUpload from "./SimpleVideoUpload.js";
import SimpleRegularPostUpload from "./SimpleRegularPostUpload.js";
import {SymposiumConsumer} from "../../SymposiumContext.js";
import {useSelector} from "react-redux";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


const Container=styled.div`
	position:fixed;
	background-color:white;
	width:45%;
	height:60%;
	border-radius:5px; 
	z-index:41;
	left:30%;
	top:20%;
	padding:20px;
	overflow-y:scroll;

	@media screen and (max-width:1370px){
		width:90%;
		left:5%;
		top:5%;
		height:90%;

		#imageDiv{
			height:150px !important;
			width:30% !important;
		}

		#simpleUploadWrapperDiv{
			flex-direction:column !important;
		}

		#primaryTextValue{
			width:95% !important;
		}
		#secondaryTextValue{
			width:95% !important;
		}

		#mobileCloseIcon{
			visibility:visible !important;
		}

		#headerDiv{
			flex-direction:column !important;
			align-items:normal !important;
		}
		#categoryTypeDropDownDiv{
			margin-left:0% !important;
		}
		#videoDiv{
			margin-bottom:10px !important;
		}
	}

	@media screen and (max-width:650px){
		#imageDiv{
			height:90px !important;
			width:35% !important;
		}
		#videoDiv{
			width:210px !important;
		}
	}
	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
		#imageDiv{
			width:20% !important;
		}
    }

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		#imageDiv{
			width:40% !important;
			height:150px !important;
		}
	}
`;

const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.7);
	z-index:40;
	top:0px;
`;

const SymposiumCategoryCSS={
    listStyle:"none",
    padding:"10px",
    backgroundColor:"white",
    color:"#6e6e6e",
    borderRadius:"5px",
    borderStyle:"none",
    cursor:"pointer",
    display:"flex",
    flexDirection:"row",
    alignItems:"center"
}

const SpecificOptionDropDownCSS={
	listStyle:"none",
	display:"inline-block",
	marginRight:"5%",
	cursor:"pointer"
}

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
	cursor:"pointer",
	marginTop:"5%",
	marginRight:"5%"
}

/*
	Maybe I should have made it double consumers for the dummy upload functionality but for now
	each one handles the dummy post upload to stack function. Maybe should make this the central
	option who knows lolz
*/

const QuickSymposiumUpload=({categoryType,closeModal,postType})=>{
	const [selectedCategoryType,changeSelectedCategoryType]=useState(categoryType);
	const personalInformation=useSelector(state=>state.personalInformation);

	const postDisplayDecider=(isMobileUi,symposiumName)=>{
		const uploadParams={
			isMobileUi,
			selectedCategoryType,
			currentSymposiumName:symposiumName,
			closeModal
		}
		console.log(postType);
		debugger;
		switch(postType){
			case "Image":{
				return(
					<SimpleImageUpload
						{...uploadParams}
					/>
				)
			}
			case "Video":{
				return(
					<SimpleVideoUpload
						{...uploadParams}
					/>
				)
			}
			case "Regular":{
				return(
					<SimpleRegularPostUpload
						{...uploadParams}
					/>
				)
			}
		}
	}

	const mobileCloseIconDisplay=()=>{
		return(
			<HighlightOffIcon
				id="mobileCloseIcon"
				onClick={()=>closeModal()}
				style={{visibility:"hidden",fontSize:"25",color:"#E6E6E6",marginBottom:"5%"}}
			/>
		)
	}

	return createPortal(
		<SymposiumConsumer>
			{symposiumContext=>{
				return(
					<React.Fragment>
						<Container>
							{mobileCloseIconDisplay()}
							{postType=="Blog"?
								<React.Fragment>
									<p style={{marginTop:"5%"}}>
										We don't allow quick uploads for blogs. Would you like to go to your profile and create one there?
									</p>
									<div style={{display:"flex",flexDirection:"row"}}>
										<div style={ButtonCSS}>
											<Link to={{pathname:`/profile/${personalInformation.id}`}}>
												Yes
											</Link>
										</div>
										<div onClick={()=>closeModal()} style={ButtonCSS}>
											No
										</div>
									</div>
								</React.Fragment>:
								<React.Fragment>
									<div id="headerDiv" style={{alignItems:"center",display:"flex",flexDirection:"row"}}>
										<p style={{fontSize:"25px"}}>
											<b>Quick Symposium Upload</b>
										</p>
										<div id="categoryTypeDropDownDiv" class="dropdown" style={{marginLeft:"5%"}}>
					                        <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" 
					                        	style={SymposiumCategoryCSS}>
					                           	<p style={{fontSize:"18px"}}>{selectedCategoryType}</p>
												<ArrowDropDownCircleOutlinedIcon
													style={{fontSize:"18",marginTop:"-10%",marginLeft:"5%"}}
												/>
					                        </button>

					                        <ul class="dropdown-menu" style={{padding:"10px"}}>
							                    <li onClick={()=>changeSelectedCategoryType("The Grind")} 
							                    	style={SpecificOptionDropDownCSS}>
							                        The Grind
							                    </li>
							                    <hr/>
							                    <li onClick={()=>changeSelectedCategoryType("Work In Progress")}  
							                    	style={SpecificOptionDropDownCSS}>
							                        Work In Progress
							                    </li>
							                    <hr/>
							                    <li onClick={()=>changeSelectedCategoryType("Achievements")}  
							                    	style={SpecificOptionDropDownCSS}> 
							                        Achievements
							                    </li>
					                        </ul>
					                	</div>
									</div>
									<hr/>
									<div id="simpleUploadWrapperDiv" style={{display:"flex",flexDirection:"row"}}>
										{postDisplayDecider(symposiumContext.displayPhoneUI,symposiumContext.symposiumName)}
									</div>
								</React.Fragment>
							}
						</Container>
						<ShadowContainer
							onClick={()=>closeModal()}
						/>
					</React.Fragment>
				)
			}}
		</SymposiumConsumer>
	,document.getElementById("extendedSymposiumContainer"));
}

export default QuickSymposiumUpload;