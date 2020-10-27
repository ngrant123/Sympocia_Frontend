import React,{useState,useEffect} from "react";
import styled,{keyframes} from "styled-components";
import LandingImage from '../../../designs/img/CompanyThirdSection.png';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const ThirdContainer = styled.div`

  position:relative;
  width:100%;
  height:100%;
  text-align:center;
  background-size: contain
  margin:auto;
  padding:0;  
  opacity:0;
  transition:.8s;

`;


const InformationCard=styled.div`
  position:relative;
  width:300px;
  border-radius:5px;
  overflow-y:auto;
  background-color:white;
  border-radius:5px;
  padding:20px;
  color:#3898ec;
  left:15%;
  z-index:5;
`;

const ArrowDownContainer=styled.div`
  animation: bounce 2s infinite;
  @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-30px);
        }
        60% {
          transform: translateY(-15px);
        }
  }
`;



const ThirdSection=(props)=>{
	  useEffect(()=>{
	    setTimeout(()=>{
	        const container=document.getElementById("thirdContainerCompany");
	        container.style.opacity="1";
	    },100);
	  },[]);

	return (
		<ThirdContainer id="thirdContainerCompany">
			<ul id="companyThirdText" style={{padding:"0px",marginTop:"-10%"}}>
				<li style={{marginBottom:"30%",listStyle:"none",display:"inline-block"}}>
					<InformationCard>
						<p style={{fontSize:"20px",color:"#1f1f1f",borderTop:"5px solid #494949"}}>
							<b>Starting a company is similar to jumping into a lake when you don’t know how to swim.</b>
						</p>
						<p style={{fontSize:"15px",marginTop:"3%"}}>
							You  may feel like you don’t know what you’re doing. You’re flailing around trying
							to survive and it all seems pointless.Using our platform gives
							you the necessary life vest that you absolutely need. The journey 
							doesn’t have to be lonely and now you have a group of people who 
							are doing similar things to you who can offer you advice in the field that you’re interested in. 
						</p>
					</InformationCard> 
				</li>

				<li id="imageListContainerCompany" style={{position:"relative",top:"-130px",width:"45%",listStyle:"none",display:"inline-block"}}>
					<img src={LandingImage} style={{height:"65%",marginLeft:"-5%"}}/>
				</li>

				<li style={{listStyle:"none",display:"inline-block",marginLeft:"-5%"}}>
					<InformationCard>
						<p style={{fontSize:"20px",color:"#1f1f1f",borderTop:"5px solid #494949"}}>
							<b> I know what you’re also asking yourself. Will Sympocia also help people 
							    with established companies?
							</b>
						</p>
						<p style={{fontSize:"15px",marginTop:"3%"}}>
							We allow you to connect with investors who
							are actually interested in the industry you’re specialized in. No more guessing 
							required. Paranoid about what you post online and if investors are going to see it? 
							We give the option of hiding certain posts from investors and only let companies in 
							you industry see it and much more 
						</p>
					</InformationCard>
				</li>
				 <li style={{listStyle:"none",marginTop:"0%"}}>
                    <ArrowDownContainer>
                      <ArrowDownwardIcon
                        style={{fontSize:'20'}}
                      />
                    </ArrowDownContainer>
                </li>
			</ul>

		</ThirdContainer>

	)
}

export default ThirdSection;