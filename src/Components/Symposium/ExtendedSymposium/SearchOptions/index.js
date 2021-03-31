import React from "react";
import {
    SympociaOptionsContainer,
    SearchOptionContainer,
    MinifiedSymposiumInformation
} from "../indexCSS.js";

const SearchOptions=({state,postOptionsMobileOrDesktop,symposiumOptions})=>{
    return(
        <SympociaOptionsContainer isScrollEnabled={state.headerAnimation}>	
            <SearchOptionContainer style={{width:"80%",marginLeft:state.headerAnimation==false?"10%":"0%"}}>	
                {/*
                    Down the I would like a search function to be implemented
                    Should be easy just hookup the search api to here then repopulate results when the api returns

                    <SearchContainer>
                        <ul style={{paddingTop:"5px"}}>
                            <li style={{position:"relative",top:"-10px",listStyle:"none",display:"inline-block"}}>
                                <SearchIcon
                                    style={{fontSize:30}}
                                />
                            </li>
                            <SearchTextArea
                                placeholder="Type here to search"
                            />
                        </ul>
                    </SearchContainer>
                    <li id="postOptionsLI" style={{marginTop:"1%",listStyle:"none",width:"70%",zIndex:"30"}}>
                    </li>
                */}
                {postOptionsMobileOrDesktop()}
                {(state.displayPhoneUI==true && state.headerAnimation==false)==true && (
                    <div style={{marginLeft:"2%"}}>
                        {symposiumOptions(state.headerAnimation)}
                    </div>
                )}
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
                        <p style={{marginTop:"10px",fontSize:"20px",marginRight:"5%"}}>{state.selectedSymposiumTitle}</p>

                        {/*
                            <ChevronRightRoundedIcon
                                style={{fontSize:40,marginTop:"10px"}}
                                onClick={()=>handleNextSymposiumButton()}
                            />
                        */}
                    </>
                )}
                {symposiumOptions(state.headerAnimation)}

            </MinifiedSymposiumInformation>
        )}
    </SympociaOptionsContainer>
    )
}


export default SearchOptions;