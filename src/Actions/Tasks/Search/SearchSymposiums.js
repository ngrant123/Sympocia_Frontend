export const searchSymposiumsFilter=(targetSymposium,posts)=>{
	try{
		const filteredPost=[];
		for(var i=0;i<posts.length;i++){

			const selectedPost=posts[i];
			const {industriesUploaded}=selectedPost;

			for(var j=0;j<industriesUploaded.length;j++){
				const symposium=industriesUploaded[j].industry;
				if(symposium==targetSymposium){
					filteredPost.push(selectedPost);
					break;
				}
			}
		}

		return filteredPost;
	}catch(err){
		return [];
	}
}