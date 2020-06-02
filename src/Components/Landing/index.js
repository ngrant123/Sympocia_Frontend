import React,{useState} from "react";
import styled from "styled-components";
import FirstSection from "./LandingFirstSection";
import SecondSection from "./LandingSecondSection";
import ThirdSection from "./LandingThirdSection";

const Container=styled.div`
	position:absolute;
	width:100%;
	height:100%;
`;

const LandingPage=(props)=>{

	const [currentPageCounter,changePageCounter]=useState(0);

	const increasePageCounter=()=>{
		debugger;
		var currentCounter=currentPageCounter;
		if(currentCounter==2){
			currentCounter=0;
		}else{
			currentCounter=currentCounter+1;
		}
		changePageCounter(currentCounter);
	}

	const decreasePageCounter=()=>{
		var currentCounter=currentPageCounter;
		if(currentPageCounter==0){
			currentCounter=0;
		}else{
			currentCounter=currentCounter-1;
		}
		changePageCounter(currentCounter);
	}

	const displaySelectedPage=(selectedPage)=>{
		changePageCounter(selectedPage);
	}

	const handleDisplayPages=()=>{
		debugger;
		if(currentPageCounter==0){
			return <FirstSection
						increaseCounter={increasePageCounter}
						displaySelectedPage={displaySelectedPage}
						props={props}
					/>;
		}else if(currentPageCounter==1){
			return <SecondSection
						increaseCounter={increasePageCounter}
						decreaseCounter={decreasePageCounter}
						displaySelectedPage={displaySelectedPage}
						props={props}
					/>;
		}else{
			return <ThirdSection
						decreaseCounter={decreasePageCounter}
						displaySelectedPage={displaySelectedPage}
						props={props}
					/>;
		}
	}

	return(
		<Container>
			{handleDisplayPages()}
		</Container>
	)
}

export default LandingPage;