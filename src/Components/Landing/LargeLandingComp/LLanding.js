import React, { Component} from "react";
import styled from 'styled-components';
import { ScrollPage, Section } from 'react-scrollpage';
import {BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import  FirstSection from '../LandingFirstSection';
import  SecondSection  from '../LandingSecondSection';
import ThirdSection from '../LandingThirdSection';
import  FourthSection  from '../LandingFourthSection';
import FifthSection from '../LandingFifthSection';

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

   const options = {
      curPage: 1,           // inital page number, most 1
      totalPage: 3,         // totoal page number
      delay: 1200           // delay between two scoll animation
    }
    return(

        <ScrollPage {...options}>
        <Container>

           <Section>
              <FirstSection/>
           </Section>

            <Section>
              <SecondSection/>
            </Section>

            <Section>
              <ThirdSection/>

            </Section>


        </Container>
      </ScrollPage> 
      )

}

export default LLanding;