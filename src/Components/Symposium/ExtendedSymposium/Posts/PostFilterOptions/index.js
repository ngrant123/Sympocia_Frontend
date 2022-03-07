import React,{useState,useContext} from "react";
import {
    SympociaOptionsContainer,
    SearchOptionContainer,
    MinifiedSymposiumInformation,
    SearchContainer,
    SearchTextArea,
    QuickAccessSymposiumOptions
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
import {SymposiumContext} from "../../SymposiumContext.js";

import PortalHOC from "../../Modals/PortalHOC.js";

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
    height:"50px",
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
    const [currentPostType,changeCurrentPostType]=useState("Images");
    const symposiumConsumer=useContext(SymposiumContext);
    const [displayPortalHOC,changeDisplayPortalHOC]=useState(false);
    const [quickAccessComponent,changeQuickAccessComponent]=useState();

    const searchPromptTrigger=async()=>{
        const textAreaValue=document.getElementById("symposiumSearchPostTextArea").value;
        const currentSelectedPosts=posts;
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

    const closePostOptionsPortal=()=>{
        changePostOptionsDisplayPortal(false);
    }
    const triggerUpdatePosts=({updatePostType,displayPostText})=>{
        changeCurrentPostType(displayPostText);
        updatePosts(updatePostType);
    }

    const postOptionsMobileOrDesktop=()=>{
        let mobilePostCSS={...MobilePostOptionsButton};
        return  <React.Fragment>
                    {displayPostOptionsPortal==true &&(
                        <PostsOptionsPortal
                            closeModal={closePostOptionsPortal}
                            updatePosts={triggerUpdatePosts}
                        />
                    )}


                    <div id="symposiumPostOptionsId"
                        onClick={()=>changePostOptionsDisplayPortal(true)} 
                        style={{...ButtonCSS,background:state.backgroundColor,paddingLeft:"2px"}}>
                        <div style={{padding:"5%",backgroundColor:"white",width:"100%",borderRadius:"5px 0px 0px 5px"}}>
                            <div style={{color:"black",display:"flex",padding:"5px",textAlign:"center",alignItems:"center",justifyContent:"center"}}>
                                <b>{currentPostType}</b>
                            </div>
                        </div>
                        <div style={{width:"30%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                            <KeyboardArrowDownIcon/>
                        </div>
                    </div>
                </React.Fragment>
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

    const triggerSymposiumQuickAccess=(featuresComponentType)=>{
        let component=symposiumConsumer.specificSymposiumFeaturesComponent(featuresComponentType,true);
        changeQuickAccessComponent(component);
        changeDisplayPortalHOC(true);
    }


    const mobileQuickAccessSymposiumOptions=()=>{
        const quickAccessCSS={
            display:"flex",
            flexDirection:"column"
        }
        return(
            <QuickAccessSymposiumOptions>
                <div style={quickAccessCSS} 
                    onClick={()=>triggerSymposiumQuickAccess("Community")}>
                    <p style={{color:"#2C2C2C"}}>Community</p>
                    <div style={{width:"100%",height:"5px",background:state.backgroundColor,borderRadius:"5px"}}/>
                </div>

                <div style={quickAccessCSS}
                    onClick={()=>symposiumConsumer.triggerDisplayOligarchsModal()}>
                    <p style={{color:"#2C2C2C"}}>Oligarchs</p>
                    <div style={{width:"100%",height:"5px",background:state.backgroundColor,borderRadius:"5px"}}/>
                </div>

                <div style={quickAccessCSS}
                    onClick={()=>triggerSymposiumQuickAccess("Beacon",true)}>
                    <p style={{color:"#2C2C2C"}}>Beacons</p>
                    <div style={{width:"100%",height:"5px",background:state.backgroundColor,borderRadius:"5px"}}/>
                </div>
            </QuickAccessSymposiumOptions>
        )
    }


    const closePortalModal=()=>{
        changeDisplayPortalHOC(false);
    }

    const quickAccessSympoisumPortalHOC=()=>{
        return(
            <React.Fragment>
                {displayPortalHOC==true &&(
                    <PortalHOC
                        component={quickAccessComponent}
                        closeModal={closePortalModal}
                    />
                )}
            </React.Fragment>
        )
    }

    return(
        <React.Fragment>
            {quickAccessSympoisumPortalHOC()}

            <SympociaOptionsContainer isScrollEnabled={state.headerAnimation}>	
                <SearchContainer>
                    <SearchTextArea
                        id="symposiumSearchPostTextArea"
                        placeholder="Search"
                    />
                    <SearchIcon
                        style={{fontSize:30,cursor:"pointer"}}
                        onClick={()=>searchPromptTrigger()}
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
                {mobileQuickAccessSymposiumOptions()}
            </SympociaOptionsContainer>
        </React.Fragment>
    )
}


export default SearchOptions;