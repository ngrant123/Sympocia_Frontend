import styled from "styled-components";

export const Container=styled.div`
	display:flex;
	flex-direction:column;


    @media screen and (min-width:1920px){
    	#headerTexts{
			font-size:36px !important;
		}
		#questionId{
			font-size:18px !important;
		}
		#socialNetworksContainer{
			width:160px !important;
		}
    }

    @media screen and (min-width:2500px){
		#headerTexts{
			font-size:64px !important;
		}
		#questionId{
			font-size:48px !important;
		}
		#socialNetworksContainer{
			width:400px !important;
		}
    }



	@media screen and (max-width:650px){
		#questionSpecificDiv{
			width:90% !important;
			margin-bottom:25% !important;
		}

		#companyInformationDiv{
			flex-direction:column !important;
		}
		#companySecondaryInformation{
			margin-bottom:5% !important;
		}
		#headerTexts{
			font-size:24px !important;
		}
	}
`;
