import React,{useState} from "react";
import styled from "styled-components";
import BadgeInformation from "./BadgeInformation.js";

const Container=styled.div`
	@media screen and (max-width:650px){
		#dropDownMenu{
			left:-345% !important;
			width:300px !important;
		}
	}
`;

const DropDownMenuCSS={
	height:"400px",
	width:"400px",
	padding:"30px",
	overflow:"auto", 
	backgroundColor:"white"
}

const BadgeDisplay=({profileId})=>{
	const [isBadgeInformationMounted,changeIsBadgeInformationMounted]=useState(false);
	return(
		<Container>
			<div class="dropdown">
				<button class="btn btn-primary dropdown-toggle" 
					onClick={()=>changeIsBadgeInformationMounted(true)}
					type="button" data-toggle="dropdown" style={{borderStyle:"none",backgroundColor:"white"}}>
					<div class="fa fa-shield"
						style={{fontSize:"30px",color:"#6e6e6e",cursor:"pointer"}}
					/>
				</button>
				<ul id="dropDownMenu" class="dropdown-menu" style={DropDownMenuCSS}>
					{isBadgeInformationMounted==true &&(
						<BadgeInformation
							profileId={profileId}
						/>
					)}
				</ul>
			</div>
		</Container>
	)
}


export default BadgeDisplay;