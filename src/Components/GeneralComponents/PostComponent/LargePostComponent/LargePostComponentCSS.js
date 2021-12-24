import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container=styled.div`
	position:fixed;
	z-index:35;
	background-color:white;
	border-radius:5px;
	top:20%;
	width:50%;
	left:30%;
	height:60%;
	padding:30px;
	overflow:hidden;

    @media screen and (min-width:2500px){
        height:30%;
    }

   @media screen and (max-width:1030px) and (max-height:1370px){
    	top:20% !important;
    	width:90% !important;
    	height:60% !important;
    	left:5% !important; 
    }

     @media screen and (max-width:740px) and (max-height:420px){
	 	#postOptionLI{
    		margin-bottom:5% !important;
    	}

        #blogPostOptionLI{
           margin-bottom:5% !important; 
        }
    }

    @media screen and (max-width:650px){
    	top:0% !important;
    	width:100% !important;
		left:0% !important; 
		height:100% !important;
		overflow:auto;

        #closeModalButton{
            display:block !important;
        }
    }

    @media screen and (max-width:420px){
    	#postOptionLI{
    		display:block !important;
    		margin-bottom:5% !important;
    	}

        #blogPostOptionLI{
            display:block !important;
            margin-bottom:5% !important;
        }
    }
    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	#blogCreationButton{
    		margin-top:-15px !important;
    	}
    }

`;

export const IndustryTypeContainer = styled.div`
	position:absolute;
	width:100%
	height:20%;
	overflow:hidden;

`;

export const PostOptionsContainer = styled.div`
	position:absolute;
	width:100%;
	height:15%;
	top:85%;
	display:flex;
	flex-direction:row;
	padding:10px;


	@media screen and (max-width:1030px){
 		top:65% !important;
 	}

	 @media screen and (max-width:650px){
    	top:10% !important;
    	height:90%;
    	flex-direction:column;
    }

	@media screen and (max-width:740px) and (max-height:420px){
	 	margin-left:-10% !important;
	 	margin-bottom:10% !important;
	 	height:40% !important;
	 	top:20% !important;
    }
    @media screen and (min-width:470px) and (max-width:800px) 
        and (min-height:730px) and (max-height:1039px){
        flex-direction:column;

        #blogPostOptionLI{
           margin-top:0% !important; 
            height:10% !important;
        }
    }

    @media screen and (min-width:680px) and (max-width:1000px) 
        and (min-height:730px) and (max-height:1039px){
        flex-direction:column;
        top:5% !important;
        
        #postOptionLI{
            display:block !important;
            margin-bottom:5% !important;
            height:50% !important;
            padding:20px !important;
            width:90% !important;
        }

        #blogPostOptionLI{
            display:block !important;
            margin-bottom:5% !important;
             height:50% !important;
            padding:20px !important;
            width:90% !important;
        }
    }

    @media screen and (min-width:670px) and (max-width:800px) 
        and (min-height:1000px) and (max-height:1039px){
        flex-direction:column;
        top:10% !important;
        #blogPostOptionLI{
            display:block !important;
            margin-bottom:5% !important;
            height:20% !important;
        }

        #postOptionLI{
            display:block !important;
            margin-bottom:5% !important;
            height:20% !important;
        }
    }
    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	top:30% !important;
    	flex-direction:column;
    	padding:10%;
    }


`;

export const PostContainer = styled.div`

 	position:absolute;
 	left:5%;
 	width:90%;
 	height:65%;
 	top:20%;
 	background-color:#f7f8ff;
 	border-style:solid;
 	border-width:2px 0px 2px 0px;
 	border-color:#e0e0e0;
 	z-index:6;

    @media screen and (min-width:470px) and (max-width:800px) 
        and (min-height:750px) and (max-height:1039px){
        display:none !important;
    }



 	@media screen and (max-width:740px) and (max-height:420px){
	 	display:none !important;
    }

 	@media screen and (max-width:1030px){
 		height:40% !important;
 	}

 	@media screen and (max-width:420px){
    	display:none !important;
    	height:10% !important;
    }


    @media screen and (min-width:400px) and (max-width:700px) 
        and (min-height:1000px) and (max-height:1370px){
        display:none !important;
    }

    @media screen and (min-width:680px) and (max-width:1000px) 
        and (min-height:730px) and (max-height:1039px){
        display:none !important;
    }



    @media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	display:none;
    }
 `;

export const PostTextarea = styled.textarea`
 
 	position:absolute;
 	height:100%;
 	width:70%;
 	left:10px;
 	overflow:hidden;
 	resize:none;
 	padding:20px;
 	font-size:120%;
 	background-color:#f7f8ff;
 	border-style:none;
 	color:	#55557a;

    @media screen and (min-width:2500px){
        font-size:36px !important;
    }

 	@media screen and (max-width:1030){
 		height:60% !important;
 	}



 `;

export const ProfileContainer = styled.div`
 	position:absolute;
 	background-color:#f7f8ff;
 	height:90%;
 	width:25%;
 	top:2%;
 	border-radius:5px;
	transition:.8s;

 	&:hover{
 		background-color:#e3dced;

 	}
 `;

export const ViewProfileButton = styled.div`

 	position:absolute;
 	width:10%;
 	height:14%;
 	background-color:#5298F8;
 	top:15%;
 	z-index:2;
 	left:11%;
 	border-radius:5px;
 	text-align:center;
 	padding-top:1%;
 	color:white;
 	font-size:105%;
 	border-style:solid;
 	border-color:#1674f4;


 `;


export const PostOptionButton = styled.div`
 	height:70%;
 	width:100px;
 	background-color:#C8B0F4;
 	border-radius:5px;
 	color:	#f7f4f8;
 	display:flex;
 	justify-content:center;
 	align-items:center;
 	cursor:pointer;
 	margin-right:5%;


    @media screen and (min-width:2500px){
        font-size:24px !important;
    }
 	

 	@media screen and (max-width:740px){
 		${({isPhoneUIEnabled})=>
 			isPhoneUIEnabled==true &&(
 				`background-color:white;
 				color:#C8B0F4;`
 			)
 		}
        height:10%;
 	}


    @media screen and (min-width:470px) and (max-width:810px) 
        and (min-height:750px) and (max-height:1039px){
        ${({isPhoneUIEnabled})=>
            isPhoneUIEnabled==true &&(
                `background-color:white;
                color:#C8B0F4;`
            )
        }
    }

     @media screen and (min-width:670px) and (max-width:800px) 
        and (min-height:1000px) and (max-height:1039px){
        padding:30px !important;
        width:90% !important;
    }
 	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	height:70% !important;
    	background-color:white;
 		color:#C8B0F4;
    }
 `;


export const BlogOptionButton=styled(Link)`
	position:relative;
 	background-color:#C8B0F4;
 	left:7%;
 	top:5%;
 	border-radius:5px;
 	color:	#f7f4f8;
 	text-align:center;
 	padding:15px;
 	margin-top:2px;
 	top:15px;
 	text-decoration:none;

 	&:hover{
 		color:white;
 		border-style:none;
 		text-decoration:none;
 	}
 	@media screen and (max-width:740px){
 		${({isPhoneUIEnabled})=>
 			isPhoneUIEnabled==true &&(
 				`background-color:white;
 				color:#C8B0F4;`
 			)
 		}
 	}



 	@media screen and (max-width:840px) and (max-height:420px) and (orientation:landscape){
    	height:70% !important;
    	background-color:white;
 		color:#C8B0F4;
 		top:0px;
    }
`;

export const ImageOptionButton = styled.div`

 	position:absolute;
 	height:70%;
 	width:15%;
 	background-color:#C8B0F4;
 	left:30%;
 	top:5%;
 	border-radius:5px;
 	color:	#f7f4f8;
 	text-align:center;

 `;


export const LocationOptionButton = styled.div`

 	position:absolute;
 	height:70%;
 	width:15%;
 	background-color:#C8B0F4;
 	left:53%;
 	top:5%;
 	border-radius:5px;
 	color:	#f7f4f8;
 	text-align:center;

 `;


export const SubmitOptionButton = styled.div`

 	position:absolute;
 	height:70%;
 	width:15%;
 	background-color:#C8B0F4;
 	left:75%;
 	top:5%;
 	border-radius:5px;
 	text-align:center;
 	color:	#f7f4f8;

 `;

export const ProfileImageContainer = styled.div`

 	position:absolute;
 	left:20%;
 	height:55%;
 	width:60%;
 	top:6%;
 	border-radius:50%;
 	background-color:blue;
 	border-style:solid;
	border-color:	#af9ad5;
 	z-index:2;
 `;

export const CompanyIconContainer = styled.div`

 	position:absolute;
 	left:12%;
 	height:60%;
 	width:80%;
 	border-radius:5px;
 	background-color:black;
 	z-index:2;
 	top:15%;


 `;

export const EmployeeTitleContainer = styled.div`

 	position:absolute;
 	width:50%;
 	height:17%;
 	top:65%;
 	left:25%;
 	color:	#af9ad5;
 	text-align:center;
 	font-size:135%;
 	border-style:solid;
 	border-color:	#dcdde8;
 	border-width:1px 0px 0px 0px;

 `;


export const CompanyTitleContainer = styled.div`
	position:absolute;
 	width:50%;
 	height:17%;
 	top:85%;
 	left:25%;
 	border-radius:5px;
 	color:	#af9ad5;
 	text-align:center;
 	font-size:105%;
`;
