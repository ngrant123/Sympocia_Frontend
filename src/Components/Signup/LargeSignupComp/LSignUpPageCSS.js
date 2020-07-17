import styled from "styled-components";
import { Link } from "react-router-dom";

export const PersonalSignUpCard=styled.div`
	position:absolute;
	background-color:white;
	width:30%;
	height:60%;
	left:55%;
	top:25%;
	border-radius:5px;
	border-style:solid;
    border-color:#5298F8;
`;

export const BodyContainer= styled.div`

	position:absolute;
	height:100%;
	width:100%;
	top:0%;
	left:0%;
	background-color:white;

	#particles-js {
	  position: absolute;
	  width: 100%;
	  height: 100%;
	  background-color: #2c2e43;
	  background-repeat: no-repeat;
	  background-size: cover;
	  background-position: 50% 50%;
	  z-index: -1
	} 
	`;

export const SignUp = styled.div`

	position:absolute;
	background-color:white;
	width:35%;
	height:100%;
	left:5%;
	top:0%;


	border-radius:5px;
	opacity:.99;
	transition: all ease 0.8s;


`;

export const TextAreaDiv = styled.div`
	position:absolute; 
	height:20%; 
	width:40%;
	top:35%;
	background-color:white;
	left:55%;
	border-radius:5px;
	font-size:30px;
	font-family:Helvetica;
	opacity:0.7;

`;

export const TitleAreaDiv = styled.div`
		position:absolute; 
		height:20%; 
		width:40%;
		top:20%;
		background-color:white;
		left:55%;
		border-radius:5px;
		font-size:50px;
		font-family:Helvetica;
		opacity:0.7;

`;

export const CompanyName = styled.textarea`

	position:absolute;
	background-color:#4D4C4D;
	resize:none;
	width:60%;
	height:8%;
	left:17%;
	top:20%;
	font-size:20px;
	border-radius:5px;
	color:white;

	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	  color: #DBDADC;
	  opacity: 1; /* Firefox */
	}

	 transition: all ease 0.8s;

`;

export const DescriptionCompany = styled.div`

	position:absolute;
	top:15%;
	left:17%;
	width:60;
	height:8%;
	font-size:20px;
	font-family:Helvetica;


`;
 
export const LocationName = styled.textarea`

	position:absolute;
	background-color:#4D4C4D;
	resize:none;
	width:60%;
	height:8%;
	left:17%;
	top:40%;
	font-size:20px;
	border-radius:5px;
	color:white;

	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	  color: #DBDADC;
	  opacity: 1; /* Firefox */
	}


`;

export const DescriptionLocation = styled.div`

	position:absolute;
	top:35%;
	left:17%;
	width:60;
	height:8%;
	font-size:20px;
	font-family:Helvetica;

`;


export const CompanyType = styled.textarea`

	position:absolute;
	background-color:#4D4C4D;
	resize:none;
	width:60%;
	height:8%;
	left:17%;
	top:60%;
	font-size:20px;
	border-radius:5px;
	color:white;

	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	  color: #DBDADC;
	  opacity: 1; /* Firefox */
	}

`;



export const DescriptionCompanyType = styled.div`

	position:absolute;
	top:55%;
	left:17%;
	width:60;
	height:8%;
	font-size:20px;
	font-family:Helvetica;


`;


export const SubmitInformation = styled.div`

	position:absolute;
	background-color:#C8B0F4;
	color:white;
	width:10%;
	top:80%;
	left:16%;
	border-radius:5px;
	height:6%;
	text-align:center;
	padding:10px;
	font-family:Myriad Pro;
	font-size:25px;

	   &:hover{

      background-color:white;

    color:#C8B0F4;
   border-style:solid;
   border-color: #C8B0F4;
   transition: all ease 0.8s;

   }
`;

export const ImageContainer = styled.div`

	position:absolute;
	width:20%;
	height:35%;
	left:60%;
	top:55%;
	border-radius:5px;
	background-repeat: no-repeat;
	transition: all ease 1s;


`;
export const divStyle = {
  	position:'absolute',
	backgroundColor:'#4D4C4D',
	resize:'none',
	width:'60%',
	height:'8%',
	left:'17%',
	top:'60%',
	fontSize:'20px',
	borderRadius:'5px',
	color:'white'
  
};

export const InputContainer = styled.div`

	::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	  color: #DBDADC;
	  opacity: 1; /* Firefox */
	}

`;
//Change opacity back to what it was 
export const PaymentScreen = styled.div`

	position:absolute;
	background-color:red;
	width:60%;
	height:60%;
	left:20%;
	top:20%;
	border-radius:5px;
	transition: all ease 3s;
	opacity:0;
	display:inline-block;
	pointer-events: none;

`;

export const Payment1Container = styled.div`
	
	position:absolute;
	background-color:blue;
	left:15%;
	width:10%;

`;


export const PersonalSectionContainer=styled.div`
	position:absolute;
	background-color:white;
	width:30%;
	height:50%;
	left:15%;
	top:35%;
	border-radius:5px;
	border-style:solid;
    border-color: #5298F8;

`;

export const PersonalSectionCard=styled.div`
	position:absolute;
	background-color:white;
	width:90%;
	height:90%;
	left:5%;
	transition:.8s;
	top:5%;
	border-radius:5px;
	padding:5px;

    &:hover{
    	box-shadow: 5px 5px 5px 5px #c4c4c4;
    }
`;

export const CompanySectionContainer=styled.div`
	position:absolute;
	background-color:white;
	width:40%;
	height:50%;
	left:53%;
	top:35%;
	border-radius:5px;
	border-style:solid;
    border-color:#5298F8;
`;

export const CompanySectionCard=styled.div`
	position:absolute;
	background-color:white;
	width:90%;
	height:90%;
	left:5%;
	transition:.8s;
	top:5%;
	border-radius:5px;

    &:hover{
    	box-shadow: 5px 5px 5px 5px #c4c4c4;
    }
`;

export const TitleHeader=styled.div`
	position:absolute;
	width:70%;
	height:20%;
	top:3%;
	left:17%;
	font-size:80px;

`;

export const PersonalPageButton=styled(Link)`
	position:absolute;
	background-color:#5298F8;
	color:white;
	width:50%;
	height:15%;
	top:80%;
	left:20%;
	transition:.8s;
	border-radius:5px;
	text-align:center;
	padding:5px;
	font-size:15px;

	&:hover{
		background-color:#0b6cef;
	}



`;

export const SignUpButton=styled.div`
	position:relative;
	background-color:#5298F8;
	color:white;
	width:80px;
	height:15%;
	transition:.8s;
	border-radius:5px;
	text-align:center;
	padding:5px;
	font-size:15px;

	&:hover{
		background-color:#0b6cef;
	}


`;
export const MapContainer=styled.div`
	position:absolute;
	background-color:white;
	top:35%;
	width:50%;
	height:45%;
	font-size:20px;
	font-family:Helvetica;
	z-index:2;
	border-radius:5px;
	border-style:solid;
    border-color:#5298F8;
    overflow-y:scroll;
`;

export const MarkerContainer=styled.div`

	position:relative;
	background-color:white;
	width:70px;
	height:65px;
	border-radius:5px;
	padding:2px;
	overflow:hidden;
	box-shadow:2px 2px 5px #707070;
`;

export const BottomNotificationContainer=styled.div`
	position:absolute;
`;

export const Button=styled(Link)`
	position:absolute;
	width:15%;
	height:5%;
	border-radius:5px;
	background-color:#C8B0F4;
	color:white;
	text-decoration:none;
	text-align:center;
	font-size:15px;
	padding:10px;
	left:57%;
	top:65%;

	&:hover{
		color:white;
		text-decoration:none;
	}
`;

export const NextButton=styled.div`
	position:relative;
	border-radius:5px;
	width:30%;
	background-color:#C8B0F4;
	color:white;
	text-decoration:none;
	text-align:center;
	font-size:15px;
	padding:10px;

	&:hover{
		color:white;
		text-decoration:none;
	}

`;

export const AsisgnEveryIndustryButton=styled.div`
	position:relative;
	border-radius:5px;
	background-color:#5298F8;
	color:white;
	text-decoration:none;
	text-align:center;
	font-size:15px;
	padding:10px;
	top:65%;

	&:hover{
		color:white;
		text-decoration:none;
	}
`;

export const IndustryButton=styled.div`
	position:relative;
	border-radius:5px;
	background-color:#5298F8;
	color:white;
	text-decoration:none;
	text-align:center;
	font-size:15px;
	padding:10px;
	top:65%;

	&:hover{
		color:white;
		text-decoration:none;
	}
`;
