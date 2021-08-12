import styled from "styled-components";
import {Link} from "react-router-dom";

export const SmallBlogComponent=styled.div`
	position:relative;
	width:200px;
	height:40%;
	margin-right:8%;
	margin-bottom:7%;

	@media screen and (min-width:2500px){
		width:310px !important;
	}

	@media screen and (max-width:1370px){
		margin-bottom:40%;
		height:30%;
		width:220px;
		margin-right:20px !important;
	}

	@media screen and (max-width:640px){
		width:250px !important;
		height:210px !important;
		margin-right:0px !important;

		#smallAudio{
			width:170px !important;
		}
	}

	@media screen and (min-width:500px) and (max-width:570px) 
	    and (min-height:700px) and (max-height:800px){
	    margin-top:25%;
	}


	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	width:300px !important;
    	margin-bottom:50%;
    }
     @media screen  and (max-width:840px) and (max-height:420px) 
	  and (orientation: landscape) 
	  and (-webkit-min-device-pixel-ratio: 1){
		height:60%;
		margin-top:15%;
    }
`;

export const SmallBlog=styled.div`

	position:relative;
	height:160px;
	width:100%;
	border-radius:5px;
	overflow:hidden;

	@media screen and (min-width:2500px){
		height:270px !important;
		width:310px !important;
	}

	@media screen and (max-width:840px){
		width:90% !important;
		height:80% !important;
		#smallImage{
			height:100% !important;
		}
    }




    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	height:180px !important;
    	width:80%;
    }

    @media screen  and (max-width:840px) and (max-height:420px) 
	  and (orientation: landscape) 
	  and (-webkit-min-device-pixel-ratio: 1){
	  	width:250px !important;
		height:190px !important;

    }
	@media screen and (min-width:700px) and (max-width:800px)
   		and (min-height:520px) and (max-height:560px){
      	height:200px !important;
    }
`;

export const ColorPatchContainer=styled.div`
	position:absolute;
	width:30px;
	height:25px;
	border-radius:50%;
	top:80%;
	left:80%;
	z-index:8;

	${({colorCode})=>
		colorCode!=null &&
			`background-color:${colorCode};`
	}

	@media screen and (max-width:650px){
    }
`;


export const Container=styled(Link)`
	margin-right:5% !important;
	@media screen and (max-width:650px){
		#blogHorizontalLine{
			display:block !important;
		}
    }
    @media screen and (min-width:400px) and (max-width:650px) 
	    and (min-height:1000px) and (max-height:1370px){
		margin-left:10% !important;
	}

	@media screen and (min-width:620px) and (max-width:650px) 
	    and (min-height:1300px) and (max-height:1370px){
		margin-left:15% !important;
		margin-right:1% !important;
	}
`;

export const VideoDesriptionContainer=styled.div`
	position:absolute;
	top:5%;
	width:30%;
	height:30%;
	border-radius:50%;
	z-index:40;


	@media screen and (max-width:600px){
		height:60px !important;
		width:60px !important;
    }
`;
