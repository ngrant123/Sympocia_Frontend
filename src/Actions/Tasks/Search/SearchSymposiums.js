export const searchSymposiumsFilter=(targetSymposium,posts)=>{
	try{
		const filteredPost=[];
		for(var i=0;i<posts.length;i++){

			const selectedPost=posts[i];
			if(selectedPost!="suggestedSymposium"){
				const {industriesUploaded}=selectedPost;

				for(var j=0;j<industriesUploaded.length;j++){
					const symposium=industriesUploaded[j].industry;
					if(symposium==targetSymposium){
						filteredPost.push(selectedPost);
						break;
					}
				}
			}
		}
		return filteredPost;
	}catch(err){
		return [];
	}
}


export const initializeSymposiums=(retrievedCurrentDisplayedPosts)=>{
	let displayedPosts=retrievedCurrentDisplayedPosts();
	const postSelectedSymposiums=[];
	const isSymposiumsContained=new Map();

	for(var i=0;i<displayedPosts.length;i++){
		const currentPost=displayedPosts[i];
		if(currentPost!="suggestedSymposium"){
			const symposiums=displayedPosts[i].industriesUploaded;
			for(var j=0;j<symposiums.length;j++){
				const selectedSymposium=symposiums[j].industry;
				if(isSymposiumsContained.get(selectedSymposium)==null){
					isSymposiumsContained.set(selectedSymposium,1);
					postSelectedSymposiums.push(selectedSymposium);
				}
			}
		}
	}
	return postSelectedSymposiums;
}