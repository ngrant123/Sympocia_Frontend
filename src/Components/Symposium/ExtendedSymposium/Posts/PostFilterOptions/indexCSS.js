import styled from "styled-components";

export const SympociaOptionsContainer=styled.div`
	position:relative;	
	display:flex;							
	flex-direction:row;
	justify-content:space-between;
	z-index:30;
	width:90%;
	left:2%;

	@media screen and (max-width:1370px){
		#symposiumPostOptionsId{
			width:120px !important;
			height:40px !important;
		}
		#symposiumOptionsId{
			width:190px !important;
			height:40px !important;
		}

		${({isScrollEnabled})=>
			isScrollEnabled?
			`
				margin-left:5% !important;
				top:50%;
			`:
			`
				margin-left:5% !important;
				top:10%;
			`
		}
	}
	@media screen and (max-width:650px){
		#symposiumPostOptionsId{
			width:150px !important;
			height:40px !important;
		}
		#symposiumOptionsId{
			width:190px !important;
			height:40px !important;
		}
		${({isScrollEnabled})=>
			isScrollEnabled==true &&(
			`			
				margin-left:-20px !important;
				top:170px;
			`
			)}

		margin-left:10px !important;
		#postFilterDropDownMenu{
			margin-left:20px !important;
		}
	}

	@media screen and (min-width:1110px) and (max-width:1380px) and (min-height:800px) and (max-height:1100px){
		${({isScrollEnabled})=>
		isScrollEnabled==true &&(
		`			
			margin-left:2% !important;
		`
		)}
	}


	@media screen and (min-width:1000px) and (max-width:1030px) and (min-height:1300px) and (max-height:1390px){
		${({isScrollEnabled})=>
		isScrollEnabled==true &&(
		`			
			top:130px;
		`
		)}
	}


	@media screen and (max-width:350px){
		#symposiumPostOptionsId{
			width:90px !important;
			height:40px !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
			display:none !important;
	}


`;


export const SearchOptionContainer=styled.div`
	display:flex;
	flex-direction:row;
	align-items:center;
	@media screen and (max-width:1370px){
		flex-direction:row;
	}

	@media screen and (max-width:650px){
		width:100% !important;
		margin-left:5% !important;
	}

	@media screen and (max-width:350px){
		#symposiumPostOptionsId{
			font-size:12px !important;
		}

		#symposiumOptionsId{
			font-size:12px !important;
		}
		
	}
`;


export const MinifiedSymposiumInformation=styled.div`
	display:flex;
	flex-direction:row;

	@media screen and (max-width:1370px){
		display:none !important;
	}
`;


export const SearchContainer=styled.div`
	position:relative;
	width:365px;
	height:50px;
	display:flex;
	flex-direction:row;
	border-radius:5px;
	padding:5px;
	margin-right:2%;
	background-color:#EEEEEE;


	@media screen and (max-width:1370px){
    	width:300px;
    	margin-left:0% !important;
    }

    @media screen and (max-width:650px){
    	display:none !important;
    }

    @media screen and (max-width:730px) and (max-height:420px){
    	height:35% !important;
    }

    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	margin-left:0% !important;
    }

    @media screen  and (max-width:730px) and (max-height:420px) 
	  and (orientation: landscape) 
	  and (-webkit-min-device-pixel-ratio: 1){
    	margin-left:-100% !important;
    }


    @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		display:none !important;
	}
`;


export const SearchTextArea=styled.textarea`
	position:relative;
	resize:none;
	width:500px;
	height:90%;
	padding-top:10px;
	border-style:none;
	background-color:#EEEEEE;

	border: none;
    overflow: auto;
    outline: none;

    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;

    resize: none; /*remove the resize handle on the bottom right*/

`;



