import styled from "styled-components";
import img from '/Users/nathangrant/Desktop/company/src/designs/background/Landingbackground.png';
import firststatue from '/Users/nathangrant/Desktop/company/src/designs/img/test3.png';
import {BrowserRouter, Link, Route, Switch } from 'react-router-dom';

//Tip: Use Styled Components for all of these pages
//Starting div can not be moved must be used basically as a container for everything else


export const SignInformation = styled.div`
  position:absolute;
  background-color:white;
  left:65%;
  right:5%;
  padding: 8%;
  height:50%;
  top: 23%;
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
  border-radius:10px;
`;

//Basically a wrapper for everything
//Stack div elements make container absolute then elements relative
export const Container = styled.div`
   position: absolute;
   top: 0; 
   left: 0; 
   height: 100%; 
   width: 100%;
   positon: fixed;
   display:block;

   textarea::-webkit-input-placeholder {  color:#DBDADC;}
`;


//Container for first part of website
//Image has to take the form as a variable then be placed within curly braces
export const FirstContainer = styled.div`
   position: relative;
   top: 0; 
   left: 0; 
   height: 100%; 
   width: 100%;

    background-image:url(${img});
    background-size: cover; /* or contain depending on what you want */
    background-position: center center;
    background-repeat: no-repeat;
    text-align:center;
    margin:auto;
    padding:0;
    textarea::-webkit-input-placeholder {  color:#DBDADC;}

`;

export const FirstStatue = styled.div`
  
  position:absolute;
  height:100%;
  left:9%;
  width:49%;
  text-align:center;

  color:white;
  font-size:45px;
  font-family:Myriad Pro;
 

  background-image:url(${firststatue});
  background-size: cover; /* or contain depending on what you want */
  background-position: center center;
  background-repeat: no-repeat;
  text-align:center;
  margin:auto;
  padding:0;


`;



export const NavBarContainer= styled.div`

  position:absolute;
  height:10%;
  width:100%;

`;

export const NavEmail = styled.textarea`

    position:absolute;
    padding :.5em;
    width:15%;
    height:30px;
    font-size:15px;
    background-color:#35313C;

    color:#DBDADC;
    resize:none;
    left:60%;
    top:10%;
    border-radius:10px;


`;

export const NavPassword = styled.textarea`

   position:absolute;
   padding :.5em;
   width:10%;
   height:30px;
   font-size:15px;
   border-style:solid;
   background-color:#35313C;

   color:#DBDADC;
   resize:none;
   left:78%;
   top:10%;
   border-radius:10px;


`;

export const NavSubmitButton = styled(Link)`

   position:absolute;
   left:92%;
   top:10%;
   width:5%;
   height:30px;

   background-color:#C8B0F4;
   color:white;
   border-style:solid;
   border-color: #C8B0F4;

   display: flex;
   align-items: center;
   justify-content: center;
   border-radius:10px;
   transition: all ease 0.8s;
   
    &:hover{
      text-decoration:none;
      color:white;
      background-color:#6941E5;
    }

 `;


//Used a textarea because changing the location for Input was 
//becoming a littel difficult

export const NameInput = styled.textarea`

  position:absolute;
  padding :.5em;
  width:60%;
  height:30px;
  font-size:15px;
  background-color:#4D4C4D;

  color:#DBDADC;
  resize:none;
  left:20%;
  top:20%;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius:10px;

`;


export const LastInput = styled.textarea`

  position:absolute;
  padding :.5em;
  width:60%;
  height:30px;
  font-size:15px;
  background-color:#4D4C4D;

  color:white;
  resize:none;
  left:20%;
  top:40%;
  border-radius:10px;

`;


export const EmailInput = styled.textarea`
  
  position:absolute;
  padding :.5em;
  width:60%;
  height:30px;
  font-size:15px;
  background-color:#4D4C4D;

  color:white;
  resize:none;
  left:20%;
  top:60%;
  border-radius:10px;


`;
export const IntroMain = styled.div`

  background-color:#292730;
  position:absolute;
  height:10%;
  left:11%;
  top:50%;
  width:33%;
  text-align:center;

  color:white;
  border-style:solid;
  border-color:white;
  font-size:45px;
  padding:0px 0px 5px;
  font-family:Myriad Pro;
 
 /*CSS below is used to align text in the div */

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius:10px;



`;

export const IntroSec = styled.div`
  position:absolute;
  background-color:#292730;
  top:65%;
  left:16%;
  height:10%;
  width:25%;
  text-align:center;

  color:white;
  padding:3em;
  border-style:solid;
  border-color:whtie;
  font-size:20px;
  font-family:Myriad Pro;
  border-radius:20px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius:5px;


`;

 export const SubmitButton = styled(Link)`

   position:absolute;
   left:36%;
   top:75%;
   width:30%;
   height:10%;
   border-color: #C8B0F4;
   border-style:solid;
   background-color:#C8B0F4;
   color:white;
   text-decoration:none;

   display: flex;
   align-items: center;
   justify-content: center;

   &:hover{

      background-color:white;

    color:#C8B0F4;
   border-style:solid;
   border-color: #C8B0F4;
   text-decoration:none;

   }

 `;