import React,{useState} from "react";
import styled from "styled-components";
import BadgeInformation from "./BadgeInformation.js";

const BadgeDisplay=({profileId})=>{
	const [isBadgeInformationMounted,changeIsBadgeInformationMounted]=useState(false);
	return(
		<React.Fragment>
			<div class="dropdown">
				<button class="btn btn-primary dropdown-toggle" 
					onClick={()=>changeIsBadgeInformationMounted(true)}
					type="button" data-toggle="dropdown" style={{borderStyle:"none",backgroundColor:"white"}}>
					<div class="fa fa-shield"
						style={{fontSize:"30px",color:"#6e6e6e",cursor:"pointer"}}
					/>
				</button>
				<ul class="dropdown-menu" style={{width:"400px",height:"400px",padding:"30px"}}>
					{isBadgeInformationMounted==true &&(
						<BadgeInformation
							profileId={profileId}
						/>
					)}
				</ul>
			</div>
		</React.Fragment>
	)
}


export default BadgeDisplay;