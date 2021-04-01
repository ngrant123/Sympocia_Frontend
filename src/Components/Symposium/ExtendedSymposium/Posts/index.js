
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
    const [postOption,changePostOptionState]=useState(state.postOption);
    const [postCount,changePostCount]=useState(state.postCount);

    const  changePostOption=async(postOption)=>{
        debugger;
        changePostOptionState(postOption);
        const postParameters={
            industry:state.selectedSymposiumTitle,
            postCount,
            userId:profileId
        }
        let postResults;

        if(postOption=="Image"){
            postResults=await getImagesInIndustry({...postParameters});
        }else if(postOption=="Video"){
            postResults=await getVideoInIndustry({...postParameters});
        }else if(postOption=="Blog"){
            postResults=await getVideoInIndustry({...postParameters});
        }else{
            postOption="Regular";
            postResults=await getRegularPostsInIndustry({...postParameters});
        }
        let {confirmation,data}=postResults;

        if(confirmation=="Success"){
            if(data.length==0){
                changeEndOfPostIndicator(true);
                changeIsLoadingReloadedPosts(false);

                /*
                    this.setState({
                        endOfPostsDBIndicator:true,
                        isLoadingReloadedPosts:false,
                        isLoading:false
                    })
                */
            }else{
                const currentPosts=state.posts;
                let nextPosts=currentPosts.concat(data);
                nextPosts=postCount==0?suggestedSymposiumsRecursive(nextPosts):nextPosts;

                changeEndOfPostIndicator(false);
                changeIsLoadingReloadedPosts(false);
                changePostOptionState(postOption);
                changePosts([...nextPosts]);
                /*
                    this.setState({
                        posts:this.state.postCount==0?this.addSuggestedSymposiums(nextPosts):nextPosts,
                        postType:postOption,
                        isLoadingReloadedPosts:false,
                        endOfPostsDBIndicator:false,
                        isLoading:false
                    },()=>{
                        this.highlightAppropriatePostOption(postOption);
                    })
                */
            }
        }else{
            alert('Unfortunately there has been an error getting this post data. Please try again');
        }
    }
    const triggerReloadingPostsHandle=(postOption)=>{
        changeIsLoadingReloadedPosts(true);
        changePostCount(postCount+1);
        changePostOption(postOption);
    }

    const fetchPosts=(newPostOption)=>{
        if(newPostOption!=postOption){
            changeIsLoadingReloadedPosts(true);
            changePostCount(0);
            changePosts([]);
            changePostOption(newPostOption);
        }
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
            />
            <hr/>
            <Posts
                state={{
                    posts,
                    isLoadingReloadedPosts,
                    endOfPostsDBIndicator,
                    headerAnimation:state.headerAnimation,
                    postType:state.postType,
                    handleScroll:state.handleScroll,
                    postCount:state.postCount,
                    selectedSymposiumTitle:state.selectedSymposiumTitle
                }}
                triggerReloadingPostsHandle={triggerReloadingPostsHandle}
                displaySymposium={displaySymposium}
                displayRecruitConfetti={displayRecruitConfetti}
                profileId={profileId}
            />
        </React.Fragment>
    )
}

export default PostsAndFilterOptions;