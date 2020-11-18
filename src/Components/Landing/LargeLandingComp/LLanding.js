import React, {useState,Component} from "react";
import styled from 'styled-components';
import {BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import  FirstSection from '../LandingFirstSection';
import  SecondSection  from '../LandingSecondSection';
import ThirdSection from '../LandingThirdSection';
import ReactPageScroller from "react-page-scroller";

const Container = styled.div`
   position: absolute;
   top: 0; 
   left: 0; 
   height: 100%; 
   width: 100%;
   positon: fixed;
   display:block;

   textarea::-webkit-input-placeholder {  color:#DBDADC;}
`;

const LLanding=()=>{


    const [options,changeOptions]=useState({
      customPageNumber:0,
      pageOnChange:0,
      blockScrollUp:false
    })

    const preventScrollAnimation=()=>{
      const options={
        customPageNumber:0,
        pageOnChange:0,
        blockScrollUp:true,
        blockScrollDown:true
      }

      changeOptions(options);
    }

    const enableScrollAnimation=()=>{

      const options={
        customPageNumber:0,
        pageOnChange:0,
        blockScrollUp:false,
        blockScrollDown:false

      }

      changeOptions(options)
    }
    //Could use context but theres not really any point for this its too heavy

    return(

        <ReactPageScroller
          {...options}
        >
                <FirstSection/>
                <SecondSection
                  preventScroll={preventScrollAnimation}
                  enableScroll={enableScrollAnimation}
                />
                <ThirdSection/>


      </ReactPageScroller>
      )

}

export default LLanding;