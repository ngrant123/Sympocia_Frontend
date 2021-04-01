
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
    const [postCount,changePostCount]=useState(state.postCount);

    const  changePostOption=async(newPostOption,isNewPostOption,postCount)=>{
        debugger;
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
        console.log(postResults);
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
                debugger;
                const currentPosts=posts;
                let nextPosts;
                if(isNewPostOption==true)
                    nextPosts=data;
                else
                    nextPosts=currentPosts.concat(data);

                if(newPostOption!="Video")
                    nextPosts=postCount==0?suggestedSymposiumsRecursive(nextPosts):nextPosts;

                changeEndOfPostIndicator(false);
                changeIsLoadingReloadedPosts(false);
                changePostOptionState(newPostOption);
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
        debugger;
        changePostCount(postCount+1);
        changePostOption(postOption,null,postCount+1);
    }

    const fetchPosts=(newPostOption,resetSearchResults)=>{
        debugger;
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
        console.log(posts);
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
                triggerReloadingPostsHandle={triggerReloadingPostsHandle}
                displaySymposium={displaySymposium}
                displayRecruitConfetti={displayRecruitConfetti}
                profileId={profileId}
            />
        </React.Fragment>
    )
}

export default PostsAndFilterOptions;