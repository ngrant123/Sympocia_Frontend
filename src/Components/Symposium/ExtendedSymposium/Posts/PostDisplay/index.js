import React, {useState,useEffect,useMemo} from "react";
import PostCategory from "./PostCategory.js";
import {
    PostContainer,
    Posts
} from "./indexCSS.js";


const VerticalLineCSS={
    borderStyle:"solid",
    borderWidth:"1px",
    borderColor:"#EBEBEB",
    borderLeft:"2px",
    height:"50px",
    marginLeft:"3%"
}


const PostsContainerDisplay=(props)=>{
    const {
        isLoadingNewPosts,
        state,
        triggerReloadingPostsHandle,
        displaySymposium,
        displayRecruitConfetti,
        profileId,
        selectedSymposiumTitle
    }=props;


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
                        posts:grind,
                        divIdentification:"grindCategoryDivId"
                    }
                    break;
                }
                case "Work In Progress":{
                    const {progress}=state.posts;
                    selectedPostCategory[i]={
                        ...selectedPostCategory[i],
                        posts:progress,
                        divIdentification:"progressCategoryDivId"
                    }
                    break;
                }
                case "Achievements":{
                    const {accomplishment}=state.posts;
                    selectedPostCategory[i]={
                        ...selectedPostCategory[i],
                        posts:accomplishment,
                        divIdentification:"accomplishmentCategoryDivId"
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
        isSymposiumPostUI:true,
        selectedSymposiumTitle
    }

    const triggerChangeCategoryType=(selectedCategoryType)=>{
        changeSelectedCategoryType(selectedCategoryType);
    }

    const postsCategory=useMemo(()=>{
        return(
            <Posts>
                {selectedPostCategoryInformation.map(data=>
                    <React.Fragment>
                        <PostCategory
                            selectedDivId={data.divIdentification}
                            {...data}
                            {...postsProps}
                            postType={state.postType}
                            defaultPostCategoryInformation={defaultPostCategoryInformation}
                            triggerChangeCategoryType={triggerChangeCategoryType}
                            displayDesktopUI={state.displayDesktopUI}
                            isOligarch={state.isOligarch}
                        />
                        <div id="verticalPostCategoryDivider" style={VerticalLineCSS}/>
                    </React.Fragment>
                )}
            </Posts>
        )
    },[selectedPostCategoryInformation,state.isLoadingReloadedPosts]);


    return(
        <PostContainer isScrollEnabled={state.headerAnimation} id="postsContainer">
            {isLoadingNewPosts==true? 
                <p id="postLoadingText">Loading...</p>:
                <React.Fragment>
                    {postsCategory}
                </React.Fragment>
            }
        </PostContainer>
    )
}

export default PostsContainerDisplay;