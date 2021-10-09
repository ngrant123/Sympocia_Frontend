import styled from "styled-components";


export const Container=styled.div`
	position:fixed;
	background-color:white;
	width:45%;
	height:60%;
	border-radius:5px; 
	z-index:40;
	left:30%;
	top:20%;
	padding:15px;
	overflow-y:auto;

	@media screen and (max-width:1370px){
		left:3% !important;
		width:95% !important;
		height:90% !important;
		top:5% !important;
		#closeIconMobile{
			display:block !important;
		}

		#videoLI{
			width:80% !important;
		}
		#imgUrl{
			width:170px !important;
			height:170px !important;
			margin-bottom:5% !important;
			margin-right:5% !important;
		}
		#creationImage{
			width:50% !important;
			margin-bottom:50px !important;
		}

		#videoPost{
			height:200px !important;
			width:200px !important;
		}
	}

	@media screen and (max-width:650px){
		width:100% !important;
		top:0% !important;
		left:0% !important;
		height:100% !important;

		#videoLI{
			width:80% !important;
			height:30% !important;
			margin-bottom:5% !important;
		}

		#regularReplyContainer{
			margin-bottom:5% !important;
		}

		#creationImage{
			width:150px !important;
			height:150px !important;
			margin-bottom:20px !important;
		}

		#creationPostDiv{
			padding:10px !important;
		}
		#postLI{
			margin-left:30% !important;
		}
		#imagePicture{
			width:50px !important;
			height:45px !important;
		}
		#questionHeader{
			margin-top:10% !important;
			font-size:15px !important;
		}
		#imageDescriptionLI{
			width:130% !important;
			margin-left:-20% !important;
		}
		#imgUrl{
			width:200px !important;
			height:180px !important;
		}
		#regularPostQuestionLI{
			font-size:15px !important;
		}
		#createButtonLI{
			width:30% !important;	
		}
	}


	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
		#imgUrl{
			width:190px !important;
			height:150px !important;
		}
		#videoLI{
			height:400px !important;
		}

		#creationImage{
			height:60% !important;
		}
    }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		#imageDescriptionLI{
			width:90% !important;
			margin-left:0% !important;
		}
		#imagePicture{
			width:50px !important;
			height:40px !important;
		}
		#imgUrl{
			height:200px !important;
		}
		#videoLI{
			height:250px !important;
		}
		#creationImage{
			height:150px !important;
			width:30% !important;
		}
    }
`;

export const UploadContainer=styled.div`
	@media screen and (max-width:650px){
		#creationImage{
			width:160px !important;
			height:150px !important;
		}
		#videoLI{
			width:100% !important;
			height:30% !important;
			margin-bottom:5% !important;
		}
	}

	@media screen and (max-width:1370px) and (max-height:1030px) and (orientation: landscape) {
		#imgUrl{
			width:190px !important;
			height:150px !important;
		}
		#videoLI{
			height:400px !important;
		}

		#creationImage{
			height:60% !important;
		}
    }

    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		#imageDescriptionLI{
			width:90% !important;
			margin-left:0% !important;
		}
		#imagePicture{
			width:50px !important;
			height:40px !important;
		}
		#imgUrl{
			height:200px !important;
		}
		#videoLI{
			height:250px !important;
		}
		#creationImage{
			height:150px !important;
			width:30% !important;
		}
    }
`;

export const ShadowContainer=styled.div`
	position:fixed;
	width:100%;
	height:100%;
	background-color: rgba(0,0,0,0.7);
	z-index:40;
	top:0px;
`;

export const InputContainer=styled.textarea`
	position:relative;
	border-radius:5px;
	height:40%;
	width:90%;
	border-style:solid;
	border-width:1px;
	border-color:#D8D8D8;
	resize:none;
	padding:5px;

	@media screen and (max-width:1370px){
		width:100% !important;
	}

	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
		height:170px !important;
    }
`;

export const CreatePostContainer=styled.div`
	position:fixed;
	top:80%;
	left:60%;
	width:30%;
	height:10%;
	background-color:white;
	border-radius:5px;
	border-style:solid;
	border-width:1px;
	border-color:#3898ec;
	color:#3898ec;
	padding:20px;
	font-size:15px;
	cursor:pointer;
`;

export const PostsContainer=styled.div`
	display:flex;
	flex-direction:row;
	flex-wrap:wrap;

	@media screen and (max-width:650px){
		flex-direction:column;
		justify-content:center !important;
	}
`;



