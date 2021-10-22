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
		#secondaryBackgroundDiv{
			display:none !important;
		}
		#secondSectionHeaderText{
			font-size:24px !important;
		}
	}

	@media screen and (max-width:650px){
		#backgroundDiv{
			height:1000px !important;
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


    @media screen and (min-width:1920px){
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
		margin-top:-70px;
		#secondSectionImage{
			width:300px !important;
			height:300px !important;
		}
	}


	@media screen and (max-width:1000px){
		margin-top:30px;
	}

	@media screen and (max-width:730px) and (max-height:750px){
		margin-top:180px;
	}


	@media screen and (max-width:700px){
		flex-direction:column-reverse;
		margin-top:200px;

		#secondSectionImage{
			width:200px !important;
			height:200px !important;
		}
		#secondSectionPrimaryText{
			width:80% !important;
		}
		#howAreWeDifferentText{
			font-size:15px !important;
		}
	}

	@media screen and (max-width:700px) and (max-height:750px){
		margin-top:280px;
	}


	@media screen and (max-width:590px){
		margin-top:300px;
	}

	@media screen and (max-width:550px) and (max-height:730px){
		margin-top:400px;
	}

	@media screen and (min-width:300px) and (max-width:400px) 
		and (min-height:1000px) and (max-height:1370px){
		margin-top:160px;
	}

	@media screen and (min-width:350px) and (max-width:400px) 
		and (min-height:1300px) and (max-height:1370px){
		margin-top:90px;
	}


	@media screen and (min-width:410px) and (max-width:640px) 
		and (min-height:1000px) and (max-height:1370px){
		margin-top:100px;
	}


	@media screen and (min-width:300px) and (max-width:440px) 
		and (min-height:550px) and (max-height:740px){
		margin-top:400px;
	}


	@media screen and (min-width:350px) and (max-width:440px) 
		and (min-height:550px) and (max-height:740px){
		margin-top:500px;
	}


	@media screen and (max-width:340px) and (max-height:570px){
		margin-top:550px;
	}

	@media screen and (max-width:310px) and (max-height:570px){
		margin-top:620px;
	}

	@media screen and (min-width:300px) and (max-width:400px) 
		and (min-height:750px) and (max-height:1039px){
		margin-top:400px;
	}

	@media screen and (min-width:650px) and (max-width:1000px) 
		and (min-height:740px) and (max-height:1039px){
		margin-top:250px;
	}

	@media screen and (min-width:700px) and (max-width:1000px) 
		and (min-height:750px) and (max-height:860px){
		margin-top:140px !important;
	}


	@media screen and (min-width:470px) and (max-width:800px) 
		and (min-height:750px) and (max-height:1039px){
		margin-top:350px;
	}

	@media screen and (max-width:290px) and (max-height:670px){
		margin-top:600px;
	}


	@media screen and (min-width:650px) and (max-width:1000px) 
		and (min-height:740px) and (max-height:1039px){
		margin-top:250px;
	}

	@media screen and (min-width:600px) and (max-width:1000px) 
		and (min-height:1000px) and (max-height:1039px){
		margin-top:100px;
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		margin-top:90px;
    }

    @media screen and (max-width:820px) and (max-height:750px) and (orientation:landscape){
		margin-top:150px;
	}


	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		flex-direction:column-reverse;
		margin-top:70%;

		#secondSectionImage{
			width:200px !important;
			height:200px !important;
		}
		#secondSectionPrimaryText{
			width:80% !important;
		}
		#howAreWeDifferentText{
			font-size:15px !important;
		}
    }

    @media screen and (max-width:700px) and (max-height:650px) and (orientation:landscape){
		margin-top:360px;
    }


    @media screen and (max-width:670px) and (max-height:380px) and (orientation:landscape){
		margin-top:95%;
    }
`;





