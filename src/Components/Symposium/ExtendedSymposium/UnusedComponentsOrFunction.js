{/*
		  
export const highlightAppropriatePostOption=(postOption)=>{
	document.getElementById("regular").style.backgroundColor="white";
	document.getElementById("regular").style.color="#5298F8";

	document.getElementById("image").style.backgroundColor="white";
	document.getElementById("image").style.color="#5298F8";

	document.getElementById("video").style.backgroundColor="white";
	document.getElementById("video").style.color="#5298F8";

	document.getElementById("blog").style.backgroundColor="white";
	document.getElementById("blog").style.color="#5298F8";

	switch(postOption){
		case "Image":{
			document.getElementById("image").style.backgroundColor="#5298F8";
			document.getElementById("image").style.color="white";
			break;
		}
		case "Video":{
			document.getElementById("video").style.backgroundColor="#5298F8";
			document.getElementById("video").style.color="white";
			break;
		}
		case "Blog":{
			document.getElementById("blog").style.backgroundColor="#5298F8";
			document.getElementById("blog").style.color="white";
			break;
		}
		case "Regular":{
			document.getElementById("regular").style.backgroundColor="#5298F8";
			document.getElementById("regular").style.color="white";
			break;
		}
	}
}



		  triggerReloadingPostsHandle=()=>{
		this.setState({
			triggerPostReload:true,
			isLoadingReloadedPosts:true,
			postCount:(this.state.postCount+1)
		},()=>{
			this.changePostOption(this.state.postOption)	
		})
	}


	toggleLoading=(postOption)=>{
		this.setState({
			isLoading:true,
			posts:[],
			postCount:0
		},()=>{
			this.changePostOption(postOption);
		})
	}


		  handlePreviousSymposiumButton=async()=>{
		  	this.fadeOutInEffect();
		  	if(this.state.symposiumCounter!=-1){
		  		const newCounter=this.state.symposiumCounter-1;
		  		const newSymposium=newCounter==-1?this.props.match.params.symposiumName:this.state.symposiums[newCounter].symposium;
		  		const postParameters={
					industry:newSymposium,
					postCount:0,
					userId:this.props.profileId
				}
		  		var {confirmation,data}=await getImagesInIndustry(postParameters);
		  		if(confirmation=="Success"){
		  			let newHomePagePosts=this.addSuggestedSymposiums(data);
		  			this.setState(prevState=>({
			  			...prevState,
			  			selectedSymposiumTitle:newSymposium,
			  			backgroundColor:this.symposiumBackgroundColor(newSymposium),
			  			symposiumCounter:newCounter,
			  			posts:newHomePagePosts,
						postType:"Image",
						isLoading:false
			  		}))
		  		}else{
		  			alert('Unfortunately there has been an error getting this symposiums data. Please try again ');
		  		}
		  	 }
		  }


		handleNextSymposiumButton=async()=>{
		  		this.fadeOutInEffect();
		  		if((this.state.symposiumCounter+1)<this.state.symposiums.length){

		  		const newCounter=this.state.symposiumCounter+1;
		  		const newSymposium=this.state.symposiums[newCounter];
		  		const postParameters={
					industry:newSymposium.symposium,
					postCount:0,
					userId:this.props.profileId
				}

				var {confirmation,data}=await getImagesInIndustry(postParameters);

				if(confirmation=="Success"){
					let newHomePagePosts=this.addSuggestedSymposiums(data);
					this.setState(prevState=>({
			  			...prevState,
			  			selectedSymposiumTitle:newSymposium.symposium,
			  			backgroundColor:this.symposiumBackgroundColor(newSymposium.symposium),
			  			symposiumCounter:newCounter,
			  			posts:newHomePagePosts,
						postType:"Image",
						isLoading:false
			  		}))
				}else{
					alert('Unfortunately there has been an error getting this symposiums data. Please try again');
				}
		  	}
		  }
	*/}



		/*

				}else if(postOption=="Video"){
					var {confirmation,data}=await getVideoInIndustry(postParameters);
					
					if(confirmation=="Success"){
						if(data.length==0){
							this.setState({
								endOfPostsDBIndicator:true,
								isLoadingReloadedPosts:false,
								isLoading:false
							})
						}else{
							const currentPosts=this.state.posts;
							const nextPosts=currentPosts.concat(data);
							this.setState({
								posts:this.state.postCount==0?this.addSuggestedSymposiums(nextPosts):nextPosts,
								postType:"Video",
								isLoadingReloadedPosts:false,
								endOfPostsDBIndicator:false,
								isLoading:false
							},function(){
								this.highlightAppropriatePostOption(postOption);
							})
						}
					}else{
						alert('Unfortunately there has been an error getting this video data. Please try again');
					}

				}else if(postOption=="Blog"){
					var {confirmation,data}=await getBlogsInIndustry(postParameters);
					
					if(confirmation=="Success"){
						if(data.length==0){
							this.setState({
								endOfPostsDBIndicator:true,
								isLoadingReloadedPosts:false,
								isLoading:false
							})
						}else{
							const currentPosts=this.state.posts;
							const nextPosts=currentPosts.concat(data);
							//var newHomePagePosts=this.addSuggestedSymposiums(nextPosts);
							this.setState({
								posts:this.state.postCount==0?this.addSuggestedSymposiums(nextPosts):nextPosts,
								postType:"Blog",
								isLoadingReloadedPosts:false,
								endOfPostsDBIndicator:false,
								isLoading:false
							},function(){
								this.highlightAppropriatePostOption(postOption);
							})
						}
					}else{
						alert('Unfortunately there has been an error getting this blog data. Please try again');
					}
				}else{
					var {confirmation,data}=await getRegularPostsInIndustry(postParameters);
					
					if(confirmation=="Success"){
						if(data.length==0){
							this.setState({
								endOfPostsDBIndicator:true,
								isLoadingReloadedPosts:false,
								isLoading:false
							})
						}else{
							const currentPosts=this.state.posts;
							const nextPosts=currentPosts.concat(data);
							//var newHomePagePosts=this.addSuggestedSymposiums(nextPosts);
							this.setState({
								posts:this.state.postCount==0?this.addSuggestedSymposiums(nextPosts):nextPosts,
								postType:"Regular",
								isLoadingReloadedPosts:false,
								endOfPostsDBIndicator:false,
								isLoading:false
							},function(){
								this.highlightAppropriatePostOption(postOption);
							})
						}
					}else{
						alert('Unfortunately there has been an error getting this regular post data. Please try again');
					}
				}
			*/