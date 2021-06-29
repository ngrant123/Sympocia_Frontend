import React, {useState,useEffect,useMemo} from "react";

import {ImagePostsModal} from "../../../../ExplorePage/ExplorePageSubset/PostsDisplay/ImagePostsModal.js";
import VideoPostModal from "../../../../ExplorePage/ExplorePageSubset/PostsDisplay/VideoPostsModal.js";
import RegularPostModal from "../../../../ExplorePage/ExplorePageSubset/PostsDisplay/RegularPostsModal.js";
import BlogPostModal from "../../../../ExplorePage/ExplorePageSubset/PostsDisplay/BlogPostsModal.js";
import PostCategory from "./PostCategory.js";
import {
    PostContainer,
    Posts
} from "../../indexCSS.js";


const PostsContainerDisplay=(props)=>{
    const {
        isLoadingNewPosts,
        state,
        triggerReloadingPostsHandle,
        displaySymposium,
        displayRecruitConfetti,
        profileId
    }=props;
    console.log(props);
    const [endOfPostsDBIndicator,changeEndOfPostIndicator]=useState(false);
    const [isLoadingReloadedPosts,changeIsLoadingReloadedPosts]=useState(false);
    const [postOption,changePostOptionState]=useState(state.postOption);
    const [selectedCategoryType,changeSelectedCategoryType]=useState(state.displayDesktopUI==false?"The Grind":"General");
    const defaultPostCategoryInformation=[
        {
            headers:{
                title:"The Grind",
                secondaryTitle:"Show us you grinding"
            }
        },
        {
            headers:{
                title:"Work In Progress",
                secondaryTitle:"What are you working on?"   
            }
        },
        {
            headers:{
                title:"Achievements",
                secondaryTitle:"Milestone and your goals"
            }
        }
    ]
    const [selectedPostCategoryInformation,changeSelectedPostCategoryInformation]=useState([]);
    useEffect(()=>{
        debugger;
        if(state.handleScroll!=false){
            document.getElementById("postsContainer").style.opacity="0";
    
            setTimeout(function(){
              document.getElementById("postsContainer").style.opacity="1";
            },1000);
        }
        let selectedPostCategory=[];
        if(state.displayDesktopUI){
            selectedPostCategory=[...defaultPostCategoryInformation];
        }else{
            for(var i=0;i<defaultPostCategoryInformation.length;i++){
                const {headers:{
                    title
                }}=defaultPostCategoryInformation[i];
                if(selectedCategoryType==title){
                    console.log(defaultPostCategoryInformation[i]);
                    selectedPostCategory.push(defaultPostCategoryInformation[i])
                    break;
                }
            }
        }
        for(var i=0;i<selectedPostCategory.length;i++){
            const {headers:{
                title
            }}=selectedPostCategory[i];
            switch(title){
                case "The Grind":{
                    const {grind}=state.posts;
                    selectedPostCategory[i]={
                        ...selectedPostCategory[i],
                        posts:grind
                    }
                    break;
                }
                case "Work In Progress":{
                    const {progress}=state.posts;
                    selectedPostCategory[i]={
                        ...selectedPostCategory[i],
                        posts:progress
                    }
                    break;
                }
                case "Achievements":{
                    const {accomplishment}=state.posts;
                    selectedPostCategory[i]={
                        ...selectedPostCategory[i],
                        posts:accomplishment
                    }
                    break;
                }
            }
        }
        changeSelectedPostCategoryInformation(selectedPostCategory)

    },[selectedCategoryType,state.posts,state.displayDesktopUI])

     const postsProps={
        _id:profileId,
        confettiAnimation:displayRecruitConfetti,
        isPersonalProfile:true,
        displaySymposium:displaySymposium,
        targetDom:"extendedSymposiumContainer",
        isLoadingReloadedPosts:state.isLoadingReloadedPosts,
        triggerReloadingPostsHandle:triggerReloadingPostsHandle,
        endOfPostsDBIndicator:state.endOfPostsDBIndicator,
        isSymposiumPostUI:true
    }

    const triggerChangeCategoryType=(selectedCategoryType)=>{
        changeSelectedCategoryType(selectedCategoryType);
    }

    const postsCategory=useMemo(()=>{
        console.log(selectedPostCategoryInformation);
        console.log("Memoized function");
        return(
            <Posts>
                {selectedPostCategoryInformation.map(data=>
                    <PostCategory
                        {...data}
                        {...postsProps}
                        postType={state.postType}
                        defaultPostCategoryInformation={defaultPostCategoryInformation}
                        triggerChangeCategoryType={triggerChangeCategoryType}
                        displayDesktopUI={state.displayDesktopUI}
                    />
                )}
            </Posts>
        )
    },[selectedPostCategoryInformation,state.isLoadingReloadedPosts]);


    return(
        <PostContainer isScrollEnabled={state.headerAnimation} id="postsContainer">
            {isLoadingNewPosts==true? 
                <p>Loading...</p>:
                <React.Fragment>
                    {postsCategory}
                </React.Fragment>
            }
        </PostContainer>
    )
}

export default PostsContainerDisplay;