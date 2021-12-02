import AIR_PLAN_TARGET_DIVS from "../../../../Constants/airPlaneTargetDivIds.js";

export const retrieveTargetElementsFromPage=(currentPageType,userVisitedDivs)=>{
	
	let pageSpecificTotalDivs;
	switch(currentPageType){
		case "Profile":{
			const {PROFILE}=AIR_PLAN_TARGET_DIVS;
			pageSpecificTotalDivs=PROFILE;
			break;
		}

		case "Explore":{
			const {EXPLORE_PAGE}=AIR_PLAN_TARGET_DIVS;
			pageSpecificTotalDivs=EXPLORE_PAGE;
			break;
		}

		case "Symposium":{
			const {SYMPOSIUMS}=AIR_PLAN_TARGET_DIVS;
			pageSpecificTotalDivs=SYMPOSIUMS;
			break;
		}

		case "Symposium_List":{
			const {SYMPOSIUM_LIST}=AIR_PLAN_TARGET_DIVS;
			pageSpecificTotalDivs=SYMPOSIUM_LIST;
			break;
		}

		case "Symposium_Features":{
			const {SYMPOSIUM_FEATURES}=AIR_PLAN_TARGET_DIVS;
			pageSpecificTotalDivs=SYMPOSIUM_FEATURES;
			break;
		}
	}
	return retrieveDivsWithCoordinates(pageSpecificTotalDivs,userVisitedDivs);
}

const retrieveDivsWithCoordinates=(totalPageDivs,userVisitedDivs)=>{
	
	const eligibleDivs=[];
	for(var i=0;i<totalPageDivs.length;i++){
		const selectedDivId=totalPageDivs[i].divId;
		const selectedDiv=document.getElementById(selectedDivId);
		if(userVisitedDivs[selectedDivId]!=null && selectedDiv!=null){
			const {left,top}=selectedDiv.getBoundingClientRect();
			userVisitedDivs[selectedDivId]={
				...userVisitedDivs[selectedDivId],
				position:{
					left,
					top
				},
				selectedDivId
			}
			eligibleDivs.push(userVisitedDivs[selectedDivId]);
		}
	}
	return eligibleDivs;
}