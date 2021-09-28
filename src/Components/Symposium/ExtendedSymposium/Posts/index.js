
import React,{useState} from "react";
import SearchOptions from "./PostFilterOptions/index.js";
import Posts from "./PostDisplay/index.js"
import {suggestedSymposiumsRecursive} from "./PostDisplay/SuggestedSymposiums.js"
import {
        getImagesInIndustry,
        getVideoInIndustry,
        getBlogsInIndustry,
        getRegularPostsInIndustry,
        getIndustryInformation
} from "../../../../Actions/Requests/SymposiumRequests/SymposiumRetrieval.js";
import {PostProvider} from "./PostsContext.js";

const PostsAndFilterOptions=({state,displaySymposium,displayRecruitConfetti,profileId,displayBeacon})=>{
    
    const [endOfPostsDBIndicator,changeEndOfPostIndicator]=useState(false);
    const [isLoadingReloadedPosts,changeIsLoadingReloadedPosts]=useState(false);
    let [posts,changePosts]=useState(state.posts);
    const [postOption,changePostOptionState]=useState(state.postType);
    const [isLoadingNewPosts,changeIsLoadingNewPosts]=useState(false);
    const [postCount,changePostCount]=useState(state.postCount);
    const [postSessionToken,changePostSessionToken]=useState(state.postSessionManagmentToken);

    const uuidv4=()=>{
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }


    const  changePostOption=async(symposiumCategoryType,newPostOption,isNewPostOption,postCount,loadingNewPostsRef)=>{
        if(postCount>0){
            changeIsLoadingReloadedPosts(true);
        }else{
            changeIsLoadingNewPosts(true);
        }
        const postParameters={
            industry:state.selectedSymposiumTitle,
            postCount,
            userId:profileId,
            postSessionManagmentToken:postSessionToken,
            symposiumCategoryType
        }
        let postResults;

        if(newPostOption=="Image" || newPostOption=="Images"){
            newPostOption="Image";
            postResults=await getImagesInIndustry({...postParameters});
        }else if(newPostOption=="Video" || newPostOption=="Videos" ){
            newPostOption="Video";
            postResults=await getVideoInIndustry({...postParameters});
        }else if(newPostOption=="Blog" || newPostOption=="Blogs"){
            newPostOption="Blog";
            postResults=await getBlogsInIndustry({...postParameters});
        }else{
            newPostOption="Regular";
            postResults=await getRegularPostsInIndustry({...postParameters});
        }
        let {confirmation,data}=postResults;
        if(confirmation=="Success"){
            if(data.length==0){
                if(loadingNewPostsRef!=null)
                    loadingNewPostsRef.current.innerHTML="";

                changeEndOfPostIndicator(true);
            }else{
                if(loadingNewPostsRef!=null)
                    loadingNewPostsRef.current.innerHTML="Next Posts";
                
                const currentPosts=posts;
                let nextPosts;
                if(isNewPostOption==true)
                    nextPosts=data;
                else{
                    nextPosts=addToCurrentPosts(symposiumCategoryType,data);
                }
                changePosts({...nextPosts});
                changePostOptionState(newPostOption);
                changeEndOfPostIndicator(false);
            }
                changeIsLoadingReloadedPosts(false);
                changeIsLoadingNewPosts(false);
        }else{
            alert('Unfortunately there has been an error getting this post data. Please try again');
        }
    }

    const addToCurrentPosts=(symposiumCategoryType,postsToBeAdded)=>{
        let nextPosts;
        switch(symposiumCategoryType){
            case "The Grind":{
                let {grind}=posts;
                let updatedPosts=grind.concat(postsToBeAdded);
                posts={
                    ...posts,
                    grind:updatedPosts
                }
                nextPosts=posts;
                break;
            }

            case "Work In Progress":{
                let {progress}=posts;
                let updatedPosts=progress.concat(postsToBeAdded);
                posts={
                    ...posts,
                    progress:updatedPosts
                }
                nextPosts=posts;
                break;
            }

            case "Achievements":{
                let {accomplishment}=posts;
                let updatedPosts=accomplishment.concat(postsToBeAdded);
                posts={
                    ...posts,
                    accomplishment:updatedPosts
                }
                nextPosts=posts;
                break;
            }
        }
        return nextPosts;
    }

    const triggerReloadingPostsHandle=(symposiumCategoryType,ref)=>{
        ref.current.innerHTML="Loading...";
        changePostOption(
            symposiumCategoryType,
            postOption,
            false,
            postCount+1,
            ref);
    }

    const fetchPosts=(newPostOption,resetSearchResults)=>{
        if(resetSearchResults==true){
            resetAndFetchPosts(newPostOption);
        }else if(newPostOption!=postOption){
            resetAndFetchPosts(newPostOption);
        }
    }

    const resetAndFetchPosts=(newPostOption)=>{
        changeIsLoadingReloadedPosts(true);
        changePostCount(0);
        changePosts([]);
        changePostSessionToken(uuidv4());
        changePostOption(
            null,
            newPostOption,
            true,
            0);
    }

    const searchFilterPosts=(posts)=>{
        changePosts({...posts})
    }

    const triggerPushPlaceholder=(dummyData)=>{
        const {symposiumUploadCategory}=dummyData;
        let updatedPosts;
        switch(symposiumUploadCategory){
            case "The Grind":{
                let {grind}=posts;
                grind.splice(0,0,dummyData);
                const updatedGrindPosts=[...grind]
                posts={
                    ...posts,
                    grind:updatedGrindPosts
                }
                updatedPosts=posts;
                break;
            }

            case "Work In Progress":{
                let {progress}=posts;
                progress.splice(0,0,dummyData);
                const updatedProgressPosts=[...progress];
                posts={
                    ...posts,
                    progress:updatedProgressPosts
                }
                updatedPosts=posts;
                break;
            }

            case "Achievements":{
                let {accomplishment}=posts;
                accomplishment.splice(0,0,dummyData);
                const updatedAccomplishmentPosts=[...accomplishment];
                posts={
                    ...posts,
                    accomplishment:updatedAccomplishmentPosts
                }
                updatedPosts=posts;
                break;
            }
        }
        changePosts({...updatedPosts});
    }

    const triggerRemovePostFromStack=(postId,postCategoryType)=>{
        let updatedPosts;
        let selectedPost;
        switch(postCategoryType){
            case "The Grind":{

                let {grind}=posts;
                const targetIndex=retrieveSelectedPostIdIndex(grind,postId);
                selectedPost=grind[targetIndex];
                grind.splice(targetIndex,1);

                const updatedGrindPosts=[...grind]
                posts={
                    ...posts,
                    grind:updatedGrindPosts
                }
                updatedPosts=posts;
                break;
            }

            case "Work In Progress":{

                let {progress}=posts;
                const targetIndex=retrieveSelectedPostIdIndex(progress,postId);
                selectedPost=progress[targetIndex];
                progress.splice(targetIndex,1);

                const updatedProgressPosts=[...progress];
                posts={
                    ...posts,
                    progress:updatedProgressPosts
                }
                updatedPosts=posts;
                break;
            }

            case "Achievements":{

                let {accomplishment}=posts;
                const targetIndex=retrieveSelectedPostIdIndex(accomplishment,postId);
                selectedPost=accomplishment[targetIndex];
                accomplishment.splice(targetIndex,1);

                const updatedAccomplishmentPosts=[...accomplishment];
                posts={
                    ...posts,
                    accomplishment:updatedAccomplishmentPosts
                }
                updatedPosts=posts;
                break;
            }
        }
        changePosts({...updatedPosts});
        return selectedPost;
    }

    const retrieveSelectedPostIdIndex=(posts,postId)=>{
        let targetIndex;
        posts.forEach((data,index)=>{
            if(data._id==postId)
                targetIndex=index;
        })
        return targetIndex;
    }

    const triggerSwapPostFromStack=(postId,currentPostCategoryType,targetPostCategoryType,symposiumName)=>{
        if(state.selectedSymposiumTitle==symposiumName){
            const selectedPost=triggerRemovePostFromStack(postId,currentPostCategoryType);
            const tempPosts=[];
            tempPosts.push(selectedPost);
            const nextPosts=addToCurrentPosts(targetPostCategoryType,tempPosts);
            changePosts({...nextPosts});
        }   
    }


    return(
        <PostProvider
            value={{
                pushDummyPlaceholderPostToStack:(dummyData)=>{
                   triggerPushPlaceholder(dummyData);
                },
                removePostFromStack:(postId,postCategoryType)=>{
                    triggerRemovePostFromStack(postId,postCategoryType);
                },swapPostFromStack:(
                        postId,
                        currentPostCategoryType,
                        targetPostCategoryType,
                        symposiumName)=>{
                    triggerSwapPostFromStack(postId,currentPostCategoryType,targetPostCategoryType,symposiumName);
                }
            }}>
            <SearchOptions
                state={{
                    headerAnimation:state.headerAnimation,
                    displayPhoneUI:state.displayPhoneUI,
                    selectedSymposiumTitle:state.selectedSymposiumTitle,
                    displayDesktopUI:state.displayDesktopUI,
                    symposiumId:state.symposiumId
                }}
                updatePosts={fetchPosts}
                posts={posts}
                postType={postOption}
                searchFilterPosts={searchFilterPosts}
                displayBeacon={displayBeacon}
            />
            <hr/>
            <Posts
                state={{
                    posts,
                    isLoadingReloadedPosts,
                    endOfPostsDBIndicator,
                    headerAnimation:state.headerAnimation,
                    postType:postOption,
                    handleScroll:state.handleScroll,
                    postCount,
                    selectedSymposiumTitle:state.selectedSymposiumTitle,
                    displayDesktopUI:state.displayDesktopUI,
                    isOligarch:state.isOligarch
                }}
                isLoadingNewPosts={isLoadingNewPosts}
                triggerReloadingPostsHandle={triggerReloadingPostsHandle}
                displaySymposium={displaySymposium}
                displayRecruitConfetti={displayRecruitConfetti}
                profileId={profileId}
            />
        </PostProvider>
    )
}

export default PostsAndFilterOptions;