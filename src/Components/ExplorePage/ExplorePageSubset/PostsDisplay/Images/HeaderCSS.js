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
	@media screen and (max-width:330px){
		height:230px !important;
	}


	@media screen and (min-width:430px) and (max-width:700px) 
		and (min-height:650px) and (max-height:800px){
		#smallImageContainer{
			width:350px !important;
		}
	}

	@media screen and (min-width:500px) and (max-width:750px) 
		and (min-height:800px) and (max-height:1100px){
		#smallImageContainer{
			width:300px !important;
		}
	}



	@media screen and (min-width:600px) and (max-width:710px) 
		and (min-height:650px) and (max-height:810px){
		height:300px !important;
		#smallImageContainer{
			width:300px !important;
			height:270px !important;
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

	@media screen and (min-width:250px) and (max-width:400px) 
		and (min-height:700px) and (max-height:800px){
		height:250px !important;
	}


    @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
    	height:190px !important;
    	width:200px !important;
	    #smallImageContainer{
			width:200px !important;
			height:170px !important;
		}
		#adIndicator{
			margin-top:5% !important;
		}
    }

`;

export const SupportingPostsContainer=styled.div`
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;
	width:100%;

	#smallImageContainer{
		width:200px !important;
		height:190px !important;
		margin-right:7%;
		margin-bottom:15px;
	}


	@media screen and (max-width:1370px){
		#smallImageContainer{
			width:140px !important;
			height:120px !important;
			margin-right:7%;
			margin-bottom:15px;
		}
		#adIndicator{
			margin-top:5% !important;
		}
		#postOwnerInformation{
			left:67% !important;
		}
	}

	
	@media screen and (max-width:650px){
		margin-top:5%;
		#smallImageContainer{
			width:40% !important;
			height:130px !important;
		}
	}

	@media screen and (max-width:330px){
		#smallImageContainer{
			height:110px !important;
		}
	}



	@media screen and (min-width:600px) and (max-width:710px) 
		and (min-height:650px) and (max-height:810px){
		height:300px !important;
		#smallImageContainer{
			width:140px !important;
			height:130px !important;
		}
	}


	@media screen and (min-width:300px) and (max-width:400px) 
		and (min-height:1000px) and (max-height:1100px){
		#postOwnerInformation{
			left:70% !important;
		}
	}

	@media screen and (min-width:250px) and (max-width:400px) 
		and (min-height:700px) and (max-height:800px){
		#postOwnerInformation{
			left:70% !important;
		}
		#smallImageContainer{
			height:115px !important;
		}

	}



	@media screen and (min-width:500px) and (max-width:700px) 
		and (min-height:1000px) and (max-height:1390px){
		#smallImageContainer{
			height:185px !important;
		}
	}
	@media screen and (min-width:430px) and (max-width:700px) 
		and (min-height:650px) and (max-height:800px){
		#smallImageContainer{
			height:170px !important;
			width:180px !important;
		}
	}

	@media screen and (min-width:500px) and (max-width:660px) 
		and (min-height:800px) and (max-height:1100px){
		#smallImageContainer{
			height:220px !important;
			width:230px !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		#adIndicator{
			margin-top:0% !important;
		}
    }


	@media screen and (max-width:840px) and (max-height:400px) and (orientation: landscape) {
    	#smallImageContainer{
			width:130px !important;
		}
    }
`;



