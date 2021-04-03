import React, { useState, useEffect } from "react";

import {ImagePostsModal} from "../../../../ExplorePage/ExplorePageSubset/PostsDisplay/ImagePostsModal.js";
import VideoPostModal from "../../../../ExplorePage/ExplorePageSubset/PostsDisplay/VideoPostsModal.js";
import RegularPostModal from "../../../../ExplorePage/ExplorePageSubset/PostsDisplay/RegularPostsModal.js";
import BlogPostModal from "../../../../ExplorePage/ExplorePageSubset/PostsDisplay/BlogPostsModal.js";

import {
    PostContainer,
    Posts
} from "../../indexCSS.js";
import {PostProvider} from "../PostsContext.js";


const PostsContainerDisplay=({state,triggerReloadingPostsHandle,displaySymposium,displayRecruitConfetti,profileId})=>{
    debugger;
    console.log(state);
    const [endOfPostsDBIndicator,changeEndOfPostIndicator]=useState(false);
    const [isLoadingReloadedPosts,changeIsLoadingReloadedPosts]=useState(false);
    const [posts,changePosts]=useState(state.posts);
    const [postOption,changePostOptionState]=useState(state.postOption);

    useEffect(()=>{
        if(state.handleScroll!=false){
            document.getElementById("postsContainer").style.opacity="0";
    
            setTimeout(function(){
              document.getElementById("postsContainer").style.opacity="1";
            },1000);
        }
    })

     const postsProps={
        posts:state.posts,
        _id:profileId,
        confettiAnimation:displayRecruitConfetti,
        isPersonalProfile:true,
        displaySymposium:displaySymposium,
        targetDom:"extendedSymposiumContainer",
        isLoadingReloadedPosts:state.isLoadingReloadedPosts,
        triggerReloadingPostsHandle:triggerReloadingPostsHandle,
        endOfPostsDBIndicator:state.endOfPostsDBIndicator
    }


    return(
        <PostContainer isScrollEnabled={state.headerAnimation} id="postsContainer">
            {state.isLoadingReloadedPosts==true?
                <p>Loading...</p>:
                <Posts>
                    {state.postType=="Image"?
                        <ImagePostsModal {...postsProps}/>:null
                    }

                    {state.postType=="Video"?
                        <VideoPostModal {...postsProps}/>:null
                    }

                    {state.postType=="Blog"?
                        <li style={{listStyle:"none",marginTop:"0%",marginLeft:"5%"}}>
                            <BlogPostModal {...postsProps}/>
                        </li>:null
                    }

                    {state.postType=="Regular"?
                        <li style={{listStyle:"none",marginTop:"1%",marginLeft:"5%",width:"90%"}}>
                            <RegularPostModal {...postsProps}/>
                        </li>:null
                    }
                </Posts>
            }
        </PostContainer>
    )
}

export default PostsContainerDisplay;