
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

const PostsAndFilterOptions=({state,displaySymposium,displayRecruitConfetti,profileId})=>{

    const [endOfPostsDBIndicator,changeEndOfPostIndicator]=useState(false);
    const [isLoadingReloadedPosts,changeIsLoadingReloadedPosts]=useState(false);
    const [posts,changePosts]=useState(state.posts);
    const [postOption,changePostOptionState]=useState(state.postType);
    const [isLoadingNewPosts,changeIsLoadingNewPosts]=useState(false);
    const [postCount,changePostCount]=useState(state.postCount);

    const  changePostOption=async(newPostOption,isNewPostOption,postCount)=>{
        if(postCount>0){
            changeIsLoadingReloadedPosts(true);
        }else{
            changeIsLoadingNewPosts(true);
        }
        const postParameters={
            industry:state.selectedSymposiumTitle,
            postCount,
            userId:profileId
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
                changeEndOfPostIndicator(true);
            }else{
                const currentPosts=posts;
                let nextPosts;
                if(isNewPostOption==true)
                    nextPosts=data;
                else
                    nextPosts=currentPosts.concat(data);

                if(newPostOption!="Video")
                    nextPosts=postCount==0?suggestedSymposiumsRecursive(nextPosts):nextPosts;

                changePostOptionState(newPostOption);
                changePosts([...nextPosts]);
                changeEndOfPostIndicator(false);
            }
                changeIsLoadingReloadedPosts(false);
                changeIsLoadingNewPosts(false);
        }else{
            alert('Unfortunately there has been an error getting this post data. Please try again');
        }
    }
    const triggerReloadingPostsHandle=(postOption)=>{
        changePostCount(postCount+1);
        changePostOption(postOption,null,postCount+1);
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
        changePostOption(newPostOption,true,0);
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
                    selectedSymposiumTitle:state.selectedSymposiumTitle
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