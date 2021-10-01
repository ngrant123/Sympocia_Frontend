import React,{useState} from "react";
import {ChatAndIndustryInformationContainer} from "../indexCSS.js";
import {SymposiumConsumer} from "../SymposiumContext.js";
import PortalHOC from "../Modals/PortalHOC.js";
import SymposiumOptionsPortal from "../Modals/SymposiumOptionsPortal.js";


let MobilePostOptionsButton={
    backgroundColor:"white",
    borderRadius:"5px",
    padding:"5px",
    color:"white",
    backgroundColor:"#3898ec",
    cursor:"pointer",
    display:"flex",
    justifyContent:"center",
    flexDirection:"row",
    alignItems:"center",
    marginRight:"10%",
    width:"200px"
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