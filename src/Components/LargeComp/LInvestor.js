import React,{Component} from "react";
import styled from "styled-components";
import backgroundimage from "/Users/nathangrant/Desktop/company/src/designs/background/tester7.png";
import GeneralNav from "/Users/nathangrant/Desktop/company/src/Components/MediumComp/MediumProfileComp/NavBar.js";
import Typed from "react-typed";
import InvestorComp from "/Users/nathangrant/Desktop/company/src/Components/MediumComp/MediumInvestorComp/InvestorComp.js";



const Container = styled.div`
	position:absolute;
	height:100%;
	width:100%;
	background-image:url(${backgroundimage});
	background-size: cover;
	background-position:center center;
	overflow:hidden;

`;

const SearchContainer = styled.div`
	position:fixed;
	background-color:#f7f8ff;
	width:35%;	
	height:30%;
	border-radius:5px;
	top:20%;
	left:30%;
	transition: all ease 0.8s;
  	box-shadow: 1px 1px 30px 10px 	#ffffa5;
  	opacity:0.9;
 
`;

const SearchByNameContainer = styled.div`
	position:absolute;
	width:45%;
	left:3%;
	top:8%;
	height:85%;
	transition:.8s;
	border-radius:5px;
	box-shadow: 5px 10px 7px 5px #888888;

`;

const SearchByNameDescription = styled.div`
	position:absolute;
	width:75%;
	height:15%;
	left:5%;
	top:10%;
	font-size:140%;
	color:	#757575;
	font-family:'Roboto', sans-serif;




`;
const SearchByNameTextarea = styled.textarea`
	position:absolute;
	height:20%;
	width:80%;
	resize:none;
	left:5%;
	border-radius:5px;
	top:35%;
	text-align:center;



`;
const SearchByNameButton = styled.div`

	position:absolute;
	background-color:#6941E5;
	color:white;
	width:50%;
	height:20%;
	left:5%;
	top:65%;
	border-radius:5px;
	text-align:center;
	font-size:140%;
	transition:.8s;

	&:hover{

		background-color:#C8B0F4;
	}

`;

const Divider = styled.div`
	position:absolute;
	top:5%;
	left:48%;
	width:2%;
	height:90%;
	border-style:solid;
	border-width:0px 1px 0px 0px;
	border-color:	#7e7e7e;


`;

const SearchByIndustryContainer = styled.div`
	position:absolute;
	width:45%;
	left:53%;
	top:8%;
	height:85%;
	transition:.8s;
`;

const SearchByIndustryDescription = styled.div`
	position:absolute;
	width:80%;
	height:15%;
	left:5%;
	top:10%;
	font-size:140%;
	color:	#757575;
	font-family:'Roboto', sans-serif;


`;

const SearchIndustryButton = styled.div`
	position:absolute;
	background-color:#C8B0F4;
	color:white;
	width:50%;
	height:20%;
	left:5%;
	top:65%;
	border-radius:5px;
	text-align:center;
	font-size:140%;
	transition:.8s;

	&:hover{

		background-color:#6941E5;
	}

`;


const NavContainer = styled.div`

	position:absolute;
	height:7%
	width:100%;

`;

const LocationContainer = styled.div`

	position:absolute;
	background-color:#f7f8ff;
	top:30%;
	left:37%;
	height:13%;
	width:22%;
	border-radius:5px;
	opacity:0;
	z-index:-2;
	transition:.8s;
	box-shadow: 1px 1px 30px 10px 	#ffffa5;
	overflow:hidden;

`;
const SearchLocationButton = styled.div`
	position:absolute;
	background-color:#C8B0F4;
	left:60%;
	width:20%;
	height:30%;
	color:white;
	top:35%;
	border-radius:5px;
	font-size:130%;
	text-align:center;
	transition:.8s;

	&:hover{
		background-color:#6941E5;

	}

`;

const InvestorBody = styled.div`
	position:absolute;
	background-color:#f7f8f8;
	width:55%;
	height:85%;
	left:35%;
	top:10%;
	border-radius:10px;
	opacity:1;
	z-index:2;
	transition:1s;
	overflow:hidden;

`;

const InvestorDescriptionPage = styled.div`
	position:absolute;
	height:65%;
	width:28%;
	left:70%;
	top:30%;
	font-size:310%;
	color:	#fefbfa;
	font-family:'Roboto', sans-serif;

`;


const StartuptypeStyle ={
	position:'absolute',
	left:'5%',
	top:'35%',
	height:'20%',
	textAlign:'center',
	borderRadius:'5px'
}

const LocationStyle = {
	position:'absolute',
	left:'5%',
	width:'50%',
	top:'35%',
	height:'40%',
	textAlign:'center',
	borderRadius:'5px'

}

class LInvestor extends Component{


	handleClickFunction(param){

			var container=document.getElementById("container");	
			//document.getElementById("searchindustryid").style.opacity="0";
			document.getElementById("divider").style.opacity="0";
			var searchnamecontainer=document.getElementById("searchnameid");
			var industrycontainer=document.getElementById("searchindustryid");


		console.log(param);
		if(param==1){
			document.getElementById("searchindustryid").style.opacity="0";
			//for this I want the container to stay the same but the width to change
			//then I want the um.... left to change also 
			console.log(1);

			var position=0;
			var id=setInterval(frame,30);
			var globalinteger=35;
			var secondgloabalinterger=45;
			var thirdglobalinteger=30;
			var counter=1;
			var count2=1.75;


			function frame(){
				position++;


				if(position==17){

					clearInterval(id);
				}
				else{
					console.log(globalinteger);
					globalinteger=globalinteger-counter;
					secondgloabalinterger=secondgloabalinterger+counter+2;
					thirdglobalinteger=thirdglobalinteger-count2;

					container.style.width=globalinteger+'%';
					container.style.left=thirdglobalinteger+'%';

					searchnamecontainer.style.width=secondgloabalinterger+'%';
					//thirdglobalinteger=thirdglobalinteger-count2;
					
				}
			}
		}
		else{
			document.getElementById("searchnameid").style.opacity="0";
			document.getElementById("locationid").style.opacity="1";
			document.getElementById("locationid").style.zIndex="1";

			var id=setInterval(frame,30);
			var position=0;
			var counter=10;
			var globalindustry=45;
			var thirdglobalinteger=30;
			var count2=7;
			var globalinteger=35;
			var counterer=4;
			var industrycontainerwidth=35;
			var industrycontainerwidthcounter=14;

			function frame(){
				position++;

				if(position==5){

					clearInterval(id);
				}
				else{
					globalindustry=globalindustry-counter;
					secondgloabalinterger=secondgloabalinterger+counter+2;
					globalinteger=globalinteger-counterer;
					industrycontainerwidth=industrycontainerwidth+industrycontainerwidthcounter;

					container.style.width=globalinteger+'%';

					industrycontainer.style.left=globalindustry+"%";
					industrycontainer.style.width=industrycontainerwidth+"%";

					thirdglobalinteger=thirdglobalinteger-count2;
					container.style.left=thirdglobalinteger+'%';
				}
			}
		}
	}

	handleLocationClick(){

		var locationdiv=document.getElementById("locationid");
		document.getElementById("investorbody").style.opacity="1";
		document.getElementById("investorbody").style.zIndex="2";
		var locationdivtop=30
		var locationdivleft=37
		var position=0;
		var counter=3.8;

		var id=setInterval(frame,30);

		function frame(){
			position++;

			if(position==10)
				clearInterval(id);
			else{
				locationdivleft-=counter;
				locationdivtop+=counter;

				locationdiv.style.left=locationdivleft+"%";
				locationdiv.style.top=locationdivtop+"%";
		
			} 
		}
	}

	handleHoverEffect(param){
		console.log("This container has been hovered");

		if(param==1){
			document.getElementById("searchnameid").style.borderRadius="10px";
			document.getElementById("searchnameid").style.boxShadow="5px 10px 7px 5px #888888";

			document.getElementById("searchindustryid").style.borderRadius="none";
			document.getElementById("searchindustryid").style.boxShadow="none";

		}
		else{
			document.getElementById("searchindustryid").style.borderRadius="10px";
			document.getElementById("searchindustryid").style.boxShadow="5px 10px 7px 5px #888888";

			document.getElementById("searchnameid").style.borderRadius="none";
			document.getElementById("searchnameid").style.boxShadow="none";


		}
	}

	render(){

		return(
			<Container>
				<NavContainer>
					<GeneralNav />
				</NavContainer>

				<SearchContainer id="container">
					<SearchByNameContainer id="searchnameid" onMouseEnter={()=>this.handleHoverEffect(1)}>
						<SearchByNameDescription> Search By Name : </SearchByNameDescription>
						<SearchByNameTextarea placeholder="Enter Investors Name"></SearchByNameTextarea>
						<SearchByNameButton onClick={()=>this.handleClickFunction(1)}>Search</SearchByNameButton>
					</SearchByNameContainer>
					<Divider id="divider"/>

					<SearchByIndustryContainer id="searchindustryid" onMouseEnter={()=>this.handleHoverEffect(2)}>
						<SearchByIndustryDescription>Search By Industry : </SearchByIndustryDescription>
						<input list="startupcategories" name="startupcategories" style={StartuptypeStyle} placeholder="Pick an industry"/>
								<datalist id="startupcategories">
									<option value="Fashion" />
									<option value= "Engineering" />
									<option value="Consulting" />
								</datalist>
					<SearchIndustryButton onClick={()=>this.handleClickFunction(2)}>Search</SearchIndustryButton>

					</SearchByIndustryContainer>					

				</SearchContainer>

						<LocationContainer id="locationid">
						<input list="locationoptions" name="locationoptions" style={LocationStyle} placeholder="Pick an industry" id="locationoptions"/>
								<datalist id="locationoptions">
									<option value="New York" />
									<option value= "California" />
									<option value="New Jersey" />
								</datalist>

						<SearchLocationButton id="locationsearchbutton" onClick={()=>this.handleLocationClick()}>Search</SearchLocationButton>

					</LocationContainer>
					
					<InvestorBody id="investorbody">
						<InvestorComp/>
					</InvestorBody>

					<InvestorDescriptionPage id="investpagedescription">
						  <b><Typed 
		                    strings={['Search for Investors in your industry or in your state.^1000' ,'Finding the perfect investor for you is just a couple of clicks away.^1000','Lets get started :)']} 
		                    typeSpeed={60} 
		                    backSpeed={30} 
                		  /></b>
					</InvestorDescriptionPage>


			</Container>

		)
	}
}
export default LInvestor;