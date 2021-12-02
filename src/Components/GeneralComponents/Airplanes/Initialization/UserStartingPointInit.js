

export const retrieveUserStartingPoints=(currentEligibleDivs)=>{
	let startingPoints={};
	for(var i=0;i<currentEligibleDivs.length;i++){
		const {
			position:{
				top
		}}=currentEligibleDivs[i];
		if(top<200){
			const randomTop=Math.random() * (20 - 1) + 1;

			startingPoints[currentEligibleDivs[i].selectedDivId]={
				startingLeft:"0%",
				startingTop:randomTop+"%"
			}
		}else{
			const randomLeft=Math.random() * (90 - 40) + 40;
			startingPoints[currentEligibleDivs[i].selectedDivId]={
				startingLeft:randomLeft+"%",
				startingTop:"90%"
			}
		}
	}
	return startingPoints;
}