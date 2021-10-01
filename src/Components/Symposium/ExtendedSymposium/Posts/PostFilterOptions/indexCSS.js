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
		top:10%;
		${({isScrollEnabled})=>
			isScrollEnabled?
			`
				margin-left:5% !important;
				top:35%;
			`:
			`
				margin-left:-5% !important;
				top:10%;
			`
		}
	}
	@media screen and (max-width:650px){
		margin-left:10px !important;
		#postFilterDropDownMenu{
			margin-left:20px !important;
		}
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
    	width:400px;
    	margin-left:2% !important;
    }

    @media screen and (max-width:730px){
    	margin-left:-140% !important;
    	width:720px;
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



