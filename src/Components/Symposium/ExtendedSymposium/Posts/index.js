
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

const PostsAndFilterOptions=({state,displaySymposium,displayRecruitConfetti,profileId,displayBeacon})=>{
    console.log(state);
    console.log("Posts filter options rerender");
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
        console.log(postParameters);
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
        debugger;
        let {confirmation,data}=postResults;
        if(confirmation=="Success"){
            console.log(data);
            if(data.length==0){
                if(loadingNewPostsRef!=null)
                    loadingNewPostsRef.current.innerHTML="";

                changeEndOfPostIndicator(true);
            }else{
                if(loadingNewPostsRef!=null)
                    loadingNewPostsRef.current.innerHTML="Next Posts";
                
                const currentPosts=posts;
                console.log(posts);
                let nextPosts;
                if(isNewPostOption==true)
                    nextPosts=data;
                else{
                    debugger;
                    switch(symposiumCategoryType){
                        case "The Grind":{
                            let {grind}=posts;
                            let updatedPosts=grind.concat(data);
                            grind=updatedPosts;
                            posts={
                                ...posts,
                                grind
                            }
                            nextPosts=posts;
                            break;
                        }

                        case "Work In Progress":{
                            let {progress}=posts;
                            let updatedPosts=progress.concat(data);
                            progress=updatedPosts;
                            posts={
                                ...posts,
                                progress
                            }
                            nextPosts=posts;
                            break;
                        }

                        case "Achievements":{
                            let {accomplishment}=posts;
                            let updatedPosts=accomplishment.concat(data);
                            accomplishment=updatedPosts;
                            posts={
                                ...posts,
                                accomplishment
                            }
                            nextPosts=posts;
                            break;
                        }
                    }
                }
                console.log(nextPosts);
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

    const triggerReloadingPostsHandle=(symposiumCategoryType,ref)=>{
        console.log(ref);
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
        changePosts([...posts])
    }

    return(
        <React.Fragment>
            <SearchOptions
                state={{
                    headerAnimation:state.headerAnimation,
                    displayPhoneUI:state.displayPhoneUI,
                    selectedSymposiumTitle:state.selectedSymposiumTitle,
                    displayDesktopUI:state.displayDesktopUI
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
                    displayDesktopUI:state.displayDesktopUI
                }}
                isLoadingNewPosts={isLoadingNewPosts}
                triggerReloadingPostsHandle={triggerReloadingPostsHandle}
                displaySymposium={displaySymposium}
                displayRecruitConfetti={displayRecruitConfetti}
                profileId={profileId}
            />
        </React.Fragment>
    )
}

export default PostsAndFilterOptions;