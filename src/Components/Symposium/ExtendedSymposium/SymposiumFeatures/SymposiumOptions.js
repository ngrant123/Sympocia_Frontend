import React,{useState} from "react";
import {ChatAndIndustryInformationContainer} from "../indexCSS.js";
import {SymposiumConsumer} from "../SymposiumContext.js";
import PortalHOC from "../Modals/PortalHOC.js";

let MobilePostOptionsButton={
    listStyle:"none",
    backgroundColor:"white",
    padding:"10px",
    color:"#6e6e6e",
    boxShadow:"1px 1px 5px #6e6e6e",
    borderRadius:"5px",
    borderStyle:"none",
    cursor:"pointer",
    marginLeft:"5%"
}
const SymposiumOptions=({headerAnimation,displayPhoneUI,selectedSymposiumTitle})=>{
		const isPhoneScrollTriggered=(displayPhoneUI==true && headerAnimation==true)==true?true:false;
		const [displayHighLightedQuestions,changeDisplayHighLightQuesition]=useState(false)
		const [displaySpecificSymposiumFeatures,changeDisplaySpecficSymposiumFeatures]=useState(false);

		if(headerAnimation==true){
            MobilePostOptionsButton={
                ...MobilePostOptionsButton,
                marginTop:"7%",
                marginLeft:"20%"
            }
        }
        const closeModal=()=>{
        	changeDisplayHighLightQuesition(false)
        	changeDisplaySpecficSymposiumFeatures(false);
        }

        const isUserFollowingSymposium=(followingIndicator)=>{
        	return(
        		<React.Fragment>
        			{followingIndicator==false?
				 		<p>Follow {selectedSymposiumTitle} Symposium</p>:
				 		<p>Unfollow Symposium</p>
				 	}
        		</React.Fragment>
        	)
        }
		return(
			<SymposiumConsumer>
				{symposiumInformation=>{
					return <React.Fragment>
								{displayHighLightedQuestions==true &&(
									<PortalHOC
										component={symposiumInformation.highLightedQuestionComponent()}
										closeModal={closeModal}
									/>
								)}

								{displaySpecificSymposiumFeatures==true &&(
									<PortalHOC
										component={symposiumInformation.specificSymposiumFeaturesComponent()}
										closeModal={closeModal}
									/>
								)}

								<div class="dropdown">
									<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={MobilePostOptionsButton}>
										Symposium Options
									</button>

									<ul class="dropdown-menu">
										<ChatAndIndustryInformationContainer onClick={()=>symposiumInformation.handleFollowSymposium()}>
											{isUserFollowingSymposium(symposiumInformation.isUserFollowingSymposium())}
										</ChatAndIndustryInformationContainer>
										<hr/>
										<ChatAndIndustryInformationContainer onClick={()=>changeDisplayHighLightQuesition(true)}>
											Highlighted Questions
										</ChatAndIndustryInformationContainer>
										<hr/>

										<ChatAndIndustryInformationContainer onClick={()=>symposiumInformation.displayPopularVideos()}>
											Popular videos
										</ChatAndIndustryInformationContainer>
										<hr/>

										<ChatAndIndustryInformationContainer onClick={()=>symposiumInformation.handleSeeAllPeopleActiveModal()}>
											Active people
										</ChatAndIndustryInformationContainer>
										<hr/>
										<ChatAndIndustryInformationContainer onClick={()=>changeDisplaySpecficSymposiumFeatures(true)}>
											{
												selectedSymposiumTitle=="General"||
												selectedSymposiumTitle=="Religion"||
												selectedSymposiumTitle=="Gaming"||
												selectedSymposiumTitle=="Philosophy"?
												<p>Chat </p>:
												<p> Symposium Features </p>
											}	
										</ChatAndIndustryInformationContainer>
									</ul>
								</div>

							</React.Fragment>
				}}
				{/*
					{(isScrollEnabled==true && this.state.displayDesktopUI==false) ||
						(this.state.displayPhoneUI==true)==true?
						<p id="mobileSymposiumOptions" onClick={()=>this.setState({displayMobileSymposiumOptions:true})}
							style={{
								...MobilePostOptionsButton,
								marginLeft:isPhoneScrollTriggered==true?"70":"0%",
								marginTop:isPhoneScrollTriggered==true?"10":"2%"
							}}>
							 Symposium
						</p>:
						<div class="dropdown">
							<button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" style={MobilePostOptionsButton}>
								Post Options
							</button>

							<ul class="dropdown-menu">
								<ChatAndIndustryInformationContainer onClick={()=>this.setState({displayHightletedSimplifiedQuestionsModal:true})}>
									Highlighted Questions
								</ChatAndIndustryInformationContainer>

								<ChatAndIndustryInformationContainer onClick={()=>this.setState({displayPopularVideos:true})}>
									Popular videos
								</ChatAndIndustryInformationContainer>

								<ChatAndIndustryInformationContainer onClick={()=>this.setState({displayModalPeopleActive:true})}>
									Active people
								</ChatAndIndustryInformationContainer>

								<ChatAndIndustryInformationContainer onClick={()=>this.setState({displaySpecficSymposiumFeature:!this.state.displaySpecficSymposiumFeature})}>
									{
										this.state.selectedSymposiumTitle=="General"||
										this.state.selectedSymposiumTitle=="Religion"||
										this.state.selectedSymposiumTitle=="Gaming"||
										this.state.selectedSymposiumTitle=="Philosophy"?
										<p>Chat </p>:
										<p> Symposium Features </p>
									}	
								</ChatAndIndustryInformationContainer>
							</ul>
						</div>
					}
				*/}
			</SymposiumConsumer>
		)
	}

	export default SymposiumOptions;