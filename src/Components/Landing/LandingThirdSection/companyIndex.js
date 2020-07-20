import React,{useState,useEffect} from "react";
import styled,{keyframes} from "styled-components";
import LandingImage from '../../../designs/img/CompanyThirdSection.png';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

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
  height:50%;
  border-radius:5px;
  overflow-y:auto;
  background-color:white;
  border-radius:5px;
  padding:20px;
  color:#3898ec;
  left:15%;
  z-index:5;
`;

const ArrowUpContainer=styled.div`
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
	        const container=document.getElementById("thirdContainer");
	        container.style.opacity="1";
	    },100);
	  },[]);

	return (
		<ThirdContainer id="thirdContainer">
			<ul style={{padding:"0px",marginTop:"-10%"}}>
				<li style={{listStyle:"none",display:"inline-block",marginLeft:"-10%"}}>
					<InformationCard>
						<p style={{fontSize:"20px",color:"#1f1f1f",borderTop:"5px solid #494949"}}>
							<b>Starting a company is similar to jumping into a lake when you don’t know how to swim.</b>
						</p>
						<p style={{fontSize:"15px",marginTop:"3%"}}>
							You don’t know if what you’re doing. You’re flailing around trying
							to survive and it all seems pointless.Using our platform gives
							you the necessary life vest that you absolutely need. The journey 
							doesn’t have to be lonely and now you have a group of people who 
							are doing similar things to you who can offer you advice in the field that you’re interested in. 
						</p>
					</InformationCard> 
				</li>

				<li style={{position:"relative",marginLeft:"-5%",listStyle:"none",display:"inline-block",width:"45%",top:"-110px"}}>
					<img src={LandingImage} style={{width:"80%",height:"65%"}}/>
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
                    <ArrowUpContainer>
                      <ArrowUpwardIcon
                        style={{fontSize:'20'}}
                      />
                    </ArrowUpContainer>
                </li>
			</ul>

		</ThirdContainer>

	)
}

export default ThirdSection;