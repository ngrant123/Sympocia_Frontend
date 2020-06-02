import styled from "styled-components";
import img2 from '../../../designs/background/SecondPageBackground.png';
import secondstatue from '../../../designs/img/test.png';
import { Link } from "react-router-dom";


export const SecondContainer = styled.div`

  position:relative;
  width:100%;
  height:100%;
  text-align:center;
  background-size: contain
  margin:auto;
  padding:0;  
  opacity:0;
  transition:.8s;

`;

 export const SecondPageHead = styled.div`

   position:absolute;
   color:black;
   font-size:90px;
   top:10%;
   left:10%;
   font-family:Myriad Pro;
   z-index:2;
   @media screen and (max-width:700px) {font-size:60px}

 `;

//Description for second part of page 
 export const SecondPageDescrip = styled.div`

   position:absolute;
   color:black;

   top:0%;
   left:10%;
   font-size:20px;
   border-radius:5px;
   width:48%;
   font-family:Myriad Pro;
   padding:240px 0px 0px 0px;
   height:100%;
   z-index:6;

   @media screen and (max-width:1130px) {width:40%;font-size:20px;top:5%;left:20%}
   @media screen and (max-width:1030px) {width:60%;font-size:20px;top:10%}
   @media screen and (max-width:600px) {width:60%}
   @media screen and (max-width:530px) {width:80%;font-size:15px;top:5%}
   @media screen and (max-width:414px) {left:10%}

   @media screen and (max-height:450px) {width:60%;font-size:15px;top:-20%;left:20%}
   @media screen and (max-height:530px) {width:60%;font-size:20px;top:-10%;left:20%}
   @media screen and (max-height:420px) {width:30%;font-size:5px;top:-20%;left:20%}
   @media screen and (max-height:414px) {width:60%;font-size:15px;top:-20%;left:20%}
   @media screen and (max-height:320px) {width:60%;font-size:10px;top:-40%;left:20%}
   
  
 `;


export const SeperationDiv = styled.div`

  position:absolute;
  background-color:black;
  width:100%;
  height:10%;
  background-color:#322969;

`;

//Fix LOGIN/PASSWORD
export const SecondLogin = styled.textarea`
  position:absolute;
  padding :.5em;
  height:40px;
  font-size:15px;
  background-color:#ACA9B1;

  color:#DBDADC;
  resize:none;
  left:40%;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius:10px;
  width:20%;

`;

export const SecondPassword = styled.textarea`
  position:absolute;
  padding :.5em;
  height:40px;
  font-size:15px;
  background-color:#ACA9B1;

  color:#DBDADC;
  resize:none;
  left:65%;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius:10px;
  width:20%;

`;

export const SecondPageLogin = styled(Link)`

  position:absolute;
  width:20%; 
  left:90%; 

   width:5%;
   height:40px;


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


export const SecondNavBarContainer= styled.div`

  position:absolute;
  height:10%;
  background-color:#DDDBDF;
  width:100%;
  
`;


export const SecondBottomNav = styled.div`
  position:absolute;
  height:20%;
  width:100%;
  bottom:0%;

`;


export const SecondPageStatue = styled.div`
  position:absolute;
  color:black;

  top:12%;
  left:60%;
  font-size:35px;
  width:35%;
  font-family:Myriad Pro;
  height:65%;
  background-image: url(${secondstatue});

  background-size: cover; /* or contain depending on what you want */
  background-position: center center;
  background-repeat: no-repeat;
  text-align:center;
  margin:auto;
  padding:0;

  @media screen and (max-width:1030px) {display:none}
`
;

export const IndustriesCaption=styled.div`

  position:absolute;
  left:20%;
  top:55%;
  @media screen and (max-width:1030px) {display:none}
  @media screen and (max-height:730px) {display:none}
`;


export const IndustryDivContainer=styled.div`
  position:absolute;
  overflow-y:scroll;
  width:90%;
  height:190px;
  top:60%;
  left:5%; 
  padding:20px;
  overflow-y:scroll;
  border-radius:5px;
  box-shadow: 5px 5px 5px 5px #888888;
  @media screen and (max-width:1030px) {display:none}
  @media screen and (max-height:630px) {display:none}
`;



export const ArrowDownContainer=styled.div`
  position:absolute;
  left:45%;
  top:80%;

  @media screen and (max-width:1000px) {left:10%;top:60%;width:75%;}
  @media screen and (max-width:800px) {left:5%;top:70%;width:75%;}
  @media screen and (max-width:630px) {left:5%;top:70%;width:75%;}
  @media screen and (max-width:400px) {left:5%;width:90%;top:80%;font-size:7px}
  @media screen and (max-width:420px) {left:-15%;width:90%;top:60%;font-size:7px}
  @media screen and (max-width:375px) {left:-15%;width:90%;top:70%;font-size:7px}
  @media screen and (max-width:320px) {left:-20%;width:90%;top:75%;font-size:7px}

  @media screen and (max-height:420px) {left:-10%;width:90%;top:55%;font-size:7px}

`;







