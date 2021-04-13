
	/*
		Later on the update image, video, and regular post method can be refactored because 
		its all basically the same code. Since it works just fine right now I probably wont update it 
		at this very moment
	*/	

	const postParams=(postType,props)=>{
		let params;
		switch(postType){
			case 'Images':{
				params={
					optionTypeParam:'imgUrl',
					crownedPost:props.crownedImage==null?{}:
								props.crownedImage,
					posts:props.images
				}
				break;
			}
			case 'Videos':{
				params={
					optionTypeParam:'videoUrl',
					crownedPost:props.headerVideo==null?{}:props.headerVideo,
					posts:props.videos
				}
				break;
			}

			case 'RegularPosts':{
				params={
					crownedPost:props.headerPost==null?{}:props.headerPost,
					posts:props.posts
				}
				break;
			}
		}
		return params;
	}

	const finalReturnPosts=(props,postType,posts,crownedPost)=>{
		let finalPost;
		switch(postType){
			case 'Images':{
				finalPost={
					crownedImage:crownedPost=={}?null:crownedPost,
					images:posts==null?[]:[...posts]
				}
				break;
			}
			case 'Videos':{
				finalPost={
					headerVideo:crownedPost=={}?null:crownedPost,
					videos:posts==null?[]:[...posts]
				}
				break;
			}

			case 'RegularPosts':{
				finalPost={
					headerPost:crownedPost=={}?null:crownedPost,
					posts:posts==null?[]:[...posts]
				}
				break;
			}
		}
		return finalPost;
	}

	export const editPostIndexContext=(postData,props)=>{
		
		
		const {
			postId,
			post,
			postS3,
			postType
		}=postData;
		let newEditedPost;
		let newEditedPostS3;
		debugger;
		const {isCrownedPost}=post;

		//remove null keys from post and postS3
		for(let objectKey in post){
			const value=post[objectKey];
			if(value!=null){
				newEditedPost={
					...newEditedPost,
					[objectKey]:value
				}
			}
		}
		const {
			optionTypeParam,
			crownedPost,
			posts
		}=postParams(postType,props);

		postS3.forEach((s3Option,index)=>{
			let {newUrl,optionType,isCurrentlyDeleted}=s3Option;

			if(newUrl!=null || isCurrentlyDeleted==false){
				if(optionType=="postUrl")
					optionType=optionTypeParam

				newEditedPostS3={
					...newEditedPostS3,
					[optionType]:newUrl
				}
			}else{
				if(isCurrentlyDeleted==true){
					newEditedPostS3={
						...newEditedPostS3,
						[optionType]:null
					}
				}
			}
		});
		let finalPosts;

		let currentCrownedPost=crownedPost;
		let currentPosts=posts;

		if(isCrownedPost!=null){
			if(isCrownedPost==false){
				currentCrownedPost={
					...currentCrownedPost,
					...newEditedPost,
					...newEditedPostS3
				}

				if((Object.keys(currentCrownedPost).length === 0)==false)
					currentPosts.push(currentCrownedPost);

				currentPosts.sort(function(a,b){
					const aCreationDate=a.datePosted;
					const bCreationDate=b.datePosted;
					return bCreationDate>aCreationDate?1:-1;
				});
				currentCrownedPost=null;
				
			}else{
				let selectedPost;
				for(var i=0;i<currentPosts.length;i++){
					let post=currentPosts[i];

					if(post._id==postId){
						selectedPost=post;
						currentPosts.splice(i,1);
						break;
					}
				}

				if((Object.keys(currentCrownedPost).length === 0)==false)

				currentPosts.push({
				...currentCrownedPost,
					isCrownedPost:false
				});

				currentPosts.sort(function(a,b){
					const aCreationDate=a.datePosted;
					const bCreationDate=b.datePosted;
					return bCreationDate>aCreationDate?1:-1;
				});

				currentCrownedPost={
					...selectedPost,
					...newEditedPost,
					...newEditedPostS3
				}
			}
		}else{
			if(postId==currentCrownedPost._id){
				currentCrownedPost={
					...currentCrownedPost,
					...newEditedPost,
					...newEditedPostS3
				}
			}else{
				for(var i=0;i<currentPosts.length;i++){
					let post=currentPosts[i];

					if(post._id==postId){
						post={
							...post,
							...newEditedPost,
							...newEditedPostS3
						}
						currentPosts[i]=post;
						break;
					}
				}
			}
		}
		if(currentCrownedPost!=null){
			if((Object.keys(currentCrownedPost).length === 0)==true)
					currentCrownedPost=null
		}

		finalPosts=finalReturnPosts(props,postType,currentPosts,currentCrownedPost);
		return finalPosts;
	}


	export const removePostIndexContext=(postId,props,postType)=>{
		
		const {
			optionTypeParam,
			crownedPost,
			posts
		}=postParams(postType,props);

		let currentCrownedPost=crownedPost;
		let currentPosts=posts;

		let newPersonalInfoObject;
		if(postId==currentCrownedPost._id){
			currentCrownedPost=null;
		}else{
			for(var i=0;i<currentPosts.length;i++){
				let post=currentPosts[i];

				if(post._id==postId){
					currentPosts.splice(i,1);
					break;
				}
			}
		}

		if(currentCrownedPost!=null){
			if((Object.keys(currentCrownedPost).length === 0)==true)
					currentCrownedPost=null
		}
		debugger;
		let finalPosts=finalReturnPosts(props,postType,currentPosts,currentCrownedPost);
		console.log(finalPosts);
		return finalPosts;
	}

	/*
		From what im looking at right now updateImagePostIndexContext,updateVideoPostIndexContext,updateRegularPostIndexContext
		look like they basically have the same code so it should be refactored later sometime
	*/

	export const updateImagePostIndexContext=(image,props)=>{
		
		const {isCrownedPost}=image;
		let currentCrownedImage=props.crownedImage;
		let currentImages=props.images;
		let newImageObject;
		if(isCrownedPost==true){
			if(currentCrownedImage!=null)
				currentImages.push(currentCrownedImage);

			currentImages.sort(function(a,b){
				const aCreationDate=a.datePosted;
				const bCreationDate=b.datePosted;
				return bCreationDate>aCreationDate?1:-1;
			});
			newImageObject={
				crownedImage:image.image,
				images:currentImages
			}
		}else{
			currentImages.splice(0,0,image)
			newImageObject={
				...props,
				images:[...currentImages]
			}
		}
		return newImageObject;
	}

	export const updateVideoPostIndexContext=(videoObject,videoPost)=>{
		
		const {isCrownedVideo,video}=videoObject;
		let newVideoObject;
		if(isCrownedVideo==true){
			//Set 
			
			var currentVideos=videoPost.videos;
			var currentCrownedVideo=videoPost.headerVideo;
			if(currentCrownedVideo!=null){
				currentVideos.push(currentCrownedVideo);
			}
			currentVideos.sort(function(a,b){
				const aCreationDate=a.datePosted;
				const bCreationDate=b.datePosted;
				return bCreationDate>aCreationDate?1:-1;
			});

			newVideoObject={
				headerVideo:video,
				videos:currentVideos==null?[]:currentVideos
			}
		}else{
			var currentVideos=videoPost.videos;
			currentVideos.splice(0,0,videoObject);
			newVideoObject={
					...videoPost,
					videos:currentVideos
			}
		}
		return newVideoObject;
	}


	export const updateRegularPostIndexContext=(regularPostProp,regularPost)=>{
		
		const {isCrownedPost,post}=regularPostProp;
		if(isCrownedPost==true){
			//Set 
			
			var currentPosts=regularPost.posts;
			var currentCrownedRegularPost=regularPost.headerPost;
			if(currentCrownedRegularPost!=null){
				currentPosts.push(currentCrownedRegularPost);
			}
			currentPosts.sort(function(a,b){
				const aCreationDate=a.datePosted;
				const bCreationDate=b.datePosted;
				return bCreationDate>aCreationDate?1:-1;
			});

			var newPostObject={
				headerPost:post,
				posts:currentPosts==null?[]:currentPosts
			}
		}else{
			var currentPosts=regularPost.posts;
			currentPosts.splice(0,0,regularPostProp);
			var newPostObject={
					...regularPost,
					posts:currentPosts
			}
		}

		return newPostObject;
	}














