export const industryPostOptions=(industry,currentSelectedIndustries,subIndustries,newSubCommunityMap)=>{
	
		var industryContainerIndicator=false;
		for(var i=0;i<currentSelectedIndustries.length;i++){
			const industryArray=currentSelectedIndustries[i].industry;
			if(industry==industryArray){
				industryContainerIndicator=true;
				break;
			}
		}

		if(industryContainerIndicator!=true){
			currentSelectedIndustries.push(industry);
			const subCommunities=industry.subCommunity;
			var subCommunityCounter=subIndustries.length;
			for(var i=0;i<subCommunities.length;i++){
				const subCommunity=subCommunities[i];
				if(!newSubCommunityMap.has(subCommunity)){
					subIndustries.push(subCommunity);
					newSubCommunityMap.set(subCommunity,subCommunityCounter);
					subCommunityCounter++;
				}
			}
		}
}

