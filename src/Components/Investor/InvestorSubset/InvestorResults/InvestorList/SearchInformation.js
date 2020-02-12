import React,{useState,useEffect,Component} from "react";
import styled from "styled-components";


const Container=styled.div`
	width:400px;
	height:120%;
	border-radius:5px;
	box-shadow: 1px 1px 5px 5px #d8d9df;
`;

const OptionsButton=styled.div`
	background-color:#5298F8;
	padding:5px;
	padding-right:20px;
	padding-left:20px;
	border-style:solid;
	border-width:1px;
	border-color:#0649a4;
	text-align:center;
	color:white;
	border-radius:5px;
	margin-right:15px;
`;

const InvestorsContainer=styled.div`
	position:relative;
	width:100%;
	height:60%;
	border-radius:5px;
	box-shadow: 1px 1px 5px 5px #d8d9df;
	overflow-x:hidden;

`;

const InvestorInformation=styled.div`
	position:relative;
	width:100px;
	height:40%;
	border-radius:5px;
	padding:10px;
	box-shadow: 1px 1px 1px #d8d9df;
	transition:.8s;

	&:hover{
		background-color:#ededed;
		box-shadow: 1px 1px 5px 5px #d8d9df;
	}

`;

const InvestorProfilePicture=styled.div`
	position:relative;
	width:60px;
	height:55%;
	border-radius:50%;
	background-color:black;
	margin-left:10px;
	border-style:solid;
	border-width:1px;
	border-color:#0649a4;

`;


const SearchInformation=(props)=>{

	//Test data 

	const [investors,changeInvestors]=useState([]);

	const [mostPopular,changeMostPopular]=useState([{},{}]);
	const [newest,changeNewest]=useState([{},{},{}]);
	const [activeNow,changeActive]=useState([{},{},{},{}]);

	useEffect(()=>{
		changeInvestors(mostPopular);
		console.log(investors);
	},[])

	return(
		<React.Fragment>
			<p style={{marginLeft:"35px",fontSize:"35px",color:"#353737"}}><b>Fashion Investors</b></p>
			<p style={{paddingLeft:"25%",fontSize:"15px",color:"#8c939a"}}> New York Investors </p>


			<ul style={{padding:"0px"}}>
				<li style={{marginBottom:"20px",listStyle:"none"}}> 
					<ul style={{padding:"0px"}}>
						<li style={{listStyle:"none",display:"inline-block"}}>
							<OptionsButton onClick={()=>changeInvestors(activeNow)}>
								Active Now
							</OptionsButton>
						</li>

						<li style={{listStyle:"none",display:"inline-block"}}>
							<OptionsButton onClick={()=>changeInvestors(mostPopular)}>
								Most Popular
							</OptionsButton>
						</li>


						<li style={{listStyle:"none",display:"inline-block"}}>
							<OptionsButton onClick={()=>changeInvestors(newest)}>
								Newest
							</OptionsButton>

						</li>
					</ul>

				</li>

				<li style={{marginLeft:"5px",listStyle:"none"}}> 
					<InvestorsContainer>
						<ul style={{padding:"10px"}}>
							{investors.map(data=>
								<li style={{listStyle:"none",display:"inline-block",marginRight:"10px",marginBottom:"10px"}}>
									<InvestorInformation>
										<InvestorProfilePicture>


										</InvestorProfilePicture>

										<p style={{marginLeft:"15px"}}>Nathan Grant </p>
									</InvestorInformation>
								</li>
							)}
						</ul>
					</InvestorsContainer>
				</li>
			</ul>

			<p style={{color:"#5b5d60"}}><b>Here are a list of fashion designers in new york that you could talk to :)</b></p>
		</React.Fragment>
	)
}

export default SearchInformation;