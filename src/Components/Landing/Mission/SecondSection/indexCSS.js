import styled from "styled-components";

export const Container=styled.div`
	display:flex;
	flex-direction:row;
	flex-shrink: 0;
	width:100%;


	@media screen and (min-width:1920px){
		#backgroundDiv{
			height:900px !important;
		}
    }

    @media screen and (min-width:2500px){
		#backgroundDiv{
			height:1300px !important;
		}
    }


	@media screen and (max-width:1370px){
		flex-direction:column !important;
		overflow:hidden;
		#secondaryBackgroundDiv{
			display:none !important;
		}
		#secondSectionHeaderText{
			font-size:24px !important;
		}
		#backgroundDiv{
			height:850px !important;
		}
	}

	@media screen and (max-width:650px){
		#backgroundDiv{
			height:1050px !important;
			margin-left:-20% !important;
		}
	}

	@media screen and (min-width:300px) and (max-width:400px) 
		and (min-height:750px) and (max-height:1039px){
		#backgroundDiv{
			height:1100px !important;
		}
	}

	@media screen and (max-width:290px) and (max-height:670px){
		#backgroundDiv{
			height:1100px !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		#backgroundDiv{
			height:1000px !important;
			margin-left:-20% !important;
		}
    }
`;

export const InformationalContainer=styled.div`
	position:absolute;
	z-index:5;
	margin-top:10%;
	width:100%;
	height:65%;
	display:flex;
	flex-direction:row;
	align-items:center;
	justify-content:space-between;


    @media screen and (min-width:1900px){
		margin-top:7%;
		#manifestoText{
			font-size:24px !important;
		}
		#secondSectionHeaderText{
			font-size:36px !important;
		}
		#howAreWeDifferentText{
			font-size:18px !important;
		}
		#offerHeaderText{
			font-size:18px !important;
		}
		#OLListCSSID{
			font-size:18px !important;
		}

		#secondSectionImage{
			width:427px !important;
			height:435px !important;
		}
    }

    @media screen and (min-width:2500px){
		margin-top:-5%;
		#manifestoText{
			font-size:48px !important;
		}
		#secondSectionHeaderText{
			font-size:64px !important;
		}
		#howAreWeDifferentText{
			font-size:36px !important;
		}
		#offerHeaderText{
			font-size:36px !important;
		}
		#OLListCSSID{
			font-size:36px !important;
		}
		#secondSectionImage{
			width:650px !important;
			height:650px !important;
		}
    }

    @media screen and (min-width:2800px) and (min-height:2800px){
    	margin-top:-150px;
    }

	@media screen and (max-width:1370px){
		margin-top:-40px;
		#secondSectionPrimaryText{
			width:100% !important;
		}
		#secondSectionImage{
			width:300px !important;
			height:300px !important;
		}
	}
`;


export const MobileTextDisplay=styled.div`
	display:flex;
	flex-direction:column-reverse;
	align-items:center;
	justify-content:space-between;
	background-color:#232323;

	@media screen and (max-width:1370px){
		margin-top:15%;
		margin-bottom:15%;
		padding-bottom:20px;
		margin-top:20px;
		#secondSectionPrimaryText{
			width:90% !important;

			margin-top:5%;
			margin-bottom:5%;
		}
		#secondSectionImage{
			width:300px !important;
			height:300px !important;
		}
	}

	@media screen and (max-width:650px){
		#secondSectionPrimaryText{
			width:85% !important;
		}
		#secondSectionImage{
			width:200px !important;
			height:200px !important;
		}
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		#secondSectionPrimaryText{
			margin-right:0% !important;
			width:90% !important;
		}

		#secondSectionImage{
			width:200px !important;
			height:200px !important;
		}
    }

`;
