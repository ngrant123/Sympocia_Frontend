import React,{useState,useEffect,Component} from "react";
import styled from "styled-components";
import {InvestorConsumer} from "../../../InvestorContext.js";
import NoProfileIcon from "../../../../../designs/img/NoProfilePicture.png";

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
const InvestorProfileCSS={
	position:"relative",
	width:"60px",
	height:"55%",
	borderRadius:"50%",
	backgroundColor:"black",
	marginLeft:"10px",
	borderStyle:"solid",
	borderWidth:"1px",
	borderColor:"#0649a4"
}


const SearchInformation=(props)=>{
	const [investors,changeInvestors]=useState([]);

	const constructNewestInvestors=()=>{
		const investors=props.investors;
		investors.sort((a, b) => (a.creationDate > b.creationDate) ? 1 : -1)
		changeInvestors(investors);
	}
	return(
		<InvestorConsumer>
			{investorInformationCriteria=>{
				return <React.Fragment>
							<p style={{marginLeft:"35px",fontSize:"35px",color:"#353737"}}><b>{investorInformationCriteria.state.searchCriteria.industry} Investors</b></p>
							<p style={{paddingLeft:"25%",fontSize:"15px",color:"#8c939a"}}>{investorInformationCriteria.state.searchCriteria.location} Investors </p>


							<ul style={{padding:"0px"}}>
								<li style={{marginBottom:"20px",listStyle:"none"}}> 
									<ul style={{padding:"0px"}}>
										{/*
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
										*/}

										<li style={{listStyle:"none",display:"inline-block"}}>
											<a href="javascript:void(0);">
												<OptionsButton onClick={()=>constructNewestInvestors()}>
													Newest
												</OptionsButton>
											</a>
										</li>
									</ul>
								</li>

								<li style={{marginLeft:"5px",listStyle:"none"}}> 
									<InvestorsContainer>
										<ul style={{padding:"10px"}}>
											{investors.map(data=>
												<li onClick={()=>investorInformationCriteria.displayInvestorProfile(data)} style={{listStyle:"none",display:"inline-block",marginRight:"10px",marginBottom:"10px"}}>
													<a href="javascript:void(0);" style={{textDecoration:"none"}}>
														<InvestorInformation>

															{data.profilePicture==null?
																<img src={NoProfileIcon} style={InvestorProfileCSS}/>:
																<img src={data.profilePicture} style={InvestorProfileCSS}/>
															}

															<p style={{marginLeft:"15px"}}>{data.firstName}</p>
														</InvestorInformation>
													</a>
												</li>
											)}
										</ul>
									</InvestorsContainer>
								</li>
							</ul>

							<p style={{color:"#5b5d60"}}><b>Here are a list of {investorInformationCriteria.state.searchCriteria.industry} 
								investors in {investorInformationCriteria.state.searchCriteria.industry} that you could talk to :)</b></p>
						</React.Fragment>
				}
			}
		</InvestorConsumer>
	)
}

export default SearchInformation;