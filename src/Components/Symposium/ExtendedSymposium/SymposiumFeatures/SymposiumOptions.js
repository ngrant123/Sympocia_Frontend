import React,{useState} from "react";
import {ChatAndIndustryInformationContainer} from "../indexCSS.js";
import {SymposiumConsumer} from "../SymposiumContext.js";
import PortalHOC from "../Modals/PortalHOC.js";
import SymposiumOptionsPortal from "../Modals/SymposiumOptionsPortal.js";


let MobilePostOptionsButton={
    backgroundColor:"white",
    padding:"10px",
    color:"#6e6e6e",
    boxShadow:"1px 1px 5px #6e6e6e",
    borderRadius:"5px",
    borderStyle:"none",
    cursor:"pointer"
}
const SymposiumOptions=({headerAnimation,displayPhoneUI,selectedSymposiumTitle})=>{
		const isPhoneScrollTriggered=(displayPhoneUI==true && headerAnimation==true)==true?true:false;
		const [displayHighLightedQuestions,changeDisplayHighLightQuesition]=useState(false)
		const [displaySpecificSymposiumFeatures,changeDisplaySpecficSymposiumFeatures]=useState(false);
		const [displaySymposiumOptionsPortal,changeDisplaySymposiumOptions]=useState(false)
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

        const closeSymposiumOptionsModal=()=>{
        	changeDisplaySymposiumOptions(false);
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
								{displaySymposiumOptionsPortal==true &&(
									<SymposiumOptionsPortal
										closeModal={closeSymposiumOptionsModal}
										symposiumInformation={symposiumInformation}
										changeDisplayHighLightQuesition={changeDisplayHighLightQuesition}
										selectedSymposiumTitle={selectedSymposiumTitle}
										changeDisplaySpecficSymposiumFeatures={changeDisplaySpecficSymposiumFeatures}
									/>
								)}
								<div id="symposiumOptionsId" 
									onClick={()=>changeDisplaySymposiumOptions(true)} style={MobilePostOptionsButton}>
									Symposium Options
								</div>

							</React.Fragment>
				}}
			</SymposiumConsumer>
		)
	}

	export default SymposiumOptions;