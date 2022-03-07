import React,{useState} from "react";
import {ChatAndIndustryInformationContainer} from "../indexCSS.js";
import {SymposiumConsumer} from "../SymposiumContext.js";
import PortalHOC from "./PortalHOC.js";
import SymposiumOptionsPortal from "./SymposiumOptionsPortal.js";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';


// backgroundColor:"#3898ec",

let SymposiumOptionsButtonCSS={
    backgroundColor:"white",
    borderRadius:"5px",
    color:"white",
    cursor:"pointer",
    height:"50px",
    display:"flex",
    justifyContent:"space-between",
    flexDirection:"row",
    alignItems:"center",
    marginRight:"10%",
    width:"200px",
    overflow:"hidden",
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
									style={{...SymposiumOptionsButtonCSS,background:backgroundColor,paddingLeft:"2px"}}>
                    				<div style={{color:"black",padding:"8%",backgroundColor:"white",width:"100%",borderRadius:"5px 0px 0px 5px"}}>
                    					<b>Symposium</b>
                    				</div>
			                        <div style={{width:"30%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
			                            <KeyboardArrowDownIcon/>
			                        </div>
								</div>

							</React.Fragment>
				}}
			</SymposiumConsumer>
		)
	}

	export default SymposiumOptions;