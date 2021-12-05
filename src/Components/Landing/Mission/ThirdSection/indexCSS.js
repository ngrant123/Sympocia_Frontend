import styled,{css} from "styled-components";

export const Container=styled.div`
	display:flex;
	flex-direction:column;
	justify-content:center;
	padding-left:5%;
	padding-right:5%;

    @media screen and (min-width:1920px){
		#purposeText{
			font-size:24px !important;
		}
		#thirdSectionHeaderText{
			font-size:36px !important;
		}
		#reasoningTitleText{
			font-size:36px !important;
		}

		#reasoningText{
			font-size:18px !important;
		}

		#thirdSectionImage{
			width:427px !important;
			height:435px !important;
		}
    }

    @media screen and (min-width:2500px){
		#purposeText{
			font-size:48px !important;
		}
		#thirdSectionHeaderText{
			font-size:64px !important;
		}
		#reasoningTitleText{
			font-size:36px !important;
		}

		#reasoningText{
			font-size:36px !important;
		}

		#thirdSectionImage{
			width:650px !important;
			height:650px !important;
		}
    }

	@media screen and (max-width:1370px){
		#thirdSectionImage{
			width:300px !important;
			height:300px !important;
		}
	}

	@media screen and (max-width:650px){
		#thirdSectionPrimaryText{
			flex-direction:column !important;
		}
		#informationDiv{
			width:90% !important;
			margin-left:2% important;
			margin-bottom:20% !important;

			display:flex;
			flex-direction:row;

			text-align:left;
		}

		#sectionDescriptionIcons{
			height:200px !important;
			width:200px !important;
		}

		#thirdSectionImage{
			width:200px !important;
			height:200px !important;
		}

		#thirdSectionHeaderText{
			font-size:24px !important;
		}

	}

	@media screen and (max-width:840px) and (max-height:580px) and (orientation:landscape){
		#thirdSectionPrimaryText{
			flex-direction:column !important;
		}
		#informationDiv{
			width:90% !important;
			margin-left:2% important;
			margin-bottom:20% !important;
		}

		#thirdSectionImage{
			width:200px !important;
			height:200px !important;
		}

		#thirdSectionHeaderText{
			font-size:24px !important;
		}
    }
`;

export const InformationDiv=styled.div`
	width:20%;
	display:flex;
	flex-direction:column;
	justify-content:space-between;

	@media screen and (max-width:650px){
		width:90% !important;
		margin-left:2% important;
		margin-bottom:20% !important;
		flex-direction:row;


		${({textAlignPosition})=>
			textAlignPosition=="left"?
			css`
				text-align:left;
				flex-direction:row-reverse;

				#sectionDescriptionIcons{
					margin-left:5% !important;
				}
			`:
			css`
				text-align:right;
				#sectionDescriptionIcons{
					margin-right:5% !important;
				}

			`
		}
	}


	@media screen and (max-width:840px) and (max-height:580px) and (orientation:landscape){
		width:90% !important;
		margin-left:2% important;
		margin-bottom:20% !important;
    }
`;









