

export const retrieveUserStartingPoints=(currentEligibleDivs)=>{
	debugger;
	let startingPoints={};
	for(var i=0;i<currentEligibleDivs.length;i++){
		const {
			position:{
				top
		}}=currentEligibleDivs[i];
		if(top>50){
			startingPoints[currentEligibleDivs[i].selectedDivId]={
				startingLeft:"0%",
				startingTop:"0%"
			}
		}else{
			startingPoints[currentEligibleDivs[i].selectedDivId]={
				startingLeft:"0%",
				startingTop:"100%"
			}
		}
	}
	return startingPoints;
}