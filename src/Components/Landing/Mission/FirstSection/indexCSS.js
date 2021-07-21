import styled from "styled-components";

export const Container=styled.div`
	display:flex;
	flex-direction:row;
	width:100%;
	justify-content:center;
	opacity:0;
    transition:.8s;


    @media screen and (min-width:1920px){
   		#headerText{
			font-size:48px !important;
		}
		#secondaryFirstSectionText{
			font-size:24px !important;
		}
		#headerImage{
			width:427px !important;
			height:435px !important;
		}
		#signUpButton{
			padding:10px !important;
			font-size:14px !important;
		}
		#exploreButton{
			padding:10px !important;
			font-size:14px !important;
		}
		#totalUsersText{
			font-size:14px !important;
		}
    }

    @media screen and (min-width:2500px){
   		#headerText{
			font-size:64px !important;
		}
		#secondaryFirstSectionText{
			font-size:48px !important;
		}
		#headerImage{
			width:650px !important;
			height:650px !important;
		}
		#signUpButton{
			padding:20px !important;
			font-size:24px !important;
		}
		#exploreButton{
			padding:20px !important;
			font-size:24px !important;
		}
		#totalUsersText{
			font-size:24px !important;
		}
    }


	@media screen and (max-width:1370px){
		#mainIntroductionDiv{
			width:40% !important;
			margin-left:5% !important;
		}
		#headerText{
			font-size:24px !important;
		}

		#totalUsersText{
			display:none !important;
		}

		#secondaryFirstSectionText{
			font-size:18px !important;
		}
		#headerImage{
			width:300px !important;
			height:300px !important;
		}

		#interestedProfilesDiv{
			width:320px !important;
		}
		#firstSectionImageDiv{
			margin-top:-5%;
		}
	}

	@media screen and (max-width:650px){
		flex-direction:column;
		#totalUsersText{
			display:block !important;
		}
		#mainIntroductionDiv{
			width:90% !important;
			margin-left:5% !important;
		}
		#headerText{
			font-size:24px !important;
		}
		#secondaryFirstSectionText{
			font-size:18px !important;
		}
		#headerImage{
			width:200px !important;
			height:200px !important;
		}
		#firstSectionImageDiv{
			margin-top:0%;
			margin-left:0% !important;
			padding:10px !important;
			justify-content:center !important;
			align-items:center !important;
		}

		#signUpButton{
			display:none !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		margin-top:2%;
		#mainIntroductionDiv{
			width:40% !important;
		}
		#interestedProfilesDiv{
			width:350px !important;
		}
    }


	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		margin-top:0%;
		flex-direction:column;
		#mainIntroductionDiv{
			width:100% !important;
			margin-left:0% !important;
		}
		#headerText{
			font-size:24px !important;
		}
		#secondaryFirstSectionText{
			font-size:18px !important;
		}
		#headerImage{
			width:200px !important;
			height:200px !important;
		}

		#interestedProfilesDiv{
			width:90% !important;
		}
		#firstSectionImageDiv{
			margin-left:0% !important;
			padding:10px !important;
			justify-content:center !important;
			align-items:center !important;
			margin-top:5% !important;
		}
    }
`;