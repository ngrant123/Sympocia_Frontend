import React from "react";
import {
    SympociaOptionsContainer,
    SearchOptionContainer,
    MinifiedSymposiumInformation,
    SearchContainer,
    SearchTextArea
} from "../../indexCSS.js";
import {PostConsumer} from "../PostsContext.js"
import SymposiumOptions from "../../SymposiumFeatures/SymposiumOptions.js";
import {PostOptions} from "../../indexCSS.js";
import SearchIcon from '@material-ui/icons/Search';
import {searchPostsFilter} from "../../../../../Actions/Tasks/Search/SearchPosts.js";

const MobilePostOptionsButton={
    listStyle:"none",
    padding:"10px",
    backgroundColor:"white",
    color:"#6e6e6e",
    boxShadow:"1px 1px 5px #6e6e6e",
    borderRadius:"5px",
    borderStyle:"none",
    cursor:"pointer"
}

const SearchOptions=({state,updatePosts,posts,postType,searchFilterPosts})=>{

    const searchPromptTrigger=(event)=>{
        debugger;
        const textAreaValue=document.getElementById("symposiumSearchPostTextArea").value;
        const keyEntered=event.key;
        const currentSelectedPosts=posts;
        if(keyEntered=="Enter"){
           // changeIsSearchFilterActivated(true);
            debugger;
            event.preventDefault();
            if(textAreaValue==""){
               updatePosts(postType,true);
            }else{
                const posts=searchPostsFilter(currentSelectedPosts,textAreaValue,postType.toLowerCase());
                searchFilterPosts(posts);
            }
        }
    }

    const postOptionsMobileOrDesktop=()=>{
        let mobilePostCSS={...MobilePostOptionsButton};
        if(state.headerAnimation==true){
            mobilePostCSS={
                ...mobilePostCSS,
                marginTop:"10%",
                marginLeft:"20%"
            }
        }
        return  <div class="dropdown">
                        <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={mobilePostCSS}>
                            Post Options
                        </button>

                        <ul class="dropdown-menu">
                            {postOptions()}
                        </ul>
                </div>
    }

    const postOptions=()=>{
        return <>
                    <li onClick={()=>updatePosts("Regular")} style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
                        <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                            <PostOptions id="regular">  
                                Regular posts
                            </PostOptions>
                        </a>
                    </li>
                    <hr/>

                    <li  onClick={()=>updatePosts("Image")} style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
                        <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                            <PostOptions id="image">    
                                Images
                            </PostOptions>
                        </a>
                    </li>
                    <hr/>
                    <li onClick={()=>updatePosts("Video")} style={{listStyle:"none",display:"inline-block",marginRight:"5%"}}>
                        <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                            <PostOptions id="video">    
                                Videos
                            </PostOptions>
                        </a>
                    </li>
                    <hr/>
                    <li onClick={()=>updatePosts("Blog")} style={{listStyle:"none",display:"inline-block"}}>
                        <a href="javascript:void(0);" style={{textDecoration:"none"}}>
                            <PostOptions id="blog"> 
                                Blogs
                            </PostOptions>
                        </a>
                    </li>
                </>
    }
    return(
        <SympociaOptionsContainer isScrollEnabled={state.headerAnimation}>	
                <SearchOptionContainer style={{width:"80%",marginLeft:state.headerAnimation==false?"10%":"0%"}}>	
                    <SearchContainer>
                        <SearchIcon
                            style={{fontSize:30}}
                        />
                        <SearchTextArea
                            id="symposiumSearchPostTextArea"
                            placeholder="Type here to search"
                            onKeyPress={e=>searchPromptTrigger(e)}
                        />
                    </SearchContainer>
                    {postOptionsMobileOrDesktop()}
                    <SymposiumOptions
                        headerAnimation={state.headerAnimation}
                        displayPhoneUI={state.displayPhoneUI}
                        selectedSymposiumTitle={state.selectedSymposiumTitle}
                    />
                </SearchOptionContainer>

            {state.headerAnimation==true && (
                <MinifiedSymposiumInformation isScrollEnabled={state.headerAnimation}>
                    {(state.displayPhoneUI==true && state.headerAnimation==true)==false &&(
                        <>
                            {/*
                                <ChevronLeftRoundedIcon
                                    style={{fontSize:40,marginTop:"10px"}}
                                    onClick={()=>handlePreviousSymposiumButton()}
                                />
                            */}
                            <p style={{marginTop:"10px",fontSize:"20px",marginRight:"5%"}}>
                                <b>{state.selectedSymposiumTitle}</b>
                            </p>

                            {/*
                                <ChevronRightRoundedIcon
                                    style={{fontSize:40,marginTop:"10px"}}
                                    onClick={()=>handleNextSymposiumButton()}
                                />
                            */}
                        </>
                    )}
                    {/*
                        {symposiumOptions(state.headerAnimation,state.displayPhoneUI)}
                    */}

                </MinifiedSymposiumInformation>
            )}
        </SympociaOptionsContainer>
    )
}


export default SearchOptions;