import styled from "styled-components";

export const Container=styled.div`
	display:flex;
	flex-direction:row;
	width:100%;


	@media screen and (max-width:650px){
		flex-direction:column;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		justify-content:space-between;
    	flex-direction:column;
    }

    @media screen and (min-width:600px) and (max-width:700px) 
		and (min-height:700px) and (max-height:800px){
		flex-direction:column;
	}

	@media screen and (min-width:500px) and (max-width:700px) 
		and (min-height:1000px) and (max-height:1390px){
		flex-direction:column;
	}


`;

export const HeaderContainer=styled.div`
	width:500px !important;
	height:400px !important;
	margin-right:2%;

	#smallImageContainer{
		width:400px !important;
		height:370px !important;
	}
	@media screen and (max-width:1370px){
		#smallImageContainer{
			width:300px !important;
			height:270px !important;
		}
	}

	@media screen and (max-width:650px){
		width:90% !important;
		height:275px !important;
		margin-top:5%;

		#smallImageContainer{
			width:100% !important;
			height:100% !important;
		}
	}

	@media screen and (min-width:400px) and (max-width:430px) 
		and (min-height:700px) and (max-height:750px){
		height:300px !important;
	}

	@media screen and (min-width:500px) and (max-width:700px) 
		and (min-height:1000px) and (max-height:1390px){
		height:400px !important;
	}


	@media screen and (min-width:500px) and (max-width:600px) 
		and (min-height:750px) and (max-height:850px){
		height:350px !important;
	}



	@media screen and (max-width:600px) and (max-height:400px) and (orientation: landscape) {
    	height:370px !important;
    }

    @media screen and (max-width:600px) and (max-height:400px) and (orientation: landscape) {
    	height:400px !important;
    }
`;

export const SupportingPostsContainer=styled.div`
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;
	width:100%;

	#smallImageContainer{
		width:250px !important;
		height:200px !important;
		margin-right:7%;
		margin-bottom:15px;
	}


	@media screen and (max-width:1370px){
		#smallImageContainer{
			width:170px !important;
			height:140px !important;
			margin-right:7%;
			margin-bottom:15px;
		}
	}

	
	@media screen and (max-width:650px){
		margin-top:5%;
		#smallImageContainer{
			width:40% !important;
			height:130px !important;
		}
	}

	@media screen and (min-width:500px) and (max-width:700px) 
		and (min-height:1000px) and (max-height:1390px){
		#smallImageContainer{
			height:185px !important;
		}
	}
	@media screen and (min-width:500px) and (max-width:600px) 
		and (min-height:750px) and (max-height:850px){
		#smallImageContainer{
			height:185px !important;
		}
	}


	@media screen and (max-width:600px) and (max-height:400px) and (orientation: landscape) {
    	#smallImageContainer{
			width:30% !important;
		}
    }
`;



