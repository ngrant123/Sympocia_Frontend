import React,{useState} from "react";
import {
    SympociaOptionsContainer,
    SearchOptionContainer,
    MinifiedSymposiumInformation,
    SearchContainer,
    SearchTextArea
} from "./indexCSS.js";
import {PostConsumer} from "../PostsContext.js"
import SymposiumOptions from "../../Modals/SymposiumOptions.js";
import {PostOptions} from "../../indexCSS.js";
import SearchIcon from '@material-ui/icons/Search';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import {searchPostsFilter} from "../../../../../Actions/Tasks/Search/SearchPosts.js";
import PostsOptionsPortal from "../../Modals/PostOptionsPortal.js";
import {Link} from "react-router-dom";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

const MobilePostOptionsButton={
     backgroundColor:"white",
    padding:"10px",
    color:"#6e6e6e",
    boxShadow:"1px 1px 5px #6e6e6e",
    borderRadius:"5px",
    borderStyle:"none",
    cursor:"pointer",
    marginRight:"2%"
}

const PostOptionsCSS={
    listStyle:"none",
    display:"inline-block",
    marginRight:"5%",
    cursor:"pointer",
    color:"#5298F8"
}

const ButtonCSS={
    backgroundColor:"white",
    borderRadius:"5px",
    color:"white",
    cursor:"pointer",
    display:"flex",
    justifyContent:"space-between",
    flexDirection:"row",
    alignItems:"center",
    marginRight:"10%",
    width:"200px",
    overflow:"hidden",
    boxShadow:"1px 1px 5px #6e6e6e"
}

const SearchOptions=(props)=>{
    const {
        state,
        updatePosts,
        posts,
        postType,
        searchFilterPosts,
        displayBeacon
    }=props;


    const [displayPostOptionsPortal,changePostOptionsDisplayPortal]=useState(false);

    const searchPromptTrigger=async(event)=>{
        const textAreaValue=document.getElementById("symposiumSearchPostTextArea").value;
        const keyEntered=event.key;
        const currentSelectedPosts=posts;
        if(keyEntered=="Enter"){
            event.preventDefault();
            if(textAreaValue==""){
               updatePosts(postType,true);
            }else{
                const posts=await searchPostsFilter(
                                currentSelectedPosts,
                                textAreaValue,
                                postType.toLowerCase(),
                                true);
                searchFilterPosts(posts);
            }
        }
    }
    const closePostOptionsPortal=()=>{
        changePostOptionsDisplayPortal(false);
    }

    const postOptionsMobileOrDesktop=()=>{
        let mobilePostCSS={...MobilePostOptionsButton};
        return  <React.Fragment>
                    {displayPostOptionsPortal==true &&(
                        <PostsOptionsPortal
                            closeModal={closePostOptionsPortal}
                            updatePosts={updatePosts}
                        />
                    )}


                    <div id="symposiumPostOptionsId"
                        onClick={()=>changePostOptionsDisplayPortal(true)} 
                        style={{...ButtonCSS,background:state.backgroundColor}}>
                        <div style={{display:"flex",padding:"5px",textAlign:"center",alignItems:"center",justifyContent:"center"}}>
                            Images
                        </div>
                        <div style={{width:"30%",height:"100%",background:"rgba(0, 0, 0, 0.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                            <KeyboardArrowDownIcon/>
                        </div>
                    </div>
                </React.Fragment>
    }

    const postOptions=()=>{
        return <>
                    <li onClick={()=>updatePosts("Regular")} id="regular" style={PostOptionsCSS}>
                        Regular posts
                    </li>
                    <hr/>

                    <li  onClick={()=>updatePosts("Image")} id="image" style={PostOptionsCSS}>  
                        Images
                    </li>
                    <hr/>
                    <li onClick={()=>updatePosts("Video")} id="video" style={PostOptionsCSS}> 
                        Videos
                    </li>
                    <hr/>
                    <li onClick={()=>updatePosts("Blog")} id="blog" style={PostOptionsCSS}>
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
            <SearchContainer>
                <SearchTextArea
                    id="symposiumSearchPostTextArea"
                    placeholder="Search"
                    onKeyPress={e=>searchPromptTrigger(e)}
                />
                <SearchIcon
                    style={{fontSize:30}}
                />
            </SearchContainer>
            <div style={{display:"flex",flexDirection:"row"}}>
                <SymposiumOptions
                    headerAnimation={state.headerAnimation}
                    displayPhoneUI={state.displayPhoneUI}
                    backgroundColor={state.backgroundColor}
                    selectedSymposiumTitle={state.selectedSymposiumTitle}
                />
                {postOptionsMobileOrDesktop()}
            </div>

            {/*
                <SearchOptionContainer style={{width:"80%",marginLeft:state.headerAnimation==false?"10%":"0%"}}>	
                    <SearchContainer>
                        <SearchIcon
                            style={{fontSize:30}}
                        />
                        <SearchTextArea
                            id="symposiumSearchPostTextArea"
                            placeholder="Search"
                            onKeyPress={e=>searchPromptTrigger(e)}
                        />
                    </SearchContainer>
                    {postOptionsMobileOrDesktop()}
                    <SymposiumOptions
                        headerAnimation={state.headerAnimation}
                        displayPhoneUI={state.displayPhoneUI}
                        selectedSymposiumTitle={state.selectedSymposiumTitle}
                    />
                    {state.displayDesktopUI==false &&(
                        <Link to={{pathname:`/symposiumFeatures/${state.symposiumId}`}}>
                            <MeetingRoomIcon
                                style={{fontSize:30,color:"#333",marginLeft:"35%"}}
                            />
                        </Link>
                    )}
                </SearchOptionContainer>

                {state.headerAnimation==true && (
                    <MinifiedSymposiumInformation isScrollEnabled={state.headerAnimation}>
                        {(state.displayPhoneUI==true && state.headerAnimation==true)==false &&(
                            <>
                                <p style={{marginTop:"10px",fontSize:"20px",marginRight:"5%"}}>
                                    <b>{state.selectedSymposiumTitle}</b>
                                </p>
                                {beaconElement()}
                            </>
                        )}
                    </MinifiedSymposiumInformation>
                )}
            */}
        </SympociaOptionsContainer>
    )
}


export default SearchOptions;