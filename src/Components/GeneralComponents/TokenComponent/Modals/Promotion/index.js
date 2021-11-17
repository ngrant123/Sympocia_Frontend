import React,{useState,useEffect} from "react";
import styled from "styled-components";
import {createPortal} from "react-dom";
import GoldStampIcon from "../../../../../designs/img/GoldStampIcon.png";
import SilverStampIcon from "../../../../../designs/img/SilverStampIcon.png";
import BronzeStampIcon from "../../../../../designs/img/BronzeStampIcon.png";

const Container=styled.div`
	position:fixed;
	height:55%;
	width:40%;
	left:30%;
	top:20%;
	z-index:51;
	background-color:white;
	border-radius:5px;
	overflow-y:auto;
	padding:5%;

	@media screen and (max-width:650px){
		width:100%;
		height:100%;
		top:0%;
		left:0%;
		justify-content:flex-start;
	} 
`;

const UnlockedFeaturesCSS={
	listStyle:"none",
	display:"inline-block",
	backgroundColor:"#C8B0F4",
	borderRadius:"5px",
	padding:"10px",
	color:"white",
	marginRight:"2%",
	cursor:"pointer",
	textAlign:"center",
	width:"90%"
}

const options=[
	{
		tier:"Bronze",
		price:2.99,
		offers:[
			"50+ friends node avatars",
			"Increased friends gauge node maximum from 3 to 5"
		]
	},
	{
		tier:"Silver",
		price:4.99,
		offers:[
			"3 Free Ads",
			//"Payment option ability(Sympocia takes 15% of each donation you recieve",
			"Bronze offers included"
		]
	},
	{
		tier:"Gold",
		price:9.99,
		offers:[
			//"Payment option ability(Sympocia takes 5% of each donation you recieve)",
			"5 Free Ads",
			"Option to upload own friends node avatars",
			"Silver and Bronze offers included (Excluding the 3 free ads)"
		]
	}
]

const Promotion=({closeModal,tokenLevel})=>{
	const [unlockedFeaturesDescriptionPage,changeUnlockedFeaturesDescriptionPage]=useState(false);
	const [featuresExplanation,changeFeaturesExplanation]=useState();
	const [promotionIconTier,changePromotionIconTier]=useState();

	useEffect(()=>{
		switch(tokenLevel){
			case "Bronze":{
				changePromotionIconTier(BronzeStampIcon);
				break;
			}

			case "Silver":{
				changePromotionIconTier(SilverStampIcon);
				break;
			}

			case "Gold":{
				changePromotionIconTier(GoldStampIcon);
				break;
			}
		}
	},[]);

	const displayUnlockedFeaturesBreakDown=()=>{
		debugger;
		switch(tokenLevel){
			case "Bronze":{
				changeFeaturesExplanation(options[0].offers);
				break;
			}

			case "Silver":{
				changeFeaturesExplanation(options[1].offers);
				break;
			}

			case "Gold":{
				changeFeaturesExplanation(options[2].offers);
				break;
			}
		}
		changeUnlockedFeaturesDescriptionPage(true)
	}

	return (
		<Container>
			<div style={{marginBottom:"2%",cursor:"pointer"}} onClick={()=>closeModal()}>
				<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x"
					 width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="#9e9e9e" fill="none" 
					 stroke-linecap="round" stroke-linejoin="round">
					  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
					  <circle cx="12" cy="12" r="9" />
					  <path d="M10 10l4 4m0 -4l-4 4" />
				</svg>
			</div>

			<p style={{fontSize:"18px",color:"#C8B0F4"}}>
				<b>{tokenLevel} Tier</b>
			</p>
			<div style={{display:"flex",flexDirection:"column"}}>
				{unlockedFeaturesDescriptionPage==true?
					<div>
						<p style={{fontSize:"18px"}}>
							<b>Unlocked Features:</b>
						</p>
						<hr/>
						<ul style={{padding:"0px"}}>
							{featuresExplanation.map(data=>
								<li style={{marginBottom:"10%"}}>{data}</li>
							)}
						</ul>
					</div>:
					<React.Fragment>
						<img src={promotionIconTier} 
							style={{width:"55%",height:"90%",borderRadius:"50%",marginBottom:"5%"}}
						/>
						<p style={{width:"70%",marginBottom:"20%"}}>
							<b>Congratulations!!! You have ascended to the next stage</b>
						</p>

						<div style={UnlockedFeaturesCSS} onClick={()=>displayUnlockedFeaturesBreakDown()}>
							<p style={{fontSize:"18px"}}>View Unlocked Features</p>
						</div>
					</React.Fragment>
				}
			</div>
		</Container>
	)
}

export default Promotion;