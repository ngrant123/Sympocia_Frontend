
export const searchPostsFilter=async(posts,searchCriteria,postType,isSymposiumPosts)=>{
	try{
		debugger;
		searchCriteria=searchCriteria.toLowerCase();
		let postText;
		switch(postType){
			case 'image':{
				postText="caption";
				break;
			}

			case 'video':{
				postText="title";
				break;
			}
			case 'blog':{
				postText="title";
				break;
			}

			default:{
				postText="post";
				break;
			}

		}
		if(isSymposiumPosts==true){
			const promise=[];
			Object.keys(posts).forEach((key,index)=>{
				const startingPosts=posts[key];
				promise.push(searchFunctionality(
								searchCriteria,
								startingPosts,
								postText));
			})

			return await Promise.all(promise).then(result=>{
				const filteredGrindPosts=result[0];
				const filteredProgressPosts=result[1];
				const filteredAccomplishmentPosts=result[2];

				const filteredPosts={
					accomplishment:filteredAccomplishmentPosts,
					grind:filteredGrindPosts,
					progress:filteredProgressPosts
				}
				return filteredPosts;
			})
		}else{
			return searchFunctionality(searchCriteria,posts);
		}
	}catch(err){
		return [];
	}
}

const searchFunctionality=(searchCriteria,posts,postText)=>{
	debugger;
	let postsRanking=[];
	searchCriteria=searchCriteria.split(" ");

	for(var i=0;i<posts.length;i++){
		const selectedPost=posts[i];
		const {
			[postText]:selectedText
		}=selectedPost;
		selectedText=selectedText.toLowerCase();
		selectedText=selectedText.split(" ");
		var counter=0;

		for(var j=0;j<selectedText.length;j++){
			const selectedWord=searchCriteria[counter];
			if(selectedWord==selectedText[j]){
				counter++;
			}
		}
		if(counter>0){
			const ranking={
				rank:counter,
				postId:selectedPost._id
			}
			postsRanking.push(ranking);
		}
	}

	postsRanking.sort((a,b)=>{
		return a.rank<b.rank?1:0;
	})

	const originalPostsMap=new Map();
	for(var i=0;i<posts.length;i++){
		originalPostsMap.set(posts[i]._id,posts[i]);
	}

	for(var i=0;i<postsRanking.length;i++){

		const originalPost=originalPostsMap.get(postsRanking[i].postId);
		postsRanking[i]={...originalPost}
	}
	return postsRanking; 
}





