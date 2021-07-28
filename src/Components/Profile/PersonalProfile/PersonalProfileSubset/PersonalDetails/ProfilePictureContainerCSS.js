import styled from "styled-components";

export const ProfilePictureContainer=styled.div`
	position:relative;
	width:90%;
	height:350px;
	left:2%;
	border-style:solid;
	border-color:white;
	border-width:7px;
	border-radius:5px;
	z-index:3;
	box-shadow: 1px 1px 10px #d5d5d5;
	display:flex;
	justify-content:center;
  margin-top:5%;

  @media screen and (min-width:2500px){
    #profilePicture{
      border-radius:50%;
      height:95% !important;
      width:55% !important;
    }
  }



	@media screen and (max-width:1370px){
	 	box-shadow:none !important;
	 	height:60% !important;
		width:100% !important;
	 	#profilePicture{
	      border-radius:50%;
          height:95% !important;
          width:85% !important;
          margin-left:10%;
	    }
    }


    @media screen and (max-width:650px){
    	height:237px !important;
    	margin-bottom:2%;
    	margin-left:0%;
    	width:75% !important;
		z-index:10;
		margin-top:55%;
		#profilePicture{
		  width:90% !important;
          height:105% !important;
          left:10% !important;
	    }
    }

    @media screen and (max-width:340px){
    	height:170px !important;
    	#profilePicture{
          height:110% !important;
	    }
    }

    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
    	margin-left:5%;
  	 	#profilePicture{
  	 		width:45% !important;
  	 	}
    }

  @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	margin-top:0%;
    	margin-bottom:-10px;
    	height:80px !important;
    	width:160px !important;
    	#profilePicture{
    		width:50% !important;
          height:70px !important;
	    }
   	}


    @media screen and (max-width:570px) and (max-height:340px) and (orientation:landscape){
    	margin-top:45%;
    	margin-bottom:0px;
    	height:120px !important;
    	margin-left:25% !important;
    	#profilePicture{
	 		width:90% !important;
	        height:120% !important;
	        left:10% !important;
	 	}
   	}
`;



export const ChangePictureButton=styled.div`  
  position:absolute;
  top:85%;
  background-color:#5298F8;
  padding:5px;
  border-radius:5px;
  color:white;
  left:5%;



`;



