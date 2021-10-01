import styled from "styled-components";

export const PostContainer=styled.div`
	position:relative;
	padding-left:40px;
	left:0%;
	top:5%;
	width:100%;
	height:100%;
	transition:1s;

	@media screen and (max-width:1370px){
    	position:absolute;
    	left:5%;
		height:180% !important;
		padding-top:15% !important;
    	margin-left:-2% !important;

		${({isScrollEnabled})=>
			isScrollEnabled?
			`
				top:50% !important;
			`:
			`
				top:10% !important; 
			`
		}
    }

	@media screen and (max-width:650px){
    	position:absolute;
		width:100%;
		height:150% !important;
		padding-top:50% !important;
    	top:58% !important;
    	margin-left:-7% !important;
    }

    @media screen and (max-width:600px){
    	top:-20% !important;
    	${({isScrollEnabled})=>
			isScrollEnabled==true &&(
				`top:10% !important;`
			)
		}
    }
    @media screen  and (max-width:850px) and (max-height:420px) 
	  and (orientation: landscape) 
	  and (-webkit-min-device-pixel-ratio: 1){
    	height:170% !important;
    	padding:20px !important;
    	width:90%;
    	top:130% !important;
    	margin-bottom:120% !important;
    	margin-left:0% !important;
    }


    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	height:170% !important;
    	padding:20px !important;
    	width:100%;
    	top:60% !important;
    	margin-bottom:120% !important;
    	margin-left:0% !important;
    }

    @media screen and (max-width:1370px) and (max-height:800px) and (orientation: landscape) {
		top:50%!important;
		${({isScrollEnabled})=>
			isScrollEnabled==true &&(
				`top:90% !important;`
			)
		}
    }


`;



export const Posts=styled.div`
	position:absolute;
	width:95%;
	height:100%;
	display:flex;
	background-color:white;
	flex-direction:row;

	@media screen and (max-width:1370px){
		#verticalPostCategoryDivider{
			display:none !important;
		}
	}

	@media screen and (max-width:650px){
		margin-top:5% !important;
		width:100%;
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		margin-top:10% !important;
	}
`;








