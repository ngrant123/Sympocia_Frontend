export const suggestedSymposiumsRecursive=(posts)=>{
		
	if(posts==null||posts.length==0){
		return posts;
	}else if(posts.length==1){
		posts.splice(1,0,"suggestedSymposium");
		return posts;
	}else{
		var randomNumber;
		if(posts.length<5){
			randomNumber=Math.floor(Math.random() * ((posts.length-1) - 1 + 1)) + 1;
		}else{
			randomNumber=Math.floor(Math.random() * (4 - 1 + 1)) + 1;
		}

		posts.splice(randomNumber,0,"suggestedSymposium");
		const currentPosts=posts.slice(0,6);
		const newPost=posts.slice(6,posts.length);
		const returnArray=suggestedSymposiumsRecursive(newPost);
		for(var i=0;i<returnArray.length;i++){
			currentPosts.push(returnArray[i]);
		}
		return currentPosts;
	}
}
