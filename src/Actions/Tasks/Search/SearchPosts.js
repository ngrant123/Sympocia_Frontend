
export const searchSymposiumsFilter=(posts,searchCriteria,postType)=>{
	try{
		debugger;
		searchCriteria=searchCriteria.toLowerCase();
		let postText;
		switch(postType){
			case 'Images':{
				postText="caption";
				break;
			}

			case 'Videos':{
				postText="title";
				break;
			}

			case 'RegularPosts':{
				postText="post";
				break;
			}

			case 'Blogs':{
				postText="title";
				break;
			}
		}
		const postsRanking=[];

		for(var i=0;i<posts.length;i++){
			const selectedPost=posts[i];
			const {
				[postText]:selectedText
			}=selectedPost;
			selectedText=selectedText.toLowerCase();
			selectedText=selectedText.split(" ");
			searchCriteria=searchCriteria.split(" ");
			var counter=0;

			for(var j=0;j<searchCriteria.length;j++){
				const selectedWord=searchCriteria[j];
				if(selectedWord==selectedText(counter)){
					counter++;
				}else{
					const ranking={
						rank:counter,
						postId:selectedPost._id
					}
					postsRanking.push(ranking);
					break;
				}
			}
		}

		postsRanking.sort((a,b)=>{
			return a.ranking<b.ranking?1:0;
		})

		const originalPostsMap=new Map();
		for(var i=0;i<posts.length;i++){
			originalPostsMap.set(posts[i]._id,posts[i]);
		}

		for(var i=0;i<postsRanking;i++){

			const originalPost=originalPostsMap.get(postsRanking[i]._id);
			postsRanking={...originalPost}
		}
		return postsRanking; 



	}catch(err){
		return [];
	}
}