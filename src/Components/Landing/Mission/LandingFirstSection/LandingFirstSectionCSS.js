import styled from "styled-components";
import img from '../../../../designs/background/Landingbackground.png';
import firststatue from '../../../../designs/img/test3.png';
import {BrowserRouter, Link, Route, Switch } from 'react-router-dom';


export const SignInformation = styled.div`
  position:absolute;
  background-color:white;
  left:65%;
  right:5%;
  padding: 8%;
  height:50%;
  width:30%;
  top: 23%;
  font-size:1.5em;
  text-align:center;
  border-radius:10px;
  box-shadow: 5px 5px 5px 5px #888888;

  @media screen and (max-width:1024px) {background-color:white;width:60%;left:20%;top:40%;height:50%}
  @media screen and (max-width:400px) {background-color:white;width:80%;left:10%;top:40%;height:40%}
  @media screen and (max-width:400px) {background-color:white;width:80%;left:10%;top:40%;height:50%}
  @media screen and (max-width:420px) {background-color:white;width:80%;left:10%;top:40%;height:45%}

`;

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


export const FirstContainer = styled.div`
   position: relative;
   top: 0; 
   left: 0; 
   height: 100%; 
   width: 100%;
   text-align:center;
    margin:auto;
    padding:0px;
    textarea::-webkit-input-placeholder {  color:#DBDADC;}
    opacity:0;
    transition:.8s;

    @media screen and (max-width:1030px){
       #imageContainer{
          top:10px;
          height:80% !important;
      }
    }

    @media screen and (max-width:950px){
      #imageContainer{
          top:20px;
      }
      #floatingArrowFunction:{
        display:none;
      }
       #listOpeningTextContainer:{
        top:50px !important;
        background-color:red !important;
      }
    }

    @media screen and (max-width:900px){
      #footerIcons{
          display:none;
      }
    }

    @media screen and (max-width:650px){
      #mobileLogin{
         list-style:none;
          display:inline-block;
          background-color:red;
          border-radius:5px;
          padding:30px;
          color:white;
      }
      #header{
        font-size:60px;
        margin-top:5%;
        margin-left:-10%;
      }

      #imageListContainer{
         display:none !important;
         top:0px;
      }
      #imageContainer{
          display:none;
      }
      #openingTextContainer{
        width:150%;
      }
      #listOpeningTextContainer{
        display:block;
        top:10% !important;
        left:-10% !important;
      }
      #floatingArrowFunction{
        display:none;
      }
      #mobileProfilePictures{
        display:block !important;
        height:170%;
      }
    }

    @media screen and (max-width:560px){
       #headerCompany{
        font-size:80px !important;
      }
      #header{
        font-size:40px !important;
        margin-top:20%;
      }
      #textFirstSectionCompany{
        margin-left:-20% !important;
      }
    }

    @media screen and (max-width:490px){
      #header1{
          font-size:20px;
      }
    }

    @media screen and (max-width:400px){
       #headerCompany{
        font-size:40px !important;
        margin-top:5%;
      }

      #textFirstSectionCompany{
        margin-left:-35% !important;
        width:160% !important;
      }
    }



    @media screen and (max-width:350px){
      #listOpeningTextContainer{
          width:60% !important;
          margin-left:-10% !important;
      }
      #email{
        width:120% !important;
      }
    }

     @media screen and (max-height:750px){
        #floatingArrowFunction{
          display:none;
        }
         #footerIcons{
            display:none;
        }
    }

    @media screen and (max-height:670px){
      #interestedProfilePictures{
        height:25% !important;
        z-index:10;
      }
    }

       @media screen and (max-height:570px){

         #imageContainer{
            top:-80px;
           height:100%;
        }
    }


       @media screen and (max-height:440px){
         #imageListContainer{
           top:-80px;
           height:200%; 
        }

         #interestedProfilePictures{
          height:50% !important;
        }

        @media screen and (max-width:800px), screen and (max-height:420px){
            #imageContainer{
                top:5px;
            }
        }

    }
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

  //Ipad resolution
  @media screen and (max-width:1024px) {width:100%;left:0%}


`;



export const NavBarContainer= styled.div`

  position:absolute;
  height:10%;
  width:100%;

`;

export const NavEmail = styled.textarea`

    position:relative;
    padding :.5em;
    width:0%;
    height:50px;
    font-size:15px;
    background-color:white;

    color:#DBDADC;
    resize:none;
    border-radius:10px;
    outline:none;
    border-color:#e5e5e5;
    border-width:2px;
`;

export const NavPassword = styled.textarea`

   position:relative;
   padding :.5em;
   width:10%;
   height:50px;
   font-size:15px;
   border-style:solid;
   background-color:white;

   color:#a6a6a6;
   resize:none;
   border-radius:10px;
   outline:none;
   border-color:#e5e5e5;
   border-width:2px;
`;

export const InputTextArea=styled.textarea`

  padding :.5em;
  height:50px;
  font-size:15px;
  background-color:#4D4C4D;

  color:#DBDADC;
  resize:none;
  align-items: center;
  justify-content: center;
  border-radius:10px;


  @media screen and (max-width:330px) {height:40px}
  @media screen and (max-height:530px) {top:10%}
  @media screen and (max-height:414px) {height:35px} 
  @media screen and (max-height:325px) {height:30px}


`;

export const NavSubmitButton = styled(Link)`

   position:relative;
   width:5%;
   height:50px;
   fontSize:160%;

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
  height:50px;
  font-size:15px;
  background-color:#4D4C4D;

  color:#DBDADC;
  resize:none;
  left:20%;
  top:25%;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius:10px;


  @media screen and (max-width:330px) {height:40px}
  @media screen and (max-height:530px) {top:10%}
  @media screen and (max-height:414px) {height:35px} 
  @media screen and (max-height:325px) {height:30px}

`;  


export const LastInput = styled.textarea`

  position:absolute;
  padding :.5em;
  width:60%;
  height:50px;
  font-size:15px;
  background-color:#4D4C4D;
  margin-bottom:5%;
  color:white;
  resize:none;
  left:20%;
  top:43%;
  border-radius:10px;

  @media screen and (max-width:330px) {height:40px}
  @media screen and (max-height:570px) {top:45%}
  @media screen and (max-height:530px) {top:30%}
  @media screen and (max-height:414px) {height:35px}
  @media screen and (max-height:325px) {height:30px}

`;


export const EmailInput = styled.textarea`
  
  position:absolute;
  padding :.5em;
  width:60%;
  height:50px;
  font-size:15px;
  background-color:#4D4C4D;
  color:white;
  resize:none;
  left:20%;
  top:60%;
  border-radius:10px;
  margin-bottom:5px;
  overflow:hidden

  @media screen and (max-width:330px) {height:40px}
  @media screen and (max-height:570px) {top:65%}
  @media screen and (max-height:530px) {top:50%}
  @media screen and (max-height:414px) {height:35px}



`;
export const IntroMain = styled.div`

  background-color:#292730;
  position:absolute;
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

@media screen and (max-width:1045px) {font-size:30px}
@media screen and (max-width:1024px) {display:none}


`;

export const IntroSec = styled.div`
  position:absolute;
  background-color:#292730;
  top:65%;
  left:16%;
  width:25%;
  text-align:center;

  color:white;
  padding:5px;
  border-style:solid;
  border-color:whtie;
  font-size:20px;
  font-family:Myriad Pro;
  border-radius:20px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius:5px;


@media screen and (max-width:1024px) {display:none}


`;

 export const SubmitButton = styled(Link)`

  
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
   transition:8s;
  border-radius:5px;
  padding:20px;
  margin-left:30%;
  margin-bottom:5%;

   z-index:2;
   &:hover{

      background-color:white;

    color:#C8B0F4;
   border-style:solid;
   border-color: #C8B0F4;
   text-decoration:none;

   }

  @media screen and (max-width:400px) {top:78%}
  @media screen and (max-width:330px) {top:79%;font-size:10px}
  @media screen and (max-width:414px) {top:77%;}
  @media screen and (max-height:570px) {top:85%}
  @media screen and (max-height:530px) {top:75%;height:20%}


 `;

  export const ActualSubmitButton = styled(Link)`

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


  @media screen and (max-width:400px) {top:78%} 
  @media screen and (max-width:400px) {top:79%;font-size:10px}
  @media screen and (max-width:414px) {top:77%;}
  @media screen and (max-height:570px) {top:85%}
  @media screen and (max-height:530px) {top:75%;height:20%}
 `;


 export const FloatDivScrollDownContainer=styled.div`
  position:absolute;
  height:20%;
  width:20%;
  text-align:center;
  font-size:15px;
  top:75%;
  background-color:white;
  left:70%;
  padding:40px;
  border-radius:5px;
  box-shadow: 5px 10px 7px 5px #888888;


  @media screen and (max-width:1024px) {display:none}
  @media screen and (max-width:1160px) {font-size:10px}

   @media screen and (max-height:630px) {font-size:10px}
   @media screen and (max-height:400px) {display:none}
`;


export const CompanyHeader = styled.div`

  position:absolute;
  top:-5%;
  left:2%;
  height:15%;
  width:45%;
  z-index:2;
  font-size:130px;
  color:#C8B0F4;

  @media screen and (max-width:1024px) {font-size:90px;top:2%;left:25%}
  @media screen and (max-width:414px) {font-size:60px;left:12%}
  @media screen and (max-width:400px) {font-size:60px;left:10%}
  @media screen and (max-height:325px) {left:15%}

`;


export const CreateAccountTitle=styled.div`
  position:relative;
  font-size:95%;
  width:160%;
  height:20%;
  color:black;
  margin-left:-30%;

  @media screen and (max-width:1375px) {top:-45%}
  @media screen and (max-width:1024px) {top:-27%;font-size:20px}
  @media screen and (max-width:600px) {font-size:15px;top:-15%}
  @media screen and (max-width:430px) {top:-11%;font-size:15px}


  @media screen and (max-height:420px) {display:none}
    @media screen and (max-height:680px) {display:none}

`;

export const JoinFamily=styled.div`

  position:relative;
  font-size:170%;
  height:20%;
  color:black;

  @media screen and (max-width:1375px) {font-size:30px;top:-50%}
  @media screen and (max-width:1155px) {font-size:20px}
  @media screen and (max-width:1024px) {top:-30%;font-size:30px}
  @media screen and (max-width:730px) {font-size:20px;top:-20%}
  @media screen and (max-width:600px) {font-size:20px;top:-15%}
  @media screen and (max-width:414px) {top:-10%;font-size:30px}
  @media screen and (max-width:400px) {top:-9%;font-size:20px}

  @media screen and (max-height:420px) {display:none}
  @media screen and (max-height:680px) {display:none}
`;

export const TermsOfAgreement=styled.div`

  color:black;
  position:relative;
  height:30%;
  font-size:10px;


  @media screen and (max-width:1375px) {font-size:10px}
  @media screen and (max-width:1024px) {left:10%;width:75%;font-size:10px}
  @media screen and (max-width:900px) {display:none}
  @media screen and (max-width:400px) {left:5%;width:90%;top:60%;font-size:7px}
  @media screen and (max-width:414px) {left:5%;width:90%;top:60%;font-size:7px}
  @media screen and (max-width:330px) {left:2%;width:100%;top:60%;font-size:6px}


   @media screen and (max-height:630px) {font-size:10px;top:110%}

   @media screen and (max-height:400px) {display:none}
   @media screen and (max-height:680px) {display:none}
   @media screen and (max-height:930px) {top:110%}

`;



export const ArrowDownContainer=styled.div`
  position:absolute;
  left:45%;
  top:80%;


  @media screen and (max-width:1024px) {left:12%;width:75%;top:85%}
  @media screen and (max-width:400px) {left:5%;width:90%;top:80%;font-size:7px}



`;

