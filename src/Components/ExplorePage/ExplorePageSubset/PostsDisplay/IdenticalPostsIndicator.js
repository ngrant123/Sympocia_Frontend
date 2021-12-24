
export const identicalPostsIndicator=(currentPosts,updatedPosts)=>{
	let updatedPostsKeyPair={};
	for(var i=0;i<updatedPosts.length;i++){
		if(updatedPostsKeyPair[updatedPosts[i]._id]==null){
			updatedPostsKeyPair[updatedPosts[i]._id]=true;
		}
	}
	const identicalOccurences=[];
	for(var i=0;i<currentPosts.length;i++){
		if(updatedPostsKeyPair[currentPosts[i]._id]!=null){
			identicalOccurences.push(currentPosts[i]._id);
		}
	}
	if(identicalOccurences.length==Object.keys(updatedPostsKeyPair).length){
		return true;
	}
	return false;
}