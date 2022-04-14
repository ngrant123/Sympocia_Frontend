import styled from "styled-components";

export const SupportingPostsContainer=styled.div`
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;
	width:100%;
	
	#smallImageContainer{
		width:220px !important;
		height:190px !important;
		margin-right:7%;
		margin-bottom:15px;
	}

	@media screen and (max-width:1370px){
		margin-top:5%;
		#smallImageContainer{
			width:20% !important;
			height:130px !important;
			margin-right:12%;
		}
	}

	@media screen and (max-width:650px){
		#smallImageContainer{
			width:40% !important;
			height:130px !important;
			margin-right:7%;
		}
	}

	
	@media screen and (max-width:330px){
		#smallImageContainer{
			height:110px !important;
		}
	}

	@media screen and (min-width:850px) and (max-width:1040px) 
		and (min-height:1000px) and (max-height:1380px){
		#smallImageContainer{
			height:170px !important;
		}
	}

	@media screen and (min-width:500px) and (max-width:700px) 
		and (min-height:1000px) and (max-height:1390px){
		#smallImageContainer{
			height:185px !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation:landscape){
		#smallImageContainer{
			height:170px !important;
		}
    }


    @media screen and (min-width:600px) and (max-width:710px) 
		and (min-height:650px) and (max-height:810px){
		height:300px !important;
		#smallImageContainer{
			width:120px !important;
			height:110px !important;
			margin-right:12%;
		}
	}

	@media screen and (min-width:1000px) and (max-width:1380px) 
		and (min-height:800px) and (max-height:1100px){
		#smallImageContainer{
			height:140px !important;
			width:170px !important;
		}
	}

	@media screen and (min-width:1100px) and (max-width:1200px) 
		and (min-height:800px) and (max-height:8500px){
		#smallImageContainer{
			margin-right:17% !important;
		}
	}
	@media screen and (min-width:900px) and (max-width:1000px) 
		and (min-height:1000px) and (max-height:1030px){
		#smallImageContainer{
			height:170px !important;
		}
	}

	@media screen and (min-width:600px) and (max-width:690px) 
		and (min-height:1000px) and (max-height:1040px){
		#smallImageContainer{
			height:140px !important;
		}
	}
			@media screen and (min-width:430px) and (max-width:700px) 
		and (min-height:650px) and (max-height:800px){
		#smallImageContainer{
			height:170px !important;
			width:180px !important;
		}
	}

	@media screen and (min-width:500px) and (max-width:750px) 
		and (min-height:800px) and (max-height:1100px){
		#smallImageContainer{
			height:220px !important;
			width:230px !important;
		}
	}





	@media screen and (min-width:500px) and (max-width:600px) 
		and (min-height:750px) and (max-height:850px){
		#smallImageContainer{
			height:185px !important;
		}
	}



	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		justify-content:space-between;
    	#smallImageContainer{
			width:20% !important;
			height:130px !important;
		}
    }

    @media screen and (max-width:600px) and (max-height:400px) and (orientation: landscape) {
    	#smallImageContainer{
			height:100px !important;
		}
    }

`;