import styled from "styled-components";


export const PostContainer=styled.div`
	position:relative;
	padding-left:40px;
	left:0%;
	top:5%;
	width:100%;
	height:100%;
	transition:1s;

	@media screen and (max-width:1370px){
    	position:absolute;
    	left:5%;
		height:180% !important;
		padding-top:15% !important;
    	margin-left:-2% !important;

		${({isScrollEnabled})=>
			isScrollEnabled?
			`
				top:50% !important;
			`:
			`
				top:10% !important; 
			`
		}
    }

	@media screen and (max-width:650px){
    	position:absolute;
		width:90%;
		height:150% !important;
    	margin-left:-7% !important;

    	#postLoadingText{
    		margin-top:30%;
    	}

    	${({isScrollEnabled})=>
			isScrollEnabled?
			`
				top:90% !important;
			`:
			`
				top:60% !important; 
			`
		}	
    }

    @media screen and (min-width:300px) and (max-width:400px) 
		and (min-height:800px) and (max-height:900px){
    	${({isScrollEnabled})=>
			isScrollEnabled?
			`
				top:70% !important;
			`:
			`
				top:50% !important; 
			`
		}
	}



	@media screen and (min-width:440px) and (max-width:600px) 
		and (min-height:640px) and (max-height:1100px){
    	${({isScrollEnabled})=>
			isScrollEnabled?
			`
				top:95% !important;
			`:
			`
				top:50% !important; 
			`
		}
	}

	@media screen and (min-width:420px) and (max-width:439px) 
		and (min-height:640px) and (max-height:1100px){
    	${({isScrollEnabled})=>
			isScrollEnabled?
			`
				top:60% !important;
			`:
			`
				top:50% !important; 
			`
		}
	}
	@media screen and (min-width:400px) and (max-width:419px) 
		and (min-height:640px) and (max-height:1100px){
    	${({isScrollEnabled})=>
			isScrollEnabled?
			`
				top:80% !important;
			`:
			`
				top:50% !important; 
			`
		}
	}




	@media screen and (min-width:250px) and (max-width:400px) 
		and (min-height:900px) and (max-height:1400px){
		${({isScrollEnabled})=>
			isScrollEnabled?
			`
				top:50% !important;
			`:
			`
				top:50% !important; 
			`
		}
	}


	@media screen and (min-width:500px) and (max-width:600px) 
		and (min-height:1100px) and (max-height:1370px){
		${({isScrollEnabled})=>
			isScrollEnabled?
			`
				top:70% !important;
			`:
			`
				top:40% !important; 
			`
		}
	}


	@media screen and (min-width:600px) and (max-width:700px) 
		and (min-height:1200px) and (max-height:1370px){
		${({isScrollEnabled})=>
			isScrollEnabled?
			`
				top:115% !important;
			`:
			`
				top:120% !important; 
			`
		}
	}


	@media screen and (min-width:200px) and (max-width:350px) 
		and (min-height:600px) and (max-height:900px){
		${({isScrollEnabled})=>
			isScrollEnabled?
			`
				top:70% !important;
			`:
			`
				top:50% !important; 
			`
		}
	}


    @media screen  and (max-width:850px) and (max-height:420px) 
	  and (orientation: landscape) 
	  and (-webkit-min-device-pixel-ratio: 1){
    	height:170% !important;
    	padding:20px !important;
    	width:90%;
    	top:130% !important;
    	margin-bottom:120% !important;
    	margin-left:0% !important;
    }

	@media screen and (min-width:300px) and (max-width:350px) and (min-height:700px) and (max-height:900px){
		#postLoadingText{
    		margin-top:40%;
    	}	
	}


    @media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
    	height:170% !important;
    	padding:20px !important;
    	width:100%;
    	top:60% !important;
    	margin-bottom:120% !important;
    	margin-left:0% !important;

    	#postLoadingText{
    		margin-top:10%;
    	}	
    }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		${({isScrollEnabled})=>
		isScrollEnabled==true &&(
		`			
			top:80% !important;
			width:90%;
		`
		)}
	}


`;



export const Posts=styled.div`
	position:absolute;
	width:95%;
	height:100%;
	display:flex;
	background-color:white;
	flex-direction:row;

	@media screen and (max-width:1370px){
		#verticalPostCategoryDivider{
			display:none !important;
		}
	}

	@media screen and (max-width:650px){
		margin-top:5% !important;
		width:100%;
	}
	@media screen and (max-width:840px) and (max-height:420px) and (orientation: landscape) {
		margin-top:10% !important;
	}
`;








