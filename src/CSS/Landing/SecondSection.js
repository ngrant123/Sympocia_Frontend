import styled from "styled-components";
import img2 from '/Users/nathangrant/Desktop/company/src/designs/background/SecondPageBackground.png';
import secondstatue from '/Users/nathangrant/Desktop/company/src/designs/img/test.png';


export const SecondContainer = styled.div`

  position:relative;
  width:100%;
  height:100%;

  background-image:url(${img2});
  background-size: cover; /* or contain depending on what you want */
  background-position: center center;
  background-repeat: no-repeat;
  text-align:center;
  background-size: contain
  margin:auto;
  padding:0;

`;

 export const SecondPageHead = styled.div`

   position:absolute;
   color:#E18DFD;
   font-size:60px;

   top:20%;
   left:10%;
   font-family:Myriad Pro;

 `;

//Description for second part of page 
 export const SecondPageDescrip = styled.div`

   position:absolute;
   color:black;

   top:40%;
   left:10%;
   font-size:35px;
   width:48%;
   font-family:Myriad Pro;
  
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

export const SecondPageLogin = styled.div`

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

`
;