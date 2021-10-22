import React,{useState} from "react";
import {ChatAndIndustryInformationContainer} from "../indexCSS.js";
import {SymposiumConsumer} from "../SymposiumContext.js";
import PortalHOC from "./PortalHOC.js";
import SymposiumOptionsPortal from "./SymposiumOptionsPortal.js";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';


// backgroundColor:"#3898ec",

let MobilePostOptionsButton={
    backgroundColor:"white",
    borderRadius:"5px",
    color:"white",
    cursor:"pointer",
    display:"flex",
    justifyContent:"space-between",
    flexDirection:"row",
    alignItems:"center",
    marginRight:"10%",
    width:"250px",
    overflow:"hidden",
    height:"50px",
    boxShadow:"1px 1px 5px #6e6e6e"
}
const SymposiumOptions=({headerAnimation,displayPhoneUI,selectedSymposiumTitle,backgroundColor})=>{

		const isPhoneScrollTriggered=(displayPhoneUI==true && headerAnimation==true)==true?true:false;
		const [displayHighLightedQuestions,changeDisplayHighLightQuesition]=useState(false)
		const [displaySpecificSymposiumFeatures,changeDisplaySpecficSymposiumFeatures]=useState(false);
		const [displaySymposiumOptionsPortal,changeDisplaySymposiumOptions]=useState(false);

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
								{displaySymposiumOptionsPortal==true &&(
									<SymposiumOptionsPortal
										closeModal={closeSymposiumOptionsModal}
										symposiumInformation={symposiumInformation}
										changeDisplayHighLightQuesition={changeDisplayHighLightQuesition}
										selectedSymposiumTitle={selectedSymposiumTitle}
									/>
								)}
								<div id="symposiumOptionsId" 
									onClick={()=>changeDisplaySymposiumOptions(true)} 
									style={{...MobilePostOptionsButton,background:backgroundColor}}>
									<div style={{padding:"5px",textAlign:"center"}}>
										Symposium 
									</div>
			                        <div style={{width:"30%",height:"100%",background:"rgba(0, 0, 0, 0.2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
			                            <KeyboardArrowDownIcon/>
			                        </div>
								</div>

							</React.Fragment>
				}}
			</SymposiumConsumer>
		)
	}

	export default SymposiumOptions;