import styled from 'styled-components';
import img2 from '../../../designs/background/ThirdSectionBackground.png';

export const ThirdContainer=styled.div`
 position:absolute;
  width:100%;
  height:100%;

  background-image:url(${img2});
  background-size: cover; /* or contain depending on what you want */
  background-repeat: no-repeat;

`;


export const LandingPageScrollBar= styled.div`
	position:relative;
	width:20%;
	height:7%;
	left:45%;
	top:85%;
	background-color:white;
	border-style:solid;
	border-color:red;
	padding:5px;

`;

export const HeaderTitleContainer= styled.div`
	position:absolute;
	color:white;
	width:60%;
	height:20%;
	top:10%;
	left:20%;
	font-size:80px;

	@media screen and (max-width:1150px) {font-size:60px}
	@media screen and (max-width:920px) {font-size:30px}
	@media screen and (max-width:860px) {font-size:30px}
	@media screen and (max-width:830px) {font-size:25px}
	@media screen and (max-width:655px) {font-size:20px}
	@media screen and (max-width:320px) {font-size:20px}

`;



export const ArrowDownContainer=styled.div`
  position:absolute;
  left:45%;
  top:80%;

  @media screen and (max-width:1000px) {left:10%;top:60%;width:75%;}
  @media screen and (max-width:800px) {left:5%;top:70%;width:75%;}
  @media screen and (max-width:630px) {left:5%;top:70%;width:75%;}
  @media screen and (max-width:400px) {left:5%;width:90%;top:80%;font-size:7px}
  @media screen and (max-width:420px) {display:none}
  @media screen and (max-width:375px) {display:none}
  @media screen and (max-width:320px) {display:none}

  @media screen and (max-height:420px) {left:-10%;width:90%;top:55%;font-size:7px}
  @media screen and (max-height:680px) {display:none}

`;



export const InformationBubble1=styled.div`
	position:relative;
	height:40%;
	width:420px;
	border-radius:5px;
	transition:.8s;
	color:white;
	font-size:160%;

	@media screen and (max-width:1450px) {font-size:20px}
	@media screen and (max-width:1120px) {font-size:20px}
	@media screen and (max-width:920px) {font-size:15px;height:30%}
	@media screen and (max-width:420px) {width:300px;font-size:15px}
	@media screen and (max-width:320px) {width:300px;font-size:10px}
	@media screen and (max-height:420px) {font-size:10px}

`;

export const InformationContainer=styled.div`
	position:relative;
	top:40%;
	width:100%;
	overflow:scroll;

	@media screen and (max-width:920px) {top:20%}

	@media screen and (max-height:790px) {font-size:10px}
	@media screen and (max-height:300px) {width:150%;left:-10%}
	@media screen and (max-height:420px) {left:10%}


`;
