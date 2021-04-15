
export const filterSymposiumUploadOptions=(character,symposiums,originalSymposiums)=>{
	debugger;
	if(character==""){
		return originalSymposiums;
	}
	else{
		const displaySearchIndustries=[];

		for(var i=0;i<symposiums.length;i++){

			const selectedSymposiums=symposiums[i].industry;

			if(selectedSymposiums.includes(character)==true){
				displaySearchIndustries.push(symposiums[i]);
			}
		}
		return displaySearchIndustries;
	}
}