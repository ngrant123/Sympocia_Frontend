import React,{useState,useEffect} from "react";
import {retrieveTargetElementsFromPage} from "./Initialization/TargetElementInit.js";
import {retrieveUserStartingPoints} from "./Initialization/UserStartingPointInit.js";
import Airplane from "./Airplane/index.js";
import {retrieveAirPlanes} from "../../../Actions/Requests/AirPlaneRequests/AirPlaneGetRequest.js";

const userVisitedDiv={
	friendsGaugeContainer:[
		{
			_id:"60422f2f79180f0c11e3d9f2"
		}
	],
	personalInformationDisplayDiv:[
		{
			_id:"60422f2f79180f0c11e3d9f2"
		}
	],
	championModal:[
		{
			_id:"60422f2f79180f0c11e3d9f2"
		}
	]
}
const AirplaneRender=({currentPage,componentMountedStatus,paramsId,userId})=>{
	const [airplanes,changeAirplanes]=useState([]);
	useEffect(()=>{
		debugger;
		const fetchData=async()=>{
			if(componentMountedStatus){
				const {confirmation,data}=await retrieveAirPlanes(
													userId,
													currentPage,
													paramsId);
				if(confirmation=="Success"){
					const {message}=data;
					const eligibleTargetDivs=retrieveTargetElementsFromPage(currentPage,message);
					const startingPoints=retrieveUserStartingPoints(eligibleTargetDivs);

					const airplanesRenderContainer=[];
					for(var i=0;i<eligibleTargetDivs.length;i++){
						const airplaneAnimationProps={
							startingPoint:startingPoints[eligibleTargetDivs[i].selectedDivId],
							targetDivsInformation:eligibleTargetDivs[i],
							divId:eligibleTargetDivs[i].selectedDivId,
							profilePicture:eligibleTargetDivs[i].profilePicture,
							profileIdAccessing:eligibleTargetDivs[i].profileIdAccessing
						}
						const airplaneRender=<Airplane {...airplaneAnimationProps}/>;
						airplanesRenderContainer.push(airplaneRender);
					}
					changeAirplanes([...airplanesRenderContainer]);
				}
			}
		}
		fetchData();
	},[componentMountedStatus]);

	return(
		<React.Fragment>
			{airplanes.map(data=>
				<>{data}</>
			)}
		</React.Fragment>
	)
}


export default AirplaneRender;