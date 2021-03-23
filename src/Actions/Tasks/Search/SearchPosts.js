
export const searchPostsFilter=(posts,searchCriteria,postType)=>{
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



	}catch(err){
		console.log(err);
		return [];
	}
}