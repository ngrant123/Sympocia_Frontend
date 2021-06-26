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

const OptionDropDownCSS={
    listStyle:"none",
    display:"inline-block",
    marginRight:"5%",
    color:"#5298F8",
    cursor:"pointer",
    padding:"15px"
}

const SearchOptions=({state,updatePosts,posts,postType,searchFilterPosts,displayBeacon})=>{

    const searchPromptTrigger=(event)=>{
        const textAreaValue=document.getElementById("symposiumSearchPostTextArea").value;
        const keyEntered=event.key;
        const currentSelectedPosts=posts;
        if(keyEntered=="Enter"){
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
                    <li onClick={()=>updatePosts("Regular")} id="regular" style={OptionDropDownCSS}>
                        Regular posts
                    </li>
                    <hr/>
                    <li  onClick={()=>updatePosts("Image")} id="image" style={OptionDropDownCSS}>
                        Images
                    </li>
                    <hr/>
                    <li onClick={()=>updatePosts("Video")} id="video" style={OptionDropDownCSS}> 
                        Videos
                    </li>
                    <hr/>
                    <li onClick={()=>updatePosts("Blog")} id="blog" style={OptionDropDownCSS}>
                        Blogs
                    </li>
                </>
    }

    const beaconElement=()=>{
        return(
            <svg style={{cursor:"pointer",marginLeft:"5%"}}
                onClick={()=>displayBeacon()}
                xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-flare" width="44" 
                height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#DAD235" fill="none" stroke-linecap="round"
                stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <circle cx="12" cy="12" r="2" />
              <path d="M3 12h4m5 -9v4m5 5h4m-9 5v4m-4.5 -13.5l1 1m8 -1l-1 1m0 7l1 1m-8 -1l-1 1" />
            </svg>
        )
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
                            {beaconElement()}

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