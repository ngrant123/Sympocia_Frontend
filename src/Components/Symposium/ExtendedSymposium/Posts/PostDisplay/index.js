import React, { useState, useEffect } from "react";

import {ImagePostsModal} from "../../../../ExplorePage/ExplorePageSubset/PostsDisplay/ImagePostsModal.js";
import VideoPostModal from "../../../../ExplorePage/ExplorePageSubset/PostsDisplay/VideoPostsModal.js";
import RegularPostModal from "../../../../ExplorePage/ExplorePageSubset/PostsDisplay/RegularPostsModal.js";
import BlogPostModal from "../../../../ExplorePage/ExplorePageSubset/PostsDisplay/BlogPostsModal.js";
import PostCategory from "./PostCategory.js";
import {
    PostContainer,
    Posts
} from "../../indexCSS.js";
import {PostProvider} from "../PostsContext.js";


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
        if(selectedCategoryType=="General"){
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

    },[selectedCategoryType])

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


    return(
        <PostContainer isScrollEnabled={state.headerAnimation} id="postsContainer">
            {isLoadingNewPosts==true?
                <p>Loading...</p>:
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
                    {/*
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
                    */}
                </Posts>
            }
        </PostContainer>
    )
}

export default PostsContainerDisplay;