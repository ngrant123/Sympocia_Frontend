import React,{useMemo} from "react";
import FriendsGauge from "../PersonalProfileSubset/FriendsGaugeSection/FriendsGauge.js";

const FriendsGaugeContainer=(props)=>{
	const {
		personalInformation:{
			friendsGauge,
			friendsGaugeNodes
		}
	}=props;
	const renderFriendsGauge=useMemo(()=>{
		return <FriendsGauge
					{...props}
				/>
	},[friendsGauge,friendsGaugeNodes])
	return(
		<>{renderFriendsGauge}</>
	)
}


export default React.memo(FriendsGaugeContainer);